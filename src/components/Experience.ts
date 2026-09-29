import { experiences } from '../data/experience.ts';

export function renderExperience(): string {
  return `
    <section class="section" id="experience">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Work History</span>
          <h2 class="section-title">Industry Experience</h2>
          <p class="section-subtitle">
            Hands-on engineering roles developing ML models, data pipelines, and analytical systems.
          </p>
        </div>

        <div class="experience-list">
          ${experiences
            .map(
              exp => `
            <div class="experience-card">
              <div class="experience-header">
                <div class="experience-title-group">
                  <h3>${exp.role}</h3>
                  <div class="experience-company">${exp.company} · ${exp.location}</div>
                </div>
                <div class="experience-date-badge">
                  <i class="far fa-calendar-alt"></i> ${exp.period}
                </div>
              </div>

              <ul class="experience-bullets">
                ${exp.highlights.map(point => `<li>${point}</li>`).join('')}
              </ul>

              <div class="tech-tags">
                ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
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
