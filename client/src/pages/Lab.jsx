import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Beaker, Zap, Play, Terminal, Cpu, Database, Eye, ChevronRight, ArrowLeft, Cuboid as Cube, Sparkles, Send } from 'lucide-react';
import useAIStore from '../store/useAIStore';

const Lab = () => {
    const [selectedModule, setSelectedModule] = useState(null);
    const [isInitializing, setIsInitializing] = useState(null);
    const setActiveLesson = useAIStore(state => state.setActiveLesson);

    const experiments = [
        {
            id: 'sandbox',
            title: "Prompt Sandbox",
            desc: "Test complex prompt patterns with real-time token analysis.",
            icon: Terminal,
            color: "text-amber-600",
            bg: "bg-amber-50",
            status: "Stable",
            aiTip: "Try using 'Chain of Thought' prompting here. For example: 'Explain Quantum Computing step-by-step'."
        },
        {
            id: 'visualizer',
            title: "Weight Visualizer",
            desc: "Interactive 3D visualization of transformer model weights.",
            icon: Eye,
            color: "text-primary-600",
            bg: "bg-primary-50",
            status: "Alpha",
            aiTip: "Notice how the weights cluster in the attention layers. This represents how the model focuses on different words."
        },
        {
            id: 'generator',
            title: "Dataset Generator",
            desc: "Generate high-quality educational datasets using LLMs.",
            icon: Database,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            status: "Beta",
            aiTip: "I can help you format this for CSV or JSON. Just let me know which subjects you need!"
        },
        {
            id: 'compiler',
            title: "Edge Compiler",
            desc: "Optimize models for mobile and low-power devices.",
            icon: Cpu,
            color: "text-slate-400",
            bg: "bg-slate-50",
            status: "Locked",
            aiTip: "This module is currenty in development. I'll let you know when it's ready!"
        }
    ];

    const handleInitialize = (module) => {
        setIsInitializing(module.id);
        setTimeout(() => {
            setIsInitializing(null);
            setSelectedModule(module);
            setActiveLesson({ title: `${module.title} Lab`, aiInfo: module.aiTip });
        }, 1500);
    };

    if (selectedModule) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                <div className="flex items-center gap-4 mb-2">
                    <button
                        onClick={() => setSelectedModule(null)}
                        className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-primary-600 transition-all shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest leading-none mb-1">Laboratory Core</p>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{selectedModule.title}</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Primary Interface */}
                        <div className="pro-card min-h-[500px] flex flex-col bg-slate-950 border-slate-800 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]"></div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col relative z-10">
                                {selectedModule.id === 'sandbox' && (
                                    <div className="flex-1 flex flex-col space-y-6">
                                        <div className="flex justify-between items-center text-white/50 text-[10px] font-black uppercase tracking-widest">
                                            <span>Input Prompt</span>
                                            <span>Tokens: 142 / 4096</span>
                                        </div>
                                        <textarea
                                            placeholder="Enter your complex prompt pattern here..."
                                            className="flex-1 w-full bg-black/40 border border-white/10 rounded-3xl p-6 text-white font-mono text-sm outline-none focus:border-amber-500/50 transition-all resize-none"
                                        ></textarea>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => {
                                                    // Context updated quietly for when user opens AI manually
                                                    setActiveLesson({ title: 'Weight Analysis', aiInfo: 'Analysis of attention layer weights for current prompt.' });
                                                }}
                                                className="flex-1 py-4 bg-amber-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-amber-700 transition-all"
                                            >
                                                Analyze Weights <Sparkles size={16} />
                                            </button>
                                            <button className="px-6 py-4 bg-white/5 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">
                                                Save Pattern
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {selectedModule.id === 'visualizer' && (
                                    <div className="flex-1 flex flex-col items-center justify-center">
                                        <motion.div
                                            animate={{ rotateY: 360, rotateX: [0, 10, 0] }}
                                            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                            className="w-64 h-64 border-2 border-primary-500/30 rounded-full flex items-center justify-center relative"
                                        >
                                            <Cube size={120} className="text-primary-600 opacity-80" />
                                            {[...Array(6)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                                                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                                                    className="absolute w-2 h-2 bg-primary-400 rounded-full"
                                                    style={{
                                                        top: `${Math.random() * 100}%`,
                                                        left: `${Math.random() * 100}%`
                                                    }}
                                                />
                                            ))}
                                        </motion.div>
                                        <p className="mt-12 text-white/50 text-[10px] font-black uppercase tracking-widest animate-pulse">Scanning Layer 12 [Attention_7]</p>
                                    </div>
                                )}

                                {selectedModule.id === 'generator' && (
                                    <div className="flex-1 flex flex-col space-y-8">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                                <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Target Subject</p>
                                                <select className="bg-transparent text-white font-bold outline-none w-full appearance-none cursor-pointer">
                                                    <option>Advanced Mathematics</option>
                                                    <option>Organic Chemistry</option>
                                                    <option>Quantum Mechanics</option>
                                                </select>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                                <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Entry Count</p>
                                                <input type="number" defaultValue="500" className="bg-transparent text-white font-bold outline-none w-full" />
                                            </div>
                                        </div>
                                        <div className="flex-1 rounded-2xl border border-dashed border-white/20 flex flex-center justify-center items-center text-white/20 font-bold uppercase text-[10px] tracking-widest">
                                            Drag reference papers here
                                        </div>
                                        <button
                                            onClick={() => {
                                                // Context updated quietly
                                                setActiveLesson({ title: 'Dataset Synthesis', aiInfo: 'Synthesis of high-quality educational data points.' });
                                            }}
                                            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
                                        >
                                            Begin Synthesis <Zap size={16} fill="currentColor" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Module Logs */}
                        <div className="pro-card p-0 bg-slate-900 border-slate-800 overflow-hidden">
                            <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center">
                                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">Process Logs</span>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                </div>
                            </div>
                            <div className="p-6 h-[400px] font-mono text-[10px] space-y-3 overflow-y-auto">
                                <p className="text-emerald-500"> {'>'} connection_established: research_core_v4</p>
                                <p className="text-white/40"> {'>'} loading_module: {selectedModule.id}.so</p>
                                <p className="text-white/40"> {'>'} allocated_vram: 24.2GB</p>
                                <p className="text-white/40"> {'>'} status: initializing_neural_pathways...</p>
                                <p className="text-amber-500 mt-4 leading-relaxed"> [WARN] Kernel mismatch detected in sub-layer 4. Attempting automatic correction...</p>
                                <p className="text-emerald-500 leading-relaxed"> [SUCCESS] Patch applied. Module stabilized.</p>
                                <p className="text-white mt-4"> {'>'} ready_for_command_input</p>
                                <motion.div
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="w-2 h-4 bg-primary-500 inline-block"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        Neural <span className="text-primary-600">Laboratory</span> <FlaskConical className="text-accent animate-pulse" />
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Experimental AI modules pushed directly from the research core.</p>
                </div>
                <button
                    onClick={() => useAIStore.getState().nudgeAI('New Research Request', 'I want to start a new experimental research request. Give me a creative topic to explore in AI.')}
                    className="btn-accent gap-2 !px-8"
                >
                    <Beaker size={18} /> New Request
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {experiments.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="pro-card p-0 bg-white dark:bg-slate-900 group overflow-hidden border-none transition-all hover:border-primary-100">
                            <div className={`h-40 relative flex items-center justify-center ${exp.bg}`}>
                                <exp.icon size={64} className={`${exp.color} opacity-20 group-hover:scale-110 transition-transform duration-500`} />
                                <div className="absolute top-4 left-4">
                                    <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest bg-white/80 dark:bg-black/50 ${exp.color} border border-white dark:border-slate-800`}>
                                        {exp.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{exp.title}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-8 leading-relaxed line-clamp-2">{exp.desc}</p>
                                <button
                                    disabled={exp.status === "Locked" || isInitializing === exp.id}
                                    onClick={() => handleInitialize(exp)}
                                    className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest transition-all ${exp.status === "Locked"
                                        ? "bg-slate-50 dark:bg-slate-800 text-slate-300 cursor-not-allowed"
                                        : "bg-primary-600 text-white shadow-lg shadow-primary-600/10 hover:bg-primary-700"
                                        }`}
                                >
                                    {isInitializing === exp.id ? (
                                        <>Configuring AI Environment...</>
                                    ) : (
                                        <>
                                            {exp.status === "Locked" ? "Module Locked" : "Initialize Module"}
                                            {exp.status !== "Locked" && <Play size={14} fill="currentColor" />}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="pro-card p-8 bg-slate-950 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-6 transition-transform duration-500">
                    <Zap size={180} fill="currentColor" className="text-accent" />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <h3 className="text-2xl font-black mb-3 text-white uppercase tracking-tight">Neural Overclocking Mode</h3>
                    <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                        Unlock the full capacity of your AI tutor by engaging the Neural Overclocking module. Increases reasoning speed and enables multi-step planning agents.
                    </p>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => useAIStore.getState().nudgeAI('Neural Overclocking', 'I want to activate the Neural Overclocking module. What are the benefits of this high-compute mode?')}
                            className="bg-accent text-primary-900 px-8 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:scale-[1.02] transition-all"
                        >
                            Activate Core
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                            <span className="text-[9px] font-black uppercase text-rose-500 tracking-widest">Premium Access Required</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Lab;


