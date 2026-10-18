import React, { useState } from 'react';
import { BOOTSTRAP_PRIMARY_RESULTS, PER_DISEASE_METRICS, RESEARCH_FIGURES } from '../data/researchData';
import { 
  Cpu, 
  ShieldAlert, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart2, 
  Layers, 
  FileText,
  Activity,
  Image as ImageIcon
} from 'lucide-react';
import { FigureModal } from '../components/FigureModal';

export const StatisticalAnalysisPage: React.FC = () => {
  const [selectedFigure, setSelectedFigure] = useState<typeof RESEARCH_FIGURES[0] | null>(null);
  const primaryResults = BOOTSTRAP_PRIMARY_RESULTS.filter(r => r.isPrimaryFamily);
  const secondaryResults = BOOTSTRAP_PRIMARY_RESULTS.filter(r => !r.isPrimaryFamily);

  const statFigures = RESEARCH_FIGURES.filter(f => f.category === 'Statistical Evaluation');

  return (
    <div className="container">
      {/* Title Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-navy">Statistical Inference</span>
          <span className="badge badge-blue">Section 3.8 & 4.5 in Manuscript</span>
        </div>
        <h1 style={{ fontSize: '1.65rem', color: 'var(--navy-deep)', marginBottom: '0.4rem' }}>
          Patient-Cluster Bootstrap & Inferential Hypothesis Testing
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '900px' }}>
          Rigorous cluster-aware uncertainty quantification on 25,596 held-out radiographs from K = 2,797 patient clusters using paired bootstrap resampling (B = 2,000), cluster-robust Wald tests, shifted empirical null bootstrap, and step-down Holm&ndash;Bonferroni multiplicity control.
        </p>
      </div>

      {/* Retrospective Methodological Disclosure Box */}
      <div className="alert-box alert-warning" style={{ marginBottom: '1.5rem', fontSize: '0.825rem' }}>
        <h4 style={{ color: '#92400e', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ShieldAlert size={18} />
          <span>Retrospective Methodological Disclosure & Pre-Registration Status</span>
        </h4>
        <p style={{ margin: 0, lineHeight: 1.5 }}>
          All inferential procedures, endpoint groupings, and hypothesis testing structures reported here were formalized and executed <strong>retrospectively</strong> during the comprehensive statistical validation audit of the saved test-set prediction arrays; <strong>they were not prospectively pre-registered prior to model training</strong>. Consequently, while our statistical procedures strictly account for intra-patient clustering and family-wise error inflation, they represent rigorous retrospective observational inference rather than prospective confirmatory clinical trial testing.
        </p>
      </div>

      {/* Why Patient Clustering Matters Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <HelpCircle size={18} color="var(--navy-primary)" />
            <span>Why Patient Clustering Matters: Anatomical Correlation vs. Sample Independence</span>
          </div>
          <span className="badge badge-blue">K = 2,797 Test Patient Clusters</span>
        </div>

        <div className="grid-2" style={{ gap: '1.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <p style={{ margin: 0 }}>
              The official NIH test partition contains <strong>25,596 chest radiographs</strong> obtained from only <strong>2,797 unique patients</strong>. Individual patients underwent between 1 and 184 longitudinal examinations across clinical visits (mean 9.15, median 4 images per patient).
            </p>
            <p style={{ margin: 0 }}>
              <strong>The Statistical Hazard:</strong> Standard non-clustered bootstrapping or conventional DeLong tests treat each image as an independent statistical event. This drastically violates the exchangeability assumption because multiple radiographs from the same patient share identical skeletal morphology, underlying chronic disease states, and scanner geometry.
            </p>
            <p style={{ margin: 0 }}>
              Treating clustered images as independent artificially deflates standard errors, inflates test statistics, and produces anti-conservative p-values that can falsely declare statistical significance.
            </p>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '1.15rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.825rem' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--navy-deep)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Our Cluster-Aware Resampling Scheme
            </h4>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-secondary)' }}>
              <li><strong>Sampling Unit:</strong> Patient ID (K = 2,797 clusters), sampled with replacement across B = 2,000 replicates (random seed 42).</li>
              <li><strong>Preservation:</strong> When a patient is sampled, all historical radiographs belonging to that patient enter the replicate cohort together.</li>
              <li><strong>Paired Evaluation:</strong> Candidate models (M1 and M3) are evaluated simultaneously on identical resamples, yielding exact paired difference distributions: &Delta;<sup>*(b)</sup> = Metric<sub>M3</sub><sup>*(b)</sup> &minus; Metric<sub>M1</sub><sup>*(b)</sup>.</li>
              <li><strong>Confidence Intervals:</strong> Two-sided 95% percentile CIs are derived directly from the empirical 2.5th and 97.5th percentiles of the 2,000 paired resamples.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Primary Evaluation Family (M3 vs. M1) Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <CheckCircle2 size={18} color="#059669" />
            <span>Primary Evaluation Family: M3 Late Fusion vs. M1 Baseline (Table 8 in Manuscript)</span>
          </div>
          <span className="badge badge-success">Step-Down Holm–Bonferroni FWER α = 0.05</span>
        </div>

        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          Four core primary endpoints controlled for Family-Wise Error Rate (FWER) across B = 2,000 patient-cluster bootstrap replicates.
        </p>

        <div className="table-responsive">
          <table className="scientific-table">
            <thead>
              <tr>
                <th>Primary Endpoint</th>
                <th className="num">M1 Point</th>
                <th className="num">M3 Point</th>
                <th className="num">Paired &Delta; (M3 &minus; M1)</th>
                <th className="num">Cluster SE</th>
                <th className="num">95% Percentile CI</th>
                <th className="num">Cluster z</th>
                <th className="num">Wald p</th>
                <th className="num">Holm Adjusted p</th>
                <th>Statistical Significance</th>
              </tr>
            </thead>
            <tbody>
              {primaryResults.map((r) => (
                <tr key={r.metric} className="highlight-row">
                  <td><strong>{r.metric}</strong></td>
                  <td className="num">{typeof r.m1Point === 'number' && r.m1Point > 1 ? r.m1Point.toLocaleString() : r.m1Point.toFixed(4)}</td>
                  <td className="num">{typeof r.m3Point === 'number' && r.m3Point > 1 ? r.m3Point.toLocaleString() : r.m3Point.toFixed(4)}</td>
                  <td className="num" style={{ color: r.pointDiff > 0 ? '#059669' : r.metric.includes('FP') ? '#059669' : '#dc2626' }}>
                    <strong>{r.pointDiff > 0 ? '+' : ''}{typeof r.pointDiff === 'number' && Math.abs(r.pointDiff) > 1 ? r.pointDiff.toLocaleString() : r.pointDiff.toFixed(4)}</strong>
                  </td>
                  <td className="num">{r.clusterSE > 1 ? r.clusterSE.toFixed(1) : r.clusterSE.toFixed(4)}</td>
                  <td className="num">
                    [{r.ciLowerPercentile > 1 || r.ciLowerPercentile < -1 ? r.ciLowerPercentile.toFixed(0) : r.ciLowerPercentile.toFixed(4)}, {r.ciUpperPercentile > 1 || r.ciUpperPercentile < -1 ? r.ciUpperPercentile.toFixed(0) : r.ciUpperPercentile.toFixed(4)}]
                  </td>
                  <td className="num">{r.clusterZ.toFixed(2)}</td>
                  <td className="num">{r.waldP}</td>
                  <td className="num"><strong>{r.holmAdjustedP}</strong></td>
                  <td>
                    <span className="badge badge-success">SIGNIFICANT (p &lt; 0.0005)</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem', lineHeight: 1.45 }}>
          <strong>Summary of Primary Inferences:</strong> Late Probability Fusion (M3) demonstrates statistically significant improvements over the DenseNet-121 baseline (M1) across all four primary measures. Both macro AUROC (&Delta; = +0.0124, z = 11.54, p &lt; 10^-20) and total false positives (&Delta; = &minus;5,864, z = &minus;14.95, p &lt; 10^-40) show overwhelming statistical separation under patient clustering.
        </div>
      </div>

      {/* Deep-Dive Audit of Total False Negatives (Dual-Inference) */}
      <div className="card" style={{ borderLeft: '5px solid #d97706' }}>
        <div className="card-header">
          <div className="card-title">
            <AlertTriangle size={18} color="#d97706" />
            <span>Rigorous Audit of Total False Negatives: The Dual-Inference Phenomenon</span>
          </div>
          <span className="badge badge-warning">Statistically Inconclusive & Method-Dependent</span>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <p style={{ margin: 0 }}>
            At the aggregate decision level, the point estimate indicates <strong>111 additional false negatives</strong> for M3 compared to M1 (4,992 vs. 4,881, a +2.27% relative change across 26,706 positive labels). Evaluating this finding under inferential statistics reveals a critical distinction between asymptotic and empirical resampling methods:
          </p>

          <div className="grid-2" style={{ gap: '1rem', marginTop: '0.35rem' }}>
            <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px', padding: '0.85rem' }}>
              <h4 style={{ fontSize: '0.825rem', color: '#92400e', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                1. Asymptotic Cluster-Wald Perspective
              </h4>
              <ul style={{ paddingLeft: '1.15rem', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>Standardized statistic: <code>z = 1.991</code></li>
                <li>Two-tailed Wald p-value: <code>p = 0.0465</code> (nominally &lt; 0.05)</li>
                <li>Asymptotic Normal 95% CI: <code>[+1.73, +220.27]</code> (narrowly excludes zero)</li>
                <li>Shifted bootstrap test under H0: <code>p_shift = 0.0445</code> (88 of 2,000 resamples &ge; 111)</li>
                <li><em>Appears nominally significant before multiplicity control.</em></li>
              </ul>
            </div>

            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.85rem' }}>
              <h4 style={{ fontSize: '0.825rem', color: 'var(--navy-deep)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                2. Non-Parametric Bootstrap & Multiplicity Perspective
              </h4>
              <ul style={{ paddingLeft: '1.15rem', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>Patient-cluster bootstrap (B = 2,000) 95% Percentile CI: <code>[-1.0, +217.0]</code> (spans zero!)</li>
                <li>Exact empirical tail proportion: 53 of 2,000 resamples are &le; 0 (2.65% &gt; 2.5%; uncentered tail <code>p = 0.0535</code>)</li>
                <li>Treated as an exploratory secondary outcome in the manuscript.</li>
                <li>Under Holm multiplicity control across secondary metrics: <code>p_adj &ge; 0.093</code> (Non-Significant).</li>
              </ul>
            </div>
          </div>

          <div className="alert-box alert-info" style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem' }}>
            <strong>Authoritative Verdict in Manuscript (Section 4.5.2 & Table 8 Footnote):</strong> We preserve this dual-inference distinction and do not assert that the false-negative increase is either definitively significant or definitively absent. Rather, the empirical data demonstrates an operational trade-off toward higher specificity rather than an unconditional reduction across both error modes.
          </div>
        </div>
      </div>

      {/* Secondary Endpoints Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Activity size={18} color="var(--navy-primary)" />
            <span>Secondary & Exploratory Performance Endpoints (M3 vs. M1)</span>
          </div>
          <span className="badge">Secondary Hypothesis Testing Family</span>
        </div>

        <div className="table-responsive">
          <table className="scientific-table">
            <thead>
              <tr>
                <th>Secondary Metric</th>
                <th className="num">M1 Point</th>
                <th className="num">M3 Point</th>
                <th className="num">Paired &Delta;</th>
                <th className="num">Cluster SE</th>
                <th className="num">95% Percentile CI</th>
                <th className="num">Cluster z</th>
                <th className="num">Wald p</th>
                <th>Inferential Status</th>
              </tr>
            </thead>
            <tbody>
              {secondaryResults.map((r) => (
                <tr key={r.metric}>
                  <td><strong>{r.metric}</strong></td>
                  <td className="num">{typeof r.m1Point === 'number' && r.m1Point > 1 ? r.m1Point.toLocaleString() : r.m1Point.toFixed(4)}</td>
                  <td className="num">{typeof r.m3Point === 'number' && r.m3Point > 1 ? r.m3Point.toLocaleString() : r.m3Point.toFixed(4)}</td>
                  <td className="num" style={{ color: r.pointDiff > 0 ? '#059669' : '#dc2626' }}>
                    {r.pointDiff > 0 ? '+' : ''}{typeof r.pointDiff === 'number' && Math.abs(r.pointDiff) > 1 ? r.pointDiff.toLocaleString() : r.pointDiff.toFixed(4)}
                  </td>
                  <td className="num">{r.clusterSE > 1 ? r.clusterSE.toFixed(2) : r.clusterSE.toFixed(4)}</td>
                  <td className="num">
                    [{r.ciLowerPercentile > 1 || r.ciLowerPercentile < -1 ? r.ciLowerPercentile.toFixed(1) : r.ciLowerPercentile.toFixed(4)}, {r.ciUpperPercentile > 1 || r.ciUpperPercentile < -1 ? r.ciUpperPercentile.toFixed(1) : r.ciUpperPercentile.toFixed(4)}]
                  </td>
                  <td className="num">{r.clusterZ.toFixed(2)}</td>
                  <td className="num">{r.waldP}</td>
                  <td>
                    {r.significant ? (
                      <span className="badge badge-success">Significant (p &lt; 0.001)</span>
                    ) : r.metric.includes('FN') ? (
                      <span className="badge badge-warning">Inconclusive (CI spans 0)</span>
                    ) : (
                      <span className="badge">Non-Significant</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistical Figures Gallery */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <ImageIcon size={18} color="var(--navy-primary)" />
            <span>Statistical Analysis Figure Gallery (Click to Inspect)</span>
          </div>
          <span className="badge badge-blue">Generated from bootstrap_results.csv</span>
        </div>

        <div className="grid-3">
          {statFigures.map((fig) => (
            <div 
              key={fig.id} 
              onClick={() => setSelectedFigure(fig)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
              className="chart-bar-group"
            >
              <img 
                src={fig.filename} 
                alt={fig.title} 
                style={{ width: '100%', height: '140px', objectFit: 'contain', backgroundColor: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                loading="lazy"
              />
              <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {fig.title}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                {fig.caption.length > 90 ? fig.caption.substring(0, 88) + '...' : fig.caption}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Figure Inspection */}
      <FigureModal 
        figure={selectedFigure} 
        onClose={() => setSelectedFigure(null)} 
      />
    </div>
  );
};
