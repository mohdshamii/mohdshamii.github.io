// ==========================================================================
// Super Intelligence Lab — Export Center Engine
// Multi-format export: JSON file, Markdown clinical report, Print & Clipboard
// ==========================================================================

import { labState } from './state';

export interface ExportPayload {
  systemId: string;
  systemTitle: string;
  timestamp: string;
  inputs: Record<string, any>;
  prediction: {
    score: string;
    label: string;
    confidence: string;
  };
  metrics: Record<string, string>;
  disclaimer: string;
}

export function initExportModal(getCurrentPayload: () => ExportPayload) {
  let modal = document.getElementById('ghExportModal');
  if (!modal) {
    createExportModalDOM();
    modal = document.getElementById('ghExportModal');
  }

  const closeBtn = document.getElementById('ghExportClose');
  const copyJsonBtn = document.getElementById('ghCopyJsonBtn');
  const dlJsonBtn = document.getElementById('ghDlJsonBtn');
  const copyMdBtn = document.getElementById('ghCopyMdBtn');
  const printBtn = document.getElementById('ghPrintReportBtn');
  const previewBox = document.getElementById('ghExportPreview');

  function openModal() {
    if (!modal) return;
    const payload = getCurrentPayload();
    if (previewBox) {
      previewBox.textContent = JSON.stringify(payload, null, 2);
    }
    modal.classList.add('active');
  }

  function closeModal() {
    modal?.classList.remove('active');
  }

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  copyJsonBtn?.addEventListener('click', () => {
    const payload = getCurrentPayload();
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(() => {
      labState.showToast('Copied raw JSON payload to clipboard', 'success');
      labState.addLog('EXPORT', 'Copied prediction JSON payload');
    });
  });

  dlJsonBtn?.addEventListener('click', () => {
    const payload = getCurrentPayload();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `si_analysis_${payload.systemId}_${Date.now()}.json`);
    dlAnchor.click();
    dlAnchor.remove();
    labState.showToast('JSON file downloaded', 'success');
    labState.addLog('EXPORT', 'Downloaded JSON analysis file');
  });

  copyMdBtn?.addEventListener('click', () => {
    const p = getCurrentPayload();
    const md = `
# Super Intelligence Lab — Technical Evaluation Report
**System:** ${p.systemTitle}
**Execution Timestamp:** ${p.timestamp}
**Target Output:** ${p.prediction.score} (${p.prediction.label})
**Confidence Estimate:** ${p.prediction.confidence}

---

### Input Parameter Configuration:
${Object.entries(p.inputs)
  .map(([k, v]) => `- **${k}:** ${v}`)
  .join('\n')}

### Model Architecture & Telemetry:
${Object.entries(p.metrics)
  .map(([k, v]) => `- **${k}:** ${v}`)
  .join('\n')}

---
> **Notice:** ${p.disclaimer}
*Report generated via Super Intelligence Lab (Mohd Shami — AI/ML Engineer)*
`.trim();

    navigator.clipboard.writeText(md).then(() => {
      labState.showToast('Copied formatted Markdown report to clipboard', 'success');
      labState.addLog('EXPORT', 'Copied Markdown report');
    });
  });

  printBtn?.addEventListener('click', () => {
    window.print();
    labState.addLog('EXPORT', 'Triggered browser print dialog');
  });

  // Connect any trigger button
  document.querySelectorAll('[data-open-export]').forEach(btn => {
    btn.addEventListener('click', openModal);
  });
}

function createExportModalDOM() {
  const modal = document.createElement('div');
  modal.id = 'ghExportModal';
  modal.className = 'gh-modal-backdrop';
  modal.innerHTML = `
    <div class="gh-export-modal" role="dialog" aria-modal="true" aria-label="Export Center">
      <div class="gh-cmd-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <i class="fas fa-file-export" style="color: var(--accent-color);"></i>
          <h3 style="font-size: 1.05rem; font-weight: 700; margin: 0;">Export & Reporting Center</h3>
        </div>
        <button id="ghExportClose" class="gh-cmd-close-btn" aria-label="Close export modal">&times;</button>
      </div>

      <div class="gh-export-body">
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 1rem;">
          Export active model inference telemetry, parameters, and verification matrices into reproducible data formats.
        </p>

        <div class="gh-export-actions-grid">
          <button id="ghCopyJsonBtn" class="gh-btn gh-btn-primary">
            <i class="fas fa-copy"></i> Copy JSON Payload
          </button>
          <button id="ghDlJsonBtn" class="gh-btn">
            <i class="fas fa-download"></i> Download .JSON File
          </button>
          <button id="ghCopyMdBtn" class="gh-btn">
            <i class="fas fa-file-lines"></i> Copy Markdown Report
          </button>
          <button id="ghPrintReportBtn" class="gh-btn">
            <i class="fas fa-print"></i> Print Technical Report
          </button>
        </div>

        <div style="margin-top: 1.25rem;">
          <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.35rem;">
            Export Payload Preview:
          </div>
          <pre id="ghExportPreview" class="gh-code-preview"></pre>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}
