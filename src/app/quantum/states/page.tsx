import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock, Callout } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Quantum States · Tensor Lab' };

export default function QuantumStatesPage() {
  return (
    <ContentPage
      category="Quantum Information"
      title="Quantum States"
      subtitle="Pure states, mixed states, and the curse of dimensionality"
      description="A quantum state of N qubits is a tensor with 2^N complex amplitudes. We introduce Dirac notation, density matrices, and partial trace."
      level="Intermediate"
      readTime="~ 20 min"
      tags={['quantum-state', 'Dirac-notation', 'density-matrix', 'Hilbert-space']}
      prev={{ title: 'Quantum Information', href: '/quantum' }}
      next={{ title: 'Quantum Circuits', href: '/quantum/circuits' }}
    >
      <Section title="Pure states: state vectors">
        <p>
          An <MathExpr>{`N`}</MathExpr>-qubit pure state is a unit vector in the{' '}
          <MathExpr>{`2^N`}</MathExpr>-dimensional Hilbert space:
        </p>
        <BlockMath>
          {`|\\psi\\rangle \\in \\mathcal{H}^{\\otimes N} \\cong \\mathbb{C}^{2^N}, \\quad \\langle\\psi | \\psi\\rangle = 1`}
        </BlockMath>
        <p>
          In the computational basis, we can write
        </p>
        <BlockMath>
          {`|\\psi\\rangle = \\sum_{s_1, \\dots, s_N \\in \\{0, 1\\}} c_{s_1 \\dots s_N} \\, |s_1 s_2 \\cdots s_N\\rangle`}
        </BlockMath>
        <p>
          The amplitudes <MathExpr>{`c_{s_1 \\dots s_N}`}</MathExpr> form an{' '}
          <MathExpr>{`N`}</MathExpr>-th order complex tensor.
        </p>
      </Section>

      <Section title="From state vector to MPS">
        <p>
          The state-vector tensor with <MathExpr>{`2^N`}</MathExpr> entries is
          exponentially large. The <strong>MPS</strong> representation factorizes it as
        </p>
        <BlockMath>
          {`c_{s_1 \\dots s_N} = \\text{tr}\\left( A_1[s_1] \\, A_2[s_2] \\, \\cdots \\, A_N[s_N] \\right)`}
        </BlockMath>
        <p>
          with bond dimension <MathExpr>{`\\chi`}</MathExpr> controlling the
          entanglement. For gapped local Hamiltonians, <MathExpr>{`\\chi`}</MathExpr>{' '}
          is bounded by a constant.
        </p>
      </Section>

      <Section title="Mixed states: density matrices">
        <p>
          When a state is part of a statistical ensemble, it is described by a{' '}
          <strong>density matrix</strong>:
        </p>
        <BlockMath>
          {`\\rho = \\sum_i p_i \\, |\\psi_i\\rangle \\langle \\psi_i|, \\quad p_i \\geq 0, \\sum_i p_i = 1, \\text{tr}(\\rho) = 1`}
        </BlockMath>
        <p>
          <MathExpr>{`\\rho`}</MathExpr> is a positive semidefinite operator of size{' '}
          <MathExpr>{`2^N \\times 2^N`}</MathExpr>. It can be viewed as an order-<MathExpr>{`2N`}</MathExpr> tensor (with two physical indices per site).
        </p>
      </Section>

      <Section title="Purification: a trick for mixed states">
        <p>
          Any mixed state <MathExpr>{`\\rho`}</MathExpr> can be obtained as the reduced
          density matrix of a pure state in a larger Hilbert space:
        </p>
        <BlockMath>
          {`|\\Psi\\rangle = \\sum_i \\sqrt{p_i} \\, |\\psi_i\\rangle \\otimes |i\\rangle, \\quad \\rho = \\text{tr}_{\\text{ancilla}}(|\\Psi\\rangle \\langle \\Psi|)`}
        </BlockMath>
        <p>
          This allows us to use MPS/PEPS tools (designed for pure states) for mixed
          states, at the cost of doubling the bond dimension.
        </p>
      </Section>

      <Section title="Python: small quantum state">
        <CodeBlock language="python" filename="quantum_state.py">{`import numpy as np

# 3-qubit GHZ state: (|000> + |111>) / sqrt(2)
ghz = np.zeros(8, dtype=complex)
ghz[0] = 1.0 / np.sqrt(2)
ghz[7] = 1.0 / np.sqrt(2)

# 3-qubit W state: (|001> + |010> + |100>) / sqrt(3)
w = np.zeros(8, dtype=complex)
w[1] = w[2] = w[4] = 1.0 / np.sqrt(3)

# Density matrix
rho_ghz = np.outer(ghz, ghz.conj())
print("rho_ghz shape:", rho_ghz.shape)
print("trace:", np.trace(rho_ghz).real)  # should be 1.0
print("eigenvalues:", np.linalg.eigvalsh(rho_ghz))  # 1, 0, 0, ...

# Partial trace: keep qubits 0, 1 (trace out qubit 2)
rho_01 = np.trace(rho_ghz.reshape(2, 2, 2, 2), axis1=2, axis2=3)
print("rho_01:\n", rho_01.real)`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Quantum textbook</div>
            <div className="text-sm">
              Nielsen, M. A. & Chuang, I. L. (2010). <em>Quantum Computation and
              Quantum Information.</em> Cambridge University Press.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">MPS for mixed states</div>
            <div className="text-sm">
              Schollwöck, U. (2011). <em>The density-matrix renormalization group.</em>{' '}
              Ann. Phys.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
