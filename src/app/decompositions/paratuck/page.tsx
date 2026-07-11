import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'PARATUCK & INDSCAL · Tensor Lab' };

export default function ParatuckPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="PARATUCK & INDSCAL"
      subtitle="PARAFAC + Tucker hybrids and individual-differences scaling"
      description="PARATUCK and INDSCAL are PARAFAC-like models with extra factor matrices that give them Tucker-like flexibility while keeping the linear-algebra structure of CP."
      level="Advanced"
      readTime="~ 20 min"
      tags={['PARATUCK', 'INDSCAL', 'Carroll-Chang', 'three-way']}
      prev={{ title: 'Tensor CUR', href: '/decompositions/cur' }}
      next={{ title: 'DEDICOM', href: '/decompositions/dedicom' }}
    >
      <Section title="PARATUCK-2">
        <p>
          <strong>PARATUCK-2</strong> (Harshman, 1972) writes a 3-way tensor as
        </p>
        <BlockMath>
          {`\\mathcal{X}_{ijk} = \\sum_{r=1}^{R} \\sum_{s=1}^{R} A_{ir} \\, B_{js} \\, C_{kr} \\, D_{ks} \\, W_{rs}`}
        </BlockMath>
        <p>
          where <MathExpr>{`\\mathbf{A}, \\mathbf{B}, \\mathbf{C}, \\mathbf{D}`}</MathExpr> are
          factor matrices and <MathExpr>{`\\mathbf{W}`}</MathExpr> is an{' '}
          <MathExpr>{`R \\times R`}</MathExpr> core. PARATUCK-2 is a special case of Tucker
          where the core is restricted to be of a particular form.
        </p>
      </Section>

      <Section title="INDSCAL: individual differences scaling">
        <p>
          <strong>INDSCAL</strong> (Carroll & Chang, 1970) decomposes a 3-way tensor{' '}
          <MathExpr>{`\\mathcal{X} \\in \\mathbb{R}^{n \\times n \\times m}`}</MathExpr>{' '}
          where each frontal slice <MathExpr>{`\\mathbf{X}_k`}</MathExpr> is an{' '}
          <MathExpr>{`n \\times n`}</MathExpr> dissimilarity matrix for subject{' '}
          <MathExpr>{`k`}</MathExpr>. The model is
        </p>
        <BlockMath>
          {`\\mathbf{X}_k \\approx \\mathbf{W} \\, \\mathbf{D}_k \\, \\mathbf{W}^T`}
        </BlockMath>
        <p>
          with <MathExpr>{`\\mathbf{D}_k = \\text{diag}(d_{1k}, \\dots, d_{Rk})`}</MathExpr>{' '}
          capturing how much each dimension matters to subject <MathExpr>{`k`}</MathExpr>.
        </p>
        <Callout type="tip" title="Identifiability">
          INDSCAL is unique (under mild conditions) up to permutation and sign — a
          remarkable property inherited from the CP-style structure of the model.
        </Callout>
      </Section>

      <Section title="PARAFAC2">
        <p>
          <strong>PARAFAC2</strong> (Harshman, 1972) handles tensors whose mode-1
          dimensions differ across slices:
        </p>
        <BlockMath>
          {`\\mathbf{X}_k \\approx \\mathbf{A}_k \\, \\mathbf{B} \\, \\mathbf{C}_k^T, \\quad \\text{subject to } \\mathbf{A}_k^T \\mathbf{A}_k = \\mathbf{\\Phi}`}
        </BlockMath>
        <p>
          where the column spaces of all <MathExpr>{`\\mathbf{A}_k`}</MathExpr> are
          constrained to share a common structure. Used in mining of evolving
          communities, time-stamped text data, and chromatography.
        </p>
      </Section>

      <Section title="Python: INDSCAL in TensorLy">
        <CodeBlock language="python" filename="paratuck.py">{`import tensorly as tl
from tensorly.decomposition import parafac2, indscal
import numpy as np

# INDSCAL: similarity tensors across subjects
X = np.random.rand(20, 20, 50)  # 20 stimuli, 50 subjects

# INDSCAL decomposition
weights, factors = indscal(X, rank=3)
# factors[0]: stimulus factors (n x R)
# factors[1]: subject weights (m x R)
print("Stimulus factors:", factors[0].shape)
print("Subject weights:", factors[1].shape)`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">INDSCAL</div>
            <div className="text-sm">
              Carroll, J. D. & Chang, J. J. (1970). <em>Analysis of individual differences
              in multidimensional scaling via an N-way generalization of Eckart-Young
              decomposition.</em> Psychometrika.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">PARAFAC2</div>
            <div className="text-sm">
              Kiers, H. A. L., ten Berge, J. M. F., & Bro, R. (1999). <em>PARAFAC2 — Part
              I. A direct fitting algorithm for the PARAFAC2 model.</em> J. Chemometrics.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
