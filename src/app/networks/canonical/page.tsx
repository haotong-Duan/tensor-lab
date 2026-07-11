import { ContentPage, Section, BlockMath, Math as MathExpr } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Canonical Form · Tensor Lab' };

export default function CanonicalPage() {
  return (
    <ContentPage
      category="Tensor Networks"
      title="Canonical Form of MPS"
      subtitle="Gauge freedom made useful"
      description="An MPS is not unique: it has a gauge freedom. Choosing a convenient gauge — left-, right-, or mixed-canonical — simplifies algorithms like DMRG, TEBD, and inner products."
      level="Advanced"
      readTime="10 min"
      tags={['canonical', 'gauge', 'isometry', 'MPS']}
      prev={{ title: 'TEBD', href: '/networks/tebd' }}
      next={{ title: 'Born Machine', href: '/networks/born' }}
    >
      <Section title="Gauge freedom">
        <p>
          Given any invertible matrix <MathExpr>{`\\mathbf{R}`}</MathExpr>, we can
          replace
        </p>
        <BlockMath>
          {`\\mathbf{A}_k \\to \\mathbf{A}_k \\mathbf{R}, \\quad \\mathbf{A}_{k+1} \\to \\mathbf{R}^{-1} \\mathbf{A}_{k+1}`}
        </BlockMath>
        <p>
          without changing the state <MathExpr>{`|\\psi\\rangle`}</MathExpr>. This is
          the <strong>gauge freedom</strong> of MPS.
        </p>
      </Section>

      <Section title="Left- and right-canonical">
        <p>
          Choose <MathExpr>{`\\mathbf{R}`}</MathExpr> so that
        </p>
        <BlockMath>
          {`\\sum_{i_k, \\alpha} A_k[i_k]_{\\alpha, \\beta} \\, A_k[i_k]_{\\alpha, \\beta'}^* = \\delta_{\\beta, \\beta'}`}
        </BlockMath>
        <p>
          i.e. <MathExpr>{`A_k`}</MathExpr> is a left-isometry. Then the partial trace up
          to site <MathExpr>{`k`}</MathExpr> is the identity — the MPS represents a
          normalized state.
        </p>
      </Section>

      <Section title="Why it matters">
        <ul>
          <li><strong>DMRG sweeps</strong> are stable in mixed-canonical form.</li>
          <li><strong>Inner products</strong> are easy: the norm is the inner product at the single bond.</li>
          <li><strong>Entanglement</strong> is read off directly from the singular values at any bond.</li>
        </ul>
      </Section>
    </ContentPage>
  );
}
