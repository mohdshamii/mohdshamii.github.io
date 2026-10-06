import { portfolioData } from '../data/portfolio.ts';

export function renderDsaSection(): string {
  const { dsa } = portfolioData;

  return `
    <section id="dsa" class="dsa-section" aria-label="Data Structures & Algorithms Section">
      <div class="section-container">
        <!-- Section Header -->
        <div class="section-header-block">
          <div class="section-header-pill">
            <span class="pill-dot"></span>
            <span>ALGORITHMIC FOUNDATIONS</span>
          </div>
          <h2 class="section-main-heading">850+ Problems Solved in Python</h2>
          <p class="section-sub-heading">
            Algorithmic problem solving natively in Python. Designing high-throughput, memory-optimal logic from first principles.
          </p>
        </div>

        <!-- Featured Platforms Banner -->
        <div class="dsa-platforms-row">
          <div class="dsa-platform-card">
            <div class="platform-card-header">
              <span class="platform-icon">🐍</span>
              <div class="platform-meta">
                <span class="platform-title">CorOrbit / PyDSA</span>
                <span class="platform-badge">Python Mastery</span>
              </div>
            </div>
            <p class="platform-desc">
              Dedicated interactive platform to master Python algorithmic problem solving with 850+ curated problems and runtime profiling.
            </p>
            <div class="platform-links">
              <a href="https://mohdshamii.github.io/PyDSA" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-primary">
                <span>Launch CorOrbit ↗</span>
              </a>
              <a href="https://github.com/mohdshamii/PyDSA" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-secondary">
                <i class="fa-brands fa-github"></i>
                <span>Repository</span>
              </a>
            </div>
          </div>

          <div class="dsa-platform-card">
            <div class="platform-card-header">
              <span class="platform-icon">🎯</span>
              <div class="platform-meta">
                <span class="platform-title">DSAos</span>
                <span class="platform-badge">MNC Placements</span>
              </div>
            </div>
            <p class="platform-desc">
              Curated roadmap covering top 250 DSA problems for Google, Amazon, Microsoft and Tier-1 campus placement assessments.
            </p>
            <div class="platform-links">
              <a href="https://mohdshamii.github.io/DSAos" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-primary">
                <span>Launch DSAos ↗</span>
              </a>
              <a href="https://github.com/mohdshamii/DSAos" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-secondary">
                <i class="fa-brands fa-github"></i>
                <span>Repository</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Split Layout: Metric Breakdown & Code Terminal -->
        <div class="dsa-layout-grid">
          <!-- Left: Problem Statistics & Topic Pills -->
          <div class="dsa-metric-card">
            <div class="dsa-top-badge">
              <span class="code-symbol">def</span>
              <span>solve_problem(optimal=True):</span>
            </div>

            <div class="dsa-big-stat">
              <span class="stat-number">${dsa.count}</span>
              <span class="stat-lang">Python 3</span>
            </div>

            <p class="dsa-lead-text">
              850+ DSA problems solved in Python across LeetCode, HackerRank, and competitive programming archives.
              Covering trees, graphs, dynamic programming, backtracking, and asymptotic optimization.
            </p>

            <div class="dsa-topics-grid">
              ${dsa.domains
                .map(
                  (dom) => `
                <div class="dsa-topic-pill">
                  <span class="topic-dot">●</span>
                  <div class="topic-meta">
                    <span class="topic-name">${dom.name}</span>
                    <span class="topic-sub">${dom.problems}</span>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>

            <div class="dsa-action-row">
              <a href="${dsa.githubUrl}" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-secondary">
                <i class="fa-brands fa-github"></i>
                <span>GitHub Archive</span>
              </a>
              <a href="${dsa.leetcodeUrl}" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-secondary">
                <span>LeetCode Profile ↗</span>
              </a>
            </div>
          </div>

          <!-- Right: Clean Python Code Preview -->
          <div class="dsa-visual-card">
            <div class="code-terminal-header">
              <div class="term-dots">
                <span class="t-dot t-red"></span>
                <span class="t-dot t-yellow"></span>
                <span class="t-dot t-green"></span>
              </div>
              <span class="term-filename">algorithms/binary_tree_traversal.py</span>
            </div>

            <div class="code-terminal-content">
              <pre><code class="python-snippet"><span class="k-word">class</span> <span class="c-name">TreeNode</span>:
    <span class="k-word">def</span> <span class="f-name">__init__</span>(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

<span class="k-word">def</span> <span class="f-name">optimal_traversal</span>(root: TreeNode) -> list[int]:
    <span class="c-comment"># O(N) Time Complexity | O(H) Space Complexity</span>
    res = []
    stack = []
    curr = root
    <span class="k-word">while</span> curr <span class="k-word">or</span> stack:
        <span class="k-word">while</span> curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        res.append(curr.val)
        curr = curr.right
    <span class="k-word">return</span> res</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
