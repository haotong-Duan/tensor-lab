import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Tensor Completion · Tensor Lab' };

export default function CompletionPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="Tensor Completion"
      subtitle="Recover a low-rank tensor from missing entries"
      description="Given a sparse sampling of a low-rank tensor, recover all missing entries. The tensor analog of matrix completion with broad applications in recommendation, image inpainting, and clinical prediction."
      level="Advanced"
      readTime="~ 25 min"
      tags={['completion', 'matrix-completion', 'low-rank', 'inpainting', 'nuclear-norm']}
      prev={{ title: 'Robust Tensor PCA', href: '/decompositions/rtpca' }}
      next={{ title: 'Streaming & Online', href: '/decompositions/streaming' }}
    >
      <Section title="Problem">
        <p>
          Observe only a subset <MathExpr>{`\\Omega \\subset [I_1] \\times \\cdots \\times [I_N]`}</MathExpr>{' '}
          of entries of a low-rank tensor. Recover the full tensor:
        </p>
        <BlockMath>
          {`\\min_{\\mathcal{X}} \\text{rank}(\\mathcal{X}) \\quad \\text{s.t. } \\mathcal{X}_{i_1 \\dots i_N} = \\mathcal{M}_{i_1 \\dots i_N} \\text{ for all } (i_1, \\dots, i_N) \\in \\Omega`}
        </BlockMath>
      </Section>

      <Section title="Convex relaxation">
        <p>
          The rank function is replaced by a nuclear norm. For CP-style completion, the
          factor formulation is more efficient:
        </p>
        <BlockMath>
          {`\\min_{\\mathbf{A}^{(1)}, \\dots, \\mathbf{A}^{(N)}} \\sum_{(i_1, \\dots, i_N) \\in \\Omega} \\left( \\mathcal{M}_{i_1 \\dots i_N} - \\sum_{r=1}^{R} \\prod_{n=1}^{N} A^{(n)}_{i_n, r} \\right)^2`}
        </BlockMath>
      </Section>

      <Section title="Algorithms">
        <ul>
          <li>
            <strong>CP-WOPT</strong>: weighted ALS on the observed entries only.
          </li>
          <li>
            <strong>HaLRTC</strong>: High-accuracy Low-Rank Tensor Completion via
            nuclear norm minimization.
          </li>
          <li>
            <strong>SiLRTC</strong>: Simple Low-Rank Tensor Completion via
            separate nuclear norms per mode.
          </li>
          <li>
            <strong>Smooth PARAFAC</strong>: gradient descent on a smooth surrogate
            (used in recommender systems).
          </li>
        </ul>
      </Section>

      <Section title="Sample complexity">
        <p>
          For an order-<MathExpr>{`N`}</MathExpr> Tucker tensor of multilinear rank{' '}
          <MathExpr>{`(R_1, \\dots, R_N)`}</MathExpr> in <MathExpr>{`\\mathbb{R}^{I^N}`}</MathExpr>{' '}
          with <MathExpr>{`I`}</MathExpr> the typical size, the number of samples
          needed for exact recovery (with high probability) is on the order of
        </p>
        <BlockMath>
          {`m = O\\left( N R I^{N-1} \\log^2 I \\right)`}
        </BlockMath>
        <p>
          This is much smaller than the total <MathExpr>{`I^N`}</MathExpr> when the
          rank is small — a manifestation of the low-rank structure.
        </p>
      </Section>

      <Section title="Python: CP-WOPT in TensorLy">
        <CodeBlock language="python" filename="completion.py">{`import tensorly as tl
from tensorly.decomposition import cp_weighted
import numpy as np

# Ground truth
I1, I2, I3, R = 50, 60, 40, 5
A_true = np.random.rand(I1, R)
B_true = np.random.rand(I2, R)
C_true = np.random.rand(I3, R)
M = tl.tensor(np.einsum("ir,jr,kr->ijk", A_true, B_true, C_true))

# Mask: keep 20% of entries
mask_np = np.random.rand(I1, I2, I3) < 0.2
mask = tl.tensor(mask_np.astype(float))
M_missing = M * mask  # observed entries only

# CP-WOPT: weighted ALS
weights, factors = cp_weighted(
    M_missing, mask=mask, rank=R, n_iter_max=200, tol=1e-6
)

# Recovered
M_hat = tl.cp_to_tensor((weights, factors))

# Error on missing entries
mse = ((M - M_hat) ** 2 * (1 - mask_np)).sum() / (1 - mask_np).sum()
print(f"MSE on missing entries: {mse:.4e}")`}</CodeBlock>
      </Section>

      <Section title="Applications">
        <ul>
          <li>
            <strong>Recommender systems</strong>: user × item × context tensor is
            highly sparse; CP-completion fills in the rest.
          </li>
          <li>
            <strong>Image inpainting</strong>: missing pixels can be reconstructed
            from a low-rank prior.
          </li>
          <li>
            <strong>Clinical prediction</strong>: patient × feature × time with
            missing follow-up.
          </li>
          <li>
            <strong>Traffic imputation</strong>: missing sensor readings in
            spatio-temporal traffic tensors.
          </li>
        </ul>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">CP-WOPT</div>
            <div className="text-sm">
              Acar, E. et al. (2011). <em>Scalable tensor factorizations for incomplete
              data.</em> Chemometrics and Intelligent Laboratory Systems, 106(1), 41-56.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">HaLRTC</div>
            <div className="text-sm">
              Liu, J., Musialski, P., Wonka, P., & Ye, J. (2013). <em>Tensor completion
              for estimating missing values in visual data.</em> IEEE TPAMI.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
