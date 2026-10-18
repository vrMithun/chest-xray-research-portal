import React, { useState } from 'react';
import { RESEARCH_FIGURES } from '../data/researchData';
import { FigureModal } from '../components/FigureModal';
import { Image as ImageIcon, Filter, ExternalLink, Download } from 'lucide-react';

export const FigureGalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFigure, setActiveFigure] = useState<typeof RESEARCH_FIGURES[0] | null>(null);

  const categories = [
    'All',
    'Ranking & Curves',
    'Model Design',
    'Error Analysis',
    'Per-Disease Analysis',
    'Statistical Evaluation',
    'Operating Points',
    'Training Dynamics'
  ];

  const figures = selectedCategory === 'All'
    ? RESEARCH_FIGURES
    : RESEARCH_FIGURES.filter(f => f.category === selectedCategory);

  return (
    <div className="container">
      {/* Title Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-navy">Research Figures</span>
          <span className="badge badge-blue">17 Publication-Grade Assets</span>
        </div>
        <h1 style={{ fontSize: '1.65rem', color: 'var(--navy-deep)', marginBottom: '0.4rem' }}>
          Publication Figure Catalog & Visual Evidence
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '900px' }}>
          Complete collection of high-resolution vector and raster figures generated from primary experiment logs, predictions, ROC/PR curves, false-positive heatmaps, and bootstrap sampling distributions.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`action-btn ${selectedCategory === cat ? 'action-btn-primary' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
          >
            {cat} {cat === 'All' ? `(${RESEARCH_FIGURES.length})` : ''}
          </button>
        ))}
      </div>

      {/* Figures Grid */}
      <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
        {figures.map((fig) => (
          <div
            key={fig.id}
            className="card"
            style={{
              padding: '0.85rem',
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, border-color 0.15s ease'
            }}
            onClick={() => setActiveFigure(fig)}
          >
            <div style={{ position: 'relative', width: '100%', height: '180px', backgroundColor: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '0.75rem' }}>
              <img
                src={fig.filename}
                alt={fig.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                loading="lazy"
              />
              <span 
                className="badge badge-blue" 
                style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '0.65rem', background: 'rgba(255,255,255,0.95)' }}
              >
                {fig.category}
              </span>
            </div>

            <h3 style={{ fontSize: '0.9rem', marginBottom: '0.35rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {fig.title}
            </h3>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.35, flex: 1, margin: 0 }}>
              {fig.caption.length > 120 ? fig.caption.substring(0, 118) + '...' : fig.caption}
            </p>

            <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#2563eb' }}>
              <span>Click to view full resolution &rarr;</span>
              <ExternalLink size={12} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal Inspector */}
      <FigureModal
        figure={activeFigure}
        onClose={() => setActiveFigure(null)}
      />
    </div>
  );
};
