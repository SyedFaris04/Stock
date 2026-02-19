
import React from 'react';
import { STOCKS, TRANSFORMER_PERFORMANCE } from '../constants';
import SummaryCard from '../components/SummaryCard';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DollarSign, Activity, Zap, BarChart } from 'lucide-react';

const Dashboard: React.FC = () => {
  const portfolioData = [
    { name: 'NVDA', value: 30 },
    { name: 'TSLA', value: 25 },
    { name: 'MSFT', value: 20 },
    { name: 'AAPL', value: 15 },
    { name: 'Others', value: 10 },
  ];
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#475569'];

  const marketData = [
    { name: 'Mon', value: 5120 },
    { name: 'Tue', value: 5180 },
    { name: 'Wed', value: 5150 },
    { name: 'Thu', value: 5240 },
    { name: 'Fri', value: 5310 },
  ];

  const bestStock = STOCKS.reduce((prev, current) => (prev.change > current.change) ? prev : current);

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">System Overview</h2>
        <p className="text-slate-400 text-sm lg:text-base">Real-time quantitative signals and sentiment aggregation.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <SummaryCard 
          title="Best Performer (Wk)" 
          value={bestStock.ticker} 
          subtitle={`${bestStock.name}`}
          trend={{ value: bestStock.change, isUp: bestStock.change > 0 }}
          icon={<Zap className="w-5 h-5" />}
        />
        <SummaryCard 
          title="Avg Confidence" 
          value="82.4%" 
          subtitle="Model Consensus Score"
          trend={{ value: 3.2, isUp: true }}
          icon={<Activity className="w-5 h-5" />}
        />
        <SummaryCard 
          title="Sharpe Ratio" 
          value={TRANSFORMER_PERFORMANCE.sharpeRatio} 
          subtitle="Transformer+LSTM Strategy"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <SummaryCard 
          title="Max Drawdown" 
          value={`${TRANSFORMER_PERFORMANCE.maxDrawdown}%`} 
          subtitle="System High-Water Mark"
          icon={<BarChart className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/50 p-4 lg:p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Market Benchmark (S&P 500)</h3>
          <div className="h-[250px] lg:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/50 p-4 lg:p-6 rounded-2xl flex flex-col items-center">
          <h3 className="text-lg font-semibold text-white mb-6 w-full text-left">Allocation</h3>
          <div className="h-[200px] lg:h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full space-y-2.5 mt-4">
            {portfolioData.map((entry, index) => (
              <div key={entry.name} className="flex justify-between items-center text-xs lg:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-slate-400">{entry.name}</span>
                </div>
                <span className="text-white font-semibold">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 lg:p-6 border-b border-slate-700/50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Live Model Feed</h3>
          <span className="hidden sm:block text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded font-bold uppercase tracking-wider">Updates Real-time</span>
        </div>
        <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-slate-700/20 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Ticker</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Sentiment</th>
                <th className="px-6 py-4">Signal</th>
                <th className="px-6 py-4 text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {STOCKS.slice(0, 5).map((stock) => (
                <tr key={stock.ticker} className="hover:bg-slate-700/10 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-white font-bold mono group-hover:text-blue-400 transition-colors">{stock.ticker}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{stock.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white font-medium mono">${stock.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-16 bg-slate-700 rounded-full overflow-hidden shrink-0">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500" 
                          style={{ width: `${stock.sentimentScore * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{(stock.sentimentScore * 100).toFixed(0)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-tighter ${
                      stock.prediction === 'Buy' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      stock.prediction === 'Avoid' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                      'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {stock.prediction}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap text-slate-300 font-medium">{(stock.confidence * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
