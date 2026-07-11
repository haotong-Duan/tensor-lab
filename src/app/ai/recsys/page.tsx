import { ContentPage, Section, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Recommender Systems · Tensor Lab' };

export default function RecsysPage() {
  return (
    <ContentPage
      category="AI Applications"
      title="Tensor Decomposition for Recommender Systems"
      subtitle="From user × item to user × item × context"
      description="A user × item interaction matrix is a 2nd-order tensor. Adding context (time, location, device) makes it 3rd-order or higher. CP and Tucker naturally capture multi-way interactions."
      level="Intermediate"
      readTime="~ 25 min"
      tags={['recommender', 'collaborative-filtering', 'CP', 'context-aware']}
      prev={{ title: 'AI Applications', href: '/ai' }}
      next={{ title: 'GNN', href: '/ai/gnn' }}
    >
      <Section title="From matrix to tensor">
        <p>
          Classic <strong>matrix factorization</strong> models user-item interactions
          as <MathExpr>{`\\mathbf{R} \\approx \\mathbf{P} \\mathbf{Q}^T`}</MathExpr> with
          user and item factors. But real systems have rich context:
        </p>
        <ul>
          <li>Time of day / day of week / season</li>
          <li>Device / location</li>
          <li>Companion behavior</li>
          <li>User state (mood, intent)</li>
        </ul>
        <p>
          Stacking all of these as a <MathExpr>{`\\text{user} \\times \\text{item} \\times \\text{context}_1 \\times \\text{context}_2 \\times \\cdots`}</MathExpr>{' '}
          tensor is the natural way to incorporate them.
        </p>
      </Section>

      <Section title="CP-based recommendation">
        <p>
          The CP model
        </p>
        <BlockMath>
          {`\\hat{R}_{u, i, c_1, c_2, \\dots} = \\sum_{r=1}^{R} A_{ur} \\, B_{ir} \\, C^{(1)}_{c_1, r} \\, C^{(2)}_{c_2, r} \\cdots`}
        </BlockMath>
        <p>
          gives one factor per mode. The <MathExpr>{`r`}</MathExpr>-th component is a{' '}
          <em>latent</em> segment: "users who look like <MathExpr>{`A_{:, r}`}</MathExpr>{' '}
          interact with items like <MathExpr>{`B_{:, r}`}</MathExpr> in contexts like{' '}
          <MathExpr>{`C^{(1)}_{:, r} \\otimes C^{(2)}_{:, r} \\otimes \\cdots`}</MathExpr>."
        </p>
      </Section>

      <Section title="Tucker for context-aware">
        <p>
          The Tucker model with a small core tensor allows the modes to interact in
          non-separable ways — important when context factors are not independent.
        </p>
      </Section>

      <Section title="Cold start and completion">
        <p>
          For new users or new items, the factor is initialized via side information
          (e.g. a text embedding for the user's profile). Tensor completion naturally
          handles missing interaction entries.
        </p>
      </Section>

      <Section title="Python: CP recommendation">
        <CodeBlock language="python" filename="recsys_cp.py">{`import tensorly as tl
from tensorly.decomposition import parafac
import numpy as np

# user × item × time × device tensor
n_users, n_items, n_time, n_device = 10000, 5000, 24, 3
shape = (n_users, n_items, n_time, n_device)

# Generate random interactions
X = np.random.rand(*shape) * 0.1
# Add some structure
X[0:100, 0:50, 18:24, 0] = np.random.rand(100, 50, 6, 1) * 5

# Mask 99% of entries (highly sparse)
mask_np = np.random.rand(*shape) < 0.01
X_observed = X * mask_np

# CP decomposition on observed entries
weights, factors = parafac(
    X_observed, rank=20, n_iter_max=100, tol=1e-6,
    mask=mask_np.astype(float)
)

# Predict
X_pred = tl.cp_to_tensor((weights, factors))

# Top-k for user 0 at time 19
user = 0
time = 19
scores = X_pred[user, :, time, :].sum(axis=-1)  # marginalize over device
top_items = np.argsort(-scores)[:10]
print("Top recommendations:", top_items)`}</CodeBlock>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tensor RecSys</div>
          <div className="text-sm">
            Karatzoglou, A. et al. (2010). <em>Multiverse recommendation: n-dimensional
            tensor factorization for context-aware collaborative filtering.</em>{' '}
            RecSys.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
