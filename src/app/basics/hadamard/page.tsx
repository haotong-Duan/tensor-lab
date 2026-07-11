import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Hadamard Product · Tensor Lab' };

export default function HadamardPage() {
  return (
    <ContentPage
      category="Tensor Basics"
      title="Hadamard Product"
      subtitle="Element-wise tensor product ⊙"
      description="The Hadamard product multiplies two tensors of the same shape entry by entry. It appears in nonnegative CP/Tucker, in attention, and in element-wise neural network operations."
      level="Beginner"
      readTime="6 min"
      tags={['Hadamard', 'element-wise', 'nonnegative', 'attention']}
      prev={{ title: 'Khatri-Rao Product', href: '/basics/khatri-rao' }}
      next={{ title: 'Einstein Summation', href: '/basics/einsum' }}
    >
      <Section title="Definition">
        <p>
          For two tensors of the same shape{' '}
          <MathExpr>{`\\mathcal{X}, \\mathcal{Y} \\in \\mathbb{R}^{I_1 \\times \\cdots \\times I_N}`}</MathExpr>:
        </p>
        <BlockMath>
          {`(\\mathcal{X} \\odot \\mathcal{Y})_{i_1 \\dots i_N} = \\mathcal{X}_{i_1 \\dots i_N} \\, \\mathcal{Y}_{i_1 \\dots i_N}`}
        </BlockMath>
      </Section>

      <Section title="Properties">
        <ul>
          <li>Commutative: <MathExpr>{`\\mathcal{X} \\odot \\mathcal{Y} = \\mathcal{Y} \\odot \\mathcal{X}`}</MathExpr></li>
          <li>Associative: <MathExpr>{`(\\mathcal{X} \\odot \\mathcal{Y}) \\odot \\mathcal{Z} = \\mathcal{X} \\odot (\\mathcal{Y} \\odot \\mathcal{Z})`}</MathExpr></li>
          <li>Distributive: <MathExpr>{`\\mathcal{X} \\odot (\\mathcal{Y} + \\mathcal{Z}) = \\mathcal{X} \\odot \\mathcal{Y} + \\mathcal{X} \\odot \\mathcal{Z}`}</MathExpr></li>
        </ul>
      </Section>

      <Section title="In neural networks">
        <p>
          Element-wise multiplication is everywhere:
        </p>
        <ul>
          <li>Attention: <MathExpr>{`\\text{softmax}(\\mathbf{Q}\\mathbf{K}^T) \\odot \\mathbf{V}`}</MathExpr> or related masking.</li>
          <li>Gating: <MathExpr>{`\\mathbf{x} \\odot \\sigma(\\mathbf{W}\\mathbf{x} + \\mathbf{b})`}</MathExpr> in LSTMs and GRUs.</li>
          <li>Normalization: <MathExpr>{`\\mathbf{x} \\odot \\gamma + \\beta`}</MathExpr> in LayerNorm-like ops.</li>
        </ul>
      </Section>

      <Section title="Python">
        <CodeBlock language="python" filename="hadamard.py">{`import numpy as np

X = np.array([[1, 2], [3, 4]])
Y = np.array([[5, 6], [7, 8]])

# Hadamard product
H = X * Y  # or np.multiply
print("Hadamard:\n", H)

# For higher-order tensors: same idea
A = np.random.rand(3, 4, 5)
B = np.random.rand(3, 4, 5)
H = A * B
print("Higher-order Hadamard shape:", H.shape)`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
