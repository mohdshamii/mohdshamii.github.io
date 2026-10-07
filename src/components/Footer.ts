import { portfolioData } from '../data/portfolio.ts';

export function renderFooter(): string {
  const { identity } = portfolioData;

  return `
    <footer class="site-footer">
      <div class="footer-container">
        <!-- Brand & Specialization -->
        <div class="footer-brand-col">
          <div class="footer-brand-title">
            <span class="f-symbol">◈</span>
            <span class="f-name">${identity.name}</span>
          </div>
          <p class="footer-brand-role">${identity.role}</p>
          <p class="footer-brand-tags">
            Python • Machine Learning • Deep Learning • NLP • Computer Vision • Deployment
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-links-col">
          <div class="footer-col-title">NAVIGATION</div>
          <ul class="footer-nav-list">
            <li><a href="#projects">Work / Systems</a></li>
            <li><a href="#experience">Industry Experience</a></li>
            <li><a href="#skills">Skills Ecosystem</a></li>
            <li><a href="#pipeline">ML Pipeline</a></li>
            <li><a href="#about">About & Philosophy</a></li>
            <li><a href="#education">Education & Cohort</a></li>
          </ul>
        </div>

        <!-- Resources & Socials -->
        <div class="footer-social-col">
          <div class="footer-col-title">RESOURCES</div>
          <ul class="footer-nav-list">
            <li><a href="${identity.resumeUrl}" target="_blank" rel="noopener noreferrer" download="Mohd_Shami_Resume.pdf">Download Resume (.pdf)</a></li>
            <li><a href="${identity.socials.github}" target="_blank" rel="noopener noreferrer">GitHub Profile</a></li>
            <li><a href="${identity.socials.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></li>
            <li><a href="${identity.socials.leetcode}" target="_blank" rel="noopener noreferrer">LeetCode Profile</a></li>
            <li><a href="/lab/index.html">Super Intelligence Lab (/lab)</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom-bar">
        <div class="footer-container bottom-flex">
          <p class="footer-copy">© 2026 Mohd Shami. All rights reserved.</p>
          <div class="footer-back-to-top">
            <a href="#hero" class="back-top-link">
              <span>RETURN TO TOP</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
