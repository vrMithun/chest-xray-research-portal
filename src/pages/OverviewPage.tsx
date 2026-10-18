import React from 'react';
import { 
  RESEARCH_IDENTITY, 
  ABSTRACT_TEXT, 
  DATASET_SPLITS 
} from '../data/researchData';
import { ModelComparisonChart, FpFnTradeoffChart } from '../components/InteractiveCharts';
import { GithubIcon } from '../components/GithubIcon';
import { 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Scale, 
  ShieldCheck, 
  HelpCircle,
  BarChart3
} from 'lucide-react';
import type { TabKey } from '../components/Navbar';

interface OverviewPageProps {
  onSelectTab: (tab: TabKey) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onSelectTab }) => {

  return (
    <div className="container">
      {/* Title & Metadata Hero Card */}
      <div className="card" style={{ padding: '2rem 1.75rem', borderLeft: '5px solid var(--navy-primary)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
          <span className="badge badge-navy">Peer-Reviewed Scientific Study</span>
          <span className="badge badge-blue">NIH ChestX-ray14 Benchmark</span>
          <span className="badge badge-success">Zero Patient Leakage Enforced</span>
          <span className="badge">112,120 Radiographs</span>
          <span className="badge">B = 2,000 Patient Clusters</span>
        </div>

        <h1 style={{ fontSize: '1.65rem', lineHeight: 1.3, marginBottom: '0.75rem', color: 'var(--navy-deep)' }}>
          {RESEARCH_IDENTITY.title}
        </h1>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '980px', marginBottom: '1.25rem' }}>
          A rigorous comparative empirical study investigating Convolutional Neural Networks (CNNs), Swin Vision Transformers, and hybrid integration architectures for multi-label thoracic pathology classification, with explicit quantification of diagnostic false-positive versus false-negative error dynamics.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a href={RESEARCH_IDENTITY.pdfPath} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-primary">
            <FileText size={15} />
            <span>Download Corrected Manuscript PDF (31 pp)</span>
          </a>
          <a href={RESEARCH_IDENTITY.publicRepoUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
            <GithubIcon size={15} />
            <span>Explore GitHub Repository</span>
          </a>
          <button onClick={() => onSelectTab('methodology')} className="action-btn">
            <span>Inspect Methodology Pipeline</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Primary Empirical Metrics Grid */}
      <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Activity size={18} color="var(--navy-primary)" />
        <span>Primary Measured Empirical Findings (M3 Late Fusion vs. M1 Baseline)</span>
      </h2>

      <div className="metrics-grid">
        <div className="metric-box" style={{ borderTop: '3px solid #2563eb' }}>
          <div className="metric-label">
            <span>Macro AUROC</span>
            <span className="badge badge-success">p &lt; 0.0001</span>
          </div>
          <div className="metric-value">0.8089</div>
          <div className="metric-delta positive">
            &Delta; +0.0124 vs. M1 (0.7965)
          </div>
          <div className="metric-footnote">
            95% Cluster CI: [+0.0104, +0.0147] &bull; Cluster z = 11.54 &bull; Statistically significant
          </div>
        </div>

        <div className="metric-box" style={{ borderTop: '3px solid #2563eb' }}>
          <div className="metric-label">
            <span>Macro Average Precision</span>
            <span className="badge badge-success">p = 4.2 x 10^-7</span>
          </div>
          <div className="metric-value">0.2776</div>
          <div className="metric-delta positive">
            &Delta; +0.0103 vs. M1 (0.2673)
          </div>
          <div className="metric-footnote">
            95% Cluster CI: [+0.0066, +0.0144] &bull; Cluster z = 5.19 &bull; Statistically significant
          </div>
        </div>

        <div className="metric-box" style={{ borderTop: '3px solid #059669' }}>
          <div className="metric-label">
            <span>Total False Positives (FP)</span>
            <span className="badge badge-success">-5.72% Red.</span>
          </div>
          <div className="metric-value">96,613</div>
          <div className="metric-delta positive">
            &minus;5,864 False Alarms vs. M1
          </div>
          <div className="metric-footnote">
            From 102,477 to 96,613 FP &bull; 95% CI: [-6,648, -5,131] &bull; Wald p &lt; 10^-40
          </div>
        </div>

        <div className="metric-box" style={{ borderTop: '3px solid #d97706' }}>
          <div className="metric-label">
            <span>Total False Negatives (FN)</span>
            <span className="badge badge-warning">Inconclusive</span>
          </div>
          <div className="metric-value">4,992</div>
          <div className="metric-delta negative">
            +111 Cases vs. M1 (4,881)
          </div>
          <div className="metric-footnote">
            Percentile CI: [-1, +217] (spans zero) &bull; Non-significant under multiplicity control (p &ge; 0.093)
          </div>
        </div>
      </div>

      {/* Honest Scientific Trade-off Disclosure */}
      <div className="alert-box alert-info" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
        <Scale size={20} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
        <div>
          <strong>Operational Error Trade-off Disclosure:</strong> Decision-level late fusion (M3) reduces total test-set false positives by 5,864 cases (-5.72%, p &lt; 0.0001) while total false negatives increase by 111 cases (+2.27%, from 4,881 to 4,992). This empirical finding demonstrates an operational shift toward higher diagnostic specificity rather than an unconditional reduction across both error modes. Net diagnostic errors (FP + FN) decrease by 5,753 erroneous classifications across 358,344 total diagnostic decisions.
        </div>
      </div>

      {/* Abstract Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FileText size={18} color="var(--navy-primary)" />
            <span>Authoritative Abstract</span>
          </div>
          <span className="badge badge-blue">Verified from LaTeX Source</span>
        </div>
        <p style={{ textAlign: 'justify', fontSize: '0.885rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
          {ABSTRACT_TEXT}
        </p>
      </div>

      {/* Research Motivation & Core Questions */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <HelpCircle size={18} color="var(--navy-primary)" />
              <span>Research Problem & Clinical Motivation</span>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <p style={{ margin: 0 }}>
              Chest radiography is the most widely performed diagnostic imaging modality worldwide. In high-volume clinical triage, computer-aided detection systems must navigate severe trade-offs:
            </p>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>False Positives (FP):</strong> Trigger unwarranted downstream CT scans, invasive confirmatory biopsies, patient psychological distress, and severe clinician alert fatigue.</li>
              <li><strong>False Negatives (FN):</strong> Directly compromise patient safety through missed, delayed, or improper therapeutic intervention for life-threatening conditions (e.g., Pneumothorax, Pneumonia).</li>
              <li><strong>The Research Gap:</strong> While CNNs offer strong local inductive biases and Vision Transformers model non-local spatial context, literature lacked a controlled empirical comparison isolating how CNN–Transformer integration tiers affect practical operational error distributions under identical split controls.</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <CheckCircle2 size={18} color="#059669" />
              <span>Core Experimental Comparisons</span>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <p style={{ margin: 0 }}>
              The study investigates five distinct modeling paradigms across seven concrete configurations on NIH ChestX-ray14:
            </p>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>M1 (DenseNet-121):</strong> Standard convolutional baseline on global average pooled features (6.97M params).</li>
              <li><strong>M2 (Swin-T):</strong> Hierarchical Vision Transformer baseline on mean-pooled patch tokens (27.53M params).</li>
              <li><strong>M3 (Late Probability Fusion):</strong> Decision-level convex ensemble (α = 0.50) combining CNN and Swin-T outputs.</li>
              <li><strong>M4 (Feature Concat):</strong> Intermediate feature projection (512-d) and concatenation before a shared MLP head.</li>
              <li><strong>M5 & M6 (Cross-Attention):</strong> Dense spatial token interaction (M5) and 14 disease-specific gating modules (M6).</li>
              <li><strong>M7 (Operating-Point Analysis):</strong> Evaluation of M6 under frozen validation-optimized thresholds (τ_c* ∈ [0.11, 0.81]).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Charts Section */}
      <h2 style={{ fontSize: '1.2rem', marginTop: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <BarChart3 size={18} color="var(--navy-primary)" />
        <span>Interactive Results & Trade-Off Explorer</span>
      </h2>

      <ModelComparisonChart />
      <FpFnTradeoffChart />

      {/* Cohort Summary Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <ShieldCheck size={18} color="#059669" />
            <span>Dataset Cohort & Verified Split Partitioning</span>
          </div>
          <span className="badge badge-success">Zero Patient Leakage Asserted</span>
        </div>

        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          Partitioned at the patient level using seed 42 to prevent memorization of longitudinal anatomical landmarks.
        </p>

        <div className="table-responsive">
          <table className="scientific-table">
            <thead>
              <tr>
                <th>Partition</th>
                <th className="num">Images (N)</th>
                <th className="num">Patients (K)</th>
                <th className="num">Cohort Proportion</th>
                <th className="num">Avg. Img / Patient</th>
                <th>Patient Overlap Status</th>
              </tr>
            </thead>
            <tbody>
              {DATASET_SPLITS.map((split) => (
                <tr key={split.name} className={split.name === 'Total Cohort' ? 'highlight-row' : ''}>
                  <td><strong>{split.name}</strong></td>
                  <td className="num">{split.images.toLocaleString()}</td>
                  <td className="num">{split.patients.toLocaleString()}</td>
                  <td className="num">{split.cohortProportion}</td>
                  <td className="num">{split.avgImagesPerPatient.toFixed(2)}</td>
                  <td><span className="badge badge-success">{split.patientLeakage}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
