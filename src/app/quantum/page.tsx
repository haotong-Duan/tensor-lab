import Link from 'next/link';
import { ContentPage, Section } from '@/components/content-page';
import { Math as MathExpr } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { Cpu, ArrowRight } from 'lucide-react';

export const metadata = { title: 'Quantum Information · Tensor Lab' };

const topics = [
  { title: 'Quantum States', href: '/quantum/states', desc: 'State vectors, density matrices, mixed states' },
  { title: 'Quantum Circuits', href: '/quantum/circuits', desc: 'Gates, unitaries, measurement' },
  { title: 'Density Matrix', href: '/quantum/density', desc: 'Mixed states, partial trace, entanglement' },
  { title: 'Entanglement', href: '/quantum/entanglement', desc: 'Entanglement entropy, Schmidt rank' },
  { title: 'VQE', href: '/quantum/vqe', desc: 'Variational quantum eigensolver' },
  { title: 'QAOA', href: '/quantum/qaoa', desc: 'Quantum approximate optimization' },
];

export default function QuantumPage() {
  return (
    <ContentPage
      category="Module"
      title="Tensor Networks for Quantum Information"
      subtitle="From quantum states to MPS, PEPS, MERA, and algorithms"
      description="Tensor networks are the natural language of many-body quantum physics. This module covers the foundations and the major algorithms."
      level="Advanced"
      readTime="~ 8 hours"
      tags={['quantum', 'many-body', 'DMRG', 'VQE', 'MPS']}
    >
      <Section title="Why tensor networks?">
        <p>
          An <MathExpr>{`N`}</MathExpr>-qubit pure state has <MathExpr>{`2^N`}</MathExpr>{' '}
          complex amplitudes — exponentially many. But the physical states that arise
          in nature are <em>entanglement-limited</em>, and tensor networks (MPS, PEPS,
          MERA, TTN) are the compact representations that respect this structure.
        </p>
      </Section>

      <Section title="Topics">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 not-prose">
          {topics.map((t) => (
            <Link key={t.href} href={t.href}>
              <GlassCard className="p-5 group h-full" hover>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-lg">
                  <Cpu className="w-5 h-5" />
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
