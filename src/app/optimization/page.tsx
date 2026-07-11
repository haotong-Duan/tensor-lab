import Link from 'next/link';
import { ContentPage, Section } from '@/components/content-page';
import { Math as MathExpr } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, ArrowRight } from 'lucide-react';

export const metadata = { title: 'Optimization · Tensor Lab' };

const methods = [
  { title: 'Alternating Least Squares (ALS)', href: '/optimization/als', desc: 'Fix all but one factor, solve least-squares' },
  { title: 'Gradient Descent', href: '/optimization/gd', desc: 'Plain full-batch gradient' },
  { title: 'Adam & SGD', href: '/optimization/adam', desc: 'Adaptive learning rates' },
  { title: 'HALS', href: '/optimization/hals', desc: 'Hierarchical ALS for nonnegative' },
  { title: 'Riemannian Optimization', href: '/optimization/riemannian', desc: 'Stiefel manifold for orthogonal factors' },
];

export default function OptimizationPage() {
  return (
    <ContentPage
      category="Module"
      title="Optimization for Tensor Decompositions"
      subtitle="Algorithms for fitting CP, Tucker, TT, and beyond"
      description="Most tensor decomposition problems are non-convex. The choice of optimizer — ALS, SGD, Adam, Riemannian — strongly affects speed, accuracy, and robustness."
      level="Advanced"
      readTime="~ 4 hours"
      tags={['ALS', 'SGD', 'Adam', 'HALS', 'Riemannian']}
    >
      <Section title="Why optimization is hard">
        <p>
          The CP, Tucker, and TT fitting problems are all non-convex. They have many
          local minima, and the loss landscape depends on the data. No single
          algorithm dominates: each has trade-offs.
        </p>
      </Section>

      <Section title="Methods">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 not-prose">
          {methods.map((m) => (
            <Link key={m.href} href={m.href}>
              <GlassCard className="p-5 group h-full" hover>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-lg">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{m.title}</h3>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
                <div className="mt-3 flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  Read more
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </Section>
    </ContentPage>
  );
}
