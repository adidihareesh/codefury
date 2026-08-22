import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import DummyBank from './pages/DummyBank';
import TrustLayer from './pages/TrustLayer';
import { AccessibilityProvider } from './context/AccessibilityContext';

export default function App() {
  // Simple hash-based router for judge reliability without server routing requirements
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentRoute(hash || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo(0, 0);
  };

  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
        {/* Navigation Bar */}
        <Navigation currentRoute={currentRoute} setCurrentRoute={navigateTo} />

        {/* Main Content Area */}
        <main className={`flex-1 ${currentRoute === '/dummy-bank' ? 'pb-0' : 'pb-12'}`}>
          {currentRoute === '/' && <Home setCurrentRoute={navigateTo} />}
          {currentRoute === '/dummy-bank' && <DummyBank setCurrentRoute={navigateTo} />}
          {currentRoute === '/trust-layer' && <TrustLayer setCurrentRoute={navigateTo} />}
        </main>

        {/* Global Footer (Hidden on Dummy Bank) */}
        {currentRoute !== '/dummy-bank' && (
          <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500 font-mono">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>Accessibility Trust Layer • Solving the Disability-as-Fraud Paradox</span>
              <span className="text-teal-400">Frontend-Only Real-Time Demo</span>
            </div>
          </footer>
        )}
      </div>
    </AccessibilityProvider>
  );
}
