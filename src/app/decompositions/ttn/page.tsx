import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Tree Tensor Network (TTN) · Tensor Lab' };

export default function TTNPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="Tree Tensor Network (TTN)"
      subtitle="Arbitrary tree structures for higher-order tensors"
      description="The most general tree-structured tensor network. The geometry of the tree reflects the structure of the data — e.g. phylogenetic trees, hierarchical features, or multi-scale models."
      level="Advanced"
      readTime="~ 25 min"
      tags={['TTN', 'tree', 'arbitrary-structure', 'DMRG', 'hierarchical']}
      prev={{ title: 'Hierarchical Tucker', href: '/decompositions/ht' }}
      next={{ title: 'PEPS', href: '/decompositions/peps' }}
    >
      <Section title="Generalizing beyond binary trees">
        <p>
          Where HT restricts the tree to be binary, a <strong>Tree Tensor Network</strong>{' '}
          (Shi, Duan, Vidal, 2006) allows an arbitrary tree. Each node is a 3rd-order
          tensor (or a 2nd-order tensor for the leaves) with one physical index and
          bond indices connecting to its parent and children.
        </p>
      </Section>

      <Section title="Choice of tree">
        <p>
          The tree topology is a design choice. Common choices include:
        </p>
        <ul>
          <li>
            <strong>Linear chain</strong>: TT (a special case).
          </li>
          <li>
            <strong>Binary tree</strong>: HT, balanced for hierarchical data.
          </li>
          <li>
            <strong>Star</strong>: a hub with all leaves connected directly — useful for
            central tensors.
          </li>
          <li>
            <strong>Custom</strong>: for phylogenetic, multi-scale, or multi-modal data.
          </li>
        </ul>
      </Section>

      <Section title="Contraction order matters">
        <p>
          The cost of contracting a TTN depends strongly on the order. Optimal contraction
          order is NP-hard in general, but heuristic algorithms (e.g. tree partitioning,
          bucket elimination) work well in practice.
        </p>
      </Section>

      <Section title="Application: multi-modal data">
        <p>
          In a multi-modal machine learning problem (e.g. text + image + audio), each
          modality is a leaf of the tree, and the root captures cross-modal interactions.
          This generalizes the <em>tensor fusion</em> approach.
        </p>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">TTN</div>
          <div className="text-sm">
            Shi, Y.-Y., Duan, L.-M., & Vidal, G. (2006). <em>Classical simulation of
            large-scale quantum many-body systems.</em> Phys. Rev. A, 74, 022320.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
