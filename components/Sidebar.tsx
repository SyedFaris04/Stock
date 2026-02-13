
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
    <div className={`fixed inset-y-0 left-0 z-[60] w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">SyedQuant</h1>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Syed Tech Partner</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-white lg:hidden">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  onNavigate(item.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  currentPage === item.id 
                    ? 'bg-blue-600/10 text-blue-400 font-semibold border-l-4 border-blue-600 shadow-lg shadow-blue-500/10' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="bg-slate-800/50 p-4 rounded-2xl">
          <p className="text-xs text-slate-500 mb-1">Syed Intelligence</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-medium text-slate-300">Models Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
