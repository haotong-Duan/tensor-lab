import { ContentPage, Section, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Python (NumPy) · Tensor Lab' };

export default function PythonPage() {
  return (
    <ContentPage
      category="Code Center"
      title="Python with NumPy"
      subtitle="Pure NumPy implementations of every algorithm"
      description="Reference implementations using only NumPy. Educational, transparent, runnable anywhere."
      level="All"
    >
      <Section title="CP decomposition from scratch">
        <CodeBlock language="python" filename="cp_numpy.py">{`import numpy as np

def cp_als(X, R, n_iter=100, tol=1e-6):
    """CP-ALS using only NumPy."""
    X = np.asarray(X, dtype=float)
    N = X.ndim
    shapes = X.shape

    # Initialize factor matrices
    factors = [np.random.rand(s, R) for s in shapes]

    for it in range(n_iter):
        for n in range(N):
            # Build the Khatri-Rao product of all factors except n
            khatri_rao = factors[1]
            for k in range(2, N):
                if k != n:
                    khatri_rao = _khatri_rao(khatri_rao, factors[k])
            if n != 0 and n != 1:
                khatri_rao = _khatri_rao(factors[0], khatri_rao)

            # Unfold the tensor along mode n
            unfolding = np.moveaxis(X, n, 0).reshape(shapes[n], -1)

            # ALS update
            gram = khatri_rao.T @ khatri_rao
            rhs = unfolding @ khatri_rao
            factors[n] = rhs @ np.linalg.pinv(gram)

    return factors

def _khatri_rao(A, B):
    """Column-wise Kronecker product."""
    n, R = A.shape
    p, _ = B.shape
    out = np.zeros((n * p, R))
    for r in range(R):
        out[:, r] = np.outer(A[:, r], B[:, r]).flatten()
    return out

# Example
X = np.random.rand(20, 30, 25)
factors = cp_als(X, R=5, n_iter=50)
X_hat = sum(np.einsum('ir,jr,kr->ijk', *factors) for _ in [1])`}</CodeBlock>
      </Section>

      <Section title="Tucker via HOSVD">
        <CodeBlock language="python" filename="hosvd_numpy.py">{`import numpy as np

def hosvd(X, ranks):
    """Higher-Order SVD with given multilinear rank."""
    N = X.ndim
    factors = []
    for n in range(N):
        unfolding = np.moveaxis(X, n, 0).reshape(X.shape[n], -1)
        U, S, Vt = np.linalg.svd(unfolding, full_matrices=False)
        factors.append(U[:, :ranks[n]])

    # Core tensor: contract X with all U^T
    core = X.copy()
    for n in range(N):
        core = np.tensordot(core, factors[n].T, axes=([0], [0]))

    return core, factors

def tucker_reconstruct(core, factors):
    """Reconstruct from Tucker format."""
    out = core
    for n, U in enumerate(factors):
        out = np.tensordot(out, U, axes=([0], [1]))
        out = np.moveaxis(out, -1, 0)
    return out

# Example
X = np.random.rand(20, 30, 25)
core, factors = hosvd(X, ranks=[5, 7, 6])
X_hat = tucker_reconstruct(core, factors)
err = np.linalg.norm(X - X_hat) / np.linalg.norm(X)
print(f"HOSVD relative error: {err:.4e}")`}</CodeBlock>
      </Section>

      <Section title="Tensor Train via TT-SVD">
        <CodeBlock language="python" filename="tt_svd_numpy.py">{`import numpy as np

def tt_svd(X, eps=1e-10, max_rank=100):
    """TT decomposition via TT-SVD."""
    N = X.ndim
    shapes = list(X.shape)
    cores = []
    current = X.copy()
    ranks = [1]

    for n in range(N - 1):
        # Reshape current as (left_dim, right_dim)
        r_prev = ranks[-1]
        left = r_prev * shapes[n]
        right = int(np.prod(shapes[n+1:]))
        current = current.reshape(left, right)

        # SVD
        U, S, Vt = np.linalg.svd(current, full_matrices=False)

        # Truncate
        keep = np.sum(S > eps * S[0])
        keep = min(keep, max_rank)
        U = U[:, :keep]
        S = S[:keep]
        Vt = Vt[:keep, :]

        # Reshape U as core
        core = U.reshape(r_prev, shapes[n], keep)
        cores.append(core)
        ranks.append(keep)

        # Carry the truncated tail
        current = (np.diag(S) @ Vt).reshape(keep, *shapes[n+1:])

    # Last core
    cores.append(current)
    return cores, ranks

def tt_to_tensor(cores):
    """Reconstruct tensor from TT cores."""
    out = cores[0]
    for c in cores[1:]:
        out = np.einsum('...i,ijk->...jk', out, c)
    return out.squeeze()

# Example
X = np.random.rand(4, 4, 4, 4, 4, 4)
cores, ranks = tt_svd(X, eps=1e-6)
X_hat = tt_to_tensor(cores)
err = np.linalg.norm(X - X_hat) / np.linalg.norm(X)
print(f"TT ranks: {ranks}")
print(f"TT relative error: {err:.4e}")`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
