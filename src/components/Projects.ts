import { portfolioData, ProjectItem } from '../data/portfolio.ts';

export function renderProjects(): string {
  const { projects } = portfolioData;

  return `
    <section id="projects" class="projects-section" aria-label="Projects Showcase — Systems I Have Built">
      <div class="section-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div class="section-header-pill">
            <span class="pill-dot"></span>
            <span>SYSTEMS ARCHITECTURE</span>
          </div>
          <h2 class="section-main-heading">SYSTEMS I'VE BUILT</h2>
          <p class="section-sub-heading">
            Production-grade machine learning pipelines, deep convolutional vision architectures, and real-time inference microservices.
          </p>
        </div>

        <!-- Filter / Category Tabs -->
        <div class="project-filter-bar">
          <button class="filter-tab active" data-filter="all">ALL SYSTEMS (${projects.length})</button>
          <button class="filter-tab" data-filter="ml">MACHINE LEARNING</button>
          <button class="filter-tab" data-filter="nlp">NLP</button>
          <button class="filter-tab" data-filter="vision">COMPUTER VISION</button>
          <button class="filter-tab" data-filter="analytics">ANALYTICS & DSA</button>
        </div>

        <!-- Projects Cards Grid -->
        <div class="projects-grid" id="projects-container">
          ${projects.map((proj, idx) => renderProjectCard(proj, idx)).join('')}
        </div>
      </div>

      <!-- Full-Screen Case Study Modal -->
      <div id="case-study-modal" class="case-study-backdrop" aria-hidden="true" style="display: none;">
        <div class="case-study-window" role="dialog" aria-modal="true" aria-label="Project Case Study">
          <div class="case-study-topbar">
            <div class="topbar-identity">
              <span class="topbar-chip">TECHNICAL CASE STUDY</span>
              <span class="topbar-title" id="cs-modal-title"></span>
            </div>
            <button id="cs-close-btn" class="cs-close-btn" aria-label="Close Case Study Modal">
              ✕
            </button>
          </div>

          <div class="case-study-scroll-body" id="cs-modal-content">
            <!-- Populated dynamically -->
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderProjectCard(proj: ProjectItem, idx: number): string {
  const isFarmAIQ = proj.id === 'farmaiq';

  return `
    <article
      class="project-card"
      data-project-id="${proj.id}"
      data-category="${proj.category}"
      data-cursor="view"
      tabindex="0"
      aria-label="${proj.name} — ${proj.subtitle}"
    >
      <div class="card-ambient-gradient"></div>

      <!-- Card Header -->
      <div class="card-top-header">
        <div class="card-identity-meta">
          <span class="project-number">0${idx + 1} // ${proj.category.toUpperCase()}</span>
          <span class="project-period">${proj.period}</span>
        </div>
        <div class="card-links-row">
          <a
            href="${proj.githubUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="card-github-btn"
            data-cursor="open"
            title="View GitHub Repository"
            onclick="event.stopPropagation();"
          >
            <i class="fa-brands fa-github"></i>
            <span>CODE</span>
          </a>
          ${
            proj.liveDemoUrl
              ? `
            <a
              href="${proj.liveDemoUrl}"
              class="card-live-btn"
              data-cursor="open"
              title="Interactive Lab Model"
              onclick="event.stopPropagation();"
            >
              <span>DEMO</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          `
              : ''
          }
        </div>
      </div>

      <!-- Project Titles -->
      <div class="card-body">
        <h3 class="project-title">${proj.name}</h3>
        <p class="project-subtitle">${proj.subtitle}</p>
        <p class="project-overview">${proj.overview}</p>

        <!-- FarmAIQ Split-Screen Tabs Visual -->
        ${
          isFarmAIQ
            ? `
          <div class="farmaiq-split-tabs" onclick="event.stopPropagation();">
            <div class="split-tab-triggers">
              <button class="split-btn active" data-split-tab="crop">
                <i class="fa-solid fa-seedling"></i> TAB 01: CROP INTEL (93% ACC)
              </button>
              <button class="split-btn" data-split-tab="vision">
                <i class="fa-solid fa-eye"></i> TAB 02: PLANT VISION (CNN)
              </button>
            </div>
            <div class="split-tab-panes">
              <div class="split-pane active" id="pane-crop">
                <span>Random Forest model trained on 2,200 soil chemistry records (N, P, K, pH, rainfall).</span>
              </div>
              <div class="split-pane" id="pane-vision">
                <span>Convolutional Neural Network extracting deep spatial features across PlantVillage leaf imagery.</span>
              </div>
            </div>
          </div>
        `
            : ''
        }

        <!-- Animated ML Pipeline Pathway -->
        <div class="project-pipeline-container">
          <span class="pipeline-label">ARCHITECTURE PIPELINE:</span>
          <div class="pipeline-track">
            ${proj.pipeline
              .map(
                (step, sIdx) => `
              <span class="p-step">${step}</span>
              ${sIdx < proj.pipeline.length - 1 ? `<span class="p-arrow">→</span>` : ''}
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Measurable Performance Metrics Grid -->
        <div class="card-metrics-grid">
          ${proj.metrics
            .map(
              (m) => `
            <div class="card-metric-pill">
              <span class="c-val">${m.value}</span>
              <span class="c-lbl">${m.label}</span>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- Tech Stack Footer & Case Study Trigger -->
      <div class="card-footer">
        <div class="card-tech-list">
          ${proj.technologies.map((t) => `<span class="card-tech-tag">${t}</span>`).join('')}
        </div>
        <button class="case-study-action-btn case-study-trigger" type="button" aria-label="Open case study">
          <span>CASE STUDY</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </article>
  `;
}

export function initProjectEvents() {
  const container = document.getElementById('projects-container');
  const filterBtns = document.querySelectorAll('.filter-tab');
  const modal = document.getElementById('case-study-modal');
  const modalTitle = document.getElementById('cs-modal-title');
  const modalContent = document.getElementById('cs-modal-content');
  const closeBtn = document.getElementById('cs-close-btn');

  // Filter tabs
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || 'all';

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const cards = document.querySelectorAll('.project-card');
      cards.forEach((c) => {
        const cat = c.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          (c as HTMLElement).style.display = 'flex';
        } else {
          (c as HTMLElement).style.display = 'none';
        }
      });
    });
  });

  // FarmAIQ sub-tab toggles
  document.querySelectorAll('.split-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = btn.closest('.farmaiq-split-tabs');
      if (!parent) return;

      const tabType = btn.getAttribute('data-split-tab');
      parent.querySelectorAll('.split-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      parent.querySelectorAll('.split-pane').forEach((p) => p.classList.remove('active'));
      const activePane = parent.querySelector(`#pane-${tabType}`);
      if (activePane) activePane.classList.add('active');
    });
  });

  // Case Study modal open
  function openCaseStudy(proj: ProjectItem) {
    if (!modal || !modalTitle || !modalContent) return;

    modalTitle.textContent = `${proj.name} — ARCHITECTURAL DEEP DIVE`;

    modalContent.innerHTML = `
      <div class="cs-body-layout">
        <!-- Header overview banner -->
        <div class="cs-banner">
          <div class="cs-meta-tags">
            <span class="cs-badge">${proj.category.toUpperCase()}</span>
            <span class="cs-badge">${proj.period}</span>
          </div>
          <h2 class="cs-heading">${proj.name}: ${proj.subtitle}</h2>
          <p class="cs-lead">${proj.overview}</p>
          <div class="cs-cta-row">
            <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="hero-btn hero-btn-secondary" data-cursor="open">
              <i class="fa-brands fa-github"></i>
              <span>VIEW REPOSITORY</span>
            </a>
            ${
              proj.liveDemoUrl
                ? `
              <a href="${proj.liveDemoUrl}" class="hero-btn hero-btn-primary" data-cursor="open">
                <span>LAUNCH INTERACTIVE DEMO</span>
              </a>
            `
                : ''
            }
          </div>
        </div>

        <!-- 7-Stage Architectural Flow -->
        <div class="cs-pipeline-stages">
          <!-- 01 PROBLEM -->
          <div class="cs-stage-card">
            <div class="stage-tag">STAGE 01 // DEFINITION</div>
            <h4 class="stage-name">THE CORE PROBLEM</h4>
            <p class="stage-text">${proj.caseStudy.problem}</p>
          </div>

          <!-- 02 DATA -->
          <div class="cs-stage-card">
            <div class="stage-tag">STAGE 02 // INGESTION</div>
            <h4 class="stage-name">DATA CORPUS & CHARACTERISTICS</h4>
            <p class="stage-text">${proj.caseStudy.data}</p>
          </div>

          <!-- 03 PREPROCESSING -->
          <div class="cs-stage-card">
            <div class="stage-tag">STAGE 03 // TRANSFORMATION</div>
            <h4 class="stage-name">FEATURE ENGINEERING & CLEANING</h4>
            <p class="stage-text">${proj.caseStudy.preprocessing}</p>
          </div>

          <!-- 04 MODEL -->
          <div class="cs-stage-card">
            <div class="stage-tag">STAGE 04 // ARCHITECTURE</div>
            <h4 class="stage-name">MODEL SELECTION & OPTIMIZATION</h4>
            <p class="stage-text">${proj.caseStudy.model}</p>
          </div>

          <!-- 05 EVALUATION -->
          <div class="cs-stage-card">
            <div class="stage-tag">STAGE 05 // VERIFICATION</div>
            <h4 class="stage-name">DIAGNOSTIC METRICS & VALIDATION</h4>
            <p class="stage-text">${proj.caseStudy.evaluation}</p>
          </div>

          <!-- 06 DEPLOYMENT -->
          <div class="cs-stage-card">
            <div class="stage-tag">STAGE 06 // PRODUCTION</div>
            <h4 class="stage-name">SERVING & CONTAINERIZATION</h4>
            <p class="stage-text">${proj.caseStudy.deployment}</p>
          </div>

          <!-- 07 RESULT -->
          <div class="cs-stage-card result-highlight-card">
            <div class="stage-tag">STAGE 07 // MEASURABLE OUTCOME</div>
            <h4 class="stage-name">DEPLOYED RESULT & IMPACT</h4>
            <p class="stage-text">${proj.caseStudy.result}</p>
          </div>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudy() {
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Card click triggers
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      // If clicked on an explicit anchor or button that is not case study trigger
      const target = e.target as HTMLElement;
      if (target.closest('a') && !target.closest('.case-study-trigger')) {
        return;
      }
      const projId = card.getAttribute('data-project-id');
      const found = portfolioData.projects.find((p) => p.id === projId);
      if (found) openCaseStudy(found);
    });

    // Keyboard enter support
    card.addEventListener('keydown', (e: any) => {
      if (e.key === 'Enter') {
        const projId = card.getAttribute('data-project-id');
        const found = portfolioData.projects.find((p) => p.id === projId);
        if (found) openCaseStudy(found);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCaseStudy);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCaseStudy();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
      closeCaseStudy();
    }
  });
}
