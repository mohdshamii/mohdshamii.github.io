// ==========================================================================
// Super Intelligence Lab — Prediction History & Timeline Engine
// LocalStorage-backed audit log, visual score timeline & state restoration
// ==========================================================================

import { PredictionHistoryItem } from './types';
import { labState } from './state';

export function initHistoryDrawer(onRestoreInputs: (item: PredictionHistoryItem) => void) {
  let drawer = document.getElementById('ghHistoryDrawer');
  if (!drawer) {
    createHistoryDrawerDOM();
    drawer = document.getElementById('ghHistoryDrawer');
  }

  const closeBtn = document.getElementById('ghHistoryClose');
  const clearBtn = document.getElementById('ghHistoryClear');
  const exportBtn = document.getElementById('ghHistoryExport');
  const listEl = document.getElementById('ghHistoryList');

  closeBtn?.addEventListener('click', () => {
    drawer?.classList.remove('active');
  });

  drawer?.addEventListener('click', e => {
    if (e.target === drawer) drawer.classList.remove('active');
  });

  clearBtn?.addEventListener('click', () => {
    if (confirm('Clear all recorded prediction history?')) {
      labState.clearAllHistory();
      renderHistoryList(onRestoreInputs);
      labState.showToast('Prediction history cleared', 'info');
    }
  });

  exportBtn?.addEventListener('click', () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(labState.predictionHistory, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `si_history_export_${Date.now()}.json`);
    dlAnchor.click();
    dlAnchor.remove();
    labState.showToast('Exported history as JSON file', 'success');
  });

  // Re-render when state changes
  labState.subscribe(() => {
    renderHistoryList(onRestoreInputs);
    renderTimelineSparkline();
  });

  renderHistoryList(onRestoreInputs);
  renderTimelineSparkline();

  // Connect any open history buttons
  document.querySelectorAll('[data-open-history]').forEach(btn => {
    btn.addEventListener('click', () => {
      drawer?.classList.add('active');
    });
  });
}

export function renderHistoryList(onRestoreInputs: (item: PredictionHistoryItem) => void) {
  const listEl = document.getElementById('ghHistoryList');
  const countEl = document.getElementById('ghHistoryCount');
  if (!listEl) return;

  const items = labState.predictionHistory;
  if (countEl) countEl.textContent = `${items.length} records`;

  if (items.length === 0) {
    listEl.innerHTML = `
      <div class="gh-empty-state">
        <i class="fas fa-clock-rotate-left" style="font-size: 2rem; color: var(--text-muted); margin-bottom: 0.75rem;"></i>
        <p style="font-weight: 600; color: var(--text-primary);">No predictions recorded yet</p>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.25rem;">
          Run an inference in any AI system to automatically log telemetry here.
        </p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = items
    .map(
      item => `
    <div class="gh-history-item" data-id="${item.id}">
      <div class="gh-history-top">
        <div class="gh-history-title-row">
          <span class="gh-history-sys-badge">${item.systemName}</span>
          <span class="gh-history-time">${item.timestamp}</span>
        </div>
        <div class="gh-history-score-row">
          <span class="gh-history-score">${item.resultScore}</span>
          <span class="gauge-status-badge ${item.statusClass}">${item.resultLabel}</span>
        </div>
      </div>

      <div class="gh-history-inputs-summary">
        ${Object.entries(item.inputs)
          .map(([k, v]) => `<span class="gh-param-pill"><strong>${k.replace('revive', '').replace('churn', '').replace('crop', '')}:</strong> ${v}</span>`)
          .join('')}
      </div>

      <div class="gh-history-meta-row">
        <span><i class="fas fa-stopwatch"></i> ${item.inferenceTimeMs.toFixed(2)} ms</span>
        <span>Confidence: ${item.confidencePct}%</span>
        <div class="gh-history-actions">
          <button class="gh-btn-micro gh-restore-btn" data-id="${item.id}" title="Re-run with these inputs">
            <i class="fas fa-rotate-right"></i> Re-run
          </button>
          <button class="gh-btn-micro gh-delete-btn" data-id="${item.id}" title="Delete record">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  // Attach actions
  listEl.querySelectorAll('.gh-restore-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const found = items.find(i => i.id === id);
      if (found) {
        onRestoreInputs(found);
        const drawer = document.getElementById('ghHistoryDrawer');
        drawer?.classList.remove('active');
        labState.showToast(`Restored inputs from ${found.timestamp}`, 'success');
      }
    });
  });

  listEl.querySelectorAll('.gh-delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (id) {
        labState.deleteHistoryItem(id);
        renderHistoryList(onRestoreInputs);
      }
    });
  });
}

export function renderTimelineSparkline() {
  const container = document.getElementById('si-timeline-container');
  if (!container) return;

  const items = labState.predictionHistory.slice(0, 15).reverse();
  if (items.length < 2) {
    container.innerHTML = `<span style="font-size: 0.8125rem; color: var(--text-muted);">Run multiple inferences to build a temporal trajectory trendline.</span>`;
    return;
  }

  // Parse numeric scores if available
  const scores = items.map(i => {
    const num = parseFloat(i.resultScore.replace('%', ''));
    return isNaN(num) ? 50 : num;
  });

  const maxVal = Math.max(...scores, 100);
  const minVal = Math.min(...scores, 0);

  const w = 340;
  const h = 60;
  const stepX = (w - 20) / (scores.length - 1);

  const points = scores
    .map((s, i) => {
      const x = 10 + i * stepX;
      const y = h - 10 - ((s - minVal) / Math.max(1, maxVal - minVal)) * (h - 20);
      return `${x},${y}`;
    })
    .join(' ');

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
      <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
        <span>Prediction Trajectory (Last ${items.length} Runs)</span>
        <span style="font-family: var(--font-mono); color: var(--accent-color);">Latest: ${items[items.length - 1].resultScore}</span>
      </div>
      <svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" style="background: var(--bg-tertiary); border-radius: var(--radius-sm); border: 1px solid var(--border-color); overflow: visible;">
        <polyline fill="none" stroke="var(--accent-color)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" points="${points}" />
        ${scores
          .map((s, i) => {
            const x = 10 + i * stepX;
            const y = h - 10 - ((s - minVal) / Math.max(1, maxVal - minVal)) * (h - 20);
            return `<circle cx="${x}" cy="${y}" r="3.5" fill="var(--bg-card)" stroke="var(--accent-color)" stroke-width="2" />`;
          })
          .join('')}
      </svg>
    </div>
  `;
}

function createHistoryDrawerDOM() {
  const drawer = document.createElement('div');
  drawer.id = 'ghHistoryDrawer';
  drawer.className = 'gh-drawer-backdrop';
  drawer.innerHTML = `
    <div class="gh-drawer-panel" role="dialog" aria-modal="true" aria-label="Prediction History">
      <div class="gh-drawer-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <i class="fas fa-clock-rotate-left" style="color: var(--accent-color);"></i>
          <h3 style="font-size: 1rem; font-weight: 700; margin: 0;">Prediction History</h3>
          <span id="ghHistoryCount" class="gh-badge">0 records</span>
        </div>
        <button id="ghHistoryClose" class="gh-btn-icon" aria-label="Close drawer">&times;</button>
      </div>

      <div class="gh-drawer-toolbar">
        <button id="ghHistoryExport" class="gh-btn gh-btn-sm">
          <i class="fas fa-file-export"></i> Export JSON
        </button>
        <button id="ghHistoryClear" class="gh-btn gh-btn-sm gh-btn-danger">
          <i class="fas fa-trash"></i> Clear All
        </button>
      </div>

      <div id="ghHistoryList" class="gh-drawer-body"></div>
    </div>
  `;
  document.body.appendChild(drawer);
}
