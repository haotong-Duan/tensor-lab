import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Khatri-Rao Product · Tensor Lab' };

export default function KhatriRaoPage() {
  return (
    <ContentPage
      category="Tensor Basics"
      title="Khatri-Rao Product"
      subtitle="Column-wise Kronecker product"
      description="The Khatri-Rao product is the column-wise Kronecker product. It is the workhorse of CP-ALS: the mode-1 unfolding of a CP tensor is A times the Khatri-Rao of the others."
      level="Intermediate"
      readTime="10 min"
      tags={['Khatri-Rao', 'column-wise-Kronecker', 'CP-ALS']}
      prev={{ title: 'Kronecker Product', href: '/basics/kronecker' }}
      next={{ title: 'Hadamard Product', href: '/basics/hadamard' }}
    >
      <Section title="Definition">
        <p>
          For <MathExpr>{`\\mathbf{A} \\in \\mathbb{R}^{m \\times R}`}</MathExpr> and{' '}
          <MathExpr>{`\\mathbf{B} \\in \\mathbb{R}^{n \\times R}`}</MathExpr> (same number
          of columns), the <strong>Khatri-Rao product</strong>{' '}
          <MathExpr>{`\\mathbf{A} \\odot \\mathbf{B} \\in \\mathbb{R}^{mn \\times R}`}</MathExpr>{' '}
          stacks the column-wise Kronecker products:
        </p>
        <BlockMath>
          {`\\mathbf{A} \\odot \\mathbf{B} = [\\mathbf{a}_1 \\otimes \\mathbf{b}_1, \\, \\mathbf{a}_2 \\otimes \\mathbf{b}_2, \\, \\dots, \\, \\mathbf{a}_R \\otimes \\mathbf{b}_R]`}
        </BlockMath>
      </Section>

      <Section title="Identity with CP">
        <p>
          The mode-1 unfolding of a CP tensor with factor matrices{' '}
          <MathExpr>{`\\mathbf{A}^{(1)}, \\dots, \\mathbf{A}^{(N)}`}</MathExpr> is
        </p>
        <BlockMath>
          {`\\mathcal{X}_{(1)} = \\mathbf{A}^{(1)} \\, (\\mathbf{A}^{(N)} \\odot \\cdots \\odot \\mathbf{A}^{(2)})^T`}
        </BlockMath>
        <p>
          This is exactly what makes CP-ALS efficient: the update for{' '}
          <MathExpr>{`\\mathbf{A}^{(1)}`}</MathExpr> becomes a linear least-squares
          problem.
        </p>
      </Section>

      <Section title="Khatri-Rao identities">
        <ul>
          <li>
            <MathExpr>{`(\\mathbf{A} \\odot \\mathbf{B})^T (\\mathbf{A} \\odot \\mathbf{B}) = (\\mathbf{A}^T \\mathbf{A}) \\odot (\\mathbf{B}^T \\mathbf{B})`}</MathExpr>
          </li>
          <li>
            <MathExpr>{`\\text{rank}(\\mathbf{A} \\odot \\mathbf{B}) \\leq \\text{rank}(\\mathbf{A}) \\cdot \\text{rank}(\\mathbf{B})`}</MathExpr>
          </li>
        </ul>
      </Section>

      <Section title="Python">
        <CodeBlock language="python" filename="khatri_rao.py">{`import numpy as np

A = np.array([[1, 2], [3, 4], [5, 6]])  # 3x2
B = np.array([[7, 8], [9, 10]])          # 2x2
C = np.array([[11, 12], [13, 14], [15, 16]])  # 3x2

# TensorLy / scipy
from tensorly import khatri_rao

KR = khatri_rao([A, B])  # 6x2
print("A ⊙ B shape:", KR.shape)

# Triple Khatri-Rao
KR3 = khatri_rao([A, B, C])  # 18x2
print("A ⊙ B ⊙ C shape:", KR3.shape)

# Verify column structure
print("Column 0 of A⊙B =", KR[:, 0])
print("a1 ⊗ b1 =", np.kron(A[:, 0], B[:, 0]))`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
