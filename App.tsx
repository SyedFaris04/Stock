
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
import QuantPipeline from './pages/QuantPipeline';
import Profile from './pages/Profile';
import Security from './pages/Security';
import SettingsPage from './pages/Settings';
import LoginPage from './pages/LoginPage';
import StockSearchModal from './components/StockSearchModal';
import { Bell, Search, User, Menu, ChevronDown, LogOut, Settings, Shield, X } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTicker, setSearchTicker] = useState<string | null>(null);
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

  // Auto-close sidebar on window resize if moving to large screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      case Page.PIPELINE: return <QuantPipeline />;
      case Page.PROFILE: return <Profile />;
      case Page.SECURITY: return <Security />;
      case Page.SETTINGS: return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchTicker(searchQuery.trim().toUpperCase());
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a] selection:bg-blue-500/30">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Modals */}
      {searchTicker && (
        <StockSearchModal ticker={searchTicker} onClose={() => setSearchTicker(null)} />
      )}

      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <header className="h-16 lg:h-20 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/60 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-50 shrink-0">
          <div className="flex items-center gap-3 lg:gap-8 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 lg:hidden bg-slate-800 border border-slate-700 text-slate-300 rounded-xl hover:text-white transition-all shadow-lg active:scale-95"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex-1 max-w-md hidden sm:block">
              <form onSubmit={handleSearch} className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ticker (e.g. AAPL, TSLA)..." 
                  className="w-full bg-slate-800/40 border border-slate-700/50 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                />
              </form>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6 ml-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors hidden xs:block">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-900"></span>
            </button>
            <div className="h-6 w-[1px] bg-slate-800 hidden xs:block"></div>
            
            <div className="relative" ref={userMenuRef}>
              <div 
                className="flex items-center gap-2 lg:gap-3 cursor-pointer group"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Syed Faris</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Partner</p>
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-slate-800 flex items-center justify-center text-white text-xs lg:text-sm font-bold shadow-lg group-hover:scale-105 transition-transform ring-0 group-hover:ring-4 ring-blue-500/10">
                  SF
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''} hidden xs:block`} />
              </div>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 lg:w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                   <div className="px-4 py-3 border-b border-slate-800 lg:hidden">
                     <p className="text-sm text-white font-bold truncate">Syed Faris</p>
                   </div>
                   <div className="py-1">
                     <button 
                       onClick={() => { setCurrentPage(Page.PROFILE); setIsUserMenuOpen(false); }}
                       className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                     >
                       <User size={14} /> Profile
                     </button>
                     <button 
                       onClick={() => { setCurrentPage(Page.SECURITY); setIsUserMenuOpen(false); }}
                       className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                     >
                       <Shield size={14} /> Security
                     </button>
                     <button 
                       onClick={() => { setCurrentPage(Page.SETTINGS); setIsUserMenuOpen(false); }}
                       className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                     >
                       <Settings size={14} /> Settings
                     </button>
                   </div>
                   <div className="border-t border-slate-800 pt-1">
                     <button 
                       onClick={handleLogout}
                       className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors"
                     >
                       <LogOut size={14} /> Log Out
                     </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
            {renderPage()}
            
            <footer className="mt-12 lg:mt-20 py-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px] uppercase font-bold tracking-widest gap-4 text-center md:text-left">
              <p>© 2024 SyedQuant Systems — Synergy with Syed Technologies</p>
              <div className="flex gap-4 lg:gap-6">
                <a href="#" className="hover:text-blue-400 transition-colors">Docs</a>
                <a href="#" className="hover:text-blue-400 transition-colors">API</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
