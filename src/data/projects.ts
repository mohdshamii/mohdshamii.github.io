export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: 'ml' | 'nlp' | 'analytics' | 'all';
  what: string;
  why: string;
  how: string;
  result: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  image?: string;
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: 'revive',
    name: 'Revive — AI-Powered Clinical Disease Prediction System',
    tagline: 'End-to-End Scikit-learn Pipeline, XGBoost, Docker & Flask REST API',
    category: 'ml',
    what: 'A production AI diagnostic system trained on the UCI Heart Disease dataset (303 records) evaluating clinical biomarkers to predict patient cardiovascular disease risk.',
    why: 'Clinical diagnostics require low false-negative risk assessments and transparent probability scores to support timely preventative medical care.',
    how: 'Engineered an end-to-end Scikit-learn ML pipeline with feature engineering, SMOTE balancing, XGBoost training, and k-fold cross-validation; deployed as a Flask REST API with real-time JSON inference endpoints and containerised with Docker.',
    result: 'Achieved 85% accuracy, an AUC-ROC of 0.91, and an F1-Score of 0.87, delivering reliable real-time probability estimates for clinician review.',
    technologies: ['Python', 'XGBoost', 'Scikit-learn Pipelines', 'SMOTE', 'Flask REST API', 'Docker', 'AUC-ROC: 0.91'],
    githubUrl: 'https://github.com/mohdshamii/Revive',
    liveDemoUrl: 'lab/index.html#disease-tab',
    image: 'img/project-revive.png',
    featured: true
  },
  {
    id: 'hamspam',
    name: 'HamOrSpam — NLP AI Text Classification Engine',
    tagline: 'TF-IDF Vectorisation, SMOTE Class Balancing & Stratified K-Fold',
    category: 'nlp',
    what: 'An automated natural language processing AI pipeline trained on the SpamAssassin dataset (6,000+ emails) to classify messages into authentic communication (ham) or spam/phishing.',
    why: 'Acute text class distribution imbalance causes standard classifiers to miss high-threat phishing emails while raising costly false alarms on legitimate correspondence.',
    how: 'Implemented text preprocessing, stop-word removal, TF-IDF n-gram vectorisation, SMOTE oversampling, and Logistic Regression with stratified k-fold cross-validation.',
    result: 'Achieved 97.8% classification accuracy and a 0.96 F1-score on severely imbalanced classes with minimal false-positive errors.',
    technologies: ['Python', 'NLP', 'TF-IDF', 'SMOTE', 'Logistic Regression', 'Scikit-learn', 'Stratified K-Fold'],
    githubUrl: 'https://github.com/mohdshamii/HamOrSpam-Classifier',
    liveDemoUrl: 'lab/index.html#spam-tab',
    image: 'img/project-spam.png',
    featured: true
  },
  {
    id: 'farmaiq',
    name: 'FarmAIQ — Multi-Model AI Platform for Smart Agriculture',
    tagline: 'Dual-Model Engine: Random Forest Crop Recommendation & Deep CNN Disease Classifier',
    category: 'ml',
    what: 'A multi-model agricultural intelligence platform providing soil-specific crop advisory and deep learning plant leaf disease classification.',
    why: 'Farmers need accurate recommendations based on soil NPK chemistry and rainfall, alongside rapid visual identification of plant lesions to safeguard harvests.',
    how: 'Developed a Random Forest crop recommendation engine (Kaggle dataset, 2,200 records) paired with a Convolutional Neural Network (CNN) plant disease classifier (PlantVillage dataset) using deep learning feature extraction, grid-search tuning, and cross-validation.',
    result: 'Achieved 93% accuracy on crop recommendation and high-precision visual leaf health diagnostic classifications on unseen agricultural test data.',
    technologies: ['Python', 'Random Forest', 'CNN (Deep Learning)', 'Keras / TensorFlow', 'Grid Search', 'Cross-Validation'],
    githubUrl: 'https://github.com/mohdshamii/FarmAIQ',
    liveDemoUrl: 'lab/index.html#crop-tab',
    image: 'img/project-farmaiq.png',
    featured: true
  },
  {
    id: 'zillanaksha',
    name: 'ZillaNaksha — India Geographic Data Intelligence',
    tagline: 'District-Level Spatial EDA, Demographic Mapping & Regional Indicator Scorecards',
    category: 'analytics',
    what: 'A geospatial data analytics project analyzing socio-economic, agricultural, and demographic indicators across 700+ administrative districts in India.',
    why: 'Public administrative datasets are traditionally siloed in disparate tabular formats, making comparative spatial analysis and policy evaluation challenging.',
    how: 'Harmonized government datasets using Pandas, performed boundary joins with GeoPandas and Folium, and created automated aggregation pipelines to calculate composite regional development indices.',
    result: 'Generated interactive choropleth visualizations and regional indicator scorecards that highlight spatial disparities and support data-backed resource planning.',
    technologies: ['Python', 'GeoPandas', 'Pandas', 'Folium', 'Data Cleaning', 'Spatial EDA'],
    githubUrl: 'https://github.com/mohdshamii/ZillaNaksha',
    liveDemoUrl: 'lab/index.html#sql-tab',
    featured: true
  },
  {
    id: 'churnshield',
    name: 'ChurnShield AI — Customer Retention & Churn Analytics',
    tagline: 'Predictive Churn Modeling, Cohort Segmentation & Retention Driver Attribution',
    category: 'analytics',
    what: 'A predictive customer analytics system identifying accounts with high risk of churn and quantifying underlying retention drivers.',
    why: 'Customer churn directly erodes recurring revenue; proactive identification of at-risk clients allows businesses to deliver targeted retention campaigns at a fraction of acquisition cost.',
    how: 'Engineered behavioral and telemetry features (tenure ratio, service tickets, contract structure), trained gradient-boosted decision trees (XGBoost), and generated SHAP risk attribution values.',
    result: 'Identified top churn indicators (month-to-month contracts, unresolved support tickets) and delivered an interpretable retention scoring model for strategic customer success workflows.',
    technologies: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas', 'EDA', 'Power BI / Streamlit'],
    githubUrl: 'https://github.com/mohdshamii/ChurnShield-AI',
    liveDemoUrl: 'lab/index.html#churn-tab',
    featured: true
  }
];
