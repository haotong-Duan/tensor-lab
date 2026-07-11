import Link from 'next/link';
import { ContentPage, Section } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, ArrowRight } from 'lucide-react';

export const metadata = { title: 'Learning Path · Tensor Lab' };

const paths = {
  beginner: {
    title: 'Beginner Path',
    description: 'Start from scratch: linear algebra refresh through basic tensor operations.',
    color: 'from-emerald-500 to-teal-500',
    modules: [
      { title: 'Tensor Basics: definition, mode, fiber, slice', href: '/basics' },
      { title: 'Tensor Algebra: products, contractions', href: '/algebra' },
      { title: 'Kronecker, Khatri-Rao, Hadamard', href: '/basics/kronecker' },
      { title: 'CP decomposition (intuition)', href: '/decompositions/cp' },
      { title: 'Tucker decomposition (intuition)', href: '/decompositions/tucker' },
      { title: 'Image compression case study', href: '/applications/image' },
    ],
  },
  intermediate: {
    title: 'Intermediate Path',
    description: 'Algorithms and applications: ALS, gradient methods, completion.',
    color: 'from-blue-500 to-indigo-500',
    modules: [
      { title: 'CP-ALS in detail', href: '/decompositions/cp' },
      { title: 'HOSVD and HOOI', href: '/decompositions/tucker' },
      { title: 'Tensor completion', href: '/decompositions/completion' },
      { title: 'Robust Tensor PCA', href: '/decompositions/rtpca' },
      { title: 'Recommender systems', href: '/applications/recsys' },
      { title: 'Optimization: ALS, SGD, Adam', href: '/optimization' },
    ],
  },
  advanced: {
    title: 'Advanced Path',
    description: 'Tensor networks: TT, TR, MPS, PEPS, MERA.',
    color: 'from-violet-500 to-purple-500',
    modules: [
      { title: 'Tensor Train', href: '/decompositions/tt' },
      { title: 'Tensor Ring', href: '/decompositions/tr' },
      { title: 'MPS and quantum states', href: '/decompositions/mps' },
      { title: 'DMRG and TEBD', href: '/networks/dmrg' },
      { title: 'PEPS and 2D networks', href: '/decompositions/peps' },
      { title: 'TT for LLMs', href: '/ai/llm' },
    ],
  },
  research: {
    title: 'Research Path',
    description: 'Cutting-edge: Bayesian, Riemannian, iPEPS, MERA at criticality.',
    color: 'from-rose-500 to-pink-500',
    modules: [
      { title: 'Bayesian tensor decompositions', href: '/decompositions/bayesian' },
      { title: 'Riemannian optimization', href: '/optimization/riemannian' },
      { title: 'iPEPS with CTM', href: '/decompositions/peps' },
      { title: 'MERA at criticality', href: '/decompositions/mera' },
      { title: 'Born machines', href: '/networks/born' },
      { title: 'Reproduce a recent paper', href: '/papers' },
    ],
  },
};

export default function PathPage({ params }: { params: { level: string } }) {
  const path = paths[params.level as keyof typeof paths];

  if (!path) {
    return (
      <ContentPage title="Path not found">
        <p>This learning path doesn't exist. Try one of the four main paths.</p>
      </ContentPage>
    );
  }

  return (
    <ContentPage
      category="Learning Path"
      title={path.title}
      subtitle={path.description}
    >
      <Section title="Modules">
        <div className="space-y-2 not-prose">
          {path.modules.map((m, i) => (
            <Link key={m.href} href={m.href}>
              <GlassCard className="p-4 group" hover>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${path.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 font-medium group-hover:text-primary transition-colors">{m.title}</div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </Section>
    </ContentPage>
  );
}
