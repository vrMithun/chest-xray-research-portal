import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingDown, 
  Sliders, 
  Layers,
  Scale
} from 'lucide-react';

export const DiscussionPage: React.FC = () => {
  const coreQuestions = [
    {
      q: "1. Which model performed best overall?",
      ans: "Across the evaluated configurations under standard operating threshold τ = 0.50, decision-level Late Probability Fusion (M3) between DenseNet-121 and Swin Transformer-Tiny achieved the strongest aggregate performance, attaining higher macro AUROC (0.8089), macro AP (0.2776), macro precision (0.1884), macro F1 (0.2828), and micro F1 (0.3042). While M4 achieved higher recall (0.7785) and M2 attained higher specificity (0.7039), M3 maintained the most balanced trade-off across both ranking and operating-point metrics.",
      icon: <CheckCircle2 size={18} color="#2563eb" />
    },
    {
      q: "2. Did late probability fusion (M3) help?",
      ans: "Yes. Combining probabilistic predictions from models with divergent inductive biases (DenseNet-121 local convolutional receptive fields vs. Swin-T shifted-window non-local self-attention) provided a consistent, statistically established advantage over both individual constituent models. A validation sweep identified a shallow optimum around α = 0.55–0.60 (validation macro AUROC 0.8376); α = 0.50 (validation macro AUROC 0.8375) was retained for test evaluation. This balanced weighting translated to a statistically verified 5.72% reduction in test false positives (p_Holm < 0.0001) alongside higher macro recall (0.7418 vs. 0.7359).",
      icon: <CheckCircle2 size={18} color="#059669" />
    },
    {
      q: "3. Did intermediate feature concatenation (M4) help?",
      ans: "Intermediate feature concatenation succeeded in expanding sensitivity, achieving the highest recall (0.7785) and fewest false negatives (4,753) among all models. However, it failed to improve overall discriminative precision, resulting in 13,738 additional false positives (+13.41% vs. M1) and lower macro AUROC (0.7923). In high-volume screening settings where false alarms impose heavy clinical burdens (unwarranted CT scans, invasive biopsies), this trade-off is disadvantageous.",
      icon: <Scale size={18} color="#d97706" />
    },
    {
      q: "4. Did dense spatial cross-attention and gating help (M5 & M6)?",
      ans: "Under the evaluated two-stage training protocol, cross-attention (M5) and disease-specific gating (M6) did not yield competitive performance. While disease-specific gating (M6) improved slightly upon standard cross-attention (M5) by raising AUROC from 0.6392 to 0.6455 and reducing false positives by 22,965, both models fell substantially short of single-backbone baselines.",
      icon: <TrendingDown size={18} color="#dc2626" />
    },
    {
      q: "5. What does the negative result of M5 and M6 reveal?",
      ans: "This negative finding is scientifically instructive. In literature, cross-attention is frequently assumed to automatically improve representation capacity. However, our post-mortem analysis revealed severe optimization instability at epoch 3 when backbones were unfrozen for end-to-end fine-tuning. Propagating cross-attention gradients simultaneously into two heterogeneous unadapted backbones from generic ImageNet initialization without domain pretraining caused early stopping to trigger at epoch 7. This demonstrates that complex spatial interaction mechanisms require specialized staged unfreezing or domain-adapted initialization, rather than proving that cross-attention is fundamentally flawed.",
      icon: <AlertTriangle size={18} color="#dc2626" />
    },
    {
      q: "6. What happened to false positives vs. recall and false negatives?",
      ans: "Our results demonstrate that diagnostic error reduction involves distinct, model-dependent trade-offs. Swin-T (M2) independently reduced false positives by 6.58% at τ = 0.50, but at the expense of lower recall and 833 additional false negatives. Feature concatenation (M4) boosted recall at the cost of 13,738 more false alarms. Late fusion (M3) achieved the most favorable balance, cutting false positives by 5,864 (-5.72%, p < 0.0001) while incurring an inconclusive increase of 111 false negatives (95% CI: [-1, +217]). Late fusion shifts the operational balance toward higher specificity rather than achieving an unconditional drop in both error modes.",
      icon: <Scale size={18} color="#2563eb" />
    },
    {
      q: "7. How sensitive are conclusions to threshold selection?",
      ans: "Threshold selection exerts a profound influence on operational performance. The evaluation of M7 demonstrated that tuning thresholds on validation data cuts M6 false positives from 155,888 to 95,240, but causes recall to collapse from 0.6604 to 0.4540 (FN surges to 11,581). Crucially, when baseline DenseNet-121 (M1) is evaluated under an identical validation-tuning protocol, false positives fall to 38,409 FP with macro F1 of 0.3286. This proves that threshold adjustment decouples operating points from intrinsic representation capability.",
      icon: <Sliders size={18} color="#4f46e5" />
    }
  ];

  return (
    <div className="container">
      {/* Title Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-navy">Scientific Discussion</span>
          <span className="badge badge-blue">Sections 5 & 6 in Manuscript</span>
        </div>
        <h1 style={{ fontSize: '1.65rem', color: 'var(--navy-deep)', marginBottom: '0.4rem' }}>
          Scientific Discussion, Error Dynamics & Study Limitations
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '900px' }}>
          Critical interpretation of empirical findings, post-mortem analysis of optimization failure modes, operational decoupling of decision thresholds, and formal disclosure of retrospective study boundaries.
        </p>
      </div>

      {/* 7 Core Research Questions Answered */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <BookOpen size={18} color="var(--navy-primary)" />
            <span>Answers to the Seven Core Research Questions (Section 5 in Manuscript)</span>
          </div>
          <span className="badge badge-blue">Authoritative Paper Insights</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {coreQuestions.map((cq, idx) => (
            <div 
              key={idx}
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '1.15rem'
              }}
            >
              <h3 style={{ fontSize: '0.95rem', color: 'var(--navy-deep)', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {cq.icon}
                <span>{cq.q}</span>
              </h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.75rem' }}>
                {cq.ans}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Post-Mortem of Cross-Attention Degradation */}
      <div className="card" style={{ borderLeft: '5px solid #dc2626' }}>
        <div className="card-header">
          <div className="card-title">
            <TrendingDown size={18} color="#dc2626" />
            <span>Post-Mortem Analysis: Why Cross-Attention Hybrids (M5 & M6) Degraded</span>
          </div>
          <span className="badge badge-danger">Honest Negative Result</span>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p style={{ margin: 0 }}>
            A detailed examination of the epoch logs reveals the mechanical basis for the observed underperformance of M5 (Macro AUROC 0.6392, 178,853 FP) and M6 (Macro AUROC 0.6455, 155,888 FP):
          </p>

          <div className="grid-2" style={{ gap: '1rem' }}>
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '0.85rem' }}>
              <h4 style={{ fontSize: '0.825rem', color: '#991b1b', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                1. Stage 2 Unfreezing Instability (Epoch 3)
              </h4>
              <p style={{ fontSize: '0.8rem', margin: 0, lineHeight: 1.45 }}>
                During Stage 1 head warm-up (epochs 1&ndash;2), M5 and M6 reached reasonable validation AUROCs of 0.6957 and 0.7029. However, at epoch 3, when both the DenseNet and Swin-T backbones were unfrozen for end-to-end training at &eta; = 1.0 &times; 10<sup>&minus;4</sup>, validation AUROC collapsed immediately to 0.5513 (M5) and 0.5348 (M6), with validation loss spiking from 1.365 to 1.711.
              </p>
            </div>

            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '0.85rem' }}>
              <h4 style={{ fontSize: '0.825rem', color: '#991b1b', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                2. Lack of Domain Adaptation & Early Stopping
              </h4>
              <p style={{ fontSize: '0.8rem', margin: 0, lineHeight: 1.45 }}>
                In our verified configuration (<code>HYBRID_INIT_FROM_M1_M2 = False</code>), backbones were initialized from generic ImageNet weights rather than domain fine-tuned CXR checkpoints. Over subsequent epochs (4&ndash;7), the network recovered only to 0.6512. Early stopping triggered at epoch 7, restoring the peak checkpoint from Epoch 2 (which had received only 2 warm-up epochs while backbones remained ImageNet-generic).
              </p>
            </div>
          </div>

          <div className="alert-box alert-info" style={{ margin: 0, fontSize: '0.8rem' }}>
            <strong>Scientific Takeaway:</strong> High-capacity spatial cross-attention mechanisms do not automatically translate to superior performance in medical imaging. When two heterogeneous backbones interact through dense query-key matrices, gradient propagation can destabilize feature representations unless specialized schedules (e.g., lower backbone learning rates or domain-adapted initialization) are employed.
          </div>
        </div>
      </div>

      {/* Formal Study Limitations */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <ShieldAlert size={18} color="#b45309" />
            <span>Formal Study Limitations & Clinical Caveats (Section 6 in Manuscript)</span>
          </div>
          <span className="badge badge-warning">Retrospective Scope</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <strong>1. Single Retrospective Benchmark:</strong> All experiments were conducted exclusively on the NIH ChestX-ray14 dataset. While large and standardized, external generalization to multi-center cohorts (e.g., CheXpert, MIMIC-CXR, PadChest) or distinct clinical populations was not evaluated. Patient-cluster resampling establishes statistical robustness within the test cohort, but does not substitute for cross-hospital clinical validation.
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <strong>2. Weak NLP-Derived Ground Truth:</strong> Pathology labels in ChestX-ray14 were extracted from unstructured radiology text reports via automated natural language processing (CheXNet NLP miner), introducing known label uncertainty, bounding box ambiguities, and weak-label noise.
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <strong>3. Suboptimal Training Regime for Cross-Attention:</strong> Due to computational constraints and early stopping triggering at epoch 7, models M5 and M6 were evaluated at checkpoints that had not converged to optimal fine-tuned representations. Their underperformance reflects observed optimization instability under this specific protocol rather than proving that cross-attention is fundamentally flawed.
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <strong>4. Retrospective Statistical Inference:</strong> Our hypothesis testing framework and endpoint hierarchies were formalized retrospectively during the post-hoc validation audit on saved predictions, rather than prospectively pre-registered prior to experimentation.
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: '#fffbeb', borderRadius: '6px', border: '1px solid #fde68a', color: '#92400e' }}>
            <strong>5. Absolute Clinical Non-Readiness:</strong> The reported diagnostic false-positive and false-negative reductions reflect algorithmic properties on benchmark data and must NOT be construed as evidence of clinical readiness, diagnostic efficacy, or suitability for autonomous clinical deployment.
          </div>
        </div>
      </div>
    </div>
  );
};
