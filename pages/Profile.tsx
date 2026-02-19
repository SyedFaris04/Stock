
import React from 'react';
import { User, Mail, MapPin, Briefcase, Calendar, Camera, Edit2 } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">User Profile</h1>
          <p className="text-slate-400 mt-1">Manage your personal information and terminal identity.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95">
          <Edit2 size={16} />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-4 border-slate-800 flex items-center justify-center text-white text-4xl font-bold shadow-2xl mx-auto">
                SF
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-slate-800 border border-slate-700 rounded-full text-blue-400 hover:text-white transition-colors shadow-lg">
                <Camera size={16} />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-white mt-6">Syed Faris</h2>
            <p className="text-blue-400 font-bold text-xs uppercase tracking-widest mt-1">Senior Partner</p>
            
            <div className="mt-8 pt-8 border-t border-slate-800 space-y-4 text-left">
              <div className="flex items-center gap-3 text-slate-400">
                <Mail size={16} className="text-slate-500" />
                <span className="text-sm">faris@syedquant.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin size={16} className="text-slate-500" />
                <span className="text-sm">Kuala Lumpur, Malaysia</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Briefcase size={16} className="text-slate-500" />
                <span className="text-sm">Quantitative Strategy</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Calendar size={16} className="text-slate-500" />
                <span className="text-sm">Joined March 2022</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Terminal Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Total Trades</span>
                <span className="text-white font-mono font-bold">1,284</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Win Rate</span>
                <span className="text-emerald-500 font-mono font-bold">68.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Avg. Return</span>
                <span className="text-blue-400 font-mono font-bold">+12.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Forms */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">First Name</label>
                <input type="text" defaultValue="Syed" className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
                <input type="text" defaultValue="Faris" className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                <input type="email" defaultValue="faris@syedquant.com" className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone</label>
                <input type="text" defaultValue="+60 12-345 6789" className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Professional Background</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Bio</label>
                <textarea rows={4} defaultValue="Quantitative strategist specializing in sentiment-driven algorithmic trading. Passionate about bridging the gap between NLP and financial markets." className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Organization</label>
                  <input type="text" defaultValue="SyedQuant Systems" className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Role</label>
                  <input type="text" defaultValue="Lead Quant Researcher" className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
