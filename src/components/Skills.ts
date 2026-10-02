import { portfolioData } from '../data/portfolio.ts';

export function renderSkills(): string {
  const { skillsHub } = portfolioData;

  return `
    <section id="skills" class="skills-section" aria-label="Interactive Skills Ecosystem">
      <div class="section-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div class="section-header-pill">
            <span class="pill-dot"></span>
            <span>TECHNICAL ARSENAL</span>
          </div>
          <h2 class="section-main-heading">INTERACTIVE SKILL ECOSYSTEM</h2>
          <p class="section-sub-heading">
            An interconnected network of machine learning algorithms, deep architectures, MLOps tooling, and deployment pipelines.
          </p>
        </div>

        <!-- Interactive Ecosystem Visualizer -->
        <div class="skills-ecosystem-wrapper">
          <!-- Category Selector Tabs (Responsive & Accessible) -->
          <div class="ecosystem-nav-tabs" role="tablist" aria-label="Skill Categories">
            ${skillsHub.categories
              .map(
                (cat, idx) => `
              <button
                class="eco-tab-btn ${idx === 0 ? 'active' : ''}"
                role="tab"
                aria-selected="${idx === 0 ? 'true' : 'false'}"
                data-category-id="${cat.id}"
                style="--cat-color: ${cat.color};"
              >
                <span class="tab-indicator"></span>
                <span class="tab-name">${cat.name}</span>
                <span class="tab-count">${cat.items.length}</span>
              </button>
            `
              )
              .join('')}
          </div>

          <!-- Central Hub Visual Display -->
          <div class="ecosystem-stage">
            <!-- Center Core -->
            <div class="ecosystem-center-core" id="ecosystem-core">
              <div class="core-rings">
                <div class="core-ring ring-1"></div>
                <div class="core-ring ring-2"></div>
                <div class="core-ring ring-3"></div>
              </div>
              <div class="core-badge">
                <span class="core-title">${skillsHub.center}</span>
                <span class="core-sub">SYSTEM CORE</span>
              </div>
            </div>

            <!-- Category Satellites / Nodes Grid -->
            <div class="ecosystem-categories-display" id="ecosystem-categories-display">
              ${skillsHub.categories
                .map(
                  (cat, idx) => `
                <div
                  class="category-detail-panel ${idx === 0 ? 'active-panel' : ''}"
                  id="panel-${cat.id}"
                  data-cat-panel="${cat.id}"
                  style="--accent-hue: ${cat.color};"
                >
                  <div class="panel-header-bar">
                    <div class="panel-title-wrap">
                      <span class="cat-pill" style="background: ${cat.color}22; color: ${cat.color}; border: 1px solid ${cat.color}55;">
                        MODULE 0${idx + 1}
                      </span>
                      <h3 class="panel-heading">${cat.name}</h3>
                    </div>
                    <p class="panel-desc">${cat.description}</p>
                  </div>

                  <!-- Expanded Skills Badges -->
                  <div class="panel-skills-grid">
                    ${cat.items
                      .map(
                        (skill) => `
                      <div class="skill-pill-card" data-skill="${skill}">
                        <div class="pill-dot" style="background: ${cat.color};"></div>
                        <span class="pill-title">${skill}</span>
                      </div>
                    `
                      )
                      .join('')}
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Quick Skills Summary Footer -->
          <div class="ecosystem-footer-meta">
            <div class="meta-item">
              <span class="meta-icon">◈</span>
              <span>All skills backed by verified implementations in <strong>Revive</strong>, <strong>HamOrSpam</strong>, <strong>FarmAIQ</strong>, or corporate internships.</span>
            </div>
            <div class="meta-item">
              <span class="meta-icon">⚙</span>
              <span>Zero fabricated frameworks or inflated self-rating percentages.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initSkillsEvents() {
  const tabBtns = document.querySelectorAll('.eco-tab-btn');
  const panels = document.querySelectorAll('.category-detail-panel');
  const coreEl = document.getElementById('ecosystem-core');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-category-id');
      if (!catId) return;

      // Update active tab
      tabBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update active panel with smooth fade
      panels.forEach((p) => {
        p.classList.remove('active-panel');
        if (p.getAttribute('data-cat-panel') === catId) {
          p.classList.add('active-panel');
        }
      });

      // Pulse core visual
      if (coreEl) {
        coreEl.classList.remove('pulse-active');
        void coreEl.offsetWidth; // Trigger reflow
        coreEl.classList.add('pulse-active');
      }
    });
  });
}
