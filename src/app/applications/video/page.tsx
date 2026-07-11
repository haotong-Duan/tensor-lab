import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Video Analytics · Tensor Lab' };

export default function VideoAppPage() {
  return (
    <ContentPage category="Applications" title="Video Analytics" subtitle="Background modeling, action recognition, anomaly detection">
      <Section title="Video as a 4D tensor">
        <p>
          A video clip is a 4D tensor <MathExpr>{`\\mathcal{X} \\in \\mathbb{R}^{T \\times H \\times W \\times C}`}</MathExpr>{' '}
          (time, height, width, channels).
        </p>
      </Section>

      <Section title="Background subtraction with tensor RPCA">
        <p>
          The video is decomposed as <MathExpr>{`\\mathcal{X} = \\mathcal{L} + \\mathcal{S}`}</MathExpr>{' '}
          where <MathExpr>{`\\mathcal{L}`}</MathExpr> is low-rank (the static background)
          and <MathExpr>{`\\mathcal{S}`}</MathExpr> is sparse (moving objects). The
          convex program
        </p>
        <BlockMath>
          {`\\min_{\\mathcal{L}, \\mathcal{S}} \\|\\mathcal{L}\\|_\\star + \\lambda \\|\\mathcal{S}\\|_1`}
        </BlockMath>
        <p>
          is solved efficiently via the t-SVD-based method.
        </p>
      </Section>

      <Section title="Action recognition with Tucker">
        <p>
          Extract a feature tensor per frame (e.g. CNN features stacked along time),
          then decompose as Tucker to get a low-dimensional representation for
          classification.
        </p>
      </Section>

      <Section title="Python: video RPCA">
        <CodeBlock language="python" filename="video_rpca.py">{`import numpy as np
from your_module import t_rpca

# Load video: shape (T, H, W, 3)
video = np.random.randn(50, 240, 320, 3) * 30
# Add a moving object
video[:, 100:140, 150:200, :] += 200

# Tensor RPCA
L, S = t_rpca(video, lam=0.1)
# L: low-rank background
# S: sparse foreground (the moving object)

# Save
np.save('background.npy', L)
np.save('foreground.npy', S)`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
