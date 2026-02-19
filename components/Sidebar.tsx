
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { Page } from '../types';
import { TrendingUp, X } from 'lucide-react';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onClose: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onClose, isOpen }) => {
  return (
    <div className={`fixed lg:static inset-y-0 left-0 z-[60] w-64 lg:w-72 bg-[#0f172a] border-r border-slate-800/60 flex flex-col h-full transform transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0 shadow-2xl shadow-blue-500/10' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="p-6 lg:p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
            <TrendingUp className="text-white w-5 h-5 lg:w-6 lg:h-6" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-white tracking-tighter">SyedQuant</h1>
            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest leading-none">Intelligence Hub</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 text-slate-500 hover:text-white lg:hidden active:scale-90 transition-transform">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-4 overflow-y-auto custom-scrollbar">
        <ul className="space-y-1.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  onNavigate(item.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  currentPage === item.id 
                    ? 'bg-blue-600/10 text-blue-400 font-bold border border-blue-600/20 shadow-lg shadow-blue-500/5' 
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              >
                <span className={`transition-transform duration-300 group-hover:scale-110 ${currentPage === item.id ? 'text-blue-500' : 'text-slate-500 group-hover:text-blue-400'}`}>
                  {item.icon}
                </span>
                <span className="text-sm tracking-tight">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-slate-800/60">
        <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-xs font-bold text-slate-300 tracking-tight">V3 Core Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
