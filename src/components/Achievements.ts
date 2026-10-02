import { portfolioData } from '../data/portfolio.ts';

export function renderAchievements(): string {
  const { achievements } = portfolioData;

  return `
    <section id="achievements" class="achievements-section" aria-label="Key Achievements and Recognition">
      <div class="section-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div class="section-header-pill">
            <span class="pill-dot"></span>
            <span>MILESTONES & HONORS</span>
          </div>
          <h2 class="section-main-heading">HONORS & ACHIEVEMENTS</h2>
          <p class="section-sub-heading">
            Verified milestones across national innovation challenges, competitive algorithmic practice, and academic standing.
          </p>
        </div>

        <!-- Futuristic Achievements Grid -->
        <div class="achievements-grid">
          ${achievements
            .map(
              (ach) => `
            <div class="achievement-card">
              <div class="ach-glow-ambient"></div>
              <div class="ach-header">
                <span class="ach-category">${ach.category}</span>
                <span class="ach-year">${ach.year}</span>
              </div>
              <h3 class="ach-title">${ach.title}</h3>
              <div class="ach-highlight-pill">${ach.highlight}</div>
              <p class="ach-desc">${ach.description}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
