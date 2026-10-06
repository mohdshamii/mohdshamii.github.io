// Theme System: Modern Developer-Tool Dual-Mode (Light / Dark)
export type ThemeMode = 'light' | 'dark';

export function getTheme(): ThemeMode {
  const current = document.documentElement.getAttribute('data-theme');
  if (current === 'dark' || current === 'light') return current;
  try {
    const saved = localStorage.getItem('shami_theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch (e) {
    // fallback
  }
  return 'light';
}

export function setTheme(theme: ThemeMode): void {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
  try {
    localStorage.setItem('shami_theme', theme);
  } catch (e) {
    // ignore
  }

  // Update all toggle buttons in DOM
  updateToggleButtons(theme);

  // Dispatch event for components like WebGL ThreeCanvas to re-color
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

export function toggleTheme(): ThemeMode {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

export function updateToggleButtons(theme: ThemeMode): void {
  // Beautiful UI Segmented Controls & GitHub Theme Controls
  document.querySelectorAll('.bui-theme-pill-control, .gh-theme-control').forEach((pill) => {
    pill.setAttribute('data-theme-current', theme);
    const lightBtn = pill.querySelector('.theme-btn-light');
    const darkBtn = pill.querySelector('.theme-btn-dark');
    if (lightBtn && darkBtn) {
      if (theme === 'light') {
        lightBtn.classList.add('active');
        darkBtn.classList.remove('active');
      } else {
        lightBtn.classList.remove('active');
        darkBtn.classList.add('active');
      }
    }
  });

  // Legacy/Mobile fallback buttons
  document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
    btn.setAttribute('data-theme-current', theme);
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    const icon = btn.querySelector('.theme-toggle-icon');
    if (icon) {
      icon.innerHTML =
        theme === 'dark'
          ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
          : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
    const label = btn.querySelector('.theme-toggle-label');
    if (label) {
      label.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
    }
  });
}

export function initTheme(): void {
  const theme = getTheme();
  setTheme(theme);

  // Listen for keyboard shortcut 'd' or 'D' when not in inputs
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }
    if ((e.key === 'd' || e.key === 'D') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      toggleTheme();
    }
  });
}
