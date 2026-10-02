import { portfolioData } from '../data/portfolio.ts';
import { scrollToTarget } from '../animations/lenis.ts';
import { initHeroThreeCanvas } from './ThreeCanvas.ts';

export function renderHero(): string {
  const { identity } = portfolioData;

  return `
    <section id="hero" class="hero-section" aria-label="Hero Introduction">
      <!-- 3D Three.js WebGL Neural Canvas Background -->
      <div id="hero-canvas-container" class="hero-canvas-container" aria-hidden="true"></div>

      <!-- Ambient Cinematic Glows & Grid -->
      <div class="hero-ambient-glow hero-glow-1"></div>
      <div class="hero-ambient-glow hero-glow-2"></div>
      <div class="hero-grid-overlay"></div>

      <div class="hero-content-wrapper">
        <!-- Status Indicator Pill -->
        <div class="hero-status-pill animate-fade-in" style="animation-delay: 0.1s;">
          <span class="status-pulsing-dot"></span>
          <span class="status-pill-text">${identity.status}</span>
          <span class="status-badge-code">SYS_ONLINE</span>
        </div>

        <!-- Main Display Name -->
        <div class="hero-title-box">
          <h1 class="hero-name-display" data-split="chars">
            <span class="name-first">MOHD</span>
            <span class="name-last">SHAMI</span>
          </h1>
          <p class="hero-role-badge">AI / ML ENGINEER</p>
        </div>

        <!-- Dynamic Animated Pipeline / Keyword Ribbon -->
        <div class="hero-dynamic-ribbon" aria-label="Specialization Domain">
          <span class="ribbon-prefix">ARCHITECTING</span>
          <div class="ribbon-scroller">
            <span id="hero-role-cycler" class="ribbon-active-role">Python</span>
          </div>
          <span class="ribbon-suffix">→ END-TO-END INTELLIGENT SYSTEMS</span>
        </div>

        <!-- High-Impact Description -->
        <p class="hero-summary-lead">
          Building and deploying production-grade Machine Learning architectures, Deep Learning (CNN) pipelines,
          NLP classification engines, and real-time Flask inference APIs from raw data to containerized execution.
        </p>

        <!-- CTA Action Buttons -->
        <div class="hero-cta-group">
          <a href="#projects" class="hero-btn hero-btn-primary" data-cursor="view" id="hero-btn-work">
            <span>VIEW SYSTEMS</span>
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>

          <a href="${identity.resumeUrl}" download="Mohd_Shami_Resume.pdf" class="hero-btn hero-btn-secondary" data-cursor="open">
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            <span>DOWNLOAD RESUME</span>
          </a>

          <a href="${identity.socials.github}" target="_blank" rel="noopener noreferrer" class="hero-btn hero-btn-ghost" data-cursor="open">
            <i class="fa-brands fa-github"></i>
            <span>GITHUB</span>
          </a>

          <a href="${identity.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="hero-btn hero-btn-ghost" data-cursor="open">
            <i class="fa-brands fa-linkedin"></i>
            <span>LINKEDIN</span>
          </a>
        </div>

        <!-- Telemetry Metadata Footer -->
        <div class="hero-telemetry-row">
          <div class="telemetry-item">
            <span class="telemetry-label">LOCATION</span>
            <span class="telemetry-val">${identity.location}</span>
          </div>
          <div class="telemetry-sep">|</div>
          <div class="telemetry-item">
            <span class="telemetry-label">COHORT RANK</span>
            <span class="telemetry-val">#1 (CGPA 8.5/10)</span>
          </div>
          <div class="telemetry-sep">|</div>
          <div class="telemetry-item">
            <span class="telemetry-label">CORE STACK</span>
            <span class="telemetry-val">Python · XGBoost · CNN · Flask</span>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <a href="#summary" class="hero-scroll-indicator" id="hero-scroll-trigger" aria-label="Scroll to summary">
        <span class="scroll-label">EXPLORE SYSTEMS</span>
        <div class="scroll-mouse-icon">
          <div class="scroll-wheel"></div>
        </div>
      </a>
    </section>
  `;
}

export function initHeroEvents() {
  // Initialize 3D Three Canvas
  initHeroThreeCanvas('hero-canvas-container');

  // Dynamic Keyword Cycler
  const cyclerEl = document.getElementById('hero-role-cycler');
  const roles = portfolioData.identity.animatedRoles;
  let roleIdx = 0;

  if (cyclerEl && roles.length > 0) {
    setInterval(() => {
      cyclerEl.classList.add('fade-out-up');
      setTimeout(() => {
        roleIdx = (roleIdx + 1) % roles.length;
        cyclerEl.textContent = roles[roleIdx];
        cyclerEl.classList.remove('fade-out-up');
        cyclerEl.classList.add('fade-in-down');
        setTimeout(() => {
          cyclerEl.classList.remove('fade-in-down');
        }, 300);
      }, 250);
    }, 2400);
  }

  // Smooth scroll buttons
  const workBtn = document.getElementById('hero-btn-work');
  if (workBtn) {
    workBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTarget('#projects');
    });
  }

  const scrollTrigger = document.getElementById('hero-scroll-trigger');
  if (scrollTrigger) {
    scrollTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTarget('#summary');
    });
  }
}
