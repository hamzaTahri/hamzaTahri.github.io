/**
 * Portfolio - Main JavaScript (Vanilla JS, no jQuery)
 * Modernized from iPortfolio template
 */

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header');
    let offset = header ? header.offsetHeight : 0;
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  /**
   * Theme toggle (dark/light mode)
   */
  const initThemeToggle = () => {
    const themeToggle = select('#theme-toggle');
    const themeIcon = select('#theme-icon');
    
    if (!themeToggle) return;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
      }
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      if (themeIcon) {
        if (newTheme === 'dark') {
          themeIcon.classList.remove('bx-sun');
          themeIcon.classList.add('bx-moon');
        } else {
          themeIcon.classList.remove('bx-moon');
          themeIcon.classList.add('bx-sun');
        }
      }
    });
  };

  /**
   * Hero typed effect
   */
  const initTyped = () => {
    const typedEl = select('.typed');
    if (typedEl) {
      let typed_strings = typedEl.getAttribute('data-typed-items');
      if (typed_strings) {
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
          strings: typed_strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
      }
    }
  };

  /**
   * Mobile nav toggle
   */
  const initMobileNav = () => {
    on('click', '.mobile-nav-toggle', function(e) {
      document.body.classList.toggle('mobile-nav-active');
      this.querySelector('i').classList.toggle('icofont-navigation-menu');
      this.querySelector('i').classList.toggle('icofont-close');
    });

    // Close mobile nav on click outside
    document.addEventListener('click', function(e) {
      if (document.body.classList.contains('mobile-nav-active')) {
        if (!e.target.closest('.mobile-nav-toggle') && !e.target.closest('#header')) {
          document.body.classList.remove('mobile-nav-active');
          const toggleIcon = select('.mobile-nav-toggle i');
          if (toggleIcon) {
            toggleIcon.classList.add('icofont-navigation-menu');
            toggleIcon.classList.remove('icofont-close');
          }
        }
      }
    });
  };

  /**
   * Smooth scroll for navigation and scrollto links
   */
  const initSmoothScroll = () => {
    on('click', '.nav-menu a, .scrollto', function(e) {
      if (this.hash && select(this.hash)) {
        e.preventDefault();

        if (document.body.classList.contains('mobile-nav-active')) {
          document.body.classList.remove('mobile-nav-active');
          const toggleIcon = select('.mobile-nav-toggle i');
          if (toggleIcon) {
            toggleIcon.classList.add('icofont-navigation-menu');
            toggleIcon.classList.remove('icofont-close');
          }
        }
        scrollto(this.hash);
      }
    }, true);

    // Scroll to hash on page load
    if (window.location.hash && select(window.location.hash)) {
      setTimeout(() => {
        scrollto(window.location.hash);
      }, 100);
    }
  };

  /**
   * Navigation active state on scroll
   */
  const initNavActiveState = () => {
    const navLinks = select('.nav-menu a', true);
    
    const navbarlinksActive = () => {
      let position = window.scrollY + 200;
      navLinks.forEach(navLink => {
        if (!navLink.hash) return;
        let section = select(navLink.hash);
        if (!section) return;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navLink.parentElement.classList.add('active');
        } else {
          navLink.parentElement.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', navbarlinksActive);
    navbarlinksActive();
  };

  /**
   * Back to top button
   */
  const initBackToTop = () => {
    const backToTop = select('.back-to-top');
    if (backToTop) {
      const toggleBackToTop = () => {
        if (window.scrollY > 100) {
          backToTop.classList.add('active');
        } else {
          backToTop.classList.remove('active');
        }
      };
      window.addEventListener('scroll', toggleBackToTop);
      toggleBackToTop();

      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  };

  /**
   * Counter animation
   */
  const initCounter = () => {
    const counters = select('[data-toggle="counter-up"]', true);
    if (counters.length === 0) return;

    const animateCounter = (counter) => {
      const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
      const prefix = counter.textContent.match(/^[^0-9]*/)?.[0] || '';
      const suffix = counter.textContent.match(/[^0-9]*$/)?.[0] || '';
      const duration = 1000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = prefix + Math.floor(current) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = prefix + target + suffix;
        }
      };

      updateCounter();
    };

    // Use Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  };

  /**
   * Skills animation
   */
  const initSkillsAnimation = () => {
    const skillsContent = select('.skills-content');
    if (!skillsContent) return;

    const animateSkills = () => {
      const progressBars = select('.progress .progress-bar', true);
      progressBars.forEach(bar => {
        bar.style.width = bar.getAttribute('aria-valuenow') + '%';
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          animateSkills();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(skillsContent);
  };

  /**
   * Portfolio isotope and filter
   */
  const initPortfolioFilter = () => {
    const portfolioContainer = select('.portfolio-container');
    if (!portfolioContainer) return;

    // Wait for Isotope to be available
    if (typeof Isotope === 'undefined') return;

    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    const portfolioFilters = select('#portfolio-flters li', true);
    on('click', '#portfolio-flters li', function(e) {
      e.preventDefault();
      portfolioFilters.forEach(el => el.classList.remove('filter-active'));
      this.classList.add('filter-active');
      portfolioIsotope.arrange({
        filter: this.getAttribute('data-filter')
      });
      // Re-init AOS after filter
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, true);
  };

  /**
   * VenoBox lightbox
   */
  const initVenoBox = () => {
    if (typeof VenoBox !== 'undefined') {
      new VenoBox({
        selector: '.venobox',
        numeration: true,
        infinigall: true,
        share: false,
        spinner: 'rotating-plane'
      });
    }
  };

  /**
   * Testimonials carousel with Swiper
   */
  const initTestimonialsCarousel = () => {
    const testimonialsEl = select('.testimonials-carousel');
    if (!testimonialsEl || typeof Swiper === 'undefined') return;

    new Swiper('.testimonials-carousel', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  };

  /**
   * Portfolio details carousel with Swiper
   */
  const initPortfolioCarousel = () => {
    const carouselEl = select('.portfolio-details-carousel');
    if (!carouselEl || typeof Swiper === 'undefined') return;

    new Swiper('.portfolio-details-carousel', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  };

  /**
   * Init AOS (Animate On Scroll)
   */
  const initAOS = () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  };

  /**
   * Initialize all modules on DOM ready
   */
  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTyped();
    initMobileNav();
    initSmoothScroll();
    initNavActiveState();
    initBackToTop();
    initCounter();
    initSkillsAnimation();
    initVenoBox();
    initTestimonialsCarousel();
    initPortfolioCarousel();
  });

  /**
   * Initialize on window load (for Isotope)
   */
  window.addEventListener('load', () => {
    initPortfolioFilter();
    initAOS();
  });

})();
