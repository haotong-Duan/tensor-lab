import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'LoRA & PEFT · Tensor Lab' };

export default function LoRAPage() {
  return (
    <ContentPage
      category="AI Applications"
      title="LoRA & Tensorized PEFT"
      subtitle="Parameter-efficient fine-tuning with low-rank tensor updates"
      description="LoRA adds a trainable low-rank update to each frozen weight. Tensorizing the update (TT, Tucker, or CP) reduces trainable parameters by 10×–1000× while preserving quality."
      level="Advanced"
      readTime="~ 20 min"
      tags={['LoRA', 'PEFT', 'TT', 'Tucker', 'low-rank-adaptation']}
      prev={{ title: 'LLM Compression', href: '/ai/llm' }}
      next={{ title: 'MoE', href: '/ai/moe' }}
    >
      <Section title="Standard LoRA">
        <p>
          For a pre-trained weight <MathExpr>{`\\mathbf{W}_0 \\in \\mathbb{R}^{d \\times k}`}</MathExpr>,
          LoRA learns a low-rank update:
        </p>
        <BlockMath>
          {`\\mathbf{W} = \\mathbf{W}_0 + \\Delta\\mathbf{W} = \\mathbf{W}_0 + \\mathbf{B} \\, \\mathbf{A}, \\quad \\mathbf{B} \\in \\mathbb{R}^{d \\times r}, \\mathbf{A} \\in \\mathbb{R}^{r \\times k}`}
        </BlockMath>
        <p>
          with <MathExpr>{`r \\ll \\min(d, k)`}</MathExpr> (typically 4–64). The number of
          trainable parameters is <MathExpr>{`r(d+k)`}</MathExpr>.
        </p>
      </Section>

      <Section title="Tensorized LoRA variants">
        <div className="grid md:grid-cols-2 gap-3 not-prose">
          <GlassCard className="p-5" hover={false}>
            <h4 className="font-semibold mb-2">TT-LoRA (LoRETTA)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Reshape <MathExpr>{`\\Delta\\mathbf{W}`}</MathExpr> into a 4th-order tensor
              and decompose as TT. Trainable parameters scale as{' '}
              <MathExpr>{`O(r^2 \\sqrt{dk})`}</MathExpr> — much smaller than{' '}
              <MathExpr>{`r(d+k)`}</MathExpr>.
            </p>
          </GlassCard>
          <GlassCard className="p-5" hover={false}>
            <h4 className="font-semibold mb-2">Tucker-LoRA</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Decompose <MathExpr>{`\\Delta\\mathbf{W}`}</MathExpr> as a Tucker tensor with
              a small core. Best when the update has a low multilinear rank.
            </p>
          </GlassCard>
          <GlassCard className="p-5" hover={false}>
            <h4 className="font-semibold mb-2">CP-LoRA (Krona)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Decompose as a CP tensor: a sum of rank-1 components. Each component is a
              product of small vectors.
            </p>
          </GlassCard>
          <GlassCard className="p-5" hover={false}>
            <h4 className="font-semibold mb-2">GaLore + Tensor</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Project gradients into a low-rank subspace, then optionally
              tensorize the projection matrices.
            </p>
          </GlassCard>
        </div>
      </Section>

      <Section title="Comparison table">
        <div className="overflow-x-auto not-prose">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-2">Method</th>
                <th className="text-left p-2">Params per layer</th>
                <th className="text-left p-2">Quality</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">Full fine-tune</td>
                <td className="p-2 font-mono">d·k</td>
                <td className="p-2">★ ★ ★ ★ ★</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">LoRA (r=8)</td>
                <td className="p-2 font-mono">8(d+k)</td>
                <td className="p-2">★ ★ ★ ★</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">TT-LoRA (r=4)</td>
                <td className="p-2 font-mono">O(16·∜dk)</td>
                <td className="p-2">★ ★ ★ ★</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">CP-LoRA (r=8)</td>
                <td className="p-2 font-mono">8(∜d + ∜k)</td>
                <td className="p-2">★ ★ ★</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Python: PEFT library with TT-LoRA">
        <CodeBlock language="python" filename="tt_lora_peft.py">{`import torch
from peft import LoraConfig, get_peft_model
from your_module import TTLinear  # custom TT layer

# Apply TT-LoRA to a transformer
config = LoraConfig(
    r=4,                              # base rank
    lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    use_tt=True,                      # custom flag
    tt_shapes=(8, 8, 8, 8),           # tensorized shape
    bias="none",
    task_type="CAUSAL_LM",
)
model = get_peft_model(base_model, config)
model.print_trainable_parameters()
# trainable params: ~0.01% of total`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">LoRA</div>
            <div className="text-sm">
              Hu, E. J. et al. (2022). <em>LoRA: Low-Rank Adaptation of Large Language
              Models.</em> ICLR.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tensorized PEFT</div>
            <div className="text-sm">
              Li, C. et al. (2024). <em>AdaLoRA: Adaptive Budget Allocation for
              Parameter-Efficient Fine-Tuning.</em> ICLR.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
