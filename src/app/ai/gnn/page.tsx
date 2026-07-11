import { ContentPage, Section } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Graph Neural Networks · Tensor Lab' };

export default function GNNPage() {
  return (
    <ContentPage
      category="AI Applications"
      title="Tensorized Graph Neural Networks"
      subtitle="Low-rank graph filters and embeddings"
      description="Graph signals live on nodes; graph filters are polynomials of the adjacency. Tensor decompositions of these operators give scalable, expressive GNNs."
      level="Research"
      readTime="~ 15 min"
      tags={['GNN', 'graph', 'tensor', 'low-rank', 'spectral']}
      prev={{ title: 'Recommender', href: '/ai/recsys' }}
      next={{ title: 'Quantum Information', href: '/quantum' }}
    >
      <Section title="Graph filters as polynomials">
        <p>
          A graph convolutional filter can be written as a polynomial in the normalized
          adjacency:
        </p>
        <BlockMath>
          {`\\mathbf{H}_{out} = \\sum_{k=0}^{K-1} \\theta_k \\, \\hat{\\mathbf{A}}^k \\, \\mathbf{H}_{in}`}
        </BlockMath>
        <p>
          For a graph with <MathExpr>{`N`}</MathExpr> nodes and feature dim{' '}
          <MathExpr>{`d`}</MathExpr>, the per-layer weight tensor is{' '}
          <MathExpr>{`N \\times d \\times d \\times K`}</MathExpr> — huge for real graphs.
        </p>
      </Section>

      <Section title="Tucker decomposition of filters">
        <p>
          Decompose the filter tensor <MathExpr>{`\\mathcal{W} \\in \\mathbb{R}^{N \\times d \\times d \\times K}`}</MathExpr>{' '}
          as a Tucker tensor with a small core. The number of parameters drops from{' '}
          <MathExpr>{`O(Nd^2 K)`}</MathExpr> to <MathExpr>{`O(R_N R_d^2 R_K)`}</MathExpr>.
        </p>
      </Section>

      <Section title="Tengan: a tensorized GNN">
        <p>
          <strong>Tengan</strong> (Chen et al., 2022) uses TT-format node embeddings
          and Tucker-format graph filters. It achieves state-of-the-art on several
          OGB benchmarks with 10×–100× fewer parameters.
        </p>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tengan</div>
          <div className="text-sm">
            Chen, C. et al. (2022). <em>Tengan: Pure Tensor-Oriented Graph Modeling
            Framework for Multi-modal Data.</em> ICLR.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
