'use client';

import { useState, useMemo } from 'react';
import { Search as SearchIcon, Sparkles, FileText, Code2, BookOpen, Atom } from 'lucide-react';
import { ContentPage, Section } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { navigation } from '@/lib/navigation';

type Result = { title: string; description: string; href: string; category: string; type: string };

const dataset: Result[] = [
  { title: 'CP / CANDECOMP / PARAFAC', description: 'Sum of rank-1 tensors; unique under Kruskal condition', href: '/decompositions/cp', category: 'Decomposition', type: 'method' },
  { title: 'Tucker & HOSVD', description: 'Core tensor times orthogonal factor matrices', href: '/decompositions/tucker', category: 'Decomposition', type: 'method' },
  { title: 'Tensor Train (TT)', description: 'Linear chain of 3rd-order cores', href: '/decompositions/tt', category: 'Decomposition', type: 'method' },
  { title: 'Tensor Ring (TR)', description: 'Cyclic train, uniform bond dimensions', href: '/decompositions/tr', category: 'Decomposition', type: 'method' },
  { title: 'MPS / Matrix Product State', description: '1D quantum state representation', href: '/decompositions/mps', category: 'Decomposition', type: 'method' },
  { title: 'PEPS', description: '2D tensor network for quantum states', href: '/decompositions/peps', category: 'Decomposition', type: 'method' },
  { title: 'MERA', description: 'Multi-scale entanglement renormalization ansatz', href: '/decompositions/mera', category: 'Decomposition', type: 'method' },
  { title: 'DMRG', description: 'Density matrix renormalization group', href: '/networks/dmrg', category: 'Algorithm', type: 'algorithm' },
  { title: 'TEBD', description: 'Time evolving block decimation', href: '/networks/tebd', category: 'Algorithm', type: 'algorithm' },
  { title: 'Alternating Least Squares (ALS)', description: 'Block coordinate descent for CP and Tucker', href: '/optimization/als', category: 'Optimization', type: 'algorithm' },
  { title: 'Riemannian Optimization', description: 'Optimization on Stiefel manifold', href: '/optimization/riemannian', category: 'Optimization', type: 'algorithm' },
  { title: 'Tensor Completion', description: 'Recover missing entries via low-rank prior', href: '/decompositions/completion', category: 'Application', type: 'application' },
  { title: 'TT for LLMs', description: 'Tensor train compression of language models', href: '/ai/llm', category: 'AI Application', type: 'application' },
  { title: 'LoRA & PEFT', description: 'Tensorized low-rank adaptation', href: '/ai/lora', category: 'AI Application', type: 'application' },
  { title: 'VQE', description: 'Variational quantum eigensolver', href: '/quantum/vqe', category: 'Quantum', type: 'application' },
  { title: 'Einstein Summation (einsum)', description: 'Compact tensor operation notation', href: '/basics/einsum', category: 'Basics', type: 'concept' },
  { title: 'Khatri-Rao Product', description: 'Column-wise Kronecker product', href: '/basics/khatri-rao', category: 'Basics', type: 'concept' },
  { title: 'TT-SVD Algorithm', description: 'Construction of TT decomposition via SVDs', href: '/decompositions/tt', category: 'Algorithm', type: 'algorithm' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query) return dataset.slice(0, 8);
    const q = query.toLowerCase();
    return dataset.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <ContentPage
      category="Search"
      title="Search"
      subtitle="Find anything across Tensor Lab"
      description="Search decompositions, algorithms, code, papers, and applications."
    >
      <Section title="">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder='Try "tt", "tucker", "PEPS", or "VQE"…'
            className="w-full h-14 pl-12 pr-4 text-lg rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </Section>

      <Section title="Results">
        <div className="space-y-2 not-prose">
          {results.length === 0 ? (
            <div className="text-muted-foreground text-sm py-8 text-center">
              No results for "{query}"
            </div>
          ) : (
            results.map((r) => (
              <Link key={r.href} href={r.href}>
                <GlassCard className="p-4 group" hover>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      {r.type === 'method' && <Sparkles className="w-4 h-4" />}
                      {r.type === 'algorithm' && <Code2 className="w-4 h-4" />}
                      {r.type === 'application' && <BookOpen className="w-4 h-4" />}
                      {r.type === 'concept' && <Atom className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{r.title}</h3>
                        <Badge variant="outline" className="text-[10px]">{r.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{r.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))
          )}
        </div>
      </Section>

      <Section title="Browse by topic">
        <div className="flex flex-wrap gap-2 not-prose">
          {navigation
            .filter((n) => n.href !== '/search' && n.href !== '/settings')
            .map((n) => (
              <Link key={n.href} href={n.href}>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">
                  {n.title}
                </Badge>
              </Link>
            ))}
        </div>
      </Section>
    </ContentPage>
  );
}
