import Link from 'next/link';
import { ContentPage, Section } from '@/components/content-page';
import { Math as MathExpr } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { Network, ArrowRight } from 'lucide-react';

export const metadata = { title: 'Tensor Networks · Tensor Lab' };

const topics = [
  { title: 'DMRG', href: '/networks/dmrg', desc: 'Density matrix renormalization group' },
  { title: 'TEBD', href: '/networks/tebd', desc: 'Time evolving block decimation' },
  { title: 'Canonical Form', href: '/networks/canonical', desc: 'Left- and right-canonical forms' },
  { title: 'Born Machine', href: '/networks/born', desc: 'Generative models from quantum states' },
  { title: 'Riemannian Optimization', href: '/networks/riemannian', desc: 'Optimization on tensor manifolds' },
];

export default function NetworksPage() {
  return (
    <ContentPage
      category="Module"
      title="Tensor Networks"
      subtitle="The geometry of many-body physics"
      description="A unified treatment of MPS, PEPS, MERA, TTN, and the algorithms that exploit them: DMRG, TEBD, and beyond."
      level="Advanced"
      readTime="~ 6 hours"
      tags={['MPS', 'PEPS', 'MERA', 'DMRG', 'TEBD']}
    >
      <Section title="What is a tensor network?">
        <p>
          A <strong>tensor network</strong> is a collection of tensors connected by
          shared indices. The shared indices are contracted; the unshared indices are
          left as the output. Tensor networks are a graphical calculus for multilinear
          algebra.
        </p>
        <p>
          In physics, tensor networks are the natural representation of quantum
          states, especially ground states of gapped local Hamiltonians.
        </p>
      </Section>

      <Section title="Topics">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 not-prose">
          {topics.map((t) => (
            <Link key={t.href} href={t.href}>
              <GlassCard className="p-5 group h-full" hover>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-lg">
                  <Network className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
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
