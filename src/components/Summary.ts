import { portfolioData } from '../data/portfolio.ts';

export function renderSummary(): string {
  const { identity, metrics } = portfolioData;

  return `
    <section id="summary" class="summary-section" aria-label="Professional Summary and Core Metrics">
      <div class="section-container">
        <!-- Transition Eyebrow -->
        <div class="section-header-pill">
          <span class="pill-dot"></span>
          <span>MISSION & ARCHITECTURE</span>
        </div>

        <!-- Cinematic Large Headline -->
        <div class="summary-headline-wrap">
          <h2 class="summary-headline-text">
            I BUILD END-TO-END<br/>
            <span class="headline-gradient">INTELLIGENT SYSTEMS.</span>
          </h2>
        </div>

        <!-- Professional Summary Body -->
        <div class="summary-content-grid">
          <div class="summary-text-col">
            <p class="summary-paragraph lead-p">
              ${identity.bio}
            </p>
            <p class="summary-paragraph">
              Delivered AI-powered applications achieving up to <strong>97.8% NLP accuracy</strong>,
              improved clinical diagnostic models by <strong>13 percentage points (AUC-ROC: 0.91)</strong>,
              and deployed real-time inference APIs wrapped in lightweight Docker containers.
            </p>
            <div class="summary-quote-card">
              <span class="quote-symbol">“</span>
              <p class="quote-text">${identity.philosophy}</p>
            </div>
          </div>

          <!-- Highlight Pill Badges -->
          <div class="summary-badges-col">
            <div class="summary-badge-item">
              <div class="badge-icon-wrap"><i class="fa-solid fa-clock-rotate-left"></i></div>
              <div class="badge-info">
                <span class="badge-title">1+ YEAR EXPERIENCE</span>
                <span class="badge-sub">Practical ML pipelines & model deployment</span>
              </div>
            </div>

            <div class="summary-badge-item">
              <div class="badge-icon-wrap"><i class="fa-solid fa-bullseye"></i></div>
              <div class="badge-info">
                <span class="badge-title">97.8% NLP ACCURACY</span>
                <span class="badge-sub">Imbalanced text classification with TF-IDF & SMOTE</span>
              </div>
            </div>

            <div class="summary-badge-item">
              <div class="badge-icon-wrap"><i class="fa-solid fa-chart-line"></i></div>
              <div class="badge-info">
                <span class="badge-title">0.91 AUC-ROC</span>
                <span class="badge-sub">High discrimination clinical diagnostic model</span>
              </div>
            </div>

            <div class="summary-badge-item">
              <div class="badge-icon-wrap"><i class="fa-solid fa-arrow-trend-up"></i></div>
              <div class="badge-info">
                <span class="badge-title">+13 POINT CLINICAL GAIN</span>
                <span class="badge-sub">Model accuracy elevated from 72% to 85%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 6: Large Interactive Metric Cards -->
        <div class="metrics-dashboard-wrap">
          <div class="metrics-grid">
            ${metrics
              .map(
                (m) => `
              <div class="metric-card" data-metric-card>
                <div class="metric-top-row">
                  <span class="metric-source-tag">${m.verifiedSource}</span>
                  <span class="metric-dot"></span>
                </div>
                <div class="metric-number-display">
                  <span class="counter-val" data-target="${m.value}">${m.value}</span><span class="metric-suffix">${m.suffix || ''}</span>
                </div>
                <div class="metric-label">${m.label}</div>
                <p class="metric-desc">${m.description}</p>
                <div class="metric-card-glow"></div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initSummaryEvents() {
  // Intersection Observer for animated counter values
  const metricCards = document.querySelectorAll('[data-metric-card]');
  if (!metricCards.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          card.classList.add('metric-visible');

          const counterEl = card.querySelector('.counter-val') as HTMLElement | null;
          if (counterEl && !counterEl.dataset.animated) {
            counterEl.dataset.animated = 'true';
            animateCounter(counterEl);
          }
          obs.unobserve(card);
        }
      });
    },
    { threshold: 0.2 }
  );

  metricCards.forEach((c) => observer.observe(c));
}

function animateCounter(el: HTMLElement) {
  const targetStr = el.dataset.target || '0';
  const isFloat = targetStr.includes('.');
  const targetNum = parseFloat(targetStr);
  if (isNaN(targetNum)) return;

  const duration = 1600;
  const startTime = performance.now();

  function updateCount(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth ease-out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const currentVal = targetNum * ease;

    if (isFloat) {
      el.textContent = currentVal.toFixed(1);
    } else {
      el.textContent = Math.floor(currentVal).toString();
    }

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = targetStr;
    }
  }

  requestAnimationFrame(updateCount);
}
