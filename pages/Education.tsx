
import React, { useState } from 'react';
import { getEducationalContent } from '../services/geminiService';
import { BookOpen, HelpCircle, AlertTriangle, Play, CheckCircle, Award, BarChart4, ChevronRight, RotateCcw } from 'lucide-react';

const MODULES = [
  { 
    id: 'mod1', 
    title: 'Foundations of Quant Trading', 
    lessons: ['Market Efficiency', 'The Alpha Search', 'Execution Algorithms'],
    progress: 100,
    locked: false
  },
  { 
    id: 'mod2', 
    title: 'Sentiment Data Engineering', 
    lessons: ['NLP with FinBERT', 'Social Media Scraping', 'Signal Weighting'],
    progress: 45,
    locked: false
  },
  { 
    id: 'mod3', 
    title: 'Deep Learning for Finance', 
    lessons: ['Transformers Explained', 'LSTM Time-Series', 'Attention Mechanisms'],
    progress: 0,
    locked: false
  },
  { 
    id: 'mod4', 
    title: 'Risk & Backtesting Mastery', 
    lessons: ['Sharpe vs Sortino', 'Monte Carlo Sim', 'Overfitting Dangers'],
    progress: 0,
    locked: true
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "What does the Sharpe Ratio specifically measure?",
    options: [
      "Total return of an investment",
      "Risk-adjusted return relative to the risk-free rate",
      "Maximum peak-to-trough decline",
      "The accuracy of a deep learning model"
    ],
    answer: 1
  },
  {
    question: "Which neural network part is crucial for 'Self-Attention' in financial sequences?",
    options: [
      "The LSTM Gate",
      "The Transformer Encoder",
      "The Sigmoid Output",
      "The Dropout Layer"
    ],
    answer: 1
  }
];

const Education: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'modules' | 'quiz' | 'insights'>('modules');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const fetchTopic = async (topic: string) => {
    setSelectedTopic(topic);
    setIsLoading(true);
    const text = await getEducationalContent(topic);
    setContent(text);
    setIsLoading(false);
  };

  const handleAnswer = (index: number) => {
    if (index === QUIZ_QUESTIONS[quizIndex].answer) {
      setQuizScore(quizScore + 1);
    }
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Award className="text-amber-500" /> SyedQuant Academy
          </h2>
          <p className="text-slate-400">Your roadmap to quantitative mastery and sentiment analysis.</p>
        </div>
        <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          {['modules', 'quiz', 'insights'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all capitalize ${
                activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'modules' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Learning Modules</h3>
            {MODULES.map(mod => (
              <div key={mod.id} className={`p-5 rounded-2xl border transition-all ${mod.locked ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-slate-800/40 border-slate-700/50 hover:border-blue-500/50 cursor-pointer'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-lg ${mod.progress === 100 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                    {mod.progress === 100 ? <CheckCircle size={18} /> : <Play size={18} />}
                  </div>
                  {mod.locked && <span className="text-[10px] font-bold text-slate-600 bg-slate-900 px-2 py-1 rounded">LOCKED</span>}
                </div>
                <h4 className="text-white font-bold mb-1">{mod.title}</h4>
                <div className="flex items-center gap-3">
                   <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${mod.progress}%` }}></div>
                   </div>
                   <span className="text-[10px] font-bold text-slate-500">{mod.progress}%</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {mod.lessons.map(lesson => (
                    <li key={lesson} onClick={() => !mod.locked && fetchTopic(lesson)} className="flex items-center justify-between text-xs text-slate-400 hover:text-blue-400 transition-colors">
                      {lesson}
                      <ChevronRight size={14} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-2xl min-h-[500px] flex flex-col">
              {selectedTopic ? (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                      <BookOpen className="text-blue-500" /> {selectedTopic}
                    </h3>
                    <button onClick={() => setSelectedTopic(null)} className="text-slate-500 hover:text-white transition-colors">
                      <RotateCcw size={20} />
                    </button>
                  </div>
                  {isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-20 space-y-4">
                      <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                      <p className="text-slate-500 italic">Accessing Knowledge Neural Core...</p>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none">
                       <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {content}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                  <HelpCircle className="w-16 h-16 mb-4 text-slate-600" />
                  <h3 className="text-xl font-bold">Select a Lesson to Begin</h3>
                  <p className="max-w-xs mx-auto mt-2 text-sm">Interactive deep dives into SyedQuant's core financial technologies.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto py-12">
          {!showResults ? (
            <div className="bg-slate-800/40 border border-slate-700/50 p-10 rounded-3xl space-y-8 animate-in zoom-in-95">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded-full">QUANT BASICS</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{QUIZ_QUESTIONS[quizIndex].question}</h3>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full text-left p-4 bg-slate-900 border border-slate-700 hover:border-blue-500 rounded-xl transition-all text-slate-300 hover:text-white group"
                  >
                    <span className="inline-block w-8 text-slate-600 font-bold group-hover:text-blue-500 transition-colors">{i+1}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/40 border border-slate-700/50 p-10 rounded-3xl text-center space-y-6 animate-in fade-in">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={40} />
              </div>
              <h3 className="text-3xl font-bold text-white">Quiz Completed!</h3>
              <p className="text-slate-400">Your score: <span className="text-emerald-500 font-bold text-2xl">{quizScore}/{QUIZ_QUESTIONS.length}</span></p>
              <button 
                onClick={() => { setShowResults(false); setQuizIndex(0); setQuizScore(0); }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-10 rounded-xl transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl">
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart4 className="text-purple-500" /> Sentiment Skew Visualization
            </h4>
            <div className="h-[250px] bg-slate-900/50 rounded-2xl flex items-end justify-center p-8 gap-4 overflow-hidden relative">
               <div className="absolute top-4 left-4 text-[10px] text-slate-600 font-bold uppercase">Attention Weight %</div>
               {[30, 80, 45, 95, 60, 40].map((h, i) => (
                 <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-lg transition-all duration-1000" style={{ height: `${h}%` }}></div>
               ))}
            </div>
            <p className="mt-6 text-xs text-slate-500 leading-relaxed italic">
              This visual represents how our Transformer model allocates attention weight across news vs social media features during high volatility periods.
            </p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6 text-rose-500">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="text-xl font-bold">The Golden Rule of Backtesting</h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Never optimize for the past. Overfitting occurs when a model treats noise as a signal. SyedQuant employs rigorous walk-forward cross-validation to mitigate this, ensuring your signals hold up in unknown market regimes.
            </p>
            <div className="p-4 bg-slate-900 border-l-4 border-blue-600 rounded-r-xl">
               <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">Pro Tip</p>
               <p className="text-xs text-blue-100">"If it looks too good to be true in backtesting, it's probably look-ahead bias."</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
