import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { User, Settings, Shield, Bell, Moon, Sun, Globe, Brain, Ghost, Heart, Star, Camera, Check, Target, Trophy, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('Learning Preferences');
    const [learningStyle, setLearningStyle] = useState('visual');
    const [aiPersonality, setAiPersonality] = useState('Friendly');

    const tabs = [
        { icon: User, label: 'Account' },
        { icon: Brain, label: 'Learning Preferences' },
        { icon: Star, label: 'Achievements' },
        { icon: Bell, label: 'Notifications' },
        { icon: Shield, label: 'Security' }
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
                        User <span className="text-primary-600">Profile</span> <Settings className="text-accent" />
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Manage your identity and learning configurations.</p>
                </div>
                <button className="btn-primary gap-2 !px-8">
                    <Check size={18} strokeWidth={3} /> Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation Tabs */}
                <div className="lg:col-span-1 space-y-2">
                    {tabs.map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(tab.label)}
                            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest ${activeTab === tab.label
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                                : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50'}`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Header Card */}
                    <div className="pro-card p-8 bg-white dark:bg-slate-900 shadow-xl shadow-primary-900/5">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-3xl bg-primary-50 flex items-center justify-center text-primary-600 text-3xl font-black border-2 border-primary-100 shadow-inner">
                                    S
                                </div>
                                <button className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 text-primary-600 hover:text-primary-700">
                                    <Camera size={14} />
                                </button>
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Student User</h4>
                                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-100">
                                        <Star size={10} fill="currentColor" /> Pro Member
                                    </span>
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                        Level 12
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Display Name</label>
                                <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold placeholder-slate-400 focus:ring-2 focus:ring-primary-600/10 outline-none transition-all" defaultValue="student_genius" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold placeholder-slate-400 focus:ring-2 focus:ring-primary-600/10 outline-none transition-all" defaultValue="student@edugenie.ai" />
                            </div>
                        </div>
                    </div>

                    {/* Learning Preferences */}
                    {activeTab === 'Learning Preferences' && (
                        <div className="pro-card p-8 bg-white dark:bg-slate-900 border-none shadow-xl shadow-primary-900/5">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 rounded-xl bg-primary-50 text-primary-600">
                                    <Brain size={24} />
                                </div>
                                <h3 className="text-xl font-black tracking-tight">Learning Hub Configuration</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preferred Heuristic</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['Visual', 'Auditory', 'Reading', 'Practical'].map((style) => (
                                            <button
                                                key={style}
                                                onClick={() => setLearningStyle(style.toLowerCase())}
                                                className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${learningStyle === style.toLowerCase()
                                                    ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-600/20'
                                                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary-200'
                                                    }`}
                                            >
                                                {style}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-slate-50 dark:border-slate-800">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">AI Mentor Personality</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {[
                                            { name: 'Friendly', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
                                            { name: 'Direct', icon: Target, color: 'text-primary-600', bg: 'bg-primary-50' },
                                            { name: 'Witty', icon: Ghost, color: 'text-amber-500', bg: 'bg-amber-50' },
                                            { name: 'Deep', icon: Brain, color: 'text-primary-600', bg: 'bg-primary-50' }
                                        ].map((p) => (
                                            <button
                                                key={p.name}
                                                onClick={() => setAiPersonality(p.name)}
                                                className={`p-5 rounded-2xl border flex flex-col items-center gap-3 transition-all ${aiPersonality === p.name
                                                    ? `border-primary-600 bg-primary-50/50 shadow-md`
                                                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary-200'
                                                    }`}
                                            >
                                                <div className={`p-3 rounded-xl ${p.bg} ${p.color}`}>
                                                    <p.icon size={24} strokeWidth={2.5} />
                                                </div>
                                                <span className="text-[10px] font-black uppercase text-slate-900 dark:text-white">{p.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Achievements Gallery */}
                    {activeTab === 'Achievements' && (
                        <div className="space-y-6">
                            <div className="pro-card p-8 bg-primary-600 text-white relative overflow-hidden">
                                <Trophy size={140} className="absolute -top-10 -right-10 opacity-10" />
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Scholar Hall of Fame</h3>
                                    <p className="text-primary-50 font-medium opacity-90 max-w-lg mb-8">
                                        You've earned 12 badges so far! Complete 3 more quizzes to reach the next milestone: "Neural Architect".
                                    </p>
                                    <div className="flex gap-4">
                                        <div className="px-4 py-2 bg-white/20 rounded-xl text-xs font-black uppercase tracking-widest border border-white/30">
                                            Current: Expert
                                        </div>
                                        <div className="px-4 py-2 bg-accent text-primary-900 rounded-xl text-xs font-black uppercase tracking-widest">
                                            Next: Master
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {[
                                    { icon: Zap, name: "Fast Learner", desc: "Finish a module in < 20m", earned: true, color: "text-amber-500", bg: "bg-amber-50" },
                                    { icon: Brain, name: "Deep Thinker", desc: "Master all React patterns", earned: true, color: "text-indigo-500", bg: "bg-indigo-50" },
                                    { icon: Star, name: "Top Scorer", desc: "Perfect quiz score (3x)", earned: true, color: "text-emerald-500", bg: "bg-emerald-50" },
                                    { icon: Heart, name: "Philanthropist", desc: "Help 10 peers in group study", earned: false, color: "text-rose-500", bg: "bg-rose-50" },
                                    { icon: Target, name: "Deadshot", desc: "Initialize 5 specialized tools", earned: true, color: "text-primary-600", bg: "bg-primary-50" },
                                    { icon: Ghost, name: "Memory Ghost", desc: "Recall concepts from week 1", earned: false, color: "text-slate-400", bg: "bg-slate-50" },
                                ].map((badge, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -5 }}
                                        className={`pro-card p-6 flex flex-col items-center text-center group ${!badge.earned ? 'opacity-50 grayscale contrast-75' : ''}`}
                                    >
                                        <div className={`w-16 h-16 rounded-3xl ${badge.bg} flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform`}>
                                            <badge.icon size={32} className={badge.color} />
                                        </div>
                                        <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">{badge.name}</h4>
                                        <p className="text-[10px] text-slate-500 font-medium">{badge.desc}</p>
                                        {!badge.earned && (
                                            <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-primary-600 uppercase tracking-widest">
                                                Locked <Shield size={10} />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Regional Settings */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="pro-card p-6 bg-white dark:bg-slate-900">
                            <div className="flex items-center gap-2 mb-4">
                                <Globe size={18} className="text-primary-600" />
                                <h4 className="text-xs font-black uppercase tracking-widest">Language</h4>
                            </div>
                            <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold outline-none cursor-pointer">
                                <option value="en">English (Global)</option>
                                <option value="hi">Hindi (National)</option>
                            </select>
                        </div>

                        <div className="pro-card p-6 bg-white dark:bg-slate-900">
                            <div className="flex items-center gap-2 mb-4">
                                <Sun size={18} className="text-accent" />
                                <h4 className="text-xs font-black uppercase tracking-widest">Interface Theme</h4>
                            </div>
                            <div className="flex gap-2 p-1 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <button className="flex-1 py-1.5 rounded-lg bg-white dark:bg-slate-700 shadow-sm text-[9px] font-black uppercase tracking-widest">
                                    Light
                                </button>
                                <button className="flex-1 py-1.5 rounded-lg text-slate-400 text-[9px] font-black uppercase tracking-widest">
                                    Dark
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


export default Profile;
