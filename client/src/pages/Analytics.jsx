import React from 'react';
import GlassCard from '../components/GlassCard';
import { TrendingUp, Clock, Target, AlertCircle, BarChart, Download, Calendar, Sparkles, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import useAIStore from '../store/useAIStore';

const Analytics = () => {
    const [isProcessing, setIsProcessing] = React.useState(null);
    const skillData = [
        { subject: 'React Architecture', progress: 85, color: 'bg-primary-600' },
        { subject: 'Node.js Systems', progress: 60, color: 'bg-primary-400' },
        { subject: 'Database Design', progress: 45, color: 'bg-slate-300' },
        { subject: 'AI Integration', progress: 70, color: 'bg-accent' },
        { subject: 'UI/UX Design', progress: 90, color: 'bg-primary-600' },
    ];

    const masteredTopics = [
        { topic: 'Redux Sagas', status: 'Perfect score in recent quiz' },
        { topic: 'Mongoose Middleware', status: 'Optimal module completion' },
        { topic: 'LangChain Memory', status: 'Core concepts verified' },
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
                        Performance <span className="text-primary-600">Insights</span> <BarChart className="text-accent" />
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Deep dive into your learning patterns and growth metrics.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all">
                        <Calendar size={18} /> Last 7 Days
                    </button>
                    <button
                        onClick={() => {
                            setIsProcessing('report');
                            setTimeout(() => {
                                setIsProcessing(null);
                                // Quietly update context for when user chooses to open AI
                                useAIStore.getState().setActiveLesson({ title: 'Performance Report', aiInfo: 'Analysis of recent learning trends and efficiency metrics.' });
                            }, 1500);
                        }}
                        disabled={isProcessing === 'report'}
                        className="btn-accent gap-2 !px-8 relative overflow-hidden"
                    >
                        {isProcessing === 'report' ? (
                            <>
                                <div className="absolute inset-0 bg-primary-600 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                                </div>
                                <span className="opacity-0">Export report</span>
                            </>
                        ) : (
                            <>
                                <Download size={18} /> Export report
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Skill Graph */}
                <div className="lg:col-span-2 pro-card p-8 bg-white dark:bg-slate-900 shadow-xl shadow-primary-900/5">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-black flex items-center gap-3">
                            Skill Mastery Analysis
                        </h3>
                        <span className="text-[10px] font-black bg-primary-50 text-primary-600 px-3 py-1 rounded-full uppercase tracking-widest">Active session</span>
                    </div>
                    <div className="space-y-6">
                        {skillData.map((skill, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">{skill.subject}</span>
                                    <span className="text-primary-600 font-black text-sm">{skill.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.progress}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        className={`h-full ${skill.color} rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Focus Stats */}
                <div className="space-y-6">
                    <div className="pro-card p-8 bg-primary-600 text-white relative overflow-hidden group">
                        <Sparkles className="absolute -top-6 -right-6 text-white/10" size={120} />
                        <Clock className="mb-4 text-accent" size={32} />
                        <h4 className="text-4xl font-black mb-1 tracking-tight">24.5h</h4>
                        <p className="text-primary-50 text-sm font-bold opacity-80">Focus study time this week</p>
                        <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase bg-white/20 px-3 py-1.5 rounded-xl w-fit">
                            <TrendingUp size={14} className="text-accent" /> +12% Efficiency
                        </div>
                    </div>

                    <div className="pro-card p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-xl bg-accent/20 text-primary-900">
                                <Target size={24} />
                            </div>
                            <h4 className="text-lg font-black">Daily Goal</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Today</span>
                                <span className="text-lg font-black text-primary-600">2 <span className="text-slate-300">/</span> 3h</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '66%' }}
                                    transition={{ duration: 1 }}
                                    className="h-full bg-accent rounded-full"
                                />
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium text-center italic">
                                "You're almost there! 45 more minutes to win a badge."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Mastered Topics */}
                <div className="pro-card p-8 border-none bg-emerald-50/50 dark:bg-emerald-950/20">
                    <h3 className="text-xl font-black flex items-center gap-3 mb-6">
                        <CheckCircle className="text-emerald-500" size={24} /> Learning Achievements
                    </h3>
                    <div className="space-y-4">
                        {masteredTopics.map((topic, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ x: 4 }}
                                className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm group"
                            >
                                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 self-start group-hover:scale-110 transition-transform">
                                    <CheckCircle size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors uppercase tracking-tight text-sm">{topic.topic}</p>
                                    <p className="text-[11px] text-slate-500 font-medium mt-1">{topic.status}</p>
                                    <button className="mt-3 flex items-center gap-2 text-primary-600 dark:text-primary-400 text-[10px] font-black uppercase tracking-widest hover:underline group/link">
                                        View Details <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* AI Adaptive Recommendations */}
                <div className="pro-card p-8 border-none bg-primary-50/50 dark:bg-primary-950/20">
                    <h3 className="text-xl font-black flex items-center gap-3 mb-6">
                        <Sparkles className="text-primary-600" size={24} /> Learning Growth
                    </h3>
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-primary-100 dark:border-primary-900 shadow-sm hover:shadow-md transition-all">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-600 mb-2 block">Optimal next step</span>
                            <p className="font-bold text-lg mb-2">Build a micro-project</p>
                            <p className="text-xs text-slate-500 font-medium mb-5 leading-relaxed">Applying React performance concepts in a real task will boost your mastery by 15%.</p>
                            <button
                                onClick={() => {
                                    setIsProcessing('project');
                                    setTimeout(() => {
                                        setIsProcessing(null);
                                        // Quietly update context
                                        useAIStore.getState().setActiveLesson({ title: 'New Micro-Project', aiInfo: 'Plan for building a React performance prototype.' });
                                    }, 1500);
                                }}
                                disabled={isProcessing === 'project'}
                                className="btn-primary w-full py-3 text-[10px] uppercase tracking-widest relative"
                            >
                                {isProcessing === 'project' ? "AI Planning project..." : "Start project"}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
                                <p className="font-black text-primary-900 text-[9px] uppercase tracking-widest mb-1">Peak focus</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">10:00 AM - 1:00 PM</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800">
                                <p className="font-black text-primary-600 text-[9px] uppercase tracking-widest mb-1">Peers Active</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">12 Friends Online</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Analytics;
