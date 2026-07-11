import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Bayesian Tensor Decompositions · Tensor Lab' };

export default function BayesianPage() {
  return (
    <ContentPage
      category="Tensor Decomposition"
      title="Bayesian CP & Tucker"
      subtitle="Probabilistic decompositions with uncertainty"
      description="Replace point estimates of CP/Tucker factors with posterior distributions. Yields uncertainty quantification, automatic rank determination via ARD priors, and robustness to noise."
      level="Research"
      readTime="~ 25 min"
      tags={['Bayesian', 'variational-inference', 'MCMC', 'ARD', 'probabilistic-CP']}
      prev={{ title: 'DEDICOM', href: '/decompositions/dedicom' }}
      next={{ title: 'Sparse & Nonnegative', href: '/decompositions/sparse' }}
    >
      <Section title="Probabilistic CP">
        <p>
          A <strong>probabilistic CP</strong> model assumes the observed tensor{' '}
          <MathExpr>{`\\mathcal{X}`}</MathExpr> is generated from
        </p>
        <BlockMath>
          {`\\mathcal{X}_{i_1 \\dots i_N} \\sim \\mathcal{N}\\left( \\sum_{r=1}^{R} \\prod_{n=1}^{N} a^{(n)}_{i_n, r}, \\, \\tau^{-1} \\right)`}
        </BlockMath>
        <p>
          with priors on the factors (e.g. Gaussian) and possibly a hyper-prior on the
          precision <MathExpr>{`\\tau`}</MathExpr>. The posterior is approximated by
          variational inference or MCMC.
        </p>
      </Section>

      <Section title="ARD: automatic relevance determination">
        <p>
          By placing a non-standard prior on each rank component
        </p>
        <BlockMath>
          {`\\lambda_r \\sim \\text{Gamma}(\\alpha_0, \\beta_0), \\quad a^{(n)}_{:,r} \\sim \\mathcal{N}(0, \\lambda_r^{-1} \\mathbf{I})`}
        </BlockMath>
        <p>
          the model automatically prunes unused components: their{' '}
          <MathExpr>{`\\lambda_r \\to \\infty`}</MathExpr> drives the corresponding
          factors to zero. This gives a fully data-driven choice of rank.
        </p>
      </Section>

      <Section title="Variational inference">
        <p>
          Mean-field VI approximates the posterior with a factorized distribution
          <MathExpr>{`q(\\mathbf{A}, \\mathbf{B}, \\mathbf{C}, \\tau, \\{\\lambda_r\\}) = q(\\mathbf{A}) q(\\mathbf{B}) \\cdots`}</MathExpr>{' '}
          and maximizes the evidence lower bound (ELBO) using coordinate ascent.
        </p>
      </Section>

      <Section title="Python: Bayesian CP with PyMC">
        <CodeBlock language="python" filename="bayesian_cp.py">{`import pymc as pm
import numpy as np

I1, I2, I3 = 30, 40, 20
X = np.random.randn(I1, I2, I3)
R = 5

with pm.Model() as model:
    # ARD priors for each rank component
    tau = pm.Gamma("tau", 1.0, 1.0)
    alpha = pm.Gamma("alpha", 1e-3, 1e-3, shape=R)

    # Factor matrices
    A = pm.Normal("A", 0, sigma=1.0 / pm.math.sqrt(alpha)[None, :], shape=(I1, R))
    B = pm.Normal("B", 0, sigma=1.0 / pm.math.sqrt(alpha)[None, :], shape=(I2, R))
    C = pm.Normal("C", 0, sigma=1.0 / pm.math.sqrt(alpha)[None, :], shape=(I3, R))

    # Deterministic reconstruction
    pred = pm.math.einsum("ir,jr,kr->ijk", A, B, C)

    # Likelihood
    obs = pm.Normal("obs", mu=pred, sigma=1.0 / pm.math.sqrt(tau), observed=X)

    trace = pm.sample(1000, tune=500, return_inferencedata=True)

# Inspect posterior
import arviz as az
az.summary(trace, var_names=["alpha"])`}</CodeBlock>
      </Section>

      <Section title="References">
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Bayesian CP</div>
            <div className="text-sm">
              Hoff, P. D. (2011). <em>Hierarchical multilinear models for multiway data.</em>{' '}
              Comp. Stat. & Data Analysis, 55(1), 530-543.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">ARD Tucker</div>
            <div className="text-sm">
              Mørup, M. & Hansen, L. K. (2009). <em>Automatic relevance determination
              for multi-way models.</em> J. Chemometrics.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
