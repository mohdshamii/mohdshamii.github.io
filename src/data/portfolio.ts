export interface MetricItem {
  value: string;
  suffix?: string;
  label: string;
  description: string;
  verifiedSource: string;
}

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  items: string[];
  color: string;
}

export interface WorkItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
}

export interface ProjectArchitecture {
  step: string;
  detail: string;
}

export interface CaseStudyData {
  problem: string;
  data: string;
  preprocessing: string;
  model: string;
  evaluation: string;
  deployment: string;
  result: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  subtitle: string;
  period: string;
  category: 'ml' | 'nlp' | 'vision' | 'analytics';
  overview: string;
  pipeline: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  image: string;
  caseStudy: CaseStudyData;
}

export interface PipelineStep {
  step: string;
  title: string;
  tagline: string;
  details: string[];
  tools: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  domain: string;
  description: string;
  verifyUrl: string;
}

export interface AchievementItem {
  title: string;
  category: string;
  highlight: string;
  description: string;
  year: string;
}

export interface PortfolioData {
  identity: {
    name: string;
    role: string;
    subheading: string;
    animatedRoles: string[];
    status: string;
    location: string;
    email: string;
    phone: string;
    resumeUrl: string;
    quote: string;
    philosophy: string;
    bio: string;
    socials: {
      github: string;
      linkedin: string;
      leetcode: string;
    };
  };
  metrics: MetricItem[];
  about: {
    headline: string;
    paragraphs: string[];
    disciplines: {
      name: string;
      desc: string;
      tags: string[];
    }[];
    workflowPathway: string[];
  };
  skillsHub: {
    center: string;
    categories: SkillNode[];
  };
  experience: WorkItem[];
  projects: ProjectItem[];
  mlPipeline: PipelineStep[];
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    cgpa: string;
    rank: string;
    description: string;
    coreCourses: string[];
  };
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  dsa: {
    count: string;
    language: string;
    description: string;
    domains: { name: string; problems: string }[];
    githubUrl: string;
    leetcodeUrl: string;
  };
}

export const portfolioData: PortfolioData = {
  identity: {
    name: "MOHD SHAMI",
    role: "AI/ML ENGINEER",
    subheading: "B.Tech Data Science & AI · Specialized in End-to-End Machine Learning Systems",
    animatedRoles: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "Model Deployment"
    ],
    status: "OPEN TO AI/ML ENGINEER ROLES",
    location: "Moradabad, UP, India",
    email: "codexshami@gmail.com",
    phone: "+91 89235 91576",
    resumeUrl: "/resume.pdf",
    quote: "Pure mathematics, is, in its way, the poetry of logical ideas.",
    philosophy: "Data has a story — my job is to tell it well, and ship the model that acts on it.",
    bio: "AI/ML Engineer with 1+ year of experience building end-to-end AI and machine learning systems spanning supervised learning, NLP, computer vision, deep learning (CNN), feature engineering, model optimisation, and Flask-based production deployment.",
    socials: {
      github: "https://github.com/mohdshamii",
      linkedin: "https://linkedin.com/in/mohdshamii",
      leetcode: "https://leetcode.com/u/mohdshamii"
    }
  },

  metrics: [
    {
      value: "97.8",
      suffix: "%",
      label: "NLP Model Accuracy",
      description: "TF-IDF + SMOTE text classification on imbalanced corpus",
      verifiedSource: "HamOrSpam Classifier Project"
    },
    {
      value: "85",
      suffix: "%",
      label: "Clinical ML Model Accuracy",
      description: "Boosted from 72% via Bayesian tuning & feature engineering",
      verifiedSource: "Codec Technologies Internship / Revive"
    },
    {
      value: "0.91",
      suffix: "",
      label: "AUC-ROC Score",
      description: "High discrimination threshold on clinical heart disease prediction",
      verifiedSource: "Revive Diagnostic Architecture"
    },
    {
      value: "850",
      suffix: "+",
      label: "DSA Problems Solved",
      description: "Algorithmic challenges in Python across HackerRank & LeetCode",
      verifiedSource: "GitHub PyDSA & LeetCode"
    },
    {
      value: "8.5",
      suffix: "/10",
      label: "B.Tech CGPA",
      description: "Rank 1 in Academic Cohort at Teerthanker Mahaveer University",
      verifiedSource: "TMU Academic Record"
    },
    {
      value: "1",
      suffix: "+ Yr",
      label: "Hands-on Experience",
      description: "Production ML pipelines, data engineering, and REST API deployment",
      verifiedSource: "Industry Internships"
    }
  ],

  about: {
    headline: "I BUILD END-TO-END INTELLIGENT SYSTEMS.",
    paragraphs: [
      "I am an AI/ML Engineer with 1+ year of experience designing and shipping practical machine learning systems from scratch. Rather than confining ML to exploratory notebooks, I architect production workflows spanning robust data ingestion, feature engineering, class rebalancing, Bayesian hyperparameter tuning, and containerized REST APIs.",
      "My work bridges classical ensemble algorithms (XGBoost, Random Forest), deep neural networks (CNNs for computer vision), and specialized natural language processing (TF-IDF, SMOTE-balanced classification). I have achieved 97.8% NLP classification accuracy, boosted clinical diagnostic precision by 13 percentage points, and built automated ETL pipelines reducing data preprocessing latency by 50%.",
      "Currently pursuing B.Tech in Data Science at Teerthanker Mahaveer University (Class of 2027), where I maintain the 1st Rank in the Academic Cohort (CGPA 8.5/10). Grounded in algorithmic rigor with 850+ Data Structures & Algorithms solved exclusively in Python."
    ],
    disciplines: [
      {
        name: "Machine Learning",
        desc: "Supervised classification, regression, and gradient-boosted decision trees.",
        tags: ["XGBoost", "Random Forest", "Scikit-learn", "Ensemble Methods"]
      },
      {
        name: "Deep Learning & CV",
        desc: "Convolutional neural networks for image classification and feature extraction.",
        tags: ["CNN", "Keras", "TensorFlow", "Computer Vision"]
      },
      {
        name: "Natural Language Processing",
        desc: "High-precision text parsing, n-gram vectorization, and spam detection.",
        tags: ["TF-IDF", "Tokenization", "SMOTE", "Text Cleaning"]
      },
      {
        name: "ML Engineering & MLOps",
        desc: "Reproducible pipelines, cross-validation, and hyperparameter search.",
        tags: ["Sklearn Pipelines", "Bayesian Search", "Stratified K-Fold"]
      },
      {
        name: "Model Deployment",
        desc: "Packaging inference endpoints with real-time JSON responses.",
        tags: ["Flask REST API", "Docker", "Linux", "Git"]
      },
      {
        name: "Data Engineering",
        desc: "ETL scripts, schema validation, and zero data leakage pipelines.",
        tags: ["Pandas", "NumPy", "SQL (MySQL)", "Data Integrity"]
      }
    ],
    workflowPathway: [
      "DATA",
      "FEATURES",
      "MODEL",
      "EVALUATION",
      "API",
      "DEPLOYMENT"
    ]
  },

  skillsHub: {
    center: "AI / ML",
    categories: [
      {
        id: "algorithms",
        name: "AI/ML Algorithms",
        description: "Supervised and ensemble predictive learning algorithms",
        color: "#6366f1",
        items: [
          "XGBoost",
          "Random Forest",
          "Logistic Regression",
          "Decision Trees",
          "KNN",
          "Naive Bayes",
          "SVM (basic)",
          "Ensemble Methods"
        ]
      },
      {
        id: "deep-learning",
        name: "Deep Learning",
        description: "Computer vision and neural feature extraction",
        color: "#8b5cf6",
        items: [
          "CNN",
          "Neural Networks",
          "Keras",
          "Image Classification",
          "Feature Extraction"
        ]
      },
      {
        id: "nlp",
        name: "NLP",
        description: "Text preprocessing and high-precision classification",
        color: "#06b6d4",
        items: [
          "Text Preprocessing",
          "TF-IDF Vectorisation",
          "Tokenisation",
          "Stop-word Removal",
          "Logistic Regression",
          "SMOTE"
        ]
      },
      {
        id: "ml-engineering",
        name: "ML Engineering",
        description: "Automated pipelines, tuning, and validation",
        color: "#3b82f6",
        items: [
          "Scikit-learn Pipelines",
          "Feature Engineering",
          "Data Preprocessing",
          "Hyperparameter Tuning",
          "Cross-Validation"
        ]
      },
      {
        id: "evaluation",
        name: "Model Evaluation",
        description: "Diagnostic metrics and statistical verification",
        color: "#ec4899",
        items: [
          "AUC-ROC",
          "F1 Score",
          "Precision",
          "Recall",
          "Confusion Matrix",
          "Learning Curves",
          "Grid Search",
          "Bias-Variance Trade-off"
        ]
      },
      {
        id: "deployment",
        name: "Deployment & Stack",
        description: "Production inference, containerization, and data layers",
        color: "#10b981",
        items: [
          "Flask REST API",
          "Docker",
          "Git & GitHub",
          "Linux",
          "Python (Pandas, NumPy)",
          "SQL / MySQL",
          "ETL Pipelines"
        ]
      }
    ]
  },

  experience: [
    {
      id: "codec",
      role: "Data Science Intern",
      company: "Codec Technologies India",
      location: "Remote / Hybrid, India",
      period: "Aug 2025 – Oct 2025",
      highlights: [
        "Engineered an XGBoost AI diagnostic model on a clinical dataset (5,000+ records); applied advanced feature engineering, SMOTE class balancing, and Bayesian hyperparameter tuning to improve classification accuracy from 72% to 85% and reduce the false-negative rate by 18%.",
        "Built end-to-end Scikit-learn ML Pipelines integrating data preprocessing, feature scaling, SMOTE oversampling, model training, and cross-validated evaluation into a single reproducible, production-grade workflow.",
        "Evaluated AI model performance using AUC-ROC (0.89), F1-Score, Precision/Recall curves, and Confusion Matrix; delivered structured stakeholder reports with model KPIs, generalisation metrics, and improvement recommendations.",
        "Implemented Git-versioned, modular Python training and inference scripts, enabling reproducible AI experiments and seamless team collaboration across the full ML development lifecycle."
      ],
      metrics: [
        { label: "Accuracy Gain", value: "72% → 85%" },
        { label: "False-Negative Reduction", value: "18%" },
        { label: "AUC-ROC", value: "0.89" }
      ],
      technologies: ["Python", "XGBoost", "Scikit-learn Pipelines", "SMOTE", "Bayesian Tuning", "AUC-ROC", "Git"]
    },
    {
      id: "codtech",
      role: "Python Developer Intern",
      company: "CodTech IT Solutions Pvt. Ltd.",
      location: "Remote, India",
      period: "Jun 2025 – Aug 2025",
      highlights: [
        "Developed Python ETL pipelines (Pandas, NumPy) to ingest, clean, and transform data from 4+ sources into model-ready datasets, reducing AI pipeline preprocessing time by 50%.",
        "Automated data validation and quality assurance checks for ML-ready training datasets, ensuring feature consistency, schema integrity, and zero data leakage across train/validation/test splits."
      ],
      metrics: [
        { label: "Preprocessing Speedup", value: "50% Reduction" },
        { label: "Data Sources Harmonized", value: "4+ Sources" },
        { label: "Leakage Prevention", value: "Zero Leakage" }
      ],
      technologies: ["Python", "Pandas", "NumPy", "ETL Pipelines", "Data Validation", "QA Automation"]
    }
  ],

  projects: [
    {
      id: "revive",
      name: "REVIVE",
      subtitle: "AI-Powered Clinical Disease Prediction System",
      period: "Jan 2026 – Mar 2026",
      category: "ml",
      overview: "A production clinical AI diagnostic system trained on the UCI Heart Disease dataset (303 records) evaluating cardiovascular biomarkers to deliver high-discrimination risk predictions with minimal false-negative error.",
      pipeline: [
        "DATASET",
        "PREPROCESSING",
        "SMOTE",
        "XGBOOST",
        "VALIDATION",
        "FLASK API",
        "DOCKER"
      ],
      metrics: [
        { label: "Accuracy", value: "85%" },
        { label: "AUC-ROC", value: "0.91" },
        { label: "F1-Score", value: "0.87" },
        { label: "Dataset Size", value: "303 Records" }
      ],
      technologies: ["Python", "XGBoost", "Scikit-learn Pipelines", "SMOTE", "Flask REST API", "Docker"],
      githubUrl: "https://github.com/mohdshamii/Revive",
      liveDemoUrl: "/lab/index.html#disease-tab",
      image: "/images/revive.png",
      caseStudy: {
        problem: "Clinical cardiovascular diagnosis requires exceptional sensitivity; failing to detect at-risk patients (false negatives) carries catastrophic health consequences. Traditional heuristics often miss non-linear biomarker interactions.",
        data: "UCI Heart Disease benchmark dataset containing 303 patient records across 14 clinical attributes including resting blood pressure, cholesterol, max heart rate, chest pain type, and ST depression.",
        preprocessing: "Imputed missing values, scaled continuous features with RobustScaler, encoded categorical features, and addressed class distribution disparities using SMOTE oversampling.",
        model: "Gradient-boosted decision trees (XGBoost) optimized via Bayesian hyperparameter tuning and embedded into an end-to-end Scikit-learn Pipeline for reproducible, leak-free training.",
        evaluation: "Evaluated using stratified 5-fold cross-validation. Reached an AUC-ROC of 0.91, 85% overall accuracy, and an F1-Score of 0.87, confirming robust discrimination threshold stability.",
        deployment: "Packaged as a lightweight Flask REST microservice serving instant real-time JSON probability predictions; containerized with Docker for cross-platform portability.",
        result: "Delivered a verifiable, containerized inference pipeline with sub-50ms latency and high sensitivity, minimizing diagnostic false negatives."
      }
    },
    {
      id: "hamspam",
      name: "HAMORSPAM",
      subtitle: "NLP AI Text Classification Engine",
      period: "May 2025 – Aug 2025",
      category: "nlp",
      overview: "An automated natural language processing AI system trained on the SpamAssassin corpus (6,000+ emails) to classify messages into authentic communication (ham) or malicious spam/phishing with over 97.8% accuracy.",
      pipeline: [
        "EMAIL",
        "TEXT PROCESSING",
        "TF-IDF",
        "SMOTE",
        "CLASSIFIER",
        "HAM / SPAM"
      ],
      metrics: [
        { label: "Accuracy", value: "97.8%" },
        { label: "F1-Score", value: "0.96" },
        { label: "Corpus Size", value: "6,000+ Emails" },
        { label: "Evaluation", value: "Stratified K-Fold" }
      ],
      technologies: ["Python", "NLP", "TF-IDF", "SMOTE", "Logistic Regression", "Scikit-learn", "Stratified K-Fold"],
      githubUrl: "https://github.com/mohdshamii/HamOrSpam-Classifier",
      liveDemoUrl: "/lab/index.html#spam-tab",
      image: "/images/hamorspam.png",
      caseStudy: {
        problem: "Email communication suffers from heavy class imbalance and adversarial text variations, leading standard filters to either leak dangerous spam or flag important business emails.",
        data: "SpamAssassin benchmark dataset containing 6,000+ email records featuring diverse header variations, raw HTML payloads, and authentic personal correspondence.",
        preprocessing: "Applied custom regex tokenization, HTML striping, punctuation removal, lowercase normalization, stop-word elimination, and sub-linear TF-IDF n-gram vectorization.",
        model: "Logistic Regression with L2 regularization paired with SMOTE oversampling to rebalance sparse vector spaces without generating unrealistic artifacts.",
        evaluation: "Validated through stratified k-fold cross-validation, demonstrating 97.8% accuracy and 0.96 F1-score with negligible false positive disruption.",
        deployment: "Exported serialized model artifacts (`joblib`) and built an interactive inference interface for real-time phrase evaluation and probability readout.",
        result: "Produced a production-ready, high-speed NLP filter capable of scoring emails in milliseconds while preserving authentic mail delivery."
      }
    },
    {
      id: "farmaiq",
      name: "FARMAIQ",
      subtitle: "Multi-Model AI Platform for Smart Agriculture",
      period: "Nov 2025 – Dec 2025",
      category: "vision",
      overview: "A dual-model agricultural intelligence system combining Random Forest soil crop recommendation (2,200 records, 93% accuracy) with a Convolutional Neural Network (CNN) for leaf disease diagnosis on the PlantVillage dataset.",
      pipeline: [
        "SOIL / IMAGE",
        "FEATURE EXTRACTION",
        "RANDOM FOREST / CNN",
        "CROSS-VALIDATION",
        "GRID SEARCH",
        "DIAGNOSTIC ADVISORY"
      ],
      metrics: [
        { label: "Crop Accuracy", value: "93%" },
        { label: "Soil Records", value: "2,200 Records" },
        { label: "Vision Engine", value: "Deep CNN" },
        { label: "Dataset", value: "PlantVillage" }
      ],
      technologies: ["Python", "Random Forest", "CNN", "Deep Learning", "Keras / TensorFlow", "Grid Search", "Cross-Validation"],
      githubUrl: "https://github.com/mohdshamii/FarmAIQ",
      liveDemoUrl: "/lab/index.html#crop-tab",
      image: "/images/farmaiq.png",
      caseStudy: {
        problem: "Agricultural yields are constrained by suboptimal crop selection based on intuition rather than soil chemistry, compounded by late-stage visual identification of crop pathogens.",
        data: "Tabular soil data (2,200 records with Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH, and Rainfall) combined with thousands of high-resolution crop leaf images from PlantVillage.",
        preprocessing: "Tabular data: statistical normalization and boundary inspection. Vision data: image augmentation (rotations, zooms, flips) and pixel scaling for convolutional layers.",
        model: "Dual-model architecture: Random Forest ensemble for tabular crop suitability combined with a multi-layer Convolutional Neural Network (CNN) for lesion feature extraction.",
        evaluation: "Achieved 93% predictive accuracy on crop recommendation and high precision on leaf disease classification across unseen agricultural splits.",
        deployment: "Integrated into a unified dual-tab dashboard allowing farmers to toggle between soil nutrient recommendations and visual symptom diagnoses.",
        result: "Provided a data-driven agronomy platform that pairs immediate visual pathology with preventative soil chemistry recommendations."
      }
    },
    {
      id: "churnshield",
      name: "CHURNSHIELD AI",
      subtitle: "Customer Retention & Predictive Risk Scoring",
      period: "2025 – 2026",
      category: "analytics",
      overview: "A predictive customer analytics engine identifying client churn risks and uncovering underlying behavioral drivers using gradient-boosted decision trees.",
      pipeline: [
        "CUSTOMER TELEMETRY",
        "BEHAVIORAL FEATURES",
        "SMOTE BALANCING",
        "XGBOOST",
        "SHAP ATTRIBUTION",
        "RISK SCORECARD"
      ],
      metrics: [
        { label: "Model Type", value: "XGBoost Classifier" },
        { label: "Analysis", value: "SHAP Drivers" },
        { label: "Focus", value: "Retention Analytics" },
        { label: "Stack", value: "Python & Pandas" }
      ],
      technologies: ["Python", "XGBoost", "Scikit-learn", "Pandas", "Feature Engineering", "EDA"],
      githubUrl: "https://github.com/mohdshamii/ChurnShield_AI",
      liveDemoUrl: "/lab/index.html#churn-tab",
      image: "/images/churnshield.png",
      caseStudy: {
        problem: "Customer churn directly drains annual recurring revenue; manual customer success outreach fails to prioritize the accounts at immediate departure risk.",
        data: "Customer usage telemetry, subscription contracts, billing patterns, and support incident histories.",
        preprocessing: "Engineered tenure ratios, interaction velocity indicators, and one-hot encoded categorical billing options.",
        model: "XGBoost classifier fine-tuned to penalize false negative churn predictions while producing calibrated probability scores.",
        evaluation: "Evaluated across precision-recall trade-offs to maximize capture rate of at-risk accounts before contract expiration.",
        deployment: "Structured as an analytical risk scorecard delivering interpretability for strategic retention campaigns.",
        result: "Identified high-impact risk indicators (month-to-month contracts, frequent support tickets), enabling preemptive retention actions."
      }
    },
    {
      id: "pydsa",
      name: "PYDSA",
      subtitle: "850+ Data Structures & Algorithms in Python",
      period: "Ongoing",
      category: "analytics",
      overview: "A curated repository of 850+ algorithmic solutions solved exclusively in Python, categorized topic-wise across Trees, Graphs, Dynamic Programming, and Math.",
      pipeline: [
        "PROBLEM",
        "COMPLEXITY ANALYSIS",
        "PYTHON IMPLEMENTATION",
        "EDGE-CASE TESTING",
        "OPTIMIZATION"
      ],
      metrics: [
        { label: "Problems Solved", value: "850+" },
        { label: "Language", value: "Python" },
        { label: "Platforms", value: "LeetCode & HackerRank" },
        { label: "GitHub Stars", value: "8 Stars" }
      ],
      technologies: ["Python", "Algorithms", "Data Structures", "Dynamic Programming", "Graph Theory"],
      githubUrl: "https://github.com/mohdshamii/PyDSA",
      liveDemoUrl: "https://leetcode.com/u/mohdshamii",
      image: "/images/pydsa.png",
      caseStudy: {
        problem: "Writing clean, optimal, and performant machine learning code requires deep foundational understanding of time complexity, space complexity, and algorithmic structures.",
        data: "850+ competitive programming and computer science challenges spanning LeetCode, HackerRank, and Codeforces.",
        preprocessing: "Structured solutions by algorithmic categories: Arrays, Two Pointers, Trees, Graphs, Heaps, Dynamic Programming, Bit Manipulation, and Mathematics.",
        model: "Every solution designed for optimal asymptotic runtime (O(N) / O(N log N)) using Python idiomatic data structures.",
        evaluation: "All test cases validated across official platform judge engines with optimal memory footprints.",
        deployment: "Publicly maintained open-source GitHub archive with clear complexity notes for the developer community.",
        result: "Built a solid algorithmic foundation directly applied to writing optimized data pipelines and vectorised ML operations."
      }
    }
  ],

  mlPipeline: [
    {
      step: "01",
      title: "DATA INGESTION",
      tagline: "Sourcing & Schema Integrity",
      details: [
        "Ingest structured tabular datasets, CSVs, and SQL databases",
        "Enforce strict schema validation and typing across fields",
        "Isolate raw data immutably to guarantee auditability"
      ],
      tools: ["Python", "Pandas", "SQL", "NumPy"]
    },
    {
      step: "02",
      title: "DATA CLEANING",
      tagline: "Handling Noise & Anomalies",
      details: [
        "Detect and treat outliers using IQR and Z-score methods",
        "Strategically impute missing values (median/mode/KNN)",
        "Eliminate duplicate records and correct format inconsistencies"
      ],
      tools: ["Pandas", "Scipy", "Data Validation"]
    },
    {
      step: "03",
      title: "FEATURE ENGINEERING",
      tagline: "Maximizing Signal Density",
      details: [
        "Construct domain-specific interaction terms and ratios",
        "Apply robust scaling and transformations (Log, RobustScaler)",
        "Encode categoricals via One-Hot or Target Encoding without leakage"
      ],
      tools: ["Scikit-learn", "Feature-Engine", "NumPy"]
    },
    {
      step: "04",
      title: "CLASS BALANCING",
      tagline: "Addressing Skewed Distributions",
      details: [
        "Mitigate acute class imbalance using SMOTE and Tomek Links",
        "Synthetic sampling performed exclusively on training folds",
        "Prevent synthetic artifacts from polluting evaluation splits"
      ],
      tools: ["Imbalanced-Learn", "SMOTE", "Stratified Splits"]
    },
    {
      step: "05",
      title: "MODEL TRAINING",
      tagline: "Architectural Formulation",
      details: [
        "Formulate gradient-boosted trees, ensembles, and CNN architectures",
        "Encapsulate stages in reproducible Scikit-learn Pipelines",
        "Enforce deterministic random seeds for reproducible experiments"
      ],
      tools: ["XGBoost", "Random Forest", "Keras", "CNN"]
    },
    {
      step: "06",
      title: "VALIDATION",
      tagline: "Cross-Validation & Hyperparameter Tuning",
      details: [
        "Run Stratified K-Fold cross-validation across all folds",
        "Perform Bayesian optimization and Grid Search for optimal hyperparameters",
        "Monitor learning curves to diagnose bias vs. variance trade-offs"
      ],
      tools: ["StratifiedKFold", "GridSearchCV", "Bayesian Tuning"]
    },
    {
      step: "07",
      title: "EVALUATION",
      tagline: "Clinical & Statistical Metrics",
      details: [
        "Evaluate AUC-ROC, Precision-Recall curves, and F1-Scores",
        "Generate Confusion Matrices and false-negative risk assessments",
        "Extract feature importance and SHAP value attributions"
      ],
      tools: ["AUC-ROC (0.91)", "F1-Score", "Confusion Matrix", "SHAP"]
    },
    {
      step: "08",
      title: "DEPLOYMENT",
      tagline: "Packaging & Containerization",
      details: [
        "Serialize pipelines into production-grade model artifacts",
        "Wrap inference logic inside lightweight Flask REST API endpoints",
        "Containerize services into reproducible Docker images"
      ],
      tools: ["Flask REST API", "Docker", "Joblib", "Linux"]
    },
    {
      step: "09",
      title: "MONITORING",
      tagline: "Telemetry & Performance Maintenance",
      details: [
        "Track inference latency and API response status codes",
        "Detect data drift and distribution changes over incoming payloads",
        "Version model iterations and pipeline code via Git"
      ],
      tools: ["Git", "Logging", "API Telemetry", "Docker Healthcheck"]
    }
  ],

  education: {
    degree: "B.Tech in Data Science",
    institution: "Teerthanker Mahaveer University",
    location: "Moradabad, UP, India",
    period: "2023 — Expected 2027",
    cgpa: "8.5 / 10",
    rank: "1st Rank in Academic Cohort",
    description: "Specializing in Machine Learning, Deep Neural Networks, Natural Language Processing, Statistical Modeling, and Database Architecture. Maintaining first rank across all academic cohorts.",
    coreCourses: [
      "Machine Learning & Statistical Pattern Recognition",
      "Deep Learning & Convolutional Architectures",
      "Natural Language Processing",
      "Data Structures & Algorithms (Python)",
      "Relational Database Systems (SQL)",
      "Probability, Linear Algebra & Calculus for ML"
    ]
  },

  certifications: [
    {
      title: "Deep Learning & ML with Python",
      issuer: "Simplilearn",
      year: "2025",
      domain: "Deep Learning / CNN",
      description: "Convolutional neural networks, transfer learning, and deep neural architectures in PyTorch and TensorFlow.",
      verifyUrl: "https://linkedin.com/in/mohdshamii"
    },
    {
      title: "Data Analysis & Problem Solving",
      issuer: "IBM",
      year: "2026",
      domain: "Data Analytics",
      description: "Enterprise data methodologies, predictive analysis, and statistical decision modeling.",
      verifyUrl: "https://linkedin.com/in/mohdshamii"
    },
    {
      title: "Scientific Observation from Space",
      issuer: "ISRO",
      year: "2026",
      domain: "Geospatial Intelligence",
      description: "Satellite imagery processing, remote sensing methodologies, and geospatial data intelligence.",
      verifyUrl: "https://linkedin.com/in/mohdshamii"
    },
    {
      title: "Python, SQL & Problem Solving",
      issuer: "HackerRank",
      year: "2025",
      domain: "Algorithms & Databases",
      description: "Complex query optimization, relational database queries, indexing, and algorithmic problem solving.",
      verifyUrl: "https://www.hackerrank.com/mohdshamii"
    },
    {
      title: "Intro to Computer Science",
      issuer: "IIT Bombay",
      year: "2024",
      domain: "CS Foundations",
      description: "Computational thinking, data structures, algorithm design, and core programming paradigms.",
      verifyUrl: "https://linkedin.com/in/mohdshamii"
    },
    {
      title: "Advanced Data Analysis: Excel & Power BI",
      issuer: "ITM EdTech",
      year: "2025",
      domain: "Business Intelligence",
      description: "Business intelligence dashboards, DAX queries, ETL transformation, and executive reporting.",
      verifyUrl: "https://linkedin.com/in/mohdshamii"
    }
  ],

  achievements: [
    {
      title: "Smart India Hackathon (SIH)",
      category: "AI Innovation",
      highlight: "Selected for College Round",
      description: "Selected for the college round of Smart India Hackathon with the 'Revive' machine-learning clinical disease diagnostic prediction system.",
      year: "2025"
    },
    {
      title: "India AI Impact Summit",
      category: "Technical Presentation",
      highlight: "Industry Presentation",
      description: "Presented applied AI/ML research project on gradient-boosted diagnostic architectures to industry professionals and researchers.",
      year: "2025"
    },
    {
      title: "850+ DSA Problems Solved",
      category: "Algorithmic Rigor",
      highlight: "Python Specialist",
      description: "Solved algorithmic challenges across HackerRank & LeetCode exclusively in Python, mastering trees, graphs, dynamic programming, and complexity optimization.",
      year: "2025 — 2026"
    },
    {
      title: "1st Rank in Academic Cohort",
      category: "Academic Excellence",
      highlight: "CGPA 8.5 / 10",
      description: "Ranked #1 across academic semesters in B.Tech Data Science at Teerthanker Mahaveer University with an overall CGPA of 8.5/10.",
      year: "2023 — Present"
    }
  ],

  dsa: {
    count: "850+",
    language: "Python",
    description: "Every problem solved natively in Python with clean time and space complexity analysis. Spanning dynamic programming, graphs, trees, search algorithms, and math.",
    domains: [
      { name: "Binary Trees & Graphs", problems: "DFS, BFS, Dijkstra, Tree Traversals" },
      { name: "Dynamic Programming", problems: "1D/2D Memoization, Knapsack, Subsequences" },
      { name: "Arrays & Two Pointers", problems: "Sliding Window, Binary Search, Intervals" },
      { name: "Hash Maps & Strings", problems: "Substrings, Pattern Matching, Frequency" }
    ],
    githubUrl: "https://github.com/mohdshamii/PyDSA",
    leetcodeUrl: "https://leetcode.com/u/mohdshamii"
  }
};
