import { portfolioData } from '../data/portfolio.ts';
import { scrollToTarget } from '../animations/lenis.ts';

export function renderHero(): string {
  const { identity } = portfolioData;

  return `
    <section id="hero" class="hero-section github-hero-section" aria-label="Developer Profile Introduction">
      <div class="section-container">
        <!-- GitHub Developer Profile Header -->
        <div class="gh-profile-header">
          <div class="gh-avatar-col">
            <div class="gh-avatar-wrapper">
              <img src="/img/profile.png" alt="Mohd Shami" class="gh-avatar-img" />
              <span class="gh-status-badge" title="Status: Open to roles">
                <span class="gh-status-dot"></span>
              </span>
            </div>
          </div>
          <div class="gh-profile-details">
            <div class="gh-name-row">
              <h1 class="gh-profile-name">${identity.name}</h1>
              <span class="gh-profile-handle">@mohdshamii</span>
              <span class="gh-role-pill">AI / ML ENGINEER</span>
            </div>
            <p class="gh-bio-text">
              Data Science Student & AI/ML Engineer building and deploying production-grade Machine Learning pipelines,
              Deep Learning (CNN) vision architectures, NLP classification engines, and real-time Flask inference APIs.
            </p>
            <div class="gh-meta-list">
              <span class="gh-meta-item">
                <i class="fa-solid fa-graduation-cap"></i>
                <span>B.Tech 2027 (CGPA 8.5/10)</span>
              </span>
              <span class="gh-meta-item">
                <i class="fa-solid fa-location-dot"></i>
                <span>${identity.location}</span>
              </span>
              <span class="gh-meta-item">
                <i class="fa-regular fa-envelope"></i>
                <a href="mailto:${identity.email}">${identity.email}</a>
              </span>
              <span class="gh-meta-item gh-meta-status">
                <span class="status-indicator-dot green"></span>
                <span>${identity.status}</span>
              </span>
            </div>

            <!-- GitHub Action Buttons -->
            <div class="gh-action-buttons">
              <a href="#projects" class="gh-btn gh-btn-primary" id="hero-btn-work">
                <svg class="octicon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.6-1.2-1.6 1.2a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                <span>View Systems</span>
              </a>

              <a href="#diff-inspector" class="gh-btn gh-btn-secondary">
                <svg class="octicon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.5 5.396l2.323-2.323a.75.75 0 0 1 1.06 1.06l-2.853 2.854a.75.75 0 0 1-1.06 0L6.116 4.134a.75.75 0 1 1 1.061-1.06Z"></path>
                </svg>
                <span>Traces & Diff</span>
              </a>

              <a href="${identity.resumeUrl}" target="_blank" rel="noopener noreferrer" download="Mohd_Shami_Resume.pdf" class="gh-btn gh-btn-secondary">
                <svg class="octicon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"></path>
                  <path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z"></path>
                </svg>
                <span>Resume PDF</span>
              </a>

              <a href="${identity.socials.github}" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-secondary">
                <i class="fa-brands fa-github"></i>
                <span>GitHub</span>
              </a>

              <a href="${identity.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-secondary">
                <i class="fa-brands fa-linkedin"></i>
                <span>LinkedIn</span>
              </a>

              <a href="/lab/index.html" class="gh-btn gh-btn-secondary gh-btn-lab">
                <i class="fa-solid fa-flask-vial"></i>
                <span>Super Intelligence Lab</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Pinned Repositories & Coding Platforms -->
        <div class="gh-pinned-section">
          <div class="gh-pinned-heading">
            <span class="gh-pinned-title">Pinned Platforms & Core Systems</span>
            <div class="gh-role-cycler-wrap">
              <span class="gh-cycler-label">Specialization:</span>
              <span id="hero-role-cycler" class="gh-cycler-active">Python</span>
            </div>
          </div>

          <div class="gh-pinned-grid">
            <!-- 1. CorOrbit / PyDSA -->
            <div class="gh-repo-card">
              <div class="gh-repo-top">
                <svg class="octicon repo-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.6-1.2-1.6 1.2a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                <a href="https://mohdshamii.github.io/PyDSA" target="_blank" rel="noopener noreferrer" class="gh-repo-name">CorOrbit / PyDSA</a>
                <span class="gh-badge-pill">Public</span>
              </div>
              <p class="gh-repo-desc">Interactive platform to master Python & 850+ algorithms with runtime complexity benchmarking.</p>
              <div class="gh-repo-footer">
                <span class="gh-lang"><span class="gh-lang-dot python"></span> Python</span>
                <div class="gh-repo-links">
                  <a href="https://mohdshamii.github.io/PyDSA" target="_blank" rel="noopener noreferrer" class="gh-link-text">Live Platform ↗</a>
                  <a href="https://github.com/mohdshamii/PyDSA" target="_blank" rel="noopener noreferrer" class="gh-link-text">Code ↗</a>
                </div>
              </div>
            </div>

            <!-- 2. DSAos -->
            <div class="gh-repo-card">
              <div class="gh-repo-top">
                <svg class="octicon repo-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.6-1.2-1.6 1.2a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                <a href="https://mohdshamii.github.io/DSAos" target="_blank" rel="noopener noreferrer" class="gh-repo-name">DSAos</a>
                <span class="gh-badge-pill">Public</span>
              </div>
              <p class="gh-repo-desc">Top 250 DSA problems for product MNCs & campus placements covering 14 core interview patterns.</p>
              <div class="gh-repo-footer">
                <span class="gh-lang"><span class="gh-lang-dot python"></span> Python</span>
                <div class="gh-repo-links">
                  <a href="https://mohdshamii.github.io/DSAos" target="_blank" rel="noopener noreferrer" class="gh-link-text">Live Roadmap ↗</a>
                  <a href="https://github.com/mohdshamii/DSAos" target="_blank" rel="noopener noreferrer" class="gh-link-text">Code ↗</a>
                </div>
              </div>
            </div>

            <!-- 3. GateDA -->
            <div class="gh-repo-card">
              <div class="gh-repo-top">
                <svg class="octicon repo-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.6-1.2-1.6 1.2a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                <a href="https://mohdshamii.github.io/GateDA" target="_blank" rel="noopener noreferrer" class="gh-repo-name">GateDA</a>
                <span class="gh-badge-pill">Public</span>
              </div>
              <p class="gh-repo-desc">GATE Data Science & AI preparation portal: Probability, Linear Algebra, ML theory & Relational Databases.</p>
              <div class="gh-repo-footer">
                <span class="gh-lang"><span class="gh-lang-dot jupyter"></span> Data Science</span>
                <div class="gh-repo-links">
                  <a href="https://mohdshamii.github.io/GateDA" target="_blank" rel="noopener noreferrer" class="gh-link-text">Study Portal ↗</a>
                  <a href="https://github.com/mohdshamii/GateDA" target="_blank" rel="noopener noreferrer" class="gh-link-text">Code ↗</a>
                </div>
              </div>
            </div>

            <!-- 4. Revive -->
            <div class="gh-repo-card">
              <div class="gh-repo-top">
                <svg class="octicon repo-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.6-1.2-1.6 1.2a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                <a href="https://github.com/mohdshamii/Revive" target="_blank" rel="noopener noreferrer" class="gh-repo-name">Revive</a>
                <span class="gh-badge-pill">Public</span>
              </div>
              <p class="gh-repo-desc">Clinical AI diagnostic system (XGBoost, 0.91 AUC-ROC, Docker container, 38ms latency API).</p>
              <div class="gh-repo-footer">
                <span class="gh-lang"><span class="gh-lang-dot python"></span> Python / ML</span>
                <div class="gh-repo-links">
                  <a href="/lab/index.html#disease-tab" class="gh-link-text">Live Model ↗</a>
                  <a href="https://github.com/mohdshamii/Revive" target="_blank" rel="noopener noreferrer" class="gh-link-text">Code ↗</a>
                </div>
              </div>
            </div>

            <!-- 5. HydroRaksh -->
            <div class="gh-repo-card">
              <div class="gh-repo-top">
                <svg class="octicon repo-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.6-1.2-1.6 1.2a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                <a href="https://github.com/mohdshamii/HydroRaksh" target="_blank" rel="noopener noreferrer" class="gh-repo-name">HydroRaksh</a>
                <span class="gh-badge-pill">Public</span>
              </div>
              <p class="gh-repo-desc">Automated water conservation & flood monitoring architecture with real-time sensor analytics.</p>
              <div class="gh-repo-footer">
                <span class="gh-lang"><span class="gh-lang-dot python"></span> IoT & Python</span>
                <div class="gh-repo-links">
                  <a href="https://github.com/mohdshamii/HydroRaksh" target="_blank" rel="noopener noreferrer" class="gh-link-text">Code ↗</a>
                </div>
              </div>
            </div>

            <!-- 6. 100 Days of AI/ML -->
            <div class="gh-repo-card">
              <div class="gh-repo-top">
                <svg class="octicon repo-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.6-1.2-1.6 1.2a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                <a href="https://github.com/mohdshamii/100" target="_blank" rel="noopener noreferrer" class="gh-repo-name">100-Days-AI-ML</a>
                <span class="gh-badge-pill">Public</span>
              </div>
              <p class="gh-repo-desc">Complete 100 days AI/ML roadmap with research papers, free textbook library & 100+ notebooks.</p>
              <div class="gh-repo-footer">
                <span class="gh-lang"><span class="gh-lang-dot jupyter"></span> Roadmap</span>
                <div class="gh-repo-links">
                  <a href="https://github.com/mohdshamii/100" target="_blank" rel="noopener noreferrer" class="gh-link-text">Roadmap ↗</a>
                </div>
              </div>
            </div>

            <!-- 7. Industrial Training -->
            <div class="gh-repo-card">
              <div class="gh-repo-top">
                <svg class="octicon repo-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.6-1.2-1.6 1.2a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                <a href="https://github.com/mohdshamii/Industrial-training" target="_blank" rel="noopener noreferrer" class="gh-repo-name">Industrial-Training</a>
                <span class="gh-badge-pill">Public</span>
              </div>
              <p class="gh-repo-desc">Extensive collection of industry-grade Machine Learning and applied Python projects & pipelines.</p>
              <div class="gh-repo-footer">
                <span class="gh-lang"><span class="gh-lang-dot python"></span> Applied ML</span>
                <div class="gh-repo-links">
                  <a href="https://github.com/mohdshamii/Industrial-training" target="_blank" rel="noopener noreferrer" class="gh-link-text">Code ↗</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Status Capsules Bar -->
        <div class="gh-status-capsules-bar">
          <div class="status-capsule success">
            <span class="capsule-dot green"></span>
            <span>850+ DSA in Python</span>
          </div>
          <div class="status-capsule success">
            <span class="capsule-dot green"></span>
            <span>85.0% Clinical Accuracy (0.91 AUC)</span>
          </div>
          <div class="status-capsule success">
            <span class="capsule-dot green"></span>
            <span>97.8% NLP Accuracy (SpamAssassin)</span>
          </div>
          <div class="status-capsule running">
            <span class="capsule-dot amber"></span>
            <span>38ms Flask Latency (Dockerized)</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initHeroEvents() {
  // Dynamic Keyword Cycler
  const cyclerEl = document.getElementById('hero-role-cycler');
  const roles = portfolioData.identity.animatedRoles;
  let roleIdx = 0;

  if (cyclerEl && roles.length > 0) {
    setInterval(() => {
      roleIdx = (roleIdx + 1) % roles.length;
      cyclerEl.textContent = roles[roleIdx];
    }, 2200);
  }

  // Smooth scroll buttons
  const workBtn = document.getElementById('hero-btn-work');
  if (workBtn) {
    workBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTarget('#projects');
    });
  }
}
