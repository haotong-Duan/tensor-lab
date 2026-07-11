import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Tensor Norms · Tensor Lab' };

export default function NormPage() {
  return (
    <ContentPage
      category="Tensor Basics"
      title="Norms & Inner Product"
      subtitle="Measuring size and similarity"
      description="Generalizations of the matrix Frobenius norm to tensors, plus the inner products that underlie CP, Tucker, and TT."
      level="Beginner"
      readTime="10 min"
      tags={['norm', 'Frobenius', 'inner-product', 'Hilbert-Schmidt']}
      prev={{ title: 'Tensor Rank', href: '/basics/rank' }}
      next={{ title: 'Outer Product', href: '/basics/outer-product' }}
    >
      <Section title="Frobenius (Hilbert-Schmidt) norm">
        <p>
          The most common tensor norm is the <strong>Frobenius norm</strong>, the
          straight generalization of the matrix case:
        </p>
        <BlockMath>
          {`\\|\\mathcal{X}\\|_F = \\sqrt{\\sum_{i_1, \\dots, i_N} |\\mathcal{X}_{i_1 \\dots i_N}|^2}`}
        </BlockMath>
        <p>
          It equals the Frobenius norm of any mode-n unfolding, since unfolding is a
          reshaping and doesn't change the entries.
        </p>
      </Section>

      <Section title="ℓ₁ and ℓ_∞ norms">
        <p>
          The entry-wise ℓ₁ norm:
        </p>
        <BlockMath>
          {`\\|\\mathcal{X}\\|_1 = \\sum_{i_1, \\dots, i_N} |\\mathcal{X}_{i_1 \\dots i_N}|`}
        </BlockMath>
        <p>
          The entry-wise ℓ_∞ norm:
        </p>
        <BlockMath>
          {`\\|\\mathcal{X}\\|_\\infty = \\max_{i_1, \\dots, i_N} |\\mathcal{X}_{i_1 \\dots i_N}|`}
        </BlockMath>
      </Section>

      <Section title="Spectral norm">
        <p>
          The operator norm induced by the vector 2-norm on{' '}
          <MathExpr>{`\\mathbb{R}^{I_1 \\times \\cdots \\times I_N}`}</MathExpr> is hard
          to compute in general. A practical surrogate is the largest singular value of
          any unfolding:
        </p>
        <BlockMath>
          {`\\|\\mathcal{X}\\|_\\sigma = \\max_n \\sigma_{\\max}(\\mathcal{X}_{(n)})`}
        </BlockMath>
      </Section>

      <Section title="Inner product">
        <p>
          The Frobenius-norm-inducing inner product is
        </p>
        <BlockMath>
          {`\\langle \\mathcal{X}, \\mathcal{Y} \\rangle = \\sum_{i_1, \\dots, i_N} \\mathcal{X}_{i_1 \\dots i_N} \\, \\mathcal{Y}_{i_1 \\dots i_N} = \\text{vec}(\\mathcal{X})^T \\text{vec}(\\mathcal{Y})`}
        </BlockMath>
        <p>
          The Frobenius norm is <MathExpr>{`\\|\\mathcal{X}\\|_F = \\sqrt{\\langle \\mathcal{X}, \\mathcal{X} \\rangle}`}</MathExpr>.
        </p>
      </Section>

      <Section title="n-mode product & orthogonal projections">
        <p>
          The <strong>n-mode product</strong> multiplies a tensor by a matrix along one
          mode:
        </p>
        <BlockMath>
          {`(\\mathcal{X} \\times_n \\mathbf{A})_{i_1 \\dots i_{n-1} j i_{n+1} \\dots i_N} = \\sum_{i_n} \\mathcal{X}_{i_1 \\dots i_N} \\, \\mathbf{A}_{j, i_n}`}
        </BlockMath>
        <p>
          If <MathExpr>{`\\mathbf{A}`}</MathExpr> has orthonormal rows, the n-mode
          product preserves the Frobenius norm:{' '}
          <MathExpr>{`\\|\\mathcal{X} \\times_n \\mathbf{A}\\|_F = \\|\\mathcal{X}\\|_F`}</MathExpr>.
        </p>
      </Section>

      <Section title="Python: computing norms">
        <CodeBlock language="python" filename="norms.py">{`import tensorly as tl
import numpy as np

X = tl.tensor(np.random.randn(10, 20, 30) * 2)

print("Frobenius norm:", tl.norm(X, 2))      # == tl.norm(X)
print("L1 norm:       ", tl.norm(X, 1))
print("L-inf norm:    ", tl.norm(X, np.inf))

# Spectral norm (max singular value across unfoldings)
spec_norm = 0
for n in range(X.ndim):
    unfolding = tl.unfold(X, n)
    spec_norm = max(spec_norm, np.linalg.norm(unfolding, 2))
print("Spectral norm: ", spec_norm)`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
