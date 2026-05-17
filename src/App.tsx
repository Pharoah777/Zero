/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wind, 
  Flame, 
  Droplets, 
  Mountain, 
  ChevronRight, 
  Users, 
  BarChart3, 
  Calendar, 
  TrendingUp, 
  Zap,
  Target,
  Share2,
  BookOpen,
  DollarSign
} from 'lucide-react';

// --- Types & Data ---

type Faction = 'Aerokin' | 'Pyrokin' | 'Hydrokin' | 'Terrakin' | 'Zero';

interface FactionData {
  type: string;
  name: Faction;
  power: string;
  description: string;
  traits: string[];
  color: string;
  icon: any;
}

const FACTIONS: Record<string, FactionData> = {
  A: {
    type: 'Type A',
    name: 'Aerokin',
    power: 'Air & Atmosphere',
    description: 'Wind blades, flight, atmosphere control. The aristocrats — graceful, political, cold.',
    traits: ['Aristocratic', 'Graceful', 'Cold'],
    color: '#E0E7FF', // Silver/White
    icon: Wind,
  },
  B: {
    type: 'Type B',
    name: 'Pyrokin',
    power: 'Fire & Heat',
    description: 'Fire and heat. Combustion, thermal shields, volcanic force. The warriors — passionate, volatile, feared.',
    traits: ['Passionate', 'Volatile', 'Feared'],
    color: '#EF4444', // Red
    icon: Flame,
  },
  AB: {
    type: 'Type AB',
    name: 'Hydrokin',
    power: 'Water & Ice',
    description: 'Water and ice. Currents, freezing, blood manipulation. The scholars — calculating, rare, unsettling.',
    traits: ['Calculating', 'Rare', 'Unsettling'],
    color: '#3B82F6', // Blue
    icon: Droplets,
  },
  O: {
    type: 'Type O',
    name: 'Terrakin',
    power: 'Earth & Stone',
    description: 'Earth and stone. Seismic force, metal bending, regeneration. The common folk — sturdy, loyal, underestimated.',
    traits: ['Sturdy', 'Loyal', 'Underestimated'],
    color: '#10B981', // Green
    icon: Mountain,
  }
};

const PHASES = [
  { 
    id: 1, 
    title: 'Seed the World', 
    months: '1–3', 
    tasks: ['Blood type lore', 'Character art', 'Mystery hooks'],
    desc: 'Never mention the book explicitly — just build the world and let people ask "is this a book?"'
  },
  { 
    id: 2, 
    title: 'Reveal the Book', 
    months: '4–5', 
    tasks: ['Cover reveal', 'Synopsis drop', 'ARC signups'],
    desc: 'The "it\'s real" moment that converts followers to pre-orders.'
  },
  { 
    id: 3, 
    title: 'Hype Machine', 
    months: '6–7', 
    tasks: ['Countdown content', 'Chapter previews', 'BookTok collab'],
    desc: 'Interactive content goes viral. "Blood type quiz" drives signups.'
  },
  { 
    id: 4, 
    title: 'Launch Week', 
    months: '8', 
    tasks: ['Daily posts', 'Live readings', 'Amazon push'],
    desc: 'The community you built becomes your marketing army.'
  }
];

// --- Components ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`backdrop-blur-md bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color, backgroundColor, borderColor }: { children: React.ReactNode, color: string, backgroundColor?: string, borderColor?: string }) => (
  <span 
    className="px-4 py-1.5 rounded-full text-[10px] font-medium tracking-widest uppercase border transition-all"
    style={{ 
      borderColor: borderColor || `${color}30`, 
      color: color, 
      backgroundColor: backgroundColor || `${color}10` 
    }}
  >
    {children}
  </span>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'strategy' | 'world' | 'quiz'>('strategy');
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);

  // Quiz Logic
  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    if (quizStep < 2) {
      setQuizAnswers(newAnswers);
      setQuizStep(quizStep + 1);
    } else {
      const types: Faction[] = ['Aerokin', 'Pyrokin', 'Hydrokin', 'Terrakin'];
      setSelectedFaction(types[Math.floor(Math.random() * types.length)]);
      setQuizStep(3);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-fuchsia-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Badge color="#818CF8" borderColor="#818CF840" backgroundColor="#818CF810">2026 Strategy</Badge>
                <Badge color="#C084FC" borderColor="#C084FC40" backgroundColor="#C084FC10">Social Media Plan</Badge>
              </div>
              <h1 className="text-8xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-6 text-white drop-shadow-2xl">
                Zero
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light italic leading-relaxed">
                A sci-fi novel where your blood type determines your power — and someone is born with none.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 p-1.5 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shrink-0">
              {['strategy', 'world', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 scale-100' 
                      : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>
        </header>

        <main>
          <AnimatePresence mode="wait">
            {activeTab === 'strategy' && (
              <motion.div
                key="strategy"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Metrics */}
                <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-white/5 hover:bg-white/10 transition-colors border-white/5">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">TikTok Projection</span>
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-indigo-400" />
                      </div>
                    </div>
                    <div className="text-5xl font-black mb-2 tracking-tighter text-white">50K</div>
                    <div className="flex items-center gap-2">
                       <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-indigo-500 w-[65%]" />
                       </div>
                       <span className="text-[10px] text-indigo-400 font-bold">Growth Node</span>
                    </div>
                  </Card>

                  <Card className="bg-white/5 hover:bg-white/10 transition-colors border-white/5">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Instagram Reach</span>
                      <div className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center">
                        <Target className="w-4 h-4 text-fuchsia-400" />
                      </div>
                    </div>
                    <div className="text-5xl font-black mb-2 tracking-tighter text-white">25K</div>
                    <div className="flex items-center gap-2">
                       <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-fuchsia-500 w-[45%]" />
                       </div>
                       <span className="text-[10px] text-fuchsia-400 font-bold">Superfans</span>
                    </div>
                  </Card>

                  <Card className="bg-white/5 hover:bg-white/10 transition-colors border-white/5">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Market Valuation</span>
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                      </div>
                    </div>
                    <div className="text-5xl font-black mb-2 tracking-tighter text-white">$12.5k</div>
                    <div className="flex items-center gap-2">
                       <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-500 w-[30%]" />
                       </div>
                       <span className="text-[10px] text-emerald-400 font-bold">Q1 Target</span>
                    </div>
                  </Card>
                </div>

                {/* Pre-launch Timeline */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold tracking-tight text-white">Campaign Architecture</h2>
                        <p className="text-xs text-slate-500 font-mono">8 Month Convergence Plan</p>
                      </div>
                    </div>
                  </div>

                  {PHASES.map((phase) => (
                    <motion.div 
                      key={phase.id}
                      whileHover={{ x: 10 }}
                      className="group relative bg-white/5 border border-white/5 rounded-3xl p-8 backdrop-blur-xl transition-all hover:bg-white/[0.08] hover:border-white/10"
                    >
                      <div className="flex gap-8">
                        <div className="hidden md:flex flex-col items-center">
                          <span className="text-5xl font-black text-white/5 group-hover:text-indigo-500/20 transition-colors">0{phase.id}</span>
                          <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent my-4" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-4">
                             <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{phase.title}</h3>
                             <Badge color="#94A3B8" borderColor="#FFFFFF10" backgroundColor="#FFFFFF05">M{phase.months}</Badge>
                          </div>
                          <p className="text-slate-400 text-sm mb-6 leading-relaxed italic">{phase.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {phase.tasks.map(task => (
                              <span key={task} className="text-[9px] bg-slate-900/50 px-3 py-1.5 rounded-lg text-slate-300 border border-white/5 uppercase tracking-widest font-bold">
                                {task}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Right: Content & Action */}
                <div className="lg:col-span-4 space-y-6">
                   <Card className="bg-indigo-600/5 border-indigo-500/20 backdrop-blur-3xl p-8">
                    <h3 className="text-xs font-bold text-indigo-400 uppercase mb-8 tracking-[0.3em] flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                      Strategic Action Log
                    </h3>
                    <ul className="space-y-8">
                      {[
                        { label: 'Character Lore', value: 'Carousel' },
                        { label: 'Mystery Dives', value: 'Reels' },
                        { label: 'Writing Progress', value: 'Stories' },
                        { label: 'Blood Type Quiz', value: 'Interactive' },
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-4 group">
                          <div className="w-6 h-6 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                            0{idx + 1}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-200 mb-1">{item.label}</p>
                            <span className="text-[10px] font-mono text-indigo-400/60 uppercase tracking-widest">{item.value} Deployment</span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-12 pt-8 border-t border-white/5">
                      <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest italic font-medium">
                        "Visual Funnel: Awareness → Consideration → Conversion → Retention"
                      </p>
                    </div>
                  </Card>

                   <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm tracking-[0.2em] shadow-2xl shadow-indigo-600/20 transition-all uppercase active:scale-[0.98]">
                      Export Marketing Blueprint
                   </button>

                   <Card className="bg-fuchsia-900/10 border-fuchsia-500/20">
                     <div className="flex items-center gap-3 mb-4">
                       <TrendingUp className="w-4 h-4 text-fuchsia-400" />
                       <h4 className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">Conversion Flywheel</h4>
                     </div>
                     <p className="text-xs text-slate-400 leading-relaxed font-light">
                       Convert scrollers into superfans. The community you build today becomes the marketing army for Book 2 and beyond.
                     </p>
                   </Card>
                </div>
              </motion.div>
            )}

            {activeTab === 'world' && (
              <motion.div
                key="world"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(FACTIONS).map(([key, f]) => (
                    <motion.div
                      key={key}
                      layoutId={key}
                      onClick={() => setSelectedFaction(f.name === selectedFaction ? null : f.name)}
                      className={`relative cursor-pointer transition-all duration-500 ${
                        selectedFaction && selectedFaction !== f.name ? 'opacity-20 blur-[2px]' : 'opacity-100'
                      }`}
                    >
                      <Card className="h-full group border-white/5 bg-slate-900/20 hover:bg-slate-900/40 hover:border-indigo-500/30 transition-all overflow-hidden p-8 flex flex-col">
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                          style={{ background: `radial-gradient(circle at 50% 50%, ${f.color}, transparent 70%)` }}
                        />
                        <div className="mb-8">
                          <f.icon className="w-12 h-12" style={{ color: f.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{f.type}</span>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <h3 className="text-2xl font-black text-white tracking-tight">{f.name}</h3>
                          </div>
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 mb-6">{f.power}</h4>
                          <p className="text-sm text-slate-400 mb-8 leading-relaxed font-light italic">
                            "{f.description}"
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {f.traits.map(t => (
                            <span 
                              key={t} 
                              className="text-[9px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 uppercase tracking-widest font-bold text-slate-500"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Kaelen Section */}
                <Card className="relative overflow-hidden group border-white/5 bg-indigo-600/5 backdrop-blur-3xl border-t-2 border-t-indigo-500/10">
                   <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 pointer-events-none" />
                   <div className="relative z-10 py-16 px-4 text-center max-w-2xl mx-auto">
                     <span className="text-[10px] uppercase tracking-[0.8em] text-indigo-500 font-black mb-6 block">SYSTEM ANOMALY</span>
                     <h2 className="text-5xl font-black tracking-tighter mb-6 italic text-white">Kaelen — Type Zero</h2>
                     <p className="text-slate-400 leading-relaxed font-light text-lg">
                       No power. No classification. The most dangerous variable in a world that demands you fit. Kaelen is the anomaly that threatens to shatter the fragile balance between blood factions.
                     </p>
                     <div className="mt-12 flex justify-center gap-12">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-slate-600 font-bold underline underline-offset-8 decoration-indigo-500">Mystery</span>
                        <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold underline underline-offset-8 decoration-fuchsia-500">Anomaly</span>
                        <span className="text-[10px] uppercase tracking-[0.4em] text-slate-600 font-bold underline underline-offset-8 decoration-cyan-500">Survivor</span>
                     </div>
                   </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-xl mx-auto"
              >
                <Card className="text-center py-20 px-12 bg-white/5 border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500" />
                  
                  {quizStep === 0 && (
                    <>
                      <div className="w-20 h-20 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-10">
                        <BookOpen className="w-8 h-8 text-indigo-400" />
                      </div>
                      <h2 className="text-4xl font-black mb-6 italic text-white tracking-tighter">Discover Your Bloodline</h2>
                      <p className="text-slate-400 mb-12 text-base leading-relaxed font-light">Every human is born with a power tied to their blood. Find out where you belong in the world of Zero.</p>
                      <button 
                        onClick={() => setQuizStep(1)}
                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-indigo-500 hover:-translate-y-1 transition-all shadow-xl shadow-indigo-600/20"
                      >
                        Initiate Sequence
                      </button>
                    </>
                  )}

                  {quizStep >= 1 && quizStep <= 2 && (
                    <motion.div 
                      key={quizStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex justify-between items-center mb-12">
                        <span className="text-[10px] font-black text-indigo-400/60 tracking-[0.3em] uppercase">Step 0{quizStep} / 02</span>
                        <div className="flex gap-1">
                          <div className={`w-8 h-1 rounded-full ${quizStep >= 1 ? 'bg-indigo-500' : 'bg-slate-800'}`} />
                          <div className={`w-8 h-1 rounded-full ${quizStep >= 2 ? 'bg-indigo-500' : 'bg-slate-800'}`} />
                        </div>
                      </div>
                      <h3 className="text-3xl font-black mb-10 text-white tracking-tight">
                        {quizStep === 1 
                          ? "How do you solve a problem?" 
                          : "Where do you feel most powerful?"}
                      </h3>
                      <div className="grid gap-4">
                        {[
                          { val: 'Logic', label: quizStep === 1 ? 'Through cold calculation' : 'In a quiet library' },
                          { val: 'Strength', label: quizStep === 1 ? 'Direct confrontation' : 'The heat of battle' },
                          { val: 'Nature', label: quizStep === 1 ? 'Observing and adapting' : 'Surrounded by the earth' },
                          { val: 'Instinct', label: quizStep === 1 ? 'Following my gut' : 'High above the ground' },
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            onClick={() => handleQuizAnswer(opt.val)}
                            className="w-full py-5 px-8 bg-slate-950/40 border border-white/5 rounded-2xl text-left hover:bg-white/5 hover:border-indigo-500/30 transition-all group relative overflow-hidden"
                          >
                            <div className="flex items-center justify-between relative z-10">
                              <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors uppercase tracking-widest">{opt.label}</span>
                              <ChevronRight className="w-5 h-5 text-indigo-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {quizStep === 3 && selectedFaction && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-6"
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.02, 1],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="relative z-10 mb-12"
                      >
                         <h3 className="text-[10px] uppercase tracking-[0.6em] text-slate-500 font-black mb-4">DISCOVERY COMPLETE</h3>
                         <h2 className="text-7xl font-black mb-2 italic" style={{ 
                           color: FACTIONS[Object.keys(FACTIONS).find(k => FACTIONS[k].name === selectedFaction)!]?.color,
                           textShadow: `0 0 40px ${FACTIONS[Object.keys(FACTIONS).find(k => FACTIONS[k].name === selectedFaction)!]?.color}30`
                         }}>
                           {selectedFaction}
                         </h2>
                      </motion.div>
                      
                      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl mb-12">
                        <p className="text-slate-400 text-base leading-relaxed italic">
                          "{FACTIONS[Object.keys(FACTIONS).find(k => FACTIONS[k].name === selectedFaction)!]?.description}"
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <button 
                          onClick={() => { setQuizStep(0); setSelectedFaction(null); }}
                          className="flex-1 py-4 rounded-xl text-[10px] font-black border border-white/10 hover:bg-white/5 uppercase tracking-[0.2em] transition-all text-slate-500 hover:text-slate-200"
                        >
                          Retry Scan
                        </button>
                        <button 
                          onClick={() => setActiveTab('strategy')}
                          className="flex-1 py-4 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/10"
                        >
                          Deploy Plan
                        </button>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer Info */}
        <footer className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="flex flex-wrap items-center gap-10">
             <div className="flex flex-col gap-2">
               <span className="text-[10px] text-slate-500 uppercase tracking-[0.4em] font-black">Project Milestone</span>
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-indigo-500" />
                 <span className="text-sm font-black text-white">50K Community Goal</span>
               </div>
             </div>
             <div className="w-px h-10 bg-white/10 hidden md:block" />
             <div className="flex flex-col gap-2">
               <span className="text-[10px] text-slate-500 uppercase tracking-[0.4em] font-black">Sync Status</span>
               <div className="flex items-center gap-3 text-emerald-400">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                 <span className="text-sm font-black">Active Phase 01</span>
               </div>
             </div>
           </div>
           
           <div className="flex gap-3">
              <button className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group">
                <Share2 className="w-4 h-4 text-slate-500 group-hover:text-white" />
              </button>
              <button className="px-6 h-12 flex items-center gap-3 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-white/5">
                <BarChart3 className="w-4 h-4" />
                Live Hub
              </button>
           </div>
           
           <div className="md:hidden w-full text-center mt-4">
             <span className="text-[9px] text-slate-600 font-mono tracking-widest uppercase">Last Sync: May 17, 19:35 GMT</span>
           </div>
        </footer>
      </div>
    </div>
  );
}
