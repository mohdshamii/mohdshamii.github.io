import { profileData } from '../data/profile.ts';

export function renderNavbar(): string {
  return `
    <nav class="navbar" id="navbar">
      <div class="container nav-container">
        <a href="#hero" class="nav-logo" aria-label="Mohd Shami Portfolio Home">
          <span class="nav-logo-text">${profileData.name}</span>
          <span class="nav-logo-badge">Data Science &amp; AI</span>
        </a>

        <div class="nav-links">
          <a href="#about" class="nav-link">About</a>
          <a href="#experience" class="nav-link">Experience</a>
          <a href="#projects" class="nav-link">Projects</a>
          <a href="#skills" class="nav-link">Skills</a>
          <a href="#education" class="nav-link">Education</a>
          <a href="#contact" class="nav-link">Contact</a>
          <a href="/lab/index.html" class="nav-link nav-link-lab" style="color: var(--accent-color); font-weight: 600;">
            <i class="fas fa-flask"></i>
            <span>AI Lab</span>
          </a>
        </div>

        <div class="nav-actions">
          <button class="assistant-trigger-btn" id="openAssistantBtn" title="Ask Mohd AI (Recruiter Assistant)" aria-label="Open AI Recruiter Assistant">
            <i class="fas fa-sparkles"></i>
            <span class="assistant-btn-label">Ask AI</span>
          </button>

          <button class="theme-toggle" id="themeToggleBtn" aria-label="Toggle light or dark theme" title="Toggle Light/Dark Theme">
            <i class="fas fa-moon" id="themeIcon"></i>
          </button>

          <button class="hamburger-btn" id="hamburgerBtn" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobileMenu">
            <span class="hamburger-line line-top"></span>
            <span class="hamburger-line line-mid"></span>
            <span class="hamburger-line line-bot"></span>
          </button>
        </div>
      </div>

      <div class="mobile-menu-backdrop" id="mobileMenuBackdrop" aria-hidden="true"></div>

      <div class="mobile-menu" id="mobileMenu" role="dialog" aria-label="Mobile Navigation" aria-hidden="true">
        <div class="mobile-menu-links">
          <a href="#about" class="mobile-link">
            <i class="fas fa-user-circle"></i>
            <span>About</span>
          </a>
          <a href="#experience" class="mobile-link">
            <i class="fas fa-briefcase"></i>
            <span>Experience</span>
          </a>
          <a href="#projects" class="mobile-link">
            <i class="fas fa-project-diagram"></i>
            <span>Projects</span>
          </a>
          <a href="#skills" class="mobile-link">
            <i class="fas fa-cogs"></i>
            <span>Skills</span>
          </a>
          <a href="#education" class="mobile-link">
            <i class="fas fa-graduation-cap"></i>
            <span>Education</span>
          </a>
          <a href="#contact" class="mobile-link">
            <i class="fas fa-envelope"></i>
            <span>Contact</span>
          </a>
          <a href="/lab/index.html" class="mobile-link mobile-lab-link">
            <i class="fas fa-flask"></i>
            <span>Interactive AI Lab</span>
            <span class="mobile-badge-chip">Live</span>
          </a>
        </div>

        <div class="mobile-menu-footer">
          <a href="${profileData.resumeUrl}" download class="btn btn-primary btn-sm mobile-resume-btn">
            <i class="fas fa-download"></i>
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      </div>
    </nav>
  `;
}

export function initNavbarEvents() {
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileBackdrop = document.getElementById('mobileMenuBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const themeToggle = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  function openMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (mobileBackdrop) {
      mobileBackdrop.classList.add('active');
      mobileBackdrop.setAttribute('aria-hidden', 'false');
    }
    document.body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (mobileBackdrop) {
      mobileBackdrop.classList.remove('active');
      mobileBackdrop.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('menu-open');
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = hamburger.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMobileMenu);
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    // Close automatically if viewport resized to desktop width
    window.addEventListener('resize', () => {
      if (window.innerWidth > 960 && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  // Theme switcher
  const currentTheme = localStorage.getItem('shami_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = active === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('shami_theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }

  function updateThemeIcon(theme: string) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
  }
}
