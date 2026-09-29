export interface SkillCategory {
  category: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'AI / ML Algorithms',
    description: 'Supervised and ensemble predictive learning algorithms',
    skills: [
      'XGBoost',
      'Random Forest',
      'Logistic Regression',
      'Decision Trees',
      'KNN',
      'Naive Bayes',
      'SVM (basic)',
      'Ensemble Methods'
    ]
  },
  {
    category: 'Deep Learning & Neural Networks',
    description: 'Computer vision, deep feature extraction, and convolutional networks',
    skills: [
      'CNN (Image Classification)',
      'Feature Extraction',
      'Neural Networks',
      'Keras (basic)',
      'Transfer Learning'
    ]
  },
  {
    category: 'Natural Language Processing (NLP)',
    description: 'Text preprocessing, vectorisation, and high-precision classification',
    skills: [
      'Text Preprocessing',
      'TF-IDF Vectorisation',
      'Logistic Regression Classifier',
      'SMOTE Class Balancing',
      'Tokenisation',
      'Stop-word Removal'
    ]
  },
  {
    category: 'ML Engineering & Pipelines',
    description: 'Automated data engineering, transformation, and validation pipelines',
    skills: [
      'Scikit-learn Pipelines',
      'Feature Engineering',
      'Data Preprocessing',
      'Hyperparameter Tuning (Bayesian & Grid)',
      'Cross-Validation (Stratified K-Fold)'
    ]
  },
  {
    category: 'Model Evaluation & Statistics',
    description: 'Rigorous diagnostic metrics and error analysis',
    skills: [
      'AUC-ROC',
      'F1-Score',
      'Precision & Recall',
      'Confusion Matrix',
      'Learning Curves',
      'Bias-Variance Trade-off',
      'Statistical Testing'
    ]
  },
  {
    category: 'Deployment & Engineering Stack',
    description: 'Production APIs, containerization, and data pipelines',
    skills: [
      'Flask (REST API)',
      'Docker Containerization',
      'Git & GitHub',
      'Python (Pandas, NumPy)',
      'SQL (MySQL)',
      'Linux',
      'Jupyter Notebook',
      'ETL Pipelines'
    ]
  }
];
