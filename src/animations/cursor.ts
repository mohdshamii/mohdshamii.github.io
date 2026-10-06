/**
 * Custom Cursor disabled for clean, native GitHub UI experience.
 */
export function initCustomCursor(): void {
  // Clean up any lingering custom cursor containers
  const existing = document.getElementById('custom-cursor-container');
  if (existing) {
    existing.remove();
  }
}
