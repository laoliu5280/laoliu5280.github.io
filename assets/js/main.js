/**
 * Main JavaScript for Haokun Liu's Personal Website
 * Provides subtle animations and scroll effects
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Header scroll effect - add border on scroll
   */
  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    function updateHeader() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader(); // Initial check
  }

  /**
   * Scroll-triggered fade-in animations
   */
  function initScrollAnimations() {
    if (prefersReducedMotion) {
      // If reduced motion is preferred, show all elements immediately
      document.querySelectorAll('.fade-in-section').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Staggered animation for publication cards
   */
  function initStaggeredAnimations() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.publication-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  /**
   * Initialize all functionality when DOM is ready
   */
  function init() {
    initHeaderScroll();
    initScrollAnimations();
    initStaggeredAnimations();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
