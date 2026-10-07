// ==========================================================================
// Super Intelligence Lab — Data Inspector & Smart Validation Engine
// Schema validation, boundary checks, outlier warnings & anomaly detection
// ==========================================================================

import { FeatureValidationRule } from './types';
import { REVIVE_VALIDATION_RULES } from './modelsData';

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  feature: string;
  message: string;
  recommendation: string;
}

export function validateReviveFeatures(
  age: number,
  bmi: number,
  bp: number,
  glucose: number
): { issues: ValidationIssue[]; rows: any[] } {
  const issues: ValidationIssue[] = [];
  const rows: any[] = [];

  const values: Record<string, number> = {
    reviveAge: age,
    reviveBmi: bmi,
    reviveBp: bp,
    reviveGlucose: glucose
  };

  REVIVE_VALIDATION_RULES.forEach(rule => {
    const val = values[rule.key];
    const isOutOfRange = val < rule.min || val > rule.max;
    const isElevated = val > rule.optimalRange[1];
    const isBelowOptimal = val < rule.optimalRange[0];

    let status = 'Optimal Range';
    let statusBadge = 'status-low';

    if (isOutOfRange) {
      status = 'Out of Range';
      statusBadge = 'status-high';
      issues.push({
        type: 'error',
        feature: rule.label,
        message: `Value ${val} ${rule.unit} falls outside physical test domain [${rule.min} - ${rule.max}].`,
        recommendation: `Adjust slider within valid benchmark limits (${rule.min} to ${rule.max} ${rule.unit}).`
      });
    } else if (isElevated) {
      status = 'Elevated Threshold';
      statusBadge = val > rule.optimalRange[1] * 1.25 ? 'status-high' : 'status-moderate';
      if (rule.warningHigh) {
        issues.push({
          type: 'warning',
          feature: rule.label,
          message: rule.warningHigh,
          recommendation: `Optimal target threshold is ${rule.optimalRange[0]}–${rule.optimalRange[1]} ${rule.unit}.`
        });
      }
    } else if (isBelowOptimal) {
      status = 'Sub-Optimal Low';
      statusBadge = 'status-moderate';
      if (rule.warningLow) {
        issues.push({
          type: 'info',
          feature: rule.label,
          message: rule.warningLow,
          recommendation: `Reference bounds: ${rule.optimalRange[0]}–${rule.optimalRange[1]} ${rule.unit}.`
        });
      }
    }

    rows.push({
      rule,
      currentValue: val,
      status,
      statusBadge
    });
  });

  // Suspicious multi-factor combinations
  if (bp > 160 && age < 25) {
    issues.push({
      type: 'warning',
      feature: 'Age + BP Correlation',
      message: 'Severe hypertension (BP > 160 mmHg) in young cohort (Age < 25) is an atypical outlier.',
      recommendation: 'Verify if secondary hypertension etiology or sensor artifact is present.'
    });
  }

  if (glucose > 180 && bmi < 18) {
    issues.push({
      type: 'warning',
      feature: 'Glucose + BMI Divergence',
      message: 'Marked hyperglycemia (> 180 mg/dL) paired with underweight BMI (< 18 kg/m²) indicates metabolic divergence.',
      recommendation: 'Evaluate possible Type 1 or secondary metabolic indicators rather than typical metabolic syndrome.'
    });
  }

  return { issues, rows };
}

export function renderDataInspectorTable(
  containerId: string,
  validationResult: { issues: ValidationIssue[]; rows: any[] }
) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { issues, rows } = validationResult;

  container.innerHTML = `
    <!-- Issues & Recommendations Banner -->
    <div style="margin-bottom: 1rem;">
      ${
        issues.length === 0
          ? `
        <div class="gh-alert gh-alert-success">
          <i class="fas fa-check-circle"></i>
          <div>
            <strong>All Inputs Validated:</strong> 100% of biomarkers conform to clinical benchmark boundaries with zero missing values or anomalous combinations.
          </div>
        </div>
      `
          : issues
              .map(
                iss => `
        <div class="gh-alert ${iss.type === 'error' ? 'gh-alert-danger' : iss.type === 'warning' ? 'gh-alert-warning' : 'gh-alert-info'}" style="margin-bottom: 0.5rem;">
          <i class="fas ${iss.type === 'error' ? 'fa-circle-xmark' : iss.type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info'}"></i>
          <div>
            <strong>${iss.feature} (${iss.type.toUpperCase()}):</strong> ${iss.message}
            <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.2rem;">
              <strong>Remediation:</strong> ${iss.recommendation}
            </div>
          </div>
        </div>
      `
              )
              .join('')
      }
    </div>

    <!-- Data Inspector Schema Table -->
    <div class="sql-table-wrap">
      <table class="sql-table">
        <thead>
          <tr>
            <th>Feature Name</th>
            <th>Current Input</th>
            <th>Valid Domain</th>
            <th>Optimal Baseline</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              r => `
            <tr>
              <td><strong>${r.rule.label}</strong></td>
              <td><code>${r.currentValue} ${r.rule.unit}</code></td>
              <td>${r.rule.min} – ${r.rule.max} ${r.rule.unit}</td>
              <td>${r.rule.optimalRange[0]} – ${r.rule.optimalRange[1]} ${r.rule.unit}</td>
              <td><span class="gauge-status-badge ${r.statusBadge}" style="font-size: 0.7rem; padding: 2px 6px;">${r.status}</span></td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}
