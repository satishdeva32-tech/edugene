import React, { useState, useRef, useEffect } from 'react';
import { Home, BookOpen, Brain, BarChart2, User, LogOut, Menu, X, Bell, Search, Settings, FlaskConical, Maximize2, Minimize2, ChevronDown } from 'lucide-react';
import AIAssistant from './components/AIAssistant';
import useAuthStore from './store/useAuthStore';
import useAIStore from './store/useAIStore';
import { useTheme } from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
// logo check: src/assets/logo.png
const logo = '/src/assets/logo.png';

const MainLayout = ({ children, activePage, setActivePage }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const userMenuRef = useRef(null);
    const { logout } = useAuthStore();
    const { theme, toggleTheme } = useTheme();

    // Handle outside clicks for dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    const menuItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'courses', icon: BookOpen, label: 'My Courses' },
        { id: 'agents', icon: Brain, label: 'AI Mentors' },
        { id: 'lab', icon: FlaskConical, label: 'Practice Lab' },
        { id: 'analytics', icon: BarChart2, label: 'Performance' },
        { id: 'profile', icon: User, label: 'My Profile' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex overflow-hidden">
            <div className="premium-bg" />

            {/* Mobile Menu Toggle */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden fixed top-6 left-6 z-50 p-3 bg-white dark:bg-slate-900 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800"
            >
                {isSidebarOpen ? <X size={20} className="text-primary-600" /> : <Menu size={20} className="text-primary-600" />}
            </motion.button>

            {/* Sidebar */}
            <AnimatePresence>
                {(isSidebarOpen || true) && (
                    <motion.div
                        initial={false}
                        animate={{ x: 0 }}
                        className={`
                            fixed md:relative w-72 h-screen z-40
                            bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800
                            transition-all duration-500 transform
                            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                            flex flex-col p-6 overflow-hidden
                        `}
                    >
                        <div className="flex items-center gap-3 mb-10 px-2">
                            <img src={logo} alt="EduGenie Logo" className="w-12 h-12 object-contain" />
                            <span className="text-2xl font-black tracking-tight text-primary-600 dark:text-white">EduGenie</span>
                        </div>

                        <nav className="flex-1 space-y-2">
                            {menuItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setActivePage(item.id);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${activePage === item.id
                                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 font-bold'
                                        : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400'
                                        }`}
                                >
                                    {activePage === item.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute left-0 w-1.5 h-8 bg-primary-600 rounded-r-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <item.icon size={22} strokeWidth={activePage === item.id ? 2.5 : 2} className={activePage === item.id ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-500'} />
                                    <span className={`tracking-tight ${activePage === item.id ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                                        {item.label}
                                    </span>
                                </motion.button>
                            ))}
                        </nav>

                        <div className="mt-8 p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                            <div className="flex justify-between items-end mb-3">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Level 12</span>
                                <span className="text-xs font-black text-primary-600">85%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '85%' }}
                                    className="h-full bg-primary-600 rounded-full"
                                />
                            </div>
                            <p className="text-[9px] font-bold text-slate-500 mt-2 text-center uppercase tracking-tighter">150 XP to Neural Architect</p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all font-semibold"
                            >
                                <LogOut size={22} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <header className="flex justify-between items-center p-6 h-24 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md z-10">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white capitalize leading-none">
                            {activePage === 'dashboard' ? 'Learning Dashboard' : activePage}
                        </h1>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">
                            Welcome Back, Student
                        </p>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="hidden sm:flex items-center gap-2 mr-2">
                            <button
                                onClick={toggleFullScreen}
                                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors tooltip"
                                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                            >
                                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                            </button>
                            <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors">
                                <Search size={20} />
                            </button>
                            <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors relative">
                                <Bell size={20} />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-white dark:border-slate-900"></span>
                            </button>
                            <button
                                onClick={toggleTheme}
                                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors"
                            >
                                {theme === 'dark' ? <Settings size={20} /> : <Settings size={20} />}
                            </button>
                        </div>
                        <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

                        <div className="relative" ref={userMenuRef}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-3 p-1 pl-3 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                            >
                                <div className="hidden md:block text-right">
                                    <p className="text-xs font-black text-slate-900 dark:text-white leading-none">Student User</p>
                                    <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mt-0.5">Pro Member</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary-900 font-black text-lg shadow-md shadow-accent/20 relative">
                                    S
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                                </div>
                                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                            </motion.div>

                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 z-50 p-2"
                                    >
                                        <div className="p-4 border-b border-slate-50 dark:border-slate-800 mb-2">
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Account</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">student@edugenie.ai</p>
                                        </div>

                                        <div className="space-y-1">
                                            <button
                                                onClick={() => { setActivePage('profile'); setIsUserMenuOpen(false); }}
                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/10 hover:text-primary-600 transition-all"
                                            >
                                                <User size={18} /> View Profile
                                            </button>
                                            <button
                                                onClick={() => { setActivePage('profile'); setIsUserMenuOpen(false); }}
                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/10 hover:text-primary-600 transition-all"
                                            >
                                                <Settings size={18} /> Account Settings
                                            </button>
                                        </div>

                                        <div className="mt-2 pt-2 border-t border-slate-50 dark:border-slate-800">
                                            <button
                                                onClick={() => { logout(); setIsUserMenuOpen(false); }}
                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
                                            >
                                                <LogOut size={18} /> Logout
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-10 pb-24">
                    <div className="max-w-7xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>

            <div className="fixed bottom-8 right-8 z-50">
                <AIAssistant />
            </div>
        </div>
    );
};

export default MainLayout;
