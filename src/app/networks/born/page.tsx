import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Born Machine · Tensor Lab' };

export default function BornPage() {
  return (
    <ContentPage
      category="Tensor Networks"
      title="Born Machine"
      subtitle="Quantum-inspired generative modeling"
      description="A Born machine uses the Born rule |ψ(x)|² to define a probability distribution. The wavefunction ψ is represented as an MPS, giving an efficient, exact sampler for binary data."
      level="Research"
      readTime="~ 15 min"
      tags={['Born-machine', 'MPS', 'generative', 'sampling']}
      prev={{ title: 'Canonical Form', href: '/networks/canonical' }}
      next={{ title: 'Riemannian', href: '/networks/riemannian' }}
    >
      <Section title="Definition">
        <p>
          A <strong>Born machine</strong> defines a probability distribution over
          binary strings <MathExpr>{`x \\in \\{0, 1\\}^N`}</MathExpr> as
        </p>
        <BlockMath>
          {`p(x) = \\frac{|\\psi(x)|^2}{Z}, \\quad Z = \\sum_{x} |\\psi(x)|^2`}
        </BlockMath>
        <p>
          where <MathExpr>{`\\psi: \\{0, 1\\}^N \\to \\mathbb{C}`}</MathExpr> is
          parameterized as an MPS:
        </p>
        <BlockMath>
          {`\\psi(x) = \\text{tr}\\left( A_1[x_1] \\, A_2[x_2] \\, \\cdots \\, A_N[x_N] \\right)`}
        </BlockMath>
      </Section>

      <Section title="Training">
        <p>
          The negative log-likelihood is
        </p>
        <BlockMath>
          {`L = -\\frac{1}{|D|} \\sum_{x \\in D} \\log p(x) = -\\frac{1}{|D|} \\sum_{x \\in D} \\log |\\psi(x)|^2 + \\log Z`}
        </BlockMath>
        <p>
          The gradient can be computed exactly using the MPS structure: the partition
          function is a contraction of the network, and the per-sample log-prob is
          another contraction. Autodiff handles the rest.
        </p>
      </Section>

      <Section title="Sampling">
        <p>
          Exact sampling from a Born machine with an MPS is straightforward: condition
          on the first <MathExpr>{`k`}</MathExpr> bits, marginalize, sample the{' '}
          <MathExpr>{`(k+1)`}</MathExpr>-th, repeat. This is linear in{' '}
          <MathExpr>{`N`}</MathExpr>.
        </p>
      </Section>

      <Section title="Python: Born machine with Quimb">
        <CodeBlock language="python" filename="born.py">{`import quimb as qu
import quimb.tensor as qtn

# Create a random MPS
N = 16
chi = 8
mps = qtn.MPS_rand_state(N, bond_dim=chi, phys_dim=2)

# Compute log-prob of a binary string
x = [0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1]
psi_x = mps.to_dense()[sum(b << i for i, b in enumerate(x))]
log_p = 2 * np.log(abs(psi_x))  # log |psi(x)|^2

# Sample
sample = mps.sample(100)
print("Sampled strings:", sample[:5])`}</CodeBlock>
      </Section>

      <Section title="References">
        <GlassCard className="p-4" hover={false}>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Born Machine</div>
          <div className="text-sm">
            Han, Z.-Y. et al. (2018). <em>Unsupervised generative modeling using
            matrix product states.</em> Phys. Rev. X, 8, 031012.
          </div>
        </GlassCard>
      </Section>
    </ContentPage>
  );
}
