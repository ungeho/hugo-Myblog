const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  const links = [...document.querySelectorAll(".toc a[href^='#']")];

  if (!links.length) {
    return;
  }

  const sections = links
    .map((link) => {
      const id = decodeURIComponent(link.getAttribute("href").slice(1));
      const section = document.getElementById(id);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!sections.length) {
    return;
  }

  let active = sections[0];

  for (const item of sections) {
    if (item.section.getBoundingClientRect().top <= 140) {
      active = item;
    }
  }

  links.forEach((link) => link.removeAttribute("aria-current"));
  active.link.setAttribute("aria-current", "true");
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
  setupLightbox();
  setupTocAutoOpen();
  setReadingProgress();
  highlightCurrentHeading();
};

setupEnhancements();

window.addEventListener("scroll", () => {
  setReadingProgress();
  highlightCurrentHeading();
}, { passive: true });

window.addEventListener("resize", () => {
  setupTocAutoOpen();
  setReadingProgress();
  highlightCurrentHeading();
});

document.querySelectorAll(".toc a[href^='#']").forEach((anchor) => {
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
