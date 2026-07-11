import { ContentPage, Section } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Diffusion Models · Tensor Lab' };

export default function DiffusionPage() {
  return (
    <ContentPage
      category="AI Applications"
      title="Tensor Decomposition for Diffusion Models"
      subtitle="Compressing UNets and DiTs"
      description="Stable Diffusion, DALL-E, and Sora all rely on UNet or DiT backbones. Tensor decompositions of the convolutions and attention layers enable 2×–5× speedup at inference."
      level="Research"
      readTime="~ 20 min"
      tags={['diffusion', 'UNet', 'DiT', 'TT', 'Tucker']}
      prev={{ title: 'MoE', href: '/ai/moe' }}
      next={{ title: 'GNN', href: '/ai/gnn' }}
    >
      <Section title="Where time goes in diffusion">
        <p>
          The bottleneck of modern diffusion is the iterative denoising loop:{' '}
          <MathExpr>{`N`}</MathExpr> forward passes through a large network. Each pass
          has:
        </p>
        <ul>
          <li>Convolutional layers (memory-bound in the spatial dims).</li>
          <li>Self-attention (compute-bound for high-res).</li>
          <li>Cross-attention (compute-bound for many text tokens).</li>
        </ul>
      </Section>

      <Section title="Tucker convolutions in UNet">
        <p>
          Replace each <MathExpr>{`C_{\\text{out}} \\times C_{\\text{in}} \\times k \\times k`}</MathExpr>{' '}
          convolution with a Tucker decomposition:
        </p>
        <BlockMath>
          {`\\mathcal{W} \\approx \\mathcal{G} \\times_1 \\mathbf{U}^{\\text{out}} \\times_2 \\mathbf{U}^{\\text{in}} \\times_3 \\mathbf{U}^k`}
        </BlockMath>
        <p>
          The original <MathExpr>{`O(C^2 k^2)`}</MathExpr> parameters drop to{' '}
          <MathExpr>{`O(R_{\\text{out}} R_{\\text{in}} R_k^2 + R_{\\text{out}} C_{\\text{out}} + R_{\\text{in}} C_{\\text{in}} + R_k k)`}</MathExpr>.
        </p>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tucker for Diffusion</div>
          <div className="text-sm">
            Berfin Şimşek, M. et al. (2024). <em>Tucker Decomposition for Diffusion
            Models.</em> arXiv.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
