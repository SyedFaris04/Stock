
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white">System Overview</h2>
        <p className="text-slate-400">Real-time quantitative signals and sentiment aggregation.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Market Benchmark (S&P 500)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl flex flex-col items-center">
          <h3 className="text-lg font-semibold text-white mb-6 w-full">Current Allocation</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full space-y-2 mt-4">
            {portfolioData.map((entry, index) => (
              <div key={entry.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-slate-300">{entry.name}</span>
                </div>
                <span className="text-white font-semibold">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-white">Live Model Feed</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-700/30 text-slate-400 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Ticker</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Sentiment</th>
              <th className="px-6 py-4">Signal</th>
              <th className="px-6 py-4">Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {STOCKS.slice(0, 5).map((stock) => (
              <tr key={stock.ticker} className="hover:bg-slate-700/20 transition-colors cursor-pointer group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-white font-bold mono group-hover:text-blue-400 transition-colors">{stock.ticker}</span>
                    <span className="text-xs text-slate-500">{stock.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-white mono">${stock.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 w-16 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${stock.sentimentScore * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-400">{(stock.sentimentScore * 100).toFixed(0)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    stock.prediction === 'Buy' ? 'bg-emerald-500/10 text-emerald-500' :
                    stock.prediction === 'Avoid' ? 'bg-rose-500/10 text-rose-500' :
                    'bg-slate-500/10 text-slate-400'
                  }`}>
                    {stock.prediction}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-300">{(stock.confidence * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
