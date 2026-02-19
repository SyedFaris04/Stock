
import React from 'react';
import { LayoutDashboard, TrendingUp, BarChart3, FlaskConical, MessageSquare, BrainCircuit, GraduationCap, Briefcase, Terminal, User, Shield, Settings } from 'lucide-react';
import { Page, StockInfo, ModelPerformance } from './types';

export const NAV_ITEMS = [
  { id: Page.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: Page.PORTFOLIO, label: 'My Portfolio', icon: <Briefcase className="w-5 h-5" /> },
  { id: Page.STOCK_ANALYSIS, label: 'Stock Analysis', icon: <TrendingUp className="w-5 h-5" /> },
  { id: Page.MODEL_COMPARISON, label: 'Model Benchmarking', icon: <BarChart3 className="w-5 h-5" /> },
  { id: Page.BACKTESTING, label: 'Backtesting Sim', icon: <FlaskConical className="w-5 h-5" /> },
  { id: Page.SENTIMENT_EXPLORER, label: 'Sentiment Explorer', icon: <MessageSquare className="w-5 h-5" /> },
  { id: Page.PREDICTION_CENTER, label: 'Prediction Center', icon: <BrainCircuit className="w-5 h-5" /> },
  { id: Page.PIPELINE, label: 'Research Lab', icon: <Terminal className="w-5 h-5" /> },
  { id: Page.EDUCATION, label: 'Learn Quant', icon: <GraduationCap className="w-5 h-5" /> },
];

export const ACCOUNT_ITEMS = [
  { id: Page.PROFILE, label: 'Profile', icon: <User className="w-5 h-5" /> },
  { id: Page.SECURITY, label: 'Security', icon: <Shield className="w-5 h-5" /> },
  { id: Page.SETTINGS, label: 'Settings', icon: <Settings className="w-5 h-5" /> },
];

export const STOCKS: StockInfo[] = [
  { ticker: 'NVDA', name: 'NVIDIA Corp', price: 128.45, change: 2.45, sentimentScore: 0.85, prediction: 'Buy', confidence: 0.92 },
  { ticker: 'AAPL', name: 'Apple Inc', price: 215.12, change: -0.52, sentimentScore: 0.45, prediction: 'Neutral', confidence: 0.65 },
  { ticker: 'TSLA', name: 'Tesla Inc', price: 178.50, change: 5.12, sentimentScore: 0.72, prediction: 'Buy', confidence: 0.81 },
  { ticker: 'MSFT', name: 'Microsoft Corp', price: 420.30, change: 0.15, sentimentScore: 0.60, prediction: 'Buy', confidence: 0.74 },
  { ticker: 'AMZN', name: 'Amazon.com Inc', price: 185.20, change: -1.20, sentimentScore: 0.35, prediction: 'Avoid', confidence: 0.58 },
  { ticker: 'GOOGL', name: 'Alphabet Inc', price: 175.40, change: 0.85, sentimentScore: 0.55, prediction: 'Neutral', confidence: 0.62 },
];

export const TRANSFORMER_PERFORMANCE: ModelPerformance = {
  accuracy: 0.68,
  sharpeRatio: 2.1,
  maxDrawdown: -12.4,
  cumulativeReturn: 185.5,
  winRate: 0.56
};

export const XGBOOST_PERFORMANCE: ModelPerformance = {
  accuracy: 0.64,
  sharpeRatio: 1.8,
  maxDrawdown: -15.2,
  cumulativeReturn: 142.0,
  winRate: 0.54
};

// Generates 30 days of mock data
export const generateHistory = (basePrice: number, sentimentSeed: number) => {
  const data = [];
  let currentPrice = basePrice;
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const change = (Math.random() - 0.48) * (basePrice * 0.03);
    currentPrice += change;
    
    data.push({
      date: dateStr,
      close: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
      sentiment: Number((Math.random() * sentimentSeed).toFixed(2)),
      newsSent: Number((Math.random() * sentimentSeed * 0.8).toFixed(2)),
      redditSent: Number((Math.random() * sentimentSeed * 1.2).toFixed(2)),
      rsi: 30 + Math.random() * 40,
      macd: (Math.random() - 0.5) * 2,
    });
  }
  return data;
};
