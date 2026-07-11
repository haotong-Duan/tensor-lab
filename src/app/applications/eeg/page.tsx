import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'EEG / fMRI · Tensor Lab' };

export default function EEGPage() {
  return (
    <ContentPage category="Applications" title="EEG and fMRI Analysis" subtitle="Channel × time × subject tensors">
      <Section title="Why tensors?">
        <p>
          EEG signals are naturally 3-way: <strong>channel × time × trial</strong>.
          fMRI is 4-way: voxel × time × condition × subject. Tucker or CP
          decompositions recover latent spatiotemporal patterns.
        </p>
      </Section>

      <Section title="Common models">
        <ul>
          <li>
            <strong>CP</strong>: each component is a (channel-pattern, time-course, trial-weight) triple. Useful for
            identifying repeated events.
          </li>
          <li>
            <strong>Tucker</strong>: a small core captures interactions between space, time, and trial.
          </li>
        </ul>
      </Section>

      <Section title="Python: CP on EEG">
        <CodeBlock language="python" filename="eeg_cp.py">{`import numpy as np
import mne
import tensorly as tl
from tensorly.decomposition import parafac

# Load EEG data: shape (n_channels, n_times, n_trials)
raw = mne.io.read_epochs_eeglab('erp_data.set')
X = raw.get_data()  # (n_channels, n_times, n_trials)
print("Shape:", X.shape)

# CP decomposition
R = 10  # number of components
weights, factors = parafac(X, rank=R, n_iter_max=200, tol=1e-6)

# factors[0]: spatial pattern, shape (n_channels, R)
# factors[1]: temporal pattern, shape (n_times, R)
# factors[2]: trial weights, shape (n_trials, R)

# Visualize the first spatial pattern
mne.viz.plot_topomap(factors[0][:, 0], raw.info)`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
