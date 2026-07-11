import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'HOOI · Tensor Lab' };

export default function HOOIPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="HOOI — Higher-Order Orthogonal Iteration"
      subtitle="Best multilinear-rank approximation via ALS"
      description="An iterative refinement of HOSVD that finds a (locally) best Tucker decomposition. The workhorse algorithm for practical Tucker compression."
      level="Advanced"
      readTime="~ 25 min"
      tags={['HOOI', 'Tucker', 'ALS', 'best-multilinear-rank']}
      prev={{ title: 'Tucker & HOSVD', href: '/decompositions/tucker' }}
      next={{ title: 'TT', href: '/decompositions/tt' }}
    >
      <Section title="Motivation">
        <p>
          HOSVD gives a <em>quasi-best</em> Tucker approximation: it is within a factor
          of <MathExpr>{`\\sqrt{N}`}</MathExpr> of the optimum. HOOI closes this gap by
          alternating between the factor matrices, each time solving a constrained
          least-squares problem.
        </p>
      </Section>

      <Section title="Algorithm">
        <Callout type="definition" title="HOOI">
          <ol>
            <li>Initialize factor matrices <MathExpr>{`\\mathbf{U}^{(n)}`}</MathExpr> (e.g. from HOSVD).</li>
            <li>For each mode <MathExpr>{`n`}</MathExpr> in turn, fix all other factors and update
              <BlockMath>
                {`\\mathbf{U}^{(n)} \\leftarrow \\text{leading } R_n \\text{ left singular vectors of } \\mathcal{X}_{(n)} \\big(\\mathbf{U}^{(N)} \\otimes \\cdots \\otimes \\mathbf{U}^{(n+1)} \\otimes \\mathbf{U}^{(n-1)} \\otimes \\cdots \\otimes \\mathbf{U}^{(1)}\\big)`}
              </BlockMath>
            </li>
            <li>Repeat until convergence.</li>
            <li>Recover the core: <MathExpr>{`\\mathcal{G} = \\mathcal{X} \\times_1 \\mathbf{U}^{(1)T} \\cdots \\times_N \\mathbf{U}^{(N)T}`}</MathExpr></li>
          </ol>
        </Callout>
      </Section>

      <Section title="Convergence">
        <p>
          HOOI is a block coordinate descent on a non-convex problem. The loss is
          monotonically non-increasing and bounded below, so it converges to a
          stationary point. With multiple random restarts, one often finds the global
          optimum in practice.
        </p>
        <p>
          The per-iteration cost is dominated by the matrix products in the unfolding,
          so HOOI is more expensive than HOSVD but usually far cheaper than full
          grid search over <MathExpr>{`R_n`}</MathExpr>.
        </p>
      </Section>

      <Section title="Python">
        <CodeBlock language="python" filename="hooi.py">{`import tensorly as tl
from tensorly.decomposition import tucker
import numpy as np

X = tl.tensor(np.random.rand(30, 40, 20))
ranks = [5, 7, 6]

# HOOI (iter=1 is HOSVD; iter>1 is alternating refinement)
(core, factors), errors = tucker(
    X, rank=ranks, n_iter_max=50, tol=1e-6, return_errors=True
)

print("Final reconstruction error:", errors[-1])
print("Number of iterations:", len(errors))`}</CodeBlock>
      </Section>

      <Section title="MATLAB">
        <CodeBlock language="matlab" filename="hooi.m">{`rng(0);
X = tensor(rand(30, 40, 20));
ranks = [5 7 6];

% HOOI: 50 iterations
T = hooi(X, ranks, 'maxiters', 50, 'tol', 1e-6);
fprintf('Core size: %s\\n', mat2str(size(T.core)));`}</CodeBlock>
      </Section>

      <Section title="When to use HOOI vs HOSVD">
        <div className="grid md:grid-cols-2 gap-3 not-prose">
          <GlassCard className="p-5" hover={false}>
            <h4 className="font-semibold mb-2 text-emerald-500">Use HOSVD when</h4>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• Speed matters more than 1% accuracy</li>
              <li>• The tensor is already nearly low-rank</li>
              <li>• You need a deterministic algorithm</li>
            </ul>
          </GlassCard>
          <GlassCard className="p-5" hover={false}>
            <h4 className="font-semibold mb-2 text-blue-500">Use HOOI when</h4>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• Best possible approximation is required</li>
              <li>• You are studying the algorithm itself</li>
              <li>• The ranks are small and the tensor fits in memory</li>
            </ul>
          </GlassCard>
        </div>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">HOOI</div>
          <div className="text-sm">
            De Lathauwer, L., Moor, B. D., & Vandewalle, J. (2000). <em>On the best
            rank-1 and rank-(R1, R2, …, RN) approximation of higher-order tensors.</em>{' '}
            IEEE Trans. Signal Process., 49(10), 2262-2271.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
