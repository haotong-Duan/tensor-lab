import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Robust Tensor PCA · Tensor Lab' };

export default function RobustTensorPCA() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="Robust Tensor PCA"
      subtitle="Low-rank plus sparse decomposition"
      description="Decompose a tensor as the sum of a low-rank component and a sparse corruption. The tensor analog of Robust PCA, with multiple formulations (tensor RPCA, tensor LRR, t-SVD based)."
      level="Advanced"
      readTime="~ 25 min"
      tags={['RPCA', 'robust-PCA', 'low-rank', 'sparse', 'tensor-PCA', 't-SVD']}
      prev={{ title: 'Sparse & Nonnegative', href: '/decompositions/sparse' }}
      next={{ title: 'Tensor Completion', href: '/decompositions/completion' }}
    >
      <Section title="Problem formulation">
        <p>
          Given a tensor <MathExpr>{`\\mathcal{X}`}</MathExpr> that is the sum of a
          low-rank part <MathExpr>{`\\mathcal{L}`}</MathExpr> and a sparse corruption{' '}
          <MathExpr>{`\\mathcal{S}`}</MathExpr>, recover both:
        </p>
        <BlockMath>
          {`\\mathcal{X} = \\mathcal{L} + \\mathcal{S}, \\quad \\text{rank}(\\mathcal{L}) \\le R, \\quad \\|\\mathcal{S}\\|_0 \\le k`}
        </BlockMath>
      </Section>

      <Section title="Convex relaxation">
        <p>
          Following the matrix Robust PCA result of Candès et al. (2011), the
          natural convex relaxation is:
        </p>
        <BlockMath>
          {`\\min_{\\mathcal{L}, \\mathcal{S}} \\|\\mathcal{L}\\|_\\star + \\lambda \\|\\mathcal{S}\\|_1 \\quad \\text{s.t. } \\mathcal{X} = \\mathcal{L} + \\mathcal{S}`}
        </BlockMath>
        <p>
          The choice of tensor nuclear norm <MathExpr>{`\\|\\cdot\\|_\\star`}</MathExpr>{' '}
          depends on the formulation. The most common is the <strong>t-SVD based</strong>{' '}
          nuclear norm: the sum of singular values of all frontal slices in the
          Fourier domain.
        </p>
      </Section>

      <Section title="Algorithm: tensor IALM">
        <p>
          The standard solver is the <strong>Inexact Augmented Lagrangian Method</strong>{' '}
          (t-IALM):
        </p>
        <BlockMath>
          {`\\mathcal{L}_{k+1} = \\arg\\min_{\\mathcal{L}} \\frac{1}{2} \\|\\mathcal{X} - \\mathcal{L} - \\mathcal{S}_k + \\mathcal{Y}_k / \\mu_k\\|_F^2 + \\frac{1}{\\mu_k} \\|\\mathcal{L}\\|_\\star`}
        </BlockMath>
        <BlockMath>
          {`\\mathcal{S}_{k+1} = \\arg\\min_{\\mathcal{S}} \\frac{1}{\\mu_k} \\|\\mathcal{S}\\|_1 + \\frac{1}{2} \\|\\mathcal{X} - \\mathcal{L}_{k+1} - \\mathcal{S} + \\mathcal{Y}_k / \\mu_k\\|_F^2`}
        </BlockMath>
        <p>
          Each sub-problem has a closed-form solution via the tensor singular value
          thresholding operator.
        </p>
      </Section>

      <Section title="Applications">
        <ul>
          <li><strong>Video surveillance</strong>: background (low-rank) + moving objects (sparse).</li>
          <li><strong>Hyperspectral imaging</strong>: material signatures (low-rank) + anomalies (sparse).</li>
          <li><strong>Medical imaging</strong>: anatomical structure + lesion segmentation.</li>
          <li><strong>Recommender systems</strong>: user-item interactions + adversarial attacks.</li>
        </ul>
      </Section>

      <Section title="Python: t-RPCA">
        <CodeBlock language="python" filename="trpca.py">{`import numpy as np

def t_singular_value_threshold(X, tau):
    """Tensor SVT operator."""
    n3 = X.shape[2]
    Xf = np.fft.fft(X, axis=2)
    Uf = np.zeros_like(Xf, dtype=complex)
    Sf = np.zeros_like(Xf, dtype=complex)
    Vf = np.zeros((X.shape[1], X.shape[1], n3), dtype=complex)
    for k in range(n3):
        U, S, Vt = np.linalg.svd(Xf[:, :, k], full_matrices=False)
        S = np.maximum(S - tau, 0)
        Uf[:, :, k] = U
        Sf[:, :, k] = np.diag(S)
        Vf[:, :, k] = Vt.conj().T
    U = np.fft.ifft(Uf, axis=2).real
    S = np.fft.ifft(Sf, axis=2).real
    V = np.fft.ifft(Vf, axis=2).real
    return np.einsum('ijz,jkz,ikz->ikz', U, S, V)

def t_rpca(X, lam=None, rho=1.1, max_iter=100, tol=1e-7):
    """Tensor RPCA via t-SVD."""
    n1, n2, n3 = X.shape
    if lam is None:
        lam = 1.0 / np.sqrt(max(n1, n2) * n3)
    L = np.zeros_like(X)
    S = np.zeros_like(X)
    Y = X / np.linalg.norm(X, 'fro')
    mu = 1.25 / np.linalg.norm(X, 2)
    for it in range(max_iter):
        L = t_singular_value_threshold(X - S + Y / mu, 1.0 / mu)
        S = np.sign(X - L + Y / mu) * np.maximum(
            np.abs(X - L + Y / mu) - lam / mu, 0
        )
        Y = Y + mu * (X - L - S)
        mu = min(mu * rho, mu * 1e7)
        if np.linalg.norm(X - L - S, 'fro') < tol:
            break
    return L, S`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">t-RPCA</div>
            <div className="text-sm">
              Lu, C. et al. (2020). <em>Tensor Robust Principal Component Analysis with
              a New Tensor Nuclear Norm.</em> IEEE TPAMI, 42(4), 925-938.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
