
import React, { useState, useEffect } from 'react';
import { Database, Cpu, Code2, Layers, ArrowRight, CheckCircle2, FlaskConical, GitBranch, Play, RefreshCcw, Terminal as TerminalIcon, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const QuantPipeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingLogs, setTrainingLogs] = useState<string[]>([]);
  const [lossData, setLossData] = useState<{ epoch: number, loss: number, val_acc: number }[]>([]);

  const runTrainingSimulation = () => {
    setIsTraining(true);
    setTrainingLogs(["[INFO] Initializing PyTorch environment...", "[INFO] Loading 10-year OHLCV + Sentiment dataset...", "[INFO] Sequence length: 30 days | Batch size: 64"]);
    setLossData([]);
    
    let epoch = 1;
    let currentLoss = 0.85;
    let currentAcc = 0.51;

    const interval = setInterval(() => {
      if (epoch > 20) {
        clearInterval(interval);
        setIsTraining(false);
        setTrainingLogs(prev => [...prev, "[SUCCESS] Training complete. Model weights saved to syed_quant_v1.pth"]);
        return;
      }

      currentLoss -= Math.random() * 0.04;
      currentAcc += Math.random() * 0.015;
      
      const log = `Epoch ${epoch}/20 - Loss: ${currentLoss.toFixed(4)} - Val Accuracy: ${(currentAcc * 100).toFixed(2)}%`;
      setTrainingLogs(prev => [...prev.slice(-8), log]);
      setLossData(prev => [...prev, { epoch, loss: Number(currentLoss.toFixed(4)), val_acc: Number((currentAcc * 100).toFixed(2)) }]);
      
      epoch++;
    }, 600);
  };

  const pipelineSteps = [
    {
      title: "Data Acquisition",
      icon: <Database className="w-5 h-5 lg:w-6 lg:h-6" />,
      desc: "Multi-source financial & social data scraping.",
      details: "Utilizes yfinance for OHLCV, BeautifulSoup for news, and PRAW for Reddit sentiment sourcing (r/stocks, r/wallstreetbets).",
      code: `import yfinance as yf
import praw

# Fetch financial data
data = yf.download("NVDA", start="2015-01-01")

# Fetch Reddit sentiment
reddit = praw.Reddit(client_id='ID', client_secret='SECRET')
posts = reddit.subreddit('stocks').top(limit=100)`
    },
    {
      title: "Preprocessing & NLP",
      icon: <Layers className="w-5 h-5 lg:w-6 lg:h-6" />,
      desc: "Cleaning & FinBERT sentiment scoring.",
      details: "Text is cleaned (regex) and passed to ProsusAI/finbert. Scores are aggregated daily using weighted upvotes.",
      code: `from transformers import AutoTokenizer, AutoModelForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")

def get_sentiment(text):
    inputs = tokenizer(text, return_tensors="pt")
    outputs = model(**inputs)
    return outputs.logits.softmax(dim=-1)`
    },
    {
      title: "Model 1: Transformer+LSTM",
      icon: <Cpu className="w-5 h-5 lg:w-6 lg:h-6" />,
      desc: "Deep Learning for temporal dependencies.",
      details: "A hybrid architecture where the Transformer layer handles multi-head attention over sentiment, and the LSTM captures long-term price trends.",
      code: `class HybridModel(nn.Module):
    def __init__(self):
        self.transformer = nn.TransformerEncoderLayer(d_model=64, nhead=4)
        self.lstm = nn.LSTM(input_size=64, hidden_size=128)
        self.fc = nn.Linear(128, 1)

    def forward(self, x):
        x = self.transformer(x)
        _, (h_n, _) = self.lstm(x)
        return torch.sigmoid(self.fc(h_n))`
    },
    {
      title: "Model 2: XGBoost Regressor",
      icon: <GitBranch className="w-5 h-5 lg:w-6 lg:h-6" />,
      desc: "Tree-based baseline for tabular features.",
      details: "Handles technical indicators (RSI, MACD) and flattened 30-day lag sentiment features with gradient boosting.",
      code: `import xgboost as xgb

model = xgb.XGBClassifier(
    n_estimators=1000,
    max_depth=6,
    learning_rate=0.01
)
model.fit(X_train, y_train)`
    }
  ];

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col xl:flex-row justify-between items-start gap-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
            <FlaskConical className="text-blue-500 w-6 h-6 lg:w-8 lg:h-8" /> Research Lab: Pipeline
          </h2>
          <p className="text-slate-400 mt-1 text-sm lg:text-base">The behind-the-scenes architecture of SyedQuant's data processing and model training.</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-center gap-3 w-full xl:max-w-sm shrink-0">
           <Info className="text-amber-500 shrink-0" size={18} />
           <p className="text-[10px] text-amber-200/70 leading-relaxed font-medium uppercase tracking-tight">
             <strong>Developer Note:</strong> This UI simulates the connection to a Python backend. Production inference is served via REST API.
           </p>
        </div>
      </header>

      {/* Pipeline Navigation & Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-4 space-y-3 lg:space-y-4">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Architectural Workflow</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {pipelineSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 lg:p-6 rounded-2xl border text-left transition-all group ${
                  activeStep === idx 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-600/10' 
                  : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-3 mb-2 lg:mb-3">
                  <div className={`p-2 rounded-lg transition-colors ${activeStep === idx ? 'bg-white/20' : 'bg-slate-700/50 group-hover:bg-slate-700'}`}>
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-sm lg:text-base">{step.title}</h3>
                </div>
                <p className={`text-[10px] lg:text-xs leading-relaxed ${activeStep === idx ? 'text-blue-100' : 'text-slate-500'}`}>
                  {step.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Code & Blueprint View */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 p-4 lg:p-8 rounded-2xl lg:rounded-3xl space-y-6 lg:space-y-8 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <h4 className="text-lg lg:text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="text-blue-400" size={20} /> Blueprint
            </h4>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-800/50 px-2 py-1 rounded">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              Python 3.10
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xs lg:text-sm text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              {pipelineSteps[activeStep].details}
            </p>
            
            <div className="relative">
              <div className="absolute -top-2 left-4 px-2 bg-slate-900 text-[9px] font-bold text-blue-500 uppercase tracking-widest border border-blue-500/20 rounded z-10">
                research_code.py
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <pre className="p-4 lg:p-6 mono text-[10px] lg:text-xs leading-relaxed text-blue-100/90 max-h-[300px] lg:max-h-[400px] custom-scrollbar">
                  <code>{pipelineSteps[activeStep].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Training Simulator Section */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl lg:rounded-3xl p-4 lg:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-white">Model Training Simulator</h3>
            <p className="text-slate-400 text-sm">Real-time visualization of high-dimensional learning curves.</p>
          </div>
          <button 
            onClick={runTrainingSimulation}
            disabled={isTraining}
            className={`w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-bold transition-all ${
              isTraining ? 'bg-slate-700 text-slate-500' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/10 active:scale-95'
            }`}
          >
            {isTraining ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            {isTraining ? "Training..." : "Start Session"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Live Loss Chart */}
          <div className="bg-slate-900/40 p-4 lg:p-6 rounded-2xl border border-slate-800/60">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Convergence Logs</h4>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-[10px] text-slate-400">Loss</span></div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[10px] text-slate-400">Acc</span></div>
              </div>
            </div>
            <div className="h-[200px] lg:h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lossData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} strokeOpacity={0.3} />
                  <XAxis dataKey="epoch" hide />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="loss" stroke="#3b82f6" strokeWidth={3} dot={false} animationDuration={300} />
                  <Line type="monotone" dataKey="val_acc" stroke="#10b981" strokeWidth={3} dot={false} animationDuration={300} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Terminal Console */}
          <div className="bg-black/60 rounded-2xl border border-slate-900 p-4 lg:p-6 font-mono text-[10px] lg:text-xs relative group overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-500/80">
                <TerminalIcon size={14} />
                <span className="text-slate-500 uppercase tracking-widest font-bold">Standard Output</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              </div>
            </div>
            <div className="space-y-2 text-emerald-500/80 h-[180px] lg:h-[200px] overflow-y-auto custom-scrollbar">
              {trainingLogs.length === 0 && <p className="text-slate-700 italic">Ready for simulation...</p>}
              {trainingLogs.map((log, i) => (
                <p key={i} className="animate-in slide-in-from-left-2 duration-300 flex gap-2">
                  <span className="text-slate-600 shrink-0 select-none">[{i+1}]</span>
                  <span className="break-all">{log}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-600/5 border border-blue-500/10 p-5 lg:p-8 rounded-2xl lg:rounded-3xl">
        <h4 className="text-sm lg:text-base font-bold text-white mb-2 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-blue-400" /> Training Methodology
        </h4>
        <p className="text-[11px] lg:text-sm text-slate-400 leading-relaxed max-w-4xl">
          The models are trained using **Time-Series Cross-Validation**. 
          We split the data from 2015 to 2024 into progressive windows, ensuring no **look-ahead bias**. 
          The sentiment from Reddit and News is treated as an exogenous variable that shifts the price probability distribution calculated by the deep learning layers.
        </p>
      </div>
    </div>
  );
};

export default QuantPipeline;
