import { ContentPage, Section, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Mixture of Experts · Tensor Lab' };

export default function MoEPage() {
  return (
    <ContentPage
      category="AI Applications"
      title="Mixture of Experts with Tensor Decomposition"
      subtitle="Scaling models without scaling compute"
      description="MoE activates only a subset of experts per token, but each expert still occupies memory. TT-format experts reduce memory while preserving the routing quality."
      level="Research"
      readTime="~ 20 min"
      tags={['MoE', 'TT', 'expert', 'routing', 'sparse']}
      prev={{ title: 'LoRA', href: '/ai/lora' }}
      next={{ title: 'Recommender', href: '/ai/recsys' }}
    >
      <Section title="MoE primer">
        <p>
          A <strong>Mixture of Experts</strong> (MoE) layer has <MathExpr>{`E`}</MathExpr>{' '}
          parallel "expert" networks and a router that selects the top-<MathExpr>{`k`}</MathExpr> per token. The output is a weighted sum of the chosen experts:
        </p>
        <BlockMath>
          {`y = \\sum_{i \\in \\text{top-}k} g_i(x) \\, f_i(x)`}
        </BlockMath>
        <p>
          Total parameters grow with <MathExpr>{`E`}</MathExpr>, but the per-token
          compute is constant. This decouples capacity from inference cost.
        </p>
      </Section>

      <Section title="Memory bottleneck">
        <p>
          Even though compute is sparse, <strong>memory is not</strong>: every expert
          must be loaded into GPU memory. For a 7B model with 8 experts, this
          multiplies memory by 8×.
        </p>
        <p>
          <strong>TT-format experts</strong> solve this: each expert's weights are
          stored as a TT tensor, reducing memory by 4×–16× with negligible quality loss.
        </p>
      </Section>

      <Section title="Compression vs routing quality">
        <p>
          Naively compressing all experts equally can hurt routing: the router
          was trained assuming a certain expert capacity. Solutions:
        </p>
        <ul>
          <li>
            <strong>Learn ranks</strong>: assign higher TT-rank to more frequently
            selected experts.
          </li>
          <li>
            <strong>Joint training</strong>: train the router and the TT-format
            experts end-to-end.
          </li>
          <li>
            <strong>Expert merging</strong>: merge similar experts into a single
            TT-format super-expert.
          </li>
        </ul>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">MoE</div>
          <div className="text-sm">
            Fedus, W., Zoph, B., & Shazeer, N. (2022). <em>Switch Transformers: Scaling
            to Trillion Parameter Models with Simple and Efficient Sparsity.</em> JMLR.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
