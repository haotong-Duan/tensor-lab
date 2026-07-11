import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'TEBD · Tensor Lab' };

export default function TEBDPage() {
  return (
    <ContentPage
      category="Tensor Networks"
      title="TEBD — Time-Evolving Block Decimation"
      subtitle="Real- and imaginary-time evolution of MPS"
      description="TEBD evolves an MPS by applying a Trotter-decomposed time evolution operator, then SVD-truncating. It is the workhorse for time-dependent quantum simulations."
      level="Research"
      readTime="~ 15 min"
      tags={['TEBD', 'Trotter', 'time-evolution', 'MPS']}
      prev={{ title: 'DMRG', href: '/networks/dmrg' }}
      next={{ title: 'Canonical Form', href: '/networks/canonical' }}
    >
      <Section title="Trotter decomposition">
        <p>
          For a Hamiltonian <MathExpr>{`H = H_\\text{even} + H_\\text{odd}`}</MathExpr>{' '}
          (a sum of even and odd bond terms), the time evolution operator
        </p>
        <BlockMath>
          {`e^{-i H t} = \\prod_n e^{-i h_n t}`}
        </BlockMath>
        <p>
          is approximated by a second-order Trotter product:
        </p>
        <BlockMath>
          {`e^{-i H \\delta} \\approx e^{-i H_\\text{odd} \\delta/2} e^{-i H_\\text{even} \\delta} e^{-i H_\\text{odd} \\delta/2}`}
        </BlockMath>
      </Section>

      <Section title="Algorithm">
        <ol>
          <li>Apply the two-site gate <MathExpr>{`e^{-i h_k \\delta/2}`}</MathExpr> on
            bond <MathExpr>{`k`}</MathExpr> by contracting with the MPS.</li>
          <li>SVD-truncate back to bond dimension <MathExpr>{`\\chi`}</MathExpr>.</li>
          <li>Repeat for all bonds, alternating even and odd.</li>
          <li>Repeat for <MathExpr>{`t / \\delta`}</MathExpr> time steps.</li>
        </ol>
      </Section>

      <Section title="Imaginary time for ground states">
        <p>
          Replacing <MathExpr>{`t \\to -i \\tau`}</MathExpr> in TEBD gives imaginary-time
          evolution, which projects onto the ground state:
        </p>
        <BlockMath>
          {`|\\psi_0\\rangle = \\lim_{\\tau \\to \\infty} \\frac{e^{-H \\tau} |\\psi_0\\rangle}{\\|e^{-H \\tau} |\\psi_0\\rangle\\|}`}
        </BlockMath>
        <p>
          With truncation, this is an approximate ground-state solver — competitive
          with DMRG for gapped systems.
        </p>
      </Section>
    </ContentPage>
  );
}
