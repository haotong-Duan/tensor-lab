import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Matricization · Tensor Lab' };

export default function MatricizationPage() {
  return (
    <ContentPage
      category="Tensor Basics"
      title="Matricization (Unfolding)"
      subtitle="Reshaping a tensor into a matrix"
      description="Matricization rearranges the entries of a tensor into a matrix by grouping all indices except one. The mode-n unfolding is the foundation of HOSVD and HOOI."
      level="Intermediate"
      readTime="10 min"
      tags={['matricization', 'unfolding', 'mode-n', 'HOSVD']}
      prev={{ title: 'Einstein Summation', href: '/basics/einsum' }}
      next={{ title: 'Tensorization', href: '/basics/tensorization' }}
    >
      <Section title="Mode-n unfolding">
        <p>
          The <strong>mode-n unfolding</strong> (or matricization) of{' '}
          <MathExpr>{`\\mathcal{X} \\in \\mathbb{R}^{I_1 \\times \\cdots \\times I_N}`}</MathExpr>{' '}
          is the matrix
        </p>
        <BlockMath>
          {`\\mathcal{X}_{(n)} \\in \\mathbb{R}^{I_n \\times (I_1 \\cdots I_{n-1} I_{n+1} \\cdots I_N)}`}
        </BlockMath>
        <p>
          whose rows are indexed by <MathExpr>{`i_n`}</MathExpr> and whose columns are
          indexed by the tuple <MathExpr>{`(i_1, \\dots, i_{n-1}, i_{n+1}, \\dots, i_N)`}</MathExpr>.
        </p>
      </Section>

      <Section title="Example: 3D tensor">
        <p>
          For a 3rd-order tensor <MathExpr>{`\\mathcal{X} \\in \\mathbb{R}^{I_1 \\times I_2 \\times I_3}`}</MathExpr>,
          the three unfoldings are
        </p>
        <BlockMath>
          {`\\mathcal{X}_{(1)} \\in \\mathbb{R}^{I_1 \\times I_2 I_3}, \\quad \\mathcal{X}_{(2)} \\in \\mathbb{R}^{I_2 \\times I_1 I_3}, \\quad \\mathcal{X}_{(3)} \\in \\mathbb{R}^{I_3 \\times I_1 I_2}`}
        </BlockMath>
        <p>
          Different conventions exist (column-major vs row-major ordering). We use the
          one where <MathExpr>{`\\mathcal{X}_{(n)}[i_n, \\overline{i_1 \\dots i_{n-1} i_{n+1} \\dots i_N}] = \\mathcal{X}_{i_1 \\dots i_N}`}</MathExpr>.
        </p>
      </Section>

      <Section title="Why it matters">
        <ul>
          <li>
            <strong>HOSVD</strong>: take the SVD of each mode-n unfolding.
          </li>
          <li>
            <strong>CP-ALS</strong>: the sub-problem for factor{' '}
            <MathExpr>{`\\mathbf{A}^{(n)}`}</MathExpr> is a least-squares problem
            involving the mode-n unfolding.
          </li>
          <li>
            <strong>Tensor-Train</strong>: TT cores are obtained by SVDs of successive
            unfoldings.
          </li>
        </ul>
      </Section>

      <Section title="Python: unfolding with TensorLy">
        <CodeBlock language="python" filename="matricization.py">{`import tensorly as tl
import numpy as np

X = tl.tensor(np.random.rand(4, 5, 6))

# Mode-n unfolding
X_1 = tl.unfold(X, 0)  # shape (4, 30)
X_2 = tl.unfold(X, 1)  # shape (5, 24)
X_3 = tl.unfold(X, 2)  # shape (6, 20)

# Refold back
X_back = tl.fold(X_1, 0, (4, 5, 6))
print("Unfolding + refolding roundtrip:", tl.norm(X - X_back))

# HOSVD: SVD of each unfolding
from tensorly.decomposition import tucker
(core, factors), _ = tucker(X, rank=[2, 3, 2], n_iter_max=1)
print("Core shape:", core.shape)
print("Factor shapes:", [f.shape for f in factors])`}</CodeBlock>
      </Section>

      <Section title="MATLAB: reshape vs permute">
        <p>
          In MATLAB, unfolding is a combination of <code>reshape</code> and{' '}
          <code>permute</code>:
        </p>
        <CodeBlock language="matlab" filename="matricization.m">{`X = rand(4, 5, 6);

% Mode-1 unfolding: bring mode 1 to the front
X1 = reshape(permute(X, [1 2 3]), 4, 30);  % already in mode-1 order
% General: bring mode n to the front, then reshape
n = 2;
order = 1:ndims(X);
order = [n, order(order ~= n)];
X_n = reshape(permute(X, order), size(X, n), []);`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
