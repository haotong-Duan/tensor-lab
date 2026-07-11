import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Gradient Descent · Tensor Lab' };

export default function GDPage() {
  return (
    <ContentPage
      category="Optimization"
      title="Gradient Descent"
      subtitle="The foundational optimization algorithm"
      description="Gradient descent and its stochastic variants (SGD, Adam) optimize the loss directly over all factors jointly. They scale to large tensors and integrate naturally with deep learning frameworks."
      level="Intermediate"
      readTime="~ 15 min"
      tags={['gradient-descent', 'SGD', 'Adam', 'autograd']}
      prev={{ title: 'ALS', href: '/optimization/als' }}
      next={{ title: 'Adam & SGD', href: '/optimization/adam' }}
    >
      <Section title="Update rule">
        <p>
          For loss <MathExpr>{`L(\\mathbf{A}^{(1)}, \\dots, \\mathbf{A}^{(N)})`}</MathExpr>:
        </p>
        <BlockMath>
          {`\\mathbf{A}^{(k)}_{t+1} = \\mathbf{A}^{(k)}_t - \\eta_t \\, \\frac{\\partial L}{\\partial \\mathbf{A}^{(k)}}`}
        </BlockMath>
        <p>
          with learning rate <MathExpr>{`\\eta_t`}</MathExpr>. Autodiff frameworks
          (PyTorch, JAX) compute the gradient automatically.
        </p>
      </Section>

      <Section title="For CP">
        <p>
          With squared loss <MathExpr>{`L = \\tfrac{1}{2} \\|\\mathcal{X} - [\\![\\mathbf{A}, \\mathbf{B}, \\mathbf{C}]\\!]\\|_F^2`}</MathExpr>,
          the gradient with respect to <MathExpr>{`\\mathbf{A}`}</MathExpr> is
        </p>
        <BlockMath>
          {`\\frac{\\partial L}{\\partial \\mathbf{A}} = - (\\mathcal{X}_{(1)} - \\mathbf{A} (\\mathbf{C} \\odot \\mathbf{B})^T) (\\mathbf{C} \\odot \\mathbf{B})`}
        </BlockMath>
      </Section>

      <Section title="Why gradient descent on tensors?">
        <ul>
          <li>
            <strong>Scalable</strong>: process mini-batches of entries; works on
            sparse, streaming, or huge tensors.
          </li>
          <li>
            <strong>Differentiable</strong>: easy to embed tensor loss inside a larger
            neural network training loop.
          </li>
          <li>
            <strong>Adaptive</strong>: Adam, RMSprop give per-parameter learning
            rates that work well in practice.
          </li>
        </ul>
      </Section>

      <Section title="Python: PyTorch CP with Adam">
        <CodeBlock language="python" filename="cp_adam.py">{`import torch
import tensorly as tl
import numpy as np

X_np = np.random.rand(20, 30, 25)
X = torch.tensor(X_np, dtype=torch.float32)

I1, I2, I3 = X.shape
R = 5

# Initialize factors
A = torch.randn(I1, R, requires_grad=True)
B = torch.randn(I2, R, requires_grad=True)
C = torch.randn(I3, R, requires_grad=True)

opt = torch.optim.Adam([A, B, C], lr=1e-2)

for step in range(2000):
    opt.zero_grad()
    # Reconstruct via einsum
    pred = torch.einsum('ir,jr,kr->ijk', A, B, C)
    loss = ((X - pred) ** 2).sum()
    loss.backward()
    opt.step()
    if step % 200 == 0:
        print(f"step {step}: loss = {loss.item():.4f}")`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
