import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 't-SVD · Tensor Lab' };

export default function TSVDPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="t-SVD — Tensor Singular Value Decomposition"
      subtitle="A matrix-style SVD for 3rd-order tensors"
      description="The t-product treats 3rd-order tensors as matrices of tubes, using the discrete Fourier transform along the third mode. Yields a clean, SVD-like factorization with convex geometry."
      level="Advanced"
      readTime="~ 25 min"
      tags={['t-SVD', 't-product', 'tube', 'FFT', 'Kilmer', 'Martin']}
      prev={{ title: 'BTD', href: '/decompositions/btd' }}
      next={{ title: 'Tensor CUR', href: '/decompositions/cur' }}
    >
      <Section title="The t-product">
        <p>
          For two 3rd-order tensors <MathExpr>{`\\mathcal{A} \\in \\mathbb{R}^{n_1 \\times n_2 \\times n_3}`}</MathExpr>{' '}
          and <MathExpr>{`\\mathcal{B} \\in \\mathbb{R}^{n_2 \\times n_4 \\times n_3}`}</MathExpr>,
          the <strong>t-product</strong> <MathExpr>{`\\mathcal{C} = \\mathcal{A} * \\mathcal{B}`}</MathExpr>{' '}
          is defined as a circular convolution along the tubes:
        </p>
        <BlockMath>
          {`\\mathcal{C}(i, j, :) = \\sum_{k=1}^{n_2} \\mathcal{A}(i, k, :) \\circ \\mathcal{B}(k, j, :)`}
        </BlockMath>
        <p>
          where <MathExpr>{`\\circ`}</MathExpr> is circular convolution. Taking FFT
          along the third mode turns convolution into pointwise multiplication, so
          the t-product becomes a matrix product in the Fourier domain.
        </p>
      </Section>

      <Section title="t-SVD theorem">
        <Callout type="definition" title="t-SVD (Kilmer & Martin, 2001)">
          Every <MathExpr>{`\\mathcal{A} \\in \\mathbb{R}^{n_1 \\times n_2 \\times n_3}`}</MathExpr>{' '}
          admits a factorization
          <BlockMath>
            {`\\mathcal{A} = \\mathcal{U} * \\mathcal{S} * \\mathcal{V}^T`}
          </BlockMath>
          where <MathExpr>{`\\mathcal{U}, \\mathcal{V}`}</MathExpr> are{' '}
          <em>orthogonal</em> tensors and <MathExpr>{`\\mathcal{S}`}</MathExpr> is an{' '}
          <em>f-diagonal</em> tensor (each frontal slice is diagonal).
        </Callout>
      </Section>

      <Section title="Algorithm">
        <ol>
          <li>Compute the FFT of <MathExpr>{`\\mathcal{A}`}</MathExpr> along mode 3, getting{' '}
            <MathExpr>{`n_3`}</MathExpr> frontal slices.</li>
          <li>Compute the SVD of each slice:{' '}
            <MathExpr>{`\\bar{\\mathbf{A}}^{(k)} = \\bar{\\mathbf{U}}^{(k)} \\bar{\\mathbf{S}}^{(k)} \\bar{\\mathbf{V}}^{(k)T}`}</MathExpr>.</li>
          <li>Inverse FFT to obtain <MathExpr>{`\\mathcal{U}, \\mathcal{S}, \\mathcal{V}`}</MathExpr>.</li>
        </ol>
      </Section>

      <Section title="Tensor Robust PCA via t-SVD">
        <p>
          The <strong>tensor robust PCA</strong> problem is:
        </p>
        <BlockMath>
          {`\\min_{\\mathcal{L}, \\mathcal{S}} \\|\\mathcal{L}\\|_\\star + \\lambda \\|\\mathcal{S}\\|_1 \\quad \\text{s.t. } \\mathcal{X} = \\mathcal{L} + \\mathcal{S}`}
        </BlockMath>
        <p>
          where <MathExpr>{`\\|\\mathcal{L}\\|_\\star`}</MathExpr> is the{' '}
          <em>tensor nuclear norm</em> (sum of singular values of frontal slices) and{' '}
          <MathExpr>{`\\mathcal{S}`}</MathExpr> is sparse noise. This convex problem
          can be solved efficiently via the <strong>t-SVD</strong>-based
          proximal gradient method.
        </p>
      </Section>

      <Section title="Python">
        <CodeBlock language="python" filename="t_svd.py">{`import numpy as np

def t_svd(X):
    """Compute t-SVD of a 3rd-order tensor."""
    n1, n2, n3 = X.shape
    # FFT along mode 3
    Xf = np.fft.fft(X, axis=2)

    Uf = np.zeros((n1, n1, n3), dtype=complex)
    Sf = np.zeros((n1, n2, n3), dtype=complex)
    Vf = np.zeros((n2, n2, n3), dtype=complex)

    for k in range(n3):
        U, S, Vt = np.linalg.svd(Xf[:, :, k], full_matrices=True)
        Uf[:, :, k] = U
        Sf[:, :, k] = np.diag(S)
        Vf[:, :, k] = Vt.conj().T

    U = np.fft.ifft(Uf, axis=2).real
    S = np.fft.ifft(Sf, axis=2).real
    V = np.fft.ifft(Vf, axis=2).real
    return U, S, V

# Low-rank approximation
def t_svd_truncate(X, tau):
    U, S, V = t_svd(X)
    # Threshold the diagonal of S
    for k in range(S.shape[2]):
        S[:, :, k] = np.maximum(S[:, :, k] - tau, 0)
    # Reconstruct
    return np.einsum('ijz,jkz,ikz->ikz', U, S, V)`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">t-SVD</div>
            <div className="text-sm">
              Kilmer, M. E. & Martin, C. D. (2011). <em>Factorization strategies for
              third-order tensors.</em> Linear Algebra Appl., 435(3), 641-658.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tensor RPCA</div>
            <div className="text-sm">
              Lu, C. et al. (2020). <em>Tensor Robust Principal Component Analysis with
              a New Tensor Nuclear Norm.</em> IEEE TPAMI.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
