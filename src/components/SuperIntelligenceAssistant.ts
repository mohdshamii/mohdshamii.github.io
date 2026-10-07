import { portfolioData } from '../data/portfolio.ts';
import { scrollToTarget } from '../animations/lenis.ts';

export function renderSuperIntelligenceAssistant(): string {
  return `
    <!-- Floating Super Intelligence Assistant Launcher with Photo -->
    <aside aria-label="Super Intelligence Assistant">
      <button
        id="si-assistant-launcher"
        class="si-assistant-floating-btn"
        type="button"
        aria-label="Open Super Intelligence Assistant"
        title="Super Intelligence Assistant (AI Agent)"
      >
        <span class="si-btn-core">
          <div class="si-launcher-avatar-box">
            <img src="/img/logo.png" alt="Mohd Shami AI" class="si-launcher-img" />
            <span class="si-pulse-dot"></span>
          </div>
          <span class="si-btn-label">AI ASSISTANT</span>
        </span>
      </button>

      <!-- Assistant Drawer & Backdrop -->
      <div id="si-assistant-backdrop" class="si-assistant-backdrop" aria-hidden="true" style="display: none;">
        <div class="si-assistant-drawer" role="dialog" aria-modal="true" aria-label="Super Intelligence Assistant">
          <!-- Drawer Header -->
          <div class="si-drawer-header">
            <div class="si-header-left">
              <div class="si-header-avatar-wrap">
                <img src="/img/profile.png" alt="Mohd Shami" class="si-header-photo" />
                <span class="status-indicator-dot green"></span>
              </div>
              <div>
                <h3 class="si-header-title">SUPER INTELLIGENCE ASSISTANT</h3>
                <span class="si-header-status">NEURAL KNOWLEDGE BASE // SYS_ONLINE</span>
              </div>
            </div>
            <button id="si-drawer-close-btn" class="si-drawer-close" aria-label="Close Assistant">✕</button>
          </div>

          <!-- Chat Transcript Container -->
          <div class="si-drawer-body" id="si-chat-body">
            <div class="si-message-bubble assistant-msg">
              <div class="msg-avatar">
                <img src="/img/profile.png" alt="Mohd Shami" class="msg-avatar-img" />
              </div>
              <div class="msg-content">
                <p><strong>Greetings.</strong> I am Mohd Shami's verified AI Engineering Assistant.</p>
                <p>I have direct access to his production machine learning pipelines, verified metrics (85% clinical accuracy, 97.8% NLP precision, 850+ DSA), and Docker deployments. How can I assist your evaluation today?</p>
              </div>
            </div>

            <!-- Suggested Inquiry Chips -->
            <div class="si-chips-container" id="si-chips-container">
              <span class="si-chips-label">SELECT TELEMETRY QUERY:</span>
              <div class="si-chips-grid">
                <button class="si-chip" data-query="core-skills">
                  <span>⚡ Core ML & DL Stack</span>
                </button>
                <button class="si-chip" data-query="revive-model">
                  <span>🏥 Revive (85% Accuracy, 0.91 AUC)</span>
                </button>
                <button class="si-chip" data-query="hamorspam-nlp">
                  <span>🛡️ HamOrSpam (97.8% NLP Accuracy)</span>
                </button>
                <button class="si-chip" data-query="internship">
                  <span>💼 Codec Technologies Internship</span>
                </button>
                <button class="si-chip" data-query="dsa">
                  <span>🐍 850+ DSA in Python</span>
                </button>
                <button class="si-chip" data-query="lab">
                  <span>🔬 Open Super Intelligence Lab</span>
                </button>
                <button class="si-chip" data-query="resume">
                  <span>📄 Download Verified Resume PDF</span>
                </button>
                <button class="si-chip" data-query="contact">
                  <span>✉️ Contact & Availability</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Drawer Input Area: Multi-Action Prompt Bar -->
          <div class="si-drawer-footer">
            <div class="si-prompt-toolbar">
              <button type="button" class="si-tool-tag" data-insert="@models">@models</button>
              <button type="button" class="si-tool-tag" data-insert="/explain">/explain</button>
              <button type="button" class="si-tool-tag" data-insert="/metrics">/metrics</button>
              <button type="button" class="si-tool-tag" data-insert="/resume">/resume</button>
            </div>
            <form id="si-assistant-form" class="si-input-form">
              <button type="button" class="si-attach-btn" title="Dataset artifacts attached" aria-label="Attach dataset">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
              </button>
              <input
                type="text"
                id="si-assistant-input"
                class="si-input-field"
                placeholder="Ask about models, metrics, or type @models, /explain..."
                autocomplete="off"
                spellcheck="false"
              />
              <button type="submit" class="si-send-btn" id="si-send-btn" aria-label="Send Query">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
            <div class="si-input-meta">
              <span>Press <kbd>Enter</kbd> to query</span>
              <span class="si-verified-tag">100% Verified Telemetry</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  `;
}

export function initSuperIntelligenceAssistant() {
  const launcher = document.getElementById('si-assistant-launcher');
  const backdrop = document.getElementById('si-assistant-backdrop');
  const closeBtn = document.getElementById('si-drawer-close-btn');
  const form = document.getElementById('si-assistant-form') as HTMLFormElement | null;
  const input = document.getElementById('si-assistant-input') as HTMLInputElement | null;
  const chatBody = document.getElementById('si-chat-body');
  const chips = document.querySelectorAll('.si-chip');

  if (!launcher || !backdrop) return;

  function openAssistant() {
    backdrop!.style.display = 'flex';
    backdrop!.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 100);
  }

  function closeAssistant() {
    backdrop!.style.display = 'none';
    backdrop!.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  launcher.addEventListener('click', openAssistant);
  closeBtn?.addEventListener('click', closeAssistant);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeAssistant();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.style.display === 'flex') {
      closeAssistant();
    }
  });

  // Prompt toolbar injection
  document.querySelectorAll('.si-tool-tag').forEach((tool) => {
    tool.addEventListener('click', () => {
      const ins = tool.getAttribute('data-insert') || '';
      if (input) {
        input.value = ins + ' ';
        input.focus();
      }
    });
  });

  // Query chips click
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const qType = chip.getAttribute('data-query');
      if (qType) {
        handleChipQuery(qType, chip.textContent?.trim() || '');
      }
    });
  });

  // Custom text input submission
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input) return;
    const query = input.value.trim();
    if (!query) return;

    input.value = '';
    handleUserMessage(query);
  });

  function handleUserMessage(query: string) {
    appendUserBubble(query);

    // Dynamic response delay
    setTimeout(() => {
      const answer = generateSuperIntelligenceAnswer(query);
      appendAssistantBubble(answer);
    }, 300);
  }

  function handleChipQuery(type: string, label: string) {
    appendUserBubble(label);

    setTimeout(() => {
      let answer = '';
      if (type === 'core-skills') {
        answer = `
          <p><strong>Core Technical Competencies:</strong></p>
          <ul>
            <li><strong>AI/ML Algorithms:</strong> XGBoost, Random Forest, Logistic Regression, Decision Trees, KNN, Ensemble Methods.</li>
            <li><strong>Deep Learning & CV:</strong> Convolutional Neural Networks (CNN), Keras, deep feature extraction, image classification.</li>
            <li><strong>NLP:</strong> TF-IDF Vectorization, SMOTE, text preprocessing, tokenization, stop-word removal.</li>
            <li><strong>MLOps & Deployment:</strong> Scikit-learn Pipelines, Flask REST APIs, Docker containerization, Git-versioned ML workflows.</li>
          </ul>
          <p><a href="#skills" class="si-link-action" onclick="document.getElementById('si-assistant-backdrop').style.display='none'; document.body.style.overflow='';" >Jump to Interactive Skills Ecosystem &rarr;</a></p>
        `;
      } else if (type === 'revive-model') {
        answer = `
          <p><strong>Revive — Clinical Disease Prediction System:</strong></p>
          <p>Trained on the UCI Heart Disease benchmark dataset (303 records), evaluating cardiovascular biomarkers with high sensitivity to minimize diagnostic false negatives.</p>
          <ul>
            <li><strong>Metrics:</strong> <strong>85% Accuracy</strong>, <strong>0.91 AUC-ROC</strong>, and <strong>0.87 F1-Score</strong>.</li>
            <li><strong>Pipeline:</strong> Dataset &rarr; Preprocessing &rarr; SMOTE &rarr; XGBoost &rarr; Validation &rarr; Flask REST API &rarr; Docker.</li>
          </ul>
          <p><a href="https://github.com/mohdshamii/Revive" target="_blank" class="si-link-action">Inspect GitHub Repository &rarr;</a></p>
        `;
      } else if (type === 'hamorspam-nlp') {
        answer = `
          <p><strong>HamOrSpam — NLP Text Classification Engine:</strong></p>
          <p>Trained on the SpamAssassin corpus (6,000+ emails) using custom regex tokenization, sub-linear TF-IDF n-gram vectorization, and SMOTE over-sampling.</p>
          <ul>
            <li><strong>Accuracy:</strong> <strong>97.8%</strong> on imbalanced text distribution.</li>
            <li><strong>F1-Score:</strong> <strong>0.96</strong> with negligible false alarms on legitimate correspondence.</li>
          </ul>
          <p><a href="https://github.com/mohdshamii/HamOrSpam-Classifier" target="_blank" class="si-link-action">Inspect GitHub Repository &rarr;</a></p>
        `;
      } else if (type === 'internship') {
        answer = `
          <p><strong>Industry Internships:</strong></p>
          <p><strong>1. Data Science Intern — Codec Technologies India (Aug 2025 – Oct 2025):</strong><br>
          Engineered an XGBoost diagnostic model on 5,000+ clinical records; applied SMOTE and Bayesian hyperparameter tuning, elevating accuracy from <strong>72% &rarr; 85% (+13% gain)</strong> and reducing false negatives by <strong>18% (AUC-ROC: 0.89)</strong>.</p>
          <p><strong>2. Python Developer Intern — CodTech IT Solutions (Jun 2025 – Aug 2025):</strong><br>
          Built Python ETL pipelines (Pandas, NumPy) across 4+ data sources, reducing preprocessing latency by <strong>50%</strong> with zero data leakage.</p>
          <p><a href="#experience" class="si-link-action" onclick="document.getElementById('si-assistant-backdrop').style.display='none'; document.body.style.overflow='';" >View Experience Timeline &rarr;</a></p>
        `;
      } else if (type === 'dsa') {
        answer = `
          <p><strong>850+ DSA Problems Solved in Python:</strong></p>
          <p>Mohd Shami solves algorithmic challenges natively in Python across LeetCode and HackerRank, mastering Dynamic Programming, Binary Trees, Graph Traversals, and asymptotic complexity optimization.</p>
          <p><a href="https://github.com/mohdshamii/PyDSA" target="_blank" class="si-link-action">Explore PyDSA Repository &rarr;</a> | <a href="https://leetcode.com/u/mohdshamii" target="_blank" class="si-link-action">LeetCode Profile &rarr;</a></p>
        `;
      } else if (type === 'lab') {
        answer = `
          <p><strong>Super Intelligence Lab:</strong></p>
          <p>Explore full in-browser interactive models: Revive Disease Inference, HamOrSpam NLP Tokenizer, FarmAIQ Crop Advisor, 2D Neural Decision Boundary, ChurnShield AI, and the SQL Data Analytics Sandbox.</p>
          <p><a href="/lab/index.html" class="si-link-action">Enter Super Intelligence Lab (/lab) &rarr;</a></p>
        `;
      } else if (type === 'resume') {
        answer = `
          <p><strong>Verified Resume Document:</strong></p>
          <p>You can download Mohd Shami's verified PDF resume directly:</p>
          <p><a href="${portfolioData.identity.resumeUrl}" target="_blank" rel="noopener noreferrer" download="Mohd_Shami_Resume.pdf" class="si-btn-inline-gold">📥 Download Resume (.PDF)</a></p>
        `;
      } else if (type === 'contact') {
        answer = `
          <p><strong>Contact Channels & Role Openings:</strong></p>
          <p>Mohd is currently open to <strong>AI/ML Engineer</strong> and <strong>Data Science</strong> positions.</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:${portfolioData.identity.email}" class="si-link-action">${portfolioData.identity.email}</a></li>
            <li><strong>Location:</strong> ${portfolioData.identity.location}</li>
            <li><strong>LinkedIn:</strong> <a href="${portfolioData.identity.socials.linkedin}" target="_blank" class="si-link-action">linkedin.com/in/mohdshamii</a></li>
          </ul>
        `;
      }

      appendAssistantBubble(answer);
    }, 250);
  }

  function appendUserBubble(text: string) {
    if (!chatBody) return;
    const bubble = document.createElement('div');
    bubble.className = 'si-message-bubble user-msg';
    bubble.innerHTML = `<div class="msg-content"><p>${text}</p></div>`;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function appendAssistantBubble(htmlContent: string) {
    if (!chatBody) return;
    const bubble = document.createElement('div');
    bubble.className = 'si-message-bubble assistant-msg';
    bubble.innerHTML = `
      <div class="msg-avatar">
        <img src="/img/profile.png" alt="Mohd Shami AI" class="msg-avatar-img" />
      </div>
      <div class="msg-content">${htmlContent}</div>
    `;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function generateSuperIntelligenceAnswer(query: string): string {
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('stack') || q.includes('python') || q.includes('model') || q.includes('tool')) {
      return `
        <p><strong>Technical Mastery:</strong></p>
        <p>Mohd specializes in end-to-end Machine Learning architectures: XGBoost, Random Forest, CNNs for computer vision, TF-IDF + SMOTE for NLP, Scikit-learn Pipelines, and Flask REST APIs deployed via Docker.</p>
        <p><a href="#skills" class="si-link-action" onclick="document.getElementById('si-assistant-backdrop').style.display='none'; document.body.style.overflow='';" >Jump to Skills Ecosystem &rarr;</a></p>
      `;
    }

    if (q.includes('revive') || q.includes('disease') || q.includes('heart') || q.includes('auc')) {
      return `
        <p><strong>Revive Diagnostic Architecture:</strong></p>
        <p>Trained on the UCI Heart Disease dataset (303 records) with SMOTE oversampling and XGBoost, achieving <strong>85% accuracy</strong> and <strong>0.91 AUC-ROC</strong>. Deployed as a containerized Flask API.</p>
        <p><a href="https://github.com/mohdshamii/Revive" target="_blank" class="si-link-action">Revive GitHub Repository &rarr;</a></p>
      `;
    }

    if (q.includes('ham') || q.includes('spam') || q.includes('nlp')) {
      return `
        <p><strong>HamOrSpam NLP Classifier:</strong></p>
        <p>Trained on 6,000+ SpamAssassin emails with sub-linear TF-IDF vectorization and Logistic Regression + SMOTE, achieving <strong>97.8% accuracy</strong> and a <strong>0.96 F1-score</strong>.</p>
        <p><a href="https://github.com/mohdshamii/HamOrSpam-Classifier" target="_blank" class="si-link-action">HamOrSpam GitHub &rarr;</a></p>
      `;
    }

    if (q.includes('farmaiq') || q.includes('crop') || q.includes('vision') || q.includes('cnn')) {
      return `
        <p><strong>FarmAIQ Platform:</strong></p>
        <p>Dual-model platform combining Random Forest crop suitability (2,200 records, <strong>93% accuracy</strong>) and Deep CNN leaf disease classification on PlantVillage images.</p>
        <p><a href="https://github.com/mohdshamii/FarmAIQ" target="_blank" class="si-link-action">FarmAIQ GitHub &rarr;</a></p>
      `;
    }

    if (q.includes('intern') || q.includes('experience') || q.includes('codec') || q.includes('codtech')) {
      return `
        <p><strong>Industry Track Record:</strong></p>
        <p>• <strong>Codec Technologies India:</strong> Boosted clinical model accuracy from 72% to 85% (+13%), reducing false negatives by 18% (AUC-ROC: 0.89).<br>
        • <strong>CodTech IT Solutions:</strong> Automated Python ETL pipelines across 4+ data sources, reducing preprocessing latency by 50%.</p>
        <p><a href="#experience" class="si-link-action" onclick="document.getElementById('si-assistant-backdrop').style.display='none'; document.body.style.overflow='';" >Jump to Experience &rarr;</a></p>
      `;
    }

    if (q.includes('cgpa') || q.includes('education') || q.includes('college') || q.includes('tmu')) {
      return `
        <p><strong>Academic Rigor:</strong></p>
        <p>Pursuing B.Tech in Data Science at Teerthanker Mahaveer University (Class of 2027) with a cumulative <strong>CGPA of 8.5 / 10.0</strong>.</p>
        <p><a href="#education" class="si-link-action" onclick="document.getElementById('si-assistant-backdrop').style.display='none'; document.body.style.overflow='';" >View Education &rarr;</a></p>
      `;
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('pdf')) {
      return `
        <p>You can download Mohd Shami's verified resume PDF here:</p>
        <p><a href="${portfolioData.identity.resumeUrl}" target="_blank" rel="noopener noreferrer" download="Mohd_Shami_Resume.pdf" class="si-btn-inline-gold">📥 Download Resume PDF</a></p>
      `;
    }

    if (q.includes('lab') || q.includes('super intelligence') || q.includes('interactive')) {
      return `
        <p><strong>Super Intelligence Lab:</strong></p>
        <p>Experience real-time interactive simulations of Revive, HamOrSpam, FarmAIQ, Neural Decision Boundary, ChurnShield, and SQL queries.</p>
        <p><a href="/lab/index.html" class="si-link-action">Open Super Intelligence Lab &rarr;</a></p>
      `;
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('role')) {
      return `
        <p><strong>Contact Direct Channels:</strong></p>
        <p>Open to AI/ML Engineer and Data Science positions.<br>
        • <strong>Email:</strong> <a href="mailto:${portfolioData.identity.email}" class="si-link-action">${portfolioData.identity.email}</a><br>
        • <strong>LinkedIn:</strong> <a href="${portfolioData.identity.socials.linkedin}" target="_blank" class="si-link-action">linkedin.com/in/mohdshamii</a></p>
      `;
    }

    // Default intelligence response
    return `
      <p>Mohd Shami is an AI/ML Engineer with 1+ year of experience building end-to-end intelligent systems, deep neural vision models, and production APIs.</p>
      <p>Feel free to ask about his <strong>algorithms</strong>, <strong>Revive & HamOrSpam projects</strong>, <strong>Codec Technologies internship</strong>, <strong>Super Intelligence Lab</strong>, or <a href="${portfolioData.identity.resumeUrl}" target="_blank" rel="noopener noreferrer" download="Mohd_Shami_Resume.pdf" class="si-link-action">download his resume</a>.</p>
    `;
  }
}
