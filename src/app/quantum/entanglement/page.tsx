import { ContentPage, Section, BlockMath, Math as MathExpr, Callout } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Entanglement · Tensor Lab' };

export default function EntanglementPage() {
  return (
    <ContentPage
      category="Quantum Information"
      title="Entanglement & Schmidt Rank"
      subtitle="The resource that powers quantum advantage"
      description="Entanglement is a uniquely quantum form of correlation. The Schmidt rank — and the entropy it induces — are the key quantitative measures, and tensor networks are designed to respect them."
      level="Advanced"
      readTime="~ 20 min"
      tags={['entanglement', 'Schmidt', 'entropy', 'area-law']}
      prev={{ title: 'Density Matrix', href: '/quantum/density' }}
      next={{ title: 'VQE', href: '/quantum/vqe' }}
    >
      <Section title="Schmidt decomposition">
        <p>
          For a bipartite pure state <MathExpr>{`|\\psi\\rangle \\in \\mathcal{H}_A \\otimes \\mathcal{H}_B`}</MathExpr>,
          the <strong>Schmidt decomposition</strong> is
        </p>
        <BlockMath>
          {`|\\psi\\rangle = \\sum_{i=1}^{\\chi} \\sigma_i \\, |a_i\\rangle \\otimes |b_i\\rangle`}
        </BlockMath>
        <p>
          where <MathExpr>{`\\sigma_i > 0`}</MathExpr> and the two sets of vectors are
          orthonormal. The number <MathExpr>{`\\chi`}</MathExpr> of nonzero Schmidt
          coefficients is the <strong>Schmidt rank</strong>.
        </p>
      </Section>

      <Section title="Entanglement entropy">
        <p>
          The von Neumann entropy of the reduced density matrix is
        </p>
        <BlockMath>
          {`S(\\rho_A) = -\\text{tr}(\\rho_A \\log \\rho_A) = -\\sum_{i=1}^{\\chi} \\sigma_i^2 \\log \\sigma_i^2`}
        </BlockMath>
        <p>
          This is the <strong>entanglement entropy</strong>. It is zero for product
          states and positive for entangled states.
        </p>
      </Section>

      <Section title="MPS bond dimension = Schmidt rank">
        <p>
          A central result connects MPS to entanglement: the MPS bond dimension{' '}
          <MathExpr>{`\\chi`}</MathExpr> at the cut between sites <MathExpr>{`k`}</MathExpr> and{' '}
          <MathExpr>{`k+1`}</MathExpr> equals the Schmidt rank of the state across that
          cut.
        </p>
        <Callout type="definition" title="Area law in 1D">
          For a 1D gapped system, <MathExpr>{`S(\\rho_A) = O(1)`}</MathExpr>, so MPS with
          constant <MathExpr>{`\\chi`}</MathExpr> is exact. For 2D gapped systems, the
          area law gives <MathExpr>{`S(\\rho_A) = O(|\\partial A|)`}</MathExpr>, which
          PEPS respects.
        </Callout>
      </Section>

      <Section title="Entanglement spectrum">
        <p>
          Beyond the entropy, the full list of Schmidt values <MathExpr>{`\\{\\sigma_i\\}`}</MathExpr>{' '}
          is the <strong>entanglement spectrum</strong>. It contains strictly more
          information than the entropy and is closely related to the edge theory in
          topological phases.
        </p>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Area law</div>
            <div className="text-sm">
              Hastings, M. B. (2007). <em>An area law for one-dimensional quantum
              systems.</em> JSTAT, P08024.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Entanglement spectrum</div>
            <div className="text-sm">
              Li, H. & Haldane, F. D. M. (2008). <em>Entanglement spectrum as a
              generalization of entanglement entropy.</em> Phys. Rev. Lett., 101, 010504.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
