import { ContentPage, Section, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Tensorized Transformers · Tensor Lab' };

export default function TransformerPage() {
  return (
    <ContentPage
      category="AI Applications"
      title="Tensorized Transformers"
      subtitle="TT-format attention and feed-forward layers"
      description="Replace dense weight matrices in transformer attention and FFN with TT-format tensors, reducing parameters and memory while preserving quality."
      level="Advanced"
      readTime="~ 25 min"
      tags={['transformer', 'attention', 'TT', 'Tucker-conv']}
      prev={{ title: 'AI Applications', href: '/ai' }}
      next={{ title: 'LLM Compression', href: '/ai/llm' }}
    >
      <Section title="Where tensors help in transformers">
        <p>
          A transformer block has three tensor-like components:
        </p>
        <ul>
          <li>
            <strong>Embedding</strong>: <MathExpr>{`V \\times d`}</MathExpr> matrix, often
            very large.
          </li>
          <li>
            <strong>Q/K/V projections</strong>: three <MathExpr>{`d \\times d`}</MathExpr>{' '}
            matrices.
          </li>
          <li>
            <strong>FFN</strong>: two <MathExpr>{`d \\times 4d`}</MathExpr> matrices
            with a nonlinearity.
          </li>
        </ul>
        <p>
          Each is a prime candidate for tensor decomposition. FFN layers typically
          hold ⅔ of the parameters, so compressing them has the biggest effect.
        </p>
      </Section>

      <Section title="Tensorized multi-head attention">
        <p>
          The multi-head attention can be reformulated: instead of{' '}
          <MathExpr>{`H`}</MathExpr> independent heads of dimension{' '}
          <MathExpr>{`d_h`}</MathExpr>, use a single TT-format projection that mixes
          heads and dimensions.
        </p>
        <BlockMath>
          {`\\text{head}_i = (\\mathbf{X} \\, \\mathbf{W}^V \\, \\mathbf{M}_i) \\, \\text{softmax}((\\mathbf{X} \\, \\mathbf{W}^K \\, \\mathbf{M}_i) (\\mathbf{X} \\, \\mathbf{W}^Q \\, \\mathbf{M}_i)^T / \\sqrt{d}) \\, \\mathbf{X} \\, \\mathbf{W}^O \\, \\mathbf{N}_i`}
        </BlockMath>
      </Section>

      <Section title="Tucker-format convolutions">
        <p>
          For the convolutional stem (e.g. in ViT preprocessing),{' '}
          <strong>Tucker-format convolutions</strong> decompose a 4th-order filter
          tensor as a small core times factor matrices per spatial dimension.
          Compression of 5×–20× is typical with minimal accuracy loss.
        </p>
      </Section>

      <Section title="Python: TT-Transformer block">
        <CodeBlock language="python" filename="tt_transformer.py">{`import torch
import torch.nn as nn

class TTTransformerBlock(nn.Module):
    def __init__(self, d_model, n_heads, tt_rank):
        super().__init__()
        self.attn = TTMultiHeadAttention(d_model, n_heads, tt_rank)
        self.ffn1 = TTLinear(d_model, 4 * d_model, tt_rank=tt_rank)
        self.ffn2 = TTLinear(4 * d_model, d_model, tt_rank=tt_rank)
        self.ln1 = nn.LayerNorm(d_model)
        self.ln2 = nn.LayerNorm(d_model)

    def forward(self, x):
        x = x + self.attn(self.ln1(x))
        x = x + self.ffn2(torch.relu(self.ffn1(self.ln2(x))))
        return x

# Parameter count comparison for d=512, ff=2048, r=8
# Standard FFN: 2 * 512 * 2048 = 2.1M params
# TT FFN: ~ 4 * 8^2 * sqrt(512 * 2048) ≈ 26K params
# ~80x reduction`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">TT Transformer</div>
            <div className="text-sm">
              Ma, X. et al. (2019). <em>A Tensorized Transformer for Language Modeling.</em>{' '}
              NeurIPS.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tucker Conv</div>
            <div className="text-sm">
              Kim, Y.-D. et al. (2016). <em>Compression of Deep Convolutional Neural
              Networks for Fast and Low Power Mobile Applications.</em> ICLR.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
