import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'DMRG · Tensor Lab' };

export default function DMRGPage() {
  return (
    <ContentPage
      category="Tensor Networks"
      title="DMRG — Density Matrix Renormalization Group"
      subtitle="The variational algorithm for 1D quantum ground states"
      description="DMRG sweeps through an MPS, locally optimizing each site tensor while fixing the others. It is the gold standard for 1D strongly-correlated systems."
      level="Research"
      readTime="~ 25 min"
      tags={['DMRG', 'sweep', 'variational', 'MPS']}
      prev={{ title: 'Tensor Networks', href: '/networks' }}
      next={{ title: 'TEBD', href: '/networks/tebd' }}
    >
      <Section title="Variational principle">
        <p>
          For a Hamiltonian <MathExpr>{`H`}</MathExpr> decomposed as a sum of local
          terms <MathExpr>{`H = \\sum_k h_k`}</MathExpr>, the ground state energy is
        </p>
        <BlockMath>
          {`E_0 = \\min_{|\\psi\\rangle \\in \\text{MPS}(\\chi)} \\frac{\\langle \\psi | H | \\psi \\rangle}{\\langle \\psi | \\psi \\rangle}`}
        </BlockMath>
        <p>
          DMRG solves this by sweeping through the MPS, optimizing one or two sites
          at a time.
        </p>
      </Section>

      <Section title="Two-site DMRG">
        <p>
          At each step, the algorithm:
        </p>
        <ol>
          <li>Forms the effective Hamiltonian for two adjacent sites.</li>
          <li>Finds its lowest eigenstate (e.g. via Lanczos).</li>
          <li>SVDs the result to recover two site tensors, truncating to bond dim{' '}
            <MathExpr>{`\\chi`}</MathExpr>.</li>
          <li>Shifts the sweep window by one site and repeats.</li>
        </ol>
      </Section>

      <Section title="Complexity">
        <p>
          Per sweep, the cost is <MathExpr>{`O(\\chi^3 d^2 N + \\chi^2 d^3 N)`}</MathExpr>{' '}
          where <MathExpr>{`d`}</MathExpr> is the physical dimension and{' '}
          <MathExpr>{`N`}</MathExpr> the system size. The cubic dependence on{' '}
          <MathExpr>{`\\chi`}</MathExpr> is the main bottleneck for large bond
          dimensions.
        </p>
      </Section>

      <Section title="Python: toy DMRG">
        <CodeBlock language="python" filename="dmrg.py">{`import numpy as np
import scipy.sparse.linalg as spla

class DMRG:
    def __init__(self, N, d, chi, H2):
        """Two-site DMRG for a chain of N d-dimensional sites.
        H2: two-site Hamiltonian as a (d^2, d^2) array."""
        self.N, self.d, self.chi = N, d, chi
        self.H2 = H2
        # Initialize random MPS
        self.tensors = [np.random.randn(chi if 0 < k < N-1 else 1, d, chi if k < N-1 else 1) for k in range(N)]

    def sweep(self, n_iter=10):
        # Right sweep, then left sweep
        for _ in range(n_iter):
            self._sweep_one_way()
            self._sweep_other_way()

    def _sweep_one_way(self):
        for k in range(self.N - 1):
            # Form theta by contracting tensors k and k+1
            theta = np.tensordot(self.tensors[k], self.tensors[k+1], axes=(-1, 0))
            # Apply H2 (broadcast)
            theta = np.tensordot(self.H2, theta, axes=([1, 2], [1, 2])).transpose(1, 0, 2, 3)
            theta = theta.reshape(self.d * self.d, -1)
            # Lowest eigenvector
            _, vec = spla.eigsh(theta @ theta.T, k=1)
            # SVD truncate
            U, S, Vt = np.linalg.svd(vec.reshape(self.d, self.d), full_matrices=False)
            chi = min(self.chi, len(S))
            self.tensors[k] = U[:, :chi].reshape(self.tensors[k].shape[0], self.d, chi)
            self.tensors[k+1] = (np.diag(S[:chi]) @ Vt[:chi, :]).reshape(chi, self.d, self.tensors[k+1].shape[-1])`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">DMRG</div>
            <div className="text-sm">
              White, S. R. (1992). <em>Density matrix formulation for quantum
              renormalization groups.</em> Phys. Rev. Lett., 69, 2863.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">MPS textbook</div>
            <div className="text-sm">
              Schollwöck, U. (2011). <em>The density-matrix renormalization group.</em>{' '}
              Ann. Phys., 326(1), 96-192.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
