import React, { useState } from 'react';
import { Database, Filter, Sliders, PlayCircle, BarChart3, Award, Info } from 'lucide-react';

export const PipelineDiagram: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<number>(1);

  const stages = [
    {
      step: 1,
      title: "1. Dataset Partitioning",
      subtitle: "NIH ChestX-ray14 & Zero Leakage",
      icon: <Database size={18} />,
      color: "#1e3a8a",
      bullets: [
        "112,120 frontal radiographs from 30,805 unique patients.",
        "Official NIH partitions: train_val_list.txt (86,524) & test_list.txt (25,596).",
        "Train/Val patient-level split (seed 42, 15% val): 73,917 Train (23,807 pts), 12,607 Val (4,201 pts).",
        "Test set: 25,596 images from 2,797 patients (mean 9.15 images/patient).",
        "Zero patient overlap asserted: P_Train ∩ P_Val = ∅, P_Train ∩ P_Test = ∅, P_Val ∩ P_Test = ∅."
      ]
    },
    {
      step: 2,
      title: "2. Preprocessing & Augmentation",
      subtitle: "Deterministic & Anatomical",
      icon: <Filter size={18} />,
      color: "#2563eb",
      bullets: [
        "Images preprocessed to 256x256, model input cropped to 224x224 pixels.",
        "ImageNet channel normalization: μ=[0.485, 0.456, 0.406], σ=[0.229, 0.224, 0.225].",
        "Conservative training augmentations: Random H-flip (p=0.5), rotation (±10°), ColorJitter (0.1).",
        "Validation and test sets: Pure deterministic resizing and normalization without stochastic noise."
      ]
    },
    {
      step: 3,
      title: "3. Loss & Imbalance Control",
      subtitle: "Positive-Weighted BCE",
      icon: <Sliders size={18} />,
      color: "#0891b2",
      bullets: [
        "Severe class imbalance: positive rates range from 0.34% (Hernia) to 23.88% (Infiltration).",
        "Positive-weighted BCE Loss: L = -1/14 Σ [ w_c * y_c * log σ(l_c) + (1 - y_c) * log(1 - σ(l_c)) ].",
        "Weights w_c = N_train,neg,c / N_train,pos,c derived strictly from the 73,917 training samples.",
        "Zero leakage in class weight estimation."
      ]
    },
    {
      step: 4,
      title: "4. Two-Stage Training Scheme",
      subtitle: "Controlled Optimization",
      icon: <PlayCircle size={18} />,
      color: "#4f46e5",
      bullets: [
        "Stage 1 (Head Warm-up): Backbones frozen; train heads 2 epochs at lr = 1.0 x 10^-3, AdamW (wd = 10^-4).",
        "Stage 2 (Fine-Tuning): Unfreeze backbones; train up to 15 epochs at lr = 1.0 x 10^-4.",
        "Batch size 32, PyTorch AMP (FP16), Gradient clipping (max norm = 1.0).",
        "ReduceLROnPlateau (factor 0.5, patience 2) & Early Stopping (patience 5) on Val Macro AUROC.",
        "Random seed 42 with deterministic cuDNN algorithms enabled."
      ]
    },
    {
      step: 5,
      title: "5. Evaluated Architectures (M1–M7)",
      subtitle: "CNNs, ViTs & Hybrids",
      icon: <BarChart3 size={18} />,
      color: "#059669",
      bullets: [
        "M1: DenseNet-121 (Convolutional Baseline, 6.97M params, GAP + Linear).",
        "M2: Swin Transformer-Tiny (ViT Baseline, 27.53M params, shifted window self-attention).",
        "M3: Late Probability Fusion (0.50 * P_M1 + 0.50 * P_M2; validation sweep identified shallow optimum at α=0.55-0.60).",
        "M4: Feature Concatenation (Intermediate projection to 512-d + concat + 2-layer MLP).",
        "M5: Spatial Cross-Attention (CNN tokens as Queries, Swin-T tokens as Keys/Values).",
        "M6: Cross-Attention + 14 Disease Gating modules (Sigmoid channel modulation).",
        "M7: Operating-point analysis of M6 using validation-optimized thresholds (τ_c* ∈ [0.11, 0.81])."
      ]
    },
    {
      step: 6,
      title: "6. Patient-Cluster Inference",
      subtitle: "B = 2,000 Paired Resamples",
      icon: <Award size={18} />,
      color: "#d97706",
      bullets: [
        "Accounts for repeated radiographs per patient (K = 2,797 clusters in test set).",
        "Paired patient-cluster bootstrap (B = 2,000 resamples, random seed 42).",
        "Cluster-robust Wald test (z = Δ / SE*_cluster) and Shifted empirical bootstrap test (H0).",
        "Step-down Holm–Bonferroni multiplicity control (FWER α = 0.05) on Primary Family (4 endpoints).",
        "Benjamini–Hochberg False Discovery Rate (q = 0.05) for per-disease hypothesis testing.",
        "Retrospective methodological disclosure (post-hoc analysis on test predictions)."
      ]
    }
  ];

  const current = stages.find(s => s.step === selectedStage) || stages[0];

  return (
    <div className="card" style={{ padding: '1.25rem' }}>
      <div className="card-header">
        <div>
          <div className="card-title">
            <Sliders size={18} color="var(--navy-primary)" />
            <span>End-to-End Experimental Research Pipeline</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Systematic overview from NIH cohort ingestion to patient-cluster bootstrap inference. Click each stage to inspect verified parameters.
          </p>
        </div>
        <span className="badge badge-blue">Deterministic Seed 42</span>
      </div>

      {/* Stage Stepper Navigation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {stages.map((st) => (
          <button
            key={st.step}
            onClick={() => setSelectedStage(st.step)}
            style={{
              padding: '0.75rem 0.65rem',
              borderRadius: '6px',
              border: selectedStage === st.step ? `2px solid ${st.color}` : '1px solid var(--border-subtle)',
              backgroundColor: selectedStage === st.step ? '#eff6ff' : '#ffffff',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: st.color }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>STEP {st.step}</span>
              {st.icon}
            </div>
            <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {st.title.replace(/^\d+\.\s*/, '')}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {st.subtitle}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Stage Detail Panel */}
      <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', color: current.color, display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
            {current.icon}
            <span>{current.title} — {current.subtitle}</span>
          </h3>
          <span className="badge" style={{ borderColor: current.color, color: current.color }}>
            Stage {current.step} of 6
          </span>
        </div>

        <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {current.bullets.map((bullet, idx) => (
            <li key={idx} style={{ lineHeight: 1.5 }}>{bullet}</li>
          ))}
        </ul>

        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#64748b' }}>
          <Info size={14} />
          <span>All values and hyperparameters are extracted directly from the verified research artifacts in <code>Hybrid_Training/logs/</code> and <code>paper/main.tex</code>.</span>
        </div>
      </div>
    </div>
  );
};
