import { profileData } from '../data/profile.ts';

export function renderAchievements(): string {
  return `
    <section class="section" id="achievements">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Milestones</span>
          <h2 class="section-title">Key Achievements</h2>
          <p class="section-subtitle">
            Demonstrated commitment through competitive programming, academic leadership, and national technical showcases.
          </p>
        </div>

        <div class="achievements-grid">
          ${profileData.achievements
            .map(
              ach => `
            <div class="achievement-card">
              <span class="achievement-cat">${ach.category}</span>
              <h3 class="achievement-title">${ach.title}</h3>
              <p class="achievement-desc">${ach.description}</p>
              <span class="achievement-highlight">${ach.highlight} · ${ach.year}</span>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
