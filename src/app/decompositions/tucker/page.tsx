'use client';

import { useState } from 'react';
import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { Slider } from '@/components/ui/slider';
import { TuckerDiagram } from '@/components/visualizations/tensor-diagrams';
import { motion } from 'framer-motion';
import { useI18n } from '@/components/i18n';

export default function TuckerPage() {
  const { t } = useI18n();
  const [ranks, setRanks] = useState([3, 3, 3]);

  return (
    <ContentPage
      category="Tensor Decomposition"
      title="Tucker Decomposition & HOSVD"
      subtitle="Higher-Order Singular Value Decomposition"
      description="A small core tensor multiplied by orthogonal factor matrices along every mode. The natural generalization of SVD to tensors."
      level="Intermediate"
      readTime="~ 35 min"
      tags={['Tucker', 'HOSVD', 'multilinear-SVD', 'orthogonal', 'core-tensor']}
      prev={{ title: 'CP / PARAFAC', href: '/decompositions/cp' }}
      next={{ title: 'HOOI', href: '/decompositions/hooi' }}
    >
      <Section title={t('tucker.section.intuition')}>
        <p>
          The <strong>Tucker decomposition</strong> factorizes a tensor into a small{' '}
          <em>core tensor</em> <Math>{`\\mathcal{G}`}</Math> multiplied by a matrix along
          each mode. The factor matrices are typically constrained to be orthogonal —
          they play the role of singular vectors in higher-order SVD.
        </p>
        <BlockMath>
          {`\\mathcal{X} \\approx \\mathcal{G} \\times_1 \\mathbf{U}^{(1)} \\times_2 \\mathbf{U}^{(2)} \\times_3 \\mathbf{U}^{(3)}`}
        </BlockMath>
        <p>
          Equivalently, in element-wise form:
        </p>
        <BlockMath>
          {`\\mathcal{X}_{ijk} \\approx \\sum_{p=1}^{R_1} \\sum_{q=1}^{R_2} \\sum_{r=1}^{R_3} \\mathcal{G}_{pqr} \\, U^{(1)}_{ip} \\, U^{(2)}_{jq} \\, U^{(3)}_{kr}`}
        </BlockMath>
        <Callout type="tip" title="n-mode product">
          The operator <Math>{`\\times_n`}</Math> denotes the <em>n-mode product</em>: a
          tensor multiplied by a matrix along mode <Math>{`n`}</Math>. It generalizes
          the matrix-matrix product.
        </Callout>
      </Section>

      <Section title={t('tucker.section.visualization')}>
        <p>
          The figure shows a Tucker decomposition of a 3rd-order tensor: a small core
          <Math>{`\\mathcal{G}`}</Math> connected to three factor matrices{' '}
          <Math>{`\\mathbf{U}^{(1)}, \\mathbf{U}^{(2)}, \\mathbf{U}^{(3)}`}</Math>.
        </p>
        <div className="flex justify-center my-6">
          <GlassCard className="p-4" variant="elevated" hover={false}>
            <TuckerDiagram ranks={ranks} />
          </GlassCard>
        </div>
      </Section>

      <Section title={t('tucker.section.interactive')}>
        <p>
          The tuple <Math>{`(R_1, R_2, R_3)`}</Math> is the <strong>multilinear rank</strong>.
          The model is rich when each <Math>{`R_n`}</Math> is large, and highly compressed
          when they are small.
        </p>
        <div className="my-8 not-prose">
          <GlassCard className="p-6" variant="elevated" hover={false}>
            <TuckerDiagram ranks={ranks} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[0, 1, 2].map((m) => (
                <div key={m}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">R<sub>{m + 1}</sub></span>
                    <span className="font-mono text-lg font-bold text-gradient-blue">
                      {ranks[m]}
                    </span>
                  </div>
                  <Slider
                    value={[ranks[m]]}
                    onValueChange={(v) => {
                      const next = [...ranks];
                      next[m] = v[0];
                      setRanks(next);
                    }}
                    min={1}
                    max={6}
                    step={1}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border/40 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <div className="text-muted-foreground">Core size</div>
                <div className="font-mono text-sm">
                  {ranks[0]} × {ranks[1]} × {ranks[2]}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Factor params</div>
                <div className="font-mono text-sm">
                  {(ranks[0] + ranks[1] + ranks[2]) * 6}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Compression</div>
                <div className="font-mono text-sm text-emerald-500">
                  {(100 * (1 - (ranks[0] * ranks[1] * ranks[2] + 6 * (ranks[0] + ranks[1] + ranks[2])) / 1000)).toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Total params</div>
                <div className="font-mono text-sm">
                  {ranks[0] * ranks[1] * ranks[2] + 6 * (ranks[0] + ranks[1] + ranks[2])}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      <Section title={t('tucker.section.hosvd')}>
        <p>
          The <strong>Higher-Order SVD</strong> (De Lathauwer, Vandewalle, 2000) is the
          classical way to compute Tucker: take the leading left singular vectors of each
          mode-<Math>{`n`}</Math> unfolding.
        </p>
        <Callout type="definition" title="HOSVD algorithm">
          <ol>
            <li>For each mode <Math>{`n = 1, \\dots, N`}</Math>, compute the SVD of the mode-<Math>{`n`}</Math> unfolding <Math>{`\\mathcal{X}_{(n)}`}</Math>.</li>
            <li>Keep the leading <Math>{`R_n`}</Math> left singular vectors as the columns of <Math>{`\\mathbf{U}^{(n)}`}</Math>.</li>
            <li>
              Form the core by contracting with all factors:
              <BlockMath>
                {`\\mathcal{G} = \\mathcal{X} \\times_1 \\mathbf{U}^{(1)T} \\times_2 \\mathbf{U}^{(2)T} \\cdots \\times_N \\mathbf{U}^{(N)T}`}
              </BlockMath>
            </li>
          </ol>
        </Callout>
        <p>
          Unlike the matrix SVD, the HOSVD is not the <em>best</em> multilinear rank
          approximation in general. For that you need the iterative <strong>HOOI</strong>{' '}
          (Higher-Order Orthogonal Iteration).
        </p>
      </Section>

      <Section title={t('tucker.section.compare')}>
        <div className="overflow-x-auto not-prose">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-2">Property</th>
                <th className="text-left p-2">HOSVD</th>
                <th className="text-left p-2">HOOI</th>
                <th className="text-left p-2">CP</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">Computation</td>
                <td className="p-2">Closed form (N SVDs)</td>
                <td className="p-2">Iterative ALS</td>
                <td className="p-2">Iterative ALS</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">Optimality</td>
                <td className="p-2">Quasi-best (≤ √N · best)</td>
                <td className="p-2">Locally best</td>
                <td className="p-2">Locally best</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">Orthogonality</td>
                <td className="p-2">Yes</td>
                <td className="p-2">Yes</td>
                <td className="p-2">No</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">Uniqueness</td>
                <td className="p-2">Up to signed permutation</td>
                <td className="p-2">Up to signed permutation</td>
                <td className="p-2">Yes (under Kruskal)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={t('tucker.section.python')}>
        <CodeBlock language="python" filename="tucker_hosvd.py">{`import tensorly as tl
from tensorly.decomposition import tucker, partial_tucker
import numpy as np

# Create a 4th-order tensor
X = tl.tensor(np.random.rand(20, 30, 25, 15))

# Tucker decomposition with multilinear rank (5, 7, 6, 4)
ranks = [5, 7, 6, 4]
(core, factors), errors = tucker(
    X, rank=ranks, n_iter_max=100, tol=1e-6, return_errors=True
)

# core: tensor of shape (5, 7, 6, 4)
# factors: list of factor matrices, U_n has shape (I_n, R_n)
print("Core shape:", core.shape)
for n, U in enumerate(factors):
    print(f"U[{n+1}].shape = {U.shape}")

# Reconstruct
X_hat = tl.tucker_to_tensor((core, factors))
err = tl.norm(X - X_hat, 2) / tl.norm(X, 2)
print(f"Relative error: {err:.2e}")`}</CodeBlock>
      </Section>

      <Section title={t('tucker.section.matlab')}>
        <CodeBlock language="matlab" filename="tucker_hosvd.m">{`rng(0);
X = tensor(rand(20, 30, 25, 15));

% Tucker via HOSVD
ranks = [5 7 6 4];
T = hosvd(X, 'dims', ranks, 'verbose', 0);

% T.core: small core tensor
% T.U{n}: factor matrix for mode n
disp('Core size:'); disp(size(T.core))
for n = 1:ndims(X)
    fprintf('U{%d} size: %d x %d\\n', n, size(T.U{n}));
end

% Reconstruct
X_hat = ttm(T.core, T.U, -1:-1:-4);  % multiply by all factors
err = norm(double(X) - X_hat(:)) / norm(double(X(:)));
fprintf('Relative error: %.2e\\n', err);`}</CodeBlock>
      </Section>

      <Section title={t('tucker.section.best')}>
        <p>
          Eckart-Young for tensors: the <em>best</em> Tucker approximation problem is
        </p>
        <BlockMath>
          {`\\min_{\\mathcal{G}, \\mathbf{U}^{(n)}} \\left\\| \\mathcal{X} - \\mathcal{G} \\times_1 \\mathbf{U}^{(1)} \\cdots \\times_N \\mathbf{U}^{(N)} \\right\\|_F`}
        </BlockMath>
        <p>
          subject to <Math>{`\\mathbf{U}^{(n)T} \\mathbf{U}^{(n)} = \\mathbf{I}_{R_n}`}</Math>.
          HOSVD gives a quasi-best solution; HOOI is an alternating algorithm that
          converges to a stationary point and often the global optimum.
        </p>
      </Section>

      <Section title={t('tucker.section.references')}>
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">HOSVD</div>
            <div className="text-sm">
              De Lathauwer, L., De Moor, B., & Vandewalle, J. (2000). <em>A multilinear
              singular value decomposition.</em> SIAM J. Matrix Anal. Appl., 21(4), 1253-1278.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Best multilinear rank</div>
            <div className="text-sm">
              Kolda, T. G. & Bader, B. W. (2009). <em>Tensor Decompositions and Applications.</em>{' '}
              SIAM Review.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Software</div>
            <div className="text-sm">
              <a href="https://github.com/tensorly/tensorly" className="text-primary">
                TensorLy
              </a>{' '}
              ·{' '}
              <a href="https://www.tensortoolbox.org" className="text-primary">
                MATLAB Tensor Toolbox
              </a>{' '}
              ·{' '}
              <a href="https://github.com/numlinalg/tensorlab" className="text-primary">
                Tensorlab (MATLAB)
              </a>
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
