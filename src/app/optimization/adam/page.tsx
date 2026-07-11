import { ContentPage, Section, BlockMath, Math as MathExpr } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Adam & SGD · Tensor Lab' };

export default function AdamPage() {
  return (
    <ContentPage
      category="Optimization"
      title="Adam & SGD"
      subtitle="Adaptive learning rates for tensor fitting"
      description="Adam maintains per-parameter learning rates and momentum. It is the default for deep learning and works remarkably well for tensor decomposition when data is sparse or streaming."
      level="Intermediate"
      readTime="10 min"
      tags={['Adam', 'SGD', 'momentum', 'adaptive']}
      prev={{ title: 'Gradient Descent', href: '/optimization/gd' }}
      next={{ title: 'HALS', href: '/optimization/hals' }}
    >
      <Section title="SGD with momentum">
        <BlockMath>
          {`v_{t+1} = \\beta \\, v_t + (1 - \\beta) \\, \\nabla L_t`}
        </BlockMath>
        <BlockMath>
          {`\\theta_{t+1} = \\theta_t - \\eta \\, v_{t+1}`}
        </BlockMath>
        <p>
          The momentum <MathExpr>{`v_t`}</MathExpr> accumulates a moving average of
          past gradients, smoothing out noise.
        </p>
      </Section>

      <Section title="Adam">
        <BlockMath>
          {`m_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t, \\quad v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2`}
        </BlockMath>
        <BlockMath>
          {`\\hat{m}_t = m_t / (1 - \\beta_1^t), \\quad \\hat{v}_t = v_t / (1 - \\beta_2^t)`}
        </BlockMath>
        <BlockMath>
          {`\\theta_{t+1} = \\theta_t - \\eta \\, \\hat{m}_t / (\\sqrt{\\hat{v}_t} + \\epsilon)`}
        </BlockMath>
        <p>
          Adam combines momentum (first moment) with RMSprop-style scaling (second
          moment). Default parameters: <MathExpr>{`\\beta_1 = 0.9, \\beta_2 = 0.999, \\eta = 10^{-3}`}</MathExpr>.
        </p>
      </Section>

      <Section title="Practical tips for tensors">
        <ul>
          <li>Normalize the data so that each entry has variance ~1.</li>
          <li>Initialize factors with small random values, or use the HOSVD initialization.</li>
          <li>Use <strong>learning rate scheduling</strong>: cosine decay or warmup-then-decay.</li>
          <li>For nonnegative CP/Tucker, use multiplicative updates or projected gradient.</li>
        </ul>
      </Section>
    </ContentPage>
  );
}
