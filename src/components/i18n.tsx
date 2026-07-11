'use client';

import * as React from 'react';

export type Locale = 'en' | 'zh';

type Dict = Record<string, string>;

// Full dictionaries (only loaded on client)
const en: Dict = {
  // Brand
  'brand.name': 'Tensor Lab',
  'brand.tagline': 'Decomposition',
  'brand.hero.title.line1': 'Learn',
  'brand.hero.title.line2': 'Tensor Decomposition',
  'brand.hero.title.line3': 'Visually',
  'brand.hero.subtitle':
    "From the mathematics of multilinear algebra to the frontiers of AI and quantum computing — explore, animate, and run real decompositions in your browser.",
  'brand.hero.badge': 'The most comprehensive tensor learning platform',
  'brand.hero.cta1': 'Start Learning',
  'brand.hero.cta2': 'Try Playground',
  'brand.hero.3d.caption': 'Drag to rotate · An interactive 3rd-order tensor',
  'brand.stats.decompositions': 'Decomposition Methods',
  'brand.stats.animations': 'Interactive Animations',
  'brand.stats.examples': 'Code Examples',
  'brand.stats.papers': 'Curated Papers',
  'brand.featured.title': 'The five families of decompositions',
  'brand.featured.subtitle':
    'Master these five structures, and you can understand the entire landscape of tensor decompositions.',
  'brand.featured.all': 'All 40+ Methods',
  'brand.featured.all.desc': 'CP, Tucker, TT, TR, BTD, t-SVD, MERA, PEPS, …',
  'brand.modules.title': 'A complete learning system',
  'brand.modules.subtitle':
    'Twelve integrated modules cover everything from the foundations of multilinear algebra to the latest AI and quantum research.',
  'brand.path.title': 'From beginner to research scientist',
  'brand.path.subtitle': 'Structured tracks that grow with you.',
  'brand.path.beginner': 'No prior knowledge',
  'brand.path.intermediate': 'Linear algebra basics',
  'brand.path.advanced': 'Optimization & ML',
  'brand.path.research': 'Frontier research',
  'brand.why.badge': 'Why Tensor Lab',
  'brand.why.title': 'A platform designed like Apple built education.',
  'brand.why.body':
    'Every concept is paired with an interactive visualization, working code, and a research-grade reference. No more walls of equations — see tensors rotate, decompose, and converge in real time.',
  'brand.why.cta': 'Begin the journey',
  'brand.why.math': 'Mathematical',
  'brand.why.math.desc': 'Rigorous LaTeX',
  'brand.why.visual': 'Visual',
  'brand.why.visual.desc': '3D animated',
  'brand.why.code': 'Code-first',
  'brand.why.code.desc': 'PyTorch · JAX',
  'brand.why.research': 'Research',
  'brand.why.research.desc': 'AI + Quantum',
  'brand.points.math': 'Interactive 3D tensor viewers',
  'brand.points.realtime': 'Run real decompositions in your browser',
  'brand.points.code': 'Code in Python, PyTorch, JAX, MATLAB',
  'brand.points.domains': 'Built for AI, quantum, and engineering',
  'brand.footer.tagline': 'Tensor Lab — Learn Tensor Decomposition Visually',
  'brand.footer.note': 'Built with care for mathematicians, engineers, and researchers.',

  // Navigation
  'nav.home': 'Home',
  'nav.search': 'Search',
  'nav.settings': 'Settings',
  'nav.search.placeholder': 'Search everything…',
  'nav.search.placeholder.short': 'Search…',
  'nav.search.placeholder.long': 'Try "tt", "tucker", "PEPS", or "VQE"…',
  'nav.search.noResults': 'No results for',
  'nav.search.browse': 'Browse by topic',
  'nav.search.openMenu': 'Open menu',

  // Module names
  'module.home': 'Home',
  'module.tensor-basics': 'Tensor Basics',
  'module.tensor-algebra': 'Tensor Algebra',
  'module.tensor-decompositions': 'Tensor Decompositions',
  'module.tensor-networks': 'Tensor Networks',
  'module.optimization': 'Optimization',
  'module.visualization': 'Visualization',
  'module.playground': 'Interactive Playground',
  'module.code': 'Code Center',
  'module.ai': 'AI Applications',
  'module.quantum': 'Quantum Information',
  'module.applications': 'Applications',
  'module.exercises': 'Exercises',
  'module.resources': 'Resources',
  'module.papers': 'Latest Papers',
  'module.search': 'Search',
  'module.settings': 'Settings',

  // Module card descriptions
  'module.desc.home': 'The world of tensors',
  'module.desc.tensor-basics': 'Foundations: tensor, mode, fiber, slice',
  'module.desc.tensor-algebra': 'Kronecker, Khatri-Rao, contraction',
  'module.desc.tensor-decompositions': 'The core of this platform',
  'module.desc.tensor-networks': 'MPS, PEPS, MERA, DMRG, TEBD',
  'module.desc.optimization': 'ALS, SGD, Adam, HALS, Riemannian',
  'module.desc.visualization': 'Interactive 3D tensor playground',
  'module.desc.playground': 'Run real decompositions in your browser',
  'module.desc.code': 'TensorLy, PyTorch, JAX, Tensor Toolbox',
  'module.desc.ai': 'LLM, Transformer, LoRA, MoE, Diffusion',
  'module.desc.quantum': 'States, circuits, entanglement, DMRG, VQE',
  'module.desc.applications': 'Image, EEG, MRI, video, recommender',
  'module.desc.exercises': 'Quizzes and problem sets',
  'module.desc.resources': 'Books, papers, lectures',
  'module.desc.papers': 'arXiv weekly digest',
  'module.desc.search': 'Search everything',
  'module.desc.settings': 'Preferences',

  // Module counts
  'module.count.lessons12': '12 lessons',
  'module.count.topics8': '8 topics',
  'module.count.methods40': '40+ methods',
  'module.count.structures15': '15 structures',
  'module.count.algorithms10': '10 algorithms',
  'module.count.animations6': '6 animations',
  'module.count.live': 'Live',
  'module.count.examples50': '50+ examples',
  'module.count.cases15': '15 cases',
  'module.count.ai10': '10+ topics',
  'module.count.quantum12': '12 topics',
  'module.count.refs500': '500+ refs',
  'module.count.hot': 'Hot',
  'module.count.new': 'New',
  'module.count.core': 'Core',

  // 404
  'notfound.title': 'The page you are looking for does not exist.',
  'notfound.home': 'Home',
  'notfound.search': 'Search',

  // Playground
  'playground.title': 'Interactive Playground',
  'playground.subtitle':
    'Run real tensor decompositions on synthetic data. Tweak the parameters, watch the loss curve, and inspect the result.',
  'playground.badge': 'Live in your browser',
  'playground.section.algorithm': 'Algorithm',
  'playground.section.parameters': 'Parameters',
  'playground.run': 'Run',
  'playground.running': 'Running…',
  'playground.pause': 'Pause',
  'playground.reset': 'Reset',
  'playground.tab.original': 'Original',
  'playground.tab.recon': 'Reconstruction',
  'playground.tab.compare': 'Side by side',
  'playground.stat.iteration': 'Iteration',
  'playground.stat.error': 'Current error',
  'playground.stat.params': 'Parameters',
  'playground.stat.compression': 'Compression',
  'playground.convergence': 'Convergence',
  'playground.convergence.empty': 'Click Run to start optimization.',
  'playground.label.tensorSize': 'Tensor size',
  'playground.label.rank': 'Rank R',
  'playground.label.noise': 'Noise σ',
  'playground.label.maxIter': 'Max iter',
  'playground.recon.empty': 'Run the algorithm to see the reconstruction.',

  // Common
  'common.readMore': 'Read more',
  'common.open': 'Open',
  'common.browse': 'Browse examples',
  'common.explore': 'Explore',
  'common.previous': 'Previous',
  'common.next': 'Next',
  'common.readingTime': 'read',
  'common.minutes': 'min',
  'common.copy': 'Copy',
  'common.copied': 'Copied!',
  'common.placeholder': '—',

  // Levels
  'level.beginner': 'Beginner',
  'level.intermediate': 'Intermediate',
  'level.advanced': 'Advanced',
  'level.research': 'Research',
  'level.all': 'All',

  // Settings
  'settings.title': 'Settings',
  'settings.subtitle': 'Personalize your experience',
  'settings.appearance': 'Appearance',
  'settings.theme': 'Theme',
  'settings.theme.desc': 'Toggle between light and dark mode',
  'settings.language': 'Language',
  'settings.language.desc': 'Choose your preferred language',
  'settings.about': 'About',
  'settings.version': 'Version',
  'settings.builtWith': 'Built with',
  'settings.license': 'License',

  // Contact / author
  'author.github': 'GitHub',
  'author.x': 'X (Twitter)',
  'author.email': 'Email',

  // ============================================================
  //  Content: CP / PARAFAC
  // ============================================================
  'cp.section.intuition': 'Intuition',
  'cp.intuition.p1':
    "The CP decomposition (also called CANDECOMP / PARAFAC) factorizes a tensor into a sum of rank-one tensors. Each term is the outer product of N vectors — one for each mode.",
  'cp.intuition.p2':
    'For a 3rd-order tensor, the CP model with R components reads:',
  'cp.callout.rankone': 'What is rank-one?',
  'cp.callout.rankone.body': 'A tensor is rank-one if it can be written as a single outer product \\mathbf{u} \\circ \\mathbf{v} \\circ \\mathbf{w}. Its entries factor as \\mathcal{X}_{ijk} = u_i v_j w_k.',
  'cp.scale.desc': 'are the factor vectors and scales the magnitude of the r-th component.',
  'cp.section.visualization': 'Visualization',
  'cp.viz.caption': 'The CP decomposition of a 3rd-order tensor: each term is a rank-one tensor.',
  'cp.section.interactive': 'Interactive: explore the rank',
  'cp.interactive.p1': 'Move the slider to change the number of components R. More components mean a richer approximation, but also more parameters.',
  'cp.section.history': 'History, uniqueness, properties',
  'cp.history.title': 'Why was CP proposed?',
  'cp.history.why': 'What problem does it solve?',
  'cp.history.problem': 'When data naturally has multilinear structure, matrix factorization cannot capture the multi-way interaction. CP makes this interaction explicit as a set of interpretable factors.',
  'cp.history.adv': 'Strengths and weaknesses',
  'cp.history.advantage': 'Under the Kruskal condition, CP is essentially unique (up to permutation and scaling) — a property that matrix SVD does not enjoy.',
  'cp.history.disadvantage': 'Rank selection is NP-hard; sensitive to initialization and noise; many local optima.',
  'cp.section.math': 'Mathematical definition',
  'cp.math.p1': 'For an order-N tensor, the CP model is:',
  'cp.section.matrix': 'Matrix form (factor matrices)',
  'cp.matrix.p1': 'Stack the factor vectors as columns into matrices:',
  'cp.section.als': 'Algorithm: ALS alternating least squares',
  'cp.als.p1':
    'CP is typically computed by ALS (alternating least squares). Fix all but one factor and solve a least-squares problem for the remaining one.',
  'cp.section.complexity': 'Complexity',
  'cp.complexity.periter': 'Per iteration',
  'cp.complexity.periter.formula': 'O(R² · ΠIₙ + R³ · ΣIₙ)',
  'cp.complexity.space': 'Space',
  'cp.complexity.space.formula': 'O(R · ΣIₙ)',
  'cp.section.python': 'Python: with TensorLy',
  'cp.section.matlab': 'MATLAB: with Tensor Toolbox',
  'cp.section.references': 'References',
  'cp.section.why': 'Why is CP so important?',
  'cp.uniqueness.title': 'Uniqueness theorem',

  // ============================================================
  //  Content: Tucker & HOSVD
  // ============================================================
  'tucker.section.intuition': 'Intuition',
  'tucker.intuition.p1':
    'The Tucker decomposition factorizes a tensor into a small core tensor \\mathcal{G} multiplied by factor matrices along each mode. The factor matrices are typically constrained to be orthogonal — they play the role of singular vectors in higher-order SVD.',
  'tucker.callout.nmode': 'n-mode product',
  'tucker.callout.nmode.body':
    'The operator \\times_n multiplies a tensor by a matrix along one mode. It is the higher-order generalization of matrix-matrix multiplication.',
  'tucker.section.visualization': 'Visualization',
  'tucker.viz.caption': 'Tucker decomposition of a 3rd-order tensor: core multiplied by per-mode factors.',
  'tucker.section.interactive': 'Interactive: vary the multilinear rank',
  'tucker.interactive.p1':
    'The tuple (R₁, R₂, R₃) is the multilinear rank. The model is rich when each Rₙ is large, and highly compressed when they are small.',
  'tucker.section.hosvd': 'HOSVD: higher-order SVD',
  'tucker.hosvd.p1':
    "The HOSVD (De Lathauwer, Vandewalle, 2000) is the classical way to compute Tucker: take the top left singular vectors of each mode-n unfolding.",
  'tucker.hosvd.steps': 'HOSVD algorithm',
  'tucker.hosvd.step1': 'For each mode n = 1, …, N, compute the SVD of the mode-n unfolding \\mathcal{X}_{(n)}.',
  'tucker.hosvd.step2': 'Keep the leading Rₙ left singular vectors as the columns of \\mathbf{U}^{(n)}.',
  'tucker.hosvd.step3': 'Form the core by contracting X with all U^T: \\mathcal{G} = \\mathcal{X} \\times_1 \\mathbf{U}^{(1)T} \\cdots \\times_N \\mathbf{U}^{(N)T}',
  'tucker.section.compare': 'HOSVD vs HOOI vs CP',
  'tucker.compare.opt': 'Optimality',
  'tucker.compare.hosvd.opt': 'Quasi-best (≤ √N · best)',
  'tucker.compare.hooi.opt': 'Locally best',
  'tucker.compare.cp.opt': 'Locally best',
  'tucker.compare.orth': 'Orthogonality',
  'tucker.compare.hooi.orth': 'Yes',
  'tucker.compare.cp.orth': 'No',
  'tucker.compare.unique': 'Uniqueness',
  'tucker.compare.hosvd.unique': 'Up to signed permutation',
  'tucker.compare.hooi.unique': 'Up to signed permutation',
  'tucker.compare.cp.unique': 'Yes (under Kruskal condition)',
  'tucker.section.python': 'Python: with TensorLy',
  'tucker.section.matlab': 'MATLAB: with Tensor Toolbox',
  'tucker.section.references': 'References',

  // ============================================================
  //  Content: Tensor Train (TT)
  // ============================================================
  'tt.section.intuition': 'Intuition',
  'tt.intuition.p1':
    'TT (Oseledets, 2011) factorizes a high-order tensor into a chain of small 3rd-order cores. The first and last cores are order-2 (matrices), and the rest are 3rd-order tensors.',
  'tt.callout.train': 'Why "train"?',
  'tt.callout.train.body':
    'The cores are connected linearly like cars in a train, and a "passenger" (an element of the original tensor) is reconstructed by walking through every car and multiplying the corresponding slice matrices.',
  'tt.section.visualization': 'Visualization',
  'tt.viz.caption': 'Tensor Train: a chain of 3rd-order cores.',
  'tt.section.interactive': 'Interactive: TT-rank and order',
  'tt.interactive.p1':
    'The number of parameters in a TT decomposition is \\sum_{k=1}^{N} r_{k-1} \\, I_k \\, r_k — linear in N, quadratic in ranks, instead of exponential in N for the full tensor.',
  'tt.section.scaling': 'Against the curse of dimensionality',
  'tt.scaling.p1': 'Consider an order-N tensor with all Iₙ = 100. The full tensor has 100ᴺ entries. With TT-rank r = 5, we need only 2 · 5² · 100 · N ≈ 5000 N parameters — linear in N.',
  'tt.scaling.note': 'This is a manifestation of low-rank structure.',
  'tt.section.canonical': 'Canonical form and gauge freedom',
  'tt.canonical.p1':
    'An MPS is not unique: it has a gauge freedom. Choosing a convenient gauge — left-, right-, or mixed-canonical — simplifies algorithms like DMRG, TEBD, and inner products.',
  'tt.section.apps': 'TT in modern AI',
  'tt.apps.1': 'Tensorized neural networks: replace dense weight matrices with TT-format weights, achieving extreme compression.',
  'tt.apps.2': 'LoRA + TT: low-rank updates themselves stored as TT cores, reducing trainable parameters by 100×–1000× versus dense LoRA.',
  'tt.apps.3': 'LLM compression: TT has been used to compress GPT-2 and LLaMA layers with minimal accuracy loss.',
  'tt.apps.4': 'Quantum-inspired: TT is the real-space image of MPS for 1D systems with open boundary conditions.',
  'tt.section.python': 'Python: with TensorLy',
  'tt.section.matlab': 'MATLAB: with Tensor Toolbox',
  'tt.section.references': 'References',

  // ============================================================
  //  Content: Tensor Basics
  // ============================================================
  'basics.title': 'Tensor Basics',
  'basics.subtitle': 'The language of multilinear algebra',
  'basics.description':
    'Every concept you need before stepping into tensor decompositions — from the basic definition to modes, fibers, slices, rank, and norms.',
  'basics.tagline': 'Foundations: tensor, mode, fiber, slice',
  'basics.sections.topics': 'Topics',
  'basics.topic.tensor.title': 'Tensor',
  'basics.topic.tensor.desc': 'Multidimensional arrays',
  'basics.topic.mode.title': 'Mode & Fibers',
  'basics.topic.mode.desc': 'Higher-order axes',
  'basics.topic.slices.title': 'Slices',
  'basics.topic.slices.desc': '2D cross-sections',
  'basics.topic.rank.title': 'Rank',
  'basics.topic.rank.desc': 'Tensor rank',
  'basics.topic.norm.title': 'Norms & Inner Product',
  'basics.topic.norm.desc': 'Frobenius, ℓ₁, ℓ₂',
  'basics.topic.outer.title': 'Outer Product',
  'basics.topic.outer.desc': 'Building rank-1',
  'basics.topic.kron.title': 'Kronecker Product',
  'basics.topic.kron.desc': '⊗ operator',
  'basics.topic.khatri.title': 'Khatri-Rao Product',
  'basics.topic.khatri.desc': 'Column-wise Kronecker',
  'basics.topic.hadamard.title': 'Hadamard Product',
  'basics.topic.hadamard.desc': 'Element-wise ⊙',
  'basics.topic.einsum.title': 'Einstein Summation',
  'basics.topic.einsum.desc': 'einsum notation',
  'basics.topic.matricization.title': 'Matricization',
  'basics.topic.matricization.desc': 'Unfolding to matrix',
  'basics.topic.tensorization.title': 'Tensorization',
  'basics.topic.tensorization.desc': 'Vector → tensor',

  // Tensor page
  'tensor.title': 'Tensor — Definition & Notation',
  'tensor.subtitle': 'A tensor is a multidimensional array of numbers',
  'tensor.description':
    'A tensor is a multidimensional array of numbers. A vector is a 1-D array, a matrix is 2-D, a tensor can be any number of dimensions, called order (or mode).',
  'tensor.section.definition': 'Definition',
  'tensor.definition.p1': 'An N-order tensor is a multidimensional array:',
  'tensor.callout.special': 'Common special cases',
  'tensor.callout.special.list1': 'N = 0: scalar (a single number)',
  'tensor.callout.special.list2': 'N = 1: vector, e.g. \\mathbf{x} \\in \\mathbb{R}^{I_1}',
  'tensor.callout.special.list3': 'N = 2: matrix, e.g. \\mathbf{A} \\in \\mathbb{R}^{I_1 \\times I_2}',
  'tensor.callout.special.list4': 'N = 3: 3rd-order tensor (a "cube" of numbers)',
  'tensor.section.notation': 'Notation conventions',
  'tensor.notation.p1': 'Throughout this platform we use the following consistent notation:',
  'tensor.notation.1': 'Scalar (0-tensor): italic lowercase, e.g. a, b, x',
  'tensor.notation.2': 'Vector (1-tensor): bold lowercase, e.g. \\mathbf{x} \\in \\mathbb{R}^{I}',
  'tensor.notation.3': 'Matrix (2-tensor): bold uppercase, e.g. \\mathbf{A} \\in \\mathbb{R}^{I \\times J}',
  'tensor.notation.4': 'Order-N ≥ 3 tensor: calligraphic, e.g. \\mathcal{X}, \\mathcal{G}',
  'tensor.notation.5': 'Element access: x_{i_1 i_2 \\cdots i_N} or \\mathcal{X}_{i_1 i_2 \\cdots i_N}',
  'tensor.section.example': 'A 3rd-order tensor example',
  'tensor.example.p1':
    "The simplest non-trivial tensor has order 3. Imagine a stack of I₃ grayscale images, each of size I_1 × I_2. Below is an animated cube you can rotate.",
  'tensor.example.caption': 'Drag to rotate · An interactive 3rd-order tensor',
  'tensor.section.where': 'Where tensors appear',
  'tensor.where.1': 'Color image: H × W × 3 (R, G, B)',
  'tensor.where.2': 'Video clip: T × H × W × 3',
  'tensor.where.3': 'EEG signal: channels × time × trials',
  'tensor.where.4': 'Recommender system: user × item × context',
  'tensor.where.5': 'Quantum many-body state: 2 × 2 × ··· × 2 (2ᴺ amplitudes)',
  'tensor.section.python': 'Python: creating a tensor',
  'tensor.section.whatsnext': 'What\u2019s next?',
  'tensor.whatsnext':
    'Now that we have a tensor, we need ways to talk about its "rows" and "columns" in higher dimensions. The next lesson introduces modes, fibers, and slices — the high-dimensional generalization of matrix rows and columns.',
  'tensor.tag': 'definition, notation, multidimensional-array',

  // Mode & Fibers page
  'modefiber.title': 'Modes, Fibers & Slices',
  'modefiber.subtitle': 'Generalizing rows and columns to higher dimensions',
  'modefiber.description':
    'A fiber is the higher-order analog of a matrix row or column. A slice is a 2-D cross-section. Both are the natural units of many decompositions.',
  'modefiber.section.modes': 'Modes',
  'modefiber.modes.p1':
    'The mode (or way) of a tensor refers to one of its indices. An order-N tensor has N modes. Mode n corresponds to the n-th index in the subscript.',
  'modefiber.section.fibers': 'Fibers',
  'modefiber.fibers.p1': 'For a 3rd-order tensor \\mathcal{X} \\in \\mathbb{R}^{I_1 \\times I_2 \\times I_3}, the fibers are:',
  'modefiber.fibers.mode1': 'Mode-1 fiber (column fiber): \\mathcal{X}_{:jk} \\in \\mathbb{R}^{I_1}',
  'modefiber.fibers.mode2': 'Mode-2 fiber (row fiber): \\mathcal{X}_{i:k} \\in \\mathbb{R}^{I_2}',
  'modefiber.fibers.mode3': 'Mode-3 fiber (tube fiber): \\mathcal{X}_{ij:} \\in \\mathbb{R}^{I_3}',
  'modefiber.section.interactive': 'Interactive: rotate and see the fibers',
  'modefiber.interactive.p1': 'Click a mode button to highlight a fiber. The cube below is a 5×5×5 tensor. Try all three modes.',
  'modefiber.section.slices': 'Slices: 2-D cross-sections',
  'modefiber.slices.p1': 'A slice is the sub-tensor obtained by fixing all but two indices. For an N-order tensor, a slice is an (N-1)-order tensor.',
  'modefiber.section.why': 'Why fibers and slices matter',
  'modefiber.why.1': 'CP is a sum of rank-1 terms: each term contributes to every slice simultaneously.',
  'modefiber.why.2': 'Tucker is a small core times per-mode factors; the slices of the original are linear combinations of the slices of the core.',
  'modefiber.why.3': 't-SVD treats 3rd-order tensors as matrices of tubes (mode-3 fibers).',
  'modefiber.section.python': 'Python: indexing',
  'modefiber.tag': 'mode, fiber, slice, indexing',

  // Rank page
  'rank.title': 'Tensor Rank',
  'rank.subtitle': 'The smallest number of rank-1 terms needed to represent a tensor',
  'rank.tag': 'rank, rank-1, NP-hard, border-rank',
};

const zh: Dict = {
  // Brand
  'brand.name': '张量实验室',
  'brand.tagline': '分解',
  'brand.hero.title.line1': '可视化学习',
  'brand.hero.title.line2': '张量分解',
  'brand.hero.title.line3': '',
  'brand.hero.subtitle':
    '从多线性代数的数学,到人工智能与量子计算的前沿 —— 在浏览器中探索、动画化并运行真实的张量分解。',
  'brand.hero.badge': '最全面的张量学习平台',
  'brand.hero.cta1': '开始学习',
  'brand.hero.cta2': '体验 Playground',
  'brand.hero.3d.caption': '拖动旋转 · 交互式三阶张量',
  'brand.stats.decompositions': '分解方法',
  'brand.stats.animations': '交互动画',
  'brand.stats.examples': '代码示例',
  'brand.stats.papers': '精选论文',
  'brand.featured.title': '分解方法的五大族系',
  'brand.featured.subtitle': '掌握这五种结构,你就能理解整个张量分解领域。',
  'brand.featured.all': '全部 40+ 方法',
  'brand.featured.all.desc': 'CP、Tucker、TT、TR、BTD、t-SVD、MERA、PEPS……',
  'brand.modules.title': '完整的学习体系',
  'brand.modules.subtitle':
    '十二个一体化模块,涵盖从多线性代数基础到最新 AI 与量子研究的所有内容。',
  'brand.path.title': '从入门到科研学者',
  'brand.path.subtitle': '与您共同成长的结构化学习路径。',
  'brand.path.beginner': '无需先修知识',
  'brand.path.intermediate': '具备线性代数基础',
  'brand.path.advanced': '熟悉优化与机器学习',
  'brand.path.research': '前沿研究',
  'brand.why.badge': '为什么选择 Tensor Lab',
  'brand.why.title': '如同 Apple 设计教育产品一般精心打造的平台。',
  'brand.why.body':
    '每个概念都配有交互式可视化、可运行代码和研究级参考。不再是大段公式 —— 让张量在浏览器中旋转、分解、收敛。',
  'brand.why.cta': '开启旅程',
  'brand.why.math': '数学严谨',
  'brand.why.math.desc': '严格的 LaTeX',
  'brand.why.visual': '可视化',
  'brand.why.visual.desc': '3D 动画',
  'brand.why.code': '代码优先',
  'brand.why.code.desc': 'PyTorch · JAX',
  'brand.why.research': '研究',
  'brand.why.research.desc': 'AI + 量子',
  'brand.points.math': '交互式 3D 张量查看器',
  'brand.points.realtime': '在浏览器中运行真实分解',
  'brand.points.code': '支持 Python、PyTorch、JAX、MATLAB',
  'brand.points.domains': '面向 AI、量子与工程领域',
  'brand.footer.tagline': 'Tensor Lab —— 可视化学习张量分解',
  'brand.footer.note': '为数学家、工程师与研究者倾心打造。',

  // Navigation
  'nav.home': '首页',
  'nav.search': '搜索',
  'nav.settings': '设置',
  'nav.search.placeholder': '搜索全部内容…',
  'nav.search.placeholder.short': '搜索…',
  'nav.search.placeholder.long': '试试搜索 "tt"、"tucker"、"PEPS" 或 "VQE"…',
  'nav.search.noResults': '没有找到',
  'nav.search.browse': '按主题浏览',
  'nav.search.openMenu': '打开菜单',

  // Module names
  'module.home': '首页',
  'module.tensor-basics': '张量基础',
  'module.tensor-algebra': '张量代数',
  'module.tensor-decompositions': '张量分解',
  'module.tensor-networks': '张量网络',
  'module.optimization': '优化算法',
  'module.visualization': '可视化',
  'module.playground': '交互 Playground',
  'module.code': '代码中心',
  'module.ai': 'AI 应用',
  'module.quantum': '量子信息',
  'module.applications': '工程应用',
  'module.exercises': '练习题',
  'module.resources': '资源',
  'module.papers': '最新论文',
  'module.search': '搜索',
  'module.settings': '设置',

  // Module card descriptions
  'module.desc.home': '张量的世界',
  'module.desc.tensor-basics': '基础:张量、模、纤维、切片',
  'module.desc.tensor-algebra': 'Kronecker、Khatri-Rao、缩并',
  'module.desc.tensor-decompositions': '本平台核心',
  'module.desc.tensor-networks': 'MPS、PEPS、MERA、DMRG、TEBD',
  'module.desc.optimization': 'ALS、SGD、Adam、HALS、Riemannian',
  'module.desc.visualization': '交互式 3D 张量乐园',
  'module.desc.playground': '在浏览器中运行真实分解',
  'module.desc.code': 'TensorLy、PyTorch、JAX、Tensor Toolbox',
  'module.desc.ai': 'LLM、Transformer、LoRA、MoE、Diffusion',
  'module.desc.quantum': '态、线路、纠缠、DMRG、VQE',
  'module.desc.applications': '图像、EEG、MRI、视频、推荐',
  'module.desc.exercises': '测验与习题集',
  'module.desc.resources': '教材、论文、课程',
  'module.desc.papers': 'arXiv 每周精选',
  'module.desc.search': '搜索全部',
  'module.desc.settings': '偏好设置',

  // Module counts
  'module.count.lessons12': '12 节课',
  'module.count.topics8': '8 个主题',
  'module.count.methods40': '40+ 方法',
  'module.count.structures15': '15 种结构',
  'module.count.algorithms10': '10 种算法',
  'module.count.animations6': '6 个动画',
  'module.count.live': '在线',
  'module.count.examples50': '50+ 示例',
  'module.count.cases15': '15 个案例',
  'module.count.ai10': '10+ 主题',
  'module.count.quantum12': '12 个主题',
  'module.count.refs500': '500+ 引用',
  'module.count.hot': '热门',
  'module.count.new': '新',
  'module.count.core': '核心',

  // 404
  'notfound.title': '您访问的页面不存在。',
  'notfound.home': '返回首页',
  'notfound.search': '前往搜索',

  // Playground
  'playground.title': '交互 Playground',
  'playground.subtitle':
    '在合成数据上运行真实张量分解。调整参数,观察损失曲线,检视结果。',
  'playground.badge': '在浏览器中实时运行',
  'playground.section.algorithm': '算法',
  'playground.section.parameters': '参数',
  'playground.run': '运行',
  'playground.running': '运行中…',
  'playground.pause': '暂停',
  'playground.reset': '重置',
  'playground.tab.original': '原始',
  'playground.tab.recon': '重建',
  'playground.tab.compare': '并排对比',
  'playground.stat.iteration': '迭代',
  'playground.stat.error': '当前误差',
  'playground.stat.params': '参数数量',
  'playground.stat.compression': '压缩率',
  'playground.convergence': '收敛曲线',
  'playground.convergence.empty': '点击「运行」开始优化。',
  'playground.label.tensorSize': '张量大小',
  'playground.label.rank': '秩 R',
  'playground.label.noise': '噪声 σ',
  'playground.label.maxIter': '最大迭代',
  'playground.recon.empty': '运行算法以查看重建结果。',

  // Common
  'common.readMore': '阅读更多',
  'common.open': '打开',
  'common.browse': '浏览示例',
  'common.explore': '探索',
  'common.previous': '上一篇',
  'common.next': '下一篇',
  'common.readingTime': '约',
  'common.minutes': '分钟',
  'common.copy': '复制',
  'common.copied': '已复制!',
  'common.placeholder': '—',

  // Levels
  'level.beginner': '入门',
  'level.intermediate': '中级',
  'level.advanced': '高级',
  'level.research': '研究级',
  'level.all': '全部',

  // Settings
  'settings.title': '设置',
  'settings.subtitle': '定制您的使用体验',
  'settings.appearance': '外观',
  'settings.theme': '主题',
  'settings.theme.desc': '在浅色和深色模式之间切换',
  'settings.language': '语言',
  'settings.language.desc': '选择您的首选语言',
  'settings.about': '关于',
  'settings.version': '版本',
  'settings.builtWith': '技术栈',
  'settings.license': '许可',

  // Contact / author
  'author.github': 'GitHub',
  'author.x': 'X (Twitter)',
  'author.email': '邮箱',

  // ============================================================
  //  Content: CP / PARAFAC
  // ============================================================
  'cp.section.intuition': '直觉',
  'cp.intuition.p1':
    'CP 分解(也称 CANDECOMP / PARAFAC)将一个张量分解为一系列秩-1 张量之和。每一项是 N 个向量的外积——每个模各一个。',
  'cp.intuition.p2':
    '对于三阶张量,具有 R 个分量的 CP 模型写作:',
  'cp.callout.rankone': '什么是秩-1?',
  'cp.callout.rankone.body': '如果一个张量可以写成单个外积 \\mathbf{u} \\circ \\mathbf{v} \\circ \\mathbf{w},则称其为秩-1。其元素可以分解为 \\mathcal{X}_{ijk} = u_i v_j w_k。',
  'cp.scale.desc': '是各因子向量,为第 r 个分量的幅度提供缩放。',
  'cp.section.visualization': '可视化',
  'cp.viz.caption': '三阶张量的 CP 分解结构:每一项是一个秩-1 张量。',
  'cp.section.interactive': '交互:探索秩',
  'cp.interactive.p1': '移动滑块以改变分量数 R。更多分量意味着更丰富的近似,但参数也更多。',
  'cp.section.history': '历史、唯一性与性质',
  'cp.history.title': '为什么提出 CP?',
  'cp.history.why': '解决什么问题?',
  'cp.history.problem': '当数据天然具有多线性结构时,矩阵分解无法捕捉多维交互。CP 把这种交互显式化为一组可解释的因子。',
  'cp.history.adv': '优缺点',
  'cp.history.advantage': '在 Kruskal 条件下,CP 分解在本质上唯一(在置换和缩放意义下),这一点矩阵 SVD 无法做到。',
  'cp.history.disadvantage': '秩的选择是 NP-hard 的;对初始化和噪声敏感;可能存在多个局部最优。',
  'cp.section.math': '数学定义',
  'cp.math.p1': '对于阶数为 N 的张量,CP 模型为:',
  'cp.section.matrix': '矩阵形式(因子矩阵)',
  'cp.matrix.p1': '将因子向量作为列堆叠为矩阵:',
  'cp.section.als': '算法:ALS 交替最小二乘',
  'cp.als.p1':
    'CP 通常通过 ALS(交替最小二乘)计算。固定除一个之外的所有因子,然后对剩下的因子求解最小二乘问题。',
  'cp.section.complexity': '复杂度',
  'cp.complexity.periter': '每次迭代',
  'cp.complexity.periter.formula': 'O(R² · ΠIₙ + R³ · ΣIₙ)',
  'cp.complexity.space': '空间',
  'cp.complexity.space.formula': 'O(R · ΣIₙ)',
  'cp.section.python': 'Python:使用 TensorLy',
  'cp.section.matlab': 'MATLAB:使用 Tensor Toolbox',
  'cp.section.references': '参考文献',
  'cp.section.why': '为什么 CP 如此重要?',
  'cp.uniqueness.title': '唯一性定理',

  // ============================================================
  //  Content: Tucker & HOSVD
  // ============================================================
  'tucker.section.intuition': '直觉',
  'tucker.intuition.p1':
    'Tucker 分解将张量分解为一个小的核心张量 \\mathcal{G} 沿着每个模乘以因子矩阵。因子矩阵通常被约束为正交的——它们在高阶 SVD 中扮演奇异向量的角色。',
  'tucker.callout.nmode': 'n-模积',
  'tucker.callout.nmode.body':
    '算子 \\times_n 表示张量沿第 n 个模与矩阵相乘。它是矩阵-矩阵乘积在更高阶上的推广。',
  'tucker.section.visualization': '可视化',
  'tucker.viz.caption': '三阶张量的 Tucker 分解:核心乘以每模的因子。',
  'tucker.section.interactive': '交互:变化多线性秩',
  'tucker.interactive.p1':
    '元组 (R₁, R₂, R₃) 是多线性秩。当每个 Rₙ 较大时模型更丰富,较小时压缩率更高。',
  'tucker.section.hosvd': 'HOSVD:高阶 SVD',
  'tucker.hosvd.p1':
    'HOSVD(De Lathauwer, Vandewalle, 2000)是计算 Tucker 分解的经典方法:取每个模展开的左奇异向量。',
  'tucker.hosvd.steps': 'HOSVD 算法',
  'tucker.hosvd.step1': '对每个模 n = 1, …, N,计算模-n 展开 \\mathcal{X}_{(n)} 的 SVD。',
  'tucker.hosvd.step2': '将前 Rₙ 个左奇异向量作为 \\mathbf{U}^{(n)} 的列。',
  'tucker.hosvd.step3': '用所有因子收缩得到核心: \\mathcal{G} = \\mathcal{X} \\times_1 \\mathbf{U}^{(1)T} \\cdots \\times_N \\mathbf{U}^{(N)T}',
  'tucker.section.compare': 'HOSVD vs HOOI vs CP',
  'tucker.compare.opt': '最优性',
  'tucker.compare.hosvd.opt': '准最优(≤ √N · 最优)',
  'tucker.compare.hooi.opt': '局部最优',
  'tucker.compare.cp.opt': '局部最优',
  'tucker.compare.orth': '正交性',
  'tucker.compare.hooi.orth': '是',
  'tucker.compare.cp.orth': '否',
  'tucker.compare.unique': '唯一性',
  'tucker.compare.hosvd.unique': '在带符号置换意义下',
  'tucker.compare.hooi.unique': '在带符号置换意义下',
  'tucker.compare.cp.unique': '是(Kruskal 条件下)',
  'tucker.section.python': 'Python:使用 TensorLy',
  'tucker.section.matlab': 'MATLAB:使用 Tensor Toolbox',
  'tucker.section.references': '参考文献',

  // ============================================================
  //  内容:Tensor Train (TT)
  // ============================================================
  //  Content: Tensor Train (TT)
  // ============================================================
  'tt.section.intuition': '直觉',
  'tt.intuition.p1':
    'TT(Oseledets, 2011)将一个高阶张量分解为一串 3 阶核心。第一个和最后一个核心是 2 阶(矩阵),其余都是 3 阶张量。',
  'tt.callout.train': '为什么叫"火车"?',
  'tt.callout.train.body':
    '核心像火车车厢一样线性连接,而原始张量的"乘客"通过每个车厢对应的切片矩阵相乘来重建。',
  'tt.section.visualization': '可视化',
  'tt.viz.caption': 'TT 分解:3 阶核心的链。',
  'tt.section.interactive': '交互:TT 秩与阶数',
  'tt.interactive.p1':
    'TT 表示中的参数数量是 \\sum_{k=1}^{N} r_{k-1} \\, I_k \\, r_k —— 关于 N 线性、关于秩平方,而不是关于 N 指数。',
  'tt.section.scaling': '与维数灾难',
  'tt.scaling.p1': '假设 N 阶张量所有 Iₙ = 100。完整张量具有 100ᴺ 个元素。当 TT 秩 r = 5 时,只需要 2 · 5² · 100 · N ≈ 5000 N 个参数——线性于 N。',
  'tt.scaling.note': '这是低秩结构的体现。',
  'tt.section.canonical': '规范形式与规范自由',
  'tt.canonical.p1':
    'TT 分解不是唯一的:它具有规范自由(gauge freedom)。选择方便的规范——左正交、右正交或混合正交——可以简化 DMRG、TEBD 和内积等算法。',
  'tt.section.apps': 'TT 在现代 AI 中',
  'tt.apps.1': '张量化神经网络:用 TT 格式权重替换密集权重矩阵,实现极致压缩。',
  'tt.apps.2': 'LoRA 与 TT:低秩更新本身以 TT 核心存储,与密集 LoRA 相比训练参数减少 100×–1000×。',
  'tt.apps.3': 'LLM 压缩:TT 已用于以极小精度损失压缩 GPT-2 和 LLaMA 层。',
  'tt.apps.4': '量子启发的灵感:对于具有有界纠缠的 1D 系统,TT 与开边界条件的 MPS 完全等价。',
  'tt.section.python': 'Python:使用 TensorLy',
  'tt.section.matlab': 'MATLAB:使用 Tensor Toolbox',
  'tt.section.references': '参考文献',

  // ============================================================
  //  Content: Tensor Basics
  // ============================================================
  'basics.title': '张量基础',
  'basics.subtitle': '多线性代数的语言',
  'basics.description':
    '每个概念在进入张量分解之前都需要打下的基础——从基本定义到模、纤维、切片、秩与范数。',
  'basics.tagline': '基础:张量、模、纤维、切片',
  'basics.sections.topics': '主题',
  'basics.topic.tensor.title': '张量',
  'basics.topic.tensor.desc': '多维数组',
  'basics.topic.mode.title': '模与纤维',
  'basics.topic.mode.desc': '高阶坐标轴',
  'basics.topic.slices.title': '切片',
  'basics.topic.slices.desc': '二维截面',
  'basics.topic.rank.title': '秩',
  'basics.topic.rank.desc': '张量秩',
  'basics.topic.norm.title': '范数与内积',
  'basics.topic.norm.desc': 'Frobenius、ℓ₁、ℓ₂',
  'basics.topic.outer.title': '外积',
  'basics.topic.outer.desc': '构造秩-1',
  'basics.topic.kron.title': 'Kronecker 积',
  'basics.topic.kron.desc': '⊗ 算子',
  'basics.topic.khatri.title': 'Khatri-Rao 积',
  'basics.topic.khatri.desc': '按列 Kronecker',
  'basics.topic.hadamard.title': 'Hadamard 积',
  'basics.topic.hadamard.desc': '逐元素 ⊙',
  'basics.topic.einsum.title': '爱因斯坦求和',
  'basics.topic.einsum.desc': 'einsum 记号',
  'basics.topic.matricization.title': '矩阵化',
  'basics.topic.matricization.desc': '展开为矩阵',
  'basics.topic.tensorization.title': '张量化',
  'basics.topic.tensorization.desc': '向量 → 张量',

  // Tensor page
  'tensor.title': '张量 — 定义与记号',
  'tensor.subtitle': '张量是数字的多维数组',
  'tensor.description':
    '一种张量是数字的多维数组。向量是 1 维数组,矩阵是 2 维,张量则可以是任意维数,称为阶数(阶)或模。',
  'tensor.section.definition': '定义',
  'tensor.definition.p1': '一个 N 阶张量是 Hilbert 空间中的一个多维数组:',
  'tensor.callout.special': '常见特例',
  'tensor.callout.special.list1': 'N = 0:标量(一个数)',
  'tensor.callout.special.list2': 'N = 1:向量,如 \\mathbf{x} \\in \\mathbb{R}^{I_1}',
  'tensor.callout.special.list3': 'N = 2:矩阵,如 \\mathbf{A} \\in \\mathbb{R}^{I_1 \\times I_2}',
  'tensor.callout.special.list4': 'N = 3:三阶张量(一组数字的"立方体")',
  'tensor.section.notation': '记号约定',
  'tensor.notation.p1': '在整个平台中我们采用以下一致的记号:',
  'tensor.notation.1': '标量(0-阶张量):斜体小写字母,如 a, b, x',
  'tensor.notation.2': '向量(1-阶张量):粗体小写字母,如 \\mathbf{x} \\in \\mathbb{R}^{I}',
  'tensor.notation.3': '矩阵(2-阶张量):粗体大写字母,如 \\mathbf{A} \\in \\mathbb{R}^{I \\times J}',
  'tensor.notation.4': '阶数 N ≥ 3 的张量:花体大写字母,如 \\mathcal{X}, \\mathcal{G}',
  'tensor.notation.5': '元素访问: x_{i_1 i_2 \\cdots i_N} 或 \\mathcal{X}_{i_1 i_2 \\cdots i_N}',
  'tensor.section.example': '三阶张量示例',
  'tensor.example.p1':
    '最简单的非平凡张量是三阶的。想象 I₃ 个灰度图像的堆叠,每个大小为 I_1 × I_2。下面是一个可旋转的交互式立方体。',
  'tensor.example.caption': '拖动旋转 · 交互式三阶张量',
  'tensor.section.where': '张量出现在哪里',
  'tensor.where.1': '彩色图像:H × W × 3 (R, G, B)',
  'tensor.where.2': '视频片段:T × H × W × 3',
  'tensor.where.3': 'EEG 信号:通道 × 时间 × 试次',
  'tensor.where.4': '推荐系统:用户 × 物品 × 上下文',
  'tensor.where.5': '量子多体态:2 × 2 × ··· × 2 (2ᴺ 个振幅)',
  'tensor.section.python': 'Python:创建张量',
  'tensor.section.whatsnext': '下一步?',
  'tensor.whatsnext':
    '现在我们有了张量,需要讨论如何在更高维度中谈论它的"行"和"列"。下一课介绍模、纤维和切片——矩阵行列在高阶上的推广。',
  'tensor.tag': '定义,记号,多维数组',

  // Mode & Fibers page
  'modefiber.title': '模、纤维与切片',
  'modefiber.subtitle': '在高维张量中导航',
  'modefiber.description':
    '纤维是矩阵行与列在高阶上的推广。切片是 2 维的横截面。它们是描述许多分解的天然单位。',
  'modefiber.section.modes': '模',
  'modefiber.modes.p1':
    '张量的模(modus)或阶(way)指其指标之一。N 阶张量具有 N 个模。模 n 对应下标中的第 n 个。',
  'modefiber.section.fibers': '纤维',
  'modefiber.fibers.p1': '张量 \\mathcal{X} \\in \\mathbb{R}^{I_1 \\times I_2 \\times I_3} 的纤维为:',
  'modefiber.fibers.mode1': '模-1 纤维(列纤维): \\mathcal{X}_{:jk} \\in \\mathbb{R}^{I_1}',
  'modefiber.fibers.mode2': '模-2 纤维(行纤维): \\mathcal{X}_{i:k} \\in \\mathbb{R}^{I_2}',
  'modefiber.fibers.mode3': '模-3 纤维(管纤维): \\mathcal{X}_{ij:} \\in \\mathbb{R}^{I_3}',
  'modefiber.section.interactive': '交互:旋转与观察纤维',
  'modefiber.interactive.p1': '点击模按钮以高亮一条纤维。下面的立方体是一个 5×5×5 张量。试试三个模。',
  'modefiber.section.slices': '切片:2 维截面',
  'modefiber.slices.p1': '切片是固定除两个指标之外所有指标得到的子张量。对于 N 阶张量,切片是阶数为 N-1 的张量。',
  'modefiber.section.why': '为什么纤维和切片很重要',
  'modefiber.why.1': 'CP 是秩-1 项之和:每一项对每个切片都有贡献。',
  'modefiber.why.2': 'Tucker 是一个小核心乘以每模的因子;原始张量的每个切片是核心切片的线性组合。',
  'modefiber.why.3': 't-SVD 将三阶张量视为管(模-3 纤维)的矩阵。',
  'modefiber.section.python': 'Python:索引',
  'modefiber.tag': '模,纤维,切片,索引',

  // Rank page
  'rank.title': '张量秩',
  'rank.subtitle': '表示张量所需的最少秩-1 项数',
  'rank.tag': '秩,秩-1,NP-难,边界秩',
};

const dictionaries: Record<Locale, Dict> = { en, zh };

// Module-level state. We intentionally start at 'en' on both server AND
// client to avoid React hydration mismatches. The actual stored/preferred
// locale is read inside a useEffect AFTER mount (see I18nProvider / useI18n).
let currentLocale: Locale = 'en';
const subscribers = new Set<(l: Locale) => void>();
let initialized = false;

function notify() {
  subscribers.forEach((cb) => {
    try {
      cb(currentLocale);
    } catch {
      /* noop */
    }
  });
}

function initFromStorage() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  try {
    const stored = localStorage.getItem('locale');
    let next: Locale = 'en';
    if (stored === 'en' || stored === 'zh') {
      next = stored;
    } else if (navigator.language.toLowerCase().startsWith('zh')) {
      next = 'zh';
    }
    if (next !== currentLocale) {
      currentLocale = next;
    }
    document.documentElement.lang = currentLocale === 'zh' ? 'zh-CN' : 'en';
    notify();
  } catch {
    /* noop */
  }
}

export function setLocaleGlobal(l: Locale) {
  if (l !== 'en' && l !== 'zh') return;
  currentLocale = l;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('locale', l);
      document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
    } catch {
      /* noop */
    }
  }
  notify();
}

export function getLocale(): Locale {
  return currentLocale;
}

export function tStatic(locale: Locale, key: string, fallback?: string): string {
  return dictionaries[locale]?.[key] ?? fallback ?? key;
}

// Hook used by client components.
// IMPORTANT: useState initializer must be stable between server and client
// to avoid hydration mismatches. We always start with 'en'; the stored
// locale is loaded in a useEffect after mount.
export function useI18n() {
  const [locale, setLocaleState] = React.useState<Locale>('en');

  React.useEffect(() => {
    // Initialize from localStorage / browser language after mount
    initFromStorage();

    // Subscribe to global changes
    const cb = (l: Locale) => setLocaleState(l);
    subscribers.add(cb);
    // Sync with current
    setLocaleState(currentLocale);
    return () => {
      subscribers.delete(cb);
    };
  }, []);

  const t = React.useCallback(
    (key: string, fallback?: string) => tStatic(locale, key, fallback),
    [locale],
  );
  const setLocale = React.useCallback((l: Locale) => setLocaleGlobal(l), []);
  const toggle = React.useCallback(
    () => setLocaleGlobal(locale === 'en' ? 'zh' : 'en'),
    [locale],
  );

  return { locale, setLocale, toggle, t };
}

// Provider — runs initFromStorage on the client AFTER mount to keep
// server- and client-rendered output identical (no hydration mismatch).
export function I18nProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    initFromStorage();
  }, []);
  return React.createElement(React.Fragment, null, children);
}
