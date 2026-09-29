import './styles/main.css';
import { renderNavbar, initNavbarEvents } from './components/Navbar.ts';
import { renderHero } from './components/Hero.ts';
import { renderAbout } from './components/About.ts';
import { renderExperience } from './components/Experience.ts';
import { renderProjects } from './components/Projects.ts';
import { renderSkills } from './components/Skills.ts';
import { renderEducation } from './components/Education.ts';
import { renderCertifications } from './components/Certifications.ts';
import { renderAchievements } from './components/Achievements.ts';
import { renderContact } from './components/Contact.ts';
import { renderFooter } from './components/Footer.ts';
import { renderRecruiterAssistant, initRecruiterAssistant } from './components/RecruiterAssistant.ts';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderNavbar()}
    <main>
      ${renderHero()}
      ${renderAbout()}
      ${renderExperience()}
      ${renderProjects()}
      ${renderSkills()}
      ${renderEducation()}
      ${renderCertifications()}
      ${renderAchievements()}
      ${renderContact()}
    </main>
    ${renderFooter()}
    ${renderRecruiterAssistant()}
  `;

  // Initialize interactive event handlers
  initNavbarEvents();
  initRecruiterAssistant();

  // Scrollspy for active nav link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = (section as HTMLElement).offsetTop;
      const height = (section as HTMLElement).offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
