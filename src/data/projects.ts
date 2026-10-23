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
    id: 'hydroraksh',
    name: 'HydroRaksh (JalSuraksha) — AI Groundwater Intelligence & Decision Support Platform',
    tagline: 'HG-CF Graph Laplacian Recommender, Multi-Horizon ML Forecasting & GEC-2015 Prescriptive Decision Engine',
    category: 'ml',
    what: 'An authoritative pan-India groundwater geospatial intelligence platform aggregating live and scheduled groundwater levels, rainfall departures, and water quality telemetry across 700+ districts in 36 States/UTs.',
    why: 'Over 63% of irrigated agriculture and 85% of rural drinking water depend on aquifers, withdrawing ~245 BCM annually with >17% of units Over-Exploited; conventional quarterly manual monitoring fails to provide localized engineering recommendations.',
    how: 'Formulated Hydro-Geological Collaborative Filtering (HG-CF) embedding physical aquifer conductivity, slope, extraction stage, and depth into a graph Laplacian regularization kernel; trained multi-horizon Ridge, Gradient Boosting, and Random Forest forecasters; implemented LDA topic mining and GEC-2015 water balance audits; deployed as an asynchronous FastAPI and Flask service containerized with Docker.',
    result: 'Achieved 3.85m MAE on water table forecasting (vs 29.85m naive persistence), NDCG@5 of 0.437 on HG-CF recommendations, with 101 passing unit tests across 16 serialized research notebooks.',
    technologies: ['Python 3.10+', 'FastAPI', 'Flask', 'Scikit-learn', 'HG-CF Recommender', 'Graph Laplacian', 'TimescaleDB', 'LDA (Gensim)', 'SHAP', 'Docker'],
    githubUrl: 'https://github.com/mohdshamii/HydroRaksh',
    liveDemoUrl: 'https://github.com/mohdshamii/HydroRaksh',
    image: '/img/project-hydroraksh.png',
    featured: true
  },
  {
    id: 'bharatlens',
    name: 'BharatLens ML — Indian District Socioeconomic Intelligence & Trend Forecasting Platform',
    tagline: '54-Feature Longitudinal Panel Microdata, Momentum Velocity (Z_Δ), K-Means & Explainable AI (SHAP)',
    category: 'analytics',
    what: 'An empirical district-level econometric and machine learning platform processing multi-period panel microdata across 643 Indian districts in 37 States and Union Territories.',
    why: 'National Baseline Drift (The Momentum Paradox) conceals district-level deceleration behind nationwide scheme gains; cross-silo administrative data fragmentation and black-box indices hinder transparent governance.',
    how: 'Harmonized NFHS-4/5, Census 2011, MGNREGA, and IMD rainfall into a 54-feature store; engineered state-relative momentum velocity (Z_Δ); clustered districts via K-Means (k=4); detected multi-variate anomalies via Isolation Forest and LOF; benchmarked Ridge and tree regressors/classifiers; deployed local/global SHAP waterfall explainers in an India.gov.in themed Flask portal.',
    result: 'Isolated 33 multi-variate trajectory anomalies, achieved champion Ridge forecasting of score deltas, and generated plain-language SHAP driver narratives for all 643 districts with 22 automated Pytest tests.',
    technologies: ['Python 3.10+', 'Scikit-learn 1.5+', 'XGBoost', 'SHAP', 'Flask 3.0', 'Pandas', 'NumPy', 'SciPy', 'Chart.js', 'Plotly.js', 'Pytest'],
    githubUrl: 'https://github.com/mohdshamii/BharatLens',
    liveDemoUrl: 'https://github.com/mohdshamii/BharatLens',
    image: '/img/project-bharatlens.png',
    featured: true
  },
  {
    id: 'atlas',
    name: 'Atlas — Civic Geospatial Intelligence & Predictive Public Policy Engine',
    tagline: 'Deterministic PRNG Data Engine, 2025–2030 Ridge Forecasting, 2D PCA & Three.js 3D WebGL',
    category: 'ml',
    what: 'An enterprise-grade civic and geographic data visualization platform covering all 75 districts of Uttar Pradesh across 18 administrative divisions and national hubs (2015–2024), featuring 2025–2030 predictive forecasting.',
    why: 'Civic data for Indian administrative units is fragmented and backwards-looking, lacking forward-looking projections and capital budget simulation tools for multi-sectoral public planning.',
    how: 'Architected a deterministic 32-bit FNV-1a and Mulberry32 PRNG engine generating 42,750+ data points across 11 locked civic sectors and 50+ metrics; performed K-Means clustering and 2D PCA dimensionality reduction; fitted L2-penalized Ridge regression for 2025–2030 horizon forecasts with 95% confidence intervals; built an empirical elasticity AI Policy Budget Simulator with Three.js 3D WebGL globe and elevation maps.',
    result: 'Delivered an academic-caliber platform with 15 unit tests, publication-ready Jupyter analytics notebook, 12 REST API endpoints, and real-time capital intervention simulations for policymakers.',
    technologies: ['Python 3.10+', 'Flask REST API', 'Scikit-Learn', 'Ridge Regression', 'PCA', 'Three.js (WebGL)', 'Leaflet.js', 'Plotly', 'Pandas', 'Jupyter'],
    githubUrl: 'https://github.com/mohdshamii/Atlas',
    liveDemoUrl: 'https://github.com/mohdshamii/Atlas',
    image: '/img/project-atlas.png',
    featured: true
  },
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
    liveDemoUrl: '/lab/index.html#disease-tab',
    image: '/img/project-revive.png',
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
    liveDemoUrl: '/lab/index.html#crop-tab',
    image: '/img/project-farmaiq.png',
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
    liveDemoUrl: '/lab/index.html#spam-tab',
    image: '/img/project-spam.png',
    featured: true
  }
];
