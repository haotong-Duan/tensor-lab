import Link from 'next/link';
import { ContentPage, Section, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { Code2, ArrowRight, Cpu, Layers, Brain, Atom } from 'lucide-react';

export const metadata = { title: 'Code Center · Tensor Lab' };

const languages = [
  { title: 'Python (NumPy)', href: '/code/python', desc: 'Pure NumPy implementations of every algorithm', icon: Code2, color: 'from-blue-500 to-cyan-500' },
  { title: 'Python (TensorLy)', href: '/code/tensorly', desc: 'High-level CP, Tucker, TT, TR decompositions', icon: Code2, color: 'from-violet-500 to-purple-500' },
  { title: 'Python (PyTorch)', href: '/code/pytorch', desc: 'GPU-accelerated, autograd-friendly', icon: Cpu, color: 'from-orange-500 to-red-500' },
  { title: 'Python (JAX)', href: '/code/jax', desc: 'Composable, JIT, vmap, pmap', icon: Atom, color: 'from-emerald-500 to-teal-500' },
  { title: 'MATLAB (Tensor Toolbox)', href: '/code/matlab', desc: 'The original, mature, comprehensive', icon: Brain, color: 'from-amber-500 to-orange-500' },
];

export default function CodePage() {
  return (
    <ContentPage
      category="Module"
      title="Code Center"
      subtitle="Every algorithm, in every major framework"
      description="Reference implementations in NumPy, TensorLy, PyTorch, JAX, and MATLAB. Copy, run, modify, learn."
      level="All"
      readTime="Self-paced"
      tags={['python', 'numpy', 'pytorch', 'jax', 'matlab', 'tensorly']}
    >
      <Section title="Languages & Libraries">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 not-prose">
          {languages.map((l) => (
            <Link key={l.href} href={l.href}>
              <GlassCard className="p-5 group h-full" hover>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                  <l.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{l.title}</h3>
                <p className="text-sm text-muted-foreground">{l.desc}</p>
                <div className="mt-3 flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  Browse examples
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
