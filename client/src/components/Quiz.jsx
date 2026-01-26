import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw, Trophy, Brain, Info, Star } from 'lucide-react';

const Quiz = ({ course, module, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    // Simulated Dynamic Questions based on module/course
    const questions = [
        {
            question: `What is the primary architectural benefit of using ${module?.title || 'this module'} in a production environment?`,
            options: [
                "Enhanced scalability and modularity",
                "Reduced development time only",
                "Compatibility with legacy systems",
                "Styling flexibility"
            ],
            correct: 0,
            explanation: "Modularity allows for better isolation of concerns and independent scaling of components."
        },
        {
            question: "Which of the following best describes the 'Single Responsibility Principle' in this context?",
            options: [
                "One component should handle all state",
                "Every function must be pure",
                "A component should do one thing and do it well",
                "All logic must stay in the backend"
            ],
            correct: 2,
            explanation: "SRP is fundamental for making codebases maintainable and testable over time."
        },
        {
            question: "How does the AI Assistant typically help during this specific task?",
            options: [
                "By writing all code automatically",
                "Providing real-time context and supportive tips",
                "Fixing all bugs instantly",
                "It doesn't help in this scenario"
            ],
            correct: 1,
            explanation: "The assistant provides proactive guidance to bridge the gap between theory and practice."
        }
    ];

    const handleAnswer = (idx) => {
        if (isAnswered) return;
        setSelectedAnswer(idx);
        setIsAnswered(true);
        if (idx === questions[currentIndex].correct) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setShowResults(true);
        }
    };

    if (showResults) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
            >
                <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy size={48} className="text-primary-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Knowledge Recap</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">
                    You've mastered {Math.round((score / questions.length) * 100)}% of this module's core concepts.
                </p>
                {score === questions.length && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 mb-8 border border-emerald-500/20"
                    >
                        <Star size={12} fill="currentColor" /> Achievement Unlocked: Top Scorer!
                    </motion.div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Score</p>
                        <p className="text-xl font-black text-primary-600">{score} / {questions.length}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rank</p>
                        <p className="text-xl font-black text-emerald-500">Expert</p>
                    </div>
                </div>

                <div className="p-6 rounded-3xl bg-primary-600 text-white text-left relative overflow-hidden group mb-8">
                    <Brain className="absolute -top-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" size={100} />
                    <h4 className="font-bold mb-2 flex items-center gap-2 underline decoration-accent/50 underline-offset-4">AI Mentor Insight</h4>
                    <p className="text-sm font-medium leading-relaxed opacity-90">
                        "Your performance on {module?.title} is impressive. I recommend moving to the Advanced Patterns next for a total growth spurt!"
                    </p>
                </div>

                <button
                    onClick={onComplete}
                    className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-all"
                >
                    Back to Module
                </button>
            </motion.div>
        );
    }

    const currentQ = questions[currentIndex];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-1 block">Question {currentIndex + 1} of {questions.length}</span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">{currentQ.question}</h3>
                </div>
            </div>

            <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                    const isCorrect = idx === currentQ.correct;
                    const isSelected = selectedAnswer === idx;
                    let style = "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400";

                    if (isAnswered) {
                        if (isCorrect) style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 font-bold shadow-lg shadow-emerald-500/10";
                        else if (isSelected) style = "border-rose-500 bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400 font-bold";
                        else style = "opacity-40 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400";
                    } else {
                        style += " hover:border-primary-200 hover:bg-primary-50/30 cursor-pointer";
                    }

                    return (
                        <motion.button
                            key={idx}
                            whileHover={!isAnswered ? { x: 4 } : {}}
                            whileTap={!isAnswered ? { scale: 0.98 } : {}}
                            onClick={() => handleAnswer(idx)}
                            className={`w-full p-5 rounded-2xl border text-left transition-all flex justify-between items-center ${style}`}
                        >
                            <span>{option}</span>
                            {isAnswered && isCorrect && <CheckCircle2 size={20} className="text-emerald-500" />}
                            {isAnswered && isSelected && !isCorrect && <XCircle size={20} className="text-rose-500" />}
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {isAnswered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-3xl bg-slate-950 text-white relative overflow-hidden"
                    >
                        <div className="flex gap-4 items-start relative z-10">
                            <div className="mt-1 p-2 rounded-xl bg-white/10">
                                <Info size={18} className="text-accent" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-accent mb-1">Knowledge Pill</h4>
                                <p className="text-sm font-medium leading-relaxed text-slate-300 italic">
                                    {currentQ.explanation}
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={nextQuestion}
                                className="flex items-center gap-2 bg-white text-slate-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-accent transition-colors"
                            >
                                {currentIndex === questions.length - 1 ? "Finish Check" : "Next Insight"} <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Quiz;
