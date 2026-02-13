
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw, Play, Save, ChevronRight, Settings2 } from 'lucide-react';

const Backtesting: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [params, setParams] = useState({
    model: 'Transformer',
    topN: 5,
    rebalance: 'Weekly',
    cost: 0.1,
    period: '3 Years'
  });

  const [simData, setSimData] = useState(Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i}`,
    equity: 10000 + (Math.random() - 0.4) * 200 * i
  })));

  const handleRun = () => {
    setIsSimulating(true);
    // Simulate API delay
    setTimeout(() => {
      const newSim = Array.from({ length: 30 }, (_, i) => ({
        date: `Day ${i}`,
        equity: 10000 + (Math.random() - 0.4) * 500 * (params.model === 'Transformer' ? 1.2 : 1) * i
      }));
      setSimData(newSim);
      setIsSimulating(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Backtesting Simulator</h2>
          <p className="text-slate-400">Test hypotheses against historical sentiment environments.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 border border-slate-700 transition-colors">
            <Save className="w-4 h-4" /> Save Strategy
          </button>
          <button 
            onClick={handleRun}
            disabled={isSimulating}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-all disabled:opacity-50"
          >
            {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            {isSimulating ? 'Processing...' : 'Run Simulation'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl h-fit">
          <div className="flex items-center gap-2 mb-6 text-slate-300">
            <Settings2 className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Parameters</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-xs text-slate-500 font-bold uppercase block mb-2">Model Selection</label>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white outline-none focus:ring-1 focus:ring-blue-500"
                value={params.model}
                onChange={(e) => setParams({...params, model: e.target.value})}
              >
                <option>Transformer+LSTM</option>
                <option>XGBoost</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 font-bold uppercase block mb-2">Portfolio Size (Top N)</label>
              <input 
                type="range" min="1" max="10" step="1" 
                className="w-full accent-blue-500 bg-slate-700 h-2 rounded-lg"
                value={params.topN}
                onChange={(e) => setParams({...params, topN: Number(e.target.value)})}
              />
              <div className="flex justify-between mt-2 text-xs text-slate-400">
                <span>1 stock</span>
                <span className="text-white font-bold">{params.topN} stocks</span>
                <span>10 stocks</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-500 font-bold uppercase block mb-2">Rebalance Frequency</label>
              <div className="grid grid-cols-2 gap-2">
                {['Daily', 'Weekly', 'Monthly', 'Quarterly'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setParams({...params, rebalance: f})}
                    className={`text-xs p-2 rounded border ${params.rebalance === f ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-500 font-bold uppercase block mb-2">Transaction Cost</label>
              <div className="flex items-center gap-2">
                 <input 
                    type="number" 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-sm"
                    value={params.cost}
                    onChange={(e) => setParams({...params, cost: Number(e.target.value)})}
                  />
                  <span className="text-slate-500">%</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-8">
          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-8">Simulation Results: Portfolio Growth</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simData}>
                  <defs>
                    <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="equity" stroke="#10b981" fillOpacity={1} fill="url(#colorEquity)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total Return</p>
              <p className="text-2xl font-bold text-emerald-500">+14.2%</p>
              <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-500">
                Over Benchmark <ChevronRight className="w-3 h-3" /> <span className="text-emerald-500">+3.1%</span>
              </div>
            </div>
            <div className="p-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Max Drawdown</p>
              <p className="text-2xl font-bold text-rose-500">-8.42%</p>
              <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-500">
                Peak: Day 12 <ChevronRight className="w-3 h-3" /> Trough: Day 18
              </div>
            </div>
            <div className="p-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Portfolio Turnover</p>
              <p className="text-2xl font-bold text-blue-500">12.4%</p>
              <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-500">
                Effective Rebalancing <ChevronRight className="w-3 h-3" /> Monthly avg
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backtesting;
