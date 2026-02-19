
import React from 'react';
import { Settings as SettingsIcon, Bell, Monitor, Database, Cpu, Globe, Zap, Moon } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Terminal Settings</h1>
        <p className="text-slate-400 mt-1">Customize your quantitative environment and data pipelines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Sidebar for Settings */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { icon: Monitor, label: 'Appearance', active: true },
            { icon: Bell, label: 'Notifications', active: false },
            { icon: Database, label: 'Data Sources', active: false },
            { icon: Cpu, label: 'Model Config', active: false },
            { icon: Globe, label: 'API Access', active: false },
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${item.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <item.icon size={20} />
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <Monitor className="text-blue-500" size={24} />
              Display & Interface
            </h3>

            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Theme Mode</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-2 border-blue-600 bg-slate-800 p-4 rounded-2xl text-center cursor-pointer">
                    <Moon className="mx-auto mb-2 text-blue-500" size={20} />
                    <span className="text-xs font-bold text-white">Dark</span>
                  </div>
                  <div className="border border-slate-800 bg-slate-900 p-4 rounded-2xl text-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                    <Zap className="mx-auto mb-2 text-slate-500" size={20} />
                    <span className="text-xs font-bold text-slate-400">High Contrast</span>
                  </div>
                  <div className="border border-slate-800 bg-slate-900 p-4 rounded-2xl text-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                    <Zap className="mx-auto mb-2 text-slate-500" size={20} />
                    <span className="text-xs font-bold text-slate-400">Terminal</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Data Refresh Rate</p>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                  <option>Real-time (Streaming)</option>
                  <option>Every 5 seconds</option>
                  <option>Every 1 minute</option>
                  <option>Manual only</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Show Sentiment Overlay</p>
                  <p className="text-xs text-slate-500">Display sentiment scores directly on price charts.</p>
                </div>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Compact Sidebar</p>
                  <p className="text-xs text-slate-500">Minimize the sidebar for more workspace.</p>
                </div>
                <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <Database className="text-indigo-500" size={24} />
              Data Pipeline Configuration
            </h3>
            
            <div className="space-y-6">
              <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-indigo-300">FinBERT Sentiment Model</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">Optimized</span>
                </div>
                <p className="text-xs text-slate-500">Currently using v2.4.1 for news and social media processing. Expected latency: 120ms.</p>
              </div>

              <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-white">Historical Data Backfill</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-700 text-slate-400 px-2 py-1 rounded">5 Years</span>
                </div>
                <input type="range" className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-400 hover:text-white transition-colors">Reset Defaults</button>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-95">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
