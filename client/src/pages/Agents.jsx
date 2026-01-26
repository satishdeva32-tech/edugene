import React from 'react';
import GlassCard from '../components/GlassCard';
import { ToggleLeft as Toggle, Sliders, Calendar, FileType, Zap, AlertTriangle, Shield, Cpu, Activity, Bot, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Agents = () => {
    const agents = [
        { name: "Study Planner", desc: "Automates your schedule based on learning goals.", icon: Calendar, status: "Active", color: "text-primary-600", bg: "bg-primary-50", tag: "Efficiency" },
        { name: "Notes Generator", desc: "Converts lectures into high-quality structured notes.", icon: FileType, status: "Active", color: "text-emerald-500", bg: "bg-emerald-50", tag: "Knowledge" },
        { name: "Revision Bot", desc: "Periodic quizzes and dynamic flashcard generation.", icon: Zap, status: "Standby", color: "text-primary-600", bg: "bg-primary-50", tag: "Retention" },
        { name: "Focus Mentor", desc: "Ensures focus by blocking distracting content during sessions.", icon: Shield, status: "Off", color: "text-slate-400", bg: "bg-slate-50", tag: "Focus" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        Neural <span className="text-primary-600">Agents</span> <Cpu className="text-accent" />
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Autonomous intelligence working for your academic success.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all">
                    <Sliders size={18} /> Global Config
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agents.map((agent, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="pro-card p-8 bg-white dark:bg-slate-900 group hover:border-primary-200">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 rounded-2xl ${agent.bg} ${agent.color} group-hover:scale-105 transition-transform`}>
                                    <agent.icon size={28} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col items-end gap-1.5">
                                    <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${agent.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                        agent.status === 'Standby' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                            'bg-slate-50 text-slate-400 border border-slate-100'
                                        }`}>
                                        {agent.status}
                                    </div>
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{agent.tag}</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{agent.name}</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-xs mb-8 leading-relaxed line-clamp-2">{agent.desc}</p>

                            <div className="flex justify-between items-center py-4 border-t border-slate-50 dark:border-slate-800 mt-auto">
                                <div className="flex items-center gap-2">
                                    <Activity size={14} className="text-primary-600" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Auto-pilot</span>
                                </div>
                                <button className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${agent.status === 'Active' ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${agent.status === 'Active' ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="pro-card !p-0 border-none shadow-xl shadow-primary-900/10 overflow-hidden">
                <div className="bg-primary-600 px-8 py-5 flex items-center justify-between">
                    <h3 className="text-lg font-black text-white flex items-center gap-3">
                        <Bot size={22} className="text-accent" /> Real-time Reasoning Logs
                    </h3>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
                    </div>
                </div>
                <div className="p-8 bg-slate-900 dark:bg-black font-mono text-[11px] space-y-4 leading-relaxed">
                    <div className="flex gap-4">
                        <span className="text-primary-400 font-black shrink-0">[20:49:01]</span>
                        <p className="grow text-slate-300"><span className="text-emerald-400 font-bold uppercase tracking-tighter">Planner:</span> Impending <span className="text-primary-300 font-black">"React Hooks Exam"</span> in 5 days.</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-primary-400 font-black shrink-0">[20:49:03]</span>
                        <p className="grow text-slate-400"><span className="text-primary-300 font-bold uppercase tracking-tighter">Heuristic:</span> Recommendations: prioritize <span className="text-white bg-white/10 px-1.5 py-0.5 rounded">Context API</span> and <span className="text-white bg-white/10 px-1.5 py-0.5 rounded">Custom Hooks</span>.</p>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-primary-400 font-black shrink-0">[20:49:05]</span>
                        <p className="grow text-slate-300"><span className="text-accent font-bold uppercase tracking-tighter">Action:</span> Flashcards generated. Session scheduled: <span className="text-white font-bold">Today 18:00</span>.</p>
                    </div>
                    <motion.p
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-primary-600 font-black ml-10"
                    >
                        &gt; Synthesizing next neural layer...
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default Agents;
