import { profileData } from '../data/profile.ts';

export function renderCertifications(): string {
  return `
    <section class="section" id="certifications">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Credentials</span>
          <h2 class="section-title">Certifications</h2>
          <p class="section-subtitle">
            External credentials and professional certifications in data analysis, machine learning, and programming.
          </p>
        </div>

        <div class="credentials-grid">
          ${profileData.certifications
            .map(
              cert => `
            <div class="credential-card">
              <div>
                <div class="cred-issuer">${cert.issuer}</div>
                <h3 class="cred-title">${cert.title}</h3>
                <p class="cred-desc">${cert.description}</p>
              </div>

              <div class="cred-footer">
                <span>Issued ${cert.year}</span>
                ${
                  cert.verifyUrl
                    ? `<a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="cred-verify">Verify Credential <i class="fas fa-external-link-alt" style="font-size: 0.7rem;"></i></a>`
                    : ''
                }
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
