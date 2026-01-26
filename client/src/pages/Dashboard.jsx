import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { Book, CheckCircle, TrendingUp, Clock, Sparkles, Zap, Target, Star, ChevronRight, Users, MessageSquare, Trophy, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import useAIStore from '../store/useAIStore';

const Dashboard = () => {
    const [processingTask, setProcessingTask] = useState(null);
    const [activeTaskDetail, setActiveTaskDetail] = useState(null);
    const nudgeAI = useAIStore(state => state.nudgeAI);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const stats = [
        { label: "Course Progress", value: "75%", icon: TrendingUp, color: "text-primary-600", bg: "bg-primary-50" },
        { label: "Tasks Done", value: "4/6", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
        { label: "Study Time", value: "12.5h", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
        { label: "Active Mentors", value: "3", icon: Book, color: "text-blue-500", bg: "bg-blue-50" },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            {/* Welcome Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        Hey there, <span className="text-primary-600">Student!</span> <Sparkles className="text-accent animate-pulse" />
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Ready to continue your personalized learning journey?</p>
                </div>
                <button
                    onClick={() => useAIStore.getState().nudgeAI('Continue Learning', 'I want to jump back into my most recent lesson. What was I working on?')}
                    className="btn-accent group"
                >
                    <Zap size={18} className="group-hover:fill-current transition-all" />
                    Continue Learning
                    <ChevronRight size={18} />
                </button>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <GlassCard className="flex items-center gap-4 py-5 hover:border-primary-200">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main learning path */}
                <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                    <div className="pro-card p-8 bg-white dark:bg-slate-900 shadow-xl shadow-primary-900/5">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black flex items-center gap-2">
                                <Target className="text-primary-600" /> Your Learning Roadmap
                            </h3>
                            <span className="text-[10px] font-black bg-accent/20 text-primary-900 px-3 py-1 rounded-full uppercase tracking-wider">AI Powered</span>
                        </div>

                        <div className="space-y-4">
                            {[
                                { title: 'Neural Architecture I', sub: 'Part 2: Render Props vs Hooks', time: '15m left', progress: 65, color: 'bg-primary-600' },
                                { title: 'Node.js Performance', sub: 'Event Loop & Worker Threads', time: '45m est.', progress: 0, color: 'bg-slate-200' },
                                { title: 'System Design 101', sub: 'Horizontal Scaling Basics', time: '1h est.', progress: 0, color: 'bg-slate-200' },
                            ].map((item, i) => (
                                <div key={i} className="group flex items-center gap-5 p-5 rounded-2xl border border-slate-50 dark:border-slate-800 hover:border-primary-100 dark:hover:border-primary-900 hover:bg-primary-50/30 dark:hover:bg-primary-900/5 transition-all">
                                    {processingTask === item.title ? (
                                        <div className="absolute inset-0 bg-primary-600/10 backdrop-blur-[2px] flex items-center justify-center rounded-2xl z-20">
                                            <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-slate-900 rounded-full shadow-lg border border-primary-100">
                                                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" />
                                                <span className="text-[10px] font-black uppercase text-primary-600 tracking-widest">AI Working...</span>
                                            </div>
                                        </div>
                                    ) : null}
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                        0{i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">{item.title}</h4>
                                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Clock size={10} /> {item.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium mb-3">{item.sub}</p>
                                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.progress}%` }} />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setProcessingTask(item.title);
                                            setTimeout(() => {
                                                setProcessingTask(null);
                                                // Update task context for the assistant, but do not open it.
                                                useAIStore.getState().setActiveLesson({ title: item.title, aiInfo: item.sub });
                                            }, 1500);
                                        }}
                                        className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all hover:bg-primary-600 hover:text-white hover:shadow-lg hover:shadow-primary-600/20"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* AI Recommendations & Growth */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <div className="pro-card p-8 bg-primary-600 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4">
                            <Sparkles size={120} />
                        </div>
                        <h3 className="text-xl font-black mb-4 flex items-center gap-2 relative z-10">AI Mentor Insight</h3>
                        <p className="text-primary-50/90 text-sm font-medium leading-relaxed mb-6 relative z-10">
                            "You've shown great grasp of State Management! I recommend diving into <b>Server Side Rendering</b> to complete your full-stack journey."
                        </p>
                        <button
                            onClick={() => useAIStore.getState().nudgeAI('New Module', 'I am starting a new recommended module. Give me a high-level overview of what I should expect.')}
                            className="w-full py-3 bg-accent text-primary-900 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-black/10 hover:bg-white transition-colors relative z-10"
                        >
                            Start Module
                        </button>
                    </div>

                    <div className="pro-card p-8">
                        <h3 className="text-lg font-black flex items-center gap-2 mb-6">
                            <Trophy size={20} className="text-accent" /> Recent Achievements
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { icon: Zap, label: "Fast Learner", color: "bg-amber-100 text-amber-600" },
                                { icon: Brain, label: "Deep Thinker", color: "bg-indigo-100 text-indigo-600" },
                                { icon: Star, label: "Top Scorer", color: "bg-emerald-100 text-emerald-600" },
                            ].map((badge, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2">
                                    <div className={`w-12 h-12 rounded-2xl ${badge.color} flex items-center justify-center shadow-inner`}>
                                        <badge.icon size={24} />
                                    </div>
                                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter text-center">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pro-card p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-black flex items-center gap-2">
                                <Star className="text-accent fill-current" /> Performance
                            </h3>
                        </div>
                        <div className="h-40 flex items-end gap-3 px-1">
                            {[60, 85, 45, 95, 70].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                                    className={`flex-1 rounded-t-lg relative group ${h > 80 ? 'bg-primary-600' : 'bg-primary-200 dark:bg-primary-800'}`}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {h}% Score
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase">Mon</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase">Fri</span>
                        </div>
                    </div>

                    <div className="pro-card p-8 bg-slate-50 dark:bg-slate-900/50 border-none">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-black flex items-center gap-2">
                                <Users size={20} className="text-primary-600" /> Study Group
                            </h3>
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="flex items-center gap-2 mb-6">
                            {['A', 'B', 'C', 'D'].map((p, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -4 }}
                                    className={`w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-black text-white shadow-lg ${i % 2 === 0 ? 'bg-indigo-500' : 'bg-primary-600'} -ml-2 first:ml-0 cursor-pointer`}
                                >
                                    {p}
                                </motion.div>
                            ))}
                            <div className="ml-2">
                                <p className="text-[10px] font-black text-slate-900 dark:text-white leading-none">12 Active</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Online Now</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                <MessageSquare size={14} className="mt-1 text-primary-600" />
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Trending Topic</p>
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 italic">"How to optimize React Renders?"</p>
                                </div>
                            </div>
                            <button className="w-full py-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-primary-50 hover:text-primary-600 transition-all">
                                Join Room
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
