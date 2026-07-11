import { ContentPage, Section } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, Github, Video } from 'lucide-react';

export const metadata = { title: 'Resources · Tensor Lab' };

const books = [
  { title: 'Tensor Decompositions and Applications', author: 'Kolda & Bader', year: '2009', url: 'https://doi.org/10.1137/07070111X', note: 'The canonical reference for CP, Tucker, HOSVD.' },
  { title: 'The Density-Matrix Renormalization Group', author: 'Schollwöck, U.', year: '2011', url: 'https://arxiv.org/abs/1008.3477', note: 'Comprehensive review of MPS, DMRG, TEBD.' },
  { title: 'A Practical Introduction to Tensor Networks', author: 'Bridgeman, J. & Chubb, C.', year: '2017', url: 'https://arxiv.org/abs/1603.03039', note: 'Graphical, accessible.' },
  { title: 'Multilinear Algebra', author: 'Landsberg, J. M.', year: '2012', url: 'https://www.cambridge.org/9780521766878', note: 'Mathematically rigorous treatment.' },
  { title: 'Tensor Network Contractions', author: 'Biamonte, J. & Bergholm, V.', year: '2017', url: 'https://arxiv.org/abs/1708.00006', note: 'Quantum-inspired networks from the physics perspective.' },
];

const surveys = [
  { title: 'Tensor Networks in Machine Learning', authors: 'Biamonte, J. et al.', venue: 'arXiv 2024' },
  { title: 'Tensor Decompositions: A Comprehensive Review', authors: 'Sidiropoulos, N. D. et al.', venue: 'IEEE SPM 2017' },
  { title: 'A Survey on Tensor Network Theory', authors: 'Orús, R.', venue: 'Nature Reviews Physics 2019' },
];

const software = [
  { name: 'TensorLy', desc: 'Python library for tensor learning', url: 'https://github.com/tensorly/tensorly' },
  { name: 'Tensor Toolbox (MATLAB)', desc: 'Sandia National Labs, comprehensive', url: 'https://www.tensortoolbox.org' },
  { name: 'Tensorlab (MATLAB)', desc: 'Structured optimization', url: 'https://www.tensorlab.net' },
  { name: 'Quimb', desc: 'Python tensor networks for quantum physics', url: 'https://github.com/jcmgray/quimb' },
  { name: 'ITensor', desc: 'C++/Julia tensor networks', url: 'https://itensor.org' },
  { name: 'tntorch', desc: 'Tensor networks in PyTorch', url: 'https://github.com/rballester/tntorch' },
];

export default function ResourcesPage() {
  return (
    <ContentPage category="Module" title="Resources" subtitle="Books, papers, software, lectures">
      <Section title="Books">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 not-prose">
          {books.map((b) => (
            <GlassCard key={b.title} className="p-5" hover>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold leading-snug">{b.title}</h3>
                  <div className="text-xs text-muted-foreground mt-1">
                    {b.author} · {b.year}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1.5">{b.note}</p>
                  <a href={b.url} target="_blank" rel="noreferrer" className="text-xs text-primary mt-2 inline-block hover:underline">
                    Read →
                  </a>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title="Surveys">
        <div className="space-y-2 not-prose">
          {surveys.map((s) => (
            <GlassCard key={s.title} className="p-4" hover>
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 mt-0.5 text-violet-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.authors} · {s.venue}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title="Software">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 not-prose">
          {software.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
              <GlassCard className="p-5 group" hover>
                <div className="w-9 h-9 rounded-lg bg-foreground/5 text-foreground flex items-center justify-center mb-2">
                  <Github className="w-4 h-4" />
                </div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">{s.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </GlassCard>
            </a>
          ))}
        </div>
      </Section>
    </ContentPage>
  );
}
