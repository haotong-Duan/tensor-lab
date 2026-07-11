import { ContentPage, Section, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Python (JAX) · Tensor Lab' };

export default function JaxPage() {
  return (
    <ContentPage
      category="Code Center"
      title="Python with JAX"
      subtitle="Composable, JIT, vmap, pmap"
      description="JAX brings composable transformations (jit, grad, vmap, pmap) to tensor decompositions, enabling rapid experimentation and TPU/GPU scale."
      level="All"
    >
      <Section title="CP with JAX and vmap">
        <CodeBlock language="python" filename="cp_jax.py">{`import jax
import jax.numpy as jnp
from jax import grad, jit, vmap, value_and_grad

def cp_loss(factors, X, R):
    """Squared Frobenius loss for CP."""
    pred = jnp.einsum('ir,jr,kr->ijk', *factors)
    return 0.5 * jnp.sum((X - pred) ** 2)

@jit
def update(factors, X, lr=1e-2):
    loss, grads = value_and_grad(cp_loss)(factors, X, len(factors[0][1]))
    new_factors = [f - lr * g for f, g in zip(factors, grads)]
    return new_factors, loss

# Run
key = jax.random.PRNGKey(0)
X = jax.random.normal(key, (20, 30, 25))
R = 5
factors = [jax.random.normal(key, (s, R)) * 0.1 for s in (20, 30, 25)]
for step in range(2000):
    factors, loss = update(factors, X)
    if step % 200 == 0:
        print(f"step {step}: loss = {loss:.4f}")

# vmap over a batch of tensors: train one CP per sample in parallel
batched_cp = vmap(lambda x: cp_loss(factors, x, 5))`}</CodeBlock>
      </Section>

      <Section title="Tucker on GPU/TPU">
        <CodeBlock language="python" filename="tucker_jax.py">{`import jax
import jax.numpy as jnp

def hosvd_jax(X, ranks):
    """HOSVD using JAX."""
    N = X.ndim
    factors = []
    for n in range(N):
        unfolding = jnp.moveaxis(X, n, 0).reshape(X.shape[n], -1)
        U, S, Vt = jnp.linalg.svd(unfolding, full_matrices=False)
        factors.append(U[:, :ranks[n]])
    core = X
    for n in range(N):
        core = jnp.tensordot(core, factors[n].T, axes=([0], [0]))
    return core, factors

X = jax.random.normal(jax.random.PRNGKey(0), (100, 200, 150))
core, factors = jax.jit(hosvd_jax, static_argnames='ranks')(X, ranks=[10, 20, 15])`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
