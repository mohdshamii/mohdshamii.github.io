import { profileData } from '../data/profile.ts';

export function renderFooter(): string {
  const currentYear = new Date().getFullYear();
  return `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-copy">
          &copy; ${currentYear} ${profileData.name} · Data Science · Machine Learning · Analytics
        </div>

        <div class="footer-links">
          <a href="${profileData.socials.github}" target="_blank" rel="noopener noreferrer" class="footer-link">GitHub</a>
          <a href="${profileData.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="footer-link">LinkedIn</a>
          <a href="${profileData.socials.leetcode}" target="_blank" rel="noopener noreferrer" class="footer-link">LeetCode</a>
          <a href="/lab/index.html" class="footer-link" style="color: var(--accent-color); font-weight: 600;">Interactive AI Lab</a>
          <a href="#hero" class="footer-link"><i class="fas fa-arrow-up"></i> Top</a>
        </div>
      </div>
    </footer>
  `;
}
