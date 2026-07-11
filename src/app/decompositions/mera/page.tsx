import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { MERADiagram } from '@/components/visualizations/tensor-diagrams';

export const metadata = { title: 'MERA · Tensor Lab' };

export default function MERAPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="MERA — Multi-scale Entanglement Renormalization Ansatz"
      subtitle="A hierarchical tensor network that captures scale-invariant entanglement"
      description="MERA generalizes MPS to critical systems and conformal field theories. It explicitly represents entanglement at all length scales via a tree of disentanglers and isometries."
      level="Research"
      readTime="~ 30 min"
      tags={['MERA', 'multi-scale', 'CFT', 'disentangler', 'isometry', 'quantum']}
      prev={{ title: 'PEPS', href: '/decompositions/peps' }}
      next={{ title: 'Tensor Ring', href: '/decompositions/tr' }}
    >
      <Section title="Beyond MPS">
        <p>
          MPS represents 1D gapped systems efficiently. But for <strong>critical</strong>{' '}
          systems — where the correlation length diverges and the entanglement entropy
          scales as <MathExpr>{`\\log(L)`}</MathExpr> — MPS requires bond dimensions
          that grow with system size.
        </p>
        <p>
          The <strong>MERA</strong> (Vidal, 2007) is a hierarchical tensor network that
          explicitly removes entanglement at each length scale. It represents ground
          states of 1D critical systems with bond dimension <MathExpr>{`\\chi`}</MathExpr>{' '}
          that is independent of <MathExpr>{`L`}</MathExpr>.
        </p>
      </Section>

      <Section title="Structure: disentanglers and isometries">
        <p>
          A MERA consists of alternating layers:
        </p>
        <ul>
          <li>
            <strong>Disentanglers</strong>: unitary 4th-order tensors{' '}
            <MathExpr>{`u`}</MathExpr> that locally remove short-range entanglement.
          </li>
          <li>
            <strong>Isometries</strong>: 3rd-order tensors{' '}
            <MathExpr>{`w`}</MathExpr> that coarse-grain two sites into one, removing
            long-range entanglement.
          </li>
        </ul>
        <div className="flex justify-center my-6">
          <GlassCard className="p-4" variant="elevated" hover={false}>
            <MERADiagram levels={4} />
          </GlassCard>
        </div>
      </Section>

      <Section title="Causal structure">
        <p>
          Each disentangler connects 4 sites at the same scale, while each isometry
          halves the number of sites. The resulting network is <em>causal</em>: the
          information flow is well-defined, and the network is a valid unitary circuit
          in the causal cone.
        </p>
        <Callout type="tip" title="Causal cone">
          The set of tensors that can affect a given observable forms a{' '}
          <em>causal cone</em> whose width grows by at most a constant factor per
          layer. This is why MERA can compute expectation values in{' '}
          <MathExpr>{`O(\\log L)`}</MathExpr> time.
        </Callout>
      </Section>

      <Section title="Optimizing MERA">
        <p>
          The standard algorithm is <strong>variational optimization</strong>: minimize
          the energy <MathExpr>{`\\langle \\psi | H | \\psi \\rangle`}</MathExpr> over
          all disentanglers and isometries, subject to the isometry constraints.
        </p>
        <p>
          Each step sweeps the network bottom-up (isometry updates) and top-down
          (disentangler updates), using the causal cone trick to compute local
          environments efficiently.
        </p>
      </Section>

      <Section title="MERA and conformal field theory">
        <p>
          At a critical point, MERA naturally realizes a <strong>discrete realization
          of a CFT</strong>: the isometries implement scaling, and the disentanglers
          implement the unitary part of the conformal map. This makes MERA a unique
          numerical tool for extracting CFT data (central charge, scaling dimensions)
          from lattice models.
        </p>
      </Section>

      <Section title="Python: optimizing a small MERA">
        <CodeBlock language="python" filename="mera.py">{`import numpy as np
import torch

class MERA:
    def __init__(self, L, chi=4):
        self.L = L
        self.chi = chi
        self.n_layers = int(np.log2(L))
        # Each layer has disentanglers and isometries
        self.disentanglers = [
            torch.randn(chi, chi, chi, chi, dtype=torch.float64)
            for _ in range(self.n_layers)
        ]
        self.isometries = [
            torch.randn(chi, chi, chi, dtype=torch.float64)
            for _ in range(self.n_layers)
        ]

    def energy(self, H_two_site):
        # Causal cone contraction - sketched
        ...

    def optimize(self, n_steps=100, lr=1e-2):
        optimizer = torch.optim.Adam(
            list(self.disentanglers) + list(self.isometries), lr=lr
        )
        for _ in range(n_steps):
            optimizer.zero_grad()
            loss = self.energy(None)
            loss.backward()
            optimizer.step()
            # Project isometries back to Stiefel manifold
            for w in self.isometries:
                U, _, V = torch.svd(w.reshape(-1, w.shape[-1]))
                w.data = (U @ V).reshape(w.shape)`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">MERA</div>
            <div className="text-sm">
              Vidal, G. (2007). <em>Entanglement Renormalization.</em> Phys. Rev. Lett.,
              99, 220405.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">CFT</div>
            <div className="text-sm">
              Evenbly, G. & Vidal, G. (2009). <em>Algorithms for entanglement
              renormalization.</em> Phys. Rev. B, 79, 144108.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
