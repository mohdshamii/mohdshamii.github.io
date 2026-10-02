import './styles/cinematic.css';

// Core Animations & Creative-Dev Systems
import { initLenis } from './animations/lenis.ts';
import { initCustomCursor } from './animations/cursor.ts';

// Components
import { renderLoader, initLoader } from './components/Loader.ts';
import { renderNavbar, initNavbarEvents } from './components/Navbar.ts';
import { renderHero, initHeroEvents } from './components/Hero.ts';
import { renderSummary, initSummaryEvents } from './components/Summary.ts';
import { renderAbout } from './components/About.ts';
import { renderSkills, initSkillsEvents } from './components/Skills.ts';
import { renderExperience } from './components/Experience.ts';
import { renderProjects, initProjectEvents } from './components/Projects.ts';
import { renderMlPipeline, initMlPipelineEvents } from './components/MlPipeline.ts';
import { renderEducation } from './components/Education.ts';
import { renderCertifications } from './components/Certifications.ts';
import { renderAchievements } from './components/Achievements.ts';
import { renderDsaSection } from './components/DsaSection.ts';
import { renderContact, initContactEvents } from './components/Contact.ts';
import { renderFooter } from './components/Footer.ts';
import { renderCommandPalette, initCommandPalette } from './components/CommandPalette.ts';

function bootstrapApplication() {
  const app = document.getElementById('app');
  if (!app) return;

  // Render DOM tree
  app.innerHTML = `
    ${renderLoader()}
    ${renderNavbar()}
    <main id="main-content">
      ${renderHero()}
      ${renderSummary()}
      ${renderAbout()}
      ${renderSkills()}
      ${renderExperience()}
      ${renderProjects()}
      ${renderMlPipeline()}
      ${renderEducation()}
      ${renderCertifications()}
      ${renderAchievements()}
      ${renderDsaSection()}
      ${renderContact()}
    </main>
    ${renderFooter()}
    ${renderCommandPalette()}
  `;

  // Initialize interactive systems
  initNavbarEvents();
  initHeroEvents();
  initSummaryEvents();
  initSkillsEvents();
  initProjectEvents();
  initMlPipelineEvents();
  initContactEvents();
  initCommandPalette();
  initCustomCursor();

  // Initialize Lenis smooth inertia scroll
  initLenis();

  // Boot sequence loader
  initLoader(() => {
    // When loader finishes, ensure hero interactions are responsive
    window.dispatchEvent(new Event('resize'));
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApplication);
} else {
  bootstrapApplication();
}
