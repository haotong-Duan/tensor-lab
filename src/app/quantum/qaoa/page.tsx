import { ContentPage, Section, BlockMath, Math as MathExpr } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'QAOA · Tensor Lab' };

export default function QAOAPage() {
  return (
    <ContentPage
      category="Quantum Information"
      title="QAOA — Quantum Approximate Optimization Algorithm"
      subtitle="Variational optimization for combinatorial problems"
      description="QAOA applies alternating cost and mixer unitaries to find approximate solutions to combinatorial optimization problems. Tensor-network simulation enables classical study of QAOA at moderate depth."
      level="Research"
      readTime="~ 15 min"
      tags={['QAOA', 'combinatorial', 'optimization', 'MaxCut', 'NISQ']}
      prev={{ title: 'VQE', href: '/quantum/vqe' }}
      next={{ title: 'Quantum Information', href: '/quantum' }}
    >
      <Section title="Setup">
        <p>
          Given a cost function <MathExpr>{`C: \\{0, 1\\}^N \\to \\mathbb{R}`}</MathExpr>{' '}
          encoded as a diagonal Hamiltonian
        </p>
        <BlockMath>
          {`H_C = \\sum_{x \\in \\{0, 1\\}^N} C(x) \\, |x\\rangle \\langle x|`}
        </BlockMath>
        <p>
          QAOA produces the state
        </p>
        <BlockMath>
          {`|\\gamma, \\beta\\rangle = e^{-i \\beta_p B} e^{-i \\gamma_p H_C} \\cdots e^{-i \\beta_1 B} e^{-i \\gamma_1 H_C} \\, |+\\rangle^{\\otimes N}`}
        </BlockMath>
        <p>
          where <MathExpr>{`B = \\sum_i X_i`}</MathExpr> is the mixer. The expectation{' '}
          <MathExpr>{`\\langle H_C \\rangle`}</MathExpr> is minimized over the{' '}
          <MathExpr>{`2p`}</MathExpr> parameters.
        </p>
      </Section>

      <Section title="Tensor-network simulation">
        <p>
          For moderate <MathExpr>{`N`}</MathExpr> and depth <MathExpr>{`p`}</MathExpr>,
          the QAOA state is an MPS with bond dimension that grows (roughly) as{' '}
          <MathExpr>{`2^p`}</MathExpr>. This allows classical simulation of QAOA on
          hundreds of qubits at small depth — a regime that is too large for state-vector
          simulation but accessible to MPS.
        </p>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">QAOA</div>
          <div className="text-sm">
            Farhi, E., Goldstone, J., & Gutmann, S. (2014). <em>A Quantum Approximate
            Optimization Algorithm.</em> arXiv:1411.4028.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
