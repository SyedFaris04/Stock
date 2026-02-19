
import React from 'react';
import { Shield, Lock, Key, Smartphone, Eye, EyeOff, AlertTriangle, History, Globe } from 'lucide-react';

const Security: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Security & Privacy</h1>
        <p className="text-slate-400 mt-1">Protect your terminal access and manage encryption protocols.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Authentication Section */}
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Authentication</h3>
                <p className="text-slate-500 text-sm">Manage your password and 2FA settings.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <Key className="text-slate-500" size={20} />
                  <div>
                    <p className="text-sm font-bold text-white">Password</p>
                    <p className="text-xs text-slate-500">Last changed 3 months ago</p>
                  </div>
                </div>
                <button className="text-blue-400 font-bold text-xs hover:text-blue-300 transition-colors">Change</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <Smartphone className="text-slate-500" size={20} />
                  <div>
                    <p className="text-sm font-bold text-white">Two-Factor Auth</p>
                    <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest">Enabled</p>
                  </div>
                </div>
                <button className="text-slate-400 font-bold text-xs hover:text-white transition-colors">Manage</button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Risk Management</h3>
                <p className="text-slate-500 text-sm">Configure security alerts and thresholds.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Login Alert Notifications</span>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Unrecognized Device Block</span>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">API Key Rotation (30 days)</span>
                <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                <History size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                <p className="text-slate-500 text-sm">Monitor your terminal's access logs.</p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { device: 'MacBook Pro 16"', location: 'Kuala Lumpur, MY', time: 'Just now', status: 'Active' },
                { device: 'iPhone 15 Pro', location: 'Kuala Lumpur, MY', time: '2 hours ago', status: 'Inactive' },
                { device: 'Chrome on Windows', location: 'Singapore, SG', time: 'Yesterday', status: 'Inactive' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                  <div className="flex items-center gap-4">
                    <Globe className="text-slate-600" size={18} />
                    <div>
                      <p className="text-sm font-bold text-white">{log.device}</p>
                      <p className="text-xs text-slate-500">{log.location} • {log.time}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${log.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-500'}`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-slate-500 hover:text-white text-xs font-bold transition-colors">View All Activity Logs</button>
          </div>

          <div className="bg-rose-500/5 border border-rose-500/10 rounded-3xl p-8">
            <h3 className="text-lg font-bold text-rose-500 mb-2">Danger Zone</h3>
            <p className="text-slate-500 text-sm mb-6">Permanently delete your account and all associated quantitative data. This action is irreversible.</p>
            <button className="bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 px-6 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
