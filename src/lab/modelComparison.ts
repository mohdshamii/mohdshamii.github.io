// ==========================================================================
// Super Intelligence Lab — Model Comparison Table & Model Cards Architecture
// Authentic benchmark metrics & GitHub README-style technical documentation
// ==========================================================================

import { REAL_MODEL_COMPARISONS, SYSTEM_MODEL_CARDS } from './modelsData';
import { LabTabId } from './types';

export function renderModelComparisonTable(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="sql-table-wrap">
      <table class="sql-table">
        <thead>
          <tr>
            <th>Model Architecture</th>
            <th>Primary System</th>
            <th>Algorithm Type</th>
            <th>Accuracy</th>
            <th>Precision</th>
            <th>Recall</th>
            <th>F1-Score</th>
            <th>AUC-ROC</th>
            <th>Inference Latency</th>
            <th>Dataset Source</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${REAL_MODEL_COMPARISONS.map(
            m => `
            <tr>
              <td><strong>${m.modelName}</strong></td>
              <td><span class="gh-badge">${m.systemName}</span></td>
              <td style="font-size: 0.75rem;">${m.algorithm}</td>
              <td><strong style="color: var(--accent-color);">${m.accuracy}</strong></td>
              <td>${m.precision}</td>
              <td>${m.recall}</td>
              <td><code>${m.f1Score}</code></td>
              <td><code>${m.aucRoc}</code></td>
              <td><span style="font-family: var(--font-mono); font-size: 0.75rem;">${m.avgLatencyMs} ms</span></td>
              <td style="font-size: 0.75rem; color: var(--text-secondary);">${m.dataset} (${m.recordsCount})</td>
              <td>
                <span class="gauge-status-badge ${m.status === 'Production' ? 'status-low' : 'status-moderate'}" style="font-size: 0.6875rem; padding: 2px 6px;">
                  ${m.status}
                </span>
              </td>
            </tr>
          `
          ).join('')}
        </tbody>
      </table>
    </div>
  `;
}

export function renderModelCard(containerId: string, systemId: LabTabId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const card = SYSTEM_MODEL_CARDS[systemId] || SYSTEM_MODEL_CARDS['disease-tab'];

  container.innerHTML = `
    <div class="gh-readme-card">
      <div class="gh-readme-header">
        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <i class="fas fa-file-code" style="color: var(--accent-color);"></i>
          <h3 style="font-size: 1rem; font-weight: 700; margin: 0;">MODEL_CARD.md — ${card.title}</h3>
          <span class="gh-badge">${card.badge}</span>
        </div>
        <span class="gh-badge" style="font-family: var(--font-mono); font-size: 0.7rem;">v${card.version}</span>
      </div>

      <div class="gh-readme-content">
        <div class="gh-readme-section">
          <h4>1. Algorithm & Architecture Overview</h4>
          <p>${card.algorithm}</p>
        </div>

        <div class="gh-readme-section">
          <h4>2. Input Feature Schema</h4>
          <ul>
            ${card.features.map(f => `<li><code>${f}</code></li>`).join('')}
          </ul>
        </div>

        <div class="gh-readme-section">
          <h4>3. Training Data & Provenance</h4>
          <p><strong>Dataset:</strong> ${card.dataset}</p>
          <p><strong>Record Volume:</strong> ${card.records}</p>
          <p><strong>Training Methodology:</strong> ${card.trainingApproach}</p>
          <p><strong>Validation Strategy:</strong> ${card.validationStrategy}</p>
        </div>

        <div class="gh-readme-section">
          <h4>4. Benchmark Metrics Verification</h4>
          <div class="gh-metrics-chips">
            ${Object.entries(card.keyMetrics)
              .map(([k, v]) => `
              <div class="gh-metric-chip">
                <span class="gh-metric-key">${k}</span>
                <span class="gh-metric-val">${v}</span>
              </div>
            `)
              .join('')}
          </div>
        </div>

        <div class="gh-readme-section">
          <h4>5. Limitations & Boundary Assumptions</h4>
          <ul>
            ${card.limitations.map(l => `<li>${l}</li>`).join('')}
          </ul>
        </div>

        <div class="gh-readme-section">
          <h4>6. Intended Use Case</h4>
          <p>${card.intendedUse}</p>
        </div>

        <div class="gh-alert gh-alert-warning" style="margin-top: 1rem;">
          <i class="fas fa-triangle-exclamation"></i>
          <div>
            <strong>Notice / Disclaimer:</strong> ${card.ethicalNotice}
          </div>
        </div>
      </div>
    </div>
  `;
}
