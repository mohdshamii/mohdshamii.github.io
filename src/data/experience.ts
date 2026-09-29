export interface WorkExperience {
  role: string;
  company: string;
  location: string;
  type: string;
  period: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  technologies: string[];
}

export const experiences: WorkExperience[] = [
  {
    role: 'Data Science Intern',
    company: 'Codec Technologies India',
    location: 'Remote / Hybrid, India',
    type: 'Internship',
    period: 'Aug 2025 — Oct 2025',
    startDate: '2025-08',
    endDate: '2025-10',
    highlights: [
      'Engineered an XGBoost AI diagnostic model on a clinical dataset (5,000+ records); applied advanced feature engineering, SMOTE class balancing, and Bayesian hyperparameter tuning to improve classification accuracy from 72% to 85% and reduce the false-negative rate by 18%.',
      'Built end-to-end Scikit-learn ML Pipelines integrating data preprocessing, feature scaling, SMOTE oversampling, model training, and cross-validated evaluation into a single reproducible, production-grade workflow.',
      'Evaluated AI model performance using AUC-ROC (0.89), F1-Score, Precision/Recall curves, and Confusion Matrix; delivered structured stakeholder reports with model KPIs, generalisation metrics, and improvement recommendations.',
      'Implemented Git-versioned, modular Python training and inference scripts, enabling reproducible AI experiments and seamless team collaboration across the full ML development lifecycle.'
    ],
    technologies: ['XGBoost', 'Scikit-learn Pipelines', 'SMOTE', 'Python', 'Bayesian Tuning', 'AUC-ROC (0.89)', 'Git']
  },
  {
    role: 'Python Developer Intern',
    company: 'CodTech IT Solutions Pvt. Ltd.',
    location: 'Remote, India',
    type: 'Internship',
    period: 'Jun 2025 — Aug 2025',
    startDate: '2025-06',
    endDate: '2025-08',
    highlights: [
      'Developed Python ETL pipelines (Pandas, NumPy) to ingest, clean, and transform data from 4+ sources into model-ready datasets, reducing AI pipeline preprocessing time by 50%.',
      'Automated data validation and quality assurance checks for ML-ready training datasets, ensuring feature consistency, schema integrity, and zero data leakage across train/validation/test splits.'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'ETL Pipelines', 'Data Validation', 'Quality Assurance', 'Automation']
  }
];
