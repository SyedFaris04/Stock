
import React, { useState, useEffect } from 'react';
import { STOCKS } from '../constants';
import { PortfolioItem } from '../types';
import SummaryCard from '../components/SummaryCard';
import { Plus, Trash2, TrendingUp, TrendingDown, Info, DollarSign, PieChart } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('syedquant_portfolio');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTicker, setNewTicker] = useState('NVDA');
  const [newQty, setNewQty] = useState(1);
  const [newPrice, setNewPrice] = useState(0);

  useEffect(() => {
    localStorage.setItem('syedquant_portfolio', JSON.stringify(items));
  }, [items]);

  const handleAdd = () => {
    const stock = STOCKS.find(s => s.ticker === newTicker);
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      ticker: newTicker,
      quantity: newQty,
      avgPrice: newPrice || (stock ? stock.price : 0),
    };
    setItems([...items, newItem]);
  };

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateStats = () => {
    let totalCost = 0;
    let currentValue = 0;
    items.forEach(item => {
      const live = STOCKS.find(s => s.ticker === item.ticker);
      totalCost += item.quantity * item.avgPrice;
      currentValue += item.quantity * (live ? live.price : item.avgPrice);
    });
    const gain = currentValue - totalCost;
    const gainPct = totalCost > 0 ? (gain / totalCost) * 100 : 0;
    return { totalCost, currentValue, gain, gainPct };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">My Portfolio</h2>
          <p className="text-slate-400">Track your holdings and leverage SyedQuant signals for optimal exits.</p>
        </div>
        <div className="flex bg-slate-800/50 p-2 rounded-xl border border-slate-700/50 gap-2 overflow-x-auto">
           <div className="flex flex-col px-4 border-r border-slate-700">
             <span className="text-[10px] text-slate-500 font-bold">CURRENT VALUE</span>
             <span className="text-lg font-bold text-white mono">${stats.currentValue.toLocaleString()}</span>
           </div>
           <div className="flex flex-col px-4">
             <span className="text-[10px] text-slate-500 font-bold">TOTAL GAIN</span>
             <span className={`text-lg font-bold mono ${stats.gain >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
               {stats.gain >= 0 ? '+' : ''}${Math.abs(stats.gain).toLocaleString()} ({stats.gainPct.toFixed(2)}%)
             </span>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Active Holdings</h3>
              <span className="text-xs text-slate-500">{items.length} stocks tracked</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-700/30 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Asset</th>
                    <th className="px-6 py-4 text-right">Qty</th>
                    <th className="px-6 py-4 text-right">Avg Cost</th>
                    <th className="px-6 py-4 text-right">Live Price</th>
                    <th className="px-6 py-4 text-right">PnL</th>
                    <th className="px-6 py-4 text-center">Quant Signal</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {items.map((item) => {
                    const stock = STOCKS.find(s => s.ticker === item.ticker);
                    const cost = item.quantity * item.avgPrice;
                    const value = item.quantity * (stock?.price || 0);
                    const pnl = value - cost;
                    const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
                    
                    return (
                      <tr key={item.id} className="hover:bg-slate-700/20 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-white font-bold mono">{item.ticker}</span>
                            <span className="text-[10px] text-slate-500">{stock?.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-slate-300 mono">{item.quantity}</td>
                        <td className="px-6 py-4 text-right text-slate-300 mono">${item.avgPrice}</td>
                        <td className="px-6 py-4 text-right text-white font-bold mono">${stock?.price || '0.00'}</td>
                        <td className="px-6 py-4 text-right">
                          <div className={`flex items-center justify-end gap-1 font-bold mono ${pnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {pnl >= 0 ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                            {pnlPct.toFixed(1)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase ${
                            stock?.prediction === 'Buy' ? 'bg-emerald-500/10 text-emerald-500' :
                            stock?.prediction === 'Avoid' ? 'bg-rose-500/10 text-rose-500' :
                            'bg-slate-500/10 text-slate-400'
                          }`}>
                            {stock?.prediction || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleRemove(item.id)} className="p-2 text-slate-500 hover:text-rose-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-20 text-center text-slate-500 italic">
                        No stocks in your portfolio. Add one below to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="text-blue-500" /> Add New Asset
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase mb-2 block">Stock Ticker</label>
                <select 
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-1 focus:ring-blue-500"
                  value={newTicker}
                  onChange={(e) => setNewTicker(e.target.value)}
                >
                  {STOCKS.map(s => <option key={s.ticker} value={s.ticker}>{s.ticker} - {s.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase mb-2 block">Quantity</label>
                  <input 
                    type="number"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white mono outline-none focus:ring-1 focus:ring-blue-500"
                    value={newQty}
                    onChange={(e) => setNewQty(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-bold uppercase mb-2 block">Avg Cost ($)</label>
                  <input 
                    type="number"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white mono outline-none focus:ring-1 focus:ring-blue-500"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    placeholder="e.g. 150.25"
                  />
                </div>
              </div>
              <button 
                onClick={handleAdd}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
              >
                Add to Portfolio
              </button>
            </div>
          </div>

          <div className="bg-blue-600/5 border border-blue-500/20 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <Info size={18} />
              <h4 className="font-bold">Exit Strategy Guide</h4>
            </div>
            <ul className="text-xs text-slate-400 space-y-3 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>If Quant Signal is <strong>AVOID</strong>: Consider trimming your position or taking profits immediately.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>If Quant Signal is <strong>NEUTRAL</strong>: Hold your position but monitor sentiment volatility closely.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>If Quant Signal is <strong>BUY</strong>: You are in a strong position. Sentiment suggests further upside.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
