
import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  icon?: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, subtitle, trend, icon }) => {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800/60 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-700/50 rounded-lg text-blue-400">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.isUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
            {trend.isUp ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <h3 className="text-2xl font-bold text-white mono">{value}</h3>
      </div>
      {subtitle && <p className="text-xs text-slate-500 mt-2">{subtitle}</p>}
    </div>
  );
};

export default SummaryCard;
