import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Riemannian Optimization · Tensor Lab' };

export default function RiemannianPage() {
  return (
    <ContentPage
      category="Optimization"
      title="Riemannian Optimization"
      subtitle="Optimization on manifolds: Stiefel, Grassmann, fixed-rank"
      description="Tucker factors are often constrained to be orthogonal (Stiefel manifold). Manifold-aware optimizers respect the constraint at every step, giving better stability and faster convergence."
      level="Research"
      readTime="15 min"
      tags={['Riemannian', 'Stiefel', 'Grassmann', 'manifold', 'geodesic']}
      prev={{ title: 'HALS', href: '/optimization/hals' }}
      next={{ title: 'Optimization', href: '/optimization' }}
    >
      <Section title="The Stiefel manifold">
        <p>
          The Stiefel manifold is the set of <MathExpr>{`n \\times p`}</MathExpr>{' '}
          matrices with orthonormal columns:
        </p>
        <BlockMath>
          {`\\text{St}(n, p) = \\{ \\mathbf{U} \\in \\mathbb{R}^{n \\times p} \\,:\\, \\mathbf{U}^T \\mathbf{U} = \\mathbf{I}_p \\}`}
        </BlockMath>
        <p>
          HOSVD and HOOI produce factors on <MathExpr>{`\\text{St}(n, p)`}</MathExpr>.
          Optimization that constrains factors to this manifold is more robust than
          a generic constrained solver.
        </p>
      </Section>

      <Section title="Riemannian gradient">
        <p>
          For a loss <MathExpr>{`L(\\mathbf{U})`}</MathExpr>, the Euclidean gradient
          <MathExpr>{`\\nabla L`}</MathExpr> is projected to the tangent space:
        </p>
        <BlockMath>
          {`\\nabla_R L = \\nabla L - \\mathbf{U} \\, \\text{sym}(\\mathbf{U}^T \\nabla L)`}
        </BlockMath>
        <p>
          where <MathExpr>{`\\text{sym}(\\mathbf{A}) = (\\mathbf{A} + \\mathbf{A}^T)/2`}</MathExpr>.
        </p>
      </Section>

      <Section title="Retraction">
        <p>
          After a gradient step <MathExpr>{`\\mathbf{U} \\leftarrow \\mathbf{U} - \\eta \\nabla_R L`}</MathExpr>,
          the matrix may leave the Stiefel manifold. Project it back via a{' '}
          <strong>retraction</strong>:
        </p>
        <BlockMath>
          {`\\mathbf{U}_{new} = \\mathbf{U} (\\mathbf{I} + \\tfrac{\\eta^2}{2} \\nabla_R L^T \\nabla_R L)^{-1/2}`}
        </BlockMath>
        <p>
          or simpler: QR decomposition.
        </p>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Manopt</div>
          <div className="text-sm">
            Absil, P.-A., Mahony, R., & Sepulchre, R. (2008). <em>Optimization
            Algorithms on Matrix Manifolds.</em> Princeton University Press.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
