/* main.js — Mobile nav, scroll effects, reveal animations */

(function () {
  'use strict';

  // ---- Mobile Nav Toggle ----
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });
  }

  // ---- Scroll: solid nav background after 50px ----
  const nav = document.querySelector('.nav');

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Close mobile menu on link click ----
  if (toggle && navLinks) {
    var links = navLinks.querySelectorAll('.nav__link');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Scroll Reveal (IntersectionObserver) ----
  var reveals = document.querySelectorAll('.reveal');

  // Add staggered delay for sibling .reveal elements inside grids
  document.querySelectorAll('.grid, .highlights').forEach(function (grid) {
    var items = grid.querySelectorAll('.reveal');
    items.forEach(function (item, i) {
      item.style.transitionDelay = (i * 100) + 'ms';
    });
  });

  if (reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }
})();
