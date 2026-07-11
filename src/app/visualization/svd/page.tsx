'use client';

import { useState, useMemo } from 'react';
import { ContentPage, Section } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Activity, BarChart3 } from 'lucide-react';

export default function SVDVizPage() {
  const [size, setSize] = useState(50);
  const [noise, setNoise] = useState(0.05);
  const [rank, setRank] = useState(10);

  const singularValues = useMemo(() => {
    // Generate a low-rank matrix plus noise
    const A: number[][] = [];
    const rTrue = rank;
    for (let i = 0; i < size; i++) {
      A.push([]);
      for (let j = 0; j < size; j++) {
        let s = 0;
        for (let k = 0; k < rTrue; k++) {
          s += Math.exp(-k / 5) * Math.cos((i * 0.1 + j * 0.05) * (k + 1) * 0.1);
        }
        s += (Math.random() - 0.5) * noise;
        A[i].push(s);
      }
    }
    // Power iteration to estimate top singular values (lightweight)
    const svd: number[] = [];
    let B = A.map((row) => row.slice());
    for (let k = 0; k < Math.min(rank * 2, 30); k++) {
      // Estimate σ_k by power iteration
      let v = Array(size).fill(0).map(() => Math.random());
      for (let it = 0; it < 50; it++) {
        // u = A v
        const u = Array(size).fill(0);
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) u[i] += A[i][j] * v[j];
        }
        // v = A^T u
        const vNew = Array(size).fill(0);
        for (let j = 0; j < size; j++) {
          for (let i = 0; i < size; i++) vNew[j] += A[i][j] * u[i];
        }
        const norm = Math.sqrt(vNew.reduce((s, x) => s + x * x, 0));
        v = vNew.map((x) => x / (norm + 1e-10));
      }
      // σ = ||A v||
      const u = Array(size).fill(0);
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) u[i] += A[i][j] * v[j];
      }
      const sigma = Math.sqrt(u.reduce((s, x) => s + x * x, 0));
      svd.push(sigma);
      // Deflate: A = A - σ u v^T
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) A[i][j] -= sigma * u[i] * v[j];
      }
    }
    return svd;
  }, [size, noise, rank]);

  const truncated = singularValues.slice(0, rank);
  const total = truncated.reduce((a, b) => a + b, 0);
  const energy = (singularValues.slice(0, rank).reduce((a, b) => a + b, 0) /
    singularValues.reduce((a, b) => a + b, 0)) * 100;

  return (
    <ContentPage
      category="Visualization"
      title="Singular Value Spectrum"
      subtitle="A live, interactive SVD visualization"
    >
      <Section title="How to use">
        <p>
          Move the sliders to change the size, noise, and rank of the matrix. Watch
          the singular value spectrum adapt in real time.
        </p>

        <div className="my-8 not-prose">
          <GlassCard className="p-6" variant="elevated" hover={false}>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>Size</span>
                  <span className="font-mono font-semibold">{size}×{size}</span>
                </div>
                <Slider value={[size]} onValueChange={(v) => setSize(v[0])} min={10} max={100} step={5} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>True rank</span>
                  <span className="font-mono font-semibold">{rank}</span>
                </div>
                <Slider value={[rank]} onValueChange={(v) => setRank(v[0])} min={2} max={30} step={1} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>Noise</span>
                  <span className="font-mono font-semibold">{noise.toFixed(2)}</span>
                </div>
                <Slider value={[noise * 100]} onValueChange={(v) => setNoise(v[0] / 100)} min={0} max={50} step={1} />
              </div>
            </div>

            <div className="border-t border-border/40 pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> Top singular values (log scale)
                </div>
                <Badge variant="gradient">Energy kept: {energy.toFixed(1)}%</Badge>
              </div>
              <SingularValueChart values={singularValues} rank={rank} />
            </div>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}

function SingularValueChart({ values, rank }: { values: number[]; rank: number }) {
  const w = 600;
  const h = 200;
  const padding = 30;
  const maxLog = Math.log10(Math.max(...values, 0.01));

  const points = values.map((v, i) => {
    const x = padding + (i / (values.length - 1 || 1)) * (w - 2 * padding);
    const y = h - padding - ((Math.log10(Math.max(v, 0.01)) - maxLog) / -maxLog) * (h - 2 * padding);
    return `${x},${y}`;
  });

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ minWidth: 400 }}>
        <defs>
          <linearGradient id="sv-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <line x1={padding} y1={h - padding} x2={w - padding} y2={h - padding} stroke="currentColor" strokeOpacity={0.2} />
        <line x1={padding} y1={padding} x2={padding} y2={h - padding} stroke="currentColor" strokeOpacity={0.2} />
        <polyline points={points.join(' ')} fill="none" stroke="url(#sv-bar)" strokeWidth={2} />
        {values.map((v, i) => (
          <circle
            key={i}
            cx={padding + (i / (values.length - 1 || 1)) * (w - 2 * padding)}
            cy={h - padding - ((Math.log10(Math.max(v, 0.01)) - maxLog) / -maxLog) * (h - 2 * padding)}
            r={i < rank ? 3 : 1.5}
            fill={i < rank ? '#3b82f6' : '#94a3b8'}
          />
        ))}
        <text x={padding - 5} y={padding + 4} fontSize={10} textAnchor="end" fill="currentColor" opacity={0.6}>
          10⁰
        </text>
        <text x={w / 2} y={h - 5} fontSize={10} textAnchor="middle" fill="currentColor" opacity={0.6}>
          singular value index
        </text>
      </svg>
    </div>
  );
}
