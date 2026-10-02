export function renderLoader(): string {
  return `
    <div id="ai-loader" class="ai-loader-overlay">
      <div class="loader-content">
        <div class="loader-terminal-badge">
          <span class="pulse-dot"></span>
          <span>KERNEL // BOOT_SEQUENCE</span>
        </div>
        <div class="loader-title-wrapper">
          <h1 class="loader-name">MOHD SHAMI</h1>
          <p class="loader-sub">AI / ML ENGINEER</p>
        </div>
        <div class="loader-progress-track">
          <div class="loader-progress-bar" id="loader-progress-bar"></div>
        </div>
        <div class="loader-status-text" id="loader-status-text">INITIALIZING AI SYSTEM...</div>
        <button id="loader-skip-btn" class="loader-skip-btn" type="button">
          SKIP INTRO [ESC]
        </button>
      </div>
    </div>
  `;
}

export function initLoader(onComplete?: () => void) {
  const loader = document.getElementById('ai-loader');
  const progressBar = document.getElementById('loader-progress-bar');
  const statusText = document.getElementById('loader-status-text');
  const skipBtn = document.getElementById('loader-skip-btn');

  if (!loader) {
    if (onComplete) onComplete();
    return;
  }

  const loaderEl: HTMLElement = loader;
  let isDismissed = false;

  function dismiss() {
    if (isDismissed) return;
    isDismissed = true;
    loaderEl.classList.add('loader-fade-out');
    setTimeout(() => {
      loaderEl.remove();
      if (onComplete) onComplete();
    }, 450);
  }

  // Keyboard shortcut ESC to skip immediately
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dismiss();
  });

  if (skipBtn) {
    skipBtn.addEventListener('click', dismiss);
  }

  // Sequence: 0 -> 45% (350ms) -> 85% (850ms) -> 100% (1300ms)
  setTimeout(() => {
    if (progressBar) progressBar.style.width = '45%';
    if (statusText) statusText.textContent = 'CALIBRATING NEURAL WEIGHTS...';
  }, 350);

  setTimeout(() => {
    if (progressBar) progressBar.style.width = '85%';
    if (statusText) statusText.textContent = 'LOADING ML PIPELINES & TELEMETRY...';
  }, 850);

  setTimeout(() => {
    if (progressBar) progressBar.style.width = '100%';
    if (statusText) {
      statusText.textContent = 'SYSTEM READY // WELCOME';
      statusText.classList.add('ready-state');
    }
  }, 1300);

  setTimeout(() => {
    dismiss();
  }, 1650);
}
