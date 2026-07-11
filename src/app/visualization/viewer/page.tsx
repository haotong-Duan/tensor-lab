import { ContentPage, Section } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { Tensor3D } from '@/components/visualizations/tensor-3d';

export const metadata = { title: 'Tensor Viewer · Tensor Lab' };

export default function TensorViewerPage() {
  return (
    <ContentPage
      category="Visualization"
      title="Interactive 3D Tensor Viewer"
      subtitle="Drag to rotate. Color encodes magnitude."
      description="A real-time 3D rendering of a 5×5×5 tensor. Every cell is a cube; color shows the value. The axes are labeled with the mode names."
    >
      <Section title="Default view">
        <div className="flex justify-center my-6">
          <GlassCard className="p-8" variant="elevated" hover={false}>
            <Tensor3D size={420} />
          </GlassCard>
        </div>
      </Section>

      <Section title="How to use">
        <ul>
          <li><strong>Click and drag</strong> to rotate the cube freely.</li>
          <li>The auto-rotation can be paused by holding the mouse button.</li>
          <li>Color shows the value: dark blue = small, magenta = large.</li>
          <li>The axes are labeled n₁ (blue), n₂ (green), n₃ (orange).</li>
        </ul>
      </Section>
    </ContentPage>
  );
}
