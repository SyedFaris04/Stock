
import React, { useState, useRef, useEffect } from 'react';
import { Page } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StockAnalysis from './pages/StockAnalysis';
import ModelComparison from './pages/ModelComparison';
import Backtesting from './pages/Backtesting';
import SentimentExplorer from './pages/SentimentExplorer';
import PredictionCenter from './pages/PredictionCenter';
import Education from './pages/Education';
import Portfolio from './pages/Portfolio';
import { Bell, Search, User, Menu, ChevronDown, LogOut, Settings, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.DASHBOARD: return <Dashboard />;
      case Page.PORTFOLIO: return <Portfolio />;
      case Page.STOCK_ANALYSIS: return <StockAnalysis />;
      case Page.MODEL_COMPARISON: return <ModelComparison />;
      case Page.BACKTESTING: return <Backtesting />;
      case Page.SENTIMENT_EXPLORER: return <SentimentExplorer />;
      case Page.PREDICTION_CENTER: return <PredictionCenter />;
      case Page.EDUCATION: return <Education />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a]">
      {/* Sidebar - Transition based on visibility */}
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Header */}
        <header className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4 lg:gap-8 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl hover:text-white transition-all shadow-lg shadow-black/20 group"
            >
              <Menu className={`w-5 h-5 transition-transform ${isSidebarOpen ? 'rotate-90' : ''}`} />
            </button>
            
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search sentiment, symbols, or signals..." 
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-2.5 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 ml-8">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors hidden sm:block">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-900"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-800 hidden sm:block"></div>
            
            <div className="relative" ref={userMenuRef}>
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Syed Faris</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Premium Partner</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 border-2 border-slate-800 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
                  SF
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 animate-in slide-in-from-top-2 duration-200">
                   <div className="px-4 py-3 border-b border-slate-800">
                     <p className="text-xs font-bold text-slate-500 uppercase mb-1">Signed in as</p>
                     <p className="text-sm text-white font-bold truncate">syed.faris@techpartner.com</p>
                   </div>
                   <div className="py-2">
                     <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                       <User size={16} /> My Profile
                     </button>
                     <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                       <Shield size={16} /> Security Settings
                     </button>
                     <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                       <Settings size={16} /> Preferences
                     </button>
                   </div>
                   <div className="border-t border-slate-800 pt-2 pb-1">
                     <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors">
                       <LogOut size={16} /> Log Out
                     </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className={`flex-1 overflow-y-auto p-8 max-w-[1600px] mx-auto w-full transition-opacity duration-300 ${isSidebarOpen && window.innerWidth < 1024 ? 'opacity-30' : 'opacity-100'}`}>
          {renderPage()}
          
          <footer className="mt-20 py-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-slate-500 text-[10px] uppercase font-bold tracking-widest gap-4">
            <p>© 2024 SyedQuant Systems — Synergy with Syed Technologies</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-400 transition-colors">Documentation</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Advanced API</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Risk Protocol</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
