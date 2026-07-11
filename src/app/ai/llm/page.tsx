import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'LLM Compression · Tensor Lab' };

export default function LLMPage() {
  return (
    <ContentPage
      category="AI Applications"
      title="Tensor Decomposition for LLMs"
      subtitle="Compressing GPT, LLaMA, and beyond"
      description="Tensor train (TT) and Tucker decompositions applied to the weight matrices of large language models achieve 2-4× compression with negligible perplexity loss."
      level="Advanced"
      readTime="~ 30 min"
      tags={['LLM', 'GPT', 'LLaMA', 'TT', 'compression', 'perplexity']}
      prev={{ title: 'AI Applications', href: '/ai' }}
      next={{ title: 'Transformer Compression', href: '/ai/transformer' }}
    >
      <Section title="Why LLM weights are compressible">
        <p>
          Modern LLMs have <MathExpr>{`O(10^9)`}</MathExpr> to <MathExpr>{`O(10^{11})`}</MathExpr>{' '}
          parameters. Empirically, the weight matrices have:
        </p>
        <ul>
          <li>Many near-zero singular values (low effective rank).</li>
          <li>Smooth structure along rows and columns (low TT-rank).</li>
          <li>Redundancy across attention heads and layers.</li>
        </ul>
        <p>
          This makes them ideal targets for tensor decompositions.
        </p>
      </Section>

      <Section title="TT-format weight matrices">
        <p>
          Reshape a weight matrix <MathExpr>{`\\mathbf{W} \\in \\mathbb{R}^{I \\times J}`}</MathExpr>{' '}
          into a higher-order tensor (e.g. <MathExpr>{`(I_1, I_2, I_3, I_4) \\times (J_1, J_2, J_3, J_4)`}</MathExpr>),
          then decompose:
        </p>
        <BlockMath>
          {`\\mathbf{W}[i_1 i_2 i_3 i_4, j_1 j_2 j_3 j_4] \\approx \\mathbf{G}_1[i_1, j_1] \\, \\mathbf{G}_2[i_2, j_2] \\, \\mathbf{G}_3[i_3, j_3] \\, \\mathbf{G}_4[i_4, j_4]`}
        </BlockMath>
        <p>
          where each <MathExpr>{`\\mathbf{G}_k`}</MathExpr> is a small matrix. The total
          parameter count drops from <MathExpr>{`IJ`}</MathExpr> to{' '}
          <MathExpr>{`O(r^2 \\sqrt{IJ})`}</MathExpr> for TT-rank <MathExpr>{`r`}</MathExpr>.
        </p>
      </Section>

      <Section title="Algorithm: LoRA-TT">
        <p>
          A practical recipe (Sun et al., 2024) combines LoRA with TT:
        </p>
        <ol>
          <li>Freeze the original weight <MathExpr>{`\\mathbf{W}_0`}</MathExpr>.</li>
          <li>Learn a TT-format update <MathExpr>{`\\Delta \\mathbf{W}`}</MathExpr> with rank <MathExpr>{`r \\ll \\min(I, J)`}</MathExpr>.</li>
          <li>The effective weight is <MathExpr>{`\\mathbf{W} = \\mathbf{W}_0 + \\Delta \\mathbf{W}`}</MathExpr>.</li>
        </ol>
        <p>
          The TT structure means the trainable parameters scale <em>linearly</em>{' '}
          with the dimensions, not quadratically — yielding a 100×–1000× reduction
          in trainable parameters compared to dense LoRA.
        </p>
      </Section>

      <Section title="Results: GPT-2 compression">
        <p>
          Empirically, TT-format GPT-2 (medium, 345M) achieves:
        </p>
        <ul>
          <li>2.5× compression with &lt;1% perplexity increase on WikiText-103.</li>
          <li>4× compression with &lt;5% perplexity increase.</li>
          <li>Faster inference on memory-bound hardware (fewer bytes to move).</li>
        </ul>
      </Section>

      <Section title="Python: TT-LoRA with PyTorch">
        <CodeBlock language="python" filename="tt_lora.py">{`import torch
import torch.nn as nn

class TTLinear(nn.Module):
    """TT-format linear layer. Drop-in replacement for nn.Linear."""
    def __init__(self, in_shape, out_shape, tt_ranks):
        super().__init__()
        self.in_shape = in_shape
        self.out_shape = out_shape
        self.n = len(in_shape)
        # TT cores G_k: shape (r_{k-1}, in_k, out_k, r_k)
        self.cores = nn.ParameterList([
            nn.Parameter(torch.randn(tt_ranks[k], in_shape[k], out_shape[k], tt_ranks[k+1]) * 0.01)
            for k in range(self.n)
        ])
        self.tt_ranks = tt_ranks

    def forward(self, x):
        # x: (..., prod(in_shape))
        batch_shape = x.shape[:-1]
        x = x.view(*batch_shape, *self.in_shape)
        # Reshape into TT form and contract
        # (sketched for clarity)
        out = x
        for k in range(self.n):
            # contract core[k] with input mode k
            out = torch.tensordot(out, self.cores[k], dims=([1], [1]))
        return out.view(*batch_shape, -1)

# Usage: replace nn.Linear in a transformer block
# linear = TTLinear(in_shape=(8,8,8,8), out_shape=(8,8,8,8), tt_ranks=[1,4,4,4,1])`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">TT for Transformers</div>
            <div className="text-sm">
              Novikov, A. et al. (2015). <em>Tensorizing neural networks.</em> NeurIPS.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">TT-LoRA</div>
            <div className="text-sm">
              Sun, Z. et al. (2024). <em>LoRA-Flow: Efficient LLM Fine-tuning via
              Tensor-Train Low-Rank Adaptation.</em> arXiv.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">LLM compression</div>
            <div className="text-sm">
              Mao, Y. et al. (2024). <em>LoRETTA: Low-Rank Economic Tensor-Train
              Adaptation for Large Language Models.</em> arXiv.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
