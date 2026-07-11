import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'VQE · Tensor Lab' };

export default function VQEPage() {
  return (
    <ContentPage
      category="Quantum Information"
      title="VQE — Variational Quantum Eigensolver"
      subtitle="Hybrid quantum-classical optimization for ground states"
      description="VQE uses a parameterized quantum circuit as an ansatz and a classical optimizer to find the ground state of a Hamiltonian. Tensor-network ansätze provide a powerful alternative."
      level="Research"
      readTime="~ 20 min"
      tags={['VQE', 'variational', 'ansatz', 'QAOA', 'ground-state']}
      prev={{ title: 'Entanglement', href: '/quantum/entanglement' }}
      next={{ title: 'QAOA', href: '/quantum/qaoa' }}
    >
      <Section title="Problem: ground state energy">
        <p>
          Given a Hamiltonian <MathExpr>{`H`}</MathExpr> acting on{' '}
          <MathExpr>{`N`}</MathExpr> qubits, find the lowest eigenvalue:
        </p>
        <BlockMath>
          {`E_0 = \\min_{|\\psi\\rangle} \\langle \\psi | H | \\psi \\rangle, \\quad \\langle\\psi|\\psi\\rangle = 1`}
        </BlockMath>
      </Section>

      <Section title="VQE algorithm">
        <p>
          A parameterized ansatz <MathExpr>{`|\\psi(\\theta)\\rangle = U(\\theta) |0\\rangle`}</MathExpr>{' '}
          is optimized by a classical algorithm:
        </p>
        <ol>
          <li>Prepare <MathExpr>{`|\\psi(\\theta)\\rangle`}</MathExpr> on the quantum device.</li>
          <li>Measure <MathExpr>{`\\langle H \\rangle = \\sum_i c_i \\langle P_i \\rangle`}</MathExpr> (where <MathExpr>{`H = \\sum_i c_i P_i`}</MathExpr> is decomposed into Paulis).</li>
          <li>Update <MathExpr>{`\\theta`}</MathExpr> by gradient descent (or SPSA, COBYLA, …).</li>
          <li>Repeat until convergence.</li>
        </ol>
      </Section>

      <Section title="Tensor-network ansätze">
        <p>
          The ansatz can be a <strong>tensor network</strong> instead of a hardware
          circuit:
        </p>
        <ul>
          <li><strong>MPS ansatz</strong>: a 1D chain of parametrized two-site unitaries.</li>
          <li><strong>PEPS ansatz</strong>: 2D generalization.</li>
          <li><strong>MERAnsatz</strong>: hierarchical with disentanglers and isometries.</li>
        </ul>
        <p>
          These ansätze are natural for systems with bounded entanglement and avoid
          the barren-plateau problem that plagues generic hardware-efficient ansätze.
        </p>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">VQE</div>
          <div className="text-sm">
            Peruzzo, A. et al. (2014). <em>A variational eigenvalue solver on a
            photonic quantum processor.</em> Nature Comm., 5, 4213.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
