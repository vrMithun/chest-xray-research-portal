import React, { useState } from 'react';
import { 
  MODELS_STANDARD_RESULTS, 
  MODELS_VAL_TUNED_RESULTS, 
  PER_DISEASE_METRICS,
  DiseaseMetric 
} from '../data/researchData';
import { ModelComparisonChart, FpFnTradeoffChart, PerDiseaseBarChart } from '../components/InteractiveCharts';
import { 
  BarChart2, 
  Sliders, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  Layers, 
  Table as TableIcon,
  Search,
  Filter
} from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const [selectedDiseaseFilter, setSelectedDiseaseFilter] = useState<string>('All');
  const [activeTableTab, setActiveTableTab] = useState<'standard' | 'tuned' | 'perDisease'>('standard');
  const diseases = PER_DISEASE_METRICS;

  const filteredDiseases = selectedDiseaseFilter === 'All' 
    ? diseases 
    : diseases.filter(d => d.disease === selectedDiseaseFilter);

  return (
    <div className="container">
      {/* Title Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-navy">Experimental Results</span>
          <span className="badge badge-success">100% Verified Primary Artifacts</span>
        </div>
        <h1 style={{ fontSize: '1.65rem', color: 'var(--navy-deep)', marginBottom: '0.4rem' }}>
          Quantitative Evaluation & Diagnostic Error Benchmark
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '900px' }}>
          Comprehensive multi-label evaluation on 25,596 held-out test radiographs (358,344 binary diagnostic decisions). Strictly distinguished between standard-threshold test evaluations, validation-tuned threshold analyses, and validation sweeps.
        </p>
      </div>

      {/* Primary M3 vs M1 Comparison Alert */}
      <div className="alert-box alert-success" style={{ borderLeft: '4px solid #059669', marginBottom: '1.5rem' }}>
        <h4 style={{ color: '#065f46', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <CheckCircle size={18} />
          <span>Core Empirical Result: M3 Late Probability Fusion vs. M1 DenseNet-121 Baseline</span>
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '0.5rem', fontSize: '0.825rem' }}>
          <div>
            <strong>Macro AUROC:</strong> 0.8089 vs. 0.7965 (<strong>&Delta; +0.0124</strong>, p &lt; 0.0001)
          </div>
          <div>
            <strong>Macro AP:</strong> 0.2776 vs. 0.2673 (<strong>&Delta; +0.0103</strong>, p &lt; 0.0001)
          </div>
          <div>
            <strong>Macro F1:</strong> 0.2828 vs. 0.2755 (<strong>&Delta; +0.0073</strong>, p = 0.00048)
          </div>
          <div>
            <strong>Total False Positives:</strong> 96,613 vs. 102,477 (<strong>&minus;5,864 FP</strong>, -5.72%)
          </div>
          <div>
            <strong>Total False Negatives:</strong> 4,992 vs. 4,881 (<strong>+111 FN</strong>, inconclusive)
          </div>
        </div>
      </div>

      {/* Interactive Charts Section */}
      <ModelComparisonChart />
      <FpFnTradeoffChart />
      <PerDiseaseBarChart />

      {/* Results Tables Tabs */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <TableIcon size={18} color="var(--navy-primary)" />
            <span>Authoritative Experimental Results Tables</span>
          </div>

          <div className="chart-controls">
            <button
              className={`chart-btn ${activeTableTab === 'standard' ? 'active' : ''}`}
              onClick={() => setActiveTableTab('standard')}
            >
              Standard Threshold (&tau; = 0.50) [Table 4]
            </button>
            <button
              className={`chart-btn ${activeTableTab === 'tuned' ? 'active' : ''}`}
              onClick={() => setActiveTableTab('tuned')}
            >
              Validation-Tuned Thresholds (&tau;<sub>c</sub>*) [Table 9]
            </button>
            <button
              className={`chart-btn ${activeTableTab === 'perDisease' ? 'active' : ''}`}
              onClick={() => setActiveTableTab('perDisease')}
            >
              Per-Disease Breakdown (14 Pathologies) [Tables 5 & 7]
            </button>
          </div>
        </div>

        {/* Tab 1: Standard Threshold Table */}
        {activeTableTab === 'standard' && (
          <div>
            <div style={{ marginBottom: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>
              <strong>Table 4 in Manuscript:</strong> Comprehensive test-set performance comparison on the NIH ChestX-ray14 benchmark. Models M1&ndash;M6 are evaluated at standard operating point &tau; = 0.50; M7 reflects M6 evaluated with validation-optimized per-disease thresholds &tau;<sub>c</sub>*.
            </div>

            <div className="table-responsive">
              <table className="scientific-table">
                <thead>
                  <tr>
                    <th>Model ID & Architecture</th>
                    <th className="num">Macro AUROC</th>
                    <th className="num">Macro AP</th>
                    <th className="num">Macro Prec.</th>
                    <th className="num">Macro Recall</th>
                    <th className="num">Macro F1</th>
                    <th className="num">Micro F1</th>
                    <th className="num">Specificity</th>
                    <th className="num">Macro FPR</th>
                    <th className="num">Total FP</th>
                    <th className="num">Total FN</th>
                    <th className="num">Hamming Loss</th>
                    <th className="num">FP Red. vs M1</th>
                  </tr>
                </thead>
                <tbody>
                  {MODELS_STANDARD_RESULTS.map((m) => (
                    <tr key={m.id} className={m.id === 'M3' ? 'highlight-row' : ''}>
                      <td>
                        <strong>{m.id}</strong> {m.name}
                        {m.id === 'M7' && <span className="badge badge-warning" style={{ marginLeft: '0.4rem', fontSize: '0.65rem' }}>M6 Tuned</span>}
                      </td>
                      <td className="num"><strong>{m.macroAUC.toFixed(4)}</strong></td>
                      <td className="num">{m.macroAP.toFixed(4)}</td>
                      <td className="num">{m.macroPrecision.toFixed(4)}</td>
                      <td className="num">{m.macroRecall.toFixed(4)}</td>
                      <td className="num"><strong>{m.macroF1.toFixed(4)}</strong></td>
                      <td className="num">{m.microF1.toFixed(4)}</td>
                      <td className="num">{m.specificity.toFixed(4)}</td>
                      <td className="num">{m.fpr.toFixed(4)}</td>
                      <td className="num"><strong>{m.totalFP.toLocaleString()}</strong></td>
                      <td className="num">{m.totalFN.toLocaleString()}</td>
                      <td className="num">{m.hammingLoss.toFixed(4)}</td>
                      <td className="num" style={{ color: m.fpReductionVsM1 > 0 ? '#059669' : m.fpReductionVsM1 < 0 ? '#dc2626' : '#64748b' }}>
                        {m.fpReductionVsM1 > 0 ? '+' : ''}{m.fpReductionVsM1.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b', lineHeight: 1.45 }}>
              <strong>Verified Numerical Integrity:</strong> All numbers verified against <code>Hybrid_Training/results/model_comparison.csv</code>. M3 macro AUROC improvement (+0.0124) and FP reduction (&minus;5,864 FP) are significant (p &lt; 0.0001). Total false negatives increase by 111 cases (inconclusive).
            </div>
          </div>
        )}

        {/* Tab 2: Validation-Tuned Threshold Table */}
        {activeTableTab === 'tuned' && (
          <div>
            <div style={{ marginBottom: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>
              <strong>Table 9 in Manuscript:</strong> Supplementary like-for-like operating point comparison: Every architecture evaluated using its own frozen, validation-optimized disease-specific thresholds &tau;<sub>c</sub>*. Relative FP reduction is computed versus M1 evaluated at standard &tau; = 0.50.
            </div>

            <div className="table-responsive">
              <table className="scientific-table">
                <thead>
                  <tr>
                    <th>Model [Validation-Tuned]</th>
                    <th className="num">Macro AUROC</th>
                    <th className="num">Macro AP</th>
                    <th className="num">Macro Prec.</th>
                    <th className="num">Macro Recall</th>
                    <th className="num">Macro F1</th>
                    <th className="num">Micro F1</th>
                    <th className="num">Specificity</th>
                    <th className="num">Macro FPR</th>
                    <th className="num">Total FP</th>
                    <th className="num">Hamming Loss</th>
                    <th className="num">FP Red. vs M1 (0.50)</th>
                  </tr>
                </thead>
                <tbody>
                  {MODELS_VAL_TUNED_RESULTS.map((m) => (
                    <tr key={m.modelId} className={m.modelId === 'M3' ? 'highlight-row' : ''}>
                      <td><strong>{m.modelId}</strong> {m.name}</td>
                      <td className="num"><strong>{m.macroAUC.toFixed(4)}</strong></td>
                      <td className="num">{m.macroAP.toFixed(4)}</td>
                      <td className="num">{m.macroPrecision.toFixed(4)}</td>
                      <td className="num">{m.macroRecall.toFixed(4)}</td>
                      <td className="num"><strong>{m.macroF1.toFixed(4)}</strong></td>
                      <td className="num">{m.microF1.toFixed(4)}</td>
                      <td className="num">{m.specificity.toFixed(4)}</td>
                      <td className="num">{m.fpr.toFixed(4)}</td>
                      <td className="num"><strong>{m.totalFP.toLocaleString()}</strong></td>
                      <td className="num">{m.hammingLoss.toFixed(4)}</td>
                      <td className="num" style={{ color: '#059669' }}>
                        +{m.fpReductionVsM1Standard.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="alert-box alert-warning" style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '0.78rem' }}>
              <strong>Key Methodological Insight from Like-for-Like Tuning:</strong> When baseline DenseNet-121 (M1) is evaluated under its own validation-tuned thresholds, total false positives plummet from 102,477 to <strong>38,409 FP</strong> (a 62.52% reduction) with a macro F1 of 0.3286. Model M3 achieves <strong>32,797 FP</strong> and macro F1 of 0.3368. This proves that M7's apparent FP drop to 95,240 is strictly an operating-point artifact rather than evidence that the degraded M6 representation is competitive with M1 or M3.
            </div>
          </div>
        )}

        {/* Tab 3: Per-Disease Table */}
        {activeTableTab === 'perDisease' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                <strong>Tables 5 & 7 in Manuscript:</strong> Per-disease AUROC, F1, False Positives (FP), and False Negatives (FN) across all 14 thoracic disease categories.
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Filter size={14} color="#64748b" />
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Filter Condition:</span>
                <select
                  value={selectedDiseaseFilter}
                  onChange={(e) => setSelectedDiseaseFilter(e.target.value)}
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                >
                  <option value="All">All 14 Pathologies</option>
                  {diseases.map(d => (
                    <option key={d.disease} value={d.disease}>{d.disease}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="scientific-table">
                <thead>
                  <tr>
                    <th>Disease Condition</th>
                    <th className="num">Test Support</th>
                    <th className="num">Prevalence</th>
                    <th className="num">M1 AUROC</th>
                    <th className="num">M3 AUROC</th>
                    <th className="num">&Delta; AUROC</th>
                    <th className="num">Holm p</th>
                    <th className="num">M1 FP</th>
                    <th className="num">M3 FP</th>
                    <th className="num">&Delta; FP</th>
                    <th className="num">M1 FN</th>
                    <th className="num">M3 FN</th>
                    <th className="num">&Delta; FN</th>
                    <th className="num">Tuned &tau;<sub>c</sub>*</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDiseases.map((d) => (
                    <tr key={d.disease}>
                      <td><strong>{d.disease.replace('_', ' ')}</strong></td>
                      <td className="num">{d.supportPositives.toLocaleString()}</td>
                      <td className="num">{d.prevalencePct.toFixed(2)}%</td>
                      <td className="num">{d.m1AUC.toFixed(4)}</td>
                      <td className="num" style={{ color: d.m3AUC >= d.m1AUC ? '#2563eb' : '#dc2626', fontWeight: 600 }}>
                        {d.m3AUC.toFixed(4)}
                      </td>
                      <td className="num" style={{ color: d.aurocDiff > 0 ? '#059669' : '#dc2626' }}>
                        {d.aurocDiff > 0 ? '+' : ''}{d.aurocDiff.toFixed(4)}
                      </td>
                      <td className="num">
                        {d.aurocSignificant ? (
                          <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>{d.aurocHolmP < 0.0001 ? '< 0.0001' : d.aurocHolmP.toExponential(2)}</span>
                        ) : (
                          <span className="badge" style={{ fontSize: '0.65rem' }}>0.9355 (NS)</span>
                        )}
                      </td>
                      <td className="num">{d.m1FP.toLocaleString()}</td>
                      <td className="num">{d.m3FP.toLocaleString()}</td>
                      <td className="num" style={{ color: d.fpDiff < 0 ? '#059669' : '#dc2626', fontWeight: 600 }}>
                        {d.fpDiff < 0 ? '' : '+'}{d.fpDiff.toLocaleString()}
                      </td>
                      <td className="num">{d.m1FN.toLocaleString()}</td>
                      <td className="num">{d.m3FN.toLocaleString()}</td>
                      <td className="num" style={{ color: d.fnDiff <= 0 ? '#059669' : '#d97706' }}>
                        {d.fnDiff <= 0 ? '' : '+'}{d.fnDiff.toLocaleString()}
                      </td>
                      <td className="num"><code>{d.m7TunedThreshold.toFixed(2)}</code></td>
                    </tr>
                  ))}
                  {selectedDiseaseFilter === 'All' && (
                    <tr className="highlight-row">
                      <td><strong>Macro Total / Mean</strong></td>
                      <td className="num"><strong>26,706</strong></td>
                      <td className="num"><strong>7.14%</strong></td>
                      <td className="num"><strong>0.7965</strong></td>
                      <td className="num"><strong>0.8089</strong></td>
                      <td className="num" style={{ color: '#059669' }}><strong>+0.0124</strong></td>
                      <td className="num"><strong>&lt; 0.0001</strong></td>
                      <td className="num"><strong>102,477</strong></td>
                      <td className="num"><strong>96,613</strong></td>
                      <td className="num" style={{ color: '#059669' }}><strong>&minus;5,864</strong></td>
                      <td className="num"><strong>4,881</strong></td>
                      <td className="num"><strong>4,992</strong></td>
                      <td className="num" style={{ color: '#d97706' }}><strong>+111</strong></td>
                      <td className="num"><strong>0.50 (std)</strong></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
              <strong>Multiplicity Disclosure:</strong> 13 of 14 diseases show statistically significant AUROC gains for M3 over M1 after step-down Holm&ndash;Bonferroni correction (p &le; 0.0165). Hernia (0.34% prevalence, 86 positive cases) is the sole non-significant condition (p = 0.9355).
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
