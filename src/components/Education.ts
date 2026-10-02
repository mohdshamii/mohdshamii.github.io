import { portfolioData } from '../data/portfolio.ts';

export function renderEducation(): string {
  const { education } = portfolioData;

  return `
    <section id="education" class="education-section" aria-label="Education & Academic Track Record">
      <div class="section-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div class="section-header-pill">
            <span class="pill-dot"></span>
            <span>ACADEMIC FOUNDATIONS</span>
          </div>
          <h2 class="section-main-heading">EDUCATION & RIGOR</h2>
          <p class="section-sub-heading">
            Formal undergraduate training in mathematical foundations, statistical learning, and distributed AI engineering.
          </p>
        </div>

        <!-- Futuristic Academic Timeline 2023 -> 2027 -->
        <div class="academic-timeline-card">
          <div class="academic-timeline-header">
            <div class="academic-cohort-badge">
              <span class="badge-star">★</span>
              <span>${education.rank.toUpperCase()}</span>
            </div>
            <div class="academic-timeline-span">
              <span>ACADEMIC HORIZON: 2023</span>
              <span class="span-arrow">──────▶</span>
              <span class="span-target">EXPECTED 2027</span>
            </div>
          </div>

          <div class="academic-main-body">
            <div class="academic-details-col">
              <div class="institution-name">${education.institution}</div>
              <h3 class="degree-title">${education.degree}</h3>
              <div class="academic-location-row">
                <i class="fa-solid fa-location-dot"></i>
                <span>${education.location}</span>
                <span class="dot-sep">•</span>
                <span class="academic-period-text">${education.period}</span>
              </div>
              <p class="academic-summary">${education.description}</p>
            </div>

            <div class="academic-stats-col">
              <div class="cgpa-stat-box">
                <span class="cgpa-value">${education.cgpa}</span>
                <span class="cgpa-label">CUMULATIVE CGPA</span>
                <span class="cgpa-sub">Highest in Department</span>
              </div>
            </div>
          </div>

          <!-- Core Curriculum & Coursework -->
          <div class="coursework-section">
            <h4 class="coursework-title">RELEVANT SPECIALIZED COURSEWORK</h4>
            <div class="coursework-tags-grid">
              ${education.coreCourses
                .map(
                  (c) => `
                <div class="course-chip">
                  <span class="chip-dot"></span>
                  <span>${c}</span>
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
