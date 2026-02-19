
export interface StockDataPoint {
  date: string;
  close: number;
  volume: number;
  sentiment: number;
  newsSent: number;
  redditSent: number;
  rsi?: number;
  macd?: number;
}

export interface StockInfo {
  ticker: string;
  name: string;
  price: number;
  change: number;
  sentimentScore: number;
  prediction: 'Buy' | 'Neutral' | 'Avoid';
  confidence: number;
}

export interface PortfolioItem {
  id: string;
  ticker: string;
  quantity: number;
  avgPrice: number;
}

export interface ModelPerformance {
  accuracy: number;
  sharpeRatio: number;
  maxDrawdown: number;
  cumulativeReturn: number;
  winRate: number;
}

export interface BacktestResult {
  date: string;
  portfolioValue: number;
  benchmarkValue: number;
}

export enum Page {
  DASHBOARD = 'dashboard',
  STOCK_ANALYSIS = 'stock-analysis',
  MODEL_COMPARISON = 'model-comparison',
  BACKTESTING = 'backtesting',
  SENTIMENT_EXPLORER = 'sentiment-explorer',
  PREDICTION_CENTER = 'prediction-center',
  EDUCATION = 'education',
  PORTFOLIO = 'portfolio',
  PIPELINE = 'pipeline',
  PROFILE = 'profile',
  SECURITY = 'security',
  SETTINGS = 'settings'
}
