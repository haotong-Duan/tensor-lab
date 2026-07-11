import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Quantum Circuits · Tensor Lab' };

export default function CircuitsPage() {
  return (
    <ContentPage
      category="Quantum Information"
      title="Quantum Circuits"
      subtitle="Unitary evolution as tensor contractions"
      description="A quantum circuit is a sequence of unitary gates acting on qubits. Each gate is a small tensor; the entire circuit is a huge tensor network that maps an input state to an output state."
      level="Intermediate"
      readTime="~ 20 min"
      tags={['circuit', 'gate', 'unitary', 'tensor-network', 'light-cone']}
      prev={{ title: 'Quantum States', href: '/quantum/states' }}
      next={{ title: 'Density Matrix', href: '/quantum/density' }}
    >
      <Section title="Single-qubit gates">
        <p>Common single-qubit unitaries include the Pauli matrices:</p>
        <BlockMath>
          {`\\sigma_x = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, \\quad \\sigma_y = \\begin{pmatrix} 0 & -i \\\\ i & 0 \\end{pmatrix}, \\quad \\sigma_z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}`}
        </BlockMath>
        <p>and the Hadamard gate</p>
        <BlockMath>
          {`H = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}`}
        </BlockMath>
        <p>plus the phase and T gates used for universal quantum computation.</p>
      </Section>

      <Section title="Two-qubit gates">
        <p>The most common entangling gate is the controlled-NOT (CNOT):</p>
        <BlockMath>
          {`\\text{CNOT} = \\begin{pmatrix} 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 0 & 1 \\\\ 0 & 0 & 1 & 0 \\end{pmatrix}`}
        </BlockMath>
      </Section>

      <Section title="Circuits as tensor networks">
        <p>
          A quantum circuit is a tensor network. Each gate is a tensor with one
          "input" and one "output" leg per qubit it acts on. Connecting them yields a
          huge network that, for an <MathExpr>{`N`}</MathExpr>-qubit circuit of depth{' '}
          <MathExpr>{`D`}</MathExpr>, contains <MathExpr>{`O(ND)`}</MathExpr> tensors.
        </p>
        <p>
          The total operator is a <MathExpr>{`2^N \\times 2^N`}</MathExpr> matrix. We
          cannot represent it explicitly, but we <em>can</em> contract it in MPS form.
        </p>
      </Section>

      <Section title="Light-cone contraction">
        <p>
          For an <strong>observable</strong> supported on a few qubits, only a small
          <em> causal cone</em> of gates affects its expectation value. This cone has
          width at most <MathExpr>{`D`}</MathExpr>, so the contraction cost is
          exponential only in <MathExpr>{`D`}</MathExpr>, not in{' '}
          <MathExpr>{`N`}</MathExpr>.
        </p>
      </Section>

      <Section title="Python: Bell state preparation">
        <CodeBlock language="python" filename="bell.py">{`import numpy as np

# Single-qubit gates
I = np.eye(2)
X = np.array([[0, 1], [1, 0]])
H = np.array([[1, 1], [1, -1]]) / np.sqrt(2)
CNOT = np.array([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]])

# Initial state |00>
state = np.array([1, 0, 0, 0], dtype=complex)

# Apply H to qubit 0
H_full = np.kron(H, I)
state = H_full @ state

# Apply CNOT
state = CNOT @ state
print("Bell state |Phi+>:", state)  # [1/sqrt(2), 0, 0, 1/sqrt(2)]`}</CodeBlock>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Circuit contraction</div>
          <div className="text-sm">
            Markov, I. L. & Shi, Y. (2008). <em>Simulating quantum computation by
            contracting tensor networks.</em> SIAM J. Comput., 38(3), 963-981.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
