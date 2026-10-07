export interface Profile {
  name: string;
  role: string;
  tagline: string;
  summary: string[];
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
    kaggle?: string;
    huggingface?: string;
  };
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    cgpa: string;
    badge: string;
    details: string;
  }[];
  certifications: {
    title: string;
    issuer: string;
    year: string;
    description: string;
    verifyUrl?: string;
  }[];
  achievements: {
    title: string;
    category: string;
    description: string;
    highlight: string;
    year: string;
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
}

export const profileData: Profile = {
  name: 'MOHD SHAMI',
  role: 'AI/ML Engineer · Machine Learning Engineer · Data Scientist',
  tagline: 'AI/ML Engineer specializing in end-to-end Machine Learning systems, NLP, Deep Learning (CNN), Scikit-learn Pipelines, XGBoost, and production Flask/Docker deployment.',
  summary: [
    'AI/ML Engineer with 1+ year of experience building end-to-end AI and machine learning systems spanning supervised learning, NLP, computer vision, deep learning (CNN), feature engineering, model optimisation, and Flask-based production deployment.',
    'Proficient in Python, Scikit-learn, XGBoost, Random Forest, CNN, TF-IDF, SMOTE, SQL, Docker, and Git. Delivered AI-powered applications achieving up to 97.8% NLP accuracy, improved clinical diagnostic models by 13 percentage points (AUC-ROC: 0.91), and deployed real-time ML inference APIs.',
    'Currently pursuing B.Tech in Data Science at Teerthanker Mahaveer University (Expected 2027) with a cumulative CGPA of 8.5/10. Seeking an AI/ML Engineer, AI Engineer Fresher, or ML Engineer role to build and scale intelligent systems.'
  ],
  location: 'Moradabad, UP, India',
  email: 'codexshami@gmail.com',
  phone: '',
  resumeUrl: 'dist/resume.pdf',
  socials: {
    github: 'https://github.com/mohdshamii',
    linkedin: 'https://linkedin.com/in/mohdshamii',
    leetcode: 'https://leetcode.com/u/mohdshamii',
    kaggle: 'https://kaggle.com/mohdshami',
    huggingface: 'https://huggingface.co/mohdshami'
  },
  education: [
    {
      degree: 'B.Tech in Data Science',
      institution: 'Teerthanker Mahaveer University',
      location: 'Moradabad, UP, India',
      period: '2023 — Expected 2027',
      cgpa: '8.5 / 10.0',
      badge: 'Academic Distinction',
      details: 'Specialization in Data Science, Machine Learning, Deep Neural Architectures, Natural Language Processing, Database Management, and Statistical Inference.'
    }
  ],
  certifications: [
    {
      title: 'Deep Learning & ML with Python',
      issuer: 'Simplilearn',
      year: '2025',
      description: 'Convolutional neural networks (CNNs), transfer learning, and deep neural architectures in PyTorch and TensorFlow.',
      verifyUrl: 'https://linkedin.com/in/mohdshamii'
    },
    {
      title: 'Data Analysis & Problem Solving',
      issuer: 'IBM',
      year: '2026',
      description: 'Enterprise data methodologies, predictive analysis, and statistical decision modeling.',
      verifyUrl: 'https://linkedin.com/in/mohdshamii'
    },
    {
      title: 'Scientific Observation from Space',
      issuer: 'ISRO',
      year: '2026',
      description: 'Satellite imagery processing, remote sensing methodologies, and geospatial data intelligence.',
      verifyUrl: 'https://linkedin.com/in/mohdshamii'
    },
    {
      title: 'Python, SQL & Problem Solving',
      issuer: 'HackerRank',
      year: '2025',
      description: 'Complex query optimization, relational database queries, indexing, and algorithmic problem solving.',
      verifyUrl: 'https://www.hackerrank.com/mohdshamii'
    },
    {
      title: 'Intro to Computer Science',
      issuer: 'IIT Bombay',
      year: '2024',
      description: 'Computational thinking, data structures, algorithm design, and core programming paradigms.',
      verifyUrl: 'https://linkedin.com/in/mohdshamii'
    },
    {
      title: 'Advanced Data Analysis: Excel & Power BI',
      issuer: 'ITM EdTech',
      year: '2025',
      description: 'Business intelligence dashboards, DAX queries, ETL transformation, and executive reporting.',
      verifyUrl: 'https://linkedin.com/in/mohdshamii'
    }
  ],
  achievements: [
    {
      title: 'Smart India Hackathon (SIH)',
      category: 'AI Innovation',
      description: 'Selected for college round with the "Revive" machine learning clinical disease diagnostic system.',
      highlight: 'Selected for College Round',
      year: '2025'
    },
    {
      title: 'India AI Impact Summit',
      category: 'Technical Presentation',
      description: 'Presented applied AI/ML research project on gradient-boosted diagnostic architectures to industry leaders.',
      highlight: 'Industry Presentation',
      year: '2025'
    },
    {
      title: '850+ DSA Problems Solved',
      category: 'Competitive Programming',
      description: 'Solved algorithmic challenges across HackerRank & LeetCode in Python, mastering trees, graphs, dynamic programming, and optimization.',
      highlight: 'Python Problem Solving',
      year: '2025 — 2026'
    },
    {
      title: 'Academic Excellence Scholar',
      category: 'Academic Excellence',
      description: 'Academic distinction across all academic semesters in B.Tech Data Science at TMU with a cumulative CGPA of 8.5/10.',
      highlight: 'CGPA: 8.5 / 10',
      year: '2023 — Present'
    }
  ],
  languages: [
    { language: 'Hindi', proficiency: 'Native' },
    { language: 'English', proficiency: 'Professional Working' },
    { language: 'Urdu', proficiency: 'Conversational' },
    { language: 'Arabic', proficiency: 'Basic' }
  ]
};
