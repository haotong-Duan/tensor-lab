import { ContentPage, Section, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'MATLAB · Tensor Lab' };

export default function MatlabPage() {
  return (
    <ContentPage
      category="Code Center"
      title="MATLAB with Tensor Toolbox"
      subtitle="The original, mature, comprehensive"
      description="The MATLAB Tensor Toolbox and Tensorlab are the canonical reference implementations for every classical tensor decomposition."
      level="All"
    >
      <Section title="Setting up">
        <CodeBlock language="matlab" filename="setup.m">{`% Add Tensor Toolbox to path
addpath('tensor_toolbox')

% Or for Tensorlab
addpath(genpath('tensorlab'))`}</CodeBlock>
      </Section>

      <Section title="CP / PARAFAC">
        <CodeBlock language="matlab" filename="cp_matlab.m">{`rng(42);

% Ground truth
I1 = 30; I2 = 40; I3 = 20; R = 5;
A = randn(I1, R); B = randn(I2, R); C = randn(I3, R);
X = ktensor({A, B, C});

% CP-ALS
[cp_result, ~, output] = cp_als(X.tensor, R, ...
    'maxiters', 100, ...
    'tol', 1e-8, ...
    'printitn', 10, ...
    'init', 'rand');

fprintf('Final fit: %.4f\\n', output.fit);
fprintf('Iterations: %d\\n', output.iter);

% Compare factor recovery
disp('Factor A correlation with true A:');
disp(corr(cp_result.U{1}, A));  % columns permuted and possibly signed`}</CodeBlock>
      </Section>

      <Section title="Tucker / HOSVD">
        <CodeBlock language="matlab" filename="tucker_matlab.m">{`rng(42);
X = tensor(rand(20, 30, 25));
ranks = [5 7 6];

% HOSVD (one iteration = HOSVD exactly)
T_hosvd = hosvd(X, 'dims', ranks, 'verbose', 0);
fprintf('HOSVD core size: %s\\n', mat2str(size(T_hosvd.core)));

% HOOI (50 iterations)
T_hooi = hooi(X, ranks, 'maxiters', 50, 'tol', 1e-6);
fprintf('HOOI core size: %s\\n', mat2str(size(T_hooi.core)));

% Reconstruct
X_hat = ttm(T_hooi.core, T_hooi.U, -1:-1:-3);  % multiply by all factors
err = norm(double(X) - X_hat(:)) / norm(double(X(:)));
fprintf('HOOI relative error: %.4e\\n', err);`}</CodeBlock>
      </Section>

      <Section title="Tensor Train (TT)">
        <CodeBlock language="matlab" filename="tt_matlab.m">{`rng(42);
X = tensor(rand(4, 4, 4, 4, 4, 4));

% TT decomposition
tt = tt_tensor(X, 1e-6, [1 4 4 4 4 4 1]);

% Inspect
for k = 1:numel(tt.core)
    fprintf('Core %d: %s\\n', k, mat2str(size(tt.core{k})));
end

% Reconstruct
X_hat = full(tt);
err = norm(double(X) - X_hat(:)) / norm(double(X(:)));
fprintf('TT relative error: %.4e\\n', err);`}</CodeBlock>
      </Section>

      <Section title="Tensorlab: structured optimization">
        <CodeBlock language="matlab" filename="tensorlab.m">{`% Tensorlab provides a different API: optimization over structured
% variables, with automatic differentiation.
addpath('tensorlab');

% Define a CP structure
cp = cp_rank(5, 'dim', {[20 1], [1 30], [1 25]});
% Build cost
cost = frob(cpd(X) - real(X));  % TENSORLAB syntax
% Solve
[sol, info] = sdf_lbfgs(cost, cp);
disp(info.itr); disp(info.fval);`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
