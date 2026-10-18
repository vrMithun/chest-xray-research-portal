import React, { useState } from 'react';
import { MODELS_STANDARD_RESULTS, ModelResult } from '../data/researchData';
import { AlphaSweepInteractiveChart } from '../components/InteractiveCharts';
import { 
  Layers, 
  Cpu, 
  Eye, 
  GitMerge, 
  Sparkles, 
  Clock, 
  Sliders, 
  Info, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const ArchitecturesPage: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>('M3');
  const models = MODELS_STANDARD_RESULTS;
  const currentModel = models.find(m => m.id === selectedModelId) || models[2];

  return (
    <div className="container">
      {/* Title Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-navy">Architectural Design</span>
          <span className="badge badge-blue">Models M1 through M7</span>
        </div>
        <h1 style={{ fontSize: '1.65rem', color: 'var(--navy-deep)', marginBottom: '0.4rem' }}>
          Evaluated Model Architectures & Integration Strategies
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '900px' }}>
          Comprehensive architectural analysis spanning convolutional inductive biases, hierarchical shifted-window self-attention, decision-level late fusion, intermediate feature projection, dense spatial cross-attention, and operating-point threshold tuning.
        </p>
      </div>

      {/* Model Selection Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
        {models.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedModelId(m.id)}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '6px',
              border: selectedModelId === m.id ? '2px solid var(--navy-primary)' : '1px solid var(--border-subtle)',
              backgroundColor: selectedModelId === m.id ? 'var(--blue-subtle)' : '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.2rem',
              minWidth: '130px',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-deep)' }}>{m.id}</span>
              {m.id === 'M3' && <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>Top Pick</span>}
              {m.id === 'M7' && <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>Operating Point</span>}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              {m.name.length > 15 ? m.name.substring(0, 14) + '..' : m.name}
            </span>
          </button>
        ))}
      </div>

      {/* Deep-Dive Card for Selected Model */}
      <div className="card" style={{ borderLeft: `5px solid ${selectedModelId === 'M3' ? '#2563eb' : selectedModelId === 'M7' ? '#d97706' : selectedModelId === 'M5' || selectedModelId === 'M6' ? '#ef4444' : '#475569'}` }}>
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-navy" style={{ fontSize: '0.8rem' }}>{currentModel.id}</span>
              <span className="badge">{currentModel.fusionStrategy}</span>
              {currentModel.id === 'M7' && (
                <span className="badge badge-warning">Threshold Tuning &bull; Not a Distinct Architecture</span>
              )}
            </div>
            <h2 style={{ fontSize: '1.35rem', margin: 0, color: 'var(--navy-deep)' }}>
              {currentModel.id}: {currentModel.name}
            </h2>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Macro AUROC (Test Set)</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: currentModel.id === 'M3' ? '#2563eb' : 'var(--text-primary)' }}>
              {currentModel.macroAUC.toFixed(4)}
            </div>
          </div>
        </div>

        {/* Overview of current model */}
        <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--navy-primary)' }}>Architecture & Information Flow</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
              {currentModel.architecture}. {currentModel.keyMechanism}
            </p>

            <h4 style={{ fontSize: '0.9rem', marginTop: '0.85rem', marginBottom: '0.4rem', color: 'var(--navy-primary)' }}>Intended Experimental Role</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
              {currentModel.keyRole}
            </p>
          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.85rem', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748b' }}>Verified Operational Profile</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', fontSize: '0.8rem' }}>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Total Parameters:</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>{currentModel.totalParams.toLocaleString()}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Inference Latency:</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>{currentModel.pureModelMsPerImage.toFixed(3)} ms/img</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Pure Throughput:</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>{currentModel.pureModelImagesPerSec.toFixed(1)} img/s</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Training Wall Time:</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>
                  {currentModel.trainingTimeMin ? `${currentModel.trainingTimeMin.toFixed(1)} min` : 'Non-gradient (0 min)'}
                </strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Test False Positives:</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>{currentModel.totalFP.toLocaleString()}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Test False Negatives:</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>{currentModel.totalFN.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Model-specific notes */}
        {currentModel.id === 'M3' && (
          <div className="alert-box alert-success" style={{ margin: 0, fontSize: '0.825rem' }}>
            <strong>Why M3 Late Probability Fusion Succeeded:</strong> By combining the calibrated probabilistic outputs of DenseNet-121 (local texture, translation equivariance) and Swin Transformer-Tiny (non-local bilateral symmetry) at the decision level, M3 avoids gradient conflict during end-to-end multi-backbone unfreezing. A validation sweep identified a shallow optimum at α = 0.55–0.60; α = 0.50 was retained for test evaluation, achieving the highest macro AUROC (0.8089), macro AP (0.2776), and a statistically verified 5.72% reduction in false positives (p &lt; 0.0001).
          </div>
        )}

        {currentModel.id === 'M7' && (
          <div className="alert-box alert-warning" style={{ margin: 0, fontSize: '0.825rem' }}>
            <strong>Important Disambiguation of Model M7:</strong> M7 is NOT an eighth or independent learned neural network architecture. It is an operating-point threshold analysis evaluating the probabilistic predictions of model M6 under frozen disease-specific validation thresholds τ_c* ∈ [0.11, 0.81]. While M7 cuts M6 false positives from 155,888 to 95,240, recall collapses from 0.6604 to 0.4540 (FN increases from 7,670 to 11,581). Evaluated under identical validation thresholding, baseline M1 achieves 38,409 FP.
          </div>
        )}

        {(currentModel.id === 'M5' || currentModel.id === 'M6') && (
          <div className="alert-box alert-danger" style={{ margin: 0, fontSize: '0.825rem' }}>
            <strong>Documented Optimization Instability:</strong> Both cross-attention models (M5 and M6) exhibited severe performance degradation when backbones were unfrozen during Stage 2 at epoch 3. Propagating cross-attention gradients simultaneously into two heterogeneous ImageNet-initialized backbones without domain pretraining caused early stopping to trigger at epoch 7, leaving checkpoints with unadapted backbones and high false-positive rates.
          </div>
        )}
      </div>

      {/* Alpha Sweep Chart for M3 */}
      <AlphaSweepInteractiveChart />

      {/* Full Architectural Comparison Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Layers size={18} color="var(--navy-primary)" />
            <span>Master Architectural Comparison Matrix (M1–M7)</span>
          </div>
          <span className="badge badge-blue">Verified from parameter_counts.csv & inference_speed.csv</span>
        </div>

        <div className="table-responsive">
          <table className="scientific-table">
            <thead>
              <tr>
                <th>Model ID</th>
                <th>Architecture Paradigm</th>
                <th>Integration Tier</th>
                <th className="num">Parameters Used</th>
                <th className="num">Train Time</th>
                <th className="num">Pure ms/img</th>
                <th className="num">Throughput</th>
                <th className="num">Macro AUROC</th>
                <th className="num">Total FP</th>
                <th className="num">FP Red. vs M1</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.id} className={m.id === 'M3' ? 'highlight-row' : ''}>
                  <td>
                    <strong>{m.id}</strong> {m.id === 'M3' ? '(Top)' : m.id === 'M7' ? '(Tuned)' : ''}
                  </td>
                  <td>{m.name}</td>
                  <td>{m.fusionStrategy.length > 28 ? m.fusionStrategy.substring(0, 27) + '..' : m.fusionStrategy}</td>
                  <td className="num">{m.totalParams.toLocaleString()}</td>
                  <td className="num">{m.trainingTimeMin ? `${m.trainingTimeMin.toFixed(0)} min` : '0 min'}</td>
                  <td className="num">{m.pureModelMsPerImage.toFixed(2)} ms</td>
                  <td className="num">{m.pureModelImagesPerSec.toFixed(1)}/s</td>
                  <td className="num"><strong>{m.macroAUC.toFixed(4)}</strong></td>
                  <td className="num">{m.totalFP.toLocaleString()}</td>
                  <td className="num" style={{ color: m.fpReductionVsM1 > 0 ? '#059669' : m.fpReductionVsM1 < 0 ? '#dc2626' : '#64748b' }}>
                    {m.fpReductionVsM1 > 0 ? '+' : ''}{m.fpReductionVsM1.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem', lineHeight: 1.45 }}>
          <strong>Note on Parameters Used:</strong> Model M3 combines predictions from pretrained M1 and M2 (34,498,326 parameters) without gradient updates. Model M7 evaluates M6 predictions (41,233,160 parameters) under tuned thresholds and requires zero additional parameter training.
        </div>
      </div>
    </div>
  );
};
