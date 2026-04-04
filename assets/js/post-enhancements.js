const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const postState = {
  article: null,
  progressBar: null,
  progressValue: null,
  tocDetails: null,
  tocNav: null,
  tocParentItems: [],
  sections: [],
  articleNavigator: null,
  articleNavigatorCurrent: null,
  articleNavigatorPrev: null,
  articleNavigatorNext: null,
  activeSectionIndex: -1,
  visibleSectionIds: new Set(),
  headingObserver: null,
  scrollTicking: false,
  resizeTicking: false,
  progressValueNumber: -1,
};

const runAfterPaint = (callback) => {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback);
  });
};

const runWhenIdle = (callback, timeout = 800) => {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout });
    return;
  }

  window.setTimeout(callback, 120);
};

const cachePostElements = () => {
  postState.article = document.querySelector(".article-single .post-content");
  postState.progressBar = document.querySelector("[data-reading-progress-bar]");
  postState.progressValue = document.querySelector("[data-reading-progress-value]");
  postState.tocDetails = document.querySelector("[data-toc-details]");
  postState.tocNav = document.querySelector(".toc nav");
  postState.articleNavigator = document.querySelector("[data-article-jump-nav]");
};

const rebuildSections = () => {
  postState.sections = [...document.querySelectorAll(".toc a[href^='#']")]
    .map((link) => {
      const id = decodeURIComponent(link.getAttribute("href").slice(1));
      const section = document.getElementById(id);
      return section ? { link, section, id, label: link.textContent.trim() } : null;
    })
    .filter(Boolean);

  postState.tocParentItems = [...document.querySelectorAll(".toc .toc-item-parent")];
};

const getHeaderOffset = () => {
  const headerHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
  );

  return Number.isFinite(headerHeight) ? headerHeight + 28 : 112;
};

const getActiveSectionIndex = () => {
  if (!postState.sections.length) {
    return -1;
  }

  if (postState.visibleSectionIds.size) {
    const visibleSections = postState.sections.filter(({ id }) => postState.visibleSectionIds.has(id));

    if (visibleSections.length) {
      const sorted = visibleSections
        .map((item) => ({
          item,
          top: item.section.getBoundingClientRect().top,
        }))
        .sort((left, right) => Math.abs(left.top - getHeaderOffset()) - Math.abs(right.top - getHeaderOffset()));

      const activeId = sorted[0]?.item.id;
      const activeIndex = postState.sections.findIndex(({ id }) => id === activeId);
      if (activeIndex >= 0) {
        return activeIndex;
      }
    }
  }

  let fallbackIndex = 0;
  const threshold = getHeaderOffset() + 12;

  postState.sections.forEach((item, index) => {
    if (item.section.getBoundingClientRect().top <= threshold) {
      fallbackIndex = index;
    }
  });

  return fallbackIndex;
};

const scrollToHeading = (section) => {
  if (!section) {
    return;
  }

  section.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
};

const setReadingProgress = () => {
  const { article, progressBar, progressValue } = postState;

  if (!article || !progressBar || !progressValue) {
    return;
  }

  const rect = article.getBoundingClientRect();
  const total = Math.max(article.offsetHeight - window.innerHeight * 0.6, 1);
  const passed = Math.min(Math.max(-rect.top + window.innerHeight * 0.15, 0), total);
  const progress = Math.round((passed / total) * 100);

  if (progress !== postState.progressValueNumber) {
    progressBar.style.transform = `scaleX(${progress / 100})`;
    progressValue.textContent = `${progress}%`;
    postState.progressValueNumber = progress;
  }
};

const applyActiveSection = (activeIndex) => {
  if (!postState.sections.length || activeIndex < 0) {
    return;
  }

  if (activeIndex === postState.activeSectionIndex) {
    return;
  }

  postState.activeSectionIndex = activeIndex;
  const active = postState.sections[activeIndex];

  postState.sections.forEach(({ link }) => link.removeAttribute("aria-current"));
  active.link.setAttribute("aria-current", "true");

  postState.tocParentItems.forEach((item) => {
    item.classList.remove("is-open", "is-active-branch");
    const row = [...item.children].find((child) => child.classList?.contains("toc-item-row"));
    const toggle = row?.querySelector(".toc-toggle");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  let current = active.link.closest(".toc-item-parent");
  while (current) {
    current.classList.add("is-open", "is-active-branch");
    const row = [...current.children].find((child) => child.classList?.contains("toc-item-row"));
    const toggle = row?.querySelector(".toc-toggle");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
    }
    current = current.parentElement?.closest(".toc-item-parent") || null;
  }
};

const highlightCurrentHeading = () => {
  if (!postState.sections.length) {
    return;
  }

  applyActiveSection(getActiveSectionIndex());
};

const disconnectHeadingObserver = () => {
  postState.headingObserver?.disconnect();
  postState.headingObserver = null;
  postState.visibleSectionIds.clear();
};

const setupHeadingObserver = () => {
  disconnectHeadingObserver();

  if (!postState.sections.length || typeof IntersectionObserver !== "function") {
    return;
  }

  const offset = getHeaderOffset();
  postState.headingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (!id) {
          return;
        }

        if (entry.isIntersecting) {
          postState.visibleSectionIds.add(id);
        } else {
          postState.visibleSectionIds.delete(id);
        }
      });

      applyActiveSection(getActiveSectionIndex());
      updateArticleNavigator();
    },
    {
      rootMargin: `${-offset}px 0px -55% 0px`,
      threshold: [0, 1],
    },
  );

  postState.sections.forEach(({ section }) => postState.headingObserver.observe(section));
};

const setupArticleNavigator = () => {
  const mount = postState.articleNavigator;

  if (!mount || mount.dataset.ready === "true" || !postState.sections.length) {
    return;
  }

  mount.innerHTML = `
    <div class="article-jump-current">
      <span class="article-jump-label">Now Reading</span>
      <a class="article-jump-current-link" data-article-current href="#"></a>
    </div>
    <div class="article-jump-actions">
      <button type="button" class="article-jump-button" data-article-prev aria-label="Go to previous heading">Prev</button>
      <button type="button" class="article-jump-button" data-article-next aria-label="Go to next heading">Next</button>
    </div>
  `;

  mount.hidden = false;
  mount.dataset.ready = "true";
  postState.articleNavigatorCurrent = mount.querySelector("[data-article-current]");
  postState.articleNavigatorPrev = mount.querySelector("[data-article-prev]");
  postState.articleNavigatorNext = mount.querySelector("[data-article-next]");

  postState.articleNavigatorPrev?.addEventListener("click", () => {
    const currentIndex = Math.max(postState.activeSectionIndex, 0);
    const target = postState.sections[Math.max(currentIndex - 1, 0)];
    scrollToHeading(target?.section);
  });

  postState.articleNavigatorNext?.addEventListener("click", () => {
    const currentIndex = Math.max(postState.activeSectionIndex, 0);
    const target = postState.sections[Math.min(currentIndex + 1, postState.sections.length - 1)];
    scrollToHeading(target?.section);
  });
};

const updateArticleNavigator = () => {
  if (!postState.articleNavigator || !postState.sections.length || postState.activeSectionIndex < 0) {
    return;
  }

  const active = postState.sections[postState.activeSectionIndex];

  if (postState.articleNavigatorCurrent && active) {
    postState.articleNavigatorCurrent.textContent = active.label;
    postState.articleNavigatorCurrent.setAttribute("href", `#${encodeURIComponent(active.id)}`);
    postState.articleNavigatorCurrent.onclick = (event) => {
      event.preventDefault();
      scrollToHeading(active.section);
    };
  }

  if (postState.articleNavigatorPrev) {
    postState.articleNavigatorPrev.disabled = postState.activeSectionIndex <= 0;
  }

  if (postState.articleNavigatorNext) {
    postState.articleNavigatorNext.disabled = postState.activeSectionIndex >= postState.sections.length - 1;
  }
};

const setupCollapsibleCodeBlocks = () => {
  const codeBlocks = document.querySelectorAll(".post-content .highlight:not(table), .post-content > pre");

  codeBlocks.forEach((block) => {
    if (block.classList.contains("mermaid") || block.closest(".mermaid-shell")) {
      return;
    }

    const pre = block.matches("pre") ? block : block.querySelector("pre");
    const code = pre?.querySelector("code");
    const existingToggle = block.querySelector(".code-fold-toggle");

    if (existingToggle && block.dataset.codeFoldBound !== "true") {
      block.dataset.codeFoldBound = "true";
      existingToggle.addEventListener("click", () => {
        const expanded = !block.classList.toggle("is-collapsed");
        existingToggle.textContent = expanded ? "たたむ" : "続きを見る";
        existingToggle.setAttribute("aria-expanded", String(expanded));
      });
      return;
    }

    if (block.dataset.codeFoldReady === "true") {
      return;
    }

    const lineCount = code?.textContent?.split("\n").length ?? 0;

    if (!pre || lineCount < 18) {
      block.dataset.codeFoldReady = "true";
      return;
    }

    block.dataset.codeFoldReady = "true";
    block.classList.add("is-collapsible", "is-collapsed");
    block.style.setProperty("--code-preview-height", "24rem");

    const controls = document.createElement("div");
    controls.className = "code-fold-controls";
    controls.innerHTML = `
      <span class="code-fold-meta">${lineCount} lines</span>
      <button type="button" class="code-fold-toggle" aria-expanded="false">続きを見る</button>
    `;

    block.appendChild(controls);

    controls.querySelector(".code-fold-toggle")?.addEventListener("click", () => {
      const expanded = !block.classList.toggle("is-collapsed");
      const toggle = controls.querySelector(".code-fold-toggle");
      toggle.textContent = expanded ? "たたむ" : "続きを見る";
      toggle.setAttribute("aria-expanded", String(expanded));
    });
  });
};

const setupCollapsibleToc = () => {
  const toc = postState.tocNav;

  if (!toc || toc.dataset.enhanced === "true") {
    return;
  }

  toc.querySelectorAll("li").forEach((item) => {
    const childList = [...item.children].find((child) => child.tagName === "UL");
    const link = [...item.children].find((child) => child.tagName === "A");

    if (!childList || !link) {
      return;
    }

    item.classList.add("toc-item-parent");

    const row = document.createElement("div");
    row.className = "toc-item-row";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "toc-toggle";
    button.setAttribute("aria-label", "Toggle subsection");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = '<span class="toc-toggle-icon" aria-hidden="true"></span>';

    link.parentNode.insertBefore(row, link);
    row.appendChild(link);
    row.appendChild(button);

    const toggleItem = () => {
      const open = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
    };

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleItem();
    });

    row.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        return;
      }

      event.preventDefault();
      toggleItem();
    });
  });

  toc.dataset.enhanced = "true";
  rebuildSections();
};

const setupTocLinkCollapse = () => {
  postState.sections.forEach(({ link }) => {
    if (link.dataset.tocCollapseBound === "true") {
      return;
    }

    link.dataset.tocCollapseBound = "true";
    link.addEventListener("click", () => {
      if (prefersReducedMotion) {
        return;
      }

      if (postState.tocDetails && window.innerWidth < 1100) {
        postState.tocDetails.open = false;
      }
    });
  });
};

const setupLightbox = () => {
  const triggers = document.querySelectorAll("[data-lightbox-trigger]");

  if (!triggers.length || document.querySelector(".lightbox")) {
    return;
  }

  const lightbox = document.createElement("dialog");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <form method="dialog" class="lightbox-shell">
      <button class="lightbox-close" aria-label="Close image viewer">Close</button>
      <img class="lightbox-image" alt="">
      <p class="lightbox-caption"></p>
    </form>
  `;
  document.body.appendChild(lightbox);

  const image = lightbox.querySelector(".lightbox-image");
  const caption = lightbox.querySelector(".lightbox-caption");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const source = trigger.querySelector("img");

      if (!source) {
        return;
      }

      image.src = trigger.getAttribute("href") || source.currentSrc || source.src;
      image.alt = source.alt || "";
      caption.textContent = source.title || source.alt || "";

      if (typeof lightbox.showModal === "function") {
        lightbox.showModal();
      }
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.open) {
      lightbox.close();
    }
  });
};

const wrapTables = () => {
  document.querySelectorAll(".post-content table").forEach((table) => {
    if (
      table.closest(".highlight") ||
      table.closest(".highlighttable") ||
      table.parentElement?.classList.contains("table-scroll")
    ) {
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "table-scroll";
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
};

const setupTocAutoOpen = () => {
  if (!postState.tocDetails) {
    return;
  }

  if (window.innerWidth >= 1100) {
    postState.tocDetails.open = true;
  }
};

const runScrollUpdates = () => {
  setReadingProgress();
  postState.scrollTicking = false;
};

const requestScrollUpdates = () => {
  if (postState.scrollTicking) {
    return;
  }

  postState.scrollTicking = true;
  window.requestAnimationFrame(runScrollUpdates);
};

const setupEnhancements = () => {
  cachePostElements();
  if (!postState.article) {
    return;
  }

  rebuildSections();
  setupTocAutoOpen();
  runScrollUpdates();

  runAfterPaint(() => {
    setupCollapsibleCodeBlocks();
    setupCollapsibleToc();
    rebuildSections();
    setupHeadingObserver();
    setupArticleNavigator();
    setupTocLinkCollapse();
    runScrollUpdates();
  });

  runWhenIdle(() => {
    wrapTables();
    setupLightbox();
  });
};

const scheduleResizeUpdates = () => {
  if (postState.resizeTicking) {
    return;
  }

  postState.resizeTicking = true;
  window.requestAnimationFrame(() => {
    cachePostElements();
    if (!postState.article) {
      postState.resizeTicking = false;
      return;
    }

    rebuildSections();
    setupTocAutoOpen();
    setupHeadingObserver();
    runScrollUpdates();
    postState.resizeTicking = false;
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupEnhancements, { once: true });
} else {
  setupEnhancements();
}

window.addEventListener("scroll", requestScrollUpdates, { passive: true });
window.addEventListener("resize", scheduleResizeUpdates, { passive: true });
