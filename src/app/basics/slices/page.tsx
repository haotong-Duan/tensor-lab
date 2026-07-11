import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock, Callout } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { Tensor3D } from '@/components/visualizations/tensor-3d';

export const metadata = { title: 'Slices · Tensor Lab' };

export default function SlicesPage() {
  return (
    <ContentPage
      category="Tensor Basics"
      title="Slices — 2-D cross-sections"
      subtitle="The 2-D faces of a tensor"
      description="A slice is a 2-D sub-tensor obtained by fixing all but two indices. Slices are how we visualize high-order tensors and the natural unit of many decompositions."
      level="Beginner"
      readTime="8 min"
      tags={['slice', 'frontal', 'lateral', 'horizontal', '2D']}
      prev={{ title: 'Mode & Fibers', href: '/basics/mode-fiber' }}
      next={{ title: 'Tensor Rank', href: '/basics/rank' }}
    >
      <Section title="Slices of an order-3 tensor">
        <p>For <MathExpr>{`\\mathcal{X} \\in \\mathbb{R}^{I_1 \\times I_2 \\times I_3}`}</MathExpr>:</p>
        <ul>
          <li><strong>Frontal slice</strong>: <MathExpr>{`\\mathcal{X}_{i::} \\in \\mathbb{R}^{I_2 \\times I_3}`}</MathExpr> (fix mode-1)</li>
          <li><strong>Lateral slice</strong>: <MathExpr>{`\\mathcal{X}_{:j:} \\in \\mathbb{R}^{I_1 \\times I_3}`}</MathExpr> (fix mode-2)</li>
          <li><strong>Horizontal slice</strong>: <MathExpr>{`\\mathcal{X}_{::k} \\in \\mathbb{R}^{I_1 \\times I_2}`}</MathExpr> (fix mode-3)</li>
        </ul>
      </Section>

      <Section title="Higher-order slices">
        <p>
          For order-<MathExpr>{`N`}</MathExpr> tensors, a <strong>slice</strong> is the
          sub-tensor obtained by fixing any single index — it has order{' '}
          <MathExpr>{`N-1`}</MathExpr>. A <strong>fiber</strong> has order 1 (a vector).
        </p>
        <p>
          More general sub-tensors are sometimes called "subtensors" or "sections".
        </p>
      </Section>

      <Section title="Interactive: rotate and see the slices">
        <p>
          The 3D viewer below shows a 3rd-order tensor. As you rotate, you can see
          the three families of slices — the frontal slices are the easiest to spot.
        </p>
        <div className="flex justify-center my-8">
          <GlassCard className="p-6" variant="elevated" hover={false}>
            <Tensor3D size={300} showSlices />
          </GlassCard>
        </div>
      </Section>

      <Section title="Why slices matter">
        <ul>
          <li>
            <strong>CP</strong> is a sum of outer products: each term contributes to
            every frontal slice simultaneously.
          </li>
          <li>
            <strong>Tucker</strong> is a small core times per-mode factors; the frontal
            slices of the original are linear combinations of the frontal slices of the
            core.
          </li>
          <li>
            <strong>t-SVD</strong> treats 3rd-order tensors as matrices of tubes (mode-3
            fibers).
          </li>
        </ul>
      </Section>

      <Section title="Python: indexing slices">
        <CodeBlock language="python" filename="slices.py">{`import numpy as np

X = np.random.rand(10, 20, 30)

# Frontal slice at i=3 (fix mode-1)
frontal = X[3, :, :]              # shape (20, 30)

# All frontal slices (loop)
frontals = [X[i] for i in range(10)]

# Lateral slice at j=5 (fix mode-2)
lateral = X[:, 5, :]              # shape (10, 30)

# Horizontal slice at k=7 (fix mode-3)
horizontal = X[:, :, 7]           # shape (10, 20)

# Stack all frontal slices into a list of matrices
frontal_stack = np.split(X, X.shape[0], axis=0)
frontal_stack = [s.squeeze(0) for s in frontal_stack]`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
