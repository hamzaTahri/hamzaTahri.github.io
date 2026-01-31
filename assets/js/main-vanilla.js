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
   * Scroll progress bar
   */
  const initScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  };

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    const targetElement = select(el);
    if (!targetElement) return;
    
    // No offset needed since header is a sidebar, not top bar
    let offset = 0;
    
    // Small offset for spacing
    if (window.innerWidth >= 1200) {
      offset = 20; // Just a small padding on desktop
    }
    
    const elementPos = targetElement.offsetTop;
    
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
    
    if (!themeToggle) return;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
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
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-menu a, .scrollto, a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const hash = this.hash;
        
        // Only handle links with hash that point to elements on this page
        if (hash && hash !== '' && hash !== '#') {
          const targetElement = document.querySelector(hash);
          
          if (targetElement) {
            e.preventDefault();

            // Close mobile menu if open
            if (document.body.classList.contains('mobile-nav-active')) {
              document.body.classList.remove('mobile-nav-active');
              const toggleIcon = select('.mobile-nav-toggle i');
              if (toggleIcon) {
                toggleIcon.classList.add('icofont-navigation-menu');
                toggleIcon.classList.remove('icofont-close');
              }
            }
            
            // Scroll to the target
            scrollto(hash);
          }
        }
      });
    });

    // Scroll to hash on page load
    if (window.location.hash && window.location.hash !== '') {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        setTimeout(() => {
          scrollto(window.location.hash);
        }, 100);
      }
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
   * Initialize scroll indicators for scrollable sections
   */
  const initScrollIndicators = () => {
    // Helper function to setup scroll indicators for a section
    const setupScrollIndicator = (scrollContainerId, dotsContainerId, itemsSelector) => {
      const scrollContainer = select(scrollContainerId);
      const dotsContainer = select(dotsContainerId);
      
      if (!scrollContainer || !dotsContainer) return;

      // Get all items
      const items = select(itemsSelector, true);
      
      if (!items || items.length === 0) return;

      // Create dots
      dotsContainer.innerHTML = '';
      items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'scroll-dot';
        if (index === 0) dot.classList.add('active');
        
        // Make dots clickable to scroll to specific item
        dot.addEventListener('click', () => {
          const targetItem = items[index];
          scrollContainer.scrollTo({
            left: targetItem.offsetLeft - scrollContainer.offsetLeft,
            behavior: 'smooth'
          });
        });
        
        dotsContainer.appendChild(dot);
      });

      // Update active dot on scroll
      const updateActiveDot = () => {
        const scrollLeft = scrollContainer.scrollLeft;
        const containerLeft = scrollContainer.offsetLeft;
        
        let activeIndex = 0;
        let minDistance = Infinity;
        
        // Find which item is closest to the viewport
        items.forEach((item, index) => {
          const itemLeft = item.offsetLeft - containerLeft;
          const distance = Math.abs(scrollLeft - itemLeft);
          
          if (distance < minDistance) {
            minDistance = distance;
            activeIndex = index;
          }
        });
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.scroll-dot');
        dots.forEach((dot, index) => {
          if (index === activeIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      };

      // Listen to scroll events
      scrollContainer.addEventListener('scroll', updateActiveDot, { passive: true });
    };

    // Setup for experience section
    setupScrollIndicator('#experienceScroll', '#experienceDots', '.experience-section .resume-item');
    
    // Setup for education section
    setupScrollIndicator('#educationScroll', '#educationDots', '.education-section .col-lg-6');
  };

  /**
   * Initialize all modules on DOM ready
   */
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
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
    initScrollIndicators();
  });

  /**
   * Initialize on window load (for Isotope)
   */
  window.addEventListener('load', () => {
    initPortfolioFilter();
    initAOS();
  });

})();
