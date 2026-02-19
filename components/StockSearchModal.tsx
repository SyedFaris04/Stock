
import React, { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, BookOpen, Brain, DollarSign, Loader2, ExternalLink } from 'lucide-react';
import Markdown from 'react-markdown';
import { getStockAnalysis } from '../services/geminiService';

interface StockSearchModalProps {
  ticker: string;
  onClose: () => void;
}

const StockSearchModal: React.FC<StockSearchModalProps> = ({ ticker, onClose }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsLoading(true);
      const data = await getStockAnalysis(ticker);
      setAnalysis(data);
      setIsLoading(false);
    };
    fetchAnalysis();
  }, [ticker]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{ticker}</h2>
              <p className="text-slate-400 text-sm font-medium">Real-time Intelligence Analysis</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              <p className="text-slate-400 font-medium animate-pulse">Consulting SyedQuant Intelligence Models...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                    <Brain className="w-3 h-3" />
                    <span>AI Confidence</span>
                  </div>
                  <p className="text-xl font-bold text-white">84.2%</p>
                </div>
                <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                    <DollarSign className="w-3 h-3" />
                    <span>Target Price</span>
                  </div>
                  <p className="text-xl font-bold text-emerald-500">$---.--</p>
                </div>
                <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                    <BookOpen className="w-3 h-3" />
                    <span>Risk Level</span>
                  </div>
                  <p className="text-xl font-bold text-amber-500">Moderate</p>
                </div>
              </div>

              {/* Analysis Content */}
              <div className="prose prose-invert max-w-none">
                <div className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6">
                  <div className="markdown-body">
                    <Markdown>{analysis}</Markdown>
                  </div>
                </div>
              </div>

              {/* Engagement Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-95">
                  <DollarSign className="w-5 h-5" />
                  Execute Buy Order
                </button>
                <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-2 active:scale-95">
                  <BookOpen className="w-5 h-5" />
                  Add to Watchlist
                </button>
              </div>

              <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                   <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-indigo-300">Learn more about {ticker}</h4>
                  <p className="text-xs text-slate-500 mt-1">Access our deep-dive research reports and institutional-grade data for this asset.</p>
                  <button className="text-xs text-indigo-400 font-bold mt-2 hover:underline">View Full Report</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockSearchModal;
