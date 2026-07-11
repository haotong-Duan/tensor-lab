'use client';

import Link from 'next/link';
import { ContentPage, Section, Callout } from '@/components/content-page';
import { Math } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Layers, BookOpen, Sparkles } from 'lucide-react';
import {
  CPDiagram,
  TuckerDiagram,
  TTDiagram,
  TRDiagram,
  MPSDiagram,
  MERADiagram,
  PEPSDiagram,
} from '@/components/visualizations/tensor-diagrams';
import { motion } from 'framer-motion';

const decompositionGroups = [
  {
    title: 'Polynomial / Rank-1 Families',
    description: 'The most elementary tensor factorizations: a sum of outer products.',
    methods: [
      { name: 'CP / CANDECOMP / PARAFAC', href: '/decompositions/cp', desc: 'Sum of R rank-1 tensors', diagram: <CPDiagram rank={3} />, badge: 'Core' },
      { name: 'Block Term Decomposition (BTD)', href: '/decompositions/btd', desc: 'Sum of low-rank blocks' },
      { name: 'PARATUCK', href: '/decompositions/paratuck', desc: 'PARAFAC + Tucker blend' },
      { name: 'INDSCAL', href: '/decompositions/paratuck', desc: 'Individual differences scaling' },
      { name: 'DEDICOM', href: '/decompositions/dedicom', desc: 'Asymmetric relations' },
    ],
  },
  {
    title: 'Tucker Family',
    description: 'A small core tensor multiplied by orthogonal factor matrices along each mode.',
    methods: [
      { name: 'Tucker', href: '/decompositions/tucker', desc: 'Full Tucker decomposition', diagram: <TuckerDiagram />, badge: 'Core' },
      { name: 'HOSVD', href: '/decompositions/tucker', desc: 'Higher-Order SVD', badge: 'Core' },
      { name: 'HOOI', href: '/decompositions/hooi', desc: 'Higher-Order Orthogonal Iteration' },
      { name: 'Higher-Order LRA', href: '/decompositions/tucker', desc: 'Low-rank Tucker approximation' },
    ],
  },
  {
    title: 'Tensor Networks / Train Formats',
    description: 'Factorize a tensor into a sequence (or graph) of smaller 3rd-order cores.',
    methods: [
      { name: 'Tensor Train (TT)', href: '/decompositions/tt', desc: 'Linear chain of cores', diagram: <TTDiagram />, badge: 'Core' },
      { name: 'Matrix Product State (MPS)', href: '/decompositions/mps', desc: '1D quantum states', diagram: <MPSDiagram /> },
      { name: 'Tensor Ring (TR)', href: '/decompositions/tr', desc: 'Cyclic train', diagram: <TRDiagram />, badge: 'Core' },
      { name: 'Hierarchical Tucker (HT)', href: '/decompositions/ht', desc: 'Binary tree of cores' },
      { name: 'Tree Tensor Network (TTN)', href: '/decompositions/ttn', desc: 'Arbitrary tree structure' },
      { name: 'PEPS', href: '/decompositions/peps', desc: '2D tensor network', diagram: <PEPSDiagram /> },
      { name: 'MERA', href: '/decompositions/mera', desc: 'Multi-scale entanglement', diagram: <MERADiagram /> },
    ],
  },
  {
    title: 't-Product and t-SVD',
    description: 'Treat 3rd-order tensors as matrices of tubes using the t-product.',
    methods: [
      { name: 't-SVD', href: '/decompositions/t-svd', desc: 'Tensor SVD via t-product' },
      { name: 'Tubal SVD', href: '/decompositions/t-svd', desc: 'Variant for 3rd-order' },
      { name: 'Tensor Robust PCA', href: '/decompositions/rtpca', desc: 'Low-rank + sparse via t-SVD' },
    ],
  },
  {
    title: 'Data-aware & Sketching',
    description: 'Methods that explicitly use the original data matrix/columns.',
    methods: [
      { name: 'Tensor CUR', href: '/decompositions/cur', desc: 'Sample actual fibers' },
      { name: 'Tensor Sketch', href: '/decompositions/cur', desc: 'Randomized sketch' },
      { name: 'Randomized Tucker', href: '/decompositions/cur', desc: 'Fast randomized HOSVD' },
    ],
  },
  {
    title: 'Bayesian & Probabilistic',
    description: 'Probabilistic extensions that provide uncertainty estimates.',
    methods: [
      { name: 'Bayesian CP', href: '/decompositions/bayesian', desc: 'Variational inference for CP' },
      { name: 'Bayesian Tucker', href: '/decompositions/bayesian', desc: 'Bayesian HOSVD' },
      { name: 'Probabilistic Tensor PCA', href: '/decompositions/bayesian', desc: 'Latent variable model' },
    ],
  },
  {
    title: 'Constrained Variants',
    description: 'Add constraints such as sparsity or nonnegativity to classical methods.',
    methods: [
      { name: 'Sparse CP', href: '/decompositions/sparse', desc: 'Sparsity in factors' },
      { name: 'Sparse Tucker', href: '/decompositions/sparse', desc: 'Sparsity in core' },
      { name: 'Nonnegative CP', href: '/decompositions/sparse', desc: 'NMF-style on tensors' },
      { name: 'Nonnegative Tucker (NTD)', href: '/decompositions/sparse', desc: 'NTF / NTD' },
    ],
  },
  {
    title: 'Recovery, Completion & Robust Methods',
    description: 'Recover a tensor from missing, noisy, or corrupted entries.',
    methods: [
      { name: 'Tensor Completion', href: '/decompositions/completion', desc: 'Fill missing entries', badge: 'Hot' },
      { name: 'Tensor Recovery', href: '/decompositions/completion', desc: 'Robust to outliers' },
      { name: 'Robust Tensor PCA', href: '/decompositions/rtpca', desc: 'Low-rank + sparse' },
      { name: 'Tensor PCA', href: '/decompositions/rtpca', desc: 'Multilinear PCA' },
      { name: 'Tensor ICA', href: '/decompositions/rtpca', desc: 'Independent components' },
      { name: 'Tensor Dictionary Learning', href: '/decompositions/rtpca', desc: 'Learn a tensor basis' },
      { name: 'Low-Rank Tensor Approximation', href: '/decompositions/completion', desc: 'Best rank-(R₁,…,R_N)' },
    ],
  },
  {
    title: 'Streaming, Online & Incremental',
    description: 'Decompositions for data that arrives continuously or cannot fit in memory.',
    methods: [
      { name: 'Streaming Tucker', href: '/decompositions/streaming', desc: 'Update factor matrices online' },
      { name: 'Incremental CP', href: '/decompositions/streaming', desc: 'Add new samples cheaply' },
      { name: 'Online Tensor Decomposition', href: '/decompositions/streaming', desc: 'Stochastic gradient variants' },
    ],
  },
  {
    title: 'Low-rank Approximation Theory',
    description: 'Best low-rank approximation, quasi-best, and stability analysis.',
    methods: [
      { name: 'Best rank-R Approximation', href: '/decompositions/tucker', desc: 'Truncated HOSVD' },
      { name: 'Quasi-Best Approximation', href: '/decompositions/tucker', desc: 'Suboptimal but stable' },
      { name: 'Identifiability Theory', href: '/decompositions/cp', desc: 'When is the decomposition unique?' },
    ],
  },
];

export default function DecompositionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="border-b border-border/40 bg-gradient-to-b from-secondary/30 to-transparent mesh-bg">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <div className="max-w-3xl">
            <Badge variant="gradient" className="mb-4">
              <Layers className="w-3 h-3 mr-1" />
              The core of Tensor Lab
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Tensor Decompositions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Every mainstream method, organized by family. Each entry is a self-contained
              tutorial with intuition, math, code, and applications.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {decompositionGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.05 }}
          >
            <div className="mb-6">
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Family {String(gi + 1).padStart(2, '0')}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{group.title}</h2>
              <p className="mt-1 text-muted-foreground">{group.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.methods.map((m, i) => (
                <Link key={`${group.title}-${m.name}-${i}`} href={m.href}>
                  <GlassCard className="p-5 h-full group" hover>
                    {m.diagram && <div className="mb-3 -mx-2">{m.diagram}</div>}
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {m.name}
                      </h3>
                      {m.badge && (
                        <Badge
                          variant={
                            m.badge === 'Core' ? 'gradient' : m.badge === 'Hot' ? 'hot' : 'new'
                          }
                        >
                          {m.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                    <div className="mt-3 flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      Read more
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
