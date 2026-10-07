// ==========================================================================
// Super Intelligence Lab — System Health, Performance Monitor & Activity Log
// Real-time telemetry: Latency benchmarks, memory, offline status & GitHub audit log
// ==========================================================================

import { labState } from './state';

export function initSystemHealthAndActivity() {
  let drawer = document.getElementById('ghActivityDrawer');
  if (!drawer) {
    createActivityDrawerDOM();
    drawer = document.getElementById('ghActivityDrawer');
  }

  const closeBtn = document.getElementById('ghActivityClose');
  closeBtn?.addEventListener('click', () => {
    drawer?.classList.remove('active');
  });

  drawer?.addEventListener('click', e => {
    if (e.target === drawer) drawer.classList.remove('active');
  });

  // Connect any trigger button
  document.querySelectorAll('[data-open-activity]').forEach(btn => {
    btn.addEventListener('click', () => {
      renderActivityList();
      drawer?.classList.add('active');
    });
  });

  labState.subscribe(() => {
    renderSystemHealthBar();
    renderActivityList();
  });

  renderSystemHealthBar();
  renderActivityList();
}

export function renderSystemHealthBar() {
  const container = document.getElementById('si-health-bar');
  if (!container) return;

  const isOffline = labState.isOffline;
  const latency = labState.lastInferenceLatencyMs;
  const count = labState.totalInferencesRun;

  container.innerHTML = `
    <div class="gh-health-strip">
      <div class="gh-health-item">
        <span class="status-indicator-dot green"></span>
        <span>Systems: <strong>11/11 Active</strong></span>
      </div>

      <div class="gh-health-item">
        <i class="fas fa-microchip" style="color: var(--accent-color);"></i>
        <span>Engine: <strong>Local JS/WASM</strong></span>
      </div>

      <div class="gh-health-item">
        <i class="fas fa-stopwatch" style="color: var(--text-muted);"></i>
        <span>Inference Latency: <strong>${latency.toFixed(2)} ms</strong></span>
      </div>

      <div class="gh-health-item">
        <i class="fas ${isOffline ? 'fa-plane' : 'fa-wifi'}" style="color: ${isOffline ? '#d97706' : '#059669'};"></i>
        <span>Network: <strong>${isOffline ? 'Offline (Local Only)' : 'Connected / Offline-Ready'}</strong></span>
      </div>

      <div class="gh-health-item">
        <i class="fas fa-chart-line" style="color: var(--text-muted);"></i>
        <span>Total Inferences: <strong>${count}</strong></span>
      </div>
    </div>
  `;
}

export function renderActivityList() {
  const listEl = document.getElementById('ghActivityList');
  if (!listEl) return;

  const logs = labState.activityLogs;

  if (logs.length === 0) {
    listEl.innerHTML = `<div class="gh-empty-state">No activity events logged yet.</div>`;
    return;
  }

  listEl.innerHTML = logs
    .map(
      log => `
    <div class="gh-activity-item">
      <div class="gh-activity-time">${log.timestamp}</div>
      <div class="gh-activity-badge gh-badge-${log.type.toLowerCase()}">${log.type}</div>
      <div class="gh-activity-body">
        <div class="gh-activity-msg">${log.message}</div>
        ${log.detail ? `<div class="gh-activity-detail">${log.detail}</div>` : ''}
      </div>
      ${log.latencyMs !== undefined ? `<span class="gh-activity-latency">${log.latencyMs.toFixed(2)}ms</span>` : ''}
    </div>
  `
    )
    .join('');
}

function createActivityDrawerDOM() {
  const drawer = document.createElement('div');
  drawer.id = 'ghActivityDrawer';
  drawer.className = 'gh-drawer-backdrop';
  drawer.innerHTML = `
    <div class="gh-drawer-panel" role="dialog" aria-modal="true" aria-label="Activity Log">
      <div class="gh-drawer-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <i class="fas fa-stream" style="color: var(--accent-color);"></i>
          <h3 style="font-size: 1rem; font-weight: 700; margin: 0;">AI Activity Audit Stream</h3>
        </div>
        <button id="ghActivityClose" class="gh-btn-icon" aria-label="Close activity log">&times;</button>
      </div>

      <div class="gh-drawer-toolbar" style="font-size: 0.75rem; color: var(--text-secondary);">
        <span>Real-time event logging of model inferences, tab switches, and batch benchmarks.</span>
      </div>

      <div id="ghActivityList" class="gh-drawer-body"></div>
    </div>
  `;
  document.body.appendChild(drawer);
}
