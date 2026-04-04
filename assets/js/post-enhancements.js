const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getArticleSections = () => {
  return [...document.querySelectorAll(".toc a[href^='#']")]
    .map((link) => {
      const id = decodeURIComponent(link.getAttribute("href").slice(1));
      const section = document.getElementById(id);
      return section ? { link, section, id, label: link.textContent.trim() } : null;
    })
    .filter(Boolean);
};

const getActiveSectionIndex = (sections) => {
  if (!sections.length) {
    return -1;
  }

  let activeIndex = 0;

  sections.forEach((item, index) => {
    if (item.section.getBoundingClientRect().top <= 140) {
      activeIndex = index;
    }
  });

  return activeIndex;
};

const setReadingProgress = () => {
  const article = document.querySelector(".article-single .post-content");
  const bar = document.querySelector("[data-reading-progress-bar]");
  const value = document.querySelector("[data-reading-progress-value]");

  if (!article || !bar || !value) {
    return;
  }

  const rect = article.getBoundingClientRect();
  const total = Math.max(article.offsetHeight - window.innerHeight * 0.6, 1);
  const passed = Math.min(Math.max(-rect.top + window.innerHeight * 0.15, 0), total);
  const progress = Math.round((passed / total) * 100);

  bar.style.width = `${progress}%`;
  value.textContent = `${progress}%`;
};

const highlightCurrentHeading = () => {
  const sections = getArticleSections();

  if (!sections.length) {
    return;
  }

  const active = sections[getActiveSectionIndex(sections)];

  sections.forEach(({ link }) => link.removeAttribute("aria-current"));
  active.link.setAttribute("aria-current", "true");

  document.querySelectorAll(".toc .toc-item-parent").forEach((item) => {
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

const scrollToHeading = (section) => {
  if (!section) {
    return;
  }

  section.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
};

const normalizeLanguageLabel = (language) => {
  if (!language) {
    return "";
  }

  const value = language.toLowerCase();
  const aliases = {
    js: "JavaScript",
    ts: "TypeScript",
    jsx: "JSX",
    tsx: "TSX",
    py: "Python",
    sh: "Shell",
    bash: "Bash",
    ps1: "PowerShell",
    yml: "YAML",
    md: "Markdown",
    csharp: "C#",
    cs: "C#",
    cpp: "C++",
    txt: "Text",
  };

  if (aliases[value]) {
    return aliases[value];
  }

  if (value.length <= 3) {
    return value.toUpperCase();
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const setupCodeLanguageLabels = () => {
  const blocks = document.querySelectorAll(".post-content .highlight, .post-content > pre");

  blocks.forEach((block) => {
    if (block.querySelector(".code-language-badge") || block.classList.contains("mermaid")) {
      return;
    }

    const code = block.matches("pre") ? block.querySelector("code") : block.querySelector("code");
    const pre = block.matches("pre") ? block : block.querySelector("pre");
    const classes = `${block.className} ${pre?.className || ""} ${code?.className || ""}`;
    const match = classes.match(/language-([a-z0-9#+-]+)/i) || classes.match(/\b(chroma|highlight)\s+([a-z0-9#+-]+)/i);
    const language = normalizeLanguageLabel(match?.[1] || match?.[2] || "");

    if (!language) {
      return;
    }

    const badge = document.createElement("span");
    badge.className = "code-language-badge";
    badge.textContent = language;
    block.appendChild(badge);
  });
};

const setupArticleNavigator = () => {
  const mount = document.querySelector("[data-article-jump-nav]");

  if (!mount || mount.dataset.ready === "true") {
    return;
  }

  const sections = getArticleSections();

  if (!sections.length) {
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

  mount.querySelector("[data-article-prev]")?.addEventListener("click", () => {
    const currentIndex = getActiveSectionIndex(getArticleSections());
    const target = getArticleSections()[Math.max(currentIndex - 1, 0)];
    scrollToHeading(target?.section);
  });

  mount.querySelector("[data-article-next]")?.addEventListener("click", () => {
    const sections = getArticleSections();
    const currentIndex = getActiveSectionIndex(sections);
    const target = sections[Math.min(currentIndex + 1, sections.length - 1)];
    scrollToHeading(target?.section);
  });
};

const updateArticleNavigator = () => {
  const navigator = document.querySelector("[data-article-jump-nav]");
  const sections = getArticleSections();

  if (!navigator || !sections.length) {
    return;
  }

  const activeIndex = getActiveSectionIndex(sections);
  const active = sections[activeIndex];
  const currentLink = navigator.querySelector("[data-article-current]");
  const prevButton = navigator.querySelector("[data-article-prev]");
  const nextButton = navigator.querySelector("[data-article-next]");

  if (currentLink && active) {
    currentLink.textContent = active.label;
    currentLink.setAttribute("href", `#${encodeURIComponent(active.id)}`);
    currentLink.onclick = (event) => {
      event.preventDefault();
      scrollToHeading(active.section);
    };
  }

  if (prevButton) {
    prevButton.disabled = activeIndex <= 0;
  }

  if (nextButton) {
    nextButton.disabled = activeIndex >= sections.length - 1;
  }
};

const setupCollapsibleCodeBlocks = () => {
  const codeBlocks = document.querySelectorAll(".post-content .highlight:not(table), .post-content > pre");

  codeBlocks.forEach((block, index) => {
    if (
      block.classList.contains("mermaid") ||
      block.closest(".mermaid-shell") ||
      block.dataset.codeFoldReady === "true"
    ) {
      return;
    }

    const pre = block.matches("pre") ? block : block.querySelector("pre");
    const code = pre?.querySelector("code");
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
      const expanded = block.classList.toggle("is-collapsed") === false;
      controls.querySelector(".code-fold-toggle").textContent = expanded ? "たたむ" : "続きを見る";
      controls.querySelector(".code-fold-toggle").setAttribute("aria-expanded", String(expanded));
    });
  });
};

const setupCollapsibleToc = () => {
  const toc = document.querySelector(".toc nav");

  if (!toc || toc.dataset.enhanced === "true") {
    return;
  }

  toc.querySelectorAll("li").forEach((item) => {
    if (item.classList.contains("toc-item-parent")) {
      return;
    }

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
};

const setupTocLinkCollapse = () => {
  document.querySelectorAll(".toc a[href^='#']").forEach((anchor) => {
    if (anchor.dataset.tocCollapseBound === "true") {
      return;
    }

    anchor.dataset.tocCollapseBound = "true";
    anchor.addEventListener("click", () => {
      if (prefersReducedMotion) {
        return;
      }

      const details = document.querySelector("[data-toc-details]");
      if (details && window.innerWidth < 1100) {
        details.open = false;
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
  const details = document.querySelector("[data-toc-details]");

  if (!details) {
    return;
  }

  if (window.innerWidth >= 1100) {
    details.open = true;
  }
};

const setupEnhancements = () => {
  wrapTables();
  setupLightbox();
  setupTocAutoOpen();
  setupCollapsibleToc();
  setupCodeLanguageLabels();
  setupCollapsibleCodeBlocks();
  setupArticleNavigator();
  setupTocLinkCollapse();
  setReadingProgress();
  highlightCurrentHeading();
  updateArticleNavigator();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupEnhancements, { once: true });
} else {
  setupEnhancements();
}

window.addEventListener("scroll", () => {
  setReadingProgress();
  highlightCurrentHeading();
  updateArticleNavigator();
}, { passive: true });

window.addEventListener("resize", () => {
  setupTocAutoOpen();
  setReadingProgress();
  highlightCurrentHeading();
  updateArticleNavigator();
});
