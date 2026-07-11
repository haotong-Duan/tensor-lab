import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'DEDICOM · Tensor Lab' };

export default function DedicomPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="DEDICOM"
      subtitle="Asymmetric relationships in 3-way data"
      description="DEDICOM (DEcomposition into DIrectional COMponents) models a 3-way tensor of asymmetric relations as A_k = A R_k A^T, capturing both directions and intensities of interaction."
      level="Advanced"
      readTime="~ 15 min"
      tags={['DEDICOM', 'asymmetric', 'social-network', 'directional']}
      prev={{ title: 'PARATUCK', href: '/decompositions/paratuck' }}
      next={{ title: 'Bayesian methods', href: '/decompositions/bayesian' }}
    >
      <Section title="Motivation">
        <p>
          Many real-world 3-way tensors encode <em>directed</em> relationships. For
          example: a tensor of international trade has dimensions{' '}
          <MathExpr>{`\\text{exporter} \\times \\text{importer} \\times \\text{year}`}</MathExpr>{' '}
          — and the flow from <MathExpr>{`A`}</MathExpr> to <MathExpr>{`B`}</MathExpr>{' '}
          in year <MathExpr>{`k`}</MathExpr> is not the same as the flow from{' '}
          <MathExpr>{`B`}</MathExpr> to <MathExpr>{`A`}</MathExpr>.
        </p>
      </Section>

      <Section title="DEDICOM model">
        <BlockMath>
          {`\\mathbf{X}_k \\approx \\mathbf{A} \\, \\mathbf{R}_k \\, \\mathbf{A}^T, \\quad k = 1, \\dots, K`}
        </BlockMath>
        <p>
          where <MathExpr>{`\\mathbf{A} \\in \\mathbb{R}^{n \\times R}`}</MathExpr> is a
          shared "personality" matrix and <MathExpr>{`\\mathbf{R}_k \\in \\mathbb{R}^{R \\times R}`}</MathExpr>{' '}
          is a small <em>slice-specific</em> matrix encoding directional intensities.
        </p>
      </Section>

      <Section title="Algorithm">
        <p>
          The DEDICOM problem is solved by alternating least squares, similar to
          CP-ALS, but with the extra constraint that the same <MathExpr>{`\\mathbf{A}`}</MathExpr>{' '}
          is shared across all frontal slices.
        </p>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">DEDICOM</div>
          <div className="text-sm">
            Harshman, R. A. (1978). <em>Models for analysis of asymmetrical relationships
            in N-ways data and in 3-way data.</em> Presented at the Annual Meeting of the
            Psychometric Society.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
