/**
 * Interactive Navigation Menu Logic
 * Handles fixed navbar scroll effects, hover indicator pill, active section spy,
 * reading progress bar, theme switcher, and mobile drawer interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const progressBar = document.getElementById('scroll-progress');
  const navList = document.getElementById('nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  const indicatorPill = document.getElementById('nav-indicator-pill');
  const scrollStatusText = document.getElementById('scroll-status-text');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const styleSelect = document.getElementById('style-select');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const SCROLL_THRESHOLD = 50;

  /* ==========================================================================
     1. SCROLL EFFECT & READING PROGRESS BAR
     ========================================================================== */
  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0;

    // 1. Update Scroll Progress Bar
    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }

    // 2. Toggle Scrolled State Class on Navigation Header
    if (scrollY > SCROLL_THRESHOLD) {
      if (!header.classList.contains('scrolled')) {
        header.classList.add('scrolled');
      }
      if (scrollStatusText) {
        scrollStatusText.innerHTML = `<span style="color:#6366f1">●</span> Scrolled (Glassmorphism & Compact: ${Math.round(scrollY)}px)`;
      }
    } else {
      if (header.classList.contains('scrolled')) {
        header.classList.remove('scrolled');
      }
      if (scrollStatusText) {
        scrollStatusText.innerHTML = `<span style="color:#10b981">●</span> Top (Transparent & Spacious)`;
      }
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  handleScroll();

  /* ==========================================================================
     2. HOVER INDICATOR PILL (Smooth Magnetic Tracking)
     ========================================================================== */
  function moveIndicatorTo(element) {
    if (!indicatorPill || !element) return;
    const linkRect = element.getBoundingClientRect();
    const listRect = navList.getBoundingClientRect();

    const left = linkRect.left - listRect.left;
    const top = linkRect.top - listRect.top;
    const width = linkRect.width;
    const height = linkRect.height;

    indicatorPill.style.width = `${width}px`;
    indicatorPill.style.height = `${height}px`;
    indicatorPill.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    indicatorPill.classList.add('active');
  }

  function resetIndicatorToActive() {
    if (!indicatorPill) return;
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
      moveIndicatorTo(activeLink);
    } else {
      indicatorPill.classList.remove('active');
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      moveIndicatorTo(link);
    });

    link.addEventListener('focus', () => {
      moveIndicatorTo(link);
    });
  });

  if (navList) {
    navList.addEventListener('mouseleave', () => {
      resetIndicatorToActive();
    });
  }

  setTimeout(resetIndicatorToActive, 100);
  window.addEventListener('resize', resetIndicatorToActive);

  /* ==========================================================================
     3. ACTIVE SECTION TRACKING
     ========================================================================== */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#')) {
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    }
  });

  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
          if (matchingLink) {
            navLinks.forEach(l => {
              if (l.getAttribute('href') && l.getAttribute('href').startsWith('#')) {
                l.classList.remove('active');
              }
            });
            matchingLink.classList.add('active');
            resetIndicatorToActive();
          }
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  /* ==========================================================================
     4. THEME TOGGLE (Dark / Light Mode)
     ========================================================================== */
  const storedTheme = localStorage.getItem('nav_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('nav_theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'light') {
      themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    } else {
      themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    }
  }

  /* ==========================================================================
     5. STYLE PRESET SWITCHER
     ========================================================================== */
  if (styleSelect) {
    styleSelect.addEventListener('change', (e) => {
      const selectedStyle = e.target.value;
      if (selectedStyle === 'default') {
        document.documentElement.removeAttribute('data-nav-style');
      } else {
        document.documentElement.setAttribute('data-nav-style', selectedStyle);
      }
    });
  }

  /* ==========================================================================
     6. RESPONSIVE MOBILE DRAWER
     ========================================================================== */
  function openMobileMenu() {
    mobileToggle.classList.add('is-active');
    mobileDrawer.classList.add('is-open');
    mobileBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    mobileToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove('is-active');
    mobileDrawer.classList.remove('is-open');
    mobileBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    mobileToggle.setAttribute('aria-expanded', 'false');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
});
