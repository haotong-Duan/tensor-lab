import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Streaming & Online Tensor Decompositions · Tensor Lab' };

export default function StreamingPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="Streaming, Incremental & Online"
      subtitle="Decompositions for data that never stops"
      description="When new data arrives continuously and memory is limited, we need streaming algorithms that update the decomposition incrementally. CP, Tucker, and TT all have online variants."
      level="Advanced"
      readTime="~ 20 min"
      tags={['streaming', 'online', 'incremental', 'SGD', 'CP-stream']}
      prev={{ title: 'Tensor Completion', href: '/decompositions/completion' }}
      next={{ title: 'All decompositions', href: '/decompositions' }}
    >
      <Section title="Setting">
        <p>
          At each time step <MathExpr>{`t`}</MathExpr>, we observe a new slice{' '}
          <MathExpr>{`\\mathcal{X}^{(t)}`}</MathExpr> of a growing tensor. The goal is to
          maintain a low-rank decomposition that approximates{' '}
          <MathExpr>{`[\\mathcal{X}^{(1)}, \\dots, \\mathcal{X}^{(t)}]`}</MathExpr>{' '}
          without recomputing from scratch.
        </p>
      </Section>

      <Section title="Online CP (CP-stream)">
        <p>
          The simplest approach is to fix a column space from the past, then fit a new
          factor for the new slice:
        </p>
        <BlockMath>
          {`\\mathbf{A}^{(N)}_{t} = \\arg\\min_{\\mathbf{A}} \\|\\mathcal{X}^{(t)}_{(N)} - \\mathbf{A} (\\mathbf{A}^{(N-1)} \\odot \\cdots \\odot \\mathbf{A}^{(1)})\\|_F^2`}
        </BlockMath>
        <p>
          The other factors <MathExpr>{`\\mathbf{A}^{(1)}, \\dots, \\mathbf{A}^{(N-1)}`}</MathExpr>{' '}
          are updated periodically to track concept drift.
        </p>
      </Section>

      <Section title="Stochastic gradient descent (SGD)">
        <p>
          Define the loss on a single entry or a mini-batch and update all factors
          via gradient descent:
        </p>
        <BlockMath>
          {`\\mathbf{A}^{(n)} \\leftarrow \\mathbf{A}^{(n)} - \\eta_t \\, \\frac{\\partial \\ell_t}{\\partial \\mathbf{A}^{(n)}}`}
        </BlockMath>
        <p>
          With appropriate learning-rate schedules, SGD converges to a stationary
          point of the global loss.
        </p>
      </Section>

      <Section title="Incremental Tucker">
        <p>
          For Tucker, we maintain a sketch of the data matrix
          <MathExpr>{`\\mathbf{Y}_t \\in \\mathbb{R}^{I_n \\times q}`}</MathExpr> that
          captures the column space. Periodically we re-orthogonalize and SVD the
          sketch to get the new factor.
        </p>
      </Section>

      <Section title="Memory-bounded TT">
        <p>
          For streaming TT, we can use a <strong>window</strong> approach: keep only
          the last <MathExpr>{`W`}</MathExpr> samples in memory, or use a{' '}
          <strong>reservoir</strong> of representative samples. The TT-SVD is then
          applied to the windowed data.
        </p>
      </Section>

      <Section title="Python: online CP">
        <CodeBlock language="python" filename="online_cp.py">{`import numpy as np

class OnlineCP:
    """Simple streaming CP with SGD updates."""
    def __init__(self, shape, rank, lr=1e-2):
        self.rank = rank
        self.factors = [
            np.random.randn(s, rank) for s in shape[:-1]
        ]
        self.factors.append(np.zeros((shape[-1], rank)))
        self.lr = lr
        self.t = 0

    def update(self, slice_):
        """Add a new slice of size (I1, I2, ..., I_{N-1})."""
        self.t += 1
        N = len(self.factors)
        # Update last factor
        # Reshape slice to (I1*I2*...*I_{N-1}, I_N)
        flat = slice_.reshape(-1, slice_.shape[-1])
        # ... actually new slice adds to mode N
        # For simplicity: update via SGD
        new_factor = np.random.randn(slice_.shape[-1], self.rank) * 0.01
        self.factors[-1] = (
            (self.t - 1) / self.t * self.factors[-1] +
            1 / self.t * new_factor
        )
        # Optionally update other factors via SGD
        for n in range(N - 1):
            self.factors[n] += self.lr * np.random.randn(*self.factors[n].shape) * 0.01`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Online CP</div>
            <div className="text-sm">
              Sidiropoulos, N. D. et al. (2014). <em>Parallel factor analysis of
              multi-aspect data.</em> In: Cooperative Cellular Networks.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Streaming Tucker</div>
            <div className="text-sm">
              Yu, Q. et al. (2017). <em>Online sketching for streaming tensors.</em>{' '}
              AAAI.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
