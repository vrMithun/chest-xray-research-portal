import React from 'react';
import { 
  FileText, 
  Activity, 
  Layers, 
  BarChart2, 
  Compass, 
  BookOpen, 
  Image as ImageIcon,
  Cpu
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { RESEARCH_IDENTITY } from '../data/researchData';

export type TabKey = 
  | 'overview' 
  | 'methodology' 
  | 'architectures' 
  | 'results' 
  | 'statistics' 
  | 'discussion' 
  | 'resources' 
  | 'figures';

interface NavbarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const navItems: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <Activity size={15} /> },
    { key: 'methodology', label: 'Methodology & Pipeline', icon: <Compass size={15} /> },
    { key: 'architectures', label: 'Architectures (M1–M7)', icon: <Layers size={15} /> },
    { key: 'results', label: 'Experimental Results', icon: <BarChart2 size={15} /> },
    { key: 'statistics', label: 'Statistical Analysis', icon: <Cpu size={15} /> },
    { key: 'discussion', label: 'Discussion & Limitations', icon: <BookOpen size={15} /> },
    { key: 'figures', label: 'Publication Figures', icon: <ImageIcon size={15} /> },
    { key: 'resources', label: 'Reproducibility & Code', icon: <GithubIcon size={15} /> },
  ];

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-topline">
          <div className="brand-wrapper" onClick={() => onSelectTab('overview')} style={{ cursor: 'pointer' }}>
            <div className="brand-icon">
              CXR
            </div>
            <div className="brand-text">
              <span className="brand-title">Chest X-ray Multi-Label Classification Portal</span>
              <span className="brand-subtitle">NIH ChestX-ray14 Benchmark &bull; Comparative Empirical Study (M1–M7)</span>
            </div>
          </div>

          <div className="header-actions">
            <a 
              href={RESEARCH_IDENTITY.pdfPath} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="action-btn action-btn-primary"
              title="Open full 31-page research manuscript PDF"
            >
              <FileText size={15} />
              <span>Paper PDF (31 pp)</span>
            </a>
            <a 
              href={RESEARCH_IDENTITY.publicRepoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="action-btn"
              title="Visit official GitHub repository"
            >
              <GithubIcon size={15} />
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>

        <nav className="header-nav" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`nav-tab ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => onSelectTab(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
