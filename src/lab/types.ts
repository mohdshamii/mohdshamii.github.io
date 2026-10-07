// ==========================================================================
// Super Intelligence Lab — TypeScript Definitions & Schemas
// GitHub-Inspired Enterprise AI/ML Laboratory
// ==========================================================================

export type LabTabId =
  | 'disease-tab'
  | 'spam-tab'
  | 'crop-tab'
  | 'neural-tab'
  | 'sentiment-tab'
  | 'vector-tab'
  | 'churn-tab'
  | 'sql-tab'
  | 'cororbit-tab'
  | 'dsaos-tab'
  | 'gateda-tab';

export interface ModelMetricComparison {
  modelName: string;
  systemName: string;
  algorithm: string;
  accuracy: string;
  precision: string;
  recall: string;
  f1Score: string;
  aucRoc: string;
  avgLatencyMs: number;
  dataset: string;
  recordsCount: string;
  status: 'Production' | 'Experimental' | 'Academic';
}

export interface ModelCard {
  systemId: LabTabId;
  title: string;
  badge: string;
  algorithm: string;
  version: string;
  dataset: string;
  records: string;
  features: string[];
  trainingApproach: string;
  validationStrategy: string;
  keyMetrics: Record<string, string>;
  limitations: string[];
  intendedUse: string;
  ethicalNotice: string;
}

export interface PredictionHistoryItem {
  id: string;
  timestamp: string;
  isoDate: string;
  systemId: LabTabId;
  systemName: string;
  inputs: Record<string, string | number>;
  resultScore: string;
  resultLabel: string;
  statusClass: 'status-low' | 'status-moderate' | 'status-high';
  confidencePct: number;
  inferenceTimeMs: number;
}

export interface ScenarioItem {
  id: string;
  name: string;
  systemId: LabTabId;
  timestamp: string;
  inputs: Record<string, string | number>;
  resultScore: string;
  resultLabel: string;
  statusClass: string;
}

export interface BatchTestCase {
  id: string;
  name: string;
  inputs: Record<string, number | string>;
  expectedClass?: string;
}

export interface BatchRunResult {
  testCase: BatchTestCase;
  score: string;
  label: string;
  statusClass: string;
  latencyMs: number;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  type: 'SYSTEM' | 'INFERENCE' | 'PRESET' | 'WHAT_IF' | 'SCENARIO' | 'BATCH' | 'EXPORT' | 'API';
  message: string;
  detail?: string;
  latencyMs?: number;
}

export interface FeatureValidationRule {
  key: string;
  label: string;
  min: number;
  max: number;
  unit: string;
  optimalRange: [number, number];
  warningHigh?: string;
  warningLow?: string;
}

export interface CounterfactualSnapshot {
  systemId: LabTabId;
  timestamp: string;
  inputs: Record<string, number | string>;
  score: number;
  label: string;
}
