import { scrollToTarget } from '../animations/lenis.ts';
import { toggleTheme } from '../utils/theme.ts';
import { portfolioData } from '../data/portfolio.ts';

export type SearchCategory = 'all' | 'sections' | 'projects' | 'skills' | 'pages';

export interface SearchItem {
  id: string;
  name: string;
  desc: string;
  category: 'Section' | 'Project' | 'Skill' | 'Page' | 'Action';
  badgeClass: string;
  shortcut?: string;
  tags?: string[];
  action: () => void;
}

export function renderCommandPalette(): string {
  return `
    <div id="cmd-palette-modal" class="cmd-palette-backdrop" aria-hidden="true" style="display: none;">
      <div class="cmd-palette-window" role="dialog" aria-modal="true" aria-label="GitHub Search & Jump Palette">
        <!-- Search Header Bar -->
        <div class="cmd-palette-search">
          <svg class="cmd-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
          </svg>
          <input
            id="cmd-palette-input"
            type="text"
            placeholder="Search sections, projects, skills, pages... (Press ESC to close)"
            autocomplete="off"
            spellcheck="false"
          />
          <kbd class="cmd-kbd-esc">ESC</kbd>
        </div>

        <!-- Filter Tags Row -->
        <div class="cmd-palette-tags-row" role="tablist" aria-label="Search category filters">
          <button class="cmd-tag active" data-category="all" type="button">All Suggestions</button>
          <button class="cmd-tag" data-category="sections" type="button">Sections</button>
          <button class="cmd-tag" data-category="projects" type="button">Projects & Repos</button>
          <button class="cmd-tag" data-category="skills" type="button">Skills & Stack</button>
          <button class="cmd-tag" data-category="pages" type="button">Pages & Actions</button>
        </div>

        <!-- Dynamic Results List -->
        <div class="cmd-palette-list" id="cmd-palette-results" role="listbox">
          <!-- Populated dynamically -->
        </div>

        <!-- Keyboard Controls Footer -->
        <div class="cmd-palette-footer">
          <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>ESC</kbd> to exit</span>
          <span><kbd>D</kbd> theme</span>
        </div>
      </div>
    </div>
  `;
}

export function initCommandPalette() {
  const modal = document.getElementById('cmd-palette-modal');
  const input = document.getElementById('cmd-palette-input') as HTMLInputElement | null;
  const list = document.getElementById('cmd-palette-results');
  if (!modal || !input || !list) return;

  const { identity, projects } = portfolioData;

  // Build the complete search & recommendation index
  const searchItems: SearchItem[] = [
    // 1. Core Sections
    {
      id: 'sec-projects',
      name: 'Projects & Systems Showcase',
      desc: 'Applied machine learning architectures & production engineering systems',
      category: 'Section',
      badgeClass: 'badge-section',
      shortcut: 'P',
      tags: ['systems', 'projects', 'repos', 'code', 'models'],
      action: () => scrollToTarget('#projects')
    },
    {
      id: 'sec-experience',
      name: 'Experience & Internships',
      desc: 'Codec Technologies India ML internship & technical delivery metrics',
      category: 'Section',
      badgeClass: 'badge-section',
      shortcut: 'E',
      tags: ['work', 'internship', 'experience', 'codec', 'clinical'],
      action: () => scrollToTarget('#experience')
    },
    {
      id: 'sec-diff',
      name: 'Model Traces & Optimization Diff',
      desc: 'Side-by-side performance audit: Baseline vs Optimized AUC-ROC (0.91)',
      category: 'Section',
      badgeClass: 'badge-section',
      shortcut: 'F',
      tags: ['diff', 'traces', 'metrics', 'auc-roc', 'inspector'],
      action: () => scrollToTarget('#diff-inspector')
    },
    {
      id: 'sec-skills',
      name: 'Tech Stack & Skills Ecosystem',
      desc: 'Python, XGBoost, PyTorch, Deep Learning, NLP, Docker, Flask',
      category: 'Section',
      badgeClass: 'badge-section',
      shortcut: 'S',
      tags: ['skills', 'stack', 'python', 'tools', 'languages'],
      action: () => scrollToTarget('#skills')
    },
    {
      id: 'sec-pipeline',
      name: '9-Stage Machine Learning Pipeline',
      desc: 'From problem formulation & SMOTE balancing to Flask API deployment',
      category: 'Section',
      badgeClass: 'badge-section',
      shortcut: 'M',
      tags: ['pipeline', 'stages', 'mlops', 'architecture'],
      action: () => scrollToTarget('#pipeline')
    },
    {
      id: 'sec-about',
      name: 'About & Engineering Philosophy',
      desc: 'B.Tech 2027 · TMU Cohort Rank 1 · Background and specializations',
      category: 'Section',
      badgeClass: 'badge-section',
      shortcut: 'A',
      tags: ['about', 'bio', 'philosophy', 'profile', 'shami'],
      action: () => scrollToTarget('#about')
    },
    {
      id: 'sec-education',
      name: 'Education & Academic Record',
      desc: 'Teerthanker Mahaveer University · CGPA 8.5/10 · Computer Science',
      category: 'Section',
      badgeClass: 'badge-section',
      shortcut: 'D',
      tags: ['education', 'tmu', 'degree', 'cgpa', 'university'],
      action: () => scrollToTarget('#education')
    },
    {
      id: 'sec-certifications',
      name: 'Verified Technical Certifications',
      desc: 'NPTEL, HackerRank, freeCodeCamp, Infosys Springboard credentials',
      category: 'Section',
      badgeClass: 'badge-section',
      shortcut: 'C',
      tags: ['certifications', 'credentials', 'licenses', 'courses'],
      action: () => scrollToTarget('#certifications')
    },
    {
      id: 'sec-contact',
      name: 'Contact & Engineering Handshake',
      desc: 'Direct communication terminal: codexshami@gmail.com · +91 89235 91576',
      category: 'Section',
      badgeClass: 'badge-section',
      shortcut: 'T',
      tags: ['contact', 'email', 'phone', 'message', 'hire'],
      action: () => scrollToTarget('#contact')
    },

    // 2. Featured Projects & Repositories
    {
      id: 'repo-hydroraksh',
      name: 'HydroRaksh',
      desc: 'IoT & Python automated water conservation & real-time reservoir monitoring system',
      category: 'Project',
      badgeClass: 'badge-project',
      tags: ['hydroraksh', 'iot', 'python', 'water', 'sensor', 'automation'],
      action: () => {
        scrollToTarget('#projects');
        setTimeout(() => {
          const card = document.querySelector('[data-project="hydroraksh"]') as HTMLElement | null;
          card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    },
    {
      id: 'repo-100days',
      name: '100-Days-AI-ML',
      desc: 'Complete 100 days AI/ML roadmap with research papers, free textbooks & 100+ notebooks',
      category: 'Project',
      badgeClass: 'badge-project',
      tags: ['100', 'roadmap', 'research', 'books', 'jupyter', 'deep learning'],
      action: () => {
        scrollToTarget('#projects');
        setTimeout(() => {
          const card = document.querySelector('[data-project="100days-aiml"]') as HTMLElement | null;
          card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    },
    {
      id: 'repo-industrial',
      name: 'Industrial-Training',
      desc: 'Comprehensive collection of industry-grade Machine Learning and applied Python projects',
      category: 'Project',
      badgeClass: 'badge-project',
      tags: ['industrial', 'training', 'machine learning', 'python', 'pipelines'],
      action: () => {
        scrollToTarget('#projects');
        setTimeout(() => {
          const card = document.querySelector('[data-project="industrial-training"]') as HTMLElement | null;
          card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    },
    {
      id: 'repo-pydsa',
      name: 'CorOrbit / PyDSA',
      desc: 'Interactive platform to master Python algorithmic skills with 850+ solutions & benchmarking',
      category: 'Project',
      badgeClass: 'badge-project',
      tags: ['pydsa', 'dsa', 'python', 'algorithms', 'cororbit', 'coding'],
      action: () => window.open('https://mohdshamii.github.io/PyDSA', '_blank')
    },
    {
      id: 'repo-dsaos',
      name: 'DSAos',
      desc: 'Top 250 DSA problems for product MNCs & campus placements across 14 interview patterns',
      category: 'Project',
      badgeClass: 'badge-project',
      tags: ['dsaos', 'dsa', 'interviews', 'campus', 'placement', 'leetcode'],
      action: () => window.open('https://mohdshamii.github.io/DSAos', '_blank')
    },
    {
      id: 'repo-gateda',
      name: 'GateDA',
      desc: 'GATE Data Science & AI preparation portal: Probability, Linear Algebra & ML Theory',
      category: 'Project',
      badgeClass: 'badge-project',
      tags: ['gateda', 'gate', 'data science', 'math', 'linear algebra', 'probability'],
      action: () => window.open('https://mohdshamii.github.io/GateDA', '_blank')
    },
    {
      id: 'repo-revive',
      name: 'Revive Clinical AI Diagnostic',
      desc: 'XGBoost clinical decision support system · 0.91 AUC-ROC · 38ms API latency',
      category: 'Project',
      badgeClass: 'badge-project',
      tags: ['revive', 'xgboost', 'clinical', 'medical', 'auc-roc', 'docker'],
      action: () => {
        scrollToTarget('#projects');
        setTimeout(() => {
          const card = document.querySelector('[data-project="revive"]') as HTMLElement | null;
          card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    },
    {
      id: 'repo-trading',
      name: 'Automated Trading Strategy',
      desc: 'Walk-forward ML quantitative framework on NIFTY50 tick data with transaction cost models',
      category: 'Project',
      badgeClass: 'badge-project',
      tags: ['trading', 'quant', 'nifty', 'walk-forward', 'finance'],
      action: () => {
        scrollToTarget('#projects');
        setTimeout(() => {
          const card = document.querySelector('[data-project="trading-strategy"]') as HTMLElement | null;
          card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    },
    {
      id: 'repo-fakenews',
      name: 'Fake News Detection System',
      desc: 'NLP classification pipeline with TF-IDF vectorization achieving 97.8% validation accuracy',
      category: 'Project',
      badgeClass: 'badge-project',
      tags: ['fake news', 'nlp', 'tf-idf', 'text classification', 'tokenization'],
      action: () => {
        scrollToTarget('#projects');
        setTimeout(() => {
          const card = document.querySelector('[data-project="fake-news"]') as HTMLElement | null;
          card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    },
    {
      id: 'repo-cifar',
      name: 'CIFAR-10 Image Classifier',
      desc: 'Deep convolutional neural network (CNN) with BatchNormalization and data augmentation',
      category: 'Project',
      badgeClass: 'badge-project',
      tags: ['cifar', 'cnn', 'computer vision', 'deep learning', 'keras'],
      action: () => {
        scrollToTarget('#projects');
        setTimeout(() => {
          const card = document.querySelector('[data-project="cifar10"]') as HTMLElement | null;
          card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    },
    {
      id: 'repo-churn',
      name: 'Telecom Customer Churn Pipeline',
      desc: 'End-to-end churn prediction pipeline using SMOTE class balancing and Scikit-learn',
      category: 'Project',
      badgeClass: 'badge-project',
      tags: ['churn', 'smote', 'scikit-learn', 'telecom', 'random forest'],
      action: () => {
        scrollToTarget('#projects');
        setTimeout(() => {
          const card = document.querySelector('[data-project="telecom-churn"]') as HTMLElement | null;
          card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    },

    // 3. Skills & Technologies
    {
      id: 'skill-python',
      name: 'Python (Scikit-learn, Pandas, NumPy)',
      desc: 'Primary engineering language for machine learning, pipelines & data structures',
      category: 'Skill',
      badgeClass: 'badge-skill',
      tags: ['python', 'pandas', 'numpy', 'scipy', 'algorithms'],
      action: () => scrollToTarget('#skills')
    },
    {
      id: 'skill-xgboost',
      name: 'XGBoost & Random Forest Ensembles',
      desc: 'Gradient boosted trees, hyperparameter tuning & clinical risk classification',
      category: 'Skill',
      badgeClass: 'badge-skill',
      tags: ['xgboost', 'random forest', 'gradient boosting', 'trees'],
      action: () => scrollToTarget('#skills')
    },
    {
      id: 'skill-deeplearning',
      name: 'Deep Learning & CNNs',
      desc: 'Convolutional neural networks, image feature extraction, Keras & PyTorch',
      category: 'Skill',
      badgeClass: 'badge-skill',
      tags: ['deep learning', 'cnn', 'keras', 'pytorch', 'vision'],
      action: () => scrollToTarget('#skills')
    },
    {
      id: 'skill-nlp',
      name: 'Natural Language Processing (NLP)',
      desc: 'TF-IDF vectorization, tokenization, text cleaning, sentiment & fake news analysis',
      category: 'Skill',
      badgeClass: 'badge-skill',
      tags: ['nlp', 'tf-idf', 'text', 'tokenization', 'language'],
      action: () => scrollToTarget('#skills')
    },
    {
      id: 'skill-smote',
      name: 'SMOTE Class Balancing',
      desc: 'Synthetic Minority Over-sampling Technique for severely imbalanced datasets',
      category: 'Skill',
      badgeClass: 'badge-skill',
      tags: ['smote', 'imbalance', 'sampling', 'preprocessing'],
      action: () => scrollToTarget('#skills')
    },
    {
      id: 'skill-flask',
      name: 'Flask & REST APIs',
      desc: 'Deploying real-time model inference endpoints with JSON serialization and Docker',
      category: 'Skill',
      badgeClass: 'badge-skill',
      tags: ['flask', 'rest', 'api', 'microservice', 'inference'],
      action: () => scrollToTarget('#skills')
    },
    {
      id: 'skill-docker',
      name: 'Docker & Linux Deployment',
      desc: 'Containerization, reproducible ML environments & automated cloud build workflows',
      category: 'Skill',
      badgeClass: 'badge-skill',
      tags: ['docker', 'linux', 'container', 'deployment', 'bash'],
      action: () => scrollToTarget('#skills')
    },
    {
      id: 'skill-sql',
      name: 'SQL & Database Engineering',
      desc: 'Relational schemas, MySQL, feature store querying & ETL data extraction',
      category: 'Skill',
      badgeClass: 'badge-skill',
      tags: ['sql', 'mysql', 'database', 'etl', 'query'],
      action: () => scrollToTarget('#skills')
    },

    // 4. Pages & Actions
    {
      id: 'page-lab',
      name: 'Launch Super Intelligence Lab (/lab)',
      desc: 'Interactive live model playground: Clinical AI, Sentiment, CNN & Algorithmic Presets',
      category: 'Page',
      badgeClass: 'badge-page',
      shortcut: 'X',
      tags: ['lab', 'playground', 'demo', 'super intelligence', 'interactive'],
      action: () => {
        window.location.href = '/lab/index.html';
      }
    },
    {
      id: 'page-assistant',
      name: 'Super Intelligence Assistant',
      desc: 'Interactive chat assistant to query Mohd Shami projects, skills & background',
      category: 'Action',
      badgeClass: 'badge-page',
      shortcut: 'I',
      tags: ['assistant', 'ai', 'chat', 'bot', 'copilot'],
      action: () => {
        const launcher = document.getElementById('si-assistant-launcher');
        launcher?.click();
      }
    },
    {
      id: 'page-resume',
      name: 'Download Verified Resume (.pdf)',
      desc: 'Complete curriculum vitae covering AI/ML engineering, internships & education',
      category: 'Action',
      badgeClass: 'badge-page',
      shortcut: 'R',
      tags: ['resume', 'cv', 'pdf', 'download', 'hire'],
      action: () => {
        const a = document.createElement('a');
        a.href = identity.resumeUrl;
        a.download = 'Mohd_Shami_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    },
    {
      id: 'page-theme',
      name: 'Toggle Color Theme (Light / Dark)',
      desc: 'Switch between GitHub Light (#FAFAFA) and GitHub Dark (#0D1117) theme modes',
      category: 'Action',
      badgeClass: 'badge-page',
      shortcut: 'D',
      tags: ['theme', 'dark', 'light', 'mode', 'color'],
      action: () => {
        toggleTheme();
      }
    },
    {
      id: 'page-github',
      name: 'GitHub Profile (@mohdshamii)',
      desc: 'Open official GitHub repositories, open-source code & contributions',
      category: 'Page',
      badgeClass: 'badge-page',
      shortcut: 'G',
      tags: ['github', 'profile', 'repos', 'git'],
      action: () => window.open(identity.socials.github, '_blank')
    },
    {
      id: 'page-linkedin',
      name: 'LinkedIn Profile (/in/mohdshamii)',
      desc: 'Connect with Mohd Shami on LinkedIn for professional networking & hiring',
      category: 'Page',
      badgeClass: 'badge-page',
      shortcut: 'L',
      tags: ['linkedin', 'network', 'career', 'social'],
      action: () => window.open(identity.socials.linkedin, '_blank')
    }
  ];

  let selectedIndex = 0;
  let currentCategory: SearchCategory = 'all';
  let filteredItems: SearchItem[] = [...searchItems];

  function openPalette() {
    modal!.style.display = 'flex';
    modal!.setAttribute('aria-hidden', 'false');
    input!.value = '';
    currentCategory = 'all';
    updateCategoryTagsUI();
    filterItems('');
    setTimeout(() => input!.focus(), 50);
  }

  function closePalette() {
    modal!.style.display = 'none';
    modal!.setAttribute('aria-hidden', 'true');
  }

  function renderList() {
    if (filteredItems.length === 0) {
      list!.innerHTML = `
        <div class="cmd-no-results">
          <p>No results matching your query.</p>
          <span>Try searching for "Hydroraksh", "PyDSA", "Revive", "Python", "XGBoost", or "Resume"</span>
        </div>
      `;
      return;
    }

    list!.innerHTML = filteredItems
      .map(
        (item, idx) => `
        <div class="cmd-item ${idx === selectedIndex ? 'selected' : ''}" data-index="${idx}" role="option" aria-selected="${idx === selectedIndex}">
          <div class="cmd-item-left">
            <span class="cmd-badge ${item.badgeClass}">${item.category}</span>
            <div class="cmd-item-text">
              <span class="cmd-name">${highlightMatch(item.name, input!.value.trim())}</span>
              <span class="cmd-desc">${item.desc}</span>
            </div>
          </div>
          ${item.shortcut ? `<kbd class="cmd-shortcut">${item.shortcut}</kbd>` : ''}
        </div>
      `
      )
      .join('');

    // Attach click events to rows
    list!.querySelectorAll('.cmd-item').forEach((row) => {
      row.addEventListener('click', () => {
        const idx = parseInt(row.getAttribute('data-index') || '0', 10);
        if (filteredItems[idx]) {
          executeItem(filteredItems[idx]);
        }
      });
    });
  }

  function highlightMatch(text: string, query: string): string {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--accent-tint); color: var(--accent); font-weight: 700; border-radius: 2px; padding: 0 1px;">$1</mark>');
  }

  function filterItems(query: string) {
    const q = query.trim().toLowerCase();

    filteredItems = searchItems.filter((item) => {
      // Category filter match
      if (currentCategory === 'sections' && item.category !== 'Section') return false;
      if (currentCategory === 'projects' && item.category !== 'Project') return false;
      if (currentCategory === 'skills' && item.category !== 'Skill') return false;
      if (currentCategory === 'pages' && item.category !== 'Page' && item.category !== 'Action') return false;

      // Query string match
      if (!q) return true;

      const nameMatch = item.name.toLowerCase().includes(q);
      const descMatch = item.desc.toLowerCase().includes(q);
      const idMatch = item.id.toLowerCase().includes(q);
      const tagMatch = item.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;

      return nameMatch || descMatch || idMatch || tagMatch;
    });

    selectedIndex = 0;
    renderList();
  }

  function executeItem(item: SearchItem) {
    closePalette();
    item.action();
  }

  function updateCategoryTagsUI() {
    modal!.querySelectorAll('.cmd-tag').forEach((btn) => {
      const cat = btn.getAttribute('data-category');
      if (cat === currentCategory) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Category tag clicks
  modal.querySelectorAll('.cmd-tag').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentCategory = (btn.getAttribute('data-category') as SearchCategory) || 'all';
      updateCategoryTagsUI();
      filterItems(input.value);
      input.focus();
    });
  });

  // Real-time input handling
  input.addEventListener('input', () => {
    filterItems(input.value);
  });

  // Keyboard navigation
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredItems.length > 0) {
        selectedIndex = (selectedIndex + 1) % filteredItems.length;
        renderList();
        scrollSelectedIntoView();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredItems.length > 0) {
        selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
        renderList();
        scrollSelectedIntoView();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        executeItem(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    }
  });

  function scrollSelectedIntoView() {
    const selected = list!.querySelector('.cmd-item.selected');
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' });
    }
  }

  // Backdrop click closes modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePalette();
  });

  // Global Ctrl+K, Cmd+K, and '/' shortcuts
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.style.display === 'flex') {
        closePalette();
      } else {
        openPalette();
      }
    }
  });

  // Bind to any trigger button
  document.querySelectorAll('.cmd-palette-trigger').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPalette();
    });
  });
}
