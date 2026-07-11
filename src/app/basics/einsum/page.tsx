import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Einstein Summation · Tensor Lab' };

export default function EinsumPage() {
  return (
    <ContentPage
      category="Tensor Basics"
      title="Einstein Summation (einsum)"
      subtitle="Index notation for tensor operations"
      description="Einstein summation provides a compact way to express any tensor contraction. The einsum string makes explicit which indices are summed and which are output."
      level="Intermediate"
      readTime="8 min"
      tags={['einsum', 'index-notation', 'contraction', 'NumPy', 'PyTorch']}
      prev={{ title: 'Hadamard Product', href: '/basics/hadamard' }}
      next={{ title: 'Matricization', href: '/basics/matricization' }}
    >
      <Section title="Index notation">
        <p>
          Einstein summation says: any index that appears twice in an expression is
          summed over. For example,
        </p>
        <BlockMath>
          {`C_{ik} = A_{ij} B_{jk}`}
        </BlockMath>
        <p>
          means <MathExpr>{`C_{ik} = \\sum_j A_{ij} B_{jk}`}</MathExpr> — a matrix
          product. The repeated index <MathExpr>{`j`}</MathExpr> is summed, leaving
          <MathExpr>{`i, k`}</MathExpr> as output.
        </p>
      </Section>

      <Section title="einsum strings">
        <p>
          The <code>einsum</code> convention uses arrow notation:
        </p>
        <ul>
          <li><code>{`'ij,jk->ik'`}</code>: matrix product</li>
          <li><code>{`'ij,ij->'`}</code>: Frobenius inner product</li>
          <li><code>{`'ij,ij->ij'`}</code>: Hadamard product</li>
          <li><code>{`'bij,bjk->bik'`}</code>: batched matrix product</li>
          <li><code>{`'ir,jr,kr->ijk'`}</code>: CP reconstruction</li>
          <li><code>{`'pqrs->ps'`}</code>: tensor contraction over q, r</li>
        </ul>
      </Section>

      <Section title="Common patterns">
        <BlockMath>
          {`\\text{diag}(\\mathbf{A}) = A_{ii}, \\quad \\text{tr}(\\mathbf{A}) = A_{ii}`}
        </BlockMath>
        <BlockMath>
          {`(\\mathbf{A} \\mathbf{x})_i = A_{ij} x_j`}
        </BlockMath>
        <BlockMath>
          {`\\text{softmax}(\\mathbf{x})_i = \\frac{e^{x_i}}{\\sum_j e^{x_j}}`}
        </BlockMath>
      </Section>

      <Section title="Python: einsum in NumPy and PyTorch">
        <CodeBlock language="python" filename="einsum.py">{`import numpy as np
import torch

A = np.random.rand(3, 4)
B = np.random.rand(4, 5)

# Matrix product
C = np.einsum('ij,jk->ik', A, B)
# Equivalent: A @ B

# Trace
M = np.random.rand(5, 5)
tr = np.einsum('ii->', M)

# Outer product
a = np.random.rand(3)
b = np.random.rand(4)
O = np.einsum('i,j->ij', a, b)

# Batched
A = np.random.rand(10, 3, 4)
B = np.random.rand(10, 4, 5)
C = np.einsum('bij,bjk->bik', A, B)

# Tensor contraction (4D)
X = np.random.rand(2, 3, 4, 5)
Y = np.random.rand(3, 5, 6, 7)
# Contract over indices 1 and 3 of X with indices 0 and 1 of Y
Z = np.einsum('pqrs,qstr->prt', X, Y)
print("Z shape:", Z.shape)  # (2, 4, 7)

# PyTorch: same syntax, autograd-aware
A = torch.randn(3, 4, requires_grad=True)
B = torch.randn(4, 5, requires_grad=True)
C = torch.einsum('ij,jk->ik', A, B)
C.sum().backward()  # works seamlessly`}</CodeBlock>
      </Section>

      <Section title="Why einsum is great">
        <ul>
          <li>One function for all tensor operations.</li>
          <li>No intermediate allocations — efficient memory use.</li>
          <li>Symbolic: easy to verify against the math.</li>
          <li>Backend-optimized: opt_einsum picks the fastest contraction order.</li>
        </ul>
      </Section>
    </ContentPage>
  );
}
