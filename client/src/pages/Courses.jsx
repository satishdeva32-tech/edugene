import React, { useState, useEffect } from 'react';
import { PlayCircle, FileText, CheckCircle2, ChevronRight, Bookmark, Clock, Star, Zap, LayoutGrid, ArrowLeft, Play, Info, Sparkles as SparklesIcon, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import useAIStore from '../store/useAIStore';
import Quiz from '../components/Quiz';

const Courses = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [processingModule, setProcessingModule] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);

    const courses = [
        {
            id: 1,
            title: "Advanced React Mastering",
            description: "Deep dive into React performance, advanced patterns, and enterprise scalability.",
            progress: 65,
            modules: 12,
            completed: 8,
            difficulty: "Intermediate",
            lastAccessed: "2h ago",
            color: "primary-600",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
            aiInsights: "Focus on React.memo and useMemo optimization for your next module. You've shown great progress in Custom Hooks.",
            videos: [
                { title: "Introduction to Concurrent Mode", duration: "12:45", completed: true, youtubeId: "0S1fH_J6kMo", aiInfo: "Concurrent Mode is a set of new features that help React apps stay responsive and gracefully adjust to the user's device capabilities and network speed." },
                { title: "Advanced Reconciliation Algorithms", duration: "18:20", completed: true, youtubeId: "ZCuYPiUIONs", aiInfo: "React's diffing algorithm is O(n). We explore how Fiber architecture allows for interruptible rendering and priority-based updates." },
                { title: "Profiling Production Apps", duration: "15:10", completed: false, youtubeId: "7k7GMB05fSg", aiInfo: "Learn how to use the React DevTools Profiler to identify 'wasted' renders and bottleneck components in a real-world production environment." },
                { title: "Implementing Server Components", duration: "22:00", completed: false, youtubeId: "t2ykisGisV0", aiInfo: "Zero-bundle-size components that run on the server. We'll build a data-heavy dashboard using RSC and Suspense for fetching." },
            ]
        },
        {
            id: 2,
            title: "Node.js & Express Pro",
            description: "Build robust backend architectures with production-grade security and middleware.",
            progress: 30,
            modules: 10,
            completed: 3,
            difficulty: "Beginner",
            lastAccessed: "1d ago",
            color: "slate-500",
            image: "https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=800&auto=format&fit=crop",
            aiInsights: "Your understanding of JWT is solid. Next: deep dive into MongoDB aggregation pipelines.",
            videos: [
                { title: "Node.js Event Loop Deep Dive", duration: "10:30", completed: true },
                { title: "Express Middleware Patterns", duration: "14:50", completed: true },
                { title: "Database Security Best Practices", duration: "11:15", completed: false },
            ]
        },
        {
            id: 3,
            title: "AI Workflows with LangChain",
            description: "Build adaptive AI agents that can reason, plan, and execute complex business tasks.",
            progress: 10,
            modules: 15,
            completed: 1,
            difficulty: "Advanced",
            lastAccessed: "3d ago",
            color: "emerald-500",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
            aiInsights: "Start with RAG implementation. Your prompt engineering skills will accelerate this course.",
            videos: [
                { title: "Introduction to LLMs", duration: "08:20", completed: true },
                { title: "Vector Stores and Embeddings", duration: "20:45", completed: false },
                { title: "Building Autonomous Agents", duration: "25:30", completed: false },
            ]
        }
    ];

    if (selectedCourse) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
            >
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-6">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCourse(null)}
                        className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-primary-600 transition-all shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </motion.button>
                    <div>
                        <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest leading-none mb-1">Back to learning path</p>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white">{selectedCourse.title}</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: AI Highlights & Videos */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Video Player Placeholder */}
                        {showQuiz ? (
                            <div className="pro-card p-0 bg-white dark:bg-slate-900 min-h-[500px] rounded-3xl overflow-hidden relative shadow-2xl shadow-primary-900/10 border border-slate-100 dark:border-slate-800">
                                <Quiz
                                    module={selectedCourse.videos[currentVideoIndex]}
                                    onComplete={() => setShowQuiz(false)}
                                />
                            </div>
                        ) : (
                            <div className="pro-card !p-0 bg-slate-900 aspect-video rounded-3xl overflow-hidden relative group shadow-2xl shadow-primary-900/10">
                                {selectedCourse.videos[currentVideoIndex]?.youtubeId ? (
                                    <iframe
                                        className="w-full h-full border-none"
                                        src={`https://www.youtube.com/embed/${selectedCourse.videos[currentVideoIndex].youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Course Video"
                                    ></iframe>
                                ) : (
                                    <>
                                        <img src={selectedCourse.image} alt="Video Preview" className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-3xl shadow-primary-600/40 relative z-10"
                                            >
                                                <Play size={40} fill="currentColor" />
                                            </motion.button>
                                        </div>
                                    </>
                                )}
                                <div className="absolute bottom-10 left-10 right-10">
                                    <h4 className="text-2xl font-black text-white mb-2">
                                        {selectedCourse.videos[currentVideoIndex]?.title || "Course Video"}
                                    </h4>
                                    <div className="flex items-center gap-4 text-white/70 text-xs font-bold font-black tracking-widest uppercase">
                                        <span className="flex items-center gap-1.5"><Clock size={14} /> Module {currentVideoIndex + 1}</span>
                                        <span>•</span>
                                        <span>{selectedCourse.videos[currentVideoIndex]?.duration || "0:00"} Duration</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowQuiz(!showQuiz)}
                                className={`flex-1 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all ${showQuiz
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                    : 'bg-primary-600 text-white shadow-lg shadow-primary-600/20 hover:bg-primary-700'}`}
                            >
                                {showQuiz ? <><Play size={16} fill="currentColor" /> Resume Lesson</> : <><Brain size={16} /> Check Knowledge</>}
                            </button>
                            {!showQuiz && (
                                <button className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl font-black uppercase text-xs tracking-widest text-slate-500 hover:text-primary-600 transition-all">
                                    Resources
                                </button>
                            )}
                        </div>

                        {/* Video List */}
                        <div className="pro-card p-8">
                            <h3 className="text-xl font-black flex items-center gap-3 mb-8">
                                <PlayCircle className="text-primary-600" /> Course Content
                            </h3>
                            <div className="space-y-4">
                                {selectedCourse.videos.map((video, idx) => (
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        key={idx}
                                        onClick={() => {
                                            if (currentVideoIndex === idx) return;
                                            setProcessingModule(video.title);
                                            setTimeout(() => {
                                                setProcessingModule(null);
                                                setCurrentVideoIndex(idx);
                                                useAIStore.getState().setActiveLesson(video);
                                            }, 1200);
                                        }}
                                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer group relative ${currentVideoIndex === idx
                                            ? 'bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-800'
                                            : video.completed
                                                ? 'bg-emerald-50/50 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/30'
                                                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}
                                    >
                                        {processingModule === video.title ? (
                                            <div className="absolute inset-0 bg-primary-600/10 backdrop-blur-[1px] flex items-center justify-center rounded-2xl z-20">
                                                <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 rounded-full shadow-lg border border-primary-100">
                                                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" />
                                                    <span className="text-[8px] font-black uppercase text-primary-600 tracking-widest">AI Syncing...</span>
                                                </div>
                                            </div>
                                        ) : null}
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black ${currentVideoIndex === idx ? 'bg-primary-600 text-white' : video.completed ? 'bg-emerald-500 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-colors'}`}>
                                                {video.completed && currentVideoIndex !== idx ? <CheckCircle2 size={24} /> : idx + 1}
                                            </div>
                                            <div>
                                                <p className={`font-bold transition-colors ${currentVideoIndex === idx ? 'text-primary-600' : video.completed ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-white group-hover:text-primary-600'}`}>{video.title}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{video.duration}</p>
                                            </div>
                                        </div>
                                        {currentVideoIndex !== idx && !video.completed && <ChevronRight size={20} className="text-slate-300 group-hover:text-primary-600 transition-colors" />}
                                        {currentVideoIndex === idx && <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: AI Assistant & Progress */}
                    <div className="space-y-8">
                        {/* AI Insights Panel */}
                        <div className="pro-card p-8 bg-primary-600 text-white relative overflow-hidden">
                            <SparklesIcon className="absolute -top-10 -right-10 text-white/10" size={160} />
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
                                    <Zap size={20} className="text-accent" />
                                </div>
                                <h4 className="text-lg font-black">AI Tutor Insights</h4>
                            </div>
                            <p className="text-sm font-medium leading-relaxed text-primary-50 mb-7 relative z-10">
                                {selectedCourse.videos[currentVideoIndex]?.aiInfo || selectedCourse.aiInsights}
                            </p>
                            <button className="w-full py-4 bg-accent text-primary-900 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-accent/20 hover:scale-[1.02] transition-transform relative z-10">
                                Ask a Question
                            </button>
                        </div>

                        {/* AI-Generated Roadmap */}
                        <div className="pro-card p-8 bg-slate-900 border border-slate-800 text-white">
                            <h4 className="text-lg font-black mb-6 flex items-center gap-3">
                                <SparklesIcon size={20} className="text-accent" /> AI Adaptive Roadmap
                            </h4>
                            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-800">
                                {[
                                    { phase: "Foundation", goal: "Core Concepts Mastering" },
                                    { phase: "Application", goal: "System Architecture & Patterns" },
                                    { phase: "Optimization", goal: "Performance & Scaling" }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4 relative">
                                        <div className="w-6 h-6 rounded-full bg-slate-800 border-4 border-slate-900 shrink-0 z-10 flex items-center justify-center">
                                            {i === 0 && <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />}
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-primary-400 uppercase tracking-widest leading-none mb-1">{step.phase}</p>
                                            <p className="text-xs font-bold text-slate-300">{step.goal}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Progress Overview */}
                        <div className="pro-card p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <h4 className="text-lg font-black mb-6 flex items-center gap-3">
                                <Info size={20} className="text-primary-600" /> Stats Overview
                            </h4>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between font-black uppercase text-[10px] tracking-widest">
                                        <span className="text-slate-400">Mastery</span>
                                        <span className="text-primary-600">{selectedCourse.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${selectedCourse.progress}%` }}
                                            className="h-full bg-primary-600 rounded-full"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
                                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Time Spent</p>
                                        <p className="text-lg font-black">12.4h</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30">
                                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Achievements</p>
                                        <p className="text-lg font-black">4</p>
                                    </div>
                                </div>
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
                        My <span className="text-primary-600">Learning Path</span> <LayoutGrid className="text-accent" />
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Pick up where you left off with your AI-powered curriculum.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all">My Library</button>
                    <button className="btn-primary">Explore Catalog</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <GlassCard className="h-full flex flex-col !p-0 overflow-hidden group shadow-lg shadow-primary-900/5">
                            {/* Course Image Header */}
                            <div className="relative h-48 overflow-hidden">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary-600/90 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                        {course.difficulty}
                                    </span>
                                </div>
                                <button className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-primary-600 transition-all">
                                    <Bookmark size={16} />
                                </button>
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest opacity-90">
                                        <span className="flex items-center gap-1"><Clock size={12} /> {course.lastAccessed}</span>
                                        <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                                        <span className="flex items-center gap-1"><Star size={12} fill="currentColor" className="text-accent" /> 4.9</span>
                                    </div>
                                </div>
                            </div>

                            {/* Course Body */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-primary-600 transition-colors">{course.title}</h3>

                                <div className="space-y-5 mb-8">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                                            <span className="text-sm font-black text-primary-600">{course.progress}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${course.progress}%` }}
                                                transition={{ duration: 1, delay: 0.4 }}
                                                className="h-full bg-primary-600 rounded-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Modules</p>
                                            <p className="text-sm font-black text-center">{course.modules}</p>
                                        </div>
                                        <div className="space-y-1 border-l border-slate-200 dark:border-slate-700">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Done</p>
                                            <p className="text-sm font-black text-center text-emerald-500">{course.completed}</p>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedCourse(course)}
                                    className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 group/btn shadow-lg shadow-primary-600/10 hover:bg-primary-700 hover:shadow-primary-700/20 transition-all mt-auto"
                                >
                                    Continue <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Courses;
