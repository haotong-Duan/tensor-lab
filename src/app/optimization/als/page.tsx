import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock, Callout } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Alternating Least Squares · Tensor Lab' };

export default function ALSPage() {
  return (
    <ContentPage
      category="Optimization"
      title="Alternating Least Squares (ALS)"
      subtitle="The workhorse of CP and Tucker"
      description="Fix all but one factor and solve a least-squares problem. Repeat. ALS is simple, reliable, and the default for CP and Tucker decomposition."
      level="Intermediate"
      readTime="~ 20 min"
      tags={['ALS', 'CP-ALS', 'Tucker-ALS', 'block-coordinate-descent']}
      prev={{ title: 'Optimization', href: '/optimization' }}
      next={{ title: 'Gradient Descent', href: '/optimization/gd' }}
    >
      <Section title="Idea">
        <p>
          Given a non-convex loss in <MathExpr>{`N`}</MathExpr> factor variables,
          ALS optimizes them one at a time. With all but the <MathExpr>{`k`}</MathExpr>-th
          factor fixed, the loss in <MathExpr>{`\\mathbf{A}^{(k)}`}</MathExpr> is convex
          (often a least-squares problem) and has a closed-form solution.
        </p>
      </Section>

      <Section title="CP-ALS update">
        <p>
          The CP-ALS update for <MathExpr>{`\\mathbf{A}^{(k)}`}</MathExpr> is
        </p>
        <BlockMath>
          {`\\mathbf{A}^{(k)} \\leftarrow \\mathcal{X}_{(k)} \\, (\\odot_{n \\neq k} \\mathbf{A}^{(n)}) \\, \\left[ (\\odot_{n \\neq k} \\mathbf{A}^{(n)})^T (\\odot_{n \\neq k} \\mathbf{A}^{(n)}) \\right]^{-1}`}
        </BlockMath>
        <p>
          where <MathExpr>{`\\mathcal{X}_{(k)}`}</MathExpr> is the mode-k unfolding and
          <MathExpr>{`\\odot_{n \\neq k}`}</MathExpr> is the Khatri-Rao product of all
          other factors.
        </p>
      </Section>

      <Section title="Properties">
        <ul>
          <li>
            <strong>Monotone</strong>: the loss never increases. The minimum is at
            worst a stationary point; in practice often the global optimum.
          </li>
          <li>
            <strong>Easy to implement</strong>: each step is a linear least-squares
            problem.
          </li>
          <li>
            <strong>Cheap gradient-free</strong>: no hyperparameter tuning needed.
          </li>
          <li>
            <strong>Slow on ill-conditioned problems</strong>: rank-deficient or
            correlated factors can give near-singular <MathExpr>{`\\mathbf{A}^T \\mathbf{A}`}</MathExpr>.
          </li>
        </ul>
      </Section>

      <Section title="Initialization matters">
        <p>
          ALS converges to a stationary point, which depends on the initialization.
          Common choices:
        </p>
        <ul>
          <li><strong>Random</strong>: simplest, may give bad local minima.</li>
          <li><strong>HOSVD</strong>: for Tucker, use the HOSVD factors as initialization.</li>
          <li><strong>Multi-start</strong>: run from many random starts, take the best.</li>
          <li><strong>Greedy rank-1</strong>: for CP, fit one component at a time.</li>
        </ul>
      </Section>

      <Section title="Python: CP-ALS in TensorLy">
        <CodeBlock language="python" filename="cp_als.py">{`import tensorly as tl
from tensorly.decomposition import parafac
import numpy as np

X = tl.tensor(np.random.rand(20, 30, 25))

# CP-ALS (the default in TensorLy)
weights, factors = parafac(
    X, rank=5, n_iter_max=200, tol=1e-6,
    init='random',  # or 'svd' for HOSVD-style init
    return_errors=False,
)
print("Factors:", [f.shape for f in factors])
print("Reconstruction error:", tl.norm(X - tl.cp_to_tensor((weights, factors))) / tl.norm(X))`}</CodeBlock>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">CP-ALS</div>
          <div className="text-sm">
            Kolda, T. G. & Bader, B. W. (2009). <em>Tensor Decompositions and
            Applications.</em> SIAM Review, 51(3), 455-500.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
