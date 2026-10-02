import { scrollToTarget } from '../animations/lenis.ts';

interface CommandItem {
  id: string;
  name: string;
  category: string;
  shortcut: string;
  action: () => void;
}

export function renderCommandPalette(): string {
  return `
    <div id="cmd-palette-modal" class="cmd-palette-backdrop" aria-hidden="true" style="display: none;">
      <div class="cmd-palette-window" role="dialog" aria-modal="true" aria-label="Command Palette">
        <div class="cmd-palette-search">
          <svg class="cmd-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            id="cmd-palette-input"
            type="text"
            placeholder="Search commands, sections, or assistant... (e.g. lab, assistant, projects)"
            autocomplete="off"
            spellcheck="false"
          />
          <kbd class="cmd-kbd-esc">ESC</kbd>
        </div>
        <div class="cmd-palette-list" id="cmd-palette-results">
          <!-- Populated dynamically -->
        </div>
        <div class="cmd-palette-footer">
          <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  `;
}

export function initCommandPalette() {
  const modal = document.getElementById('cmd-palette-modal');
  const input = document.getElementById('cmd-palette-input') as HTMLInputElement | null;
  const list = document.getElementById('cmd-palette-results');
  if (!modal || !input || !list) return;

  const commands: CommandItem[] = [
    {
      id: 'assistant',
      name: 'Launch Super Intelligence Assistant',
      category: 'AI Agent',
      shortcut: 'I',
      action: () => {
        const launcher = document.getElementById('si-assistant-launcher');
        launcher?.click();
      }
    },
    {
      id: 'lab',
      name: 'Open Super Intelligence Lab (/lab)',
      category: 'Lab',
      shortcut: 'X',
      action: () => {
        window.location.href = '/lab/index.html';
      }
    },
    {
      id: 'projects',
      name: 'Jump to Projects Showcase',
      category: 'Navigation',
      shortcut: 'P',
      action: () => scrollToTarget('#projects')
    },
    {
      id: 'experience',
      name: 'Jump to Experience & Internships',
      category: 'Navigation',
      shortcut: 'E',
      action: () => scrollToTarget('#experience')
    },
    {
      id: 'skills',
      name: 'Jump to Interactive Skills Ecosystem',
      category: 'Navigation',
      shortcut: 'S',
      action: () => scrollToTarget('#skills')
    },
    {
      id: 'pipeline',
      name: 'Jump to ML Pipeline (9 Stages)',
      category: 'Navigation',
      shortcut: 'M',
      action: () => scrollToTarget('#pipeline')
    },
    {
      id: 'about',
      name: 'Jump to Behind the Models (About)',
      category: 'Navigation',
      shortcut: 'A',
      action: () => scrollToTarget('#about')
    },
    {
      id: 'education',
      name: 'Jump to Education & TMU Cohort',
      category: 'Navigation',
      shortcut: 'D',
      action: () => scrollToTarget('#education')
    },
    {
      id: 'certifications',
      name: 'Jump to Verified Certifications',
      category: 'Navigation',
      shortcut: 'C',
      action: () => scrollToTarget('#certifications')
    },
    {
      id: 'achievements',
      name: 'Jump to Key Achievements & SIH',
      category: 'Navigation',
      shortcut: 'H',
      action: () => scrollToTarget('#achievements')
    },
    {
      id: 'dsa',
      name: 'Jump to 850+ DSA in Python',
      category: 'Navigation',
      shortcut: '8',
      action: () => scrollToTarget('#dsa')
    },
    {
      id: 'contact',
      name: 'Jump to Contact & Handshake Terminal',
      category: 'Navigation',
      shortcut: 'T',
      action: () => scrollToTarget('#contact')
    },
    {
      id: 'resume',
      name: 'Download Verified Resume PDF',
      category: 'Action',
      shortcut: 'R',
      action: () => {
        window.open('/resume.pdf', '_blank');
      }
    },
    {
      id: 'github',
      name: 'Open GitHub Profile (@mohdshamii)',
      category: 'External',
      shortcut: 'G',
      action: () => {
        window.open('https://github.com/mohdshamii', '_blank');
      }
    },
    {
      id: 'linkedin',
      name: 'Open LinkedIn Profile (/in/mohdshamii)',
      category: 'External',
      shortcut: 'L',
      action: () => {
        window.open('https://linkedin.com/in/mohdshamii', '_blank');
      }
    }
  ];

  let selectedIndex = 0;
  let filteredCommands: CommandItem[] = [...commands];

  function openPalette() {
    modal!.style.display = 'flex';
    modal!.setAttribute('aria-hidden', 'false');
    input!.value = '';
    filterCommands('');
    setTimeout(() => input!.focus(), 50);
  }

  function closePalette() {
    modal!.style.display = 'none';
    modal!.setAttribute('aria-hidden', 'true');
  }

  function renderList() {
    if (filteredCommands.length === 0) {
      list!.innerHTML = `
        <div class="cmd-no-results">
          <p>No matching commands found.</p>
          <span>Try searching for "lab", "assistant", "projects", or "resume"</span>
        </div>
      `;
      return;
    }

    list!.innerHTML = filteredCommands
      .map((cmd, idx) => `
        <div class="cmd-item ${idx === selectedIndex ? 'selected' : ''}" data-index="${idx}">
          <div class="cmd-item-left">
            <span class="cmd-badge">${cmd.category}</span>
            <span class="cmd-name">${cmd.name}</span>
          </div>
          <kbd class="cmd-shortcut">${cmd.shortcut}</kbd>
        </div>
      `)
      .join('');

    // Attach click events
    list!.querySelectorAll('.cmd-item').forEach((item) => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-index') || '0', 10);
        executeCommand(filteredCommands[idx]);
      });
    });
  }

  function filterCommands(query: string) {
    const q = query.trim().toLowerCase();
    if (!q) {
      filteredCommands = [...commands];
    } else {
      filteredCommands = commands.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    selectedIndex = 0;
    renderList();
  }

  function executeCommand(cmd: CommandItem) {
    closePalette();
    cmd.action();
  }

  // Keyboard events
  input.addEventListener('input', () => {
    filterCommands(input.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % filteredCommands.length;
      renderList();
      scrollSelectedIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
      renderList();
      scrollSelectedIntoView();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    }
  });

  function scrollSelectedIntoView() {
    const selected = list!.querySelector('.cmd-item.selected');
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' });
    }
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePalette();
  });

  // Global listener for Ctrl+K or Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.style.display === 'flex') {
        closePalette();
      } else {
        openPalette();
      }
    }
  });

  // Also bind to any trigger button in navbar or UI
  document.querySelectorAll('.cmd-palette-trigger').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPalette();
    });
  });
}
