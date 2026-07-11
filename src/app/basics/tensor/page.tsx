'use client';

import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math, BlockMath } from '@/components/ui/math';
import { Tensor3D } from '@/components/visualizations/tensor-3d';
import { GlassCard } from '@/components/ui/glass-card';
import { useI18n } from '@/components/i18n';

export default function TensorPage() {
  const { t } = useI18n();
  return (
    <ContentPage
      category={t('module.tensor-basics')}
      level="Beginner"
      readTime="10 min"
      title={t('tensor.title')}
      subtitle={t('tensor.subtitle')}
      description={t('tensor.description')}
      tags={t('tensor.tag').split(',')}
      prev={{ title: t('basics.title'), href: '/basics' }}
      next={{ title: t('modefiber.title'), href: '/basics/mode-fiber' }}
    >
      <Section title={t('tensor.section.definition')}>
        <p>
          {t('tensor.definition.p1')}
        </p>
        <BlockMath>
          {`\\mathcal{X} \\in \\mathbb{R}^{I_1 \\times I_2 \\times \\cdots \\times I_N}`}
        </BlockMath>
        <p>
          has order <Math>{`N`}</Math> and mode-<Math>{`n`}</Math> size{' '}
          <Math>{`I_n`}</Math>. The total number of entries is{' '}
          <Math>{`\\prod_{n=1}^{N} I_n`}</Math>.
        </p>
        <Callout type="definition" title={t('tensor.callout.special')}>
          <ul>
            <li>
              <Math>{`N = 0`}</Math>: {t('tensor.callout.special.list1')}
            </li>
            <li>
              <Math>{`N = 1`}</Math>: {t('tensor.callout.special.list2')}
            </li>
            <li>
              <Math>{`N = 2`}</Math>: {t('tensor.callout.special.list3')}
            </li>
            <li>
              <Math>{`N = 3`}</Math>: {t('tensor.callout.special.list4')}
            </li>
          </ul>
        </Callout>
      </Section>

      <Section title={t('tensor.section.notation')}>
        <p>{t('tensor.notation.p1')}</p>
        <ul>
          <li>
            <strong>Scalar</strong> (0-tensor): {t('tensor.notation.1')}
          </li>
          <li>
            <strong>Vector</strong> (1-tensor): {t('tensor.notation.2')}
          </li>
          <li>
            <strong>Matrix</strong> (2-tensor): {t('tensor.notation.3')}
          </li>
          <li>
            <strong>Order-<Math>{`N \\geq 3`}</Math> tensor</strong>: {t('tensor.notation.4')}
          </li>
          <li>
            {t('tensor.notation.5')}
          </li>
        </ul>
      </Section>

      <Section title={t('tensor.section.example')}>
        <p>
          {t('tensor.example.p1')}
        </p>
        <div className="flex justify-center my-8">
          <GlassCard className="p-6" variant="elevated" hover={false}>
            <Tensor3D size={320} />
          </GlassCard>
        </div>
        <p className="text-xs text-muted-foreground text-center -mt-4">
          {t('tensor.example.caption')}
        </p>
      </Section>

      <Section title={t('tensor.section.where')}>
        <ul>
          <li>
            {t('tensor.where.1')}
          </li>
          <li>
            {t('tensor.where.2')}
          </li>
          <li>
            {t('tensor.where.3')}
          </li>
          <li>
            {t('tensor.where.4')}
          </li>
          <li>
            {t('tensor.where.5')}
          </li>
        </ul>
      </Section>

      <Section title={t('tensor.section.python')}>
        <CodeBlock language="python" filename="tensor_creation.py">{`import numpy as np

# 3rd-order tensor: 4 x 5 x 6
X = np.random.rand(4, 5, 6)

print("Shape:", X.shape)         # (4, 5, 6)
print("Order (ndim):", X.ndim)   # 3
print("Size:", X.size)            # 120

# Element access
print(X[2, 3, 1])

# Slice along mode-1 (fix first index, get a 5x6 matrix)
print(X[0].shape)   # (5, 6)

# 4th-order tensor (e.g., batch of video clips)
Y = np.random.rand(10, 16, 64, 64, 3)
print(Y.shape)      # (10, 16, 64, 64, 3)
print(Y.ndim)       # 5`}</CodeBlock>
        <p>
          NumPy stores tensors as regular n-dimensional arrays, but for symbolic
          tensor operations the libraries <em>TensorLy</em>, <em>PyTorch</em> and
          <em> JAX</em> are much more expressive.
        </p>
      </Section>

      <Section title={t('tensor.section.whatsnext')}>
        <p>
          {t('tensor.whatsnext')}
        </p>
      </Section>
    </ContentPage>
  );
}
