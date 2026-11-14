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
                <i class="fa-solid fa-code-branch"></i>
                <span>51 Repositories</span>
              </span>
              <span class="gh-meta-item">
                <i class="fa-solid fa-users"></i>
                <span>237 Followers</span>
              </span>
              <span class="gh-meta-item">
                <i class="fa-solid fa-chart-line"></i>
                <span>1,267+ Contributions</span>
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

              <a href="/lab/index.html" class="gh-btn gh-btn-secondary gh-btn-lab" title="Launch Super Intelligence Lab (/lab)">
                <i class="fa-solid fa-flask-vial"></i>
                <span>Super Intelligence Lab</span>
              </a>

              <a href="https://docunexa.github.io/" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-secondary gh-btn-docunexa" title="DocuNexa — All-in-One In-Browser Document & PDF Converter (100% Client-Side)">
                <i class="fa-solid fa-file-pdf"></i>
                <span>DocuNexa</span>
              </a>
            </div>

            <!-- GitHub Verified Achievements Row -->
            <div class="gh-achievements-bar">
              <span class="gh-achievements-label">
                <i class="fa-solid fa-award" style="color: #e3b341;"></i>
                <span>Achievements</span>
              </span>
              <div class="gh-badges-cluster">
                <a href="https://github.com/mohdshamii?tab=achievements" target="_blank" rel="noopener noreferrer" class="gh-badge-chip" title="Pull Shark (Bronze Tier) — Merged pull requests">
                  <img src="https://github.githubassets.com/assets/pull-shark-bronze-a37accb528d1.png" alt="Pull Shark" loading="lazy" />
                  <span>Pull Shark</span>
                  <span class="gh-badge-tier">Bronze</span>
                </a>
                <a href="https://github.com/mohdshamii?tab=achievements" target="_blank" rel="noopener noreferrer" class="gh-badge-chip" title="Pair Extraordinaire — Co-authored commits on merged PRs">
                  <img src="https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png" alt="Pair Extraordinaire" loading="lazy" />
                  <span>Pair Extraordinaire</span>
                </a>
                <a href="https://github.com/mohdshamii?tab=achievements" target="_blank" rel="noopener noreferrer" class="gh-badge-chip" title="Starstruck — Created repositories that earned community stars">
                  <img src="https://github.githubassets.com/assets/starstruck-default--light-a594e2a027e0.png" alt="Starstruck" loading="lazy" />
                  <span>Starstruck</span>
                </a>
                <a href="https://github.com/mohdshamii?tab=achievements" target="_blank" rel="noopener noreferrer" class="gh-badge-chip" title="Quickdraw — Closed an issue or PR within 5 minutes of opening">
                  <img src="https://github.githubassets.com/assets/quickdraw-default--light-8f798b35341a.png" alt="Quickdraw" loading="lazy" />
                  <span>Quickdraw</span>
                </a>
                <a href="https://github.com/mohdshamii?tab=achievements" target="_blank" rel="noopener noreferrer" class="gh-badge-chip" title="YOLO — Merged a PR without code review">
                  <img src="https://github.githubassets.com/assets/yolo-default-be0bbff04951.png" alt="YOLO" loading="lazy" />
                  <span>YOLO</span>
                </a>
              </div>
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

        <!-- Open-Source Contributions Section -->
        <div class="gh-contributions-section">
          <div class="gh-pinned-heading">
            <span class="gh-pinned-title">
              <svg class="octicon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="color: var(--accent); vertical-align: text-bottom; margin-right: 0.35rem;">
                <path d="M7.177 3.073 9.573.677A.25.25 0 0 1 10 .854v4.792a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-2.25.75a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677 8.354 2.396 2.396A.25.25 0 0 0 10 13.823V9.031a.25.25 0 0 0-.427-.177L7.177 11.25a.25.25 0 0 0 0 .354ZM3.75 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm9.5-6.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm1.5-.75a2.25 2.25 0 1 1-3-2.122V2.5a.75.75 0 0 1 1.5 0v.128A2.251 2.251 0 0 1 14.75 4.75Zm-2.25 6.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm1.5-.75a2.25 2.25 0 1 1-3-2.122V8.5a.75.75 0 0 1 1.5 0v-.128A2.251 2.251 0 0 1 14.75 10.5Z"></path>
              </svg>
              Open-Source Contributions
            </span>
            <a href="https://github.com/mohdshamii" target="_blank" rel="noopener noreferrer" class="gh-link-text">
              View Profile on GitHub ↗
            </a>
          </div>

          <div class="gh-contributions-grid">
            <!-- 1. Streamlit -->
            <div class="gh-repo-card">
              <div class="gh-repo-top">
                <svg class="octicon repo-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.6-1.2-1.6 1.2a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                <a href="https://github.com/streamlit/streamlit" target="_blank" rel="noopener noreferrer" class="gh-repo-name">streamlit / streamlit</a>
                <span class="gh-badge-pill" style="color: #2da44e; border-color: #2da44e;">Merged PR</span>
              </div>
              <p class="gh-repo-desc">
                Co-authored merged bug fix in <code>streamlit/streamlit</code> (<a href="https://github.com/streamlit/streamlit/pull/17960" target="_blank" rel="noopener noreferrer" class="gh-link-text">PR #17960</a>, closes <a href="https://github.com/streamlit/streamlit/issues/17957" target="_blank" rel="noopener noreferrer" class="gh-link-text">#17957</a>) rejecting reversed <code>st.date_input</code> query-parameter ranges with fallback deserialization.
              </p>
              <div class="gh-repo-footer">
                <span class="gh-lang"><span class="gh-lang-dot python"></span> Python</span>
                <div class="gh-repo-links">
                  <a href="https://github.com/streamlit/streamlit/pull/17960" target="_blank" rel="noopener noreferrer" class="gh-link-text">Merged PR #17960 ↗</a>
                  <a href="https://github.com/streamlit/streamlit" target="_blank" rel="noopener noreferrer" class="gh-link-text">Repo ↗</a>
                </div>
              </div>
            </div>

            <!-- 2. PyTorch (tensordict) -->
            <div class="gh-repo-card">
              <div class="gh-repo-top">
                <svg class="octicon repo-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.6-1.2-1.6 1.2a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                <a href="https://github.com/pytorch/tensordict" target="_blank" rel="noopener noreferrer" class="gh-repo-name">pytorch / tensordict</a>
                <span class="gh-badge-pill" style="color: #bf8700; border-color: #bf8700;">Contribution PR</span>
              </div>
              <p class="gh-repo-desc">
                Contributed to PyTorch's official TensorDict library (<a href="https://github.com/pytorch/tensordict/pull/3719" target="_blank" rel="noopener noreferrer" class="gh-link-text">PR #3719</a>) to resolve tensor dictionary update operations when supplied with tuples of numbers.
              </p>
              <div class="gh-repo-footer">
                <span class="gh-lang"><span class="gh-lang-dot python"></span> PyTorch / Python</span>
                <div class="gh-repo-links">
                  <a href="https://github.com/pytorch/tensordict/pull/3719" target="_blank" rel="noopener noreferrer" class="gh-link-text">PR #3719 ↗</a>
                  <a href="https://github.com/pytorch/tensordict" target="_blank" rel="noopener noreferrer" class="gh-link-text">Repo ↗</a>
                </div>
              </div>
            </div>

            <!-- 3. scikit-learn (scikit-learn-contrib) -->
            <div class="gh-repo-card">
              <div class="gh-repo-top">
                <svg class="octicon repo-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.6-1.2-1.6 1.2a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
                <a href="https://github.com/scikit-learn-contrib/imbalanced-learn" target="_blank" rel="noopener noreferrer" class="gh-repo-name">scikit-learn-contrib</a>
                <span class="gh-badge-pill" style="color: #0969da; border-color: #0969da;">Active PRs</span>
              </div>
              <p class="gh-repo-desc">
                Authored open pull requests in official scikit-learn ecosystem packages: <a href="https://github.com/scikit-learn-contrib/imbalanced-learn/pull/1248" target="_blank" rel="noopener noreferrer" class="gh-link-text">imbalanced-learn #1248</a> (SMOTENC categorical array fix) &amp; <a href="https://github.com/scikit-learn-contrib/imbalanced-learn/pull/1247" target="_blank" rel="noopener noreferrer" class="gh-link-text">#1247</a> (ADASYN small sample fix).
              </p>
              <div class="gh-repo-footer">
                <span class="gh-lang"><span class="gh-lang-dot python"></span> Scikit-Learn / ML</span>
                <div class="gh-repo-links">
                  <a href="https://github.com/scikit-learn-contrib/imbalanced-learn/pull/1248" target="_blank" rel="noopener noreferrer" class="gh-link-text">PR #1248 ↗</a>
                  <a href="https://github.com/scikit-learn/scikit-learn" target="_blank" rel="noopener noreferrer" class="gh-link-text">Scikit-Learn ↗</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Status Capsules Bar -->
        <div class="gh-status-capsules-bar">
          <div class="status-capsule success">
            <span class="capsule-dot green"></span>
            <span>1,267+ Contributions in 2026</span>
          </div>
          <div class="status-capsule success">
            <span class="capsule-dot green"></span>
            <span>Streamlit Merged Contributor</span>
          </div>
          <div class="status-capsule success">
            <span class="capsule-dot green"></span>
            <span>51 Public Repositories</span>
          </div>
          <div class="status-capsule running">
            <span class="capsule-dot amber"></span>
            <span>850+ DSA in Python</span>
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
