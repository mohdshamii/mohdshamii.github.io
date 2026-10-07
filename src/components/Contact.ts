import { portfolioData } from '../data/portfolio.ts';

export function renderContact(): string {
  const { identity } = portfolioData;

  return `
    <section id="contact" class="contact-section" aria-label="Contact Mohd Shami">
      <div class="section-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div class="section-header-pill">
            <span class="pill-dot"></span>
            <span>GET IN TOUCH</span>
          </div>
          <h2 class="section-main-heading contact-main-title">
            LET'S BUILD<br/>
            <span class="headline-gradient">SOMETHING INTELLIGENT.</span>
          </h2>
          <p class="section-sub-heading">
            Currently open to AI/ML Engineer roles, Data Science internships, and production ML opportunities.
          </p>
        </div>

        <div class="contact-layout-grid">
          <!-- Left: Direct Channels & Telemetry -->
          <div class="contact-info-panel">
            <!-- Terminal Initiation Widget -->
            <div class="contact-terminal-box">
              <div class="terminal-bar">
                <div class="term-dots">
                  <span class="t-dot t-red"></span>
                  <span class="t-dot t-yellow"></span>
                  <span class="t-dot t-green"></span>
                </div>
                <span class="term-title">connection_handshake.sh</span>
              </div>
              <div class="terminal-code-body">
                <p class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">initialize_connection()</span></p>
                <p class="term-line text-muted">&gt; Handshake protocol initialized...</p>
                <p class="term-line text-muted">&gt; Location: Moradabad, UP, India</p>
                <p class="term-line text-success">&gt; <span class="pulse-dot-inline"></span> <strong id="connection-status-text">CONNECTION_READY // SECURE</strong></p>
              </div>
            </div>

            <!-- Direct Contact List -->
            <div class="contact-methods-list">
              <!-- Email -->
              <a href="mailto:${identity.email}" class="contact-method-card" data-cursor="open">
                <div class="method-icon-wrap">
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <div class="method-meta">
                  <span class="method-label">DIRECT EMAIL</span>
                  <span class="method-val">${identity.email}</span>
                </div>
                <span class="method-arrow">↗</span>
              </a>


              <!-- LinkedIn -->
              <a href="${identity.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-method-card" data-cursor="open">
                <div class="method-icon-wrap">
                  <i class="fa-brands fa-linkedin"></i>
                </div>
                <div class="method-meta">
                  <span class="method-label">LINKEDIN</span>
                  <span class="method-val">linkedin.com/in/mohdshamii</span>
                </div>
                <span class="method-arrow">↗</span>
              </a>

              <!-- GitHub -->
              <a href="${identity.socials.github}" target="_blank" rel="noopener noreferrer" class="contact-method-card" data-cursor="open">
                <div class="method-icon-wrap">
                  <i class="fa-brands fa-github"></i>
                </div>
                <div class="method-meta">
                  <span class="method-label">GITHUB</span>
                  <span class="method-val">github.com/mohdshamii</span>
                </div>
                <span class="method-arrow">↗</span>
              </a>
            </div>
          </div>

          <!-- Right: Interactive Direct Message Form -->
          <div class="contact-form-panel">
            <div class="form-wrapper-card">
              <div class="form-header">
                <span class="form-title">TRANSMIT DIRECT MESSAGE</span>
                <span class="form-status-tag">STATUS: IDLE</span>
              </div>

              <form id="portfolio-contact-form" class="contact-form">
                <div class="form-group">
                  <label for="contact-name" class="form-label">YOUR NAME</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    placeholder="e.g. Dr. Rajesh or Alex Morgan"
                    class="form-input"
                  />
                </div>

                <div class="form-group">
                  <label for="contact-email" class="form-label">YOUR EMAIL ADDRESS</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    placeholder="alex@company.com"
                    class="form-input"
                  />
                </div>

                <div class="form-group">
                  <label for="contact-subject" class="form-label">TOPIC / OPPORTUNITY</label>
                  <select id="contact-subject" name="subject" class="form-input form-select">
                    <option value="AI/ML Engineer Role">AI / ML Engineer Opportunity</option>
                    <option value="Data Science Internship">Data Science Internship</option>
                    <option value="Technical Collaboration">Technical Project Collaboration</option>
                    <option value="General Inquiry">General Technical Discussion</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="contact-message" class="form-label">MESSAGE</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    required
                    placeholder="Discuss team requirements, model specifications, or scheduling an introductory interview..."
                    class="form-input form-textarea"
                  ></textarea>
                </div>

                <button type="submit" class="submit-contact-btn" id="contact-submit-btn">
                  <span>SEND MESSAGE →</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </form>

              <div id="contact-feedback-box" class="contact-feedback" style="display: none;"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initContactEvents() {
  const form = document.getElementById('portfolio-contact-form') as HTMLFormElement | null;
  const feedback = document.getElementById('contact-feedback-box');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (document.getElementById('contact-name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('contact-email') as HTMLInputElement).value.trim();
    const subject = (document.getElementById('contact-subject') as HTMLSelectElement).value;
    const message = (document.getElementById('contact-message') as HTMLTextAreaElement).value.trim();

    if (!name || !email || !message) {
      feedback.style.display = 'block';
      feedback.className = 'contact-feedback error';
      feedback.textContent = 'Please fill out all required fields.';
      return;
    }

    // Launch native mail client with populated payload
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} from ${name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOpportunity: ${subject}\n\nMessage:\n${message}\n\nSent from mohdshamii.github.io`
    );
    const mailtoUrl = `mailto:${portfolioData.identity.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    feedback.style.display = 'block';
    feedback.className = 'contact-feedback success';
    feedback.innerHTML = `
      <p><strong>Launching email client...</strong></p>
      <span>If your mail client did not open automatically, please send directly to <strong>${portfolioData.identity.email}</strong>.</span>
    `;

    window.location.href = mailtoUrl;
  });
}
