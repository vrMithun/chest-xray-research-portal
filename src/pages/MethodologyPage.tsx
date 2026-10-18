import React from 'react';
import { DATASET_SPLITS } from '../data/researchData';
import { PipelineDiagram } from '../components/PipelineDiagram';
import { 
  Database, 
  Cpu, 
  Code, 
  Settings, 
  Calculator, 
  Scale
} from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="container">
      {/* Page Title Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-navy">Experimental Methodology</span>
          <span className="badge badge-blue">Section 3 in Manuscript</span>
        </div>
        <h1 style={{ fontSize: '1.65rem', color: 'var(--navy-deep)', marginBottom: '0.4rem' }}>
          Materials, Methods & Pipeline Architecture
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '900px' }}>
          Comprehensive documentation of dataset curation, patient-level leakage prevention, positive-weighted loss formulation, two-stage optimization dynamics, and the validation-based threshold tuning protocol.
        </p>
      </div>

      {/* Interactive 6-Stage Pipeline Diagram */}
      <PipelineDiagram />

      {/* Dataset & Splitting Protocol */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Database size={18} color="var(--navy-primary)" />
            <span>Dataset Curation & Zero-Leakage Patient-Level Partitioning</span>
          </div>
          <span className="badge badge-success">P_Train ∩ P_Val ∩ P_Test = ∅</span>
        </div>

        <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          We conduct our experiments on the National Institutes of Health (NIH) ChestX-ray14 benchmark dataset. The cohort consists of exactly <strong>112,120 frontal-view</strong> (posterior–anterior and anterior–posterior) chest radiographs obtained from <strong>30,805 unique patients</strong>. Each radiograph is annotated across 14 thoracic disease categories:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', margin: '0.75rem 0 1.25rem' }}>
          {[
            "1. Atelectasis", "2. Cardiomegaly", "3. Effusion", "4. Infiltration",
            "5. Mass", "6. Nodule", "7. Pneumonia", "8. Pneumothorax",
            "9. Consolidation", "10. Edema", "11. Emphysema", "12. Fibrosis",
            "13. Pleural Thickening", "14. Hernia"
          ].map((cond) => (
            <span key={cond} className="badge" style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}>
              {cond}
            </span>
          ))}
        </div>

        <div className="alert-box alert-warning">
          <strong>Patient Leakage Prevention Protocol:</strong> Because individual patients contribute between 1 and 184 longitudinal examinations (mean 3.64 across cohort, mean 9.15 in official test set), naive random image-level partitioning introduces severe data leakage, permitting neural networks to memorize patient-specific skeletal contours and anatomical landmarks. 
          To prevent leakage, the 86,524 images in the official <code>train_val_list.txt</code> were partitioned strictly at the unique patient level (seed 42, 15% patient validation fraction), yielding <strong>73,917 training images (23,807 patients)</strong> and <strong>12,607 validation images (4,201 patients)</strong>, alongside the official held-out test partition of <strong>25,596 images (2,797 patients)</strong>. Zero patient overlap was asserted programmatically across all pairwise split intersections.
        </div>

        <div className="table-responsive">
          <table className="scientific-table">
            <thead>
              <tr>
                <th>Cohort Split Partition</th>
                <th className="num">Images (N)</th>
                <th className="num">Unique Patients (P)</th>
                <th className="num">Proportion</th>
                <th className="num">Avg. Images / Patient</th>
                <th>Patient Leakage Assertion</th>
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

      {/* Preprocessing & Multi-Label Formulation */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Settings size={18} color="var(--navy-primary)" />
              <span>Preprocessing & Augmentation Pipeline</span>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <p style={{ margin: 0 }}>
              Radiographs are preprocessed by resizing from native resolution to <code>256 x 256</code> pixels. During training ingestion, images undergo random crop to an input dimension of <code>224 x 224</code> pixels and ImageNet-1K channel normalization:
            </p>
            <pre style={{ background: '#f1f5f9', padding: '0.65rem', borderRadius: '4px', fontSize: '0.78rem' }}>
              &mu; = [0.485, 0.456, 0.406]&#10;&sigma; = [0.229, 0.224, 0.225]
            </pre>
            <p style={{ margin: 0 }}>
              To prevent geometric distortion of subtle pathological features (e.g., pneumothorax visceral pleural lines or cardiomegaly cardiothoracic ratio), training augmentations are deliberately conservative:
            </p>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li>Random Horizontal Flip with probability p = 0.5.</li>
              <li>Random Affine Rotation constrained to [&minus;10&deg;, +10&deg;].</li>
              <li>Color Jittering with brightness &plusmn;0.1 and contrast &plusmn;0.1.</li>
              <li>Validation and Test partitions: Pure deterministic center cropping to 224 x 224 without stochastic noise.</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Calculator size={18} color="var(--navy-primary)" />
              <span>Multi-Label Loss: Positive-Weighted BCE</span>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <p style={{ margin: 0 }}>
              Because positive finding prevalence is low across all 14 conditions (e.g., Hernia is present in only 0.34% of test cases), standard Binary Cross-Entropy (BCE) causes models to predict near-zero probabilities, collapsing sensitivity. We employ positive-weighted BCE:
            </p>
            <div style={{ background: '#f8fafc', padding: '0.85rem', border: '1px solid #e2e8f0', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'center' }}>
              L(y, &ell;) = &minus; 1/14 &Sigma;<sub>c=1..14</sub> [ w<sub>c</sub> y<sub>c</sub> log &sigma;(&ell;<sub>c</sub>) + (1 &minus; y<sub>c</sub>) log(1 &minus; &sigma;(&ell;<sub>c</sub>)) ]
            </div>
            <p style={{ margin: 0 }}>
              To ensure strict absence of data leakage, the class positive weights <code>w_c</code> are calculated strictly from the <strong>73,917 training samples</strong>:
            </p>
            <div style={{ background: '#f8fafc', padding: '0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'center' }}>
              w<sub>c</sub> = N<sub>train, neg, c</sub> / N<sub>train, pos, c</sub>
            </div>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              This formulation ensures that the gradient penalty for false negatives scales proportionally with the empirical class scarcity.
            </p>
          </div>
        </div>
      </div>

      {/* Two-Stage Training Scheme & Threshold Optimization */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Cpu size={18} color="var(--navy-primary)" />
              <span>Standardized Two-Stage Training Protocol</span>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <p style={{ margin: 0 }}>
              All trainable architectures (M1, M2, M4, M5, M6) were optimized under a standardized two-stage schedule:
            </p>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <li>
                <strong>Stage 1 (Head Warm-up &mdash; 2 Epochs):</strong> Both CNN and Swin-T backbones are frozen. Only newly initialized projection layers, cross-attention modules, and classification heads are trained at learning rate &eta;<sub>1</sub> = 1.0 &times; 10<sup>&minus;3</sup> using AdamW (weight decay 1.0 &times; 10<sup>&minus;4</sup>).
              </li>
              <li>
                <strong>Stage 2 (End-to-End Fine-Tuning &mdash; Up to 15 Epochs):</strong> All backbone weights are unfrozen. The full network is optimized end-to-end at reduced learning rate &eta;<sub>2</sub> = 1.0 &times; 10<sup>&minus;4</sup>.
              </li>
              <li>
                <strong>Adaptive Learning Rate & Early Stopping:</strong> Scheduled with <code>ReduceLROnPlateau</code> monitoring validation macro AUROC (decay factor 0.5, patience 2 epochs). Early stopping patience set to 5 epochs. The highest validation AUROC checkpoint was restored for held-out evaluation.
              </li>
              <li>
                <strong>Computational Regularization:</strong> Batch size 32, PyTorch Automatic Mixed Precision (AMP / FP16), and gradient norm clipping at max norm 1.0.
              </li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Scale size={18} color="var(--navy-primary)" />
              <span>Validation-Based Decision Threshold Tuning Protocol</span>
            </div>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <p style={{ margin: 0 }}>
              The standard classification protocol fixes &tau;<sub>c</sub> = 0.50 for all classes. However, when positive class priors range from 0.34% to 23.88%, a fixed 0.50 operating threshold forces an unfavorable operational trade-off.
            </p>
            <p style={{ margin: 0 }}>
              In the validation threshold optimization protocol:
            </p>
            <div style={{ background: '#f8fafc', padding: '0.85rem', border: '1px solid #e2e8f0', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'center' }}>
              &tau;<sub>c</sub><sup>*</sup> = argmax<sub>&tau; &isin; G</sub> F<sub>1, c</sub><sup>(val)</sup>(&tau;)
            </div>
            <p style={{ margin: 0 }}>
              where grid G = &#123;0.01, 0.02, &hellip;, 0.99&#125;. These 14 optimal disease thresholds are tuned strictly on the 12,607 validation images, frozen, and evaluated on the held-out test set.
            </p>
            <div className="alert-box alert-info" style={{ margin: 0, padding: '0.65rem 0.85rem', fontSize: '0.78rem' }}>
              <strong>Crucial Protocol Clarification:</strong> Model M7 evaluates M6 predictions under these tuned thresholds &tau;<sub>c</sub><sup>*</sup> &isin; [0.11, 0.81]. To establish a true like-for-like baseline, this exact protocol was also applied across all other models (M1&ndash;M5).
            </div>
          </div>
        </div>
      </div>

      {/* Verified Reproducibility Hyperparameters Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Code size={18} color="var(--navy-primary)" />
            <span>Verified Hyperparameters & Experimental Configuration</span>
          </div>
          <span className="badge badge-blue">Directly Verified from Hybrid_Training/logs/</span>
        </div>

        <div className="table-responsive">
          <table className="scientific-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Hyperparameter</th>
                <th>Verified Ground-Truth Setting</th>
                <th>Experimental Rationale</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={4}><strong>Data & Ingestion</strong></td>
                <td>Input Resolution</td>
                <td><code>224 x 224 pixels</code> (preprocessed 256 x 256)</td>
                <td>Standard benchmark resolution for DenseNet and Swin-T.</td>
              </tr>
              <tr>
                <td>Batch Size</td>
                <td><code>32</code></td>
                <td>Equally enforced across all training and test evaluations.</td>
              </tr>
              <tr>
                <td>Data Augmentation</td>
                <td><code>H-flip (0.5), Rotation (±10°), ColorJitter (0.1)</code></td>
                <td>Anatomically conservative; prevents distortion of diagnostic cues.</td>
              </tr>
              <tr>
                <td>Normalization</td>
                <td><code>ImageNet Mean & Std</code></td>
                <td>Matches torchvision pretrained checkpoint statistics.</td>
              </tr>
              <tr>
                <td rowSpan={5}><strong>Optimization</strong></td>
                <td>Optimizer</td>
                <td><code>AdamW (β1=0.9, β2=0.999, wd=1e-4)</code></td>
                <td>Decoupled weight decay for both CNN and Transformer weights.</td>
              </tr>
              <tr>
                <td>Stage 1 Learning Rate</td>
                <td><code>1.0 x 10^-3 (2 warm-up epochs)</code></td>
                <td>Classification head warm-up with frozen backbones.</td>
              </tr>
              <tr>
                <td>Stage 2 Learning Rate</td>
                <td><code>1.0 x 10^-4 (up to 15 epochs)</code></td>
                <td>End-to-end full network fine-tuning.</td>
              </tr>
              <tr>
                <td>LR Scheduler</td>
                <td><code>ReduceLROnPlateau (factor 0.5, patience 2)</code></td>
                <td>Monitors validation macro AUROC.</td>
              </tr>
              <tr>
                <td>Early Stopping</td>
                <td><code>Patience = 5 epochs</code></td>
                <td>Best validation AUROC checkpoint saved and restored for test.</td>
              </tr>
              <tr>
                <td rowSpan={4}><strong>Regularization</strong></td>
                <td>Loss Formulation</td>
                <td><code>Positive-weighted BCE (from 73,917 train set)</code></td>
                <td>Counters heavy class imbalance across the 14 conditions.</td>
              </tr>
              <tr>
                <td>Gradient Clipping</td>
                <td><code>Max norm = 1.0</code></td>
                <td>Prevents attention and gradient exploding instability.</td>
              </tr>
              <tr>
                <td>Precision Mode</td>
                <td><code>PyTorch AMP (FP16 / autocast)</code></td>
                <td>Accelerated training throughput with reduced memory footprint.</td>
              </tr>
              <tr>
                <td>Random Seed</td>
                <td><code>42</code></td>
                <td>cuDNN deterministic algorithms asserted across all routines.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
