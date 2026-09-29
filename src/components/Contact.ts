import { profileData } from '../data/profile.ts';

export function renderContact(): string {
  return `
    <section class="section" id="contact">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Let's Connect</span>
          <h2 class="section-title">Contact & Opportunities</h2>
          <p class="section-subtitle">
            Interested in discussing Data Science, Machine Learning, or Analytics opportunities? Reach out directly.
          </p>
        </div>

        <div class="contact-grid">
          <div class="contact-card-box">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
              Direct Channels
            </h3>
            <p style="font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.6;">
              I respond promptly to recruiter inquiries, technical discussions, and collaborative project proposals.
            </p>

            <div class="contact-channels">
              <div class="contact-channel-item">
                <div class="contact-icon-bubble">
                  <i class="fas fa-envelope"></i>
                </div>
                <div>
                  <div class="contact-info-label">Email</div>
                  <a href="mailto:${profileData.email}" class="contact-info-val">${profileData.email}</a>
                </div>
              </div>

              <div class="contact-channel-item">
                <div class="contact-icon-bubble">
                  <i class="fas fa-phone"></i>
                </div>
                <div>
                  <div class="contact-info-label">Phone</div>
                  <a href="tel:${profileData.phone.replace(/\s+/g, '')}" class="contact-info-val">${profileData.phone}</a>
                </div>
              </div>

              <div class="contact-channel-item">
                <div class="contact-icon-bubble">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <div class="contact-info-label">Location</div>
                  <span class="contact-info-val">${profileData.location}</span>
                </div>
              </div>

              <div class="contact-channel-item">
                <div class="contact-icon-bubble">
                  <i class="fab fa-linkedin"></i>
                </div>
                <div>
                  <div class="contact-info-label">LinkedIn</div>
                  <a href="${profileData.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-info-val">linkedin.com/in/mohdshamii</a>
                </div>
              </div>

              <div class="contact-channel-item">
                <div class="contact-icon-bubble">
                  <i class="fab fa-github"></i>
                </div>
                <div>
                  <div class="contact-info-label">GitHub</div>
                  <a href="${profileData.socials.github}" target="_blank" rel="noopener noreferrer" class="contact-info-val">github.com/mohdshamii</a>
                </div>
              </div>

              <div class="contact-channel-item">
                <div class="contact-icon-bubble">
                  <i class="fas fa-code"></i>
                </div>
                <div>
                  <div class="contact-info-label">LeetCode</div>
                  <a href="${profileData.socials.leetcode}" target="_blank" rel="noopener noreferrer" class="contact-info-val">leetcode.com/u/mohdshamii</a>
                </div>
              </div>
            </div>
          </div>

          <div class="resume-download-card">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-sm); background-color: var(--accent-light); color: var(--accent-color); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; margin-bottom: 1.25rem;">
              <i class="fas fa-file-pdf"></i>
            </div>
            <h3>Download Official Resume</h3>
            <p>
              Access a comprehensive, printer-ready one-page curriculum vitae covering technical skills, project architecture metrics, coursework, and internship records.
            </p>
            <div class="resume-download-actions">
              <a href="${profileData.resumeUrl}" download class="btn btn-primary">
                <i class="fas fa-download"></i>
                <span>Download Resume (PDF)</span>
              </a>
              <a href="${profileData.resumeUrl}" target="_blank" class="btn btn-secondary">
                <i class="fas fa-external-link-alt"></i>
                <span>Open in New Tab</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
