import { portfolioData } from '../data/portfolio.ts';

export function renderExperience(): string {
  const { experience } = portfolioData;

  return `
    <section id="experience" class="experience-section" aria-label="Work Experience & Industry Internships">
      <div class="section-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div class="section-header-pill">
            <span class="pill-dot"></span>
            <span>PRODUCTION IMPACT</span>
          </div>
          <h2 class="section-main-heading">INDUSTRY EXPERIENCE</h2>
          <p class="section-sub-heading">
            Applied machine learning, clinical diagnostic optimization, and production ETL pipelines delivered in professional environments.
          </p>
        </div>

        <!-- Experience Timeline -->
        <div class="timeline-container">
          <div class="timeline-spine" aria-hidden="true"></div>

          ${experience
            .map((exp, idx) => {
              const isCodec = exp.id === 'codec';

              return `
              <div class="timeline-card-wrapper ${idx % 2 === 0 ? 'card-left' : 'card-right'}" data-exp-card>
                <!-- Center Node Indicator -->
                <div class="timeline-node-marker">
                  <span class="marker-dot"></span>
                  <span class="marker-ring"></span>
                </div>

                <div class="timeline-card">
                  <!-- Header Row -->
                  <div class="exp-card-header">
                    <div>
                      <div class="exp-role-badge">INTERNSHIP 0${idx + 1}</div>
                      <h3 class="exp-role-title">${exp.role}</h3>
                      <div class="exp-company-row">
                        <span class="company-name">${exp.company}</span>
                        <span class="dot-sep">•</span>
                        <span class="exp-location">${exp.location}</span>
                      </div>
                    </div>
                    <div class="exp-period-pill">
                      <i class="fa-regular fa-calendar"></i>
                      <span>${exp.period}</span>
                    </div>
                  </div>

                  <!-- Animated Impact Visualization Bar -->
                  ${
                    isCodec
                      ? `
                    <div class="exp-metric-showcase">
                      <div class="metric-showcase-title">
                        <span>MODEL ACCURACY OPTIMIZATION</span>
                        <span class="metric-gain-badge">+13% DELTA</span>
                      </div>
                      <div class="comparison-bar-track">
                        <div class="comparison-sub-bar baseline-bar" style="width: 72%;">
                          <span class="bar-label">BASELINE: 72%</span>
                        </div>
                        <div class="comparison-sub-bar optimized-bar" style="width: 85%;">
                          <span class="bar-label">OPTIMIZED (XGBOOST + SMOTE): 85%</span>
                        </div>
                      </div>
                      <div class="metrics-mini-grid">
                        <div class="mini-metric">
                          <span class="mini-val">0.89</span>
                          <span class="mini-lbl">AUC-ROC SCORE</span>
                        </div>
                        <div class="mini-metric">
                          <span class="mini-val">-18%</span>
                          <span class="mini-lbl">FALSE NEGATIVES</span>
                        </div>
                        <div class="mini-metric">
                          <span class="mini-val">5,000+</span>
                          <span class="mini-lbl">CLINICAL RECORDS</span>
                        </div>
                      </div>
                    </div>
                  `
                      : `
                    <div class="exp-metric-showcase">
                      <div class="metric-showcase-title">
                        <span>PIPELINE PREPROCESSING LATENCY</span>
                        <span class="metric-gain-badge">-50% TIME</span>
                      </div>
                      <div class="comparison-bar-track">
                        <div class="comparison-sub-bar baseline-bar" style="width: 100%;">
                          <span class="bar-label">BEFORE: MANUAL / FRAGMENTED</span>
                        </div>
                        <div class="comparison-sub-bar optimized-bar codtech-accent" style="width: 50%;">
                          <span class="bar-label">AFTER: AUTOMATED PYTHON ETL (-50%)</span>
                        </div>
                      </div>
                      <div class="metrics-mini-grid">
                        <div class="mini-metric">
                          <span class="mini-val">4+</span>
                          <span class="mini-lbl">DATA SOURCES</span>
                        </div>
                        <div class="mini-metric">
                          <span class="mini-val">0%</span>
                          <span class="mini-lbl">DATA LEAKAGE</span>
                        </div>
                        <div class="mini-metric">
                          <span class="mini-val">100%</span>
                          <span class="mini-lbl">SCHEMA VALIDATED</span>
                        </div>
                      </div>
                    </div>
                  `
                  }

                  <!-- Key Achievements & Responsibilities -->
                  <div class="exp-highlights-list">
                    ${exp.highlights
                      .map(
                        (h) => `
                      <div class="highlight-bullet">
                        <span class="bullet-arrow">▹</span>
                        <p class="highlight-text">${h}</p>
                      </div>
                    `
                      )
                      .join('')}
                  </div>

                  <!-- Tech Stack Pills -->
                  <div class="exp-tech-footer">
                    <span class="tech-tag-label">STACK:</span>
                    <div class="tech-tags-wrap">
                      ${exp.technologies
                        .map(
                          (t) => `
                        <span class="tech-pill">${t}</span>
                      `
                        )
                        .join('')}
                    </div>
                  </div>
                </div>
              </div>
            `;
            })
            .join('')}
        </div>
      </div>
    </section>
  `;
}
