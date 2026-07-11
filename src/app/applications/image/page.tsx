import { ContentPage, Section, BlockMath, Math as MathExpr, CodeBlock } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';

export const metadata = { title: 'Image Compression · Tensor Lab' };

export default function ImageAppPage() {
  return (
    <ContentPage category="Applications" title="Image & Video Compression" subtitle="Tucker and TT for color images and video">
      <Section title="Color image as a 3rd-order tensor">
        <p>
          A color image is a 3rd-order tensor <MathExpr>{`\\mathcal{X} \\in \\mathbb{R}^{H \\times W \\times 3}`}</MathExpr>{' '}
          (height, width, RGB). Tucker decomposition with multilinear rank{' '}
          <MathExpr>{`(R_H, R_W, R_C)`}</MathExpr> gives a low-rank approximation
          that preserves the visual structure.
        </p>
        <BlockMath>
          {`\\hat{\\mathcal{X}}_{ijk} = \\sum_{p=1}^{R_H} \\sum_{q=1}^{R_W} \\sum_{r=1}^{R_C} \\mathcal{G}_{pqr} \\, U^{(1)}_{ip} \\, U^{(2)}_{jq} \\, U^{(3)}_{kr}`}
        </BlockMath>
      </Section>

      <Section title="Compression ratio">
        <p>
          For a <MathExpr>{`512 \\times 512 \\times 3`}</MathExpr> image with Tucker
          rank <MathExpr>{`(64, 64, 3)`}</MathExpr>:
        </p>
        <ul>
          <li>Original: <MathExpr>{`512 \\times 512 \\times 3 = 786{,}432`}</MathExpr> entries</li>
          <li>Tucker: <MathExpr>{`64 \\times 64 \\times 3 + 512 \\times 64 \\times 2 + 3 \\times 64 = 76{,}800`}</MathExpr> parameters</li>
          <li>Compression ratio: ~10×</li>
        </ul>
      </Section>

      <Section title="Python: image Tucker compression">
        <CodeBlock language="python" filename="image_tucker.py">{`import numpy as np
import tensorly as tl
from tensorly.decomposition import tucker
from PIL import Image

# Load color image
img = np.array(Image.open('photo.jpg'))  # shape (H, W, 3)
H, W, C = img.shape

# Tucker with rank (R_H, R_W, R_C)
ranks = [H // 4, W // 4, 3]  # 4x compression
(core, factors), errors = tucker(img, rank=ranks, n_iter_max=50, return_errors=True)

# Reconstruct
img_hat = tl.tucker_to_tensor((core, factors)).clip(0, 255).astype(np.uint8)

# Save
Image.fromarray(img_hat).save('compressed.jpg')

# Compression stats
n_params = core.size + sum(f.size for f in factors)
print(f"Original size: {img.size} bytes")
print(f"Compressed params: {n_params}")
print(f"Compression ratio: {img.size / n_params:.1f}x")
print(f"PSNR: {20 * np.log10(255) - 10 * np.log10(((img - img_hat) ** 2).mean()):.1f} dB")`}</CodeBlock>
      </Section>
    </ContentPage>
  );
}
