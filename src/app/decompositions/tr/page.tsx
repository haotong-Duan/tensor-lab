import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { TRDiagram } from '@/components/visualizations/tensor-diagrams';

export const metadata = { title: 'Tensor Ring (TR) — Tensor Lab' };

export default function TRPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="Tensor Ring (TR)"
      subtitle="A cyclic tensor train"
      description="A natural extension of Tensor Train where the first and last cores are also connected by a bond, forming a ring. Reduces boundary effects and gives more uniform parameter distribution."
      level="Advanced"
      readTime="~ 30 min"
      tags={['tensor ring', 'TR', 'cyclic', 'periodic', 'TT-extension']}
      prev={{ title: 'Tensor Train', href: '/decompositions/tt' }}
      next={{ title: 'MPS', href: '/decompositions/mps' }}
    >
      <Section title="From TT to TR">
        <p>
          The <strong>Tensor Ring</strong> (Zhao et al., 2016) closes the open chain of
          TT by adding a bond between the first and last cores. Every core is now a
          3rd-order tensor with two rank indices and one physical index.
        </p>
        <BlockMath>
          {`\\mathcal{X}_{i_1 i_2 \\cdots i_N} = \\text{tr}\\left( \\mathbf{G}_1[i_1] \\, \\mathbf{G}_2[i_2] \\, \\cdots \\, \\mathbf{G}_N[i_N] \\right)`}
        </BlockMath>
        <p>
          where each <MathExpr>{`\\mathbf{G}_k[i_k] \\in \\mathbb{R}^{r_{k-1} \\times r_k}`}</MathExpr>{' '}
          and the bond ranks satisfy <MathExpr>{`r_0 = r_N`}</MathExpr> — a true cyclic
          structure.
        </p>
      </Section>

      <Section title="Visualization">
        <div className="flex justify-center my-6">
          <GlassCard className="p-4" variant="elevated" hover={false}>
            <TRDiagram order={5} rank={3} />
          </GlassCard>
        </div>
      </Section>

      <Section title="Why a ring?">
        <div className="grid md:grid-cols-2 gap-3 not-prose">
          <GlassCard className="p-5" hover={false}>
            <h4 className="font-semibold mb-2">Boundary effect</h4>
            <p className="text-sm text-muted-foreground">
              In TT, the first and last cores have a degenerate rank of 1, so they
              carry less information. TR eliminates this asymmetry.
            </p>
          </GlassCard>
          <GlassCard className="p-5" hover={false}>
            <h4 className="font-semibold mb-2">Parameter efficiency</h4>
            <p className="text-sm text-muted-foreground">
              For periodic signals (e.g. circular convolutions, ring-shaped quantum
              states), TR has been shown to use far fewer parameters than TT at the
              same accuracy.
            </p>
          </GlassCard>
          <GlassCard className="p-5" hover={false}>
            <h4 className="font-semibold mb-2">Expressiveness</h4>
            <p className="text-sm text-muted-foreground">
              Strictly contains TT as a special case (set <MathExpr>{`r_N = 1`}</MathExpr>),
              and is itself a special case of PEPS on a 1D periodic lattice.
            </p>
          </GlassCard>
          <GlassCard className="p-5" hover={false}>
            <h4 className="font-semibold mb-2">Stability</h4>
            <p className="text-sm text-muted-foreground">
              Numerical stability is comparable to TT, with similar gauge freedom
              and orthogonal forms.
            </p>
          </GlassCard>
        </div>
      </Section>

      <Section title="Computation: TR-SVD">
        <p>
          The simplest algorithm generalizes TT-SVD by:
        </p>
        <Callout type="definition" title="TR-SVD">
          <ol>
            <li>Compute the full SVD of the mode-1 unfolding to get the first core.</li>
            <li>Apply TT-SVD to the remainder, treating the result as a periodic train.</li>
            <li>Rotate the cores to balance the ranks.</li>
            <li>Iteratively refine with TR-ALS or Riemannian methods.</li>
          </ol>
        </Callout>
        <p>
          Better results come from <strong>TR-ALS</strong> (alternating least squares
          on each core while fixing the others) and from <strong>stochastic gradient
          descent</strong> on a smooth surrogate loss.
        </p>
      </Section>

      <Section title="Python implementation">
        <CodeBlock language="python" filename="tr_decomposition.py">{`import numpy as np

def tr_decomposition(X, rank, n_iter=100):
    """
    Simple TR-ALS for an order-N tensor.
    X: tensor of shape (I1, I2, ..., IN)
    rank: bond dimension r
    Returns list of cores G_k of shape (r, I_k, r)
    """
    N = X.ndim
    shapes = list(X.shape)

    # Initialize cores
    cores = [np.random.randn(rank, shapes[k], rank) for k in range(N)]

    for it in range(n_iter):
        for k in range(N):
            # Build the mode-k unfolding of X
            # Contract all other cores with fixed k-th identity
            # Then solve least-squares for core k
            # (sketched here; see fast breast cancer classification paper)
            pass

    return cores

# Reconstruct
def tr_to_tensor(cores):
    N = len(cores)
    r = cores[0].shape[0]
    res = cores[0]
    for k in range(1, N):
        # Contract along bond
        # res has shape (r_prev, prev_I, r) -> matmul with cores[k+1]
        pass
    return res`}</CodeBlock>
        <p>
          A production implementation is available in the{' '}
          <a href="https://github.com/yuqinie98/TR_TensorRing" className="text-primary">
            TR-TensorRing library
          </a>{' '}
          and in TensorLy (as <code>tensor_ring</code>).
        </p>
      </Section>

      <Section title="TR in deep learning">
        <p>
          TR is gaining traction in modern AI for:
        </p>
        <ul>
          <li>
            <strong>Sequential models</strong>: replacing RNN/LSTM cells with TR-structured
            weights reduces parameters by orders of magnitude.
          </li>
          <li>
            <strong>Circular convolutions</strong>: TR is the natural representation for
            periodic signals.
          </li>
          <li>
            <strong>3D point clouds</strong>: TR compression of voxelized data.
          </li>
          <li>
            <strong>Multi-view / multi-modal fusion</strong>: TR for circular factor
            analysis across modalities.
          </li>
        </ul>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Foundational</div>
            <div className="text-sm">
              Zhao, Q., Zhou, G., Xie, S., Zhang, L., & Cichocki, A. (2016).{' '}
              <em>Tensor Ring Decomposition.</em> arXiv:1606.05535.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Software</div>
            <div className="text-sm">
              <a href="https://github.com/yuqinie98/TR_TensorRing" className="text-primary">
                TR-TensorRing (PyTorch)
              </a>
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
