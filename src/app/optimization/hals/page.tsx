import { ContentPage, Section, BlockMath, Math as MathExpr } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'HALS · Tensor Lab' };

export default function HALSPage() {
  return (
    <ContentPage
      category="Optimization"
      title="HALS — Hierarchical ALS"
      subtitle="Column-wise updates for nonnegative tensor factorization"
      description="HALS updates one column of one factor at a time, using a closed-form expression. It is the algorithm of choice for nonnegative CP and Tucker decomposition."
      level="Advanced"
      readTime="10 min"
      tags={['HALS', 'nonnegative', 'column-wise']}
      prev={{ title: 'Adam', href: '/optimization/adam' }}
      next={{ title: 'Riemannian', href: '/optimization/riemannian' }}
    >
      <Section title="Idea">
        <p>
          Update one column of <MathExpr>{`\\mathbf{A}^{(k)}`}</MathExpr> at a time, with
          all other columns fixed. Each column-update is a quadratic optimization
          with a closed-form solution.
        </p>
      </Section>

      <Section title="Update rule">
        <p>
          For the <MathExpr>{`r`}</MathExpr>-th column of <MathExpr>{`\\mathbf{A}`}</MathExpr> in
          a 3-way NMF, the HALS update is
        </p>
        <BlockMath>
          {`\\mathbf{a}_r \\leftarrow \\left[\\mathbf{X}_{(1)} (\\mathbf{b}_r \\otimes \\mathbf{c}_r) - \\sum_{s \\neq r} (\\mathbf{b}_s^T \\mathbf{b}_r) (\\mathbf{c}_s^T \\mathbf{c}_r) \\, \\mathbf{a}_s\\right]_+ / (\\|\\mathbf{b}_r\\|^2 \\|\\mathbf{c}_r\\|^2)`}
        </BlockMath>
        <p>
          where <MathExpr>{`[\\cdot]_+`}</MathExpr> enforces nonnegativity. The update
          is parallelizable across columns.
        </p>
      </Section>

      <Section title="Advantages">
        <ul>
          <li>Monotone decrease in loss (under mild conditions).</li>
          <li>Fast: each step is <MathExpr>{`O(R \\cdot I)`}</MathExpr> per mode.</li>
          <li>Converges to KKT-stationary points.</li>
        </ul>
      </Section>
    </ContentPage>
  );
}
