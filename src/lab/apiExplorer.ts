// ==========================================================================
// Super Intelligence Lab — API Explorer Engine & Public APIs Integration
// Zero secret exposure, offline resilience, and public-apis repository link
// ==========================================================================

import { labState } from './state';

export interface ApiEndpointSpec {
  name: string;
  category: string;
  method: 'GET' | 'POST';
  endpoint: string;
  description: string;
  samplePayload?: Record<string, any>;
  sampleResponse: Record<string, any>;
  isPublicApi?: boolean;
  publicRepoLink?: string;
}

export const API_CATALOG: ApiEndpointSpec[] = [
  {
    name: 'Revive Clinical Diagnostics API',
    category: 'Healthcare & Predictive ML',
    method: 'POST',
    endpoint: '/api/v1/predict/revive',
    description: 'Infers cardiovascular clinical risk given physiological biomarkers.',
    samplePayload: {
      age: 28,
      bmi: 24.5,
      bp: 120,
      glucose: 95
    },
    sampleResponse: {
      status: 'success',
      risk_score_pct: 18,
      classification: 'Low Clinical Risk',
      model: 'XGBoost v1.7.6',
      auc_roc: 0.91,
      latency_ms: 0.32
    }
  },
  {
    name: 'HamOrSpam NLP Classification API',
    category: 'Natural Language Processing',
    method: 'POST',
    endpoint: '/api/v1/predict/spam',
    description: 'Classifies communication text as Ham or Phishing/Spam via TF-IDF n-grams.',
    samplePayload: {
      text: 'Please review the updated Python ETL pipeline script before morning standup.'
    },
    sampleResponse: {
      status: 'success',
      spam_probability_pct: 4,
      classification: 'HAM (CLEAN)',
      extracted_tokens: ['review', 'pipeline', 'meeting'],
      accuracy: 0.978
    }
  },
  {
    name: 'FarmAIQ Soil & Crop Advisor API',
    category: 'Agricultural Intelligence',
    method: 'POST',
    endpoint: '/api/v1/recommend/crop',
    description: 'Recommends optimal crop cultivars based on soil NPK chemistry and rainfall.',
    samplePayload: {
      nitrogen: 90,
      phosphorus: 42,
      potassium: 43,
      rainfall: 200
    },
    sampleResponse: {
      status: 'success',
      recommended_crop: 'Rice (Oryza sativa)',
      suitability_match_pct: 96,
      model: 'Random Forest Ensemble'
    }
  },
  {
    name: 'ChurnShield Retention Telemetry API',
    category: 'Customer Success & Analytics',
    method: 'POST',
    endpoint: '/api/v1/predict/churn',
    description: 'Scores customer attrition hazard from contract duration and billing parameters.',
    samplePayload: {
      tenure_months: 12,
      monthly_charges: 75,
      contract: 'monthly',
      support_tickets: 1
    },
    sampleResponse: {
      status: 'success',
      churn_risk_pct: 42,
      classification: 'Moderate Churn Risk',
      recommended_action: 'Offer annual commitment incentive'
    }
  },
  {
    name: 'Public APIs Reference Directory',
    category: 'Open Source Ecosystem',
    method: 'GET',
    endpoint: 'https://github.com/mohdshamii/public-apis',
    description: 'Curated directory of free, developer-friendly public APIs for machine learning and web apps.',
    sampleResponse: {
      repository: 'mohdshamii/public-apis',
      categories: ['Machine Learning', 'Data Science', 'Development', 'Weather', 'Science'],
      auth: 'No Key / Free Tier',
      status: 'Active'
    },
    isPublicApi: true,
    publicRepoLink: 'https://github.com/mohdshamii/public-apis'
  }
];

export function renderApiExplorer(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="gh-api-explorer-header">
      <div>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin: 0;">
          Inspect simulated and open REST endpoints. Zero API keys or private tokens required.
        </p>
      </div>
      <a href="https://github.com/mohdshamii/public-apis" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-sm" style="flex-shrink: 0;">
        <i class="fab fa-github"></i> View Public APIs Collection ↗
      </a>
    </div>

    <div class="gh-api-list">
      ${API_CATALOG.map(
        (api, idx) => `
        <div class="gh-api-card">
          <div class="gh-api-card-top">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span class="gh-method-badge ${api.method.toLowerCase()}">${api.method}</span>
              <code class="gh-endpoint-code">${api.endpoint}</code>
              <span class="gh-badge">${api.category}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="gauge-status-badge status-low" style="font-size: 0.6875rem; padding: 2px 6px;">200 OK</span>
              <span style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--text-muted);">< 1 ms</span>
            </div>
          </div>

          <p style="font-size: 0.8125rem; color: var(--text-secondary); margin: 0.5rem 0;">
            ${api.description}
          </p>

          ${
            api.samplePayload
              ? `
            <div style="margin-top: 0.5rem;">
              <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.25rem;">Sample JSON Payload:</div>
              <pre class="gh-code-pre"><code>${JSON.stringify(api.samplePayload, null, 2)}</code></pre>
            </div>
          `
              : ''
          }

          <div style="margin-top: 0.5rem;">
            <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.25rem;">Response Schema:</div>
            <pre class="gh-code-pre"><code>${JSON.stringify(api.sampleResponse, null, 2)}</code></pre>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 0.5rem;">
            ${
              api.publicRepoLink
                ? `<a href="${api.publicRepoLink}" target="_blank" rel="noopener noreferrer" class="gh-btn-micro">
                    <i class="fas fa-external-link-alt"></i> Open Repository
                   </a>`
                : `<button class="gh-btn-micro gh-test-endpoint-btn" data-name="${api.name}">
                    <i class="fas fa-play"></i> Simulate Execution
                   </button>`
            }
          </div>
        </div>
      `
      ).join('')}
    </div>
  `;

  container.querySelectorAll('.gh-test-endpoint-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      labState.showToast(`Simulated request to ${name}: 200 OK (0.28ms)`, 'success');
      labState.addLog('API', `Simulated execution of ${name}`, 'HTTP/1.1 200 OK (0.28ms)', 0.28);
    });
  });
}
