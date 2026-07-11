import { ContentPage, Section, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Python (TensorLy) · Tensor Lab' };

export default function TensorlyPage() {
  return (
    <ContentPage
      category="Code Center"
      title="Python with TensorLy"
      subtitle="The high-level tensor library"
      description="TensorLy provides a uniform API for CP, Tucker, TT, TR, and many more decompositions."
      level="All"
    >
      <Section title="All decompositions in one library">
        <CodeBlock language="python" filename="tensorly_decompositions.py">{`import tensorly as tl
from tensorly.decomposition import (
    parafac,          # CP
    tucker,           # Tucker / HOSVD / HOOI
    tensor_train,     # TT
    tensor_ring,      # TR
    partial_tucker,   # multi-mode Tucker
    non_negative_parafac,
    non_negative_tucker,
    cp_weighted,      # CP with weights (for completion)
    robust_pca,       # RPCA via tensor nuclear norm
)
import numpy as np

X = tl.tensor(np.random.rand(20, 30, 25))

# CP
cp_weights, cp_factors = parafac(X, rank=5, n_iter_max=100)
X_cp = tl.cp_to_tensor((cp_weights, cp_factors))

# Tucker
tucker_core, tucker_factors = tucker(X, rank=[5, 7, 6])
X_t = tl.tucker_to_tensor((tucker_core, tucker_factors))

# TT
tt_factors = tensor_train(X, rank=[1, 4, 4, 4, 1])
X_tt = tl.tt_to_tensor(tt_factors)

# TR
tr_factors = tensor_ring(X, rank=4)
X_tr = tl.tr_to_tensor(tr_factors)

# Reconstruction errors
for name, rec in [('CP', X_cp), ('Tucker', X_t), ('TT', X_tt), ('TR', X_tr)]:
    err = tl.norm(X - rec, 2) / tl.norm(X, 2)
    print(f"{name} error: {err:.4e}")`}</CodeBlock>
      </Section>

      <Section title="Backend flexibility">
        <p>
          TensorLy supports NumPy, PyTorch, JAX, TensorFlow, and CuPy backends. The
          same code runs on CPU or GPU.
        </p>
        <CodeBlock language="python" filename="tensorly_backend.py">{`import tensorly as tl

# Switch backend
tl.set_backend('pytorch')  # or 'numpy', 'jax', 'tensorflow', 'cupy'
# All decompositions now use the chosen backend`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
