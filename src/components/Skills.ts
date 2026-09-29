import { skillCategories } from '../data/skills.ts';

export function renderSkills(): string {
  return `
    <section class="section" id="skills">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Technical Competencies</span>
          <h2 class="section-title">Skills & Technologies</h2>
          <p class="section-subtitle">
            Tools, frameworks, and methodologies rigorously verified through coursework, internships, and shipped projects.
          </p>
        </div>

        <div class="skills-grid">
          ${skillCategories
            .map(
              cat => `
            <div class="skill-category-card">
              <div class="skill-category-header">
                <h3>${cat.category}</h3>
                <p class="skill-category-desc">${cat.description}</p>
              </div>

              <div class="skill-pills">
                ${cat.skills.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
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
