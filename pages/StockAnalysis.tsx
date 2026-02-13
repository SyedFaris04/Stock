
import React, { useState, useEffect } from 'react';
import { STOCKS, generateHistory } from '../constants';
import { StockInfo, StockDataPoint } from '../types';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getFinancialInsight } from '../services/geminiService';
import { ChevronDown, Info, Brain, Zap } from 'lucide-react';

const StockAnalysis: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<StockInfo>(STOCKS[0]);
  const [history, setHistory] = useState<StockDataPoint[]>([]);
  const [insight, setInsight] = useState<string>('Loading AI analysis...');

  useEffect(() => {
    const data = generateHistory(selectedStock.price, selectedStock.sentimentScore);
    setHistory(data);
    
    // Fetch AI insight when stock changes
    setInsight('Analyzing latest market patterns and sentiment for ' + selectedStock.ticker + '...');
    getFinancialInsight(selectedStock.ticker, selectedStock.sentimentScore, selectedStock.prediction).then(setInsight);
  }, [selectedStock]);

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-4">
            Analysis: <span className="text-blue-500 mono">{selectedStock.ticker}</span>
          </h2>
          <p className="text-slate-400">{selectedStock.name} — Technical & Sentiment deep dive</p>
        </div>
        <div className="relative group">
          <select 
            value={selectedStock.ticker}
            onChange={(e) => setSelectedStock(STOCKS.find(s => s.ticker === e.target.value) || STOCKS[0])}
            className="appearance-none bg-slate-800 border border-slate-700 text-white px-6 py-3 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold"
          >
            {STOCKS.map(s => <option key={s.ticker} value={s.ticker}>{s.name} ({s.ticker})</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Price Action & RSI</h3>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">Price</span>
              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/30">RSI</span>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis yAxisId="left" stroke="#94a3b8" domain={['auto', 'auto']} />
                <YAxis yAxisId="right" orientation="right" stroke="#a855f7" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                />
                <Area yAxisId="left" type="monotone" dataKey="close" stroke="#3b82f6" fillOpacity={1} fill="url(#colorClose)" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="rsi" stroke="#a855f7" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <Brain className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">AI Analyst</h3>
            </div>
            <div className="p-4 bg-blue-500/5 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "{insight}"
              </p>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-emerald-400">
              <Zap className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">Model Metrics</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Confidence</span>
                <span className="text-white font-bold mono">{(selectedStock.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Target (5D)</span>
                <span className="text-emerald-500 font-bold mono">+${(selectedStock.price * 0.04).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Volatility (20D)</span>
                <span className="text-amber-500 font-bold mono">Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Sentiment Correlation (Daily)</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                />
                <Bar dataKey="newsSent" fill="#3b82f6" radius={[4, 4, 0, 0]} name="News Sentiment" />
                <Bar dataKey="redditSent" fill="#ec4899" radius={[4, 4, 0, 0]} name="Social Sentiment" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4 text-slate-400">
            <Info className="w-4 h-4" />
            <h3 className="text-lg font-semibold text-white">Sentiment Variance</h3>
          </div>
          <p className="text-sm text-slate-400 mb-6">Comparing news outlet tone vs Reddit community volatility for {selectedStock.ticker}.</p>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                <Line type="step" dataKey="sentiment" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis;
