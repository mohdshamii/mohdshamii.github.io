import { profileData } from '../data/profile.ts';

export function renderHero(): string {
  return `
    <section class="hero" id="hero">
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="hero-status-pill">
            <span class="status-dot"></span>
            <span>Available for ML & Data Science Internships / Roles</span>
          </div>

          <h1 class="hero-title">${profileData.name}</h1>
          <p class="hero-role">${profileData.role}</p>
          <p class="hero-description">${profileData.tagline}</p>

          <div class="hero-meta">
            <span class="hero-meta-item">
              <i class="fas fa-map-marker-alt"></i> ${profileData.location}
            </span>
            <span class="hero-meta-item">
              <i class="fas fa-graduation-cap"></i> B.Tech Data Science & AI (2027)
            </span>
            <span class="hero-meta-item">
              <i class="fas fa-award"></i> 1st Rank in Cohort (CGPA 8.5)
            </span>
          </div>

          <div class="hero-cta-group">
            <a href="#projects" class="btn btn-primary">
              <span>View Projects</span>
              <i class="fas fa-arrow-down"></i>
            </a>
            <a href="${profileData.resumeUrl}" download class="btn btn-secondary">
              <i class="fas fa-file-pdf"></i>
              <span>Download Resume</span>
            </a>
            <a href="/lab/index.html" class="btn btn-outline">
              <i class="fas fa-flask"></i>
              <span>Interactive AI Lab</span>
            </a>
          </div>

          <div class="hero-socials">
            <a href="${profileData.socials.github}" target="_blank" rel="noopener noreferrer" class="social-link" title="GitHub">
              <i class="fab fa-github"></i>
              <span>GitHub</span>
            </a>
            <a href="${profileData.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link" title="LinkedIn">
              <i class="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a href="${profileData.socials.leetcode}" target="_blank" rel="noopener noreferrer" class="social-link" title="LeetCode">
              <i class="fas fa-code"></i>
              <span>LeetCode</span>
            </a>
            <a href="mailto:${profileData.email}" class="social-link" title="Email">
              <i class="fas fa-envelope"></i>
              <span>Email</span>
            </a>
          </div>
        </div>

        <div class="hero-avatar-wrapper">
          <img src="/img/profile.png" alt="Mohd Shami - Data Science & AI Engineer" class="hero-avatar" width="220" height="220" loading="eager" decoding="async" />
        </div>
      </div>
    </section>
  `;
}
