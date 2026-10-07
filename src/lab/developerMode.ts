// ==========================================================================
// Super Intelligence Lab — Developer Mode & REST API Explorer
// Raw feature vectors, z-score normalization, simulated endpoint telemetry & cURL
// ==========================================================================

import { labState } from './state';

export interface DevPayloadContext {
  systemId: string;
  rawInputs: Record<string, any>;
  featureVector: number[];
  normalizedVector: number[];
  modelInfo: {
    name: string;
    algorithm: string;
    framework: string;
    accuracy: string;
  };
  predictionOutput: Record<string, any>;
  apiEndpoint: string;
  latencyMs: number;
}

export function renderDeveloperModeInspector(ctx: DevPayloadContext) {
  const container = document.getElementById('si-devmode-container');
  if (!container) return;

  const curlCommand = `curl -X POST "https://mohdshamii.github.io/api/v1/predict/${ctx.systemId}" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -d '${JSON.stringify(ctx.rawInputs)}'`;

  const simulatedResponse = {
    status: 200,
    timestamp: new Date().toISOString(),
    engine: 'SuperIntelligenceLab/2.4.0 (Client WebAssembly/JS)',
    system: ctx.systemId,
    execution_time_ms: parseFloat(ctx.latencyMs.toFixed(3)),
    inputs: ctx.rawInputs,
    feature_vector: ctx.featureVector,
    normalized_vector: ctx.normalizedVector,
    prediction: ctx.predictionOutput,
    model: ctx.modelInfo
  };

  container.innerHTML = `
    <div class="gh-dev-grid">
      <!-- Left: Feature Vectors & Tensors -->
      <div class="gh-dev-col">
        <div class="gh-dev-section-title">
          <i class="fas fa-microchip"></i> Raw Inputs & Tensor Vectors
        </div>

        <div class="gh-code-block-wrap">
          <div class="gh-code-header">
            <span>raw_inputs.json</span>
            <button class="gh-btn-micro gh-copy-snippet" data-copy='${JSON.stringify(ctx.rawInputs, null, 2)}'>
              <i class="fas fa-copy"></i> Copy
            </button>
          </div>
          <pre class="gh-code-pre">${JSON.stringify(ctx.rawInputs, null, 2)}</pre>
        </div>

        <div style="margin-top: 0.75rem;">
          <div class="gh-vector-row">
            <span class="gh-vector-lbl">Dense Feature Vector:</span>
            <code class="gh-vector-code">[${ctx.featureVector.join(', ')}]</code>
          </div>
          <div class="gh-vector-row" style="margin-top: 0.35rem;">
            <span class="gh-vector-lbl">Z-Score Normalized:</span>
            <code class="gh-vector-code">[${ctx.normalizedVector.map(v => v.toFixed(3)).join(', ')}]</code>
          </div>
        </div>
      </div>

      <!-- Right: REST API Response Simulation -->
      <div class="gh-dev-col">
        <div class="gh-dev-section-title">
          <i class="fas fa-network-wired"></i> REST API Telemetry (200 OK)
        </div>

        <div class="gh-code-block-wrap">
          <div class="gh-code-header">
            <span>HTTP/1.1 200 OK (${ctx.latencyMs.toFixed(2)}ms)</span>
            <button class="gh-btn-micro gh-copy-snippet" data-copy='${JSON.stringify(simulatedResponse, null, 2)}'>
              <i class="fas fa-copy"></i> Copy JSON
            </button>
          </div>
          <pre class="gh-code-pre">${JSON.stringify(simulatedResponse, null, 2)}</pre>
        </div>
      </div>
    </div>

    <!-- cURL Generator -->
    <div style="margin-top: 1rem;">
      <div class="gh-dev-section-title">
        <i class="fas fa-terminal"></i> Reproducible cURL Command
      </div>
      <div class="gh-code-block-wrap">
        <div class="gh-code-header">
          <span>bash</span>
          <button class="gh-btn-micro gh-copy-snippet" data-copy="${curlCommand.replace(/"/g, '&quot;')}">
            <i class="fas fa-copy"></i> Copy cURL
          </button>
        </div>
        <pre class="gh-code-pre"><code>${curlCommand}</code></pre>
      </div>
    </div>
  `;

  // Attach copy snippet buttons
  container.querySelectorAll('.gh-copy-snippet').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy') || '';
      navigator.clipboard.writeText(text).then(() => {
        labState.showToast('Copied to clipboard', 'success');
      });
    });
  });
}
