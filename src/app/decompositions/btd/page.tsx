import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Block Term Decomposition (BTD) · Tensor Lab' };

export default function BTDPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="Block Term Decomposition (BTD)"
      subtitle="A Tucker-flavored CP-flavored hybrid"
      description="Decompose a tensor as a sum of low-rank Tucker blocks. Strictly contains CP (rank-1 blocks) and Tucker (a single block) as special cases."
      level="Advanced"
      readTime="~ 20 min"
      tags={['BTD', 'block-term', 'rank-(L,M,N)', 'hybrid']}
      prev={{ title: 'TT', href: '/decompositions/tt' }}
      next={{ title: 't-SVD', href: '/decompositions/t-svd' }}
    >
      <Section title="Definition">
        <p>
          A <strong>Block Term Decomposition</strong> (De Lathauwer, 2008) expresses a
          tensor as a sum of <MathExpr>{`R`}</MathExpr> Tucker blocks, each of multilinear
          rank <MathExpr>{`(L_r, M_r, N_r, \\dots)`}</MathExpr>:
        </p>
        <BlockMath>
          {`\\mathcal{X} = \\sum_{r=1}^{R} \\mathcal{G}_r \\times_1 \\mathbf{A}^{(1)}_r \\times_2 \\mathbf{A}^{(2)}_r \\times_3 \\mathbf{A}^{(3)}_r`}
        </BlockMath>
      </Section>

      <Section title="Special cases">
        <ul>
          <li>
            <strong>CP</strong>: each block is rank-1, i.e.{' '}
            <MathExpr>{`L_r = M_r = N_r = 1`}</MathExpr>.
          </li>
          <li>
            <strong>Tucker</strong>: <MathExpr>{`R = 1`}</MathExpr>.
          </li>
          <li>
            <strong>BTD-(L,L,1)</strong>: each block has rank-<MathExpr>{`L`}</MathExpr>{' '}
            in two modes and rank-1 in the third.
          </li>
        </ul>
      </Section>

      <Section title="Why BTD?">
        <p>
          BTD sits between CP and Tucker in expressiveness. When the data naturally
          decomposes into a few <em>low-rank clusters</em>, BTD gives more compact
          and interpretable models than CP alone.
        </p>
        <Callout type="tip" title="Blind source separation">
          BTD-(L,L,1) is the natural model for <em>convolutive mixtures</em> in
          signal processing: each block represents a single source with rank{' '}
          <MathExpr>{`L`}</MathExpr> in time and frequency.
        </Callout>
      </Section>

      <Section title="Algorithm: BTD-ALS">
        <ol>
          <li>Initialize <MathExpr>{`R`}</MathExpr> block cores and factors.</li>
          <li>For each block, update its core and factors given the residual.</li>
          <li>Repeat until convergence.</li>
        </ol>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">BTD</div>
          <div className="text-sm">
            De Lathauwer, L. (2008). <em>Decompositions of a higher-order tensor in
            block terms — Part I and II.</em> SIAM J. Matrix Anal. Appl., 30(3).
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
