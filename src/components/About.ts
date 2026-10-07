import { portfolioData } from '../data/portfolio.ts';

export function renderAbout(): string {
  const { about, identity } = portfolioData;

  return `
    <section id="about" class="about-section" aria-label="About Mohd Shami — Behind the Models">
      <div class="section-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div class="section-header-pill">
            <span class="pill-dot"></span>
            <span>PHILOSOPHY & ARCHITECTURE</span>
          </div>
          <h2 class="section-main-heading">BEHIND THE MODELS</h2>
          <p class="section-sub-heading">
            Bridging theoretical mathematics with deployable, production-ready machine learning architectures.
          </p>
        </div>

        <!-- End-to-End Visual Workflow Pathway with Dashed Flow Lines -->
        <div class="workflow-pathway-card">
          <div class="workflow-header-row">
            <span class="workflow-tag">END-TO-END REPRODUCIBLE ML PIPELINE</span>
            <span class="workflow-status success">
              <span class="status-indicator-dot green"></span>
              <span>100% REPRODUCIBLE SCIKIT-LEARN PIPELINES</span>
            </span>
          </div>

          <div class="pathway-track" role="list" aria-label="ML Pipeline Pathway">
            ${about.workflowPathway
              .map(
                (step, idx) => `
              <div class="pathway-node" role="listitem">
                <div class="node-bullet">
                  <span class="node-idx">0${idx + 1}</span>
                </div>
                <div class="node-label">${step}</div>
                ${
                  idx < about.workflowPathway.length - 1
                    ? `<div class="node-dashed-connector"><span class="dashed-flow-dot"></span></div>`
                    : ''
                }
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Detailed Profile & Disciplines Grid -->
        <div class="about-main-grid">
          <!-- Left: Narrative & Background -->
          <div class="about-narrative-panel">
            <div class="narrative-badge">
              <span class="status-indicator-dot green"></span>
              <span>ACADEMIC LEADER · CGPA 8.5/10</span>
            </div>
            
            <h3 class="narrative-title">
              Translating Raw Data into Validated Production Intelligence
            </h3>

            ${about.paragraphs
              .map(
                (p) => `
              <p class="about-text-paragraph">${p}</p>
            `
              )
              .join('')}

            <div class="about-quote-box">
              <span class="quote-icon">“</span>
              <p class="quote-sentence">${identity.quote}</p>
              <span class="quote-author">— Mohd Shami (GitHub Profile)</span>
            </div>
          </div>

          <!-- Right: Engineer Inspection Card & Core Disciplines Grid -->
          <div class="about-disciplines-panel">
            <!-- Verified Engineer Telemetry Card with Photo -->
            <div class="about-engineer-card">
              <div class="engineer-card-head">
                <div class="engineer-avatar-wrap">
                  <img src="/img/profile.png" alt="Mohd Shami" class="engineer-photo-img" />
                  <span class="status-indicator-dot green"></span>
                </div>
                <div class="engineer-card-meta">
                  <span class="engineer-code-badge">VERIFIED_CANDIDATE // 2027</span>
                  <h4 class="engineer-name">${identity.name}</h4>
                  <span class="engineer-title">AI / ML Engineer</span>
                </div>
              </div>

              <div class="engineer-spec-table">
                <div class="spec-row">
                  <span class="spec-label">DEGREE:</span>
                  <span class="spec-val highlight">B.Tech Data Science (CGPA 8.5/10)</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">ALMA MATER:</span>
                  <span class="spec-val">Teerthanker Mahaveer University</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">LOCATION:</span>
                  <span class="spec-val">${identity.location}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">DSA MASTERY:</span>
                  <span class="spec-val highlight">850+ Solved in Python</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">CORE STACK:</span>
                  <span class="spec-val">XGBoost · CNN · TF-IDF · Flask · Docker</span>
                </div>
              </div>
            </div>

            <h4 class="disciplines-header">CORE ENGINEERING DISCIPLINES</h4>
            <div class="disciplines-grid">
              ${about.disciplines
                .map(
                  (d) => `
                <div class="discipline-card">
                  <div class="discipline-icon-bar">
                    <span class="discipline-dot"></span>
                    <h5 class="discipline-name">${d.name}</h5>
                  </div>
                  <p class="discipline-desc">${d.desc}</p>
                  <div class="discipline-tags">
                    ${d.tags.map((t) => `<span class="d-tag">${t}</span>`).join('')}
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
