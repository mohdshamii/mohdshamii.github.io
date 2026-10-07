// ==========================================================================
// Super Intelligence Lab — Scenario Builder & Batch Analysis Suite
// Multi-scenario side-by-side comparison & local batch evaluation runner
// ==========================================================================

import { ScenarioItem, BatchRunResult } from './types';
import { REVIVE_BATCH_TEST_SUITE, CHURN_BATCH_TEST_SUITE } from './modelsData';
import { labState } from './state';

export function renderScenariosComparison(onLoadScenario: (scenario: ScenarioItem) => void) {
  const container = document.getElementById('si-scenarios-container');
  if (!container) return;

  const scenarios = labState.savedScenarios.filter(s => s.systemId === labState.activeTab);

  if (scenarios.length === 0) {
    container.innerHTML = `
      <div class="gh-empty-card">
        <i class="fas fa-layer-group" style="font-size: 1.75rem; color: var(--text-muted); margin-bottom: 0.5rem;"></i>
        <p style="font-weight: 600; font-size: 0.875rem;">No Scenarios Saved for Active System</p>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.25rem;">
          Configure inputs above and click <strong>"Save Scenario"</strong> to compare multiple clinical or telemetry states side-by-side.
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="gh-scenarios-grid">
      ${scenarios
        .map(
          s => `
        <div class="gh-scenario-card">
          <div class="gh-scenario-card-header">
            <h4 class="gh-scenario-name">${s.name}</h4>
            <span class="gh-scenario-time">${s.timestamp}</span>
          </div>

          <div class="gh-scenario-score-box">
            <span class="gh-scenario-score-val">${s.resultScore}</span>
            <span class="gauge-status-badge ${s.statusClass}" style="font-size: 0.6875rem;">${s.resultLabel}</span>
          </div>

          <div class="gh-scenario-params-list">
            ${Object.entries(s.inputs)
              .map(
                ([k, v]) => `
              <div class="gh-scenario-param-row">
                <span>${k.replace('revive', '').replace('churn', '').replace('crop', '')}</span>
                <strong>${v}</strong>
              </div>
            `
              )
              .join('')}
          </div>

          <div class="gh-scenario-card-footer">
            <button class="gh-btn-micro gh-load-scenario-btn" data-id="${s.id}">
              <i class="fas fa-arrow-up-right-from-square"></i> Load Case
            </button>
            <button class="gh-btn-micro gh-delete-scenario-btn" data-id="${s.id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  `;

  // Attach handlers
  container.querySelectorAll('.gh-load-scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const found = scenarios.find(s => s.id === id);
      if (found) {
        onLoadScenario(found);
        labState.showToast(`Loaded scenario: ${found.name}`, 'info');
      }
    });
  });

  container.querySelectorAll('.gh-delete-scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id) {
        labState.deleteScenario(id);
        renderScenariosComparison(onLoadScenario);
        labState.showToast('Scenario deleted', 'info');
      }
    });
  });
}

export function runBatchAnalysisSuite(
  systemId: string,
  inferFn: (inputs: Record<string, any>) => { score: string; label: string; statusClass: string }
): { results: BatchRunResult[]; summary: { total: number; meanScore: number; highCount: number; lowCount: number; avgLatency: number } } {
  const suite = systemId === 'churn-tab' ? CHURN_BATCH_TEST_SUITE : REVIVE_BATCH_TEST_SUITE;

  const results: BatchRunResult[] = [];
  let totalScoreNum = 0;
  let highCount = 0;
  let lowCount = 0;
  let totalLatency = 0;

  suite.forEach(testCase => {
    const t0 = performance.now();
    const res = inferFn(testCase.inputs);
    const latency = performance.now() - t0;

    totalLatency += latency;
    const num = parseFloat(res.score.replace('%', '')) || 0;
    totalScoreNum += num;

    if (res.statusClass.includes('high')) highCount++;
    if (res.statusClass.includes('low')) lowCount++;

    results.push({
      testCase,
      score: res.score,
      label: res.label,
      statusClass: res.statusClass,
      latencyMs: latency
    });
  });

  const summary = {
    total: suite.length,
    meanScore: Math.round(totalScoreNum / suite.length),
    highCount,
    lowCount,
    avgLatency: Math.round((totalLatency / suite.length) * 100) / 100
  };

  labState.addLog('BATCH', `Executed ${systemId} 5-case test suite`, `Mean score: ${summary.meanScore}%, Avg latency: ${summary.avgLatency}ms`);

  return { results, summary };
}

export function renderBatchResultsTable(
  containerId: string,
  batchData: { results: BatchRunResult[]; summary: { total: number; meanScore: number; highCount: number; lowCount: number; avgLatency: number } }
) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { results, summary } = batchData;

  container.innerHTML = `
    <div class="gh-batch-summary-cards">
      <div class="gh-summary-card">
        <span class="gh-summary-val">${summary.total}</span>
        <span class="gh-summary-lbl">Total Profiles</span>
      </div>
      <div class="gh-summary-card">
        <span class="gh-summary-val" style="color: var(--accent-color);">${summary.meanScore}%</span>
        <span class="gh-summary-lbl">Mean Predicted Risk</span>
      </div>
      <div class="gh-summary-card">
        <span class="gh-summary-val" style="color: #dc2626;">${summary.highCount}</span>
        <span class="gh-summary-lbl">High Risk Flagged</span>
      </div>
      <div class="gh-summary-card">
        <span class="gh-summary-val" style="color: #059669;">${summary.lowCount}</span>
        <span class="gh-summary-lbl">Optimal / Low Risk</span>
      </div>
      <div class="gh-summary-card">
        <span class="gh-summary-val" style="font-family: var(--font-mono);">${summary.avgLatency} ms</span>
        <span class="gh-summary-lbl">Avg Batch Latency</span>
      </div>
    </div>

    <div class="sql-table-wrap" style="margin-top: 1rem;">
      <table class="sql-table">
        <thead>
          <tr>
            <th>Profile ID</th>
            <th>Cohort Profile</th>
            <th>Input Parameters</th>
            <th>Prediction Score</th>
            <th>Classification</th>
            <th>Latency</th>
          </tr>
        </thead>
        <tbody>
          ${results
            .map(
              r => `
            <tr>
              <td><code>${r.testCase.id}</code></td>
              <td><strong>${r.testCase.name}</strong></td>
              <td>
                <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono);">
                  ${Object.entries(r.testCase.inputs)
                    .map(([k, v]) => `${k.replace('revive', '').replace('churn', '')}:${v}`)
                    .join(' · ')}
                </span>
              </td>
              <td><strong style="color: var(--accent-color);">${r.score}</strong></td>
              <td><span class="gauge-status-badge ${r.statusClass}" style="font-size: 0.6875rem; padding: 2px 6px;">${r.label}</span></td>
              <td><span style="font-family: var(--font-mono); font-size: 0.75rem;">${r.latencyMs.toFixed(2)} ms</span></td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}
