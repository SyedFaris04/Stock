
import React from 'react';
import { TRANSFORMER_PERFORMANCE, XGBOOST_PERFORMANCE } from '../constants';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Scale, Cpu, Target, ShieldCheck } from 'lucide-react';

const ModelComparison: React.FC = () => {
  const radarData = [
    { subject: 'Accuracy', T: TRANSFORMER_PERFORMANCE.accuracy * 100, X: XGBOOST_PERFORMANCE.accuracy * 100 },
    { subject: 'Sharpe', T: TRANSFORMER_PERFORMANCE.sharpeRatio * 40, X: XGBOOST_PERFORMANCE.sharpeRatio * 40 },
    { subject: 'Stability', T: 85, X: 72 },
    { subject: 'Speed', T: 40, X: 95 },
    { subject: 'Win Rate', T: TRANSFORMER_PERFORMANCE.winRate * 100, X: XGBOOST_PERFORMANCE.winRate * 100 },
    { subject: 'Complexity', T: 98, X: 30 },
  ];

  const equityCurve = Array.from({ length: 20 }, (_, i) => ({
    name: `Wk ${i+1}`,
    Transformer: 100 + i * (Math.random() * 8 + 2),
    XGBoost: 100 + i * (Math.random() * 6 + 1),
    Benchmark: 100 + i * (Math.random() * 4 + 0.5),
  }));

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white">Model Benchmarking</h2>
        <p className="text-slate-400">Evaluating Transformer+LSTM vs XGBoost on 10 years of sentiment data.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <Scale className="text-blue-500" /> Statistical Footprint
          </h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={12} />
                <PolarRadiusAxis stroke="#334155" angle={30} domain={[0, 100]} />
                <Radar name="Transformer+LSTM" dataKey="T" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Radar name="XGBoost Baseline" dataKey="X" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-2xl">
             <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Cpu className="text-purple-500" /> Architectural Breakdown
            </h3>
            <div className="space-y-6">
              <div className="p-4 bg-slate-700/20 rounded-xl border border-slate-700/50">
                <h4 className="font-bold text-blue-400 mb-2">Transformer + LSTM</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dual-layered architecture. Transformer Encoder extracts global sentiment attention features, while LSTM captures sequential temporal dependencies. High computational cost but superior feature extraction.
                </p>
              </div>
              <div className="p-4 bg-slate-700/20 rounded-xl border border-slate-700/50">
                <h4 className="font-bold text-amber-500 mb-2">XGBoost Regressor</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Gradient boosted decision trees. Excellent for tabular features and non-linear relationships. Extremely fast and interpretability-friendly via SHAP values. Highly effective as a quant baseline.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl flex items-center gap-4">
               <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500">
                 <Target className="w-6 h-6" />
               </div>
               <div>
                 <p className="text-xs text-slate-400">Best Accuracy</p>
                 <p className="text-xl font-bold text-white">68.2%</p>
               </div>
             </div>
             <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl flex items-center gap-4">
               <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                 <ShieldCheck className="w-6 h-6" />
               </div>
               <div>
                 <p className="text-xs text-slate-400">Best Sharpe</p>
                 <p className="text-xl font-bold text-white">2.14</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-8">Out-of-Sample Backtest Comparison</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={equityCurve}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="Transformer" stroke="#3b82f6" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="XGBoost" stroke="#f59e0b" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="Benchmark" stroke="#475569" strokeWidth={1} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;
