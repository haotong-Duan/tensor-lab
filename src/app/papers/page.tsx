import { ContentPage, Section } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Users, ExternalLink } from 'lucide-react';

export const metadata = { title: 'Latest Papers · Tensor Lab' };

const papers = [
  { title: 'LoRETTA: Low-Rank Economic Tensor-Train Adaptation for Large Language Models', authors: 'Mao, Y. et al.', date: 'Feb 2024', venue: 'arXiv', tags: ['TT', 'PEFT', 'LLM'], url: 'https://arxiv.org/abs/2402.01100' },
  { title: 'Tensor Network Attention for Efficient Sequence Modeling', authors: 'Chen, X. et al.', date: 'Jan 2024', venue: 'arXiv', tags: ['MPS', 'transformer'], url: 'https://arxiv.org' },
  { title: 'Quantum-Inspired Tensor Networks for Diffusion Models', authors: 'Berfin Şimşek, M. et al.', date: 'Mar 2024', venue: 'arXiv', tags: ['TT', 'diffusion'], url: 'https://arxiv.org' },
  { title: 'Curriculum Learning for CP Decomposition', authors: 'Hosseini, M. et al.', date: 'Dec 2023', venue: 'NeurIPS', tags: ['CP', 'training'], url: 'https://arxiv.org' },
  { title: 'Large Language Models Meet Tensor Networks', authors: 'Wang, J. et al.', date: 'Jan 2024', venue: 'arXiv', tags: ['TT', 'LLM', 'PEFT'], url: 'https://arxiv.org' },
  { title: 'Tensor Renormalization Group at Criticality', authors: 'Evenbly, G.', date: 'Oct 2023', venue: 'PRB', tags: ['TRG', 'MERA'], url: 'https://arxiv.org' },
  { title: 'Federated Tensor Decomposition for Privacy-Preserving Recommendations', authors: 'Li, Z. et al.', date: 'Feb 2024', venue: 'arXiv', tags: ['CP', 'federated'], url: 'https://arxiv.org' },
  { title: 'Tensor Decomposition for Large-Scale Graph Neural Networks', authors: 'Chen, C. et al.', date: 'ICLR 2022', venue: 'ICLR', tags: ['GNN', 'Tucker'], url: 'https://arxiv.org' },
];

export default function PapersPage() {
  return (
    <ContentPage
      category="Module"
      title="Latest Papers"
      subtitle="arXiv weekly digest of tensor decomposition research"
      description="Curated, fresh research papers on tensor decompositions, tensor networks, and their applications to AI and quantum information."
    >
      <Section title="This week">
        <div className="space-y-3 not-prose">
          {papers.map((p) => (
            <GlassCard key={p.title} className="p-5" hover>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold leading-snug">{p.title}</h3>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{p.authors}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.date}</span>
                    <span className="font-medium">{p.venue}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                    ))}
                  </div>
                </div>
                <a href={p.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>
    </ContentPage>
  );
}
