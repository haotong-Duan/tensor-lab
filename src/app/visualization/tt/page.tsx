import { ContentPage, Section } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { TTDiagram } from '@/components/visualizations/tensor-diagrams';

export const metadata = { title: 'TT Animation · Tensor Lab' };

export default function TTVizPage() {
  return (
    <ContentPage
      category="Visualization"
      title="Tensor Train — Visual"
      subtitle="A chain of small 3rd-order cores"
    >
      <Section title="The structure">
        <p>
          The TT decomposition:
        </p>
        <ul>
          <li>Linear chain of 3rd-order cores (boundary cores are 2nd-order).</li>
          <li>Each pair of adjacent cores is connected by a bond of dimension r_k.</li>
          <li>Total parameters scale linearly in N, quadratically in ranks.</li>
        </ul>
        <div className="flex justify-center my-6">
          <GlassCard className="p-4" variant="elevated" hover={false}>
            <TTDiagram />
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
