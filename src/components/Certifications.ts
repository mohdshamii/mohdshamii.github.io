import { portfolioData } from '../data/portfolio.ts';

export function renderCertifications(): string {
  const { certifications } = portfolioData;

  return `
    <section id="certifications" class="certifications-section" aria-label="Verified Certifications and Credentials">
      <div class="section-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div class="section-header-pill">
            <span class="pill-dot"></span>
            <span>VERIFIED COMPETENCIES</span>
          </div>
          <h2 class="section-main-heading">CERTIFICATIONS & CREDENTIALS</h2>
          <p class="section-sub-heading">
            Authentic, verifiable certifications across deep learning architectures, statistical data analysis, and relational query design.
          </p>
        </div>

        <!-- Glass Certificate Wall Grid -->
        <div class="certifications-wall-grid">
          ${certifications
            .map(
              (cert) => `
            <div class="cert-glass-card" data-cursor="open">
              <div class="cert-top-row">
                <div class="cert-issuer-badge">
                  <span class="issuer-icon">◈</span>
                  <span class="issuer-name">${cert.issuer}</span>
                </div>
                <span class="cert-year-tag">${cert.year}</span>
              </div>

              <div class="cert-body">
                <h3 class="cert-title">${cert.title}</h3>
                <span class="cert-domain">${cert.domain}</span>
                <p class="cert-desc">${cert.description}</p>
              </div>

              <div class="cert-footer">
                <a
                  href="${cert.verifyUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cert-verify-link"
                >
                  <span>VERIFY ON LINKEDIN</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
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
