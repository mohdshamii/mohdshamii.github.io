import { projectsData } from '../data/projects.ts';
import { renderProjectCard } from './ProjectCard.ts';

export function renderProjects(): string {
  return `
    <section class="section" id="projects">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Featured Work</span>
          <h2 class="section-title">Selected Engineering Projects</h2>
          <p class="section-subtitle">
            Production-oriented machine learning applications, predictive analytics systems, and data pipelines.
          </p>
        </div>

        <div class="projects-grid">
          ${projectsData.map(project => renderProjectCard(project)).join('')}
        </div>
      </div>
    </section>
  `;
}
