/**
 * Authoritative Research Data for Chest X-ray Multi-Label Classification
 * Sources of Truth:
 * - paper/main.tex & paper/FINAL_TECHNICAL_VALIDATION_REPORT.md
 * - Hybrid_Training/results/model_comparison.csv
 * - Hybrid_Training/results/model_comparison_all_val_tuned_thresholds.csv
 * - Hybrid_Training/results/parameter_counts.csv
 * - Hybrid_Training/results/inference_speed.csv
 * - Hybrid_Training/results/training_time.csv
 * - Hybrid_Training/statistical_analysis/bootstrap_results.csv
 * - Hybrid_Training/statistical_analysis/per_disease_statistical_results.csv
 * - Hybrid_Training/results/fusion_alpha_search_val.csv
 */

export interface DatasetSplit {
  name: string;
  images: number;
  patients: number;
  cohortProportion: string;
  avgImagesPerPatient: number;
  patientLeakage: string;
  description: string;
}

export interface ModelResult {
  id: string;
  name: string;
  architecture: string;
  fusionStrategy: string;
  thresholdType: 'Standard (0.50)' | 'Validation-Tuned';
  macroAUC: number;
  macroAP: number;
  macroPrecision: number;
  macroRecall: number;
  macroF1: number;
  microF1: number;
  specificity: number;
  fpr: number;
  totalFP: number;
  totalFN: number;
  hammingLoss: number;
  fpReductionVsM1: number; // percentage
  totalParams: number;
  trainableParams: number;
  pureModelMsPerImage: number;
  pureModelImagesPerSec: number;
  trainingTimeMin?: number;
  epochsRun?: number;
  bestEpoch?: number;
  bestValMetric?: number;
  keyRole: string;
  keyMechanism: string;
}

export interface DiseaseMetric {
  disease: string;
  supportPositives: number;
  negatives: number;
  prevalencePct: number;
  m1AUC: number;
  m2AUC: number;
  m3AUC: number;
  m4AUC: number;
  m5AUC: number;
  m6AUC: number;
  m7AUC: number; // same as M6
  m1F1: number;
  m2F1: number;
  m3F1: number;
  m4F1: number;
  m5F1: number;
  m6F1: number;
  m7F1: number;
  m1FP: number;
  m3FP: number;
  fpDiff: number; // M3 - M1
  fpReductionPct: number;
  m1FN: number;
  m3FN: number;
  fnDiff: number; // M3 - M1
  aurocDiff: number; // M3 - M1
  aurocClusterSE: number;
  aurocCiLower: number;
  aurocCiUpper: number;
  aurocWaldP: number;
  aurocHolmP: number;
  aurocSignificant: boolean;
  m7TunedThreshold: number;
}

export interface BootstrapResult {
  metric: string;
  isPrimaryFamily: boolean;
  m1Point: number;
  m3Point: number;
  pointDiff: number;
  clusterSE: number;
  ciLowerPercentile: number;
  ciUpperPercentile: number;
  ciLowerNormal: number;
  ciUpperNormal: number;
  clusterZ: number;
  waldP: string;
  shiftedBootstrapP: string;
  holmAdjustedP?: string;
  significant: boolean;
  notes?: string;
}

export interface AlphaSweepPoint {
  alpha: number;
  valMacroAUC: number;
  valMacroAP: number;
}

export const RESEARCH_IDENTITY = {
  title: "Architectural Integration Strategies and Diagnostic Error Dynamics in Multi-Label Chest X-ray Classification: A Comparative Empirical Study of CNNs, Swin Transformers, and Hybrid Models",
  shortTitle: "Chest X-ray Architectural Integration & Error Dynamics",
  benchmark: "NIH ChestX-ray14 Benchmark",
  cohortSize: "112,120 Frontal Radiographs across 30,805 Unique Patients",
  publicRepoUrl: "https://github.com/vrMithun/chest-xray-multilabel-classification",
  pdfPath: "paper.pdf",
  leadAuthorPlaceholder: "Research Engineering & Medical Image Computing Team",
  statusBadge: "Peer Review Documentation & Source of Truth",
  verifiedDate: "October 2026",
  license: "Pending Specification (Research Code & Public Benchmark)"
};

export const ABSTRACT_TEXT = `Multi-label thoracic pathology classification from chest radiographs is a central task in medical computer vision. While Convolutional Neural Networks (CNNs) and Vision Transformers offer distinct inductive biases, the comparative effectiveness of different architectural integration strategies—and specifically their downstream effects on diagnostic prediction error modes such as false-positive (FP) versus false-negative (FN) trade-offs—remains insufficiently characterized under strict experimental controls. In this work, we conduct a rigorous empirical comparative investigation on the benchmark NIH ChestX-ray14 dataset (112,120 radiographs from 30,805 patients) partitioned at the patient level to enforce zero patient leakage (73,917 train, 12,607 validation, and 25,596 test images). We systematically evaluate six model architectures using an identical two-stage training scheme with class-weighted binary cross-entropy: DenseNet-121 (M1), Swin Transformer-Tiny (M2, Swin-T), Late Probability Fusion (M3, retaining α = 0.50 following a validation sweep identifying a shallow optimum around α = 0.55–0.60), Intermediate Feature Concatenation (M4), Spatial Multi-Head Cross-Attention (M5), and Cross-Attention with 14 Disease-Specific Gating modules (M6), alongside a validation-based operating-point threshold analysis (M7, which evaluates frozen validation-optimized thresholds on M6 predictions rather than introducing a new architecture). Our findings reveal that simple late probability fusion (M3) achieved the strongest aggregate performance among the evaluated architectures under the standard τ = 0.50 operating point, yielding a macro AUROC of 0.8089 (+0.0124 over M1, p_Holm < 0.0001), macro AP of 0.2776 (+0.0103, p_Holm < 0.0001), macro F1 of 0.2828 (+0.0073, p_Holm = 0.00048), and micro F1 of 0.3042, while reducing total test-set false positives by 5.72% relative to the DenseNet-121 baseline (from 102,477 to 96,613 FP, p_Holm < 0.0001) across 10 of 14 pathologies under patient-cluster bootstrap inference (B = 2,000). Total false negatives exhibited a slight, statistically inconclusive increase of 111 cases (from 4,881 to 4,992, 95% CI: [-1, +217]), indicating an operational trade-off toward higher specificity rather than an unconditional drop in both error modes. While Swin-T (M2) independently reduced total false positives by 6.58% (95,730 FP) at the fixed τ = 0.50 threshold, this occurred at the expense of lower recall (0.7267 vs. 0.7359) and decreased macro F1 (0.2596 vs. 0.2755). Feature concatenation (M4) boosted sensitivity (recall 0.7785) but incurred a 13.41% increase in false positives (116,215 FP). Crucially, we document a severe negative result for complex cross-attention hybrids (M5 and M6), which exhibited substantial performance degradation during end-to-end fine-tuning under the evaluated training protocol and underperformed substantially (macro AUROC 0.6392 and 0.6455). Finally, we demonstrate that validation threshold tuning (M7) fundamentally alters the operating point, cutting false positives to 95,240 for M6, but depressing recall from 0.6604 to 0.4540; under an identical threshold protocol, baseline M1 achieves 38,409 FP and 0.3286 F1. These empirical results underscore that architectural complexity does not guarantee improved classification performance or error reduction in medical imaging, and that decision-level integration remains a strong baseline.`;

export const DATASET_SPLITS: DatasetSplit[] = [
  {
    name: "Training Set",
    images: 73917,
    patients: 23807,
    cohortProportion: "65.93%",
    avgImagesPerPatient: 3.10,
    patientLeakage: "Verified 0 Overlap",
    description: "Partitioned from official NIH train_val_list.txt at patient level (seed 42, 85% patient split). Exclusively used for model parameter learning."
  },
  {
    name: "Validation Set",
    images: 12607,
    patients: 4201,
    cohortProportion: "11.24%",
    avgImagesPerPatient: 3.00,
    patientLeakage: "Verified 0 Overlap",
    description: "15% patient-level partition of train_val_list.txt. Used for learning rate scheduling, early stopping checkpoint selection, late fusion α-sweep, and decision threshold tuning."
  },
  {
    name: "Test Set (Official NIH)",
    images: 25596,
    patients: 2797,
    cohortProportion: "22.83%",
    avgImagesPerPatient: 9.15,
    patientLeakage: "Verified 0 Overlap",
    description: "Official unperturbed NIH benchmark test partition (test_list.txt). Completely held-out; used only for final evaluation and patient-cluster bootstrap inference."
  },
  {
    name: "Total Cohort",
    images: 112120,
    patients: 30805,
    cohortProportion: "100.00%",
    avgImagesPerPatient: 3.64,
    patientLeakage: "P_Train ∩ P_Val = ∅, P_Train ∩ P_Test = ∅, P_Val ∩ P_Test = ∅",
    description: "Full cohort from Data_Entry_2017_v2020.csv. Individual patients contribute between 1 and 184 longitudinal examinations."
  }
];

export const MODELS_STANDARD_RESULTS: ModelResult[] = [
  {
    id: "M1",
    name: "DenseNet-121",
    architecture: "Convolutional Baseline (121-layer DenseNet)",
    fusionStrategy: "None (Global Average Pooling on conv features)",
    thresholdType: "Standard (0.50)",
    macroAUC: 0.7965,
    macroAP: 0.2673,
    macroPrecision: 0.1844,
    macroRecall: 0.7359,
    macroF1: 0.2755,
    microF1: 0.2937,
    specificity: 0.6805,
    fpr: 0.3195,
    totalFP: 102477,
    totalFN: 4881,
    hammingLoss: 0.2996,
    fpReductionVsM1: 0.0,
    totalParams: 6968206,
    trainableParams: 6968206,
    pureModelMsPerImage: 1.721,
    pureModelImagesPerSec: 580.97,
    trainingTimeMin: 226.74,
    epochsRun: 13,
    bestEpoch: 8,
    bestValMetric: 0.8285,
    keyRole: "Standard clinical convolutional reference model.",
    keyMechanism: "Aggressive dense feature reuse and local inductive biases."
  },
  {
    id: "M2",
    name: "Swin Transformer-Tiny",
    architecture: "Vision Transformer Baseline (Swin-T)",
    fusionStrategy: "None (Spatial Mean Pooling on patch tokens)",
    thresholdType: "Standard (0.50)",
    macroAUC: 0.8000,
    macroAP: 0.2602,
    macroPrecision: 0.1645,
    macroRecall: 0.7267,
    macroF1: 0.2596,
    microF1: 0.2976,
    specificity: 0.7039,
    fpr: 0.2961,
    totalFP: 95730,
    totalFN: 5714,
    hammingLoss: 0.2831,
    fpReductionVsM1: 6.58,
    totalParams: 27530120,
    trainableParams: 27530120,
    pureModelMsPerImage: 1.609,
    pureModelImagesPerSec: 621.38,
    trainingTimeMin: 354.49,
    epochsRun: 17,
    bestEpoch: 13,
    bestValMetric: 0.8264,
    keyRole: "Hierarchical attention-based reference model.",
    keyMechanism: "Shifted-window self-attention capturing bilateral lung symmetry and non-local context."
  },
  {
    id: "M3",
    name: "Late Probability Fusion",
    architecture: "Dual-Backbone Decision-Level Ensemble",
    fusionStrategy: "Linear Probability Interpolation (0.50 * P_M1 + 0.50 * P_M2)",
    thresholdType: "Standard (0.50)",
    macroAUC: 0.8089,
    macroAP: 0.2776,
    macroPrecision: 0.1884,
    macroRecall: 0.7418,
    macroF1: 0.2828,
    microF1: 0.3042,
    specificity: 0.6996,
    fpr: 0.3004,
    totalFP: 96613,
    totalFN: 4992,
    hammingLoss: 0.2835,
    fpReductionVsM1: 5.72,
    totalParams: 34498326,
    trainableParams: 34498326,
    pureModelMsPerImage: 3.383,
    pureModelImagesPerSec: 295.61,
    trainingTimeMin: 0,
    epochsRun: 0,
    bestEpoch: 0,
    bestValMetric: 0.8375,
    keyRole: "Proposed decision-level hybrid integration.",
    keyMechanism: "Combines complementary local (CNN) and global (Transformer) probability distributions without gradient overhead."
  },
  {
    id: "M4",
    name: "Feature Concatenation",
    architecture: "Intermediate Feature-Level Hybrid",
    fusionStrategy: "Linear Projection (512-d) + Concat (1024-d) + 2-layer MLP Head",
    thresholdType: "Standard (0.50)",
    macroAUC: 0.7923,
    macroAP: 0.2554,
    macroPrecision: 0.1586,
    macroRecall: 0.7785,
    macroF1: 0.2518,
    microF1: 0.2707,
    specificity: 0.6426,
    fpr: 0.3574,
    totalFP: 116215,
    totalFN: 4753,
    hammingLoss: 0.3376,
    fpReductionVsM1: -13.41,
    totalParams: 35925768,
    trainableParams: 35925768,
    pureModelMsPerImage: 3.159,
    pureModelImagesPerSec: 316.60,
    trainingTimeMin: 438.60,
    epochsRun: 15,
    bestEpoch: 10,
    bestValMetric: 0.8202,
    keyRole: "Feature-level representation fusion.",
    keyMechanism: "Highest sensitivity (recall 0.7785) but massive false positive surge (+13,738 FP)."
  },
  {
    id: "M5",
    name: "Spatial Cross-Attention",
    architecture: "Multi-Head Cross-Attention Network",
    fusionStrategy: "MHA (CNN Tokens as Queries, Swin-T Tokens as Keys/Values)",
    thresholdType: "Standard (0.50)",
    macroAUC: 0.6392,
    macroAP: 0.1128,
    macroPrecision: 0.0965,
    macroRecall: 0.7099,
    macroF1: 0.1614,
    microF1: 0.1877,
    specificity: 0.4555,
    fpr: 0.5445,
    totalFP: 178853,
    totalFN: 5865,
    hammingLoss: 0.5155,
    fpReductionVsM1: -74.53,
    totalParams: 37554952,
    trainableParams: 37554952,
    pureModelMsPerImage: 3.568,
    pureModelImagesPerSec: 280.27,
    trainingTimeMin: 205.08,
    epochsRun: 7,
    bestEpoch: 2,
    bestValMetric: 0.6957,
    keyRole: "Spatial query-key attention exploration.",
    keyMechanism: "Substantial performance degradation during Stage 2 backbone unfreezing; early stopping at epoch 7."
  },
  {
    id: "M6",
    name: "Gated Cross-Attention",
    architecture: "Cross-Attention + 14 Pathology-Specific Gating Modules",
    fusionStrategy: "MHA + Sigmoid Disease Gating Channels (14 * 512-d gates)",
    thresholdType: "Standard (0.50)",
    macroAUC: 0.6455,
    macroAP: 0.1136,
    macroPrecision: 0.1016,
    macroRecall: 0.6604,
    macroF1: 0.1656,
    microF1: 0.1928,
    specificity: 0.5260,
    fpr: 0.4740,
    totalFP: 155888,
    totalFN: 7670,
    hammingLoss: 0.4564,
    fpReductionVsM1: -52.12,
    totalParams: 41233160,
    trainableParams: 41233160,
    pureModelMsPerImage: 3.490,
    pureModelImagesPerSec: 286.52,
    trainingTimeMin: 271.63,
    epochsRun: 7,
    bestEpoch: 2,
    bestValMetric: 0.7029,
    keyRole: "Conditional spatial routing across diseases.",
    keyMechanism: "Marginal recovery over M5 via gating (+0.0063 AUC), but severe underperformance relative to baselines."
  },
  {
    id: "M7",
    name: "M6 + Val-Tuned Thresholds",
    architecture: "Operating-Point Analysis of M6 Predictions",
    fusionStrategy: "Identical M6 Architecture evaluated under validation-optimized thresholds",
    thresholdType: "Validation-Tuned",
    macroAUC: 0.6455,
    macroAP: 0.1136,
    macroPrecision: 0.1147,
    macroRecall: 0.4540,
    macroF1: 0.1709,
    microF1: 0.2263,
    specificity: 0.7045,
    fpr: 0.2955,
    totalFP: 95240,
    totalFN: 11581,
    hammingLoss: 0.2981,
    fpReductionVsM1: 7.06,
    totalParams: 41233160,
    trainableParams: 41233160,
    pureModelMsPerImage: 3.490,
    pureModelImagesPerSec: 286.52,
    trainingTimeMin: 271.63,
    epochsRun: 7,
    bestEpoch: 2,
    bestValMetric: 0.7029,
    keyRole: "Operational thresholding benchmark for M6.",
    keyMechanism: "Cuts M6 FP from 155,888 to 95,240, but recall plunges to 0.4540 (FN surges to 11,581)."
  }
];

export const MODELS_VAL_TUNED_RESULTS = [
  {
    modelId: "M1",
    name: "DenseNet-121 [val-tuned]",
    macroAUC: 0.7965,
    macroAP: 0.2673,
    macroPrecision: 0.2809,
    macroRecall: 0.4431,
    macroF1: 0.3286,
    microF1: 0.3772,
    specificity: 0.8761,
    fpr: 0.1239,
    totalFP: 38409,
    hammingLoss: 0.1405,
    fpReductionVsM1Standard: 62.52
  },
  {
    modelId: "M2",
    name: "Swin-T [val-tuned]",
    macroAUC: 0.8000,
    macroAP: 0.2602,
    macroPrecision: 0.2901,
    macroRecall: 0.3966,
    macroF1: 0.3227,
    microF1: 0.3890,
    specificity: 0.9000,
    fpr: 0.1000,
    totalFP: 30940,
    hammingLoss: 0.1231,
    fpReductionVsM1Standard: 69.81
  },
  {
    modelId: "M3",
    name: "Late Fusion [val-tuned]",
    macroAUC: 0.8089,
    macroAP: 0.2776,
    macroPrecision: 0.3084,
    macroRecall: 0.4182,
    macroF1: 0.3368,
    microF1: 0.3983,
    specificity: 0.8937,
    fpr: 0.1063,
    totalFP: 32797,
    hammingLoss: 0.1258,
    fpReductionVsM1Standard: 68.00
  },
  {
    modelId: "M4",
    name: "Feature Concat [val-tuned]",
    macroAUC: 0.7923,
    macroAP: 0.2554,
    macroPrecision: 0.2808,
    macroRecall: 0.4044,
    macroF1: 0.3187,
    microF1: 0.3721,
    specificity: 0.8931,
    fpr: 0.1069,
    totalFP: 33387,
    hammingLoss: 0.1304,
    fpReductionVsM1Standard: 67.42
  },
  {
    modelId: "M5",
    name: "Cross-Attention [val-tuned]",
    macroAUC: 0.6392,
    macroAP: 0.1128,
    macroPrecision: 0.1136,
    macroRecall: 0.4591,
    macroF1: 0.1725,
    microF1: 0.2258,
    specificity: 0.6883,
    fpr: 0.3117,
    totalFP: 100316,
    hammingLoss: 0.3106,
    fpReductionVsM1Standard: 2.11
  },
  {
    modelId: "M6 / M7",
    name: "Cross-Attn + Gating (M7)",
    macroAUC: 0.6455,
    macroAP: 0.1136,
    macroPrecision: 0.1147,
    macroRecall: 0.4540,
    macroF1: 0.1709,
    microF1: 0.2263,
    specificity: 0.7045,
    fpr: 0.2955,
    totalFP: 95240,
    hammingLoss: 0.2981,
    fpReductionVsM1Standard: 7.06
  }
];

export const BOOTSTRAP_PRIMARY_RESULTS: BootstrapResult[] = [
  {
    metric: "Macro AUROC",
    isPrimaryFamily: true,
    m1Point: 0.7965,
    m3Point: 0.8089,
    pointDiff: 0.012427,
    clusterSE: 0.001077,
    ciLowerPercentile: 0.010413,
    ciUpperPercentile: 0.014699,
    ciLowerNormal: 0.010317,
    ciUpperNormal: 0.014537,
    clusterZ: 11.54,
    waldP: "< 10^-20",
    shiftedBootstrapP: "< 0.001",
    holmAdjustedP: "< 0.0001",
    significant: true,
    notes: "Primary endpoint: statistically significant improvement across patient clusters."
  },
  {
    metric: "Macro Average Precision (AP)",
    isPrimaryFamily: true,
    m1Point: 0.2673,
    m3Point: 0.2776,
    pointDiff: 0.010344,
    clusterSE: 0.001993,
    ciLowerPercentile: 0.006565,
    ciUpperPercentile: 0.014361,
    ciLowerNormal: 0.006439,
    ciUpperNormal: 0.014250,
    clusterZ: 5.19,
    waldP: "2.09 x 10^-7",
    shiftedBootstrapP: "< 0.001",
    holmAdjustedP: "4.17 x 10^-7",
    significant: true,
    notes: "Primary endpoint: positive predictive value gain under heavy class skew."
  },
  {
    metric: "Macro F1 (τ = 0.50)",
    isPrimaryFamily: true,
    m1Point: 0.2755,
    m3Point: 0.2828,
    pointDiff: 0.007304,
    clusterSE: 0.002091,
    ciLowerPercentile: 0.003038,
    ciUpperPercentile: 0.011240,
    ciLowerNormal: 0.003206,
    ciUpperNormal: 0.011402,
    clusterZ: 3.49,
    waldP: "0.000477",
    shiftedBootstrapP: "0.0010",
    holmAdjustedP: "0.000477",
    significant: true,
    notes: "Primary endpoint: harmonized sensitivity-precision gain at standard operating threshold."
  },
  {
    metric: "Total False Positives (FP)",
    isPrimaryFamily: true,
    m1Point: 102477,
    m3Point: 96613,
    pointDiff: -5864,
    clusterSE: 392.28,
    ciLowerPercentile: -6648.1,
    ciUpperPercentile: -5130.8,
    ciLowerNormal: -6632.8,
    ciUpperNormal: -5095.2,
    clusterZ: -14.95,
    waldP: "< 10^-40",
    shiftedBootstrapP: "< 0.001",
    holmAdjustedP: "< 0.0001",
    significant: true,
    notes: "Primary endpoint: 5.72% reduction in false alarms across 358,344 diagnostic decisions."
  },
  {
    metric: "Relative FP Reduction (%)",
    isPrimaryFamily: false,
    m1Point: 0.0,
    m3Point: 5.72,
    pointDiff: 5.722,
    clusterSE: 0.346,
    ciLowerPercentile: 5.105,
    ciUpperPercentile: 6.407,
    ciLowerNormal: 5.045,
    ciUpperNormal: 6.400,
    clusterZ: 16.55,
    waldP: "< 10^-40",
    shiftedBootstrapP: "< 0.001",
    significant: true,
    notes: "Secondary evaluation metric."
  },
  {
    metric: "Micro F1",
    isPrimaryFamily: false,
    m1Point: 0.2937,
    m3Point: 0.3042,
    pointDiff: 0.010498,
    clusterSE: 0.000765,
    ciLowerPercentile: 0.009011,
    ciUpperPercentile: 0.012008,
    ciLowerNormal: 0.008999,
    ciUpperNormal: 0.011997,
    clusterZ: 13.72,
    waldP: "< 10^-35",
    shiftedBootstrapP: "< 0.001",
    significant: true,
    notes: "Secondary evaluation metric."
  },
  {
    metric: "Specificity",
    isPrimaryFamily: false,
    m1Point: 0.6805,
    m3Point: 0.6996,
    pointDiff: 0.019086,
    clusterSE: 0.001087,
    ciLowerPercentile: 0.017038,
    ciUpperPercentile: 0.021294,
    ciLowerNormal: 0.016955,
    ciUpperNormal: 0.021218,
    clusterZ: 17.55,
    waldP: "< 10^-40",
    shiftedBootstrapP: "< 0.001",
    significant: true,
    notes: "Secondary evaluation metric: +1.91% absolute gain in true negative rate."
  },
  {
    metric: "False Positive Rate (FPR)",
    isPrimaryFamily: false,
    m1Point: 0.3195,
    m3Point: 0.3004,
    pointDiff: -0.019086,
    clusterSE: 0.001087,
    ciLowerPercentile: -0.021294,
    ciUpperPercentile: -0.017038,
    ciLowerNormal: -0.021218,
    ciUpperNormal: -0.016955,
    clusterZ: -17.55,
    waldP: "< 10^-40",
    shiftedBootstrapP: "< 0.001",
    significant: true,
    notes: "Secondary evaluation metric."
  },
  {
    metric: "Macro Precision",
    isPrimaryFamily: false,
    m1Point: 0.1844,
    m3Point: 0.1884,
    pointDiff: 0.003989,
    clusterSE: 0.003043,
    ciLowerPercentile: -0.002208,
    ciUpperPercentile: 0.009742,
    ciLowerNormal: -0.001975,
    ciUpperNormal: 0.009952,
    clusterZ: 1.31,
    waldP: "0.1899",
    shiftedBootstrapP: "0.1874",
    significant: false,
    notes: "Secondary metric: positive point gain does not reach statistical significance."
  },
  {
    metric: "Macro Recall",
    isPrimaryFamily: false,
    m1Point: 0.7359,
    m3Point: 0.7418,
    pointDiff: 0.005933,
    clusterSE: 0.003139,
    ciLowerPercentile: -0.000389,
    ciUpperPercentile: 0.011865,
    ciLowerNormal: -0.000220,
    ciUpperNormal: 0.012086,
    clusterZ: 1.89,
    waldP: "0.0588",
    shiftedBootstrapP: "0.0585",
    significant: false,
    notes: "Secondary metric: modest gain in sensitivity remains borderline non-significant."
  },
  {
    metric: "Total False Negatives (FN)",
    isPrimaryFamily: false,
    m1Point: 4881,
    m3Point: 4992,
    pointDiff: 111,
    clusterSE: 55.75,
    ciLowerPercentile: -1.0,
    ciUpperPercentile: 217.0,
    ciLowerNormal: 1.73,
    ciUpperNormal: 220.27,
    clusterZ: 1.991,
    waldP: "0.0465",
    shiftedBootstrapP: "0.0445",
    significant: false,
    notes: "Dual-inference finding: Wald test p=0.0465 (narrowly excludes zero), but bootstrap percentile CI [-1, +217] spans zero (tail p=0.0535). Under multiplicity control (p_adj >= 0.093), non-significant. Inconclusive & method-dependent."
  },
  {
    metric: "Relative FN Change (%)",
    isPrimaryFamily: false,
    m1Point: 0.0,
    m3Point: 2.27,
    pointDiff: 2.274,
    clusterSE: 1.156,
    ciLowerPercentile: -0.021,
    ciUpperPercentile: 4.456,
    ciLowerNormal: 0.009,
    ciUpperNormal: 4.539,
    clusterZ: 1.968,
    waldP: "0.0491",
    shiftedBootstrapP: "0.0465",
    significant: false,
    notes: "Secondary exploratory error metric: 95% bootstrap percentile CI spans zero [-0.02%, +4.46%]."
  }
];

export const PER_DISEASE_METRICS: DiseaseMetric[] = [
  {
    disease: "Atelectasis",
    supportPositives: 3279,
    negatives: 22317,
    prevalencePct: 12.81,
    m1AUC: 0.7481,
    m2AUC: 0.7556,
    m3AUC: 0.7610,
    m4AUC: 0.7458,
    m5AUC: 0.5914,
    m6AUC: 0.6038,
    m7AUC: 0.6038,
    m1F1: 0.3290,
    m2F1: 0.3388,
    m3F1: 0.3404,
    m4F1: 0.3280,
    m5F1: 0.2538,
    m6F1: 0.2581,
    m7F1: 0.2581,
    m1FP: 9963,
    m3FP: 9560,
    fpDiff: -403,
    fpReductionPct: 4.04,
    m1FN: 672,
    m3FN: 646,
    fnDiff: -26,
    aurocDiff: 0.0129,
    aurocClusterSE: 0.00179,
    aurocCiLower: 0.0095,
    aurocCiUpper: 0.0164,
    aurocWaldP: 6.49e-13,
    aurocHolmP: 8.43e-12,
    aurocSignificant: true,
    m7TunedThreshold: 0.50
  },
  {
    disease: "Cardiomegaly",
    supportPositives: 1069,
    negatives: 24527,
    prevalencePct: 4.18,
    m1AUC: 0.8881,
    m2AUC: 0.8808,
    m3AUC: 0.8942,
    m4AUC: 0.8853,
    m5AUC: 0.5025,
    m6AUC: 0.5282,
    m7AUC: 0.5282,
    m1F1: 0.3032,
    m2F1: 0.2612,
    m3F1: 0.3000,
    m4F1: 0.3021,
    m5F1: 0.0793,
    m6F1: 0.0857,
    m7F1: 0.0866,
    m1FP: 3391,
    m3FP: 3577,
    fpDiff: 186,
    fpReductionPct: -5.49,
    m1FN: 272,
    m3FN: 249,
    fnDiff: -23,
    aurocDiff: 0.0060,
    aurocClusterSE: 0.00229,
    aurocCiLower: 0.0017,
    aurocCiUpper: 0.0108,
    aurocWaldP: 0.00826,
    aurocHolmP: 0.0165,
    aurocSignificant: true,
    m7TunedThreshold: 0.36
  },
  {
    disease: "Effusion",
    supportPositives: 4658,
    negatives: 20938,
    prevalencePct: 18.20,
    m1AUC: 0.8136,
    m2AUC: 0.8134,
    m3AUC: 0.8216,
    m4AUC: 0.8083,
    m5AUC: 0.6650,
    m6AUC: 0.6764,
    m7AUC: 0.6764,
    m1F1: 0.4345,
    m2F1: 0.4519,
    m3F1: 0.4473,
    m4F1: 0.4464,
    m5F1: 0.3803,
    m6F1: 0.3900,
    m7F1: 0.3891,
    m1FP: 10803,
    m3FP: 10204,
    fpDiff: -599,
    fpReductionPct: 5.54,
    m1FN: 367,
    m3FN: 377,
    fnDiff: 10,
    aurocDiff: 0.0080,
    aurocClusterSE: 0.00151,
    aurocCiLower: 0.0051,
    aurocCiUpper: 0.0110,
    aurocWaldP: 1.11e-7,
    aurocHolmP: 1.11e-6,
    aurocSignificant: true,
    m7TunedThreshold: 0.54
  },
  {
    disease: "Infiltration",
    supportPositives: 6112,
    negatives: 19484,
    prevalencePct: 23.88,
    m1AUC: 0.6882,
    m2AUC: 0.7038,
    m3AUC: 0.7054,
    m4AUC: 0.6923,
    m5AUC: 0.6462,
    m6AUC: 0.6481,
    m7AUC: 0.6481,
    m1F1: 0.4382,
    m2F1: 0.4679,
    m3F1: 0.4575,
    m4F1: 0.4620,
    m5F1: 0.4287,
    m6F1: 0.4314,
    m7F1: 0.4311,
    m1FP: 12376,
    m3FP: 10787,
    fpDiff: -1589,
    fpReductionPct: 12.84,
    m1FN: 925,
    m3FN: 1100,
    fnDiff: 175,
    aurocDiff: 0.0172,
    aurocClusterSE: 0.00163,
    aurocCiLower: 0.0142,
    aurocCiUpper: 0.0206,
    aurocWaldP: 0.0,
    aurocHolmP: 0.0,
    aurocSignificant: true,
    m7TunedThreshold: 0.49
  },
  {
    disease: "Mass",
    supportPositives: 1748,
    negatives: 23848,
    prevalencePct: 6.83,
    m1AUC: 0.8044,
    m2AUC: 0.8092,
    m3AUC: 0.8169,
    m4AUC: 0.7801,
    m5AUC: 0.5673,
    m6AUC: 0.5750,
    m7AUC: 0.5750,
    m1F1: 0.2266,
    m2F1: 0.2301,
    m3F1: 0.2317,
    m4F1: 0.2157,
    m5F1: 0.1381,
    m6F1: 0.1441,
    m7F1: 0.1483,
    m1FP: 9656,
    m3FP: 9408,
    fpDiff: -248,
    fpReductionPct: 2.57,
    m1FN: 291,
    m3FN: 286,
    fnDiff: -5,
    aurocDiff: 0.0125,
    aurocClusterSE: 0.00256,
    aurocCiLower: 0.0075,
    aurocCiUpper: 0.0176,
    aurocWaldP: 1.06e-6,
    aurocHolmP: 7.41e-6,
    aurocSignificant: true,
    m7TunedThreshold: 0.62
  },
  {
    disease: "Nodule",
    supportPositives: 1623,
    negatives: 23973,
    prevalencePct: 6.34,
    m1AUC: 0.7348,
    m2AUC: 0.7328,
    m3AUC: 0.7458,
    m4AUC: 0.7009,
    m5AUC: 0.5329,
    m6AUC: 0.5576,
    m7AUC: 0.5576,
    m1F1: 0.1864,
    m2F1: 0.1966,
    m3F1: 0.1960,
    m4F1: 0.1726,
    m5F1: 0.1172,
    m6F1: 0.1303,
    m7F1: 0.1303,
    m1FP: 10372,
    m3FP: 9318,
    fpDiff: -1054,
    fpReductionPct: 10.16,
    m1FN: 390,
    m3FN: 434,
    fnDiff: 44,
    aurocDiff: 0.0110,
    aurocClusterSE: 0.00273,
    aurocCiLower: 0.0057,
    aurocCiUpper: 0.0165,
    aurocWaldP: 6.00e-5,
    aurocHolmP: 3.00e-4,
    aurocSignificant: true,
    m7TunedThreshold: 0.50
  },
  {
    disease: "Pneumonia",
    supportPositives: 555,
    negatives: 25041,
    prevalencePct: 2.17,
    m1AUC: 0.6759,
    m2AUC: 0.7071,
    m3AUC: 0.7066,
    m4AUC: 0.6885,
    m5AUC: 0.5933,
    m6AUC: 0.6024,
    m7AUC: 0.6024,
    m1F1: 0.0758,
    m2F1: 0.0861,
    m3F1: 0.0850,
    m4F1: 0.0692,
    m5F1: 0.0476,
    m6F1: 0.0524,
    m7F1: 0.0452,
    m1FP: 5997,
    m3FP: 5621,
    fpDiff: -376,
    fpReductionPct: 6.27,
    m1FN: 297,
    m3FN: 281,
    fnDiff: -16,
    aurocDiff: 0.0306,
    aurocClusterSE: 0.00538,
    aurocCiLower: 0.0207,
    aurocCiUpper: 0.0407,
    aurocWaldP: 1.19e-8,
    aurocHolmP: 1.31e-7,
    aurocSignificant: true,
    m7TunedThreshold: 0.79
  },
  {
    disease: "Pneumothorax",
    supportPositives: 2665,
    negatives: 22931,
    prevalencePct: 10.41,
    m1AUC: 0.8537,
    m2AUC: 0.8609,
    m3AUC: 0.8673,
    m4AUC: 0.8657,
    m5AUC: 0.6962,
    m6AUC: 0.6701,
    m7AUC: 0.6701,
    m1F1: 0.3886,
    m2F1: 0.4285,
    m3F1: 0.4285,
    m4F1: 0.3562,
    m5F1: 0.2444,
    m6F1: 0.2352,
    m7F1: 0.2738,
    m1FP: 6765,
    m3FP: 5463,
    fpDiff: -1302,
    fpReductionPct: 19.25,
    m1FN: 391,
    m3FN: 449,
    fnDiff: 58,
    aurocDiff: 0.0136,
    aurocClusterSE: 0.00262,
    aurocCiLower: 0.0086,
    aurocCiUpper: 0.0190,
    aurocWaldP: 1.99e-7,
    aurocHolmP: 1.79e-6,
    aurocSignificant: true,
    m7TunedThreshold: 0.69
  },
  {
    disease: "Consolidation",
    supportPositives: 1815,
    negatives: 23781,
    prevalencePct: 7.09,
    m1AUC: 0.7371,
    m2AUC: 0.7501,
    m3AUC: 0.7515,
    m4AUC: 0.7308,
    m5AUC: 0.6733,
    m6AUC: 0.6643,
    m7AUC: 0.6643,
    m1F1: 0.1923,
    m2F1: 0.2035,
    m3F1: 0.1995,
    m4F1: 0.1889,
    m5F1: 0.1685,
    m6F1: 0.1766,
    m7F1: 0.1922,
    m1FP: 13538,
    m3FP: 12789,
    fpDiff: -749,
    fpReductionPct: 5.53,
    m1FN: 182,
    m3FN: 197,
    fnDiff: 15,
    aurocDiff: 0.0144,
    aurocClusterSE: 0.00232,
    aurocCiLower: 0.0101,
    aurocCiUpper: 0.0190,
    aurocWaldP: 5.02e-10,
    aurocHolmP: 6.02e-9,
    aurocSignificant: true,
    m7TunedThreshold: 0.64
  },
  {
    disease: "Edema",
    supportPositives: 925,
    negatives: 24671,
    prevalencePct: 3.61,
    m1AUC: 0.8376,
    m2AUC: 0.8434,
    m3AUC: 0.8480,
    m4AUC: 0.8325,
    m5AUC: 0.7333,
    m6AUC: 0.7424,
    m7AUC: 0.7424,
    m1F1: 0.1602,
    m2F1: 0.1761,
    m3F1: 0.1715,
    m4F1: 0.1691,
    m5F1: 0.1122,
    m6F1: 0.1162,
    m7F1: 0.1032,
    m1FP: 8226,
    m3FP: 7434,
    fpDiff: -792,
    fpReductionPct: 9.63,
    m1FN: 128,
    m3FN: 141,
    fnDiff: 13,
    aurocDiff: 0.0103,
    aurocClusterSE: 0.00220,
    aurocCiLower: 0.0062,
    aurocCiUpper: 0.0147,
    aurocWaldP: 2.53e-6,
    aurocHolmP: 1.52e-5,
    aurocSignificant: true,
    m7TunedThreshold: 0.81
  },
  {
    disease: "Emphysema",
    supportPositives: 1093,
    negatives: 24503,
    prevalencePct: 4.27,
    m1AUC: 0.8975,
    m2AUC: 0.8963,
    m3AUC: 0.9085,
    m4AUC: 0.9003,
    m5AUC: 0.6516,
    m6AUC: 0.6226,
    m7AUC: 0.6226,
    m1F1: 0.3213,
    m2F1: 0.3382,
    m3F1: 0.3506,
    m4F1: 0.2665,
    m5F1: 0.0984,
    m6F1: 0.1005,
    m7F1: 0.1058,
    m1FP: 3248,
    m3FP: 2873,
    fpDiff: -375,
    fpReductionPct: 11.55,
    m1FN: 262,
    m3FN: 250,
    fnDiff: -12,
    aurocDiff: 0.0109,
    aurocClusterSE: 0.00216,
    aurocCiLower: 0.0068,
    aurocCiUpper: 0.0152,
    aurocWaldP: 4.41e-7,
    aurocHolmP: 3.53e-6,
    aurocSignificant: true,
    m7TunedThreshold: 0.73
  },
  {
    disease: "Fibrosis",
    supportPositives: 435,
    negatives: 25161,
    prevalencePct: 1.70,
    m1AUC: 0.8103,
    m2AUC: 0.8150,
    m3AUC: 0.8261,
    m4AUC: 0.8060,
    m5AUC: 0.7085,
    m6AUC: 0.7219,
    m7AUC: 0.7219,
    m1F1: 0.1430,
    m2F1: 0.1263,
    m3F1: 0.1488,
    m4F1: 0.0883,
    m5F1: 0.0649,
    m6F1: 0.0682,
    m7F1: 0.0678,
    m1FP: 2202,
    m3FP: 2426,
    fpDiff: 224,
    fpReductionPct: -10.17,
    m1FN: 232,
    m3FN: 205,
    fnDiff: -27,
    aurocDiff: 0.0157,
    aurocClusterSE: 0.00548,
    aurocCiLower: 0.0053,
    aurocCiUpper: 0.0272,
    aurocWaldP: 0.00416,
    aurocHolmP: 0.0125,
    aurocSignificant: true,
    m7TunedThreshold: 0.68
  },
  {
    disease: "Pleural Thickening",
    supportPositives: 1143,
    negatives: 24453,
    prevalencePct: 4.47,
    m1AUC: 0.7636,
    m2AUC: 0.7670,
    m3AUC: 0.7750,
    m4AUC: 0.7516,
    m5AUC: 0.6506,
    m6AUC: 0.6569,
    m7AUC: 0.6569,
    m1F1: 0.1849,
    m2F1: 0.1592,
    m3F1: 0.1799,
    m4F1: 0.1382,
    m5F1: 0.1256,
    m6F1: 0.1300,
    m7F1: 0.1420,
    m1FP: 5897,
    m3FP: 7101,
    fpDiff: 1204,
    fpReductionPct: -20.42,
    m1FN: 426,
    m3FN: 328,
    fnDiff: -98,
    aurocDiff: 0.0115,
    aurocClusterSE: 0.00306,
    aurocCiLower: 0.0056,
    aurocCiUpper: 0.0176,
    aurocWaldP: 0.00017,
    aurocHolmP: 0.00069,
    aurocSignificant: true,
    m7TunedThreshold: 0.65
  },
  {
    disease: "Hernia",
    supportPositives: 86,
    negatives: 25510,
    prevalencePct: 0.34,
    m1AUC: 0.8981,
    m2AUC: 0.8644,
    m3AUC: 0.8973,
    m4AUC: 0.9035,
    m5AUC: 0.7366,
    m6AUC: 0.7674,
    m7AUC: 0.7674,
    m1F1: 0.4734,
    m2F1: 0.1693,
    m3F1: 0.4229,
    m4F1: 0.3218,
    m5F1: 0.0000,
    m6F1: 0.0000,
    m7F1: 0.0186,
    m1FP: 43,
    m3FP: 52,
    fpDiff: 9,
    fpReductionPct: -20.93,
    m1FN: 46,
    m3FN: 49,
    fnDiff: 3,
    aurocDiff: -0.0008,
    aurocClusterSE: 0.00960,
    aurocCiLower: -0.0167,
    aurocCiUpper: 0.0206,
    aurocWaldP: 0.9355,
    aurocHolmP: 0.9355,
    aurocSignificant: false,
    m7TunedThreshold: 0.11
  }
];

export const ALPHA_SWEEP_DATA: AlphaSweepPoint[] = [
  { alpha: 0.0, valMacroAUC: 0.8264, valMacroAP: 0.2287 },
  { alpha: 0.05, valMacroAUC: 0.8292, valMacroAP: 0.2377 },
  { alpha: 0.1, valMacroAUC: 0.8311, valMacroAP: 0.2396 },
  { alpha: 0.15, valMacroAUC: 0.8326, valMacroAP: 0.2413 },
  { alpha: 0.2, valMacroAUC: 0.8338, valMacroAP: 0.2429 },
  { alpha: 0.25, valMacroAUC: 0.8348, valMacroAP: 0.2441 },
  { alpha: 0.3, valMacroAUC: 0.8356, valMacroAP: 0.2448 },
  { alpha: 0.35, valMacroAUC: 0.8363, valMacroAP: 0.2466 },
  { alpha: 0.4, valMacroAUC: 0.8367, valMacroAP: 0.2472 },
  { alpha: 0.45, valMacroAUC: 0.8371, valMacroAP: 0.2476 },
  { alpha: 0.5, valMacroAUC: 0.83724, valMacroAP: 0.24793 },
  { alpha: 0.55, valMacroAUC: 0.83724, valMacroAP: 0.24808 },
  { alpha: 0.6, valMacroAUC: 0.83708, valMacroAP: 0.24829 },
  { alpha: 0.65, valMacroAUC: 0.83674, valMacroAP: 0.24759 },
  { alpha: 0.7, valMacroAUC: 0.83625, valMacroAP: 0.24700 },
  { alpha: 0.75, valMacroAUC: 0.83557, valMacroAP: 0.24594 },
  { alpha: 0.8, valMacroAUC: 0.83471, valMacroAP: 0.24503 },
  { alpha: 0.85, valMacroAUC: 0.83362, valMacroAP: 0.24354 },
  { alpha: 0.9, valMacroAUC: 0.83228, valMacroAP: 0.24176 },
  { alpha: 0.95, valMacroAUC: 0.83062, valMacroAP: 0.23948 },
  { alpha: 1.0, valMacroAUC: 0.8285, valMacroAP: 0.23617 }
];

export const RESEARCH_FIGURES = [
  {
    id: "roc-macro",
    title: "Macro ROC Curves Comparison (M1–M6)",
    filename: "assets/ROC_macro_comparison.png",
    caption: "Test-set Receiver Operating Characteristic (ROC) curves comparison across models M1–M6 on the 25,596 test radiographs. Demonstrates M3's persistent true positive rate advantage across the clinical low-FPR regime (0.0 to 0.3 FPR).",
    category: "Ranking & Curves"
  },
  {
    id: "pr-macro",
    title: "Macro Precision-Recall Curves Comparison (M1–M6)",
    filename: "assets/PR_macro_comparison.png",
    caption: "Macro-averaged Precision-Recall (PR) curves across models M1–M6 on NIH ChestX-ray14. Illustrates the distinct tiering between competent models (M1, M2, M3, M4) and degraded cross-attention models (M5, M6).",
    category: "Ranking & Curves"
  },
  {
    id: "m3-alpha-sweep",
    title: "M3 Validation Fusion Weight (α) Sweep",
    filename: "assets/m3_alpha_sweep.png",
    caption: "Validation macro-AUROC and macro-AP across linear interpolation weight α ∈ [0.00, 1.00] for Late Probability Fusion (M3). A validation sweep identified a shallow optimum around α = 0.55–0.60 (val AUROC = 0.8376); α = 0.50 (val AUROC = 0.8375) was retained for test evaluation. Pure Swin-T is α=0.00 (0.8231) and pure DenseNet-121 is α=1.00 (0.8295).",
    category: "Model Design"
  },
  {
    id: "cross-attention-overlay",
    title: "Spatial Cross-Attention Weight Overlay",
    filename: "assets/cross_attention_overlay.png",
    caption: "Qualitative cross-attention overlay visualizing spatial query attention weights computed between DenseNet-121 convolutional tokens and Swin-T transformer tokens across pulmonary zones.",
    category: "Model Design"
  },
  {
    id: "fp-total",
    title: "Total False Positives by Model",
    filename: "assets/FP_total_by_model.png",
    caption: "Total test-set false positives across all 14 conditions under standard threshold (τ = 0.50) and validation-tuned thresholds (M7).",
    category: "Error Analysis"
  },
  {
    id: "fp-reduction-vs-m1",
    title: "Percentage False Positive Reduction vs. M1 Baseline",
    filename: "assets/FP_reduction_vs_M1.png",
    caption: "Percentage reduction in diagnostic false-positive errors relative to the DenseNet-121 baseline: M3 achieves +5.72% reduction (-5,864 FP), M2 achieves +6.58% reduction (-6,747 FP), while M4 surges FP by -13.41% (+13,738 FP).",
    category: "Error Analysis"
  },
  {
    id: "fp-heatmap",
    title: "Absolute False Positive Heatmap by Disease",
    filename: "assets/FP_heatmap.png",
    caption: "Heatmap of absolute false positive counts across all 14 thoracic disease categories and all evaluated candidate models.",
    category: "Error Analysis"
  },
  {
    id: "fp-reduction-heatmap",
    title: "Per-Disease Relative FP Reduction Heatmap vs. M1",
    filename: "assets/FP_reduction_heatmap_vs_M1.png",
    caption: "Per-disease percentage change in false positives relative to M1. For M3, false positives decrease in 10 of 14 categories (up to 19.25% in Pneumothorax).",
    category: "Error Analysis"
  },
  {
    id: "fp-fn-comparison",
    title: "Diagnostic FP vs. FN Trade-off Across Models",
    filename: "assets/fp_fn_comparison.png",
    caption: "Direct comparison of False Positives and False Negatives, demonstrating the critical operational trade-off: late fusion cuts false positives with an inconclusive +111 FN increase, while M2 incurs +833 FN and M4 increases FP by +13,738.",
    category: "Error Analysis"
  },
  {
    id: "roc-per-class",
    title: "Per-Class ROC Curves for All 14 Pathologies",
    filename: "assets/ROC_per_class_all_models.png",
    caption: "Full 14-disease breakdown of Receiver Operating Characteristic curves across all models (M1–M6) on the 25,596 test radiographs.",
    category: "Per-Disease Analysis"
  },
  {
    id: "pr-per-class",
    title: "Per-Class PR Curves for All 14 Pathologies",
    filename: "assets/PR_per_class_all_models.png",
    caption: "Full 14-disease breakdown of Precision-Recall curves across all candidate architectures on the 25,596 test radiographs.",
    category: "Per-Disease Analysis"
  },
  {
    id: "per-disease-differences",
    title: "Per-Disease Statistical Performance Differences (M3 vs. M1)",
    filename: "assets/per_disease_differences.png",
    caption: "Per-disease point differences and 95% confidence intervals for AUROC, Average Precision, F1 score, and False Positives between M3 and M1.",
    category: "Statistical Evaluation"
  },
  {
    id: "bootstrap-confidence-intervals",
    title: "Patient-Cluster Bootstrap 95% Confidence Intervals",
    filename: "assets/bootstrap_confidence_intervals.png",
    caption: "Empirical paired sampling distributions and 95% cluster percentile confidence intervals across B = 2,000 resamples for core primary endpoints.",
    category: "Statistical Evaluation"
  },
  {
    id: "statistical-effect-sizes",
    title: "Statistical Effect Sizes and Standardized z-Scores",
    filename: "assets/statistical_effect_sizes.png",
    caption: "Cluster-robust standardized z-statistics across macro metrics, illustrating strong significance for AUROC (z=11.54) and Total FP (z=-14.95).",
    category: "Statistical Evaluation"
  },
  {
    id: "thresholds-per-disease",
    title: "Validation-Optimized Classification Thresholds per Disease",
    filename: "assets/thresholds_per_disease.png",
    caption: "Disease-specific decision thresholds τ_c^* optimized on validation set to maximize F1 score, ranging from 0.11 (Hernia) to 0.81 (Edema).",
    category: "Operating Points"
  },
  {
    id: "confusion-2x2-m7",
    title: "Diagnostic 2x2 Confusion Matrices for M7",
    filename: "assets/confusion_2x2_M7.png",
    caption: "Diagnostic 2x2 confusion matrices (TP, FP, TN, FN) across all 14 conditions for M7 under validation-optimized operating points.",
    category: "Operating Points"
  },
  {
    id: "training-curves",
    title: "Validation Macro AUROC Training Trajectories",
    filename: "assets/training_val_auc_comparison.png",
    caption: "Validation macro AUROC across training epochs for M1, M2, M4, M5, and M6. Highlights the severe degradation of M5 and M6 at epoch 3 when backbones were unfrozen for end-to-end fine-tuning under the evaluated protocol.",
    category: "Training Dynamics"
  }
];
