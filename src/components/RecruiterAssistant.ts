import { profileData } from '../data/profile.ts';
import { experiences } from '../data/experience.ts';
import { projectsData } from '../data/projects.ts';

export function renderRecruiterAssistant(): string {
  return `
    <div class="assistant-drawer-overlay" id="assistantOverlay"></div>
    <div class="assistant-drawer" id="assistantDrawer" role="dialog" aria-label="Ask Mohd AI">
      <div class="assistant-header">
        <div class="assistant-title">
          <i class="fas fa-sparkles" style="color: var(--accent-color);"></i>
          <span>Ask Mohd AI <small style="font-weight: 500; color: var(--text-muted);">(Recruiter Assistant)</small></span>
        </div>
        <button id="closeAssistantBtn" style="font-size: 1.25rem; color: var(--text-secondary); padding: 0.25rem 0.5rem;" aria-label="Close Assistant">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="assistant-body" id="assistantChatBody">
        <div class="assistant-message bot">
          Hello! I am Mohd Shami's technical portfolio assistant. How can I help you evaluate his AI/ML engineering background today?
        </div>

        <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); margin-top: 0.5rem;">
          Quick Recruiter Inquiries:
        </div>

        <div class="assistant-chips">
          <button class="assistant-chip" data-q="What are Mohd's core AI/ML skills?">Core AI/ML Skills</button>
          <button class="assistant-chip" data-q="Tell me about his internship at Codec Technologies.">Codec Technologies Role</button>
          <button class="assistant-chip" data-q="What is his academic standing and CGPA?">Academic Standing & CGPA</button>
          <button class="assistant-chip" data-q="Explain the architecture of the Revive project.">Revive Project Architecture</button>
          <button class="assistant-chip" data-q="What results did he achieve with HamOrSpam?">HamOrSpam NLP Results</button>
          <button class="assistant-chip" data-q="Is Mohd open to AI/ML Engineer roles?">Target Roles & Availability</button>
          <button class="assistant-chip" data-q="Where can I download his resume?">Download Resume</button>
        </div>
      </div>

      <div class="assistant-input-wrap">
        <input 
          type="text" 
          id="assistantInput" 
          class="assistant-input" 
          placeholder="Ask anything about skills, projects, internships, models..." 
          autocomplete="off"
        />
        <button id="assistantSendBtn" class="btn btn-primary btn-sm" aria-label="Send query">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;
}

export function initRecruiterAssistant() {
  const overlay = document.getElementById('assistantOverlay');
  const drawer = document.getElementById('assistantDrawer');
  const openBtn = document.getElementById('openAssistantBtn');
  const closeBtn = document.getElementById('closeAssistantBtn');
  const sendBtn = document.getElementById('assistantSendBtn');
  const input = document.getElementById('assistantInput') as HTMLInputElement | null;
  const chatBody = document.getElementById('assistantChatBody');

  function openDrawer() {
    if (overlay && drawer) {
      overlay.classList.add('active');
      drawer.classList.add('active');
      document.body.classList.add('drawer-open');
      setTimeout(() => input?.focus(), 200);
    }
  }

  function closeDrawer() {
    if (overlay && drawer) {
      overlay.classList.remove('active');
      drawer.classList.remove('active');
      document.body.classList.remove('drawer-open');
    }
  }

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Suggested chips
  document.querySelectorAll('.assistant-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-q') || '';
      if (q) handleQuery(q);
    });
  });

  // Submit on enter
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val) {
          handleQuery(val);
          input.value = '';
        }
      }
    });
  }

  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (val) {
        handleQuery(val);
        input.value = '';
      }
    });
  }

  function handleQuery(query: string) {
    if (!chatBody) return;

    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'assistant-message user';
    userMsg.textContent = query;
    chatBody.appendChild(userMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Generate intelligent contextual response
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'assistant-message bot';
      botMsg.innerHTML = generateAnswer(query);
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 350);
  }

  function generateAnswer(query: string): string {
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('stack') || q.includes('python') || q.includes('algorithm') || q.includes('tool')) {
      return `<strong>Mohd's Technical Competencies:</strong><br>
      • <strong>AI/ML Algorithms:</strong> XGBoost, Random Forest, Logistic Regression, Decision Trees, KNN, Naive Bayes, Ensemble Methods.<br>
      • <strong>Deep Learning & CV:</strong> CNN (image classification, feature extraction), Neural Networks, Keras.<br>
      • <strong>NLP:</strong> Text Preprocessing, TF-IDF Vectorisation, SMOTE, Stop-word removal, Tokenisation.<br>
      • <strong>ML Engineering:</strong> Scikit-learn Pipelines, Feature Engineering, Bayesian & Grid Search Hyperparameter Tuning, Stratified K-Fold.<br>
      • <strong>Deployment & Stack:</strong> Flask (REST API), Docker, Git, Python (Pandas, NumPy), SQL (MySQL), Linux, ETL Pipelines.<br>
      <a href="#skills" onclick="document.getElementById('assistantOverlay')?.click()" style="color: var(--accent-color); font-weight: 600; text-decoration: underline;">Jump to Skills section &rarr;</a>`;
    }

    if (q.includes('codec') || q.includes('intern') || q.includes('experience') || q.includes('work') || q.includes('codtech')) {
      const codec = experiences[0];
      const codtech = experiences[1];
      return `<strong>Industry Experience:</strong><br>
      1. <strong>${codec.role}</strong> at ${codec.company} (${codec.period}): Engineered an XGBoost diagnostic model on 5,000+ clinical records, boosting accuracy from 72% to 85% and reducing false negatives by 18% (AUC-ROC: 0.89) with Scikit-learn ML Pipelines.<br>
      2. <strong>${codtech.role}</strong> at ${codtech.company} (${codtech.period}): Built Python ETL pipelines across 4+ data sources, reducing preprocessing latency by 50% with zero data leakage.<br>
      <a href="#experience" onclick="document.getElementById('assistantOverlay')?.click()" style="color: var(--accent-color); font-weight: 600; text-decoration: underline;">View Experience details &rarr;</a>`;
    }

    if (q.includes('revive') || q.includes('disease') || q.includes('xgboost') || q.includes('auc')) {
      const p = projectsData.find(x => x.id === 'revive')!;
      return `<strong>Revive (Clinical Disease Risk Predictor):</strong><br>
      ${p.what}<br>
      • <strong>Dataset & Results:</strong> Trained on UCI Heart Disease dataset (303 records), achieving <strong>85% accuracy</strong>, <strong>AUC-ROC: 0.91</strong>, and <strong>F1: 0.87</strong> via Scikit-learn pipelines and Bayesian tuning.<br>
      • <strong>Deployment:</strong> Deployed as a Flask REST API with real-time JSON inference endpoints and containerised with Docker.<br>
      • <a href="${p.githubUrl}" target="_blank" style="color: var(--accent-color); font-weight: 600;">GitHub Repository &rarr;</a> | <a href="${p.liveDemoUrl}" style="color: var(--accent-color); font-weight: 600;">Interactive Lab Demo &rarr;</a>`;
    }

    if (q.includes('ham') || q.includes('spam') || q.includes('nlp')) {
      const p = projectsData.find(x => x.id === 'hamspam')!;
      return `<strong>HamOrSpam (NLP AI Text Classifier):</strong><br>
      ${p.what}<br>
      • <strong>Dataset & Results:</strong> Trained on SpamAssassin dataset (6,000+ emails) using TF-IDF and SMOTE over-sampling, achieving <strong>97.8% accuracy</strong> and a <strong>0.96 F1-score</strong>.<br>
      • <a href="${p.githubUrl}" target="_blank" style="color: var(--accent-color); font-weight: 600;">GitHub Repository &rarr;</a> | <a href="${p.liveDemoUrl}" style="color: var(--accent-color); font-weight: 600;">Interactive Lab Demo &rarr;</a>`;
    }

    if (q.includes('farm') || q.includes('crop') || q.includes('agriculture') || q.includes('cnn')) {
      const p = projectsData.find(x => x.id === 'farmaiq')!;
      return `<strong>FarmAIQ (Smart Agricultural Platform):</strong><br>
      ${p.what}<br>
      • Dual-model platform: Random Forest crop recommendation (Kaggle dataset, 2,200 records, <strong>93% accuracy</strong>) + Deep CNN plant disease classifier (PlantVillage dataset) with grid-search cross-validation.<br>
      • <a href="${p.githubUrl}" target="_blank" style="color: var(--accent-color); font-weight: 600;">GitHub Repository &rarr;</a> | <a href="${p.liveDemoUrl}" style="color: var(--accent-color); font-weight: 600;">Interactive Lab Demo &rarr;</a>`;
    }

    if (q.includes('cgpa') || q.includes('academic') || q.includes('college') || q.includes('education') || q.includes('university') || q.includes('rank')) {
      const edu = profileData.education[0];
      return `<strong>Academic Standing:</strong><br>
      • <strong>Degree:</strong> ${edu.degree}<br>
      • <strong>Institution:</strong> ${edu.institution}, Moradabad, UP<br>
      • <strong>Expected Graduation:</strong> 2027<br>
      • <strong>Academic Cohort Rank:</strong> <strong>1st Rank</strong> in Cohort with a cumulative CGPA of <strong>${edu.cgpa}</strong>.<br>
      <a href="#education" onclick="document.getElementById('assistantOverlay')?.click()" style="color: var(--accent-color); font-weight: 600; text-decoration: underline;">View Education details &rarr;</a>`;
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('pdf')) {
      return `You can download Mohd Shami's verified resume PDF directly here:<br>
      <a href="${profileData.resumeUrl}" download class="btn btn-primary btn-sm" style="margin-top: 0.5rem; display: inline-flex;">
        <i class="fas fa-download"></i> Download Resume (PDF)
      </a>`;
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('role') || q.includes('available') || q.includes('offer') || q.includes('email')) {
      return `<strong>Target Roles & Contact:</strong><br>
      Mohd is seeking an <strong>AI/ML Engineer</strong>, <strong>AI Engineer Fresher</strong>, or <strong>ML Engineer</strong> role.<br>
      • <strong>Email:</strong> <a href="mailto:${profileData.email}" style="color: var(--accent-color); font-weight: 600;">${profileData.email}</a><br>
      • <strong>Phone:</strong> ${profileData.phone}<br>
      • <strong>Location:</strong> ${profileData.location}<br>
      • <strong>LinkedIn:</strong> <a href="${profileData.socials.linkedin}" target="_blank" style="color: var(--accent-color); font-weight: 600;">linkedin.com/in/mohdshamii</a><br>
      • <strong>GitHub:</strong> <a href="${profileData.socials.github}" target="_blank" style="color: var(--accent-color); font-weight: 600;">github.com/mohdshamii</a>`;
    }

    // Default Fallback
    return `Mohd Shami is an AI/ML Engineer (B.Tech 2027, 1st Rank, CGPA 8.5) with experience in Scikit-learn Pipelines, XGBoost, CNNs, NLP (97.8% accuracy), and Docker/Flask deployment. Ask about his <strong>skills</strong>, <strong>Revive / HamOrSpam projects</strong>, <strong>Codec Technologies internship</strong>, or <a href="${profileData.resumeUrl}" download style="color: var(--accent-color); font-weight: 600;">download his resume</a>.`;
  }
}
