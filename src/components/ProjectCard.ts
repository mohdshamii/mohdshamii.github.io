import { Project } from '../data/projects.ts';

export function renderProjectCard(project: Project): string {
  return `
    <div class="project-card" id="project-${project.id}">
      <div class="project-top">
        <div class="project-name-group">
          <h3>${project.name}</h3>
          <div class="project-tagline">${project.tagline}</div>
        </div>

        <div class="project-links">
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="View Source on GitHub">
            <i class="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          ${
            project.liveDemoUrl
              ? `
            <a href="${project.liveDemoUrl}" class="project-link-btn" title="Interactive Simulation">
              <i class="fas fa-play"></i>
              <span>Interactive Demo</span>
            </a>
          `
              : ''
          }
        </div>
      </div>

      <div class="project-breakdown">
        <div class="breakdown-item">
          <span class="breakdown-label">What:</span>
          <span>${project.what}</span>
        </div>
        <div class="breakdown-item">
          <span class="breakdown-label">Why:</span>
          <span>${project.why}</span>
        </div>
        <div class="breakdown-item">
          <span class="breakdown-label">How:</span>
          <span>${project.how}</span>
        </div>
        <div class="breakdown-item">
          <span class="breakdown-label">Result:</span>
          <span><strong>${project.result}</strong></span>
        </div>
      </div>

      <div class="tech-tags">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    </div>
  `;
}
