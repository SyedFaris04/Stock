
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
    
    setInsight('Analyzing latest market patterns and sentiment for ' + selectedStock.ticker + '...');
    getFinancialInsight(selectedStock.ticker, selectedStock.sentimentScore, selectedStock.prediction).then(setInsight);
  }, [selectedStock]);

  return (
    <div className="space-y-6 lg:space-y-8 animate-in slide-in-from-right duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
            Analysis: <span className="text-blue-500 mono">{selectedStock.ticker}</span>
          </h2>
          <p className="text-slate-400 text-sm">{selectedStock.name} — Technical & Sentiment deep dive</p>
        </div>
        <div className="relative group w-full sm:w-auto">
          <select 
            value={selectedStock.ticker}
            onChange={(e) => setSelectedStock(STOCKS.find(s => s.ticker === e.target.value) || STOCKS[0])}
            className="w-full sm:w-64 appearance-none bg-slate-800 border border-slate-700 text-white px-5 py-2.5 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-semibold text-sm"
          >
            {STOCKS.map(s => <option key={s.ticker} value={s.ticker}>{s.name} ({s.ticker})</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-slate-800/40 border border-slate-700/50 p-4 lg:p-6 rounded-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <h3 className="text-lg font-semibold text-white">Price Action & RSI</h3>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold px-2 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20 uppercase tracking-wider">Price</span>
              <span className="text-[10px] font-bold px-2 py-1 bg-purple-500/10 text-purple-400 rounded border border-purple-500/20 uppercase tracking-wider">RSI</span>
            </div>
          </div>
          <div className="h-[300px] lg:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickFormatter={(val) => val.split('-').slice(1).join('/')} dy={10} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={10} domain={['auto', 'auto']} axisLine={false} tickLine={false} dx={-10} />
                <YAxis yAxisId="right" orientation="right" stroke="#a855f7" fontSize={10} domain={[0, 100]} axisLine={false} tickLine={false} dx={10} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }} />
                <Area yAxisId="left" type="monotone" dataKey="close" stroke="#3b82f6" fillOpacity={1} fill="url(#colorClose)" strokeWidth={3} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="rsi" stroke="#a855f7" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl flex-1">
            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <Brain className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">AI Analyst</h3>
            </div>
            <div className="p-4 bg-slate-900/40 border border-slate-700/50 rounded-xl">
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
              <div className="flex justify-between items-center border-b border-slate-700/50 pb-2">
                <span className="text-slate-400 text-xs font-medium">Confidence</span>
                <span className="text-white font-bold mono">{(selectedStock.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700/50 pb-2">
                <span className="text-slate-400 text-xs font-medium">Target (5D)</span>
                <span className="text-emerald-500 font-bold mono">+${(selectedStock.price * 0.04).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs font-medium">Volatility</span>
                <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">Stable</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/40 border border-slate-700/50 p-4 lg:p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Sentiment Correlation</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} hide />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
                <Bar dataKey="newsSent" fill="#3b82f6" radius={[4, 4, 0, 0]} name="News" />
                <Bar dataKey="redditSent" fill="#ec4899" radius={[4, 4, 0, 0]} name="Social" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/50 p-4 lg:p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4 text-slate-400">
            <Info className="w-4 h-4" />
            <h3 className="text-lg font-semibold text-white">Sentiment Variance</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} hide />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
                <Line type="stepAfter" dataKey="sentiment" stroke="#10b981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis;
