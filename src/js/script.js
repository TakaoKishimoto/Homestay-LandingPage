"use strict";
/////////////
// Multiple used El
const headerEl = document.querySelector(".header");

/////////////
// Mobile Btn
const mobileNav = function () {
  const btnNavEl = document.querySelector(".header__nav-btn");
  // const headerEl = document.getElementById("header");

  btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("header__nav--open");
  });
};

/////////////
// Smooth scrolling
const smtScroll = function () {
  const allLinks = document.querySelectorAll("a:link");

  allLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");

      // Scroll to Top
      if (href === "#")
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      // Scroll to other links
      if (href !== "#" && href.startsWith("#")) {
        const hrefEl = document.querySelector(href);
        hrefEl.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile navigation
      if (link.classList.contains("header__nav-link")) {
        headerEl.classList.toggle("header__nav--open");
      }
    });
  });
};

/////////////
// Sticky Navigation
const stickyNav = function () {
  const headerHeight = headerEl.getBoundingClientRect().height;
  const heroEl = document.querySelector(".hero");

  const attachSticky = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) headerEl.classList.add("sticky");
    else headerEl.classList.remove("sticky");
  };

  const headerObserver = new IntersectionObserver(attachSticky, {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`,
  });
  headerObserver.observe(heroEl);
};

/////////////
// Popup Sections
const popupSection = function () {
  const allSections = document.querySelectorAll("section");

  const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.25,
  });

  allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
  });
};

/////////////
// Tabbed component
const switchTabs = function () {
  const tabs = document.querySelectorAll(".process__overview-list");
  const tabsContainer = document.querySelector(".process__overview");
  const tabsContent = document.querySelectorAll(".process__description");

  tabsContainer.addEventListener("click", function (e) {
    const clicked = e.target;

    // Guard clause
    if (!clicked) return;

    // Remove active classes
    tabs.forEach((t) => t.classList.remove("process__overview-list--active"));
    tabsContent.forEach((c) =>
      c.classList.remove("process__description--active")
    );

    // Active tab
    clicked.classList.add("process__overview-list--active");

    // Acitivate Content
    document
      .querySelector(`.process__description--${clicked.dataset.tab}`)
      .classList.add("process__description--active");
  });
};

/////////////
// Slide testimonials
const slider = function () {
  const slides = document.querySelectorAll(".testimonial__slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Go to right
  const nextSlide = function () {
    if (curSlide === maxSlide) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
  };

  // Back to left
  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide;
    else curSlide--;

    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  // Event handler
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
};

/////////////
// Implement all
const init = function () {
  mobileNav();
  smtScroll();
  stickyNav();
  popupSection();
  switchTabs();
  slider();
};
init();
