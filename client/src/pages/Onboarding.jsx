import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Sparkles, Brain, Heart, ChevronRight, ChevronLeft, Check, Zap, Cpu, Code, Database, Microscope, Rocket, Ghost, Shield } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { API_URL } from '../config';

const Onboarding = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const { user, token } = useAuthStore();
    const [formData, setFormData] = useState({
        goals: [],
        interests: [],
        learningStyle: 'reading',
        aiPersonality: 'Friendly'
    });

    const steps = [
        { title: "Learning Goals", icon: Target, desc: "What are your primary objectives?" },
        { title: "Specializations", icon: Cpu, desc: "Select your areas of interest." },
        { title: "Tutor Style", icon: Brain, desc: "Customize your AI mentor's personality." }
    ];

    const handleToggle = (key, value) => {
        setFormData(prev => {
            const current = prev[key];
            if (current.includes(value)) {
                return { ...prev, [key]: current.filter(i => i !== value) };
            }
            return { ...prev, [key]: [...current, value] };
        });
    };

    const handleFinish = async () => {
        try {
            await axios.put(`${API_URL}/api/auth/profile`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onComplete();
        } catch (err) {
            console.error("Failed to update profile", err);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                const goalsSet = [
                    { name: 'Master Prompting', icon: Zap, color: 'text-amber-500' },
                    { name: 'AI Engineer Path', icon: Code, color: 'text-blue-500' },
                    { name: 'Research AI', icon: Microscope, color: 'text-purple-500' },
                    { name: 'Deploy Agents', icon: Rocket, color: 'text-emerald-500' },
                    { name: 'AI Business', icon: Target, color: 'text-orange-500' },
                    { name: 'AI Ethics', icon: Shield, color: 'text-rose-500' }
                ];
                return (
                    <div className="grid grid-cols-2 gap-4">
                        {goalsSet.map(goal => (
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                key={goal.name}
                                onClick={() => handleToggle('goals', goal.name)}
                                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 text-center ${formData.goals.includes(goal.name)
                                    ? 'bg-primary-50 border-primary-600 text-primary-600 shadow-lg shadow-primary-600/10'
                                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-primary-200'
                                    }`}
                            >
                                <goal.icon className={formData.goals.includes(goal.name) ? 'text-primary-600' : goal.color} size={28} />
                                <span className="text-[10px] font-black uppercase tracking-widest">{goal.name}</span>
                            </motion.button>
                        ))}
                    </div>
                );
            case 2:
                const interestsSet = [
                    { name: 'LLMs', category: 'Foundation' },
                    { name: 'RAG Systems', category: 'Architecture' },
                    { name: 'Machine Learning', category: 'Science' },
                    { name: 'AutoGPT', category: 'Agents' },
                    { name: 'Deep Learning', category: 'Advanced' },
                    { name: 'Vector DBs', category: 'Data' },
                    { name: 'Fine-tuning', category: 'Optimization' },
                    { name: 'LangChain', category: 'Frameworks' },
                    { name: 'Prompt Eng.', category: 'Skill' }
                ];
                return (
                    <div className="grid grid-cols-3 gap-3">
                        {interestsSet.map(item => (
                            <motion.button
                                whileHover={{ y: -2 }}
                                key={item.name}
                                onClick={() => handleToggle('interests', item.name)}
                                className={`p-4 rounded-xl border flex flex-col gap-1 transition-all ${formData.interests.includes(item.name)
                                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg'
                                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary-200'
                                    }`}
                            >
                                <span className={`text-[8px] font-black uppercase tracking-tighter ${formData.interests.includes(item.name) ? 'opacity-80' : 'opacity-50'}`}>{item.category}</span>
                                <span className="text-[11px] font-bold">{item.name}</span>
                            </motion.button>
                        ))}
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block text-center">Learning Style</label>
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                                {['Visual', 'Auditory', 'Reading', 'Practical'].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setFormData({ ...formData, learningStyle: s.toLowerCase() })}
                                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.learningStyle === s.toLowerCase()
                                            ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-white shadow-md'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4 pt-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block text-center">AI Personality</label>
                            <div className="grid grid-cols-4 gap-3">
                                {[
                                    { name: 'Friendly', icon: Heart, color: 'text-rose-500' },
                                    { name: 'Direct', icon: Target, color: 'text-blue-600' },
                                    { name: 'Witty', icon: Ghost, color: 'text-amber-500' },
                                    { name: 'Scientific', icon: Brain, color: 'text-primary-600' }
                                ].map(p => (
                                    <motion.button
                                        whileHover={{ y: -3 }}
                                        key={p.name}
                                        onClick={() => setFormData({ ...formData, aiPersonality: p.name })}
                                        className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${formData.aiPersonality === p.name
                                            ? 'bg-primary-50 border-primary-600 text-primary-600 shadow-md'
                                            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary-200'
                                            }`}
                                    >
                                        <p.icon size={22} className={formData.aiPersonality === p.name ? 'text-primary-600' : p.color} />
                                        <span className="text-[9px] font-black uppercase">{p.name}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <div className="premium-bg" />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl relative mx-auto"
            >
                <div className="pro-card !p-10 bg-white dark:bg-slate-900 shadow-2xl shadow-primary-900/10">
                    <div className="flex justify-between items-center mb-12">
                        {steps.map((s, i) => (
                            <React.Fragment key={i}>
                                <div className="flex flex-col items-center gap-3 relative">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${step > i + 1
                                        ? 'bg-emerald-500 border-emerald-500 text-white'
                                        : step === i + 1
                                            ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/30'
                                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                                        }`}>
                                        {step > i + 1 ? <Check size={20} strokeWidth={3} /> : <s.icon size={18} />}
                                    </div>
                                    <span className={`text-[8px] font-black uppercase tracking-[0.15em] ${step === i + 1 ? 'text-primary-600' : 'text-slate-400'}`}>
                                        {s.title}
                                    </span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800 mx-2 mt-[-1.5rem]" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="mb-10 text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 leading-none">{steps[step - 1].title}</h2>
                                <p className="text-slate-500 text-sm font-medium">{steps[step - 1].desc}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="min-h-[360px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderStep()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-10 flex justify-between items-center gap-4">
                        <button
                            onClick={() => setStep(prev => Math.max(1, prev - 1))}
                            disabled={step === 1}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <ChevronLeft size={16} strokeWidth={3} /> Back
                        </button>

                        {step < 3 ? (
                            <button
                                onClick={() => setStep(prev => prev + 1)}
                                className="btn-primary !px-10"
                            >
                                Next Step <ChevronRight size={18} strokeWidth={3} />
                            </button>
                        ) : (
                            <button
                                onClick={handleFinish}
                                className="btn-accent !px-12"
                            >
                                Start Learning <Sparkles size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Onboarding;

// Internal Icons for consistency if not found in Lucide
const BotIcon = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8" y2="16" />
        <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
);

const ShieldIcon = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const GhostIcon = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />
    </svg>
);


