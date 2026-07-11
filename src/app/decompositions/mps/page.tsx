import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'MPS — Matrix Product State · Tensor Lab' };

export default function MPSPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="Matrix Product State (MPS)"
      subtitle="The 1D tensor network of quantum many-body physics"
      description="Also known as TT in applied math, MPS is the canonical representation of 1D quantum states. It is exact for gapped systems and the foundation of DMRG."
      level="Advanced"
      readTime="~ 40 min"
      tags={['MPS', 'DMRG', 'quantum', '1D', 'white', 'finitely-correlated']}
      prev={{ title: 'Tensor Ring', href: '/decompositions/tr' }}
      next={{ title: 'Hierarchical Tucker', href: '/decompositions/ht' }}
    >
      <Section title="Quantum states as tensors">
        <p>
          A general <MathExpr>{`N`}</MathExpr>-qubit pure state is a tensor with{' '}
          <MathExpr>{`2^N`}</MathExpr> complex entries — exponentially many. But the
          physical states that actually arise in nature are highly structured. The
          <strong> Matrix Product State</strong> (MPS) is a compact representation that
          captures this structure exactly for gapped, local Hamiltonians.
        </p>
        <BlockMath>
          {`|\\psi\\rangle = \\sum_{s_1, \\dots, s_N} \\text{tr}(A_1[s_1] \\, A_2[s_2] \\, \\cdots \\, A_N[s_N]) \\, |s_1 s_2 \\cdots s_N\\rangle`}
        </BlockMath>
        <p>
          with <MathExpr>{`A_k[s_k] \\in \\mathbb{C}^{r_{k-1} \\times r_k}`}</MathExpr> a
          matrix indexed by the physical spin <MathExpr>{`s_k \\in \\{0, 1\\}`}</MathExpr>.
        </p>
      </Section>

      <Section title="MPS as a tensor network">
        <p>
          The MPS structure is identical to the open-boundary TT decomposition of applied
          mathematics. Each <MathExpr>{`A_k`}</MathExpr> is a 3rd-order tensor with two
          bond indices and one physical index. The first and last bonds have dimension 1
          (boundary conditions).
        </p>
        <div className="flex justify-center my-6">
          <GlassCard className="p-4" variant="elevated" hover={false}>
            <div className="text-sm font-mono">MPS diagram → see Tensor Train visualization</div>
          </GlassCard>
        </div>
      </Section>

      <Section title="Why MPS is so powerful">
        <Callout type="definition" title="Area law">
          For a 1D gapped local Hamiltonian, the ground state obeys an{' '}
          <em>entanglement area law</em>: the entanglement entropy of a contiguous block
          is bounded by a constant, not by the block size. MPS automatically respects
          this law, and any state with bounded entropy can be represented exactly with
          bond dimension <MathExpr>{`\\chi = 2^{O(1)}`}</MathExpr>.
        </Callout>
        <p>
          This is why <strong>DMRG</strong> (Density Matrix Renormalization Group) is
          exponentially more efficient than exact diagonalization for 1D quantum systems.
        </p>
      </Section>

      <Section title="Canonical forms">
        <p>
          The gauge freedom of MPS allows us to put the state in a canonical form
          (left- or right-canonical), in which every site tensor has an isometric
          property. This is the basis of DMRG sweeps.
        </p>
        <BlockMath>
          {`\\sum_{s_k, \\alpha} A_k[s_k]_{\\alpha, \\beta} \\, A_k[s_k]_{\\alpha, \\beta'}^* = \\delta_{\\beta, \\beta'}`}
        </BlockMath>
      </Section>

      <Section title="TEBD: time evolution block decimation">
        <p>
          To simulate real-time evolution, we apply a Trotter-decomposed unitary to
          neighboring sites and then SVD-truncate the resulting tensors. This is the
          <strong> TEBD</strong> algorithm.
        </p>
        <CodeBlock language="python" filename="tebd.py">{`import numpy as np

def tebd_step(psi, gates, chi_max):
    """One TEBD step: apply 2-site gates, then truncate to chi_max."""
    N = len(psi)
    new_psi = [None] * N

    # Even bonds
    for k in range(0, N - 1, 2):
        theta = np.tensordot(psi[k], psi[k + 1], axes=(-1, 0))
        # Apply 2-site gate (e.g. exp(-i*dt*H_2))
        theta = np.tensordot(gates[k // 2], theta, axes=([2, 3], [1, 2]))
        # Move bond
        theta = np.moveaxis(theta, 1, 0)
        # SVD truncate
        chi = min(chi_max, theta.shape[0] * theta.shape[1])
        u, s, vh = np.linalg.svd(
            theta.reshape(theta.shape[0] * theta.shape[1], -1), full_matrices=False
        )
        s = s[:chi]
        u = u[:, :chi]
        vh = vh[:chi, :]
        # Normalize
        s = s / np.linalg.norm(s)
        new_psi[k] = u.reshape(psi[k].shape[0], psi[k].shape[1], chi)
        new_psi[k + 1] = (np.diag(s) @ vh).reshape(chi, psi[k + 1].shape[1], psi[k + 1].shape[2])

    return new_psi`}</CodeBlock>
      </Section>

      <Section title="MPS for machine learning">
        <p>
          Beyond quantum physics, MPS is now used in:
        </p>
        <ul>
          <li>
            <strong>Born Machine</strong>: an unsupervised generative model where the
            wavefunction <MathExpr>{`\\psi(x)`}</MathExpr> is represented as an MPS
            over binary features of <MathExpr>{`x`}</MathExpr>.
          </li>
          <li>
            <strong>Tensorized neural networks</strong>: dense weight matrices are
            reshaped into MPS form, yielding extreme compression.
          </li>
          <li>
            <strong>Language models</strong>: the <em>Tensor Train Transformer</em>{' '}
            uses MPS-format attention weights.
          </li>
        </ul>
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
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Born Machine</div>
            <div className="text-sm">
              Han, Z.-Y., Wang, J., Fan, H., Wang, L., & Zhang, P. (2018).{' '}
              <em>Unsupervised generative modeling using matrix product states.</em>{' '}
              Phys. Rev. X, 8, 031012.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
