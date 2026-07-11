# Tensor Lab

> The world's most comprehensive, visual, and interactive learning platform for **Tensor Decomposition**.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

[**Live Demo →**](https://tensor-lab.vercel.app) · [Report Bug](https://github.com/haotong-Duan/tensor-lab/issues) · [Request Feature](https://github.com/haotong-Duan/tensor-lab/issues)

---

![Tensor Lab](https://img.shields.io/badge/Status-Active-success) ![Visitors](https://img.shields.io/badge/Visitors-Welcome-blueviolet)

## ✨ Philosophy

> **Learn Tensor Decomposition Visually.**

Every concept is paired with an interactive visualization, working code, and a research-grade reference. No more walls of equations — **see tensors rotate, decompose, and converge in real time.**

Designed in the spirit of **Apple Vision Pro** · **macOS Sonoma** · **Linear** · **Notion** · **Distill.pub**.

## 🎯 Features

| | |
|---|---|
| 📚 **89 pages** | 16 integrated modules covering the entire landscape |
| 🧮 **40+ decomposition methods** | CP, Tucker, TT, TR, MPS, PEPS, MERA, BTD, t-SVD, CUR, … |
| 🎨 **Glass-morphism design** | Apple-grade UI with light & dark mode |
| 🌐 **Bilingual** | Full English + 简体中文 (Chinese) support |
| ⚡ **Live playground** | Real CP-ALS in your browser with live convergence chart |
| 🧊 **Interactive 3D viewer** | Drag-to-rotate any tensor |
| 💻 **50+ runnable code examples** | NumPy, TensorLy, PyTorch, JAX, MATLAB |
| 📐 **LaTeX math rendering** | KaTeX-powered equations throughout |
| ⚡ **Next.js 14 + React 18** | Static generation, fast loads |

## 📂 What's inside

```
tensor-lab/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Homepage with hero + 3D tensor
│   │   ├── basics/                   # 12 lessons on tensor fundamentals
│   │   ├── algebra/                  # Tensor algebra
│   │   ├── decompositions/           # CP, Tucker, TT, TR, MPS, PEPS, MERA, BTD…
│   │   ├── networks/                 # DMRG, TEBD, Born machines
│   │   ├── optimization/             # ALS, SGD, Adam, HALS, Riemannian
│   │   ├── visualization/            # 6 interactive animations
│   │   ├── playground/               # Live CP-ALS in browser
│   │   ├── code/                     # Python + MATLAB examples
│   │   ├── ai/                       # AI applications (LLM, LoRA, MoE, …)
│   │   ├── quantum/                  # Quantum information
│   │   ├── applications/             # Engineering applications
│   │   ├── exercises/                # Quizzes
│   │   ├── papers/                   # Latest arXiv digest
│   │   ├── resources/                # Books, software
│   │   ├── path/[level]/             # Learning paths (beginner → research)
│   │   ├── search/                   # Global search
│   │   └── settings/                 # Theme + language
│   ├── components/
│   │   ├── ui/                       # Design system (glass, button, slider, tabs, …)
│   │   ├── visualizations/            # 3D tensor viewer, CP/Tucker/TT/TR/MPS/MERA/PEPS diagrams
│   │   ├── i18n.tsx                  # English + 中文 translation
│   │   ├── content-page.tsx          # Reusable content template
│   │   ├── sidebar.tsx               # App navigation
│   │   ├── top-bar.tsx               # Top bar
│   │   └── language-switcher.tsx     # Bilingual switcher
│   └── lib/
│       ├── navigation.ts             # Single source of truth for nav
│       └── utils.ts
├── public/
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## 🚀 Quick start

### Prerequisites

- **Node.js** ≥ 18.17
- **npm** ≥ 9 (or pnpm / yarn)

### Installation

```bash
git clone https://github.com/haotong-Duan/tensor-lab.git
cd tensor-lab
npm install
npm run dev
```

Open **http://localhost:3000** — that's it.

### Build for production

```bash
npm run build
npm start
```

## 🎓 Curriculum

### 🟢 Tensor Basics (Beginner)
- Tensor — definition, notation, multidimensional arrays
- Modes, fibers, slices
- Rank, norms, inner products
- Outer / Kronecker / Khatri-Rao / Hadamard products
- Einstein summation, matricization, tensorization

### 🟡 Decompositions (Intermediate → Advanced)
- **CP / CANDECOMP / PARAFAC** — sum of rank-1 tensors
- **Tucker / HOSVD / HOOI** — core × factor matrices
- **Tensor Train (TT)** — linear chain of 3rd-order cores
- **Tensor Ring (TR)** — cyclic train
- **MPS, PEPS, MERA, TTN** — quantum tensor networks
- **t-SVD, BTD, CUR, PARATUCK, INDSCAL, DEDICOM**
- **Bayesian, Sparse, Nonnegative, Robust PCA, Completion, Streaming**

### 🔴 AI & Quantum (Research)
- **LLM compression** with TT-format weights
- **LoRA + TT** for parameter-efficient fine-tuning
- **Diffusion models, GNN, MoE**
- **VQE, QAOA, DMRG, TEBD, Born machines**

## 🛠 Tech stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) + React 18 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3 + custom glass-morphism system |
| **Animations** | Framer Motion |
| **Math** | KaTeX |
| **Icons** | Lucide React |
| **UI primitives** | Radix UI |
| **3D tensor** | Custom React + SVG renderer |
| **i18n** | Custom module-level + React Context |
| **Sliders, Tabs** | Radix UI |

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Quick guide

1. **Fork** the repo
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Areas we'd love help with

- 🐛 Fixing bugs in the math
- 🌐 Adding more languages (we currently have EN + 简体中文)
- 📚 Adding more decomposition methods
- 🎨 Improving visualizations
- 📝 Translating content to other languages

## 📖 References

Tensor Lab references the following foundational work:

- Kolda, T. G. & Bader, B. W. (2009). **Tensor Decompositions and Applications.** *SIAM Review*, 51(3), 455-500.
- Oseledets, I. V. (2011). **Tensor-train decomposition.** *SIAM J. Sci. Comput.*, 33(5), 2295-2317.
- De Lathauwer, L., De Moor, B., & Vandewalle, J. (2000). **A Multilinear Singular Value Decomposition.** *SIAM J. Matrix Anal. Appl.*, 21(4), 1253-1278.
- Schollwöck, U. (2011). **The density-matrix renormalization group.** *Ann. Phys.*, 326(1), 96-192.
- Cichocki, A. et al. (2016). **Tensor Networks for Dimensionality Reduction and Large-scale Optimization.**
- Novikov, A. et al. (2015). **Tensorizing neural networks.** *NeurIPS*.

## 📜 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for the full text.

## 👤 Author

**Haotong Duan** · [GitHub](https://github.com/haotong-Duan) · [Email](mailto:15102633721@163.com) · [X](https://x.com/dht768279750)

## ⭐ Star history

If you find this useful, please consider starring the repository. It helps others discover the project.

---

<p align="center">
  <em>Built with care for mathematicians, engineers, and researchers.</em>
</p>
