import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Outer Product · Tensor Lab' };

export default function OuterProductPage() {
  return (
    <ContentPage
      category="Tensor Basics"
      title="Outer Product"
      subtitle="Building higher-dimensional tensors from vectors"
      description="The outer product of N vectors is a rank-1 tensor. The building block of CP decomposition."
      level="Beginner"
      readTime="8 min"
      tags={['outer-product', 'rank-1', 'CP']}
      prev={{ title: 'Norms & Inner Product', href: '/basics/norm' }}
      next={{ title: 'Kronecker Product', href: '/basics/kronecker' }}
    >
      <Section title="Definition">
        <p>
          Given <MathExpr>{`N`}</MathExpr> vectors{' '}
          <MathExpr>{`\\mathbf{a}^{(1)} \\in \\mathbb{R}^{I_1}, \\dots, \\mathbf{a}^{(N)} \\in \\mathbb{R}^{I_N}`}</MathExpr>,
          their outer product is
        </p>
        <BlockMath>
          {`\\mathcal{X} = \\mathbf{a}^{(1)} \\circ \\mathbf{a}^{(2)} \\circ \\cdots \\circ \\mathbf{a}^{(N)} \\in \\mathbb{R}^{I_1 \\times \\cdots \\times I_N}`}
        </BlockMath>
        <p>
          with entries
        </p>
        <BlockMath>
          {`\\mathcal{X}_{i_1 \\dots i_N} = a^{(1)}_{i_1} \\, a^{(2)}_{i_2} \\, \\cdots \\, a^{(N)}_{i_N}`}
        </BlockMath>
      </Section>

      <Section title="Rank-1 tensors">
        <p>
          Any tensor that can be written as a single outer product is called{' '}
          <strong>rank-1</strong>. A general tensor is a sum of rank-1 tensors — and
          the smallest number of such terms is its rank.
        </p>
      </Section>

      <Section title="Visualization">
        <p>
          For a 3rd-order rank-1 tensor, each mode-3 fiber{' '}
          <MathExpr>{`\\mathcal{X}_{ij:}`}</MathExpr> is a scalar multiple of{' '}
          <MathExpr>{`\\mathbf{a}^{(3)}`}</MathExpr>. Each mode-1 fiber is a multiple
          of <MathExpr>{`\\mathbf{a}^{(1)}`}</MathExpr>, etc. The "direction" along
          each mode is fixed.
        </p>
      </Section>

      <Section title="Python">
        <CodeBlock language="python" filename="outer.py">{`import numpy as np
import tensorly as tl

a = np.array([1, 2, 3])
b = np.array([4, 5])
c = np.array([6, 7, 8, 9])

# Outer product of three vectors
X = np.einsum('i,j,k->ijk', a, b, c)
print("Shape:", X.shape)        # (3, 2, 4)

# TensorLy: tl.tenalg.outer
X_tl = tl.tenalg.outer([a, b, c])
print("Same shape:", X_tl.shape)

# Verify rank-1
from tensorly.decomposition import parafac
(_, factors), _ = parafac(X_tl, rank=1, n_iter_max=1)
print("Factor shapes:", [f.shape for f in factors])`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
