import { portfolioData } from '../data/portfolio.ts';
import { scrollToTarget } from '../animations/lenis.ts';
import { setTheme } from '../utils/theme.ts';

export function renderNavbar(): string {
  const { identity } = portfolioData;

  return `
    <header id="site-header" class="site-header gh-navbar" aria-label="Main Header Navigation">
      <div class="gh-nav-container">
        <!-- Left Section: Octocat Mark, Handle & Navigation Links -->
        <div class="gh-nav-left">
          <!-- GitHub Octocat Mark + Profile Handle -->
          <a href="#hero" class="gh-brand" data-nav="hero" aria-label="Mohd Shami Portfolio Home">
            <svg class="gh-octocat-mark" height="26" viewBox="0 0 16 16" width="26" fill="currentColor" aria-hidden="true">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
            <div class="gh-brand-text">
              <span class="gh-brand-handle">mohdshamii</span>
              <span class="gh-brand-sep">/</span>
              <span class="gh-brand-repo">portfolio</span>
            </div>
          </a>

          <!-- GitHub Search Bar Trigger for Search & Recommendation Palette -->
          <button class="gh-search-btn cmd-palette-trigger" type="button" aria-label="Search or jump to... (Press / or Ctrl+K)" title="Search or jump to... (Press / or Ctrl+K)">
            <svg class="octicon octicon-search" width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
            </svg>
            <span class="gh-search-text">Search or jump to...</span>
            <kbd class="gh-search-kbd">/</kbd>
          </button>

          <!-- Desktop Navigation Menu (Simplified Core Links + More Dropdown) -->
          <nav class="gh-desktop-nav" aria-label="Main Navigation">
            <ul class="gh-nav-menu">
              <li><a href="#projects" class="gh-nav-link" data-nav="projects">Projects</a></li>
              <li><a href="#experience" class="gh-nav-link" data-nav="experience">Experience</a></li>
              <li><a href="#skills" class="gh-nav-link" data-nav="skills">Stack</a></li>
              <li><a href="#contact" class="gh-nav-link" data-nav="contact">Contact</a></li>
              <li class="gh-nav-dropdown" id="gh-nav-more-dropdown">
                <button class="gh-nav-link gh-nav-dropdown-btn" type="button" aria-expanded="false" aria-label="More navigation links">
                  <span>More</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path>
                  </svg>
                </button>
                <div class="gh-nav-dropdown-menu" role="menu">
                  <a href="#diff-inspector" class="gh-dropdown-item" role="menuitem">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.5 5.396l2.323-2.323a.75.75 0 0 1 1.06 1.06l-2.853 2.854a.75.75 0 0 1-1.06 0L6.116 4.134a.75.75 0 1 1 1.061-1.06Z"></path></svg>
                    <span>Traces & Diff</span>
                  </a>
                  <a href="#pipeline" class="gh-dropdown-item" role="menuitem">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M1 3.5A2.5 2.5 0 0 1 3.5 1h9A2.5 2.5 0 0 1 15 3.5v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5v-9Zm2.5-1A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12.5 2.5h-9Z"></path></svg>
                    <span>ML Pipeline</span>
                  </a>
                  <a href="#about" class="gh-dropdown-item" role="menuitem">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path></svg>
                    <span>About</span>
                  </a>
                  <a href="#education" class="gh-dropdown-item" role="menuitem">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M0 4.75C0 3.784.784 3 1.75 3h12.5c.966 0 1.75.784 1.75 1.75v6.5A1.75 1.75 0 0 1 14.25 13H1.75A1.75 1.75 0 0 1 0 11.25v-6.5Zm1.75-.25a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-6.5a.25.25 0 0 0-.25-.25H1.75Z"></path></svg>
                    <span>Education</span>
                  </a>
                  <a href="#certifications" class="gh-dropdown-item" role="menuitem">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path></svg>
                    <span>Certifications</span>
                  </a>
                </div>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Right Section: Lab, GitHub link, Resume, Theme & Avatar -->
        <div class="gh-nav-right">
          <!-- Super Intelligence Lab -->
          <a href="/lab/index.html" class="gh-nav-btn gh-nav-lab-btn" title="Launch Super Intelligence Lab">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5.5 1.5A.5.5 0 0 1 6 1h4a.5.5 0 0 1 0 1H9.5v3.42l3.87 6.45A1.5 1.5 0 0 1 12.08 14H3.92a1.5 1.5 0 0 1-1.29-2.13L6.5 5.42V2H6a.5.5 0 0 1-.5-.5Zm3 0v4a.5.5 0 0 1-.07.26L4.78 12h6.44L7.57 5.76A.5.5 0 0 1 7.5 5.5v-4h1Z"></path>
            </svg>
            <span>Lab</span>
          </a>

          <!-- GitHub External Link -->
          <a href="${identity.socials.github}" target="_blank" rel="noopener noreferrer" class="gh-nav-btn gh-nav-icon-btn" title="View GitHub Profile">
            <i class="fa-brands fa-github"></i>
          </a>

          <!-- Resume PDF Download -->
          <a href="${identity.resumeUrl}" download="Mohd_Shami_Resume.pdf" class="gh-nav-btn gh-nav-resume-btn" title="Download Resume (.pdf)">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"></path>
              <path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z"></path>
            </svg>
            <span>Resume</span>
          </a>

          <!-- Segmented Light/Dark Switcher -->
          <div class="gh-theme-control" role="group" aria-label="Theme mode toggle">
            <button class="gh-theme-btn theme-btn-light" type="button" aria-label="Light theme" title="Light theme">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0-8.5a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 8 2Zm0 10a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 8 12ZM2.75 7.25h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1 0-1.5Zm10 0h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1 0-1.5ZM3.818 3.818a.75.75 0 0 1 1.06 0l.708.708a.75.75 0 0 1-1.06 1.06l-.708-.707a.75.75 0 0 1 0-1.061Zm7.606 7.606a.75.75 0 0 1 1.061 0l.707.708a.75.75 0 0 1-1.06 1.06l-.708-.707a.75.75 0 0 1 0-1.061ZM12.182 3.818a.75.75 0 0 1 0 1.06l-.707.708a.75.75 0 1 1-1.06-1.06l.707-.708a.75.75 0 0 1 1.06 0ZM4.576 11.424a.75.75 0 0 1 0 1.061l-.708.707a.75.75 0 0 1-1.06-1.06l.707-.708a.75.75 0 0 1 1.061 0Z"></path>
              </svg>
            </button>
            <button class="gh-theme-btn theme-btn-dark" type="button" aria-label="Dark theme" title="Dark theme (Press D)">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                <path d="M9.598 1.591a.749.749 0 0 1 .785-.175 7.001 7.001 0 1 1-8.967 8.967.75.75 0 0 1 .961-.96 5.5 5.5 0 0 0 7.046-7.046.75.75 0 0 1 .175-.786Zm1.616 1.945a7 7 0 0 1-7.678 7.678A5.499 5.499 0 1 0 11.214 3.536Z"></path>
              </svg>
            </button>
          </div>

          <!-- Mini Personal Portrait Avatar -->
          <a href="#hero" class="gh-nav-avatar" title="Mohd Shami (@mohdshamii)">
            <img src="/img/profile.png" alt="Mohd Shami" class="gh-nav-avatar-img" />
            <span class="gh-nav-avatar-status" title="Active"></span>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button id="mobile-menu-toggle" class="gh-nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
            <svg class="octicon octicon-three-bars" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75Zm0 5a.75.75 0 0 1 1.75 0h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1-.75-.75Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Responsive Drawer Backdrop -->
    <div id="mobile-nav-backdrop" class="mobile-nav-backdrop gh-mobile-backdrop" aria-hidden="true"></div>

    <!-- Responsive Navigation Side Panel / Drawer -->
    <div id="mobile-nav-drawer" class="mobile-nav-drawer gh-mobile-drawer" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Navigation Menu">
      <div class="mobile-nav-inner">
        <div class="mobile-header-profile">
          <div class="mobile-profile-info">
            <div class="mobile-avatar-box">
              <img src="/img/profile.png" alt="Mohd Shami" class="mobile-logo-img" />
              <span class="mobile-status-dot"></span>
            </div>
            <div class="mobile-profile-meta">
              <span class="mobile-profile-name">${identity.name}</span>
              <span class="mobile-profile-sub">@mohdshamii · AI/ML Engineer</span>
            </div>
          </div>
          <button id="mobile-drawer-close" class="gh-drawer-close-btn" type="button" aria-label="Close navigation menu">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
            </svg>
          </button>
        </div>

        <!-- Quick Mobile Search Trigger -->
        <button class="gh-search-btn cmd-palette-trigger drawer-search-trigger" type="button" aria-label="Search or jump to... (Press / or Ctrl+K)" title="Search or jump to... (Press / or Ctrl+K)">
          <svg class="octicon octicon-search" width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
          </svg>
          <span class="gh-search-text">Search systems, diff, @models...</span>
          <kbd class="gh-search-kbd">/</kbd>
        </button>

        <ul class="mobile-menu-list">
          <li><a href="#projects" class="mobile-nav-link" data-nav="projects"><span class="m-idx">01</span> Systems</a></li>
          <li><a href="#diff-inspector" class="mobile-nav-link" data-nav="diff-inspector"><span class="m-idx">02</span> Traces & Diff</a></li>
          <li><a href="#experience" class="mobile-nav-link" data-nav="experience"><span class="m-idx">03</span> Experience</a></li>
          <li><a href="#skills" class="mobile-nav-link" data-nav="skills"><span class="m-idx">04</span> Stack</a></li>
          <li><a href="#pipeline" class="mobile-nav-link" data-nav="pipeline"><span class="m-idx">05</span> ML Pipeline</a></li>
          <li><a href="#about" class="mobile-nav-link" data-nav="about"><span class="m-idx">06</span> About</a></li>
          <li><a href="#education" class="mobile-nav-link" data-nav="education"><span class="m-idx">07</span> Education</a></li>
          <li><a href="#contact" class="mobile-nav-link" data-nav="contact"><span class="m-idx">08</span> Contact</a></li>
        </ul>

        <div class="mobile-drawer-footer">
          <a href="/lab/index.html" class="gh-btn gh-btn-primary drawer-action-btn" title="Launch Super Intelligence Lab">
            <i class="fa-solid fa-flask-vial"></i> Launch Super Intelligence Lab
          </a>
          <a href="${identity.resumeUrl}" download="Mohd_Shami_Resume.pdf" class="gh-btn gh-btn-secondary drawer-action-btn" title="Download Resume (.pdf)">
            <i class="fa-solid fa-download"></i> Download Resume (.pdf)
          </a>
          <div class="mobile-social-row">
            <a href="${identity.socials.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span class="dot-sep">•</span>
            <a href="${identity.socials.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span class="dot-sep">•</span>
            <a href="mailto:${identity.email}">Email</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initNavbarEvents() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');

  // Light / Dark Theme Buttons
  document.querySelectorAll('.theme-btn-light').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setTheme('light');
    });
  });
  document.querySelectorAll('.theme-btn-dark').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setTheme('dark');
    });
  });

  // Border/Shadow behavior on scroll
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled-border');
    } else {
      header.classList.remove('scrolled-border');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Responsive Drawer Open / Close System
  if (drawer) {
    const toggleEl = toggle as HTMLElement | null;
    const drawerEl = drawer as HTMLElement;
    const backdropEl = document.getElementById('mobile-nav-backdrop');
    const closeBtnEl = document.getElementById('mobile-drawer-close');

    function openDrawer() {
      drawerEl.classList.add('active');
      if (backdropEl) backdropEl.classList.add('active');
      if (toggleEl) {
        toggleEl.classList.add('is-open');
        toggleEl.setAttribute('aria-expanded', 'true');
      }
      drawerEl.setAttribute('aria-hidden', 'false');
      if (backdropEl) backdropEl.setAttribute('aria-hidden', 'false');

      // Prevent background scroll without layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        if (header) header.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    function closeDrawer() {
      drawerEl.classList.remove('active');
      if (backdropEl) backdropEl.classList.remove('active');
      if (toggleEl) {
        toggleEl.classList.remove('is-open');
        toggleEl.setAttribute('aria-expanded', 'false');
      }
      drawerEl.setAttribute('aria-hidden', 'true');
      if (backdropEl) backdropEl.setAttribute('aria-hidden', 'true');

      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      if (header) header.style.paddingRight = '';
    }

    if (toggleEl) {
      toggleEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = drawerEl.classList.contains('active');
        if (isOpen) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    }

    if (closeBtnEl) {
      closeBtnEl.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDrawer();
      });
    }

    if (backdropEl) {
      backdropEl.addEventListener('click', () => {
        closeDrawer();
      });
    }

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawerEl.classList.contains('active')) {
        closeDrawer();
      }
    });

    // Close when clicking mobile nav links & smooth scroll
    drawerEl.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        closeDrawer();
        if (targetId) {
          setTimeout(() => scrollToTarget(targetId), 250);
        }
      });
    });

    // Close when clicking command palette trigger inside drawer
    drawerEl.querySelectorAll('.cmd-palette-trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }

  // Smooth scroll for desktop nav links, dropdown items, and brand logo
  document.querySelectorAll('.gh-nav-link, .gh-brand, .gh-nav-avatar, .gh-dropdown-item').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        scrollToTarget(href);
      }
    });
  });

  // More Dropdown interactive toggling
  const moreDropdown = document.getElementById('gh-nav-more-dropdown');
  const moreBtn = moreDropdown?.querySelector('.gh-nav-dropdown-btn');

  if (moreDropdown && moreBtn) {
    moreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = moreDropdown.classList.contains('is-open');
      moreDropdown.classList.toggle('is-open', !isOpen);
      moreBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close when clicking an item inside dropdown
    moreDropdown.querySelectorAll('.gh-dropdown-item').forEach((item) => {
      item.addEventListener('click', () => {
        moreDropdown.classList.remove('is-open');
        moreBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!moreDropdown.contains(e.target as Node)) {
        moreDropdown.classList.remove('is-open');
        moreBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active section indicator
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.gh-desktop-nav .gh-nav-link');

  window.addEventListener(
    'scroll',
    () => {
      const scrollPos = window.scrollY + 120;
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

  // Global '/' keyboard shortcut to trigger search when not typing in an input
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
      e.preventDefault();
      const trigger = document.querySelector('.cmd-palette-trigger') as HTMLElement | null;
      if (trigger) trigger.click();
    }
  });
}
