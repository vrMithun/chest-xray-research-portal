import React, { useState } from 'react';
import { Copy, Check, FileText, ExternalLink, ShieldAlert } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { RESEARCH_IDENTITY } from '../data/researchData';
import { TabKey } from './Navbar';

interface FooterProps {
  onSelectTab: (tab: TabKey) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const [copied, setCopied] = useState(false);

  const bibtexCitation = `@article{chex_hybrid_error_dynamics_2026,
  title={Architectural Integration Strategies and Diagnostic Error Dynamics in Multi-Label Chest X-ray Classification: A Comparative Empirical Study of CNNs, Swin Transformers, and Hybrid Models},
  author={Research Engineering Team},
  journal={arXiv preprint},
  year={2026}
}`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(bibtexCitation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Research Identity & Citation</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem', lineHeight: 1.45 }}>
              <strong>Title:</strong> {RESEARCH_IDENTITY.title}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Evaluated on the benchmark NIH ChestX-ray14 dataset (112,120 radiographs, 30,805 unique patients). Zero patient leakage enforced.
            </p>
            
            <div style={{ marginTop: '0.75rem' }}>
              <button 
                onClick={handleCopyCitation} 
                className="action-btn"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                {copied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                <span>{copied ? 'Citation Copied to Clipboard!' : 'Copy BibTeX Citation'}</span>
              </button>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul className="footer-links">
              <li><a href="#overview" onClick={(e) => { e.preventDefault(); onSelectTab('overview'); }}>Executive Summary</a></li>
              <li><a href="#methodology" onClick={(e) => { e.preventDefault(); onSelectTab('methodology'); }}>Methodology & Pipeline</a></li>
              <li><a href="#architectures" onClick={(e) => { e.preventDefault(); onSelectTab('architectures'); }}>Models M1 through M7</a></li>
              <li><a href="#results" onClick={(e) => { e.preventDefault(); onSelectTab('results'); }}>Quantitative Results Table</a></li>
              <li><a href="#statistics" onClick={(e) => { e.preventDefault(); onSelectTab('statistics'); }}>Patient-Cluster Bootstrap (B=2,000)</a></li>
              <li><a href="#discussion" onClick={(e) => { e.preventDefault(); onSelectTab('discussion'); }}>Negative Results & Discussion</a></li>
              <li><a href="#resources" onClick={(e) => { e.preventDefault(); onSelectTab('resources'); }}>Reproducibility & Code</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Research Resources</h4>
            <ul className="footer-links">
              <li>
                <a href={RESEARCH_IDENTITY.publicRepoUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <GithubIcon size={14} /> GitHub Repository <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a href={RESEARCH_IDENTITY.pdfPath} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <FileText size={14} /> Publication PDF (31 Pages) <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a href="https://nihcc.app.box.com/v/ChestXray-NIHCC" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  NIH ChestX-ray14 Source <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a href="https://www.kaggle.com/datasets/nih-chest-xrays/data" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  Kaggle Mirror <ExternalLink size={11} />
                </a>
              </li>
            </ul>

            <div style={{ marginTop: '1rem', padding: '0.65rem 0.85rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.72rem', color: '#64748b' }}>
              <strong>Status:</strong> Ready for Submission (LaTeX compiled clean via Tectonic; author details pending).
            </div>
          </div>
        </div>

        <div className="alert-box alert-warning" style={{ fontSize: '0.75rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
          <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
          <div>
            <strong>Scientific & Clinical Disclaimer:</strong> This web portal documents retrospective algorithmic benchmarks on the public NIH ChestX-ray14 dataset. Reported diagnostic error reductions reflect algorithmic properties on benchmark data and must not be construed as clinical efficacy, diagnostic readiness, or medical advice. No prospective clinical trial registration exists.
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Architectural Integration Strategies in Multi-Label Chest X-ray Classification.
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span>Dataset: NIH ChestX-ray14</span>
            <span>&bull;</span>
            <span>Seed: 42</span>
            <span>&bull;</span>
            <span>Zero Patient Leakage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
