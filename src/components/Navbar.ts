import { portfolioData } from '../data/portfolio.ts';
import { scrollToTarget } from '../animations/lenis.ts';

export function renderNavbar(): string {
  const { identity } = portfolioData;

  return `
    <header id="site-header" class="site-header">
      <div class="header-container">
        <!-- Logo / Brand Identity -->
        <a href="#hero" class="brand-identity" data-nav="hero">
          <span class="brand-symbol">◈</span>
          <span class="brand-name">${identity.name}</span>
          <span class="brand-tag">AI/ML</span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="desktop-nav" aria-label="Main Navigation">
          <ul class="nav-menu">
            <li><a href="#projects" class="nav-link" data-nav="projects">WORK</a></li>
            <li><a href="#experience" class="nav-link" data-nav="experience">EXPERIENCE</a></li>
            <li><a href="#skills" class="nav-link" data-nav="skills">SKILLS</a></li>
            <li><a href="#pipeline" class="nav-link" data-nav="pipeline">PIPELINE</a></li>
            <li><a href="#about" class="nav-link" data-nav="about">ABOUT</a></li>
            <li><a href="#education" class="nav-link" data-nav="education">EDUCATION</a></li>
            <li><a href="#contact" class="nav-link" data-nav="contact">CONTACT</a></li>
          </ul>
        </nav>

        <!-- Right Side Controls & Resume -->
        <div class="header-actions">
          <button class="cmd-palette-trigger" type="button" aria-label="Open Command Palette" title="Press Ctrl+K">
            <span class="cmd-icon">⌘</span>
            <span class="cmd-text">K</span>
          </button>

          <a href="${identity.resumeUrl}" download="Mohd_Shami_Resume.pdf" class="resume-pill-btn" data-cursor="open">
            <span class="btn-text">RESUME</span>
            <svg class="btn-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button id="mobile-menu-toggle" class="mobile-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Fullscreen Overlay Navigation -->
      <div id="mobile-nav-drawer" class="mobile-nav-drawer" aria-hidden="true">
        <div class="mobile-nav-inner">
          <div class="mobile-status-badge">
            <span class="status-indicator-dot"></span>
            <span>${identity.status}</span>
          </div>

          <ul class="mobile-menu-list">
            <li><a href="#projects" class="mobile-nav-link" data-nav="projects"><span class="m-idx">01</span> WORK</a></li>
            <li><a href="#experience" class="mobile-nav-link" data-nav="experience"><span class="m-idx">02</span> EXPERIENCE</a></li>
            <li><a href="#skills" class="mobile-nav-link" data-nav="skills"><span class="m-idx">03</span> SKILLS</a></li>
            <li><a href="#pipeline" class="mobile-nav-link" data-nav="pipeline"><span class="m-idx">04</span> ML PIPELINE</a></li>
            <li><a href="#about" class="mobile-nav-link" data-nav="about"><span class="m-idx">05</span> ABOUT</a></li>
            <li><a href="#education" class="mobile-nav-link" data-nav="education"><span class="m-idx">06</span> EDUCATION</a></li>
            <li><a href="#contact" class="mobile-nav-link" data-nav="contact"><span class="m-idx">07</span> CONTACT</a></li>
          </ul>

          <div class="mobile-drawer-footer">
            <a href="${identity.resumeUrl}" download="Mohd_Shami_Resume.pdf" class="mobile-resume-btn">
              DOWNLOAD RESUME (.PDF)
            </a>
            <div class="mobile-social-row">
              <a href="${identity.socials.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
              <span class="dot-sep">•</span>
              <a href="${identity.socials.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <span class="dot-sep">•</span>
              <a href="/lab/index.html">AI Lab</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

export function initNavbarEvents() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');

  // Glass background on scroll
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled-glass');
    } else {
      header.classList.remove('scrolled-glass');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile drawer open/close
  if (toggle && drawer) {
    const toggleEl: HTMLElement = toggle;
    const drawerEl: HTMLElement = drawer;

    toggleEl.addEventListener('click', () => {
      const isOpen = drawerEl.classList.contains('active');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    function openDrawer() {
      drawerEl.classList.add('active');
      toggleEl.classList.add('is-open');
      toggleEl.setAttribute('aria-expanded', 'true');
      drawerEl.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawerEl.classList.remove('active');
      toggleEl.classList.remove('is-open');
      toggleEl.setAttribute('aria-expanded', 'false');
      drawerEl.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Close when clicking mobile nav links
    drawerEl.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        closeDrawer();
        if (targetId) {
          setTimeout(() => scrollToTarget(targetId), 200);
        }
      });
    });
  }

  // Smooth scroll for desktop nav links
  document.querySelectorAll('.nav-link, .brand-identity').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        scrollToTarget(href);
      }
    });
  });

  // Active section indicator
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener(
    'scroll',
    () => {
      const scrollPos = window.scrollY + 180;
      let currentId = '';

      sections.forEach((sec) => {
        const top = (sec as HTMLElement).offsetTop;
        const height = (sec as HTMLElement).offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = sec.getAttribute('id') || '';
        }
      });

      navLinks.forEach((l) => {
        l.classList.remove('active');
        if (l.getAttribute('href') === `#${currentId}`) {
          l.classList.add('active');
        }
      });
    },
    { passive: true }
  );
}
