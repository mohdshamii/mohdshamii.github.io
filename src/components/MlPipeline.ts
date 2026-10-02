import { portfolioData } from '../data/portfolio.ts';

export function renderMlPipeline(): string {
  const { mlPipeline } = portfolioData;

  return `
    <section id="pipeline" class="pipeline-section" aria-label="Machine Learning Methodology — How I Build ML Systems">
      <div class="section-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div class="section-header-pill">
            <span class="pill-dot"></span>
            <span>STANDARDS & METHODOLOGY</span>
          </div>
          <h2 class="section-main-heading">HOW I BUILD ML SYSTEMS</h2>
          <p class="section-sub-heading">
            A 9-stage disciplined engineering lifecycle that prevents data leakage, optimizes bias-variance trade-offs, and ships containerized inference.
          </p>
        </div>

        <!-- 9-Stage Connected Pipeline Grid -->
        <div class="pipeline-grid" id="ml-pipeline-grid">
          ${mlPipeline
            .map(
              (stage, idx) => `
            <div class="pipeline-stage-card" data-stage-idx="${idx}" id="stage-${stage.step}">
              <div class="stage-number-header">
                <span class="stage-step-num">${stage.step}</span>
                <span class="stage-step-line"></span>
                <div class="stage-active-pulse"></div>
              </div>

              <div class="stage-body">
                <h3 class="stage-title">${stage.title}</h3>
                <span class="stage-tagline">${stage.tagline}</span>

                <ul class="stage-details-list">
                  ${stage.details
                    .map(
                      (d) => `
                    <li>
                      <span class="detail-dot">▹</span>
                      <span>${d}</span>
                    </li>
                  `
                    )
                    .join('')}
                </ul>

                <div class="stage-tools-bar">
                  ${stage.tools.map((t) => `<span class="tool-chip">${t}</span>`).join('')}
                </div>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

export function initMlPipelineEvents() {
  const cards = document.querySelectorAll('.pipeline-stage-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('stage-in-view');
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((c) => observer.observe(c));
}
