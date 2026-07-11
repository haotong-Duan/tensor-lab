import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock, Callout } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Density Matrix · Tensor Lab' };

export default function DensityPage() {
  return (
    <ContentPage
      category="Quantum Information"
      title="Density Matrix & Mixed States"
      subtitle="A unified description of quantum states"
      description="The density matrix formalism handles pure states, mixed states, subsystems, and decoherence within a single framework. It is the natural language of open quantum systems."
      level="Advanced"
      readTime="~ 20 min"
      tags={['density-matrix', 'mixed-state', 'partial-trace', 'reduced-state']}
      prev={{ title: 'Quantum Circuits', href: '/quantum/circuits' }}
      next={{ title: 'Entanglement', href: '/quantum/entanglement' }}
    >
      <Section title="Definition">
        <p>
          A <strong>density operator</strong> on a Hilbert space{' '}
          <MathExpr>{`\\mathcal{H}`}</MathExpr> is a positive semidefinite, Hermitian,
          unit-trace operator:
        </p>
        <BlockMath>
          {`\\rho \\geq 0, \\quad \\rho = \\rho^\\dagger, \\quad \\text{tr}(\\rho) = 1`}
        </BlockMath>
        <p>
          Pure states correspond to rank-1 density matrices. Mixed states are convex
          combinations of pure states.
        </p>
      </Section>

      <Section title="Reduced density matrix">
        <p>
          For a bipartite system <MathExpr>{`\\mathcal{H} = \\mathcal{H}_A \\otimes \\mathcal{H}_B`}</MathExpr>{' '}
          with state <MathExpr>{`\\rho_{AB}`}</MathExpr>, the <strong>reduced density
          matrix</strong> on <MathExpr>{`A`}</MathExpr> is
        </p>
        <BlockMath>
          {`\\rho_A = \\text{tr}_B(\\rho_{AB}) = \\sum_{i} (\\mathbb{I}_A \\otimes \\langle i|_B) \\, \\rho_{AB} \\, (\\mathbb{I}_A \\otimes |i\\rangle_B)`}
        </BlockMath>
        <p>
          This is a partial trace. It captures all the information available in{' '}
          <MathExpr>{`A`}</MathExpr> alone, including correlations with{' '}
          <MathExpr>{`B`}</MathExpr>.
        </p>
      </Section>

      <Section title="Matrix Product Density Operator (MPDO)">
        <p>
          For an <MathExpr>{`N`}</MathExpr>-qubit mixed state, the density matrix has{' '}
          <MathExpr>{`2^N \\times 2^N`}</MathExpr> entries —{' '}
          <MathExpr>{`4^N`}</MathExpr> real parameters. The <strong>MPDO</strong>{' '}
          representation generalizes MPS to operators:
        </p>
        <BlockMath>
          {`\\rho_{s_1 \\dots s_N, s'_1 \\dots s'_N} = \\text{tr}\\left( M_1[s_1, s'_1] \\, M_2[s_2, s'_2] \\, \\cdots \\, M_N[s_N, s'_N] \\right)`}
        </BlockMath>
        <p>
          Each <MathExpr>{`M_k[s_k, s'_k]`}</MathExpr> is a matrix with two physical
          indices and two bond indices.
        </p>
      </Section>

      <Section title="Purification">
        <p>
          A mixed state <MathExpr>{`\\rho`}</MathExpr> with spectral decomposition{' '}
          <MathExpr>{`\\rho = \\sum_i p_i |\\psi_i\\rangle \\langle \\psi_i|`}</MathExpr>{' '}
          can be obtained by tracing out an ancilla from a pure state:
        </p>
        <BlockMath>
          {`|\\Psi\\rangle = \\sum_i \\sqrt{p_i} \\, |\\psi_i\\rangle \\otimes |i\\rangle_{anc}`}
        </BlockMath>
        <p>
          This <em>purification</em> lets us use pure-state tensor network algorithms
          (DMRG, TEBD) on mixed states.
        </p>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">MPDO</div>
          <div className="text-sm">
            Verstraete, F., García-Ripoll, J. J., & Cirac, J. I. (2004). <em>Matrix
            product density operators: Simulation of finite-temperature and dissipative
            systems.</em> Phys. Rev. Lett., 93, 207204.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
