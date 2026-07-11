import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { PEPSDiagram } from '@/components/visualizations/tensor-diagrams';

export const metadata = { title: 'PEPS · Tensor Lab' };

export default function PEPSPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="PEPS — Projected Entangled Pair States"
      subtitle="2D tensor networks for higher-dimensional quantum states"
      description="The natural extension of MPS to two (and higher) dimensions. PEPS captures the area law of entanglement entropy in 2D and underlies modern variational methods for 2D quantum systems."
      level="Research"
      readTime="~ 30 min"
      tags={['PEPS', '2D', 'area law', 'quantum', 'iPEPS', 'higher-dim']}
      prev={{ title: 'Tree Tensor Network', href: '/decompositions/ttn' }}
      next={{ title: 'MERA', href: '/decompositions/mera' }}
    >
      <Section title="MPS in 2D">
        <p>
          A <strong>Projected Entangled Pair State</strong> (Verstraete, Cirac,
          Murg, 2008) generalizes MPS to a 2D lattice. Each site carries a 5th-order
          tensor: one physical index and four bond indices (left, right, up, down).
        </p>
        <BlockMath>
          {`|\\psi\\rangle = \\sum_{\\{s\\}} \\text{ttr}\\left( \\prod_{\\mathbf{r}} A_\\mathbf{r}[s_\\mathbf{r}] \\right) |\\{s\\}\\rangle`}
        </BlockMath>
        <p>
          where the contraction is over the shared bond indices on a 2D grid.
        </p>
      </Section>

      <Section title="Diagram">
        <div className="flex justify-center my-6">
          <GlassCard className="p-4" variant="elevated" hover={false}>
            <PEPSDiagram m={3} n={3} />
          </GlassCard>
        </div>
      </Section>

      <Section title="Why PEPS is hard">
        <p>
          Contracting a PEPS network is <strong>#P-complete</strong> in the worst case
          (Schuch, Wolf, Verstraete, 2007). Even for constant bond dimension{' '}
          <MathExpr>{`\\chi`}</MathExpr>, exact contraction is exponential in system
          size.
        </p>
        <p>
          In practice, we use <em>approximate contraction</em> via:
        </p>
        <ul>
          <li><strong>Boundary MPS</strong> (boundary vector method): contract the bulk into an MPS along one direction.</li>
          <li><strong>Corner transfer matrix</strong> (CTM): for translationally-invariant systems.</li>
          <li><strong>Tensor network renormalization</strong> (TRG, HOTRG): coarse-grain the lattice.</li>
        </ul>
      </Section>

      <Section title="Area law in 2D">
        <p>
          The entanglement entropy of a region <MathExpr>{`R`}</MathExpr> scales as
          its boundary, not its volume:
        </p>
        <BlockMath>
          {`S(R) = O(|\\partial R|)`}
        </BlockMath>
        <p>
          PEPS automatically respects this scaling: the bond dimension controls the
          constant prefactor, and a constant <MathExpr>{`\\chi`}</MathExpr> suffices
          for gapped 2D systems.
        </p>
      </Section>

      <Section title="iPEPS: infinite PEPS">
        <p>
          For translationally-invariant states in the thermodynamic limit, we use{' '}
          <strong>infinite PEPS</strong> (iPEPS) with a 2-site unit cell. The simplest
          contraction method is the <strong>simple update</strong>: at each step,
          SVD the two-site reduced tensor and truncate.
        </p>
        <p>
          More accurate methods are the <strong>fast full update</strong> and{' '}
          <strong>CTM</strong> environment, both of which compute gradient information
          for variational optimization.
        </p>
      </Section>

      <Section title="Optimization: variational iPEPS">
        <CodeBlock language="python" filename="ipeps.py">{`import torch
import numpy as np

class iPEPS:
    def __init__(self, d=2, D=4, chi=20):
        self.d = d  # physical dim
        self.D = D  # bond dim
        self.chi = chi  # boundary MPS dim
        # 2-site unit cell: tensors A and B
        self.A = torch.randn(D, D, D, D, d, dtype=torch.float64, requires_grad=True)
        self.B = torch.randn(D, D, D, D, d, dtype=torch.float64, requires_grad=True)

    def energy(self, h):
        # Contract bulk and boundary using CTM (sketched)
        # Returns <psi|h|psi> / <psi|psi>
        return torch.tensor(0.0, dtype=torch.float64)

    def optimize(self, h, n_steps=100, lr=1e-2):
        opt = torch.optim.Adam([self.A, self.B], lr=lr)
        for step in range(n_steps):
            opt.zero_grad()
            e = self.energy(h)
            e.backward()
            opt.step()
            if step % 10 == 0:
                print(f"step {step}: E = {e.item():.6f}")`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">PEPS</div>
            <div className="text-sm">
              Verstraete, F., Murg, V., & Cirac, J. I. (2008). <em>Matrix product
              states, projected entangled pair states, and variational renormalization
              group methods for quantum spin systems.</em> Adv. Phys., 57(2), 143-224.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">CTM</div>
            <div className="text-sm">
              Nishino, T. & Okunishi, K. (1996). <em>Corner transfer matrix
              renormalization group method.</em> JPSJ, 65, 891.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
