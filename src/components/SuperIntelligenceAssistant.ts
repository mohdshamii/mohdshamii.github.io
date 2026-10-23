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
                <p>I have direct access to his production machine learning architectures (HydroRaksh, BharatLens, Atlas, Revive, FarmAIQ, HamOrSpam), verified benchmarks (3.85m MAE water forecasting, 643-district panel models, 97.8% NLP, 85% clinical / 0.91 AUC, 850+ DSA), and production repositories. How can I assist your evaluation today?</p>
              </div>
            </div>

            <!-- Suggested Inquiry Chips -->
            <div class="si-chips-container" id="si-chips-container">
              <span class="si-chips-label">SELECT TELEMETRY QUERY:</span>
              <div class="si-chips-grid">
                <button class="si-chip" data-query="core-skills">
                  <span>⚡ Core ML & DL Stack</span>
                </button>
                <button class="si-chip" data-query="hydroraksh">
                  <span>💧 HydroRaksh (Groundwater AI & HG-CF)</span>
                </button>
                <button class="si-chip" data-query="bharatlens">
                  <span>🇮🇳 BharatLens (643 Districts & SHAP)</span>
                </button>
                <button class="si-chip" data-query="atlas">
                  <span>🗺️ Atlas (Civic AI & 2030 Forecasting)</span>
                </button>
                <button class="si-chip" data-query="revive-model">
                  <span>🏥 Revive (85% Accuracy, 0.91 AUC)</span>
                </button>
                <button class="si-chip" data-query="hamorspam-nlp">
                  <span>🛡️ HamOrSpam (97.8% NLP Accuracy)</span>
                </button>
                <button class="si-chip" data-query="farmaiq">
                  <span>🌱 FarmAIQ (Crop & Plant Vision CNN)</span>
                </button>
                <button class="si-chip" data-query="internship">
                  <span>💼 Industry Internships (Codec & CodTech)</span>
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
            <li><strong>AI/ML Algorithms:</strong> XGBoost, Random Forest, Ridge Regression, Logistic Regression, Decision Trees, KNN, Ensemble Methods.</li>
            <li><strong>Deep Learning & CV:</strong> Convolutional Neural Networks (CNN), Keras / TensorFlow, deep spatial feature extraction, image classification.</li>
            <li><strong>NLP & Econometrics:</strong> TF-IDF Vectorization, SMOTE, text preprocessing, tokenization, panel microdata econometric modeling, SHAP explainability.</li>
            <li><strong>Geospatial AI & Modeling:</strong> Hydro-Geological Collaborative Filtering (HG-CF), Graph Laplacian kernels, K-Means clustering, PCA, deterministic PRNG.</li>
            <li><strong>MLOps & Deployment:</strong> Scikit-learn Pipelines, FastAPI, Flask REST microservices, Docker containerization, TimescaleDB, Git-versioned ML workflows.</li>
          </ul>
          <p><a href="#skills" class="si-link-action" onclick="document.getElementById('si-assistant-backdrop').style.display='none'; document.body.style.overflow='';" >Jump to Interactive Skills Ecosystem &rarr;</a></p>
        `;
      } else if (type === 'hydroraksh') {
        answer = `
          <p><strong>HydroRaksh (JalSuraksha) — AI Groundwater Intelligence & Decision Support Platform:</strong></p>
          <p>An authoritative pan-India groundwater platform aggregating live telemetry across 700+ districts in 36 States/UTs (CGWB, IMD, India-WRIS, CWC, Open-Meteo).</p>
          <ul>
            <li><strong>HG-CF Recommender:</strong> Hydro-Geological Collaborative Filtering embedding physical aquifer attributes (hydraulic conductivity, slope, extraction stage, depth) in a graph Laplacian regularization kernel (NDCG@5: 0.437).</li>
            <li><strong>Time-Series Forecaster:</strong> Ridge Regression (MAE 3.851m, RMSE 4.352m) and Random Forest (MAE 4.054m) vs naive persistence baseline (MAE 29.851m) via 4-fold rolling-origin CV.</li>
            <li><strong>Decision Suite:</strong> GEC-2015 water balance audits, knapsack budget allocation, NRW leakage simulation, and recharge structure sizing.</li>
            <li><strong>Stack:</strong> Python 3.10+, FastAPI, Flask, Scikit-learn, TimescaleDB, Gensim (LDA), SHAP, Docker, 16 Jupyter notebooks, 101 unit tests passing.</li>
          </ul>
          <p><a href="https://github.com/mohdshamii/HydroRaksh" target="_blank" class="si-link-action">Inspect HydroRaksh GitHub Repository &rarr;</a></p>
        `;
      } else if (type === 'bharatlens') {
        answer = `
          <p><strong>BharatLens ML — Indian District Socioeconomic Intelligence Platform:</strong></p>
          <p>Empirical econometric and machine learning platform processing multi-period panel microdata across 643 Indian districts in 37 States and Union Territories.</p>
          <ul>
            <li><strong>Momentum Paradox ($Z_{\Delta}$):</strong> Decouples nationwide baseline drift from true endogenous district velocity across 5 dimensions (Health, Women Empowerment, Infrastructure, Wages, Demographics).</li>
            <li><strong>Algorithms:</strong> K-Means clustering ($k=4$) into socioeconomic tiers; consensus anomaly detection via Isolation Forest (150 trees) & LOF ($k=20$) isolating 33 divergent districts.</li>
            <li><strong>Explainable AI (SHAP):</strong> Champion Ridge Regressor forecasting score deltas, accompanied by local waterfall charts and plain-language driver narratives.</li>
            <li><strong>Stack:</strong> Python 3.10+, Scikit-learn 1.5+, XGBoost, SHAP, Flask 3.0 (11 REST endpoints), Chart.js, Plotly.js, 22 automated Pytest tests, India.gov.in UI design.</li>
          </ul>
          <p><a href="https://github.com/mohdshamii/BharatLens" target="_blank" class="si-link-action">Inspect BharatLens GitHub Repository &rarr;</a></p>
        `;
      } else if (type === 'atlas') {
        answer = `
          <p><strong>Atlas (India Data Atlas) — Civic Geospatial Intelligence Engine:</strong></p>
          <p>Academic-caliber civic data platform covering all 75 districts of Uttar Pradesh across 18 administrative divisions and national hubs (2015–2024), featuring 2025–2030 predictive forecasting.</p>
          <ul>
            <li><strong>Deterministic PRNG Data Engine:</strong> 32-bit FNV-1a & Mulberry32 PRNG generating 42,750+ data points across 11 locked civic sectors and 50+ metrics with 100% reproducibility.</li>
            <li><strong>ML & Econometrics:</strong> Unsupervised K-Means clustering ($k=4$), 2D PCA biplots explaining ~40% spatial variance, L2-penalized Ridge regression for 2025–2030 time-series forecasts with 95% confidence bounds.</li>
            <li><strong>Visual Engine & Simulation:</strong> Three.js 3D WebGL rotatable globe with flight arcs, 3D topographic district elevation map, Leaflet choropleths, and empirical elasticity AI Policy Budget Simulator.</li>
            <li><strong>Stack:</strong> Python 3.10+, Flask REST API (12 endpoints), Scikit-Learn, Three.js, Leaflet.js, Plotly, 15 unit tests, academic Jupyter research notebook.</li>
          </ul>
          <p><a href="https://github.com/mohdshamii/Atlas" target="_blank" class="si-link-action">Inspect Atlas GitHub Repository &rarr;</a></p>
        `;
      } else if (type === 'revive-model') {
        answer = `
          <p><strong>Revive — Clinical Disease Prediction System:</strong></p>
          <p>Trained on the UCI Heart Disease benchmark dataset (303 records), evaluating cardiovascular biomarkers with high sensitivity to minimize diagnostic false negatives.</p>
          <ul>
            <li><strong>Metrics:</strong> <strong>85% Accuracy</strong>, <strong>0.91 AUC-ROC</strong>, and <strong>0.87 F1-Score</strong>.</li>
            <li><strong>Pipeline:</strong> Dataset &rarr; RobustScaler &rarr; SMOTE &rarr; Bayesian-tuned XGBoost &rarr; Validation &rarr; Flask REST API &rarr; Docker.</li>
          </ul>
          <p><a href="https://github.com/mohdshamii/Revive" target="_blank" class="si-link-action">Inspect Revive GitHub Repository &rarr;</a></p>
        `;
      } else if (type === 'hamorspam-nlp') {
        answer = `
          <p><strong>HamOrSpam — NLP Text Classification Engine:</strong></p>
          <p>Trained on the SpamAssassin corpus (6,000+ emails) using custom regex tokenization, sub-linear TF-IDF n-gram vectorization, and SMOTE over-sampling.</p>
          <ul>
            <li><strong>Accuracy:</strong> <strong>97.8%</strong> on imbalanced text distribution.</li>
            <li><strong>F1-Score:</strong> <strong>0.96</strong> with negligible false alarms on legitimate correspondence.</li>
          </ul>
          <p><a href="https://github.com/mohdshamii/HamOrSpam-Classifier" target="_blank" class="si-link-action">Inspect HamOrSpam GitHub Repository &rarr;</a></p>
        `;
      } else if (type === 'farmaiq') {
        answer = `
          <p><strong>FarmAIQ — Precision Agriculture Decision Platform:</strong></p>
          <p>Dual-model agricultural intelligence platform combining tabular soil chemistry recommendations with deep computer vision pathology.</p>
          <ul>
            <li><strong>Crop Intel:</strong> Random Forest model trained on 2,200 soil records (N, P, K, pH, rainfall) achieving <strong>93% Accuracy</strong>.</li>
            <li><strong>Plant Vision:</strong> Convolutional Neural Network (CNN) trained on PlantVillage imagery extracting lesion features for rapid crop disease diagnosis.</li>
          </ul>
          <p><a href="https://github.com/mohdshamii/FarmAIQ" target="_blank" class="si-link-action">Inspect FarmAIQ GitHub Repository &rarr;</a></p>
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

    // Command tool shortcuts
    if (q.includes('@models') || q.includes('/models') || q === 'models') {
      return `
        <p><strong>Verified Production Models & Platforms:</strong></p>
        <ul>
          <li><strong>HydroRaksh (JalSuraksha):</strong> Pan-India groundwater intelligence, HG-CF Graph Laplacian recommender, Ridge/Tree forecasters (MAE 3.85m), 101 tests, 700+ districts.</li>
          <li><strong>BharatLens ML:</strong> Econometric platform covering 643 districts in 37 States/UTs, 54-feature panel matrix, momentum velocity ($Z_{\\Delta}$), K-Means, Isolation Forest, SHAP explainers.</li>
          <li><strong>Atlas:</strong> 75 UP districts civic intelligence, deterministic PRNG data engine (42,750+ data points), 2D PCA, Ridge 2025–2030 horizon forecasts, Three.js 3D WebGL.</li>
          <li><strong>Revive:</strong> XGBoost clinical cardiovascular diagnostic system, 85% accuracy, 0.91 AUC-ROC, 0.87 F1, Dockerized Flask API.</li>
          <li><strong>FarmAIQ:</strong> Random Forest crop advisory (93% accuracy) + Deep CNN leaf pathology on PlantVillage.</li>
          <li><strong>HamOrSpam:</strong> TF-IDF + SMOTE Logistic Regression email classifier, 97.8% accuracy, 0.96 F1.</li>
        </ul>
        <p><a href="#projects" class="si-link-action" onclick="document.getElementById('si-assistant-backdrop').style.display='none'; document.body.style.overflow='';" >Jump to Projects Showcase &rarr;</a></p>
      `;
    }

    if (q.includes('@explain') || q.includes('/explain') || q.includes('xai') || q.includes('shap')) {
      return `
        <p><strong>Explainable AI (XAI) & SHAP Architecture:</strong></p>
        <p>Mohd enforces strict algorithmic transparency using Game-Theoretic Shapley values:</p>
        <ul>
          <li><strong>BharatLens ML:</strong> Implements <code>LinearExplainer</code> and <code>TreeExplainer</code> across all 643 Indian districts to calculate exact baseline contributions, decomposing score changes into positive economic catalysts and negative healthcare/infrastructure headwinds with plain-language narratives.</li>
          <li><strong>Revive & HydroRaksh:</strong> Utilizes feature importance and attribution metrics to identify key drivers of clinical risk and groundwater extraction vulnerability.</li>
        </ul>
        <p><a href="https://github.com/mohdshamii/BharatLens" target="_blank" class="si-link-action">Inspect BharatLens SHAP Implementation &rarr;</a></p>
      `;
    }

    if (q.includes('@metrics') || q.includes('/metrics') || q.includes('benchmark')) {
      return `
        <p><strong>Verified Engineering Benchmarks:</strong></p>
        <ul>
          <li><strong>3.85m MAE:</strong> Water table forecasting (Ridge / Tree ensembles vs 29.85m naive baseline) in HydroRaksh.</li>
          <li><strong>643 Districts / 54 Features:</strong> Harmonized longitudinal panel microdata in BharatLens ML with 22 Pytest tests.</li>
          <li><strong>75 UP Districts / 42,750+ Data Points:</strong> Deterministic PRNG civic engine in Atlas with 2030 Ridge forecasts.</li>
          <li><strong>97.8% Accuracy & 0.96 F1:</strong> NLP email spam classifier on imbalanced corpus (HamOrSpam).</li>
          <li><strong>85% Accuracy & 0.91 AUC-ROC:</strong> Clinical cardiovascular risk prediction (Revive).</li>
          <li><strong>93% Accuracy:</strong> Random Forest soil nutrient crop suitability (FarmAIQ).</li>
          <li><strong>850+ Problems:</strong> Solved algorithmically in Python across LeetCode & PyDSA.</li>
          <li><strong>101 Passing Tests:</strong> Comprehensive backend unit test suite in HydroRaksh.</li>
        </ul>
      `;
    }

    // HydroRaksh / JalSuraksha queries
    if (q.includes('hydroraksh') || q.includes('jalsuraksha') || q.includes('groundwater') || q.includes('water') || q.includes('aquifer') || q.includes('hg-cf') || q.includes('cgwb')) {
      return `
        <p><strong>HydroRaksh (JalSuraksha) — Pan-India Groundwater Intelligence:</strong></p>
        <p>An authoritative geospatial intelligence and decision support platform aggregating live and scheduled groundwater levels, rainfall departures, and water quality telemetry across 700+ districts in 36 States/UTs (with Uttar Pradesh 75 districts as reference).</p>
        <ul>
          <li><strong>Hydro-Geological Collaborative Filtering (HG-CF):</strong> Recommends engineering interventions for data-sparse blocks by embedding physical aquifer attributes (conductivity, slope, extraction stage, depth) in a graph Laplacian regularization kernel.</li>
          <li><strong>Predictive Forecaster:</strong> Multi-horizon Ridge Regression (MAE 3.851m, RMSE 4.352m) and Random Forest (MAE 4.054m) evaluated via 4-fold rolling-origin CV against naive persistence (MAE 29.851m).</li>
          <li><strong>Prescriptive Decision Suite:</strong> GEC-2015 water balance audits, knapsack budget allocation, NRW leakage simulation, and recharge structure sizing (check dams, injection wells).</li>
          <li><strong>Production Stack:</strong> Python 3.10+, FastAPI (async), Flask, Scikit-learn, TimescaleDB, Gensim (LDA), SHAP, Docker, 16 Jupyter notebooks, 101 unit tests passing.</li>
        </ul>
        <p><a href="https://github.com/mohdshamii/HydroRaksh" target="_blank" class="si-link-action">View HydroRaksh on GitHub &rarr;</a></p>
      `;
    }

    // BharatLens ML queries
    if (q.includes('bharatlens') || q.includes('econometric') || q.includes('census') || q.includes('nfhs') || q.includes('mgnrega') || q.includes('momentum') || q.includes('district')) {
      return `
        <p><strong>BharatLens ML — Indian District Socioeconomic Intelligence Platform:</strong></p>
        <p>An empirical district-level econometric and machine learning platform processing multi-period panel microdata across 643 Indian districts in 37 States and Union Territories.</p>
        <ul>
          <li><strong>The Momentum Paradox ($Z_{\\Delta}$):</strong> Solves national baseline drift where countrywide schemes raise raw metrics, concealing relative district deceleration. Computes state-relative standardized velocity across 5 dimensions (Health, Women Empowerment, Infrastructure, Wages, Demographics).</li>
          <li><strong>Machine Learning:</strong> K-Means clustering ($k=4$) into structural tiers; Isolation Forest ($150$ trees) and LOF ($k=20$) consensus anomaly detection isolating 33 divergent districts; 5-fold cross-validated benchmark of Ridge and tree models.</li>
          <li><strong>Explainable AI (SHAP):</strong> Produces local waterfall charts and plain-language driver narratives for all 643 districts.</li>
          <li><strong>Production Stack:</strong> Python 3.10+, Scikit-learn 1.5+, XGBoost, SHAP, Flask 3.0 (11 REST endpoints), Chart.js, Plotly.js, 22 automated Pytest unit tests, India.gov.in UI design.</li>
        </ul>
        <p><a href="https://github.com/mohdshamii/BharatLens" target="_blank" class="si-link-action">View BharatLens on GitHub &rarr;</a></p>
      `;
    }

    // Atlas queries
    if (q.includes('atlas') || q.includes('civic') || q.includes('prng') || q.includes('pca') || q.includes('uttar pradesh') || q.includes('up') || q.includes('2030') || q.includes('elevation')) {
      return `
        <p><strong>Atlas (India Data Atlas) — Civic Geospatial Intelligence Engine:</strong></p>
        <p>An enterprise-grade, academic-caliber civic and geographic data platform covering all 75 districts of Uttar Pradesh across 18 administrative divisions and national hubs (2015–2024), featuring 2025–2030 predictive forecasting.</p>
        <ul>
          <li><strong>Deterministic PRNG Data Engine:</strong> 32-bit FNV-1a hashing and Mulberry32 PRNG generating 42,750+ observational data points across 11 locked civic sectors and 50+ granular metrics with 100% reproducibility and zero database overhead.</li>
          <li><strong>ML & Econometrics:</strong> Unsupervised K-Means clustering ($k=4$), 2D PCA dimensionality reduction biplots explaining ~40% spatial variance, and L2-penalized Ridge regression for 2025–2030 time-series forecasting with parametric 95% confidence intervals.</li>
          <li><strong>Visual Engine & Simulation:</strong> Three.js 3D WebGL rotatable globe with flight arcs, 3D topographic district elevation map, Leaflet choropleths, and empirical elasticity AI Policy Budget Simulator.</li>
          <li><strong>Production Stack:</strong> Python 3.10+, Flask REST API (12 endpoints), Scikit-Learn, Three.js, Leaflet.js, Plotly, 15 unit tests, academic Jupyter research notebook.</li>
        </ul>
        <p><a href="https://github.com/mohdshamii/Atlas" target="_blank" class="si-link-action">View Atlas on GitHub &rarr;</a></p>
      `;
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('python') || q.includes('tool') || q.includes('technolog')) {
      return `
        <p><strong>Technical Mastery:</strong></p>
        <p>Mohd specializes in end-to-end Machine Learning systems: XGBoost, Random Forest, Ridge Regression, CNNs for computer vision, TF-IDF + SMOTE for NLP, Scikit-learn Pipelines, FastAPI / Flask REST APIs, Docker, and TimescaleDB.</p>
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

    if (q.includes('farmaiq') || q.includes('crop') || q.includes('vision') || q.includes('cnn') || q.includes('plant')) {
      return `
        <p><strong>FarmAIQ Platform:</strong></p>
        <p>Dual-model platform combining Random Forest crop suitability (2,200 records, <strong>93% accuracy</strong>) and Deep CNN leaf disease classification on PlantVillage images.</p>
        <p><a href="https://github.com/mohdshamii/FarmAIQ" target="_blank" class="si-link-action">FarmAIQ GitHub &rarr;</a></p>
      `;
    }

    if (q.includes('dsa') || q.includes('leetcode') || q.includes('algorithm') || q.includes('pydsa')) {
      return `
        <p><strong>850+ DSA Problems Solved in Python:</strong></p>
        <p>Mohd Shami has solved 850+ algorithmic challenges exclusively in Python across LeetCode, HackerRank, and PyDSA, focusing on asymptotic time/space optimization.</p>
        <p><a href="https://github.com/mohdshamii/PyDSA" target="_blank" class="si-link-action">PyDSA Repository &rarr;</a> | <a href="https://leetcode.com/u/mohdshamii" target="_blank" class="si-link-action">LeetCode Profile &rarr;</a></p>
      `;
    }

    if (q.includes('100') || q.includes('roadmap') || q.includes('curriculum') || q.includes('paper') || q.includes('book')) {
      return `
        <p><strong>100 Days of AI/ML:</strong></p>
        <p>A self-contained curriculum for AI/ML engineering featuring 100 research papers, 100 books, 100 datasets, 100 project ideas, 100 tools, and 100 glossary terms.</p>
        <p><a href="https://github.com/mohdshamii/100" target="_blank" class="si-link-action">100 Repository &rarr;</a> | <a href="https://mohdshamii.github.io/100/" target="_blank" class="si-link-action">Web Portal &rarr;</a></p>
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
      <p>Mohd Shami is an AI/ML Engineer with 1+ year of experience building production geospatial intelligence, econometric panel systems, clinical risk diagnostics, and real-time inference microservices.</p>
      <p>Ask about his flagship platforms: <strong>HydroRaksh (Groundwater AI)</strong>, <strong>BharatLens (643 Districts Econometrics)</strong>, <strong>Atlas (Civic AI & 2030 Forecasting)</strong>, <strong>Revive (Cardiovascular ML)</strong>, or <a href="${portfolioData.identity.resumeUrl}" target="_blank" rel="noopener noreferrer" download="Mohd_Shami_Resume.pdf" class="si-link-action">download his resume</a>.</p>
    `;
  }
}
