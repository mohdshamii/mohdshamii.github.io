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
          <h2 class="section-main-heading">850+ PROBLEMS. ONE LANGUAGE.</h2>
          <p class="section-sub-heading">
            Deep algorithmic problem solving natively in Python. Designing high-throughput, memory-optimal logic from first principles.
          </p>
        </div>

        <!-- Dominant Split Layout: Metric Visual & Algorithm Graphic -->
        <div class="dsa-layout-grid">
          <!-- Left: Big Number & Narrative -->
          <div class="dsa-metric-card">
            <div class="dsa-card-glow"></div>
            <div class="dsa-top-badge">
              <span class="code-symbol">def</span>
              <span>solve_problem(optimal=True):</span>
            </div>

            <div class="dsa-big-stat">
              <span class="stat-number">${dsa.count}</span>
              <span class="stat-lang">PYTHON</span>
            </div>

            <p class="dsa-lead-text">
              850+ DSA problems solved in Python across LeetCode and HackerRank.
              Spanning trees, graphs, dynamic programming, backtracking, and mathematical optimization.
            </p>

            <div class="dsa-topics-grid">
              ${dsa.domains
                .map(
                  (dom) => `
                <div class="dsa-topic-pill">
                  <span class="topic-dot">◈</span>
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
              <a href="${dsa.githubUrl}" target="_blank" rel="noopener noreferrer" class="hero-btn hero-btn-primary" data-cursor="open">
                <i class="fa-brands fa-github"></i>
                <span>EXPLORE PyDSA REPOSITORY</span>
              </a>
              <a href="${dsa.leetcodeUrl}" target="_blank" rel="noopener noreferrer" class="hero-btn hero-btn-ghost" data-cursor="open">
                <span>LEETCODE PROFILE</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Right: Animated Algorithmic Binary Tree & Complexity Simulation -->
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

            <!-- Interactive SVG Visual of Animated Tree Nodes -->
            <div class="dsa-tree-svg-wrap">
              <svg class="dsa-tree-svg" viewBox="0 0 400 160">
                <!-- Branches -->
                <line x1="200" y1="30" x2="120" y2="75" stroke="rgba(139, 92, 246, 0.4)" stroke-width="2"/>
                <line x1="200" y1="30" x2="280" y2="75" stroke="rgba(6, 182, 212, 0.4)" stroke-width="2"/>
                <line x1="120" y1="75" x2="70" y2="125" stroke="rgba(139, 92, 246, 0.4)" stroke-width="2"/>
                <line x1="120" y1="75" x2="160" y2="125" stroke="rgba(139, 92, 246, 0.4)" stroke-width="2"/>
                <line x1="280" y1="75" x2="240" y2="125" stroke="rgba(6, 182, 212, 0.4)" stroke-width="2"/>
                <line x1="280" y1="75" x2="330" y2="125" stroke="rgba(6, 182, 212, 0.4)" stroke-width="2"/>

                <!-- Nodes -->
                <!-- Root -->
                <circle cx="200" cy="30" r="14" fill="#131b2e" stroke="#8b5cf6" stroke-width="2" class="tree-pulse"/>
                <text x="200" y="34" font-size="10" fill="#fff" text-anchor="middle" font-family="monospace">root</text>

                <!-- Level 1 -->
                <circle cx="120" cy="75" r="12" fill="#131b2e" stroke="#8b5cf6" stroke-width="1.8"/>
                <text x="120" y="79" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">L1</text>

                <circle cx="280" cy="75" r="12" fill="#131b2e" stroke="#06b6d4" stroke-width="1.8"/>
                <text x="280" y="79" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="monospace">R1</text>

                <!-- Level 2 -->
                <circle cx="70" cy="125" r="10" fill="#131b2e" stroke="#8b5cf6" stroke-width="1.5"/>
                <circle cx="160" cy="125" r="10" fill="#131b2e" stroke="#8b5cf6" stroke-width="1.5"/>
                <circle cx="240" cy="125" r="10" fill="#131b2e" stroke="#06b6d4" stroke-width="1.5"/>
                <circle cx="330" cy="125" r="10" fill="#131b2e" stroke="#06b6d4" stroke-width="1.5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
