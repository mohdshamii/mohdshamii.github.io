import { profileData } from '../data/profile.ts';

export function renderAbout(): string {
  return `
    <section class="section" id="about">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Profile Overview</span>
          <h2 class="section-title">About Me</h2>
          <p class="section-subtitle">
            AI/ML Engineer with 1+ year of experience building end-to-end Machine Learning systems, NLP, Computer Vision, and production REST APIs.
          </p>
        </div>

        <div class="about-grid">
          <div class="about-text">
            ${profileData.summary.map(paragraph => `<p>${paragraph}</p>`).join('')}
            <p>
              My technical work prioritizes measurable production outcomes: improving clinical diagnostic models by 13 percentage points from 72% to 85% (AUC-ROC: 0.91) using XGBoost and Bayesian optimization, engineering automated Python ETL pipelines that reduce preprocessing latency by 50%, and building NLP pipelines achieving 97.8% accuracy with SMOTE on imbalanced text collections.
            </p>
          </div>

          <div class="about-highlights-card">
            <div class="highlight-row">
              <span class="highlight-label">Degree</span>
              <span class="highlight-val">B.Tech in Data Science (2027)</span>
            </div>
            <div class="highlight-row">
              <span class="highlight-label">Institution</span>
              <span class="highlight-val">Teerthanker Mahaveer University</span>
            </div>
            <div class="highlight-row">
              <span class="highlight-label">Academic Rank</span>
              <span class="highlight-val">1st Rank in Cohort (CGPA: 8.5 / 10)</span>
            </div>
            <div class="highlight-row">
              <span class="highlight-label">Target Roles</span>
              <span class="highlight-val">AI/ML Engineer · ML Engineer · AI Fresher</span>
            </div>
            <div class="highlight-row">
              <span class="highlight-label">Core Stack</span>
              <span class="highlight-val">XGBoost, Scikit-learn, CNN, NLP, Flask, Docker</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
