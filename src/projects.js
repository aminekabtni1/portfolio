import { assetUrl } from './assetUrl';
export const PROJECTS = [
  {
    id: '02', title: 'Syndata Studio — Synthetic Data Generation Engine',
    category: 'GENERATIVE MODELING & DATA PRIVACY', status: 'LIVE APPLICATION',
    description: 'A synthetic data generation engine built around Gaussian Copula modeling and configurable differential privacy mechanisms, featuring statistical quality evaluation, re-identification risk assessment, and machine learning utility benchmarking.',
    technologies: ['Gaussian Copula', 'Differential Privacy', 'Laplace Mechanism', 'Statistical Modeling', 'TSTR Evaluation'],
    liveUrl: 'https://project16-kappa.vercel.app/', githubUrl: null,
    previewType: 'iframe', fallbackImage: assetUrl('previews/syndata.png'), featured: true,
  },
  {
    id: '01', title: 'Visual Analytics Platform for Market Basket & Customer Pattern Mining',
    category: 'BUSINESS INTELLIGENCE & DATA MINING', status: 'LIVE APPLICATION',
    description: 'An interactive retail intelligence platform combining association rule mining, customer segmentation, and anomaly detection to uncover actionable business insights through connected visual analytics and traceable mining results.',
    technologies: ['FP-Growth', 'RFM & K-Means', 'Isolation Forest', 'PCA', 'Plotly', 'SQL'],
    liveUrl: 'https://visual-analytics-platform.vercel.app/', githubUrl: null,
    previewType: 'iframe', fallbackImage: assetUrl('previews/analytics.png'), featured: true,
  },
  {
    id: '03', title: '3AMAL — AI-Powered Career Platform',
    category: 'GENERATIVE AI & CAREER TECHNOLOGY', status: 'LIVE APPLICATION',
    description: 'An AI-powered career development platform designed for Africa and the MENA region, integrating automated CV optimization, ATS scoring, AI-driven mock interviews with audio analysis, intelligent job matching, and multimodal candidate profile assessment.',
    technologies: ['Generative AI', 'NLP', 'ATS Scoring', 'Audio Analysis', 'Intelligent Job Matching', 'Multimodal AI'],
    liveUrl: 'https://utopia-career-growth.vercel.app/', githubUrl: null,
    previewType: 'iframe', fallbackImage: assetUrl('previews/3amal.jpg'), featured: true,
  },
];

