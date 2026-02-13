
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { MessageCircle, Newspaper, TrendingUp, AlertCircle } from 'lucide-react';

const SentimentExplorer: React.FC = () => {
  const words = [
    { name: 'Bullish', value: 85, color: '#10b981' },
    { name: 'Bearish', value: 45, color: '#ef4444' },
    { name: 'Earnings', value: 70, color: '#3b82f6' },
    { name: 'Growth', value: 65, color: '#8b5cf6' },
    { name: 'Inflation', value: 50, color: '#f59e0b' },
    { name: 'AI', value: 95, color: '#06b6d4' },
    { name: 'Volatile', value: 30, color: '#64748b' },
  ];

  const heatData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    volume: Math.floor(Math.random() * 500) + 100,
    sentiment: (Math.random() - 0.3) * 2
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white">Sentiment Explorer</h2>
        <p className="text-slate-400">Deep dive into multi-source textual signal processing.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/50 p-8 rounded-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white">Trending Discussion Keywords</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <AlertCircle className="w-4 h-4" /> 24h Frequency
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {words.sort((a,b) => b.value - a.value).map((word) => (
              <div 
                key={word.name}
                className="group relative cursor-help"
                style={{ fontSize: `${word.value / 2.5 + 12}px` }}
              >
                <span 
                  className="font-bold transition-all duration-300 hover:brightness-125"
                  style={{ color: word.color }}
                >
                  {word.name}
                </span>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-2 px-3 rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Mention frequency: {word.value}k
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 h-[250px]">
            <h4 className="text-sm font-bold text-slate-400 uppercase mb-4">Volume vs Tone Heatmap</h4>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis dataKey="sentiment" stroke="#94a3b8" label={{ value: 'Sentiment', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                <ZAxis dataKey="volume" range={[100, 1000]} />
                <Tooltip 
                   cursor={{ strokeDasharray: '3 3' }} 
                   contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                />
                <Scatter name="Reddit Volume" data={heatData} fill="#ec4899" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold">r/WallStreetBets Feed</h4>
                <p className="text-xs text-slate-500">Aggregated sentiment flow</p>
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:border-slate-500 transition-colors">
                  <p className="text-xs text-slate-300 font-medium mb-2">"NVDA just printed again, to the moon! 🚀🚀🚀"</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-500">u/diamond_hands</span>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded font-bold">BULLISH</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <Newspaper className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold">News Sentiment Gap</h4>
                <p className="text-xs text-slate-500">Institutional vs Retail bias</p>
              </div>
            </div>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={heatData.slice(0, 5)}>
                   <XAxis dataKey="day" hide />
                   <Bar dataKey="sentiment" radius={[4, 4, 0, 0]} fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-4 italic text-center">News outlets remain 15% more conservative than Reddit communities.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentExplorer;
