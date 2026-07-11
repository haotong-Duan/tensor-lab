import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Tensorization · Tensor Lab' };

export default function TensorizationPage() {
  return (
    <ContentPage
      category="Tensor Basics"
      title="Tensorization"
      subtitle="Embedding a vector or matrix into a higher-order tensor"
      description="Tensorization reshapes a vector (or matrix) into a higher-order tensor so that a low-rank decomposition in the new format captures more structure."
      level="Advanced"
      readTime="8 min"
      tags={['tensorization', 'reshaping', 'TT-format', 'TT-Layer']}
      prev={{ title: 'Matricization', href: '/basics/matricization' }}
      next={{ title: 'Tensor Basics', href: '/basics' }}
    >
      <Section title="Idea">
        <p>
          Given a vector <MathExpr>{`\\mathbf{x} \\in \\mathbb{R}^{I_1 I_2 \\cdots I_N}`}</MathExpr>,
          reshape it as a tensor:
        </p>
        <BlockMath>
          {`\\mathcal{X} = \\text{reshape}(\\mathbf{x}, (I_1, I_2, \\dots, I_N)) \\in \\mathbb{R}^{I_1 \\times \\cdots \\times I_N}`}
        </BlockMath>
        <p>
          A TT decomposition of <MathExpr>{`\\mathcal{X}`}</MathExpr> is now a
          compact representation of the original vector.
        </p>
      </Section>

      <Section title="Tensorizing neural networks">
        <p>
          A fully-connected layer <MathExpr>{`\\mathbf{y} = \\mathbf{W} \\mathbf{x}`}</MathExpr>{' '}
          has <MathExpr>{`I \\cdot J`}</MathExpr> parameters in{' '}
          <MathExpr>{`\\mathbf{W} \\in \\mathbb{R}^{J \\times I}`}</MathExpr>. Reshape{' '}
          <MathExpr>{`\\mathbf{W}`}</MathExpr> into a <MathExpr>{`(J_1, J_2, \\dots) \\times (I_1, I_2, \\dots)`}</MathExpr>{' '}
          tensor and apply TT decomposition: parameter count drops from{' '}
          <MathExpr>{`IJ`}</MathExpr> to <MathExpr>{`O(r^2 \\sqrt{IJ})`}</MathExpr>.
        </p>
        <BlockMath>
          {`\\mathbf{W}[j_1 \\dots j_N, i_1 \\dots i_N] = \\mathbf{G}_1[j_1, i_1] \\, \\mathbf{G}_2[j_2, i_2] \\, \\cdots \\, \\mathbf{G}_N[j_N, i_N]`}
        </BlockMath>
      </Section>

      <Section title="Why it works">
        <p>
          The key insight: most natural data (images, sequences, weight matrices of
          trained networks) has low "TT-rank" when reshaped into a tensor. The
          original linear structure is preserved, but the new format admits
          exponentially more compact representations.
        </p>
      </Section>

      <Section title="Python: TT-format linear layer">
        <CodeBlock language="python" filename="tensorization.py">{`import numpy as np
import torch.nn as nn

# A 1024x1024 weight matrix has 1M parameters.
# Tensorize as (8,8,8,8) x (8,8,8,8) and apply TT with rank 4:
# Params: 4 * 4 * 8 + (N-2) * 4^2 * 8^2 + 4 * 4 * 8 = 128 + 1536 + 128 = 1792
# That's a 558x reduction!

# Sketched code:
class TTLayer(nn.Module):
    def __init__(self, in_shape, out_shape, tt_ranks):
        super().__init__()
        self.cores = nn.ParameterList([
            nn.Parameter(torch.randn(tt_ranks[k], in_shape[k], out_shape[k], tt_ranks[k+1]) * 0.01)
            for k in range(len(in_shape))
        ])

    def forward(self, x):
        # x has shape (..., prod(in_shape))
        # Reshape to (..., *in_shape)
        x = x.view(*x.shape[:-1], *[s for s in zip(*[iter([1]*len(self.cores[0].shape[1:]))])])
        # ... contraction logic ...
        return out.view(x.shape[0], -1)`}</CodeBlock>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tensorizing Neural Networks</div>
          <div className="text-sm">
            Novikov, A. et al. (2015). <em>Tensorizing neural networks.</em> NeurIPS.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
