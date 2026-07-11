import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Kronecker Product · Tensor Lab' };

export default function KroneckerPage() {
  return (
    <ContentPage
      category="Tensor Basics"
      title="Kronecker Product"
      subtitle="Block-wise matrix product ⊗"
      description="The Kronecker product of two matrices is a block matrix where each entry of A is multiplied by the entire matrix B. It underlies Khatri-Rao, the matricization of outer products, and many tensor identities."
      level="Intermediate"
      readTime="10 min"
      tags={['Kronecker', 'Khatri-Rao', 'block', 'tensor-network']}
      prev={{ title: 'Outer Product', href: '/basics/outer-product' }}
      next={{ title: 'Khatri-Rao Product', href: '/basics/khatri-rao' }}
    >
      <Section title="Definition">
        <p>
          For <MathExpr>{`\\mathbf{A} \\in \\mathbb{R}^{m \\times n}`}</MathExpr> and{' '}
          <MathExpr>{`\\mathbf{B} \\in \\mathbb{R}^{p \\times q}`}</MathExpr>:
        </p>
        <BlockMath>
          {`\\mathbf{A} \\otimes \\mathbf{B} = \\begin{pmatrix} a_{11} \\mathbf{B} & a_{12} \\mathbf{B} & \\cdots & a_{1n} \\mathbf{B} \\\\ a_{21} \\mathbf{B} & a_{22} \\mathbf{B} & \\cdots & a_{2n} \\mathbf{B} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} \\mathbf{B} & a_{m2} \\mathbf{B} & \\cdots & a_{mn} \\mathbf{B} \\end{pmatrix} \\in \\mathbb{R}^{mp \\times nq}`}
        </BlockMath>
      </Section>

      <Section title="Properties">
        <ul>
          <li>
            <MathExpr>{`(\\mathbf{A} \\otimes \\mathbf{B}) (\\mathbf{C} \\otimes \\mathbf{D}) = (\\mathbf{A}\\mathbf{C}) \\otimes (\\mathbf{B}\\mathbf{D})`}</MathExpr> (mixed-product property)
          </li>
          <li>
            <MathExpr>{`(\\mathbf{A} \\otimes \\mathbf{B})^{-1} = \\mathbf{A}^{-1} \\otimes \\mathbf{B}^{-1}`}</MathExpr>
          </li>
          <li>
            <MathExpr>{`(\\mathbf{A} \\otimes \\mathbf{B})^T = \\mathbf{A}^T \\otimes \\mathbf{B}^T`}</MathExpr>
          </li>
          <li>
            <MathExpr>{`\\text{vec}(\\mathbf{A} \\mathbf{X} \\mathbf{B}^T) = (\\mathbf{B} \\otimes \\mathbf{A}) \\text{vec}(\\mathbf{X})`}</MathExpr>
          </li>
        </ul>
      </Section>

      <Section title="Role in tensors">
        <p>
          If <MathExpr>{`\\mathcal{X} = \\mathbf{a}^{(1)} \\circ \\mathbf{a}^{(2)} \\circ \\mathbf{a}^{(3)}`}</MathExpr>{' '}
          is a rank-1 tensor, then its mode-1 unfolding is
        </p>
        <BlockMath>
          {`\\mathcal{X}_{(1)} = \\mathbf{a}^{(1)} \\, (\\mathbf{a}^{(3)} \\otimes \\mathbf{a}^{(2)})^T`}
        </BlockMath>
        <p>
          The Kronecker structure is exactly what makes CP-ALS efficient.
        </p>
      </Section>

      <Section title="Python">
        <CodeBlock language="python" filename="kron.py">{`import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[0, 5], [6, 7]])

# NumPy
K = np.kron(A, B)
print("Kronecker A ⊗ B:\n", K)

# As a block matrix
# 1*B, 2*B
# 3*B, 4*B

# Verify mixed-product property
C = np.array([[1, 0], [0, 1]])
D = np.array([[1, 1], [1, 1]])
LHS = np.kron(A, B) @ np.kron(C, D)
RHS = np.kron(A @ C, B @ D)
print("Mixed product holds:", np.allclose(LHS, RHS))

# Use in tensors: vec(AXB^T) = (B ⊗ A) vec(X)
X = np.random.rand(3, 4)
A_ = np.random.rand(5, 3)
B_ = np.random.rand(4, 4)
LHS = (B_.T @ X @ A_.T).flatten('F')
RHS = np.kron(B_.T, A_) @ X.flatten('F')
print("vec identity holds:", np.allclose(LHS, RHS))`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
