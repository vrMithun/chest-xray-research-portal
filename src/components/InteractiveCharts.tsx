import React, { useState } from 'react';
import { 
  MODELS_STANDARD_RESULTS, 
  ALPHA_SWEEP_DATA, 
  PER_DISEASE_METRICS,
  ModelResult 
} from '../data/researchData';
import { BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

type MetricKey = 'macroAUC' | 'macroAP' | 'macroF1' | 'totalFP' | 'totalFN' | 'fpReductionVsM1';

export const ModelComparisonChart: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('macroAUC');

  const metricConfigs: Record<MetricKey, { label: string; unit: string; format: (v: number) => string; higherIsBetter: boolean; yMin: number; yMax: number }> = {
    macroAUC: {
      label: 'Macro AUROC',
      unit: '',
      format: (v) => v.toFixed(4),
      higherIsBetter: true,
      yMin: 0.55,
      yMax: 0.85
    },
    macroAP: {
      label: 'Macro Average Precision (AP)',
      unit: '',
      format: (v) => v.toFixed(4),
      higherIsBetter: true,
      yMin: 0.05,
      yMax: 0.32
    },
    macroF1: {
      label: 'Macro F1 (τ = 0.50)',
      unit: '',
      format: (v) => v.toFixed(4),
      higherIsBetter: true,
      yMin: 0.10,
      yMax: 0.32
    },
    totalFP: {
      label: 'Total False Positives (FP)',
      unit: ' cases',
      format: (v) => v.toLocaleString(),
      higherIsBetter: false,
      yMin: 80000,
      yMax: 190000
    },
    totalFN: {
      label: 'Total False Negatives (FN)',
      unit: ' cases',
      format: (v) => v.toLocaleString(),
      higherIsBetter: false,
      yMin: 4000,
      yMax: 13000
    },
    fpReductionVsM1: {
      label: 'FP Reduction vs. M1 Baseline',
      unit: '%',
      format: (v) => `${v > 0 ? '+' : ''}${v.toFixed(2)}%`,
      higherIsBetter: true,
      yMin: -80,
      yMax: 15
    }
  };

  const currentConfig = metricConfigs[selectedMetric];
  const models = MODELS_STANDARD_RESULTS;

  const getBarColor = (m: ModelResult) => {
    if (m.id === 'M3') return '#2563eb'; // Primary Late Fusion
    if (m.id === 'M1') return '#475569'; // CNN Baseline
    if (m.id === 'M2') return '#0284c7'; // Swin-T
    if (m.id === 'M4') return '#64748b'; // Feature Concat
    if (m.id === 'M7') return '#d97706'; // Val-tuned operating point
    return '#ef4444'; // M5/M6 degraded
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={17} color="var(--navy-primary)" />
            <span>Multi-Model Comparative Performance Benchmark</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Evaluated on official held-out test cohort (25,596 radiographs). Select metric to inspect cross-architecture dynamics.
          </p>
        </div>

        <div className="chart-controls">
          {(Object.keys(metricConfigs) as MetricKey[]).map((key) => (
            <button
              key={key}
              className={`chart-btn ${selectedMetric === key ? 'active' : ''}`}
              onClick={() => setSelectedMetric(key)}
            >
              {metricConfigs[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Bar Chart */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox="0 0 760 280" style={{ width: '100%', minWidth: '600px', height: 'auto', display: 'block' }}>
          {/* Background Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
            const y = 30 + (1 - frac) * 200;
            const val = currentConfig.yMin + frac * (currentConfig.yMax - currentConfig.yMin);
            return (
              <g key={idx}>
                <line x1="60" y1={y} x2="730" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                <text x="52" y={y + 4} fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="var(--font-mono)">
                  {currentConfig.format(val)}
                </text>
              </g>
            );
          })}

          {/* Model Bars */}
          {models.map((m, idx) => {
            const rawVal = m[selectedMetric] as number;
            // Calculate height clamped
            const clamped = Math.max(currentConfig.yMin, Math.min(currentConfig.yMax, rawVal));
            const norm = (clamped - currentConfig.yMin) / (currentConfig.yMax - currentConfig.yMin);
            const barHeight = Math.max(4, norm * 200);
            const x = 80 + idx * 92;
            const y = 230 - barHeight;
            const color = getBarColor(m);

            return (
              <g key={m.id} className="chart-bar-group">
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width="56"
                  height={barHeight}
                  fill={color}
                  rx="4"
                  opacity={m.id === 'M3' ? 1.0 : 0.85}
                />
                
                {/* Value on top */}
                <text
                  x={x + 28}
                  y={y - 8}
                  fill={m.id === 'M3' ? '#1e3a8a' : '#334155'}
                  fontSize="10"
                  fontWeight={m.id === 'M3' ? '700' : '500'}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                >
                  {currentConfig.format(rawVal)}
                </text>

                {/* Model Label below */}
                <text
                  x={x + 28}
                  y="248"
                  fill="#0f172a"
                  fontSize="11"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {m.id}
                </text>
                <text
                  x={x + 28}
                  y="262"
                  fill="#64748b"
                  fontSize="8.5"
                  textAnchor="middle"
                >
                  {m.name.length > 12 ? m.name.substring(0, 11) + '..' : m.name}
                </text>
              </g>
            );
          })}

          {/* X Axis baseline */}
          <line x1="60" y1="230" x2="730" y2="230" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Legend & Interpretive Note */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: 10, height: 10, backgroundColor: '#2563eb', borderRadius: 2 }}></span>
            <strong>M3 Late Fusion (Proposed)</strong>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: 10, height: 10, backgroundColor: '#475569', borderRadius: 2 }}></span>
            M1 CNN Baseline
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: 10, height: 10, backgroundColor: '#0284c7', borderRadius: 2 }}></span>
            M2 Swin-T Baseline
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: 10, height: 10, backgroundColor: '#d97706', borderRadius: 2 }}></span>
            M7 (M6 + Tuned τ)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: 10, height: 10, backgroundColor: '#ef4444', borderRadius: 2 }}></span>
            M5/M6 Cross-Attention (Degraded)
          </span>
        </div>

        <span style={{ fontFamily: 'var(--font-mono)' }}>
          Standard threshold τ = 0.50 (M1–M6); validation-tuned (M7)
        </span>
      </div>
    </div>
  );
};

export const FpFnTradeoffChart: React.FC = () => {
  const models = MODELS_STANDARD_RESULTS;

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={17} color="#2563eb" />
            <span>Diagnostic Error Dynamics: False Positives vs. False Negatives</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Trade-off space across 358,344 diagnostic decisions on 25,596 test radiographs. Bottom-left represents fewer total diagnostic errors.
          </p>
        </div>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox="0 0 760 300" style={{ width: '100%', minWidth: '620px', height: 'auto', display: 'block' }}>
          {/* Coordinate system: X = False Positives (80k to 190k), Y = False Negatives (4k to 12.5k) */}
          {/* Axis Labels */}
          <text x="400" y="292" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle">
            Total Diagnostic False Positives (FP) &rarr; (Fewer is better)
          </text>
          <text x="20" y="150" fill="#475569" fontSize="11" fontWeight="600" textAnchor="middle" transform="rotate(-90 20 150)">
            Total False Negatives (FN) &rarr;
          </text>

          {/* Grid lines */}
          {[90000, 110000, 130000, 150000, 170000].map((fp) => {
            const x = 70 + ((fp - 80000) / 110000) * 650;
            return (
              <g key={fp}>
                <line x1={x} y1="20" x2={x} y2="260" stroke="#f1f5f9" strokeDasharray="3 3" />
                <text x={x} y="272" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">
                  {fp.toLocaleString()}
                </text>
              </g>
            );
          })}

          {[5000, 7000, 9000, 11000].map((fn) => {
            const y = 260 - ((fn - 4000) / 8500) * 230;
            return (
              <g key={fn}>
                <line x1="70" y1={y} x2="720" y2={y} stroke="#f1f5f9" strokeDasharray="3 3" />
                <text x="64" y={y + 4} fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="var(--font-mono)">
                  {fn.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line x1="70" y1="260" x2="720" y2="260" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="70" y1="20" x2="70" y2="260" stroke="#cbd5e1" strokeWidth="1.5" />

          {/* Model points */}
          {models.map((m) => {
            const cx = 70 + ((m.totalFP - 80000) / 110000) * 650;
            const cy = 260 - ((m.totalFN - 4000) / 8500) * 230;
            const isM3 = m.id === 'M3';
            const isM1 = m.id === 'M1';

            return (
              <g key={m.id}>
                {/* Glow for M3 */}
                {isM3 && (
                  <circle cx={cx} cy={cy} r="18" fill="rgba(37, 99, 235, 0.15)" stroke="#bfdbfe" strokeWidth="1" />
                )}
                {/* Dot */}
                <circle 
                  cx={cx} 
                  cy={cy} 
                  r={isM3 ? 7 : 5.5} 
                  fill={isM3 ? '#2563eb' : isM1 ? '#0f172a' : m.id === 'M7' ? '#d97706' : '#64748b'} 
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                {/* Label */}
                <rect 
                  x={cx + 8} 
                  y={cy - 14} 
                  width={isM3 ? 120 : 95} 
                  height="26" 
                  fill="#ffffff" 
                  stroke={isM3 ? '#2563eb' : '#e2e8f0'} 
                  rx="4" 
                  filter="drop-shadow(0 1px 2px rgba(0,0,0,0.06))"
                />
                <text 
                  x={cx + 14} 
                  y={cy} 
                  fontSize="10" 
                  fontWeight={isM3 ? '700' : '600'} 
                  fill={isM3 ? '#1e3a8a' : '#1e293b'}
                >
                  {m.id}: {m.name}
                </text>
                <text 
                  x={cx + 14} 
                  y={cy + 9} 
                  fontSize="8" 
                  fill="#64748b"
                  fontFamily="var(--font-mono)"
                >
                  FP: {m.totalFP.toLocaleString()} | FN: {m.totalFN.toLocaleString()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="alert-box alert-info" style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '0.775rem' }}>
        <strong>Key Scientific Observation:</strong> M3 achieves a substantial false-positive reduction (-5,864 FP relative to M1, p &lt; 0.0001) with an inconclusive, localized change of +111 false negatives (95% CI: [-1, +217]). In contrast, M2 incurs +833 false negatives, M4 surges false alarms by +13,738 FP, and M7 incurs +6,700 additional false negatives due to threshold suppression.
      </div>
    </div>
  );
};

export const AlphaSweepInteractiveChart: React.FC = () => {
  const [hoveredAlpha, setHoveredAlpha] = useState<number | null>(0.50);
  const data = ALPHA_SWEEP_DATA;

  // Selected point
  const activePoint = data.find(p => p.alpha === hoveredAlpha) || data[10];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <div className="chart-title">
            M3 Validation Fusion Weight Sweep (α ∈ [0.00, 1.00])
          </div>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Validation set grid search: P_M3 = α * P_M1 + (1 - α) * P_M2. A validation sweep identified a shallow optimum at α = 0.55–0.60; α = 0.50 was retained for test evaluation.
          </p>
        </div>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox="0 0 740 220" style={{ width: '100%', minWidth: '580px', height: 'auto', display: 'block' }}>
          {/* Y Axis Grid lines for Val AUROC: 0.820 to 0.840 */}
          {[0.825, 0.830, 0.835, 0.840].map((val) => {
            const y = 180 - ((val - 0.822) / 0.018) * 150;
            return (
              <g key={val}>
                <line x1="60" y1={y} x2="700" y2={y} stroke="#f1f5f9" strokeDasharray="3 3" />
                <text x="52" y={y + 4} fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="var(--font-mono)">
                  {val.toFixed(3)}
                </text>
              </g>
            );
          })}

          {/* Curves path: Val AUROC */}
          <path
            d={data.map((p, idx) => {
              const x = 70 + (p.alpha / 1.0) * 620;
              const y = 180 - ((p.valMacroAUC - 0.822) / 0.018) * 150;
              return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
          />

          {/* Points */}
          {data.map((p) => {
            const x = 70 + (p.alpha / 1.0) * 620;
            const y = 180 - ((p.valMacroAUC - 0.822) / 0.018) * 150;
            const isHovered = hoveredAlpha === p.alpha;
            const isRetained = p.alpha === 0.50;

            return (
              <circle
                key={p.alpha}
                cx={x}
                cy={y}
                r={isRetained ? 6 : isHovered ? 5 : 3.5}
                fill={isRetained ? '#1e3a8a' : '#2563eb'}
                stroke="#ffffff"
                strokeWidth={isRetained ? 2 : 1}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredAlpha(p.alpha)}
              />
            );
          })}

          {/* Retained marker at alpha = 0.50 */}
          <line x1="380" y1="20" x2="380" y2="180" stroke="#1e3a8a" strokeWidth="1" strokeDasharray="4 2" />
          <text x="380" y="16" fill="#1e3a8a" fontSize="10" fontWeight="700" textAnchor="middle">
            Retained Operating Point (α = 0.50)
          </text>

          {/* X Axis */}
          <line x1="60" y1="180" x2="700" y2="180" stroke="#cbd5e1" strokeWidth="1.5" />
          {[0.0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0].map((a) => {
            const x = 70 + (a / 1.0) * 620;
            return (
              <g key={a}>
                <line x1={x} y1="180" x2={x} y2="185" stroke="#94a3b8" />
                <text x={x} y="198" fill="#64748b" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">
                  {a.toFixed(1)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem' }}>
        <div>
          <strong>Active Weight: α = {activePoint.alpha.toFixed(2)}</strong> &bull; DenseNet Weight: {(activePoint.alpha * 100).toFixed(0)}% &bull; Swin-T Weight: {((1 - activePoint.alpha) * 100).toFixed(0)}%
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--navy-primary)', fontWeight: 600 }}>
          Val Macro AUROC: {activePoint.valMacroAUC.toFixed(4)} | Val AP: {activePoint.valMacroAP.toFixed(4)}
        </div>
      </div>
    </div>
  );
};

export const PerDiseaseBarChart: React.FC = () => {
  const [metricType, setMetricType] = useState<'auroc' | 'fpReduction'>('auroc');
  const diseases = PER_DISEASE_METRICS;

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <div className="chart-title">
            Per-Disease Metric Breakdown Across All 14 Thoracic Pathologies
          </div>
          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Comparing DenseNet-121 (M1) vs. Late Probability Fusion (M3) across all 14 findings on the 25,596 test cases.
          </p>
        </div>
        <div className="chart-controls">
          <button 
            className={`chart-btn ${metricType === 'auroc' ? 'active' : ''}`}
            onClick={() => setMetricType('auroc')}
          >
            AUROC (M1 vs. M3)
          </button>
          <button 
            className={`chart-btn ${metricType === 'fpReduction' ? 'active' : ''}`}
            onClick={() => setMetricType('fpReduction')}
          >
            Relative FP Reduction (%)
          </button>
        </div>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg viewBox="0 0 740 310" style={{ width: '100%', minWidth: '640px', height: 'auto', display: 'block' }}>
          {metricType === 'auroc' ? (
            <>
              {/* AUROC Bar Pairs */}
              {[0.6, 0.7, 0.8, 0.9, 1.0].map((v) => {
                const y = 240 - ((v - 0.5) / 0.5) * 200;
                return (
                  <g key={v}>
                    <line x1="50" y1={y} x2="710" y2={y} stroke="#f1f5f9" strokeDasharray="3 3" />
                    <text x="44" y={y + 4} fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="var(--font-mono)">
                      {v.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {diseases.map((d, idx) => {
                const x = 60 + idx * 46;
                const h1 = ((d.m1AUC - 0.5) / 0.5) * 200;
                const h3 = ((d.m3AUC - 0.5) / 0.5) * 200;
                const y1 = 240 - h1;
                const y3 = 240 - h3;

                return (
                  <g key={d.disease}>
                    {/* M1 bar */}
                    <rect x={x} y={y1} width="16" height={h1} fill="#94a3b8" rx="2" />
                    {/* M3 bar */}
                    <rect x={x + 18} y={y3} width="16" height={h3} fill="#2563eb" rx="2" />
                    
                    {/* X label */}
                    <text
                      x={x + 17}
                      y="255"
                      fill="#334155"
                      fontSize="8"
                      fontWeight="600"
                      textAnchor="end"
                      transform={`rotate(-45 ${x + 17} 255)`}
                    >
                      {d.disease.replace('_', ' ')}
                    </text>
                  </g>
                );
              })}
            </>
          ) : (
            <>
              {/* Relative FP Reduction Bars */}
              {[-20, -10, 0, 10, 20].map((v) => {
                const y = 140 - (v / 25) * 100;
                return (
                  <g key={v}>
                    <line x1="50" y1={y} x2="710" y2={y} stroke={v === 0 ? "#94a3b8" : "#f1f5f9"} strokeDasharray={v === 0 ? "none" : "3 3"} />
                    <text x="44" y={y + 4} fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="var(--font-mono)">
                      {v}%
                    </text>
                  </g>
                );
              })}

              {diseases.map((d, idx) => {
                const x = 65 + idx * 45;
                const isPositive = d.fpReductionPct >= 0;
                const barHeight = Math.abs((d.fpReductionPct / 25) * 100);
                const y = isPositive ? 140 - barHeight : 140;
                const color = isPositive ? '#059669' : '#dc2626';

                return (
                  <g key={d.disease}>
                    <rect x={x} y={y} width="24" height={barHeight} fill={color} rx="2" />
                    <text
                      x={x + 12}
                      y={isPositive ? y - 4 : y + barHeight + 9}
                      fill={color}
                      fontSize="7.5"
                      fontFamily="var(--font-mono)"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {d.fpReductionPct.toFixed(1)}%
                    </text>
                    <text
                      x={x + 12}
                      y="255"
                      fill="#334155"
                      fontSize="8"
                      fontWeight="600"
                      textAnchor="end"
                      transform={`rotate(-45 ${x + 12} 255)`}
                    >
                      {d.disease.replace('_', ' ')}
                    </text>
                  </g>
                );
              })}
            </>
          )}
        </svg>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', fontSize: '0.75rem', color: '#64748b', flexWrap: 'wrap', gap: '0.5rem' }}>
        {metricType === 'auroc' ? (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 10, height: 10, backgroundColor: '#94a3b8', borderRadius: 2 }}></span>
              M1 DenseNet-121
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 10, height: 10, backgroundColor: '#2563eb', borderRadius: 2 }}></span>
              M3 Late Probability Fusion
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#059669' }}>
              <span style={{ width: 10, height: 10, backgroundColor: '#059669', borderRadius: 2 }}></span>
              FP Reduction (10 / 14 Pathologies)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#dc2626' }}>
              <span style={{ width: 10, height: 10, backgroundColor: '#dc2626', borderRadius: 2 }}></span>
              FP Increase (4 / 14 Pathologies)
            </span>
          </div>
        )}
        <span>Step-down Holm–Bonferroni adjusted (13 of 14 AUROC gains significant, p &le; 0.0165)</span>
      </div>
    </div>
  );
};
