// ==========================================================================
// Super Intelligence Lab — Command Palette (Ctrl+K) & Keyboard Engine
// GitHub / VS Code style developer navigation and shortcut dispatcher
// ==========================================================================

import { LabTabId } from './types';
import { labState } from './state';

export interface LabCommand {
  id: string;
  name: string;
  description: string;
  category: 'System Navigation' | 'Actions' | 'Tools & Views' | 'Preferences';
  shortcut?: string;
  icon: string;
  action: () => void;
}

export function initCommandPalette(
  onSwitchTab: (tabId: LabTabId) => void,
  onRunCurrentAnalysis: () => void,
  onResetInputs: () => void,
  onRandomCase: () => void,
  onToggleTheme: () => void
) {
  let modal = document.getElementById('ghCommandPalette') as HTMLElement | null;
  if (!modal) {
    createCommandPaletteDOM();
    modal = document.getElementById('ghCommandPalette');
  }

  const input = document.getElementById('ghCmdInput') as HTMLInputElement | null;
  const list = document.getElementById('ghCmdList') as HTMLElement | null;
  const closeBtn = document.getElementById('ghCmdClose') as HTMLElement | null;

  let activeIndex = 0;
  let filteredCommands: LabCommand[] = [];

  const commands: LabCommand[] = [
    // 1. Systems
    {
      id: 'sys-revive',
      name: 'Switch: Revive (Clinical Disease Risk)',
      description: 'XGBoost classifier for cardiovascular risk prediction',
      category: 'System Navigation',
      shortcut: '1',
      icon: 'fa-heartbeat',
      action: () => onSwitchTab('disease-tab')
    },
    {
      id: 'sys-spam',
      name: 'Switch: HamOrSpam (NLP Classifier)',
      description: 'TF-IDF + SMOTE email & SMS text classification',
      category: 'System Navigation',
      shortcut: '2',
      icon: 'fa-shield-alt',
      action: () => onSwitchTab('spam-tab')
    },
    {
      id: 'sys-crop',
      name: 'Switch: FarmAIQ (Crop Advisor)',
      description: 'Random Forest NPK soil chemistry recommendation',
      category: 'System Navigation',
      shortcut: '3',
      icon: 'fa-seedling',
      action: () => onSwitchTab('crop-tab')
    },
    {
      id: 'sys-neural',
      name: 'Switch: Neural Lab (2D Boundary)',
      description: 'Real-time MLP non-linear decision contour canvas',
      category: 'System Navigation',
      shortcut: '4',
      icon: 'fa-network-wired',
      action: () => onSwitchTab('neural-tab')
    },
    {
      id: 'sys-sentiment',
      name: 'Switch: Emotion NLP (Sentiment)',
      description: 'Aspect-based emotion breakdown & feedback scoring',
      category: 'System Navigation',
      shortcut: '5',
      icon: 'fa-smile-beam',
      action: () => onSwitchTab('sentiment-tab')
    },
    {
      id: 'sys-vector',
      name: 'Switch: Vector RAG (Semantic Search)',
      description: 'Cosine similarity ranking across dense embeddings',
      category: 'System Navigation',
      shortcut: '6',
      icon: 'fa-project-diagram',
      action: () => onSwitchTab('vector-tab')
    },
    {
      id: 'sys-churn',
      name: 'Switch: ChurnShield AI (Retention Risk)',
      description: 'Customer churn telemetry hazard prediction',
      category: 'System Navigation',
      shortcut: '7',
      icon: 'fa-chart-line',
      action: () => onSwitchTab('churn-tab')
    },
    {
      id: 'sys-sql',
      name: 'Switch: SQL Sandbox (Analytics)',
      description: 'In-memory relational query execution and AST filtering',
      category: 'System Navigation',
      shortcut: '8',
      icon: 'fa-database',
      action: () => onSwitchTab('sql-tab')
    },
    {
      id: 'sys-cororbit',
      name: 'Switch: CorOrbit (Master Python)',
      description: '850+ algorithms, time/space proofs & Python platform',
      category: 'System Navigation',
      shortcut: '9',
      icon: 'fa-python',
      action: () => onSwitchTab('cororbit-tab')
    },
    {
      id: 'sys-dsaos',
      name: 'Switch: DSAos (Top 250 Placement)',
      description: 'Campus placement & Tier-1 MNC high-frequency questions',
      category: 'System Navigation',
      shortcut: 'P',
      icon: 'fa-code',
      action: () => onSwitchTab('dsaos-tab')
    },
    {
      id: 'sys-gateda',
      name: 'Switch: GateDA (GATE DS & AI Portal)',
      description: 'Formal linear algebra, probability, calculus and ML',
      category: 'System Navigation',
      shortcut: 'G',
      icon: 'fa-graduation-cap',
      action: () => onSwitchTab('gateda-tab')
    },

    // 2. Actions
    {
      id: 'act-run',
      name: 'Run Inference / Analysis',
      description: 'Execute model inference on current input features',
      category: 'Actions',
      shortcut: 'Enter',
      icon: 'fa-bolt',
      action: () => onRunCurrentAnalysis()
    },
    {
      id: 'act-reset',
      name: 'Reset Inputs to Defaults',
      description: 'Restore baseline values for the active system',
      category: 'Actions',
      shortcut: 'R',
      icon: 'fa-undo',
      action: () => onResetInputs()
    },
    {
      id: 'act-random',
      name: 'Generate Random Valid Case',
      description: 'Sample random inputs within statistical bounds',
      category: 'Actions',
      icon: 'fa-dice',
      action: () => onRandomCase()
    },
    {
      id: 'act-whatif',
      name: 'What-If / Counterfactual Analysis',
      description: 'Compare current inputs against snapshot baseline',
      category: 'Tools & Views',
      icon: 'fa-code-compare',
      action: () => {
        const target = document.getElementById('si-whatif-section');
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        labState.showToast('Navigated to What-If Counterfactual Lab', 'info');
      }
    },
    {
      id: 'act-devmode',
      name: 'Toggle Developer Mode',
      description: 'Inspect raw JSON, feature vectors and API responses',
      category: 'Tools & Views',
      shortcut: 'Ctrl+D',
      icon: 'fa-terminal',
      action: () => {
        labState.toggleDevMode();
      }
    },
    {
      id: 'act-history',
      name: 'Open Prediction History',
      description: 'Review historical runs, restore states or export',
      category: 'Tools & Views',
      shortcut: 'H',
      icon: 'fa-clock-rotate-left',
      action: () => {
        const drawer = document.getElementById('ghHistoryDrawer');
        drawer?.classList.add('active');
      }
    },
    {
      id: 'act-compare',
      name: 'Compare Models Benchmark Table',
      description: 'Inspect Accuracy, AUC, F1, and Latency matrix',
      category: 'Tools & Views',
      icon: 'fa-table-columns',
      action: () => {
        const target = document.getElementById('si-model-comparison');
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    {
      id: 'act-api',
      name: 'Open API Explorer',
      description: 'Inspect simulated REST endpoints, payloads and cURL',
      category: 'Tools & Views',
      icon: 'fa-cloud-arrow-up',
      action: () => {
        const target = document.getElementById('si-api-explorer');
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    {
      id: 'act-export',
      name: 'Open Export Center',
      description: 'Export JSON, copy summary, or print full report',
      category: 'Actions',
      icon: 'fa-download',
      action: () => {
        const modal = document.getElementById('ghExportModal');
        modal?.classList.add('active');
      }
    },
    {
      id: 'act-theme',
      name: 'Toggle Theme (Light / Dark)',
      description: 'Switch between GitHub light and GitHub dark mode',
      category: 'Preferences',
      shortcut: 'D',
      icon: 'fa-circle-half-stroke',
      action: () => onToggleTheme()
    },
    {
      id: 'act-docs',
      name: 'Read Technical Documentation (README)',
      description: 'Architectural specifications and mathematical guide',
      category: 'Tools & Views',
      icon: 'fa-book-bookmark',
      action: () => {
        const target = document.getElementById('si-documentation-section');
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  ];

  function openPalette() {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (input) {
      input.value = '';
      input.focus();
    }
    renderFiltered('');
  }

  function closePalette() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderFiltered(query: string) {
    if (!list) return;
    const q = query.toLowerCase().trim();
    filteredCommands = commands.filter(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));

    activeIndex = 0;

    if (filteredCommands.length === 0) {
      list.innerHTML = `<div class="gh-cmd-empty">No commands matching "${query}"</div>`;
      return;
    }

    list.innerHTML = filteredCommands
      .map(
        (cmd, idx) => `
      <div class="gh-cmd-item ${idx === 0 ? 'selected' : ''}" data-index="${idx}">
        <div class="gh-cmd-left">
          <i class="fas ${cmd.icon} gh-cmd-icon"></i>
          <div>
            <div class="gh-cmd-name">${cmd.name}</div>
            <div class="gh-cmd-desc">${cmd.description}</div>
          </div>
        </div>
        <div class="gh-cmd-right">
          <span class="gh-cmd-category">${cmd.category}</span>
          ${cmd.shortcut ? `<kbd class="gh-cmd-kbd">${cmd.shortcut}</kbd>` : ''}
        </div>
      </div>
    `
      )
      .join('');

    // Attach click handlers
    list.querySelectorAll('.gh-cmd-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-index') || '0');
        executeCommand(idx);
      });
    });
  }

  function executeCommand(index: number) {
    if (filteredCommands[index]) {
      closePalette();
      filteredCommands[index].action();
    }
  }

  input?.addEventListener('input', () => {
    renderFiltered(input.value);
  });

  input?.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % filteredCommands.length;
      updateSelectedDOM();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + filteredCommands.length) % filteredCommands.length;
      updateSelectedDOM();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(activeIndex);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    }
  });

  function updateSelectedDOM() {
    const items = list?.querySelectorAll('.gh-cmd-item');
    items?.forEach((item, idx) => {
      if (idx === activeIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  closeBtn?.addEventListener('click', closePalette);
  modal?.addEventListener('click', e => {
    if (e.target === modal) closePalette();
  });

  // Global Keyboard Shortcuts (Ctrl+K, Enter, R, D, H)
  window.addEventListener('keydown', e => {
    const target = e.target as HTMLElement;
    const isEditing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable || target.tagName === 'SELECT';

    // Ctrl+K / Cmd+K triggers anytime
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (modal?.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
      return;
    }

    if (e.key === 'Escape') {
      if (modal?.classList.contains('active')) {
        closePalette();
        return;
      }
      const historyDrawer = document.getElementById('ghHistoryDrawer');
      if (historyDrawer?.classList.contains('active')) {
        historyDrawer.classList.remove('active');
        return;
      }
      const exportModal = document.getElementById('ghExportModal');
      if (exportModal?.classList.contains('active')) {
        exportModal.classList.remove('active');
        return;
      }
    }

    // Never trigger single-key shortcuts while typing in inputs
    if (isEditing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      onRunCurrentAnalysis();
    } else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      onResetInputs();
    } else if (e.key === 'd' || e.key === 'D') {
      e.preventDefault();
      onToggleTheme();
    } else if (e.key === 'h' || e.key === 'H') {
      e.preventDefault();
      const drawer = document.getElementById('ghHistoryDrawer');
      drawer?.classList.toggle('active');
    }
  });

  // Connect any button with data-open-palette
  document.querySelectorAll('[data-open-palette]').forEach(btn => {
    btn.addEventListener('click', openPalette);
  });
}

function createCommandPaletteDOM() {
  const div = document.createElement('div');
  div.id = 'ghCommandPalette';
  div.className = 'gh-modal-backdrop';
  div.innerHTML = `
    <div class="gh-cmd-modal" role="dialog" aria-modal="true" aria-label="Command Palette">
      <div class="gh-cmd-header">
        <i class="fas fa-search gh-cmd-search-icon"></i>
        <input type="text" id="ghCmdInput" class="gh-cmd-input" placeholder="Type a command or search systems... (Esc to exit)" autocomplete="off" />
        <button id="ghCmdClose" class="gh-cmd-close-btn" aria-label="Close Command Palette">&times;</button>
      </div>
      <div id="ghCmdList" class="gh-cmd-list"></div>
      <div class="gh-cmd-footer">
        <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
        <span><kbd>Enter</kbd> to select</span>
        <span><kbd>Esc</kbd> to dismiss</span>
      </div>
    </div>
  `;
  document.body.appendChild(div);
}
