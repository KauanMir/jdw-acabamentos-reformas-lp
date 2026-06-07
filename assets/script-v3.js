/* ============================================================
   JDW — Interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector(".header");
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      nav.classList.toggle("mobile-open");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        toggle.classList.remove("open");
        nav.classList.remove("mobile-open");
      })
    );
  }

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* Hero reveals fire immediately so the first paint is never blank */
  requestAnimationFrame(() => {
    document.querySelectorAll(".hero .reveal").forEach((el) => el.classList.add("in"));
  });

  /* ---------- Timeline steps ---------- */
  const stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll(".step").forEach((el) => stepObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const dur = 1800;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const val = target * easeOut(p);
      el.textContent = target % 1 === 0 ? Math.round(val).toLocaleString("pt-BR") : val.toFixed(0);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("pt-BR");
    };
    requestAnimationFrame(step);
  };
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCount(e.target);
          countObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

  /* ---------- Hero parallax ---------- */
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (y < window.innerHeight) heroBg.style.transform = `translateY(${y * 0.28}px)`;
      },
      { passive: true }
    );
  }

  /* ---------- Portfolio filters ---------- */
  const filters = document.querySelectorAll(".filter");
  const tiles = document.querySelectorAll(".tile");
  filters.forEach((f) => {
    f.addEventListener("click", () => {
      filters.forEach((x) => x.classList.remove("active"));
      f.classList.add("active");
      const cat = f.dataset.filter;
      tiles.forEach((t) => {
        const match = cat === "all" || t.dataset.cat === cat;
        t.classList.toggle("hide", !match);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    const lbFrame = lightbox.querySelector(".lb-frame");
    const lbCat = lightbox.querySelector(".lb-cat");
    const lbTi = lightbox.querySelector(".lb-ti");
    const lbCount = lightbox.querySelector(".lb-count");
    const visibleTiles = () => [...tiles].filter((t) => !t.classList.contains("hide"));
    let current = 0;

    const render = () => {
      const list = visibleTiles();
      const t = list[current];
      if (!t) return;
      const img = t.querySelector("img");
      const full = (img.currentSrc || img.src).replace(/w=\d+/, "w=1800");
      lbFrame.innerHTML = `<img src="${full}" alt="${t.dataset.title}" />`;
      lbCat.textContent = t.dataset.catLabel || t.dataset.cat;
      lbTi.textContent = t.dataset.title;
      lbCount.textContent = `${current + 1} / ${list.length}`;
    };
    const open = (tile) => {
      const list = visibleTiles();
      current = list.indexOf(tile);
      render();
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    };
    const move = (dir) => {
      const list = visibleTiles();
      current = (current + dir + list.length) % list.length;
      render();
    };
    tiles.forEach((t) => t.addEventListener("click", () => open(t)));
    lightbox.querySelector(".lb-close").addEventListener("click", close);
    lightbox.querySelector(".lb-prev").addEventListener("click", () => move(-1));
    lightbox.querySelector(".lb-next").addEventListener("click", () => move(1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    });
  }

  /* ---------- Testimonials carousel ---------- */
  const track = document.querySelector(".testi-track");
  if (track) {
    const cards = track.children.length;
    const dotsWrap = document.querySelector(".testi-dots");
    let perView = window.innerWidth <= 760 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
    let pages = Math.max(1, cards - perView + 1);
    let idx = 0;
    let timer;

    const buildDots = () => {
      perView = window.innerWidth <= 760 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
      pages = Math.max(1, cards - perView + 1);
      dotsWrap.innerHTML = "";
      for (let i = 0; i < pages; i++) {
        const b = document.createElement("button");
        b.addEventListener("click", () => {
          idx = i;
          update();
          restart();
        });
        dotsWrap.appendChild(b);
      }
    };
    const update = () => {
      const card = track.children[0];
      const gap = 24;
      const step = card.getBoundingClientRect().width + gap;
      track.style.transform = `translateX(${-idx * step}px)`;
      [...dotsWrap.children].forEach((d, i) => d.classList.toggle("active", i === idx));
    };
    const next = () => {
      idx = (idx + 1) % pages;
      update();
    };
    const prev = () => {
      idx = (idx - 1 + pages) % pages;
      update();
    };
    const restart = () => {
      clearInterval(timer);
      timer = setInterval(next, 5000);
    };
    document.querySelector(".testi-next").addEventListener("click", () => {
      next();
      restart();
    });
    document.querySelector(".testi-prev").addEventListener("click", () => {
      prev();
      restart();
    });
    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        idx = Math.min(idx, pages - 1);
        buildDots();
        update();
      }, 200);
    });
    buildDots();
    update();
    restart();
  }

  /* ---------- Footer year ---------- */
  const yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Premium image fade-in on load ---------- */
  const fadeImgs = document.querySelectorAll(
    ".hero-img, .figure img, .tile-img, .comp-img, .cta-img"
  );
  fadeImgs.forEach((img) => {
    img.classList.add("fade-img");
    const reveal = () => img.classList.add("img-in");
    if (img.complete && img.naturalWidth > 0) reveal();
    else {
      img.addEventListener("load", reveal, { once: true });
      img.addEventListener("error", reveal, { once: true });
    }
  });
})();
