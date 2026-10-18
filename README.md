# Professional Research Documentation Portal
## Multi-Label Chest X-ray Classification: CNNs, Swin Transformers, and Hybrid Error Dynamics

An interactive, peer-review-grade documentation and presentation web portal for the empirical study:
**"Architectural Integration Strategies and Diagnostic Error Dynamics in Multi-Label Chest X-ray Classification: A Comparative Empirical Study of CNNs, Swin Transformers, and Hybrid Models"**

Evaluated on the benchmark **NIH ChestX-ray14** dataset ($112,120$ frontal chest radiographs from $30,805$ unique patients) under verified zero-leakage patient-level partitioning ($73,917$ train, $12,607$ validation, and $25,596$ test images).

---

### Core Portal Features
- **Executive Overview:** Technically rigorous abstract, clinical problem motivation, and summary of primary findings.
- **Methodology & Pipeline:** Interactive 6-stage experimental pipeline diagram, positive-weighted BCE loss formulation, two-stage training schedule, and validation threshold tuning.
- **Architectures (M1–M7):** Comprehensive analysis of DenseNet-121, Swin Transformer-Tiny, decision-level Late Probability Fusion ($\alpha = 0.50$), Feature Concatenation, Spatial Cross-Attention, Gated Cross-Attention, and operating-point thresholding (M7).
- **Experimental Results:** Multi-metric benchmark tables across all 7 configurations, like-for-like threshold tuning, and 14-disease breakdown.
- **Statistical Analysis:** $B = 2,000$ patient-cluster paired bootstrap inference, cluster-robust Wald tests, Holm–Bonferroni multiplicity control, and dual-inference false-negative analysis.
- **Scientific Discussion:** Answers to the 7 core research questions, post-mortem failure analysis of cross-attention instability, and formal study limitations.
- **Publication Figures:** High-resolution catalog of all 17 publication figures with interactive modal inspection and download.
- **Reproducibility:** One-click copyable reproduction commands, dependency specifications, dataset acquisition guidelines, and BibTeX citation export.

---

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build production bundle:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

---

### Deployment to GitHub Pages

#### Option A: Automatic Deployment via GitHub Actions (Recommended)
1. Create a new public repository on GitHub named `chest-xray-research-portal`.
2. Push this directory to the repository:
   ```bash
   git remote add origin https://github.com/vrMithun/chest-xray-research-portal.git
   git branch -M main
   git push -u origin main
   ```
3. In the GitHub repository settings:
   - Navigate to **Settings > Pages**.
   - Under **Build and deployment > Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish the site to:
   `https://vrmithun.github.io/chest-xray-research-portal/`

#### Option B: Deploy Pre-built `dist/` Directory to `gh-pages` Branch
1. Build the production site:
   ```bash
   npm run build
   ```
2. Deploy the `dist` directory to the `gh-pages` branch using `gh-pages` npm utility or git subtree push:
   ```bash
   npx gh-pages -d dist
   ```

---

### Research Links
- **Primary Research Repository:** [https://github.com/vrMithun/chest-xray-multilabel-classification](https://github.com/vrMithun/chest-xray-multilabel-classification)
- **Authoritative Publication Manuscript (31 Pages):** `public/paper.pdf`
