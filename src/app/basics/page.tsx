'use client';

import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { Tensor3D } from '@/components/visualizations/tensor-3d';
import Link from 'next/link';
import { ArrowRight, Atom } from 'lucide-react';
import { useI18n } from '@/components/i18n';

const basicsModules = [
  { titleKey: 'basics.topic.tensor.title', descKey: 'basics.topic.tensor.desc', href: '/basics/tensor' },
  { titleKey: 'basics.topic.mode.title', descKey: 'basics.topic.mode.desc', href: '/basics/mode-fiber' },
  { titleKey: 'basics.topic.slices.title', descKey: 'basics.topic.slices.desc', href: '/basics/slices' },
  { titleKey: 'basics.topic.rank.title', descKey: 'basics.topic.rank.desc', href: '/basics/rank' },
  { titleKey: 'basics.topic.norm.title', descKey: 'basics.topic.norm.desc', href: '/basics/norm' },
  { titleKey: 'basics.topic.outer.title', descKey: 'basics.topic.outer.desc', href: '/basics/outer-product' },
  { titleKey: 'basics.topic.kron.title', descKey: 'basics.topic.kron.desc', href: '/basics/kronecker' },
  { titleKey: 'basics.topic.khatri.title', descKey: 'basics.topic.khatri.desc', href: '/basics/khatri-rao' },
  { titleKey: 'basics.topic.hadamard.title', descKey: 'basics.topic.hadamard.desc', href: '/basics/hadamard' },
  { titleKey: 'basics.topic.einsum.title', descKey: 'basics.topic.einsum.desc', href: '/basics/einsum' },
  { titleKey: 'basics.topic.matricization.title', descKey: 'basics.topic.matricization.desc', href: '/basics/matricization' },
  { titleKey: 'basics.topic.tensorization.title', descKey: 'basics.topic.tensorization.desc', href: '/basics/tensorization' },
];

export default function TensorBasicsPage() {
  const { t } = useI18n();
  return (
    <ContentPage
      category={t('module.tensor-basics')}
      title={t('basics.title')}
      subtitle={t('basics.subtitle')}
      description={t('basics.description')}
      level="Beginner"
      readTime="~ 2 hours"
      tags={['multilinear algebra', 'fundamentals', 'notation']}
      next={{ title: t('basics.topic.tensor.title'), href: '/basics/tensor' }}
    >
      <Section title="What is a tensor?">
        <p>
          A <strong>tensor</strong> is a multidimensional array of numbers. While a vector
          is a 1-D array and a matrix is 2-D, a tensor can have any number of dimensions,
          called <em>orders</em> or <em>modes</em>.
        </p>
        <BlockMath>{`\\mathcal{X} \\in \\mathbb{R}^{I_1 \\times I_2 \\times \\cdots \\times I_N}`}</BlockMath>
        <p>
          We use calligraphic letters like <Math>{`\\mathcal{X}`}</Math> for tensors,
          bold capitals like <Math>{`\\mathbf{A}`}</Math> for matrices, and bold lowercase
          like <Math>{`\\mathbf{a}`}</Math> for vectors. Scalars are plain: <Math>{`a`}</Math>.
        </p>
        <Callout type="definition" title="Order (Mode)">
          The <strong>order</strong> (or number of modes, or way) of a tensor is the
          number of indices needed to address a single element. A scalar is order-0,
          a vector is order-1, a matrix is order-2, and so on.
        </Callout>
      </Section>

      <Section title="Visualizing a 3rd-order tensor">
        <p>
          Drag the cube below to rotate it. Each cell represents one element
          <Math>{`\\mathcal{X}_{ijk}`}</Math> of a 3rd-order tensor. Color encodes magnitude.
        </p>
        <div className="flex justify-center my-8">
          <GlassCard className="p-6" variant="elevated" hover={false}>
            <Tensor3D size={300} />
          </GlassCard>
        </div>
      </Section>

      <Section title={t('basics.sections.topics')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 not-prose">
          {basicsModules.map((m) => (
            <Link key={m.href} href={m.href}>
              <GlassCard className="p-4 group" hover>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white">
                    <Atom className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm group-hover:text-primary transition-colors">
                      {t(m.titleKey)}
                    </div>
                    <div className="text-xs text-muted-foreground">{t(m.descKey)}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Why this matters">
        <p>
          Tensors generalize matrices to higher dimensions and arise naturally in
          colored images (3D: height × width × channel), video (4D: + time), recommendation
          (user × item × context), and quantum many-body physics (site × site × site × …).
          Almost every modern tensor method — CP, Tucker, TT, MPS, MERA — rests on
          the operations introduced here.
        </p>
      </Section>
    </ContentPage>
  );
}
