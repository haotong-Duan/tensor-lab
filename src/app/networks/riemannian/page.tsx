import { ContentPage, Section, BlockMath, Math as MathExpr } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Riemannian Optimization · Tensor Lab' };

export default function NetRiemannianPage() {
  return (
    <ContentPage
      category="Tensor Networks"
      title="Riemannian Optimization on Tensor Manifolds"
      subtitle="Optimization on Stiefel, fixed-rank, and PSD manifolds"
      description="Tensor decompositions can be formulated as optimization on smooth manifolds. Riemannian methods give provably better convergence than projection-based heuristics."
      level="Research"
      readTime="10 min"
      tags={['Riemannian', 'Stiefel', 'fixed-rank', 'manifold']}
      prev={{ title: 'Born Machine', href: '/networks/born' }}
      next={{ title: 'Tensor Networks', href: '/networks' }}
    >
      <Section title="Tucker on the Stiefel manifold">
        <p>
          The Tucker factors <MathExpr>{`\\mathbf{U}^{(n)} \\in \\text{St}(I_n, R_n)`}</MathExpr>{' '}
          lie on a Stiefel manifold. We can optimize the Tucker loss directly on this
          manifold using:
        </p>
        <ul>
          <li>Riemannian gradient descent</li>
          <li>Riemannian conjugate gradient</li>
          <li>Riemannian trust regions</li>
        </ul>
      </Section>

      <Section title="Software: Manopt and McTorch">
        <ul>
          <li>
            <a href="https://www.manopt.org" className="text-primary">Manopt</a>: MATLAB toolbox for manifold optimization.
          </li>
          <li>
            <a href="https://github.com/mctorch/mctorch" className="text-primary">McTorch</a>: PyTorch for manifolds.
          </li>
          <li>
            <a href="https://github.com/RiemannTeam/Riemann" className="text-primary">Riemann</a>: Python, scikit-learn style.
          </li>
        </ul>
      </Section>
    </ContentPage>
  );
}
