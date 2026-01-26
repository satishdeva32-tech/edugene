import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { Mail, Lock, User, GraduationCap, ArrowRight, Github, Sparkles, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';
import axios from 'axios';
import logo from '../assets/logo.png';

import { API_URL } from '../config';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { setUser, setToken } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

        try {
            const { data } = await axios.post(`${API_URL}${endpoint}`, formData);
            if (data.success) {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem('token', data.token);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <div className="premium-bg" />

            <div className="absolute top-10 left-10 flex items-center gap-4">
                <img src={logo} alt="EduGenie mascot" className="w-16 h-16 object-contain" />
                <span className="text-primary-600 font-black text-3xl tracking-tight">EduGenie</span>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[440px] relative z-10"
            >
                <div className="pro-card !p-10 bg-white dark:bg-slate-900 shadow-2xl shadow-primary-900/10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isLogin ? 'login' : 'signup'}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 text-[10px] font-black uppercase tracking-widest mb-4">
                                    <Sparkles size={12} className="text-accent" /> {isLogin ? 'Welcome Back' : 'Get Started'}
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 leading-none">
                                    {isLogin ? 'Continue Learning' : 'Create Account'}
                                </h2>
                                <p className="text-slate-500 text-sm font-medium">
                                    {isLogin ? "Sign in to access your AI-powered dashboard." : "Join thousands of students on their AI-learning journey."}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {!isLogin && (
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors">
                                                <User size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary-600/10 focus:border-primary-600 outline-none transition-all font-semibold text-sm"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="hello@example.com"
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary-600/10 focus:border-primary-600 outline-none transition-all font-semibold text-sm"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                                        {isLogin && <button type="button" className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline">Forgot?</button>}
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary-600/10 focus:border-primary-600 outline-none transition-all font-semibold text-sm"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                {!isLogin && (
                                    <div className="flex gap-2 pt-2">
                                        {['student', 'teacher'].map((role) => (
                                            <button
                                                key={role}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, role })}
                                                className={`flex-1 py-2.5 rounded-xl border-2 flex items-center justify-center gap-2 transition-all font-bold text-[10px] uppercase tracking-widest ${formData.role === role
                                                    ? 'bg-primary-50 border-primary-600 text-primary-600 shadow-md shadow-primary-600/5'
                                                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary-200'
                                                    }`}
                                            >
                                                {role === 'student' ? <GraduationCap size={14} /> : <User size={14} />}
                                                {role}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-rose-500 text-[11px] font-bold text-center bg-rose-50 dark:bg-rose-900/10 py-3 rounded-xl border border-rose-100 dark:border-rose-900/30"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary !py-4 mt-4 shadow-xl shadow-primary-600/20"
                                >
                                    {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                                    <ArrowRight size={18} strokeWidth={3} />
                                </motion.button>
                            </form>

                            <div className="mt-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                                    <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Social login</span>
                                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-xs">
                                        <Github size={16} /> GitHub
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-xs">
                                        <span className="text-primary-600 font-black">G</span> Google
                                    </button>
                                </div>

                                <p className="mt-8 text-center text-slate-500 font-bold text-xs uppercase tracking-widest">
                                    {isLogin ? "New here?" : "Joined already?"}
                                    <button
                                        onClick={() => setIsLogin(!isLogin)}
                                        className="ml-2 text-primary-600 hover:text-primary-700 transition-colors underline decoration-2 underline-offset-4"
                                    >
                                        {isLogin ? 'Create Account' : 'Sign In Now'}
                                    </button>
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
