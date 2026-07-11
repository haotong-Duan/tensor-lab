import { ContentPage, Section, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Python (PyTorch) · Tensor Lab' };

export default function PytorchPage() {
  return (
    <ContentPage
      category="Code Center"
      title="Python with PyTorch"
      subtitle="GPU-accelerated, autograd-friendly"
      description="Build tensor decompositions as differentiable PyTorch modules, integrate them into deep learning pipelines."
      level="All"
    >
      <Section title="TT-Linear as a nn.Module">
        <CodeBlock language="python" filename="tt_linear.py">{`import torch
import torch.nn as nn

class TTLinear(nn.Module):
    """Tensor-Train Linear layer.

    Replaces a dense nn.Linear with a TT-format weight matrix.
    """
    def __init__(self, in_features, out_features, in_shape, out_shape, tt_rank=4, bias=True):
        super().__init__()
        self.in_features = in_features
        self.out_features = out_features
        assert in_features == int(torch.tensor(in_shape).prod())
        assert out_features == int(torch.tensor(out_shape).prod())
        self.n = len(in_shape)
        ranks = [1] + [tt_rank] * (self.n - 1) + [1]

        # Cores: (r_{k-1}, in_k, out_k, r_k)
        self.cores = nn.ParameterList([
            nn.Parameter(torch.randn(ranks[k], in_shape[k], out_shape[k], ranks[k+1]) * 0.02)
            for k in range(self.n)
        ])
        self.bias = nn.Parameter(torch.zeros(out_features)) if bias else None

    def forward(self, x):
        # x: (B, in_features)
        batch = x.shape[0]
        out = x.view(batch, *self.in_shape)  # (B, *in_shape)
        # Contract with all cores
        for k in range(self.n):
            out = torch.einsum('b...i,ioj->b...oj', out, self.cores[k].permute(0, 1, 2, 3).reshape(self.cores[k].shape[0] * self.cores[k].shape[1], -1) @ torch.eye(self.cores[k].shape[0] * self.cores[k].shape[1]).to(out.device))
        out = out.view(batch, -1)
        if self.bias is not None:
            out = out + self.bias
        return out

# Usage: replace a transformer FFN
# dense: nn.Linear(512, 2048) has 1M params
# TT:    TTLinear(512, 2048, (8,8,8), (16,8,16), tt_rank=4) has ~5K params`}</CodeBlock>
      </Section>

      <Section title="CP via SGD with autograd">
        <CodeBlock language="python" filename="cp_torch.py">{`import torch

X = torch.randn(20, 30, 25)
R = 5

A = torch.randn(20, R, requires_grad=True)
B = torch.randn(30, R, requires_grad=True)
C = torch.randn(25, R, requires_grad=True)

opt = torch.optim.Adam([A, B, C], lr=1e-2)

for step in range(2000):
    opt.zero_grad()
    pred = torch.einsum('ir,jr,kr->ijk', A, B, C)
    loss = ((X - pred) ** 2).sum()
    loss.backward()
    opt.step()
    if step % 200 == 0:
        print(f"step {step}: loss = {loss.item():.4f}")`}</CodeBlock>
      </Section>

      <Section title="Tensorly with PyTorch backend">
        <CodeBlock language="python" filename="tensorly_torch.py">{`import tensorly as tl
tl.set_backend('pytorch')
from tensorly.decomposition import tucker

X = torch.randn(20, 30, 25, device='cuda')
(core, factors), errors = tucker(X, rank=[5, 7, 6], return_errors=True)
# All computation on GPU`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
