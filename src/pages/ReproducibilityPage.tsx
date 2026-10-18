import React, { useState } from 'react';
import { RESEARCH_IDENTITY } from '../data/researchData';
import { 
  FileText, 
  Terminal, 
  FolderTree, 
  Copy, 
  Check, 
  ExternalLink, 
  Cpu, 
  Database,
  Lock
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';

export const ReproducibilityPage: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const codeSnippets = [
    {
      title: "1. Repository Clone & Environment Installation",
      command: `git clone https://github.com/vrMithun/chest-xray-multilabel-classification.git
cd chest-xray-multilabel-classification
pip install -r requirements.txt`
    },
    {
      title: "2. End-to-End Training & Evaluation (Notebook)",
      command: `jupyter notebook "CXR_Hybrid_CNN_Swin_CrossAttention_Local (1).ipynb"`
    },
    {
      title: "3. Patient-Cluster Bootstrap Statistical Analysis (B = 2,000)",
      command: `python Hybrid_Training/statistical_analysis/statistical_analysis.py`
    },
    {
      title: "4. Regenerate Publication Figures from Saved Bootstrap CSVs",
      command: `python Hybrid_Training/statistical_analysis/generate_figures.py`
    },
    {
      title: "5. Compile Statistical Report PDF",
      command: `python Hybrid_Training/statistical_analysis/generate_pdf_report.py`
    }
  ];

  const bibtex = `@article{chex_hybrid_error_dynamics_2026,
  title={Architectural Integration Strategies and Diagnostic Error Dynamics in Multi-Label Chest X-ray Classification: A Comparative Empirical Study of CNNs, Swin Transformers, and Hybrid Models},
  author={Research Engineering Team},
  journal={arXiv preprint},
  year={2026}
}`;

  return (
    <div className="container">
      {/* Title Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-navy">Reproducibility Resources</span>
          <span className="badge badge-success">Open Research Artifacts</span>
        </div>
        <h1 style={{ fontSize: '1.65rem', color: 'var(--navy-deep)', marginBottom: '0.4rem' }}>
          Reproducibility, Codebase Architecture & Technical Resources
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '900px' }}>
          Complete technical guide for reproducing experiments, inspecting audited result CSVs, executing patient-cluster bootstrap routines, and citing this research work.
        </p>
      </div>

      {/* External Resource Links Bar */}
      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        <div className="card" style={{ padding: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '6px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <GithubIcon size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Public GitHub Repository</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source code, notebook & statistical analysis scripts</div>
            </div>
          </div>
          <a href={RESEARCH_IDENTITY.publicRepoUrl} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-primary">
            <span>View Repo</span>
            <ExternalLink size={13} />
          </a>
        </div>

        <div className="card" style={{ padding: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '6px', background: 'var(--navy-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <FileText size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Authoritative Paper PDF</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Complete 31-page publication manuscript</div>
            </div>
          </div>
          <a href={RESEARCH_IDENTITY.pdfPath} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-primary">
            <span>Download PDF</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Verified Execution Commands */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Terminal size={18} color="var(--navy-primary)" />
            <span>Verified Execution Commands for Reproduction</span>
          </div>
          <span className="badge badge-blue">Exact CLI Syntax</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {codeSnippets.map((snip, idx) => (
            <div key={idx} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--navy-deep)' }}>
                  {snip.title}
                </span>
                <button
                  onClick={() => handleCopy(snip.command, idx)}
                  className="action-btn"
                  style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem' }}
                >
                  {copiedIndex === idx ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                  <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre style={{ margin: 0, padding: '0.65rem', background: '#0f172a', color: '#f8fafc', borderRadius: '4px', fontSize: '0.78rem', overflowX: 'auto' }}>
                <code>{snip.command}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Environment & Dependencies */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Cpu size={18} color="var(--navy-primary)" />
              <span>Verified Environment & Dependencies</span>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <p style={{ margin: 0 }}>
              The experiments were verified in an authoritative environment specified in <code>requirements.txt</code>:
            </p>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li><strong>Python:</strong> 3.10+ (tested on Python 3.14.2)</li>
              <li><strong>PyTorch:</strong> 2.10.0 (torchvision 0.25.0)</li>
              <li><strong>Core ML Stack:</strong> NumPy 2.4.2, Pandas 3.0.1, SciPy 1.17.1, Scikit-learn 1.8.0</li>
              <li><strong>Visualization:</strong> Matplotlib 3.10.8, Seaborn 0.13.2</li>
              <li><strong>Hardware:</strong> CUDA-compatible GPU recommended for training (batch size 32)</li>
            </ul>
            <div style={{ padding: '0.65rem', background: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.78rem', color: '#64748b' }}>
              <em>Note for standard environments:</em> For reproduction on Python 3.10–3.12, standard compatible versions (e.g., <code>torch &gt;= 2.1.0</code>, <code>numpy &gt;= 1.24.0</code>) are equally supported.
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Database size={18} color="var(--navy-primary)" />
              <span>Dataset Acquisition & Privacy Guidelines</span>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <p style={{ margin: 0 }}>
              The <strong>NIH ChestX-ray14</strong> dataset is subject to official access terms and is not redistributed in this repository:
            </p>
            <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li>
                Download metadata and images from the <a href="https://nihcc.app.box.com/v/ChestXray-NIHCC" target="_blank" rel="noopener noreferrer">official NIH Box repository</a> or <a href="https://www.kaggle.com/datasets/nih-chest-xrays/data" target="_blank" rel="noopener noreferrer">Kaggle mirror</a>.
              </li>
              <li>Place <code>Data_Entry_2017_v2020.csv</code>, <code>train_val_list.txt</code>, and <code>test_list.txt</code> in the <code>data/</code> folder.</li>
              <li>Extract image batches into <code>data/dataset/images/</code>.</li>
            </ol>
            <div className="alert-box alert-info" style={{ margin: 0, padding: '0.65rem', fontSize: '0.78rem' }}>
              <Lock size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
              <strong>Privacy Protection:</strong> No private local file paths, private credentials, or restricted patient identifiers are exposed on this public documentation portal.
            </div>
          </div>
        </div>
      </div>

      {/* Project Structure Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FolderTree size={18} color="var(--navy-primary)" />
            <span>Repository Directory Architecture</span>
          </div>
          <span className="badge">Sanitized Structure</span>
        </div>

        <pre style={{ margin: 0, padding: '1rem', background: '#0f172a', color: '#f8fafc', borderRadius: '6px', fontSize: '0.78rem', overflowX: 'auto', lineHeight: 1.5 }}>
{`chest-xray-multilabel-classification/
├── CXR_Hybrid_CNN_Swin_CrossAttention_Local (1).ipynb   # End-to-end training and evaluation notebook
├── requirements.txt                                    # Environment dependencies with verified versions
├── README.md                                           # Project overview and reproduction instructions
├── .gitignore                                          # Protection rules for dataset, weights, and logs
├── data/
│   └── README.md                                       # Dataset acquisition and directory setup guide
├── Hybrid_Training/
│   ├── logs/
│   │   ├── experiment_configuration.json               # Full hyperparameter and runtime configuration
│   │   └── M*_history.csv                              # Epoch-by-epoch training/validation metrics
│   ├── results/
│   │   ├── model_comparison.csv                        # Authoritative test-set comparison table
│   │   ├── model_comparison_all_val_tuned_thresholds.csv # Evaluation with validation-tuned thresholds
│   │   ├── fp_per_disease_and_reduction_vs_M1.csv      # False-positive breakdown per disease
│   │   ├── per_class_metrics_M*.csv                    # Detailed per-class metrics per architecture
│   │   └── *.pdf, *.png                                # Evaluation curves (ROC, PR, FP heatmaps)
│   └── statistical_analysis/
│       ├── statistical_analysis.py                     # 2,000-iteration patient-cluster bootstrap
│       ├── generate_figures.py                         # Regeneration of publication statistical figures
│       ├── generate_pdf_report.py                      # Markdown-to-PDF statistical report compiler
│       ├── bootstrap_results.csv                       # Bootstrap confidence intervals and p-values
│       ├── per_disease_statistical_results.csv         # Per-disease Holm-Bonferroni statistical tests
│       └── STATISTICAL_ANALYSIS_REPORT.pdf             # Compiled 11-page publication report (PDF)
└── paper/
    ├── main.tex                                        # Complete LaTeX manuscript source
    ├── references.bib                                  # Complete bibliography
    ├── paper.pdf                                       # Authoritative 31-page compiled PDF
    └── FINAL_TECHNICAL_VALIDATION_REPORT.md            # Final provenance audit and verification report`}
        </pre>
      </div>

      {/* BibTeX Citation Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FileText size={18} color="var(--navy-primary)" />
            <span>BibTeX Citation</span>
          </div>
          <button
            onClick={() => handleCopy(bibtex, 99)}
            className="action-btn"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
          >
            {copiedIndex === 99 ? <Check size={13} color="#059669" /> : <Copy size={13} />}
            <span>{copiedIndex === 99 ? 'Copied' : 'Copy BibTeX'}</span>
          </button>
        </div>

        <pre style={{ margin: 0, padding: '0.85rem', background: '#f8fafc', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.78rem', overflowX: 'auto' }}>
          <code>{bibtex}</code>
        </pre>
      </div>
    </div>
  );
};
