import React, { useEffect } from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

interface FigureModalProps {
  figure: {
    id: string;
    title: string;
    filename: string;
    caption: string;
    category?: string;
  } | null;
  onClose: () => void;
}

export const FigureModal: React.FC<FigureModalProps> = ({ figure, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!figure) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span className="badge badge-blue">{figure.category || 'Publication Figure'}</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>{figure.id}</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', margin: 0 }}>{figure.title}</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <a 
              href={figure.filename} 
              download 
              className="action-btn"
              title="Download full resolution figure"
            >
              <Download size={14} />
              <span>Download</span>
            </a>
            <a 
              href={figure.filename} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="action-btn"
              title="Open full resolution in new tab"
            >
              <ExternalLink size={14} />
            </a>
            <button 
              onClick={onClose} 
              className="action-btn"
              style={{ padding: '0.45rem' }}
              title="Close modal (Esc)"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          <img 
            src={figure.filename} 
            alt={figure.title} 
            loading="lazy" 
          />
          <div className="modal-caption">
            <strong>Figure Caption:</strong> {figure.caption}
          </div>
        </div>
      </div>
    </div>
  );
};
