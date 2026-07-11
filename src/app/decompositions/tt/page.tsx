'use client';

import { useState } from 'react';
import { ContentPage, Section, Callout, CodeBlock } from '@/components/content-page';
import { Math as MathExpr, BlockMath } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { Slider } from '@/components/ui/slider';
import { TTDiagram } from '@/components/visualizations/tensor-diagrams';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/components/i18n';

export default function TTPage() {
  const { t } = useI18n();
  const [order, setOrder] = useState(5);
  const [ttRank, setTTRank] = useState(3);

  return (
    <ContentPage
      category="Tensor Decomposition"
      title="Tensor Train (TT)"
      subtitle="Linear chain of 3rd-order cores"
      description="A decomposition that turns an exponential-size tensor into a chain of small 3rd-order cores. The workhorse of tensor networks in AI and scientific computing."
      level="Advanced"
      readTime="~ 50 min"
      tags={['TT', 'tensor-train', 'TT-SVD', 'TT-cross', 'MPS', 'quantum']}
      prev={{ title: 'HOOI', href: '/decompositions/hooi' }}
      next={{ title: 'Tensor Ring', href: '/decompositions/tr' }}
    >
      <Section title={t('tt.section.intuition')}>
        <p>
          The <strong>Tensor Train</strong> (Oseledets, 2011) factorizes a high-order
          tensor into a chain of 3rd-order <em>TT-cores</em>. The first and last cores
          are order-2 (matrices), and the rest are 3rd-order tensors.
        </p>
        <BlockMath>
          {`\\mathcal{X}_{i_1 i_2 \\cdots i_N} \\approx \\mathbf{G}_1[i_1] \\, \\mathbf{G}_2[i_2] \\, \\cdots \\, \\mathbf{G}_N[i_N]`}
        </BlockMath>
        <p>
          where each <MathExpr>{`\\mathbf{G}_k[i_k] \\in \\mathbb{R}^{r_{k-1} \\times r_k}`}</MathExpr>{' '}
          is a matrix obtained by fixing the physical index of core{' '}
          <MathExpr>{`k`}</MathExpr>. The <MathExpr>{`r_k`}</MathExpr> are the <em>TT-ranks</em> with
          boundary condition <MathExpr>{`r_0 = r_N = 1`}</MathExpr>.
        </p>
        <Callout type="tip" title="Why train?">
          The cores are connected linearly like cars in a train, and a "passenger"
          (an element of the original tensor) is reconstructed by walking through every
          car and multiplying the corresponding slice matrices.
        </Callout>
      </Section>

      <Section title={t('tt.section.visualization')}>
        <div className="flex justify-center my-6">
          <GlassCard className="p-4" variant="elevated" hover={false}>
            <TTDiagram order={order} ranks={[1, ttRank, ttRank, ttRank, ttRank, 1]} />
          </GlassCard>
        </div>
      </Section>

      <Section title={t('tt.section.interactive')}>
        <p>
          The number of parameters in a TT decomposition is{' '}
          <MathExpr>{`\\sum_{k=1}^{N} r_{k-1} \\, I_k \\, r_k`}</MathExpr> — <em>linear</em> in{' '}
          <MathExpr>{`N`}</MathExpr> and <em>quadratic</em> in the ranks, instead of exponential
          in <MathExpr>{`N`}</MathExpr> for the full tensor.
        </p>
        <div className="my-8 not-prose">
          <GlassCard className="p-6" variant="elevated" hover={false}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Order N</span>
                  <span className="font-mono text-lg font-bold text-gradient-blue">{order}</span>
                </div>
                <Slider value={[order]} onValueChange={(v) => setOrder(v[0])} min={3} max={10} step={1} />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  {[3, 4, 5, 6, 7, 8, 9, 10].map((i) => <span key={i}>{i}</span>)}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">TT-rank r</span>
                  <span className="font-mono text-lg font-bold text-gradient-blue">{ttRank}</span>
                </div>
                <Slider value={[ttRank]} onValueChange={(v) => setTTRank(v[0])} min={1} max={10} step={1} />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => <span key={i}>{i}</span>)}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/40 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <div className="text-muted-foreground">Full tensor size</div>
                <div className="font-mono text-sm">
                  {globalThis.Math.pow(10, order).toExponential(2)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">TT parameters</div>
                <div className="font-mono text-sm text-blue-500">
                  {((2 * order - 1) * ttRank * ttRank * 10).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Compression</div>
                <div className="font-mono text-sm text-emerald-500">
                  {(100 * (1 - (2 * order - 1) * ttRank * ttRank * 10 / globalThis.Math.pow(10, order))).toFixed(4)}%
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Per-core size</div>
                <div className="font-mono text-sm">
                  {ttRank} × 10 × {ttRank}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      <Section title={t('tt.section.svd')}>
        <p>
          The <strong>TT-SVD</strong> algorithm (Oseledets, 2011) constructs a TT
          decomposition by a sequence of truncations of mode unfoldings. For each
          mode, perform an SVD of the current unfolding and keep the leading{' '}
          <MathExpr>{`r_k`}</MathExpr> singular values.
        </p>
        <Callout type="definition" title="TT-SVD pseudocode">
          <ol>
            <li>Reshape <MathExpr>{`\\mathcal{X}`}</MathExpr> as a matrix <MathExpr>{`\\mathbf{M}_1 \\in \\mathbb{R}^{I_1 \\times (I_2 I_3 \\cdots I_N)}`}</MathExpr>.</li>
            <li>Compute truncated SVD <MathExpr>{`\\mathbf{M}_1 = \\mathbf{U}_1 \\mathbf{S}_1 \\mathbf{V}_1^T`}</MathExpr> with rank <MathExpr>{`r_1`}</MathExpr>.</li>
            <li>Set <MathExpr>{`\\mathbf{G}_1 = \\mathbf{U}_1 \\in \\mathbb{R}^{I_1 \\times r_1}`}</MathExpr>, and reshape <MathExpr>{`\\mathbf{S}_1 \\mathbf{V}_1^T`}</MathExpr> into <MathExpr>{`\\mathbf{M}_2 \\in \\mathbb{R}^{r_1 I_2 \\times (I_3 \\cdots I_N)}`}</MathExpr>.</li>
            <li>Repeat for <MathExpr>{`k = 2, \\dots, N-1`}</MathExpr>, getting cores <MathExpr>{`\\mathbf{G}_k \\in \\mathbb{R}^{r_{k-1} \\times I_k \\times r_k}`}</MathExpr>.</li>
            <li>The last core is <MathExpr>{`\\mathbf{G}_N = \\mathbf{M}_N \\in \\mathbb{R}^{r_{N-1} \\times I_N}`}</MathExpr>.</li>
          </ol>
        </Callout>
        <p>
          The rank <MathExpr>{`r_k`}</MathExpr> can be chosen adaptively: keep singular values
          above <MathExpr>{`\\varepsilon`}</MathExpr> times the first one. This is the
          <em> TT-rounding</em> procedure.
        </p>
      </Section>

      <Section title={t('tt.section.curse')}>
        <p>
          Consider an order-<MathExpr>{`N`}</MathExpr> tensor with all <MathExpr>{`I_n = 100`}</MathExpr>.
          The full tensor has <MathExpr>{`100^N`}</MathExpr> entries. With TT-rank <MathExpr>{`r = 5`}</MathExpr>,
          we need only <MathExpr>{`2 \\cdot 5^2 \\cdot 100 \\cdot N \\approx 5000 N`}</MathExpr>{' '}
          parameters — linear in <MathExpr>{`N`}</MathExpr>.
        </p>
        <div className="overflow-x-auto not-prose">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-2">N</th>
                <th className="text-left p-2">Full size</th>
                <th className="text-left p-2">TT params (r=5)</th>
                <th className="text-left p-2">Ratio</th>
              </tr>
            </thead>
            <tbody>
              {[3, 5, 8, 10, 20, 50].map((N) => (
                <tr key={N} className="border-t">
                  <td className="p-2 font-mono">{N}</td>
                  <td className="p-2 font-mono">{globalThis.Math.pow(100, N).toExponential(2)}</td>
                  <td className="p-2 font-mono">{(2 * 25 * 100 * N).toLocaleString()}</td>
                  <td className="p-2 font-mono text-emerald-500">
                    {(100 ** N / (2 * 25 * 100 * N)).toExponential(2)}×
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={t('tt.section.canonical')}>
        <p>
          The TT decomposition is not unique: each pair of adjacent cores can be
          right-multiplied and left-multiplied by an invertible matrix{' '}
          <MathExpr>{`\\mathbf{R}, \\mathbf{R}^{-1}`}</MathExpr> without changing the
          reconstruction. This is the <em>gauge freedom</em>.
        </p>
        <p>
          Choosing <MathExpr>{`\\mathbf{R}`}</MathExpr> so that each core has orthogonal left
          and right unfoldings gives the <strong>left-/right-orthogonal (canonical)
          form</strong>, which is essential for stable algorithms like DMRG, TEBD,
          and Riemannian optimization.
        </p>
      </Section>

      <Section title={t('tt.section.python')}>
        <CodeBlock language="python" filename="tt_decomposition.py">{`import tensorly as tl
from tensorly.decomposition import tensor_train
from tensorly import random
import numpy as np

# Random order-6 tensor with I_n = 10
X = random.random_tensor((10, 10, 10, 10, 10, 10))

# TT decomposition with target rank
factors = tensor_train(X, rank=[1, 4, 4, 4, 4, 4, 1])

# factors is a list of cores
for k, G in enumerate(factors):
    print(f"Core {k+1}: shape {G.shape}")

# Reconstruct
X_hat = tl.tt_to_tensor(factors)
err = tl.norm(X - X_hat, 2) / tl.norm(X, 2)
print(f"Relative error: {err:.2e}")

# TT-rounding
factors_rounded, _ = tl.decomposition.tensor_train._tt_rounding(
    X, eps=1e-6, rank=None
)`}</CodeBlock>
      </Section>

      <Section title={t('tt.section.matlab')}>
        <CodeBlock language="matlab" filename="tt_decomposition.m">{`rng(0);
X = tensor(rand(10, 10, 10, 10, 10, 10));

% TT decomposition
tt = tt_tensor(X, 1e-6, [1 4 4 4 4 4 1]);

% Inspect cores
for k = 1:numel(tt.core)
    fprintf('Core %d: %s\\n', k, mat2str(size(tt.core{k})));
end

% Reconstruct
X_hat = full(tt);
err = norm(double(X) - X_hat(:)) / norm(double(X(:)));
fprintf('Relative error: %.2e\\n', err);`}</CodeBlock>
      </Section>

      <Section title={t('tt.section.apps')}>
        <p>
          TT has become central to <em>model compression</em> for deep learning:
        </p>
        <ul>
          <li>
            <strong>Tensorized Neural Networks (TNN)</strong>: replace dense weight
            matrices with TT-format matrices to get extreme compression.
          </li>
          <li>
            <strong>LoRA with TT</strong>: the low-rank updates are themselves stored
            as TT-cores, giving <em>parameter-efficient fine-tuning</em>.
          </li>
          <li>
            <strong>LLM compression</strong>: TT has been used to compress GPT-2 and
            LLaMA layers with minimal accuracy loss.
          </li>
          <li>
            <strong>Quantum-inspired</strong>: TT is the real-space image of MPS for
            1D spin chains with open boundary conditions.
          </li>
        </ul>
      </Section>

      <Section title={t('tt.section.references')}>
        <div className="space-y-2 not-prose">
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Foundational</div>
            <div className="text-sm">
              Oseledets, I. V. (2011). <em>Tensor-train decomposition.</em> SIAM J.
              Sci. Comput., 33(5), 2295-2317.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">TT for neural networks</div>
            <div className="text-sm">
              Novikov, A., Podoprikhin, D., Osokin, A., & Vetrov, D. (2015). <em>Tensorizing
              neural networks.</em> NeurIPS.
            </div>
          </GlassCard>
          <GlassCard className="p-4" hover={false}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">TT for LLMs</div>
            <div className="text-sm">
              Sun, Z. et al. (2024). <em>LoRA-Flow: Efficient LLM Fine-tuning via
              Tensor-Train Low-Rank Adaptation.</em> arXiv.
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
