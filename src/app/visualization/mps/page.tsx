import { ContentPage, Section } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { MPSDiagram, MERADiagram } from '@/components/visualizations/tensor-diagrams';

export const metadata = { title: 'MPS / MERA · Tensor Lab' };

export default function MPSVizPage() {
  return (
    <ContentPage
      category="Visualization"
      title="MPS & MERA — Visual"
      subtitle="Tensor networks of quantum many-body physics"
    >
      <Section title="Matrix Product State">
        <p>
          A 1D chain of 3rd-order tensors (boundary tensors are 2nd-order). Each
          bond is a virtual index, the top is a physical index.
        </p>
        <div className="flex justify-center my-6">
          <GlassCard className="p-4" variant="elevated" hover={false}>
            <MPSDiagram />
          </GlassCard>
        </div>
      </Section>

      <Section title="MERA: multi-scale">
        <p>
          MERA adds disentanglers (4th-order tensors) and isometries (3rd-order
          tensors) at each layer. It captures entanglement at every length scale.
        </p>
        <div className="flex justify-center my-6">
          <GlassCard className="p-4" variant="elevated" hover={false}>
            <MERADiagram />
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
