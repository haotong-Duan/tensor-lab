import { ContentPage, Section } from '@/components/content-page';
import { Math as MathExpr } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { CPDiagram } from '@/components/visualizations/tensor-diagrams';

export const metadata = { title: 'CP Animation · Tensor Lab' };

export default function CPVizPage() {
  return (
    <ContentPage
      category="Visualization"
      title="CP Decomposition — Visual"
      subtitle="A sum of R rank-1 tensors"
      description="Watch how R rank-1 outer products combine to form a complex tensor."
    >
      <Section title="The structure">
        <p>
          A CP decomposition with R components:
        </p>
        <ul>
          <li>Each component is a rank-1 tensor (an outer product of N vectors).</li>
          <li>The final tensor is the sum of all R components.</li>
          <li>The factors <MathExpr>{`\\mathbf{A}, \\mathbf{B}, \\mathbf{C}`}</MathExpr> are shared across components.</li>
        </ul>
        <div className="flex justify-center my-6">
          <GlassCard className="p-4" variant="elevated" hover={false}>
            <CPDiagram rank={3} />
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
