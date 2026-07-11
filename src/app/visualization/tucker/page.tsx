import { ContentPage, Section } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { TuckerDiagram } from '@/components/visualizations/tensor-diagrams';

export const metadata = { title: 'Tucker Animation · Tensor Lab' };

export default function TuckerVizPage() {
  return (
    <ContentPage
      category="Visualization"
      title="Tucker Decomposition — Visual"
      subtitle="A small core times orthogonal factors"
    >
      <Section title="The structure">
        <p>
          The Tucker decomposition:
        </p>
        <ul>
          <li>The <strong>core</strong> tensor is small (size R₁ × R₂ × R₃).</li>
          <li>Each factor matrix multiplies along one mode.</li>
          <li>Factors are typically orthogonal — they play the role of singular vectors.</li>
        </ul>
        <div className="flex justify-center my-6">
          <GlassCard className="p-4" variant="elevated" hover={false}>
            <TuckerDiagram />
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
