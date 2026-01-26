import React, { useState, lazy, Suspense } from 'react'
import MainLayout from './MainLayout'
import useAuthStore from './store/useAuthStore'
import { ThemeProvider } from './context/ThemeContext'

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Courses = lazy(() => import('./pages/Courses'));
const Agents = lazy(() => import('./pages/Agents'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Profile = lazy(() => import('./pages/Profile'));
const Auth = lazy(() => import('./pages/Auth'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Lab = lazy(() => import('./pages/Lab'));

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [needsOnboarding, setNeedsOnboarding] = useState(true);
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <div className="neural-bg" />
        <Suspense fallback={<div className="min-h-screen soft-gradient" />}>
          <Auth />
        </Suspense>
      </ThemeProvider>
    );
  }

  if (needsOnboarding) {
    return (
      <ThemeProvider>
        <div className="neural-bg" />
        <Suspense fallback={<div className="min-h-screen soft-gradient" />}>
          <Onboarding onComplete={() => setNeedsOnboarding(false)} />
        </Suspense>
      </ThemeProvider>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'courses': return <Courses />;
      case 'agents': return <Agents />;
      case 'analytics': return <Analytics />;
      case 'profile': return <Profile />;
      case 'lab': return <Lab />;
      default: return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="neural-bg" />
      <MainLayout activePage={activePage} setActivePage={setActivePage}>
        <Suspense fallback={<div className="flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>}>
          {renderPage()}
        </Suspense>
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
