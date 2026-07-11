import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Recommender Systems · Tensor Lab' };

export default function RecsysAppPage() {
  return (
    <ContentPage category="Applications" title="Recommender Systems" subtitle="Context-aware collaborative filtering with CP / Tucker">
      <Section title="From matrix to tensor">
        <p>
          Standard matrix factorization models user × item interactions. Adding
          context (time, device, location) gives a 3-way or higher tensor:
        </p>
        <BlockMath>
          {`\\hat{r}_{u, i, c} = \\sum_{r=1}^{R} A_{ur} \\, B_{ir} \\, C_{cr}`}
        </BlockMath>
        <p>
          where <MathExpr>{`\\mathbf{A}, \\mathbf{B}, \\mathbf{C}`}</MathExpr> are the
          user, item, and context factor matrices.
        </p>
      </Section>

      <Section title="Handling missing data">
        <p>
          Most entries are missing. Use weighted CP (CP-WOPT) or stochastic gradient
          methods that only iterate over observed entries.
        </p>
      </Section>

      <Section title="Python: CP recommendation">
        <CodeBlock language="python" filename="recsys.py">{`import tensorly as tl
from tensorly.decomposition import cp_weighted
import numpy as np

# user × item × time × device (sparse)
n_users, n_items, n_time, n_device = 10000, 5000, 24, 3
shape = (n_users, n_items, n_time, n_device)

# Generate sparse observations
mask_np = np.random.rand(*shape) < 0.005
M = np.random.rand(*shape) * mask_np  # observed values

mask = tl.tensor(mask_np.astype(float))

# CP-WOPT
weights, factors = cp_weighted(M, mask=mask, rank=20, n_iter_max=100)
# Top-k for user 0 at time=19
scores = tl.cp_to_tensor((weights, factors))[0, :, 19, :].sum(axis=-1)
print("Top items:", np.argsort(-scores)[:10])`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
