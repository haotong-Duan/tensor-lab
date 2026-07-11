import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Hierarchical Tucker (HT) · Tensor Lab' };

export default function HTPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="Hierarchical Tucker (HT)"
      subtitle="A tree-structured tensor factorization"
      description="A Tucker-like decomposition on a hierarchical tree of subsets of modes. Strictly more compact than Tucker and forms the basis of HT-DMRG and subspace methods."
      level="Advanced"
      readTime="~ 25 min"
      tags={['HT', 'hierarchical-tucker', 'tree', 'binary-tree', 'HT-DMRG']}
      prev={{ title: 'MPS', href: '/decompositions/mps' }}
      next={{ title: 'Tree Tensor Network', href: '/decompositions/ttn' }}
    >
      <Section title="Motivation">
        <p>
          Tucker requires specifying one rank per mode, leading to{' '}
          <MathExpr>{`R^N`}</MathExpr> parameters in the core. <strong>Hierarchical
          Tucker</strong> (Hackbusch, Kühn, 2009) instead organizes the modes in a
          binary tree and assigns one rank to each internal node.
        </p>
      </Section>

      <Section title="The tree of subsets">
        <p>
          A <strong>dimension tree</strong> <MathExpr>{`T`}</MathExpr> over modes{' '}
          <MathExpr>{`\\{1, \\dots, N\\}`}</MathExpr> is a binary tree whose leaves are
          singletons and whose root is the full set. Each internal node{' '}
          <MathExpr>{`t \\in T`}</MathExpr> corresponds to a subset of modes.
        </p>
        <BlockMath>
          {`\\mathcal{X} \\approx \\sum_{t \\in T} \\mathbf{U}_t \\otimes \\cdots`}
        </BlockMath>
      </Section>

      <Section title="Frames and transfer tensors">
        <p>
          For each internal node <MathExpr>{`t`}</MathExpr> with children{' '}
          <MathExpr>{`t_1, t_2`}</MathExpr>, the <em>frame</em>{' '}
          <MathExpr>{`\\mathbf{U}_t`}</MathExpr> is an orthonormal basis for the
          matricization of the partial tensor over modes in <MathExpr>{`t`}</MathExpr>.
          The <em>transfer tensor</em> <MathExpr>{`B_t`}</MathExpr> relates the
          frames at <MathExpr>{`t`}</MathExpr> to those at its children:
        </p>
        <BlockMath>
          {`\\mathbf{U}_t = B_t \\, (\\mathbf{U}_{t_1} \\otimes \\mathbf{U}_{t_2})`}
        </BlockMath>
      </Section>

      <Section title="Why HT is great">
        <ul>
          <li>
            <strong>Fewer parameters</strong> than Tucker for the same accuracy on
            hierarchical data.
          </li>
          <li>
            <strong>Adaptive tree</strong>: the tree structure can be optimized for the
            data, not fixed a priori.
          </li>
          <li>
            <strong>Linear algebra</strong>: the <em>matrix</em> subspace represented by{' '}
            <MathExpr>{`\\mathbf{U}_t`}</MathExpr> can be manipulated with standard
            tools.
          </li>
        </ul>
      </Section>

      <Section title="HT-SVD algorithm">
        <ol>
          <li>Truncate the tree into binary form (if necessary).</li>
          <li>Recursively compute SVDs of the matricizations at each level, leaving <em>transfer tensors</em>.</li>
          <li>Use rank truncation at each level with tolerance <MathExpr>{`\\varepsilon`}</MathExpr>.</li>
        </ol>
      </Section>

      <Section title="Python: HT in TensorLy">
        <CodeBlock language="python" filename="ht.py">{`import tensorly as tl
from tensorly.decomposition import hierarchical Tucker
from tensorly import random

X = random.random_tensor((10, 10, 10, 10, 10, 10))

# Binary tree of modes
tree = [[0, 1], [2, 3], [[0, 1], [2, 3]], [4, 5], [[[0, 1], [2, 3]], [4, 5]]]

# ranks per internal node
ranks = [2, 2, 4, 2, 6]

result = hierarchical_tucker(X, tree, ranks)
print("Frames shape:", [f.shape for f in result[0]])`}</CodeBlock>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">HT</div>
          <div className="text-sm">
            Hackbusch, W. & Kühn, S. (2009). <em>A new scheme for the tensor
            representation.</em> J. Fourier Anal. Appl., 15(5), 706-722.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
