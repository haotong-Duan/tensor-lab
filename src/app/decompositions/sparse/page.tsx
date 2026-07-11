import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Sparse & Nonnegative Tensor Decompositions · Tensor Lab' };

export default function SparsePage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="Sparse & Nonnegative Tensor Decompositions"
      subtitle="Adding constraints to the factors"
      description="Impose sparsity (most entries are zero) or nonnegativity (all entries ≥ 0) on CP/Tucker factors. Both constraints are natural for many real-world signals."
      level="Advanced"
      readTime="~ 20 min"
      tags={['sparse-CP', 'nonnegative', 'NTF', 'NTD', 'l1-penalty', 'KL-divergence']}
      prev={{ title: 'Bayesian methods', href: '/decompositions/bayesian' }}
      next={{ title: 'Robust Tensor PCA', href: '/decompositions/rtpca' }}
    >
      <Section title="Sparse CP">
        <p>
          Add an <MathExpr>{`\\ell_1`}</MathExpr> penalty on the factor matrices to
          encourage sparsity:
        </p>
        <BlockMath>
          {`\\min_{\\mathbf{A}, \\mathbf{B}, \\mathbf{C}} \\|\\mathcal{X} - [\\![\\mathbf{A}, \\mathbf{B}, \\mathbf{C}]\\!]\\|_F^2 + \\lambda \\sum_{n} \\|\\mathbf{A}^{(n)}\\|_1`}
        </BlockMath>
        <p>
          Sparsity makes the factors more interpretable: each latent component
          touches only a small number of features.
        </p>
      </Section>

      <Section title="Nonnegative Tensor Factorization (NTF)">
        <p>
          When all data is nonnegative (e.g. spectra, counts, pixel intensities), constrain
          the factors to be nonnegative:
        </p>
        <BlockMath>
          {`\\mathcal{X}_{ijk} = \\sum_{r=1}^{R} A_{ir} B_{jr} C_{kr}, \\quad A, B, C \\geq 0`}
        </BlockMath>
        <p>
          The standard algorithm is <strong>multiplicative updates</strong> (Lee & Seung,
          2001), which preserve nonnegativity at every step.
        </p>
      </Section>

      <Section title="Multiplicative updates for NTF">
        <p>
          The update for <MathExpr>{`\\mathbf{A}`}</MathExpr> is:
        </p>
        <BlockMath>
          {`\\mathbf{A} \\leftarrow \\mathbf{A} \\odot \\frac{[\\mathcal{X}_{(1)] (\\mathbf{C} \\odot \\mathbf{B})]_+}{[\\hat{\\mathcal{X}}_{(1)} (\\mathbf{C} \\odot \\mathbf{B})]_+}`}
        </BlockMath>
        <p>
          where <MathExpr>{`\\hat{\\mathcal{X}}`}</MathExpr> is the current reconstruction
          and <MathExpr>{`[\\cdot]_+`}</MathExpr> is element-wise nonnegativity.
        </p>
      </Section>

      <Section title="Nonnegative Tucker (NTD)">
        <p>
          Add nonnegativity to both the core tensor and the factor matrices:
        </p>
        <BlockMath>
          {`\\mathcal{X} = \\mathcal{G} \\times_1 \\mathbf{U}^{(1)} \\times_2 \\mathbf{U}^{(2)} \\times_3 \\mathbf{U}^{(3)}, \\quad \\mathcal{G}, \\mathbf{U}^{(n)} \\geq 0`}
        </BlockMath>
        <p>
          Used in hyperspectral unmixing, image processing, and topic modeling.
        </p>
      </Section>

      <Section title="Python: NTF with TensorLy">
        <CodeBlock language="python" filename="ntf.py">{`import tensorly as tl
from tensorly.decomposition import non_negative_parafac
import numpy as np

# Create a nonneg tensor
X = tl.tensor(np.abs(np.random.rand(20, 30, 40)))

# Nonnegative CP
weights, factors = non_negative_parafac(
    X, rank=5, n_iter_max=200, tol=1e-6
)

# All entries are ≥ 0
print("All nonneg:", all((f >= 0).all() for f in factors))`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">NTF</div>
            <div className="text-sm">
              Lee, D. D. & Seung, H. S. (2001). <em>Algorithms for non-negative matrix
              factorization.</em> NeurIPS.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sparse CP</div>
            <div className="text-sm">
              Papalexakis, E. E., Sidiropoulos, N. D., & Bro, R. (2013). <em>From
              K-way to N-way tensor decomposition using a sparsity constraint.</em>{' '}
              IEEE Trans. Signal Process.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
