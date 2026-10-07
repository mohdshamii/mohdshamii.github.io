// ==========================================================================
// Super Intelligence Lab — State Management & Activity Bus
// Central reactive state store for telemetry, history, scenarios & dev mode
// ==========================================================================

import { LabTabId, PredictionHistoryItem, ScenarioItem, ActivityLogItem, CounterfactualSnapshot } from './types';

const HISTORY_STORAGE_KEY = 'shami_si_prediction_history';
const DEV_MODE_STORAGE_KEY = 'shami_si_dev_mode';
const SCENARIOS_STORAGE_KEY = 'shami_si_saved_scenarios';

class LabStateManager {
  public activeTab: LabTabId = 'disease-tab';
  public isDevMode: boolean = false;
  public isOffline: boolean = !navigator.onLine;
  public whatIfBaseline: CounterfactualSnapshot | null = null;
  public activityLogs: ActivityLogItem[] = [];
  public predictionHistory: PredictionHistoryItem[] = [];
  public savedScenarios: ScenarioItem[] = [];
  public lastInferenceLatencyMs: number = 0.32;
  public totalInferencesRun: number = 0;

  private listeners: Set<() => void> = new Set();

  constructor() {
    this.initFromStorage();
    this.initNetworkListeners();
    this.addLog('SYSTEM', 'Super Intelligence Lab initialized', 'Client WebAssembly/JS engine loaded');
  }

  private initFromStorage(): void {
    try {
      const storedDev = localStorage.getItem(DEV_MODE_STORAGE_KEY);
      this.isDevMode = storedDev === 'true';

      const storedHist = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHist) {
        this.predictionHistory = JSON.parse(storedHist);
      }

      const storedScen = localStorage.getItem(SCENARIOS_STORAGE_KEY);
      if (storedScen) {
        this.savedScenarios = JSON.parse(storedScen);
      }
    } catch (e) {
      console.warn('Storage init fallback:', e);
    }
  }

  private initNetworkListeners(): void {
    window.addEventListener('online', () => {
      this.isOffline = false;
      this.addLog('SYSTEM', 'Network Online', 'Connected to remote network');
      this.notify();
    });

    window.addEventListener('offline', () => {
      this.isOffline = true;
      this.addLog('SYSTEM', 'Network Offline', 'Local zero-latency execution mode active');
      this.notify();
    });
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public notify(): void {
    this.listeners.forEach(cb => cb());
  }

  public setTab(tabId: LabTabId): void {
    if (this.activeTab !== tabId) {
      this.activeTab = tabId;
      this.addLog('SYSTEM', `Switched active system to ${tabId}`);
      this.notify();
    }
  }

  public toggleDevMode(): boolean {
    this.isDevMode = !this.isDevMode;
    try {
      localStorage.setItem(DEV_MODE_STORAGE_KEY, String(this.isDevMode));
    } catch {}
    this.addLog('SYSTEM', `Developer Mode ${this.isDevMode ? 'Enabled' : 'Disabled'}`);
    this.notify();
    return this.isDevMode;
  }

  public setWhatIfBaseline(snapshot: CounterfactualSnapshot): void {
    this.whatIfBaseline = snapshot;
    this.addLog('WHAT_IF', `Baseline snapshot captured for ${snapshot.systemId}`, `Baseline score: ${snapshot.score}%`);
    this.notify();
  }

  public clearWhatIfBaseline(): void {
    this.whatIfBaseline = null;
    this.addLog('WHAT_IF', 'Baseline snapshot reset');
    this.notify();
  }

  public recordPrediction(item: Omit<PredictionHistoryItem, 'id' | 'timestamp' | 'isoDate'>): PredictionHistoryItem {
    const fullItem: PredictionHistoryItem = {
      ...item,
      id: 'pred-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      isoDate: new Date().toISOString()
    };

    this.predictionHistory.unshift(fullItem);
    if (this.predictionHistory.length > 50) {
      this.predictionHistory.pop();
    }

    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(this.predictionHistory));
    } catch {}

    this.lastInferenceLatencyMs = item.inferenceTimeMs;
    this.totalInferencesRun++;

    this.addLog(
      'INFERENCE',
      `${item.systemName}: Result ${item.resultScore} (${item.resultLabel})`,
      `Inference Latency: ${item.inferenceTimeMs.toFixed(2)}ms`,
      item.inferenceTimeMs
    );

    this.notify();
    return fullItem;
  }

  public deleteHistoryItem(id: string): void {
    this.predictionHistory = this.predictionHistory.filter(h => h.id !== id);
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(this.predictionHistory));
    } catch {}
    this.notify();
  }

  public clearAllHistory(): void {
    this.predictionHistory = [];
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {}
    this.addLog('SYSTEM', 'Prediction history cleared');
    this.notify();
  }

  public saveScenario(scenario: Omit<ScenarioItem, 'id' | 'timestamp'>): ScenarioItem {
    const item: ScenarioItem = {
      ...scenario,
      id: 'scen-' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.savedScenarios.unshift(item);
    if (this.savedScenarios.length > 8) {
      this.savedScenarios.pop();
    }

    try {
      localStorage.setItem(SCENARIOS_STORAGE_KEY, JSON.stringify(this.savedScenarios));
    } catch {}

    this.addLog('SCENARIO', `Scenario "${item.name}" saved`, `Result: ${item.resultScore}`);
    this.notify();
    return item;
  }

  public deleteScenario(id: string): void {
    this.savedScenarios = this.savedScenarios.filter(s => s.id !== id);
    try {
      localStorage.setItem(SCENARIOS_STORAGE_KEY, JSON.stringify(this.savedScenarios));
    } catch {}
    this.notify();
  }

  public addLog(type: ActivityLogItem['type'], message: string, detail?: string, latencyMs?: number): void {
    const item: ActivityLogItem = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type,
      message,
      detail,
      latencyMs
    };

    this.activityLogs.unshift(item);
    if (this.activityLogs.length > 80) {
      this.activityLogs.pop();
    }
  }

  public showToast(message: string, type: 'info' | 'success' | 'warning' = 'info'): void {
    let container = document.getElementById('ghToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'ghToastContainer';
      container.className = 'gh-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `gh-toast gh-toast-${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-triangle-exclamation' : 'fa-info-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('gh-toast-fade');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

export const labState = new LabStateManager();
