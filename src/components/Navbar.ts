import { profileData } from '../data/profile.ts';

export function renderNavbar(): string {
  return `
    <nav class="navbar" id="navbar">
      <div class="container nav-container">
        <a href="#hero" class="nav-logo">
          <span>${profileData.name}</span>
          <span class="nav-logo-badge">Data Science & AI</span>
        </a>

        <div class="nav-links">
          <a href="#about" class="nav-link">About</a>
          <a href="#experience" class="nav-link">Experience</a>
          <a href="#projects" class="nav-link">Projects</a>
          <a href="#skills" class="nav-link">Skills</a>
          <a href="#education" class="nav-link">Education</a>
          <a href="#contact" class="nav-link">Contact</a>
          <a href="lab/index.html" class="nav-link" style="color: var(--accent-color); font-weight: 600;">
            <i class="fas fa-flask"></i> AI Lab
          </a>
        </div>

        <div class="nav-actions">
          <button class="assistant-trigger-btn" id="openAssistantBtn" title="Ask Mohd AI">
            <i class="fas fa-sparkles"></i>
            <span>Ask AI</span>
          </button>

          <button class="theme-toggle" id="themeToggleBtn" aria-label="Toggle theme" title="Toggle Light/Dark Theme">
            <i class="fas fa-moon" id="themeIcon"></i>
          </button>

          <a href="${profileData.resumeUrl}" download class="btn btn-outline btn-sm" style="display: none;" id="navResumeBtn">
            <i class="fas fa-download"></i> Resume
          </a>

          <button class="hamburger-btn" id="hamburgerBtn" aria-label="Toggle mobile menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div class="mobile-menu" id="mobileMenu">
        <a href="#about" class="nav-link mobile-link">About</a>
        <a href="#experience" class="nav-link mobile-link">Experience</a>
        <a href="#projects" class="nav-link mobile-link">Projects</a>
        <a href="#skills" class="nav-link mobile-link">Skills</a>
        <a href="#education" class="nav-link mobile-link">Education</a>
        <a href="#contact" class="nav-link mobile-link">Contact</a>
        <a href="lab/index.html" class="nav-link mobile-link" style="color: var(--accent-color); font-weight: 600;">
          <i class="fas fa-flask"></i> Interactive AI Lab
        </a>
        <a href="${profileData.resumeUrl}" download class="btn btn-primary btn-sm" style="margin-top: 0.5rem;">
          <i class="fas fa-download"></i> Download Resume (PDF)
        </a>
      </div>
    </nav>
  `;
}

export function initNavbarEvents() {
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const themeToggle = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  // Mobile menu toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
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
