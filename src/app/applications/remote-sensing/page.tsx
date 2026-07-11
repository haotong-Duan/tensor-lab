import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Remote Sensing · Tensor Lab' };

export default function RemoteSensingPage() {
  return (
    <ContentPage category="Applications" title="Remote Sensing & Hyperspectral" subtitle="Material unmixing and land-cover classification">
      <Section title="Hyperspectral cube">
        <p>
          A hyperspectral image is a 3D tensor <MathExpr>{`\\mathcal{X} \\in \\mathbb{R}^{H \\times W \\times B}`}</MathExpr>{' '}
          with <MathExpr>{`B`}</MathExpr> spectral bands (often 200+).
        </p>
      </Section>

      <Section title="Nonnegative Tucker for unmixing">
        <p>
          Each pixel is a mixture of <MathExpr>{`R`}</MathExpr> endmember spectra
          weighted by their abundances. Nonnegative Tucker decomposition with all
          factors and core constrained nonnegative recovers both spectra and
          abundances.
        </p>
        <BlockMath>
          {`\\mathcal{X}_{hwb} = \\sum_{p, q, r} \\mathcal{G}_{pqr} \\, U^{(1)}_{hp} \\, U^{(2)}_{wq} \\, U^{(3)}_{br}, \\quad \\geq 0`}
        </BlockMath>
      </Section>

      <Section title="Python: hyperspectral unmixing">
        <CodeBlock language="python" filename="unmixing.py">{`import scipy.io
import tensorly as tl
from tensorly.decomposition import non_negative_tucker

# Load hyperspectral data
data = scipy.io.loadmat('hyperspectral.mat')['X']  # (H, W, B)
H, W, B = data.shape

# Nonnegative Tucker
ranks = [H, W, 15]  # 15 endmembers
(core, factors), errors = non_negative_tucker(
    data, rank=ranks, n_iter_max=200, tol=1e-6, return_errors=True
)

# factors[2]: endmember spectra, shape (B, 15)
# factors[0] @ factors[1].T: abundance maps`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
