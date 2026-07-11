import Link from 'next/link';
import { ContentPage, Section } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { Eye, ArrowRight, Sparkles } from 'lucide-react';

export const metadata = { title: 'Visualization · Tensor Lab' };

const topics = [
  { title: 'Tensor Viewer', href: '/visualization/viewer', desc: 'Interactive 3D rotation of any tensor' },
  { title: 'CP Animation', href: '/visualization/cp', desc: 'See CP components assemble a tensor' },
  { title: 'Tucker Animation', href: '/visualization/tucker', desc: 'Core × factors visualize' },
  { title: 'TT Animation', href: '/visualization/tt', desc: 'TT cores with adjustable bond dimension' },
  { title: 'MPS / MERA', href: '/visualization/mps', desc: 'Quantum-state visualization' },
  { title: 'Singular Values', href: '/visualization/svd', desc: 'Singular value spectrum, log scale' },
];

export default function VizPage() {
  return (
    <ContentPage
      category="Module"
      title="Visualization"
      subtitle="The visual heart of Tensor Lab"
      description="Interactive 3D tensor viewers, animated decompositions, and live parameter exploration. See the math come alive."
      level="All"
      readTime="Self-paced"
      tags={['visualization', 'interactive', '3D', 'animation']}
    >
      <Section title="What you can do">
        <p>
          The visualization module is the most distinctive part of Tensor Lab. Every
          page is a self-contained interactive playground: rotate, scale, drag
          sliders, watch convergence curves draw in real time.
        </p>
      </Section>

      <Section title="Topics">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 not-prose">
          {topics.map((t) => (
            <Link key={t.href} href={t.href}>
              <GlassCard className="p-5 group h-full" hover>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-lg">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-3 flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  Open
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
