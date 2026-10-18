import React, { useState, useEffect } from 'react';
import { Navbar, TabKey } from './components/Navbar';
import { Footer } from './components/Footer';
import { OverviewPage } from './pages/OverviewPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { ArchitecturesPage } from './pages/ArchitecturesPage';
import { ResultsPage } from './pages/ResultsPage';
import { StatisticalAnalysisPage } from './pages/StatisticalAnalysisPage';
import { DiscussionPage } from './pages/DiscussionPage';
import { FigureGalleryPage } from './pages/FigureGalleryPage';
import { ReproducibilityPage } from './pages/ReproducibilityPage';

export const App: React.FC = () => {
  // Sync tab with URL hash for clean static site navigation on GitHub Pages without 404s
  const getInitialTab = (): TabKey => {
    const hash = window.location.hash.replace('#', '') as TabKey;
    const validTabs: TabKey[] = [
      'overview', 
      'methodology', 
      'architectures', 
      'results', 
      'statistics', 
      'discussion', 
      'figures', 
      'resources'
    ];
    return validTabs.includes(hash) ? hash : 'overview';
  };

  const [activeTab, setActiveTab] = useState<TabKey>(getInitialTab);

  const handleSelectTab = (tab: TabKey) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabKey;
      const validTabs: TabKey[] = [
        'overview', 
        'methodology', 
        'architectures', 
        'results', 
        'statistics', 
        'discussion', 
        'figures', 
        'resources'
      ];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage onSelectTab={handleSelectTab} />;
      case 'methodology':
        return <MethodologyPage />;
      case 'architectures':
        return <ArchitecturesPage />;
      case 'results':
        return <ResultsPage />;
      case 'statistics':
        return <StatisticalAnalysisPage />;
      case 'discussion':
        return <DiscussionPage />;
      case 'figures':
        return <FigureGalleryPage />;
      case 'resources':
        return <ReproducibilityPage />;
      default:
        return <OverviewPage onSelectTab={handleSelectTab} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} onSelectTab={handleSelectTab} />
      
      <main className="page-main">
        {renderActivePage()}
      </main>

      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
};

export default App;
