import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Tensor Algebra · Tensor Lab' };

export default function AlgebraPage() {
  return (
    <ContentPage
      category="Module"
      title="Tensor Algebra"
      subtitle="Operations and identities you will use every day"
      description="The complete toolkit of multilinear algebra: products, contractions, n-mode products, and the identities that make algorithms tractable."
      level="Intermediate"
      readTime="~ 3 hours"
      tags={['algebra', 'contraction', 'n-mode-product', 'identities']}
    >
      <Section title="n-mode product">
        <p>
          The n-mode product multiplies a tensor by a matrix along one mode:
        </p>
        <BlockMath>
          {`(\\mathcal{X} \\times_n \\mathbf{A})_{i_1 \\dots i_{n-1} j i_{n+1} \\dots i_N} = \\sum_{i_n} \\mathcal{X}_{i_1 \\dots i_N} \\, \\mathbf{A}_{j, i_n}`}
        </BlockMath>
        <p>
          where <MathExpr>{`\\mathbf{A} \\in \\mathbb{R}^{J \\times I_n}`}</MathExpr> and the result is an order-<MathExpr>{`N`}</MathExpr> tensor with mode <MathExpr>{`n`}</MathExpr> of size <MathExpr>{`J`}</MathExpr>.
        </p>
      </Section>

      <Section title="Properties">
        <ul>
          <li>
            <MathExpr>{`\\mathcal{X} \\times_m \\mathbf{A} \\times_n \\mathbf{B} = \\mathcal{X} \\times_n \\mathbf{B} \\times_m \\mathbf{A}`}</MathExpr>{' '}
            (for <MathExpr>{`m \\neq n`}</MathExpr>)
          </li>
          <li>
            <MathExpr>{`(\\mathcal{X} \\times_n \\mathbf{A}) \\times_n \\mathbf{B} = \\mathcal{X} \\times_n (\\mathbf{B} \\mathbf{A})`}</MathExpr>
          </li>
          <li>
            <MathExpr>{`\\|\\mathcal{X} \\times_n \\mathbf{A}\\|_F = \\|\\mathcal{X}\\|_F \\, \\|\\mathbf{A}\\|_F`}</MathExpr>{' '}
            if <MathExpr>{`\\mathbf{A}`}</MathExpr> has orthonormal rows
          </li>
        </ul>
      </Section>

      <Section title="Tensor contraction">
        <p>
          A <strong>tensor contraction</strong> sums over a pair of matching indices of
          two tensors. For <MathExpr>{`\\mathcal{A} \\in \\mathbb{R}^{I \\times J \\times K}`}</MathExpr>{' '}
          and <MathExpr>{`\\mathcal{B} \\in \\mathbb{R}^{J \\times L \\times M}`}</MathExpr>:
        </p>
        <BlockMath>
          {`\\mathcal{C}_{iklm} = \\sum_j \\mathcal{A}_{ijk} \\, \\mathcal{B}_{jlm}`}
        </BlockMath>
        <p>
          Contractions are at the heart of every tensor network. The cost depends
          strongly on the contraction order.
        </p>
      </Section>

      <Section title="Useful identities">
        <BlockMath>
          {`\\text{vec}(\\mathcal{X} \\times_n \\mathbf{A}) = (\\mathbf{A} \\otimes \\mathbf{I}_{\\bar n}) \\, \\text{vec}(\\mathcal{X})`}
        </BlockMath>
        <BlockMath>
          {`(\\mathcal{A} \\times_1 \\mathbf{B}^{(1)} \\cdots \\times_N \\mathbf{B}^{(N)})_{(n)} = \\mathbf{B}^{(n)} \\, \\mathcal{A}_{(n)} \\, (\\mathbf{B}^{(N)} \\otimes \\cdots \\otimes \\mathbf{B}^{(n+1)} \\otimes \\mathbf{B}^{(n-1)} \\otimes \\cdots \\otimes \\mathbf{B}^{(1)})^T`}
        </BlockMath>
      </Section>

      <Section title="Python: n-mode product">
        <CodeBlock language="python" filename="n_mode.py">{`import tensorly as tl
import numpy as np

X = tl.tensor(np.random.rand(10, 20, 30))
A = np.random.rand(5, 10)  # mode-0 factor
B = np.random.rand(8, 20)  # mode-1 factor
C = np.random.rand(7, 30)  # mode-2 factor

# Apply A along mode 0
Y = tl.tenalg.mode_dot(X, A, mode=0)
print("After mode-0 dot:", Y.shape)  # (5, 20, 30)

# Multiple modes
Y = tl.tenalg.multi_mode_dot(X, [A, B, C], modes=[0, 1, 2])
print("After 3 mode dots:", Y.shape)  # (5, 8, 7)

# Equivalent to einsum
Y_eq = np.einsum('ij,jk,lm->ilm', A, B, np.einsum('pq,qr->pr', X, C.T))
print("Match:", np.allclose(Y, Y_eq.transpose(0, 2, 1), atol=1e-6))`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
