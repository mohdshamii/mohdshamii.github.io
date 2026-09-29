import { profileData } from '../data/profile.ts';

export function renderEducation(): string {
  const edu = profileData.education[0];
  return `
    <section class="section" id="education">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Academic Background</span>
          <h2 class="section-title">Education</h2>
          <p class="section-subtitle">
            Formal training in algorithmic principles, statistical data science, and artificial intelligence.
          </p>
        </div>

        <div class="education-card">
          <div class="edu-header">
            <div class="edu-title">
              <h3>${edu.degree}</h3>
              <div class="edu-institution">${edu.institution} · ${edu.location}</div>
            </div>

            <div class="edu-badge-group">
              <span class="edu-badge"><i class="fas fa-trophy"></i> ${edu.badge}</span>
              <span class="edu-badge"><i class="fas fa-star"></i> CGPA: ${edu.cgpa}</span>
              <span class="edu-period"><i class="far fa-calendar-alt"></i> ${edu.period}</span>
            </div>
          </div>

          <p style="font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.6;">
            ${edu.details}
          </p>
        </div>
      </div>
    </section>
  `;
}
