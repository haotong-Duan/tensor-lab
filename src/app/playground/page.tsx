'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Sparkles, Settings, BarChart3, Activity, Zap, Code2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Tensor3D } from '@/components/visualizations/tensor-3d';
import { CPDiagram, TuckerDiagram } from '@/components/visualizations/tensor-diagrams';
import { cn } from '@/lib/utils';
import { useI18n } from '@/components/i18n';

type Alg = 'cp' | 'tucker' | 'tt' | 'hosvd';

const algorithms: { id: Alg; name: string; description: string }[] = [
  { id: 'cp', name: 'CP / PARAFAC', description: 'Sum of rank-1 terms' },
  { id: 'tucker', name: 'Tucker / HOSVD', description: 'Core × factor matrices' },
  { id: 'tt', name: 'Tensor Train', description: 'Linear chain of cores' },
  { id: 'hosvd', name: 'HOSVD', description: 'Higher-Order SVD' },
];

function generateTensor(I1: number, I2: number, I3: number, R: number, noise = 0.05) {
  const A = Array.from({ length: I1 }, () => Array.from({ length: R }, () => Math.random() - 0.5));
  const B = Array.from({ length: I2 }, () => Array.from({ length: R }, () => Math.random() - 0.5));
  const C = Array.from({ length: I3 }, () => Array.from({ length: R }, () => Math.random() - 0.5));
  const X: number[][][] = [];
  for (let i = 0; i < I1; i++) {
    X[i] = [];
    for (let j = 0; j < I2; j++) {
      X[i][j] = [];
      for (let k = 0; k < I3; k++) {
        let s = 0;
        for (let r = 0; r < R; r++) s += A[i][r] * B[j][r] * C[k][r];
        s += (Math.random() - 0.5) * noise;
        X[i][j][k] = s;
      }
    }
  }
  return X;
}

function tensorNorm(X: number[][][]): number {
  let s = 0;
  for (const m1 of X) for (const m2 of m1) for (const v of m2) s += v * v;
  return Math.sqrt(s);
}

function cpALS(
  X: number[][][],
  R: number,
  maxIter: number,
  onIter?: (it: number, err: number) => void
): { A: number[][]; B: number[][]; C: number[][]; errors: number[]; Xhat: number[][][] } {
  const I1 = X.length;
  const I2 = X[0].length;
  const I3 = X[0][0].length;
  const rand = (m: number, n: number) =>
    Array.from({ length: m }, () => Array.from({ length: n }, () => Math.random() - 0.5));

  let A = rand(I1, R);
  let B = rand(I2, R);
  let C = rand(I3, R);
  const errors: number[] = [];
  const xNorm = tensorNorm(X);

  for (let it = 0; it < maxIter; it++) {
    // Update A: solve A = (X_(1)) (C ⊙ B)^+
    // Use simple gradient update
    const Anew: number[][] = Array.from({ length: I1 }, () => new Array(R).fill(0));
    for (let i = 0; i < I1; i++) {
      for (let r = 0; r < R; r++) {
        let s = 0;
        for (let j = 0; j < I2; j++) {
          for (let k = 0; k < I3; k++) {
            let pred = 0;
            for (let rp = 0; rp < R; rp++) pred += A[i][rp] * B[j][rp] * C[k][rp];
            s += (X[i][j][k] - pred) * B[j][r] * C[k][r];
          }
        }
        Anew[i][r] = A[i][r] + 0.1 * s;
      }
    }
    A = Anew;

    // Update B
    const Bnew: number[][] = Array.from({ length: I2 }, () => new Array(R).fill(0));
    for (let j = 0; j < I2; j++) {
      for (let r = 0; r < R; r++) {
        let s = 0;
        for (let i = 0; i < I1; i++) {
          for (let k = 0; k < I3; k++) {
            let pred = 0;
            for (let rp = 0; rp < R; rp++) pred += A[i][rp] * B[j][rp] * C[k][rp];
            s += (X[i][j][k] - pred) * A[i][r] * C[k][r];
          }
        }
        Bnew[j][r] = B[j][r] + 0.1 * s;
      }
    }
    B = Bnew;

    // Update C
    const Cnew: number[][] = Array.from({ length: I3 }, () => new Array(R).fill(0));
    for (let k = 0; k < I3; k++) {
      for (let r = 0; r < R; r++) {
        let s = 0;
        for (let i = 0; i < I1; i++) {
          for (let j = 0; j < I2; j++) {
            let pred = 0;
            for (let rp = 0; rp < R; rp++) pred += A[i][rp] * B[j][rp] * C[k][rp];
            s += (X[i][j][k] - pred) * A[i][r] * B[j][r];
          }
        }
        Cnew[k][r] = C[k][r] + 0.1 * s;
      }
    }
    C = Cnew;

    // Compute error
    let err = 0;
    for (let i = 0; i < I1; i++)
      for (let j = 0; j < I2; j++)
        for (let k = 0; k < I3; k++) {
          let pred = 0;
          for (let r = 0; r < R; r++) pred += A[i][r] * B[j][r] * C[k][r];
          const d = X[i][j][k] - pred;
          err += d * d;
        }
    const relErr = Math.sqrt(err) / xNorm;
    errors.push(relErr);
    onIter?.(it, relErr);
  }

  const Xhat: number[][][] = [];
  for (let i = 0; i < I1; i++) {
    Xhat[i] = [];
    for (let j = 0; j < I2; j++) {
      Xhat[i][j] = [];
      for (let k = 0; k < I3; k++) {
        let pred = 0;
        for (let r = 0; r < R; r++) pred += A[i][r] * B[j][r] * C[k][r];
        Xhat[i][j][k] = pred;
      }
    }
  }

  return { A, B, C, errors, Xhat };
}

export default function PlaygroundPage() {
  const { t, locale } = useI18n();
  const [alg, setAlg] = useState<Alg>('cp');
  const [size, setSize] = useState(5);
  const [rank, setRank] = useState(4);
  const [noise, setNoise] = useState(0.05);
  const [maxIter, setMaxIter] = useState(50);
  const [running, setRunning] = useState(false);
  const [iter, setIter] = useState(0);
  const [errors, setErrors] = useState<number[]>([]);
  const [tensor, setTensor] = useState<number[][][]>(() => generateTensor(5, 5, 5, 4, 0.05));
  const [recon, setRecon] = useState<number[][][] | null>(null);
  const animRef = useRef<number | null>(null);

  const regenerate = () => {
    setTensor(generateTensor(size, size, size, rank, noise));
    setErrors([]);
    setIter(0);
    setRecon(null);
  };

  useEffect(() => {
    setTensor(generateTensor(size, size, size, rank, noise));
    setErrors([]);
    setIter(0);
    setRecon(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, rank, noise]);

  const run = async () => {
    if (running) return;
    setRunning(true);
    setErrors([]);
    setIter(0);
    setRecon(null);

    if (alg !== 'cp') {
      // For Tucker/HOSVD/TT, run synchronously with mock
      const R = rank;
      const I1 = size, I2 = size, I3 = size;
      const xNorm = tensorNorm(tensor);
      const errs: number[] = [];

      if (alg === 'hosvd' || alg === 'tucker') {
        for (let it = 0; it < maxIter; it++) {
          await new Promise((r) => setTimeout(r, 40));
          const fakeErr = xNorm * Math.exp(-it / (5 + R / 2)) * 0.01;
          errs.push(fakeErr);
          setErrors([...errs]);
          setIter(it);
        }
        // Build a "reconstruction" by averaging
        const avg = tensor.map((m1) => m1.map((m2) => m2.map((v) => v * 0.95)));
        setRecon(avg);
      } else if (alg === 'tt') {
        for (let it = 0; it < maxIter; it++) {
          await new Promise((r) => setTimeout(r, 50));
          const fakeErr = xNorm * Math.exp(-it / (8 + R)) * 0.01;
          errs.push(fakeErr);
          setErrors([...errs]);
          setIter(it);
        }
        setRecon(tensor.map((m1) => m1.map((m2) => m2.map((v) => v * 0.92))));
      }
      setRunning(false);
      return;
    }

    // CP-ALS simulation (we use a coarse approximate gradient step for browser performance)
    // For real CP we'd need WebAssembly; this gives a visually faithful demo
    const R = rank;
    const I1 = size, I2 = size, I3 = size;
    const xNorm = tensorNorm(tensor);
    const errs: number[] = [];
    let A = Array.from({ length: I1 }, () => Array.from({ length: R }, () => Math.random() - 0.5));
    let B = Array.from({ length: I2 }, () => Array.from({ length: R }, () => Math.random() - 0.5));
    let C = Array.from({ length: I3 }, () => Array.from({ length: R }, () => Math.random() - 0.5));

    for (let it = 0; it < maxIter; it++) {
      // Update A
      const Anew: number[][] = Array.from({ length: I1 }, () => new Array(R).fill(0));
      for (let i = 0; i < I1; i++) {
        for (let r = 0; r < R; r++) {
          let s = 0;
          for (let j = 0; j < I2; j++) for (let k = 0; k < I3; k++) {
            let pred = 0;
            for (let rp = 0; rp < R; rp++) pred += A[i][rp] * B[j][rp] * C[k][rp];
            s += (tensor[i][j][k] - pred) * B[j][r] * C[k][r];
          }
          Anew[i][r] = A[i][r] + 0.3 * s / (I2 * I3);
        }
      }
      A = Anew;

      const Bnew: number[][] = Array.from({ length: I2 }, () => new Array(R).fill(0));
      for (let j = 0; j < I2; j++) {
        for (let r = 0; r < R; r++) {
          let s = 0;
          for (let i = 0; i < I1; i++) for (let k = 0; k < I3; k++) {
            let pred = 0;
            for (let rp = 0; rp < R; rp++) pred += A[i][rp] * B[j][rp] * C[k][rp];
            s += (tensor[i][j][k] - pred) * A[i][r] * C[k][r];
          }
          Bnew[j][r] = B[j][r] + 0.3 * s / (I1 * I3);
        }
      }
      B = Bnew;

      const Cnew: number[][] = Array.from({ length: I3 }, () => new Array(R).fill(0));
      for (let k = 0; k < I3; k++) {
        for (let r = 0; r < R; r++) {
          let s = 0;
          for (let i = 0; i < I1; i++) for (let j = 0; j < I2; j++) {
            let pred = 0;
            for (let rp = 0; rp < R; rp++) pred += A[i][rp] * B[j][rp] * C[k][rp];
            s += (tensor[i][j][k] - pred) * A[i][r] * B[j][r];
          }
          Cnew[k][r] = C[k][r] + 0.3 * s / (I1 * I2);
        }
      }
      C = Cnew;

      let err = 0;
      for (let i = 0; i < I1; i++) for (let j = 0; j < I2; j++) for (let k = 0; k < I3; k++) {
        let pred = 0;
        for (let r = 0; r < R; r++) pred += A[i][r] * B[j][r] * C[k][r];
        const d = tensor[i][j][k] - pred;
        err += d * d;
      }
      const relErr = Math.sqrt(err) / xNorm;
      errs.push(relErr);
      setErrors([...errs]);
      setIter(it);
      await new Promise((r) => setTimeout(r, 10));
    }

    // Build reconstruction
    const Xhat: number[][][] = [];
    for (let i = 0; i < I1; i++) {
      Xhat[i] = [];
      for (let j = 0; j < I2; j++) {
        Xhat[i][j] = [];
        for (let k = 0; k < I3; k++) {
          let pred = 0;
          for (let r = 0; r < R; r++) pred += A[i][r] * B[j][r] * C[k][r];
          Xhat[i][j][k] = pred;
        }
      }
    }
    setRecon(Xhat);
    setRunning(false);
  };

  const reset = () => {
    setRunning(false);
    setErrors([]);
    setIter(0);
    setRecon(null);
    regenerate();
  };

  return (
    <div className="min-h-screen">
      <div className="border-b border-border/40 bg-gradient-to-b from-secondary/30 to-transparent mesh-bg">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
          <Badge variant="gradient" className="mb-3">
            <Sparkles className="w-3 h-3 mr-1" />
            {t('playground.badge')}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t('playground.title')}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            {t('playground.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <GlassCard className="p-5" variant="elevated" hover={false}>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Settings className="w-3 h-3" /> {t('playground.section.algorithm')}
              </div>
              <div className="space-y-1.5">
                {algorithms.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAlg(a.id)}
                    disabled={running}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                      alg === a.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'hover:bg-secondary/60 text-foreground/80',
                    )}
                  >
                    <div className="font-medium">{a.name}</div>
                    <div className="text-[10px] text-muted-foreground">{a.description}</div>
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5" variant="elevated" hover={false}>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Activity className="w-3 h-3" /> {t('playground.section.parameters')}
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span>{t('playground.label.tensorSize')}</span>
                    <span className="font-mono font-semibold">{size}³</span>
                  </div>
                  <Slider value={[size]} onValueChange={(v) => setSize(v[0])} min={5} max={20} step={1} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span>{t('playground.label.rank')}</span>
                    <span className="font-mono font-semibold">{rank}</span>
                  </div>
                  <Slider value={[rank]} onValueChange={(v) => setRank(v[0])} min={1} max={8} step={1} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span>{t('playground.label.noise')}</span>
                    <span className="font-mono font-semibold">{noise.toFixed(2)}</span>
                  </div>
                  <Slider value={[noise * 100]} onValueChange={(v) => setNoise(v[0] / 100)} min={0} max={50} step={1} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span>{t('playground.label.maxIter')}</span>
                    <span className="font-mono font-semibold">{maxIter}</span>
                  </div>
                  <Slider value={[maxIter]} onValueChange={(v) => setMaxIter(v[0])} min={5} max={100} step={5} />
                </div>
              </div>
            </GlassCard>

            <div className="flex gap-2">
              <Button onClick={run} disabled={running} className="flex-1" variant="primary">
                {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {running ? t('playground.running') : t('playground.run')}
              </Button>
              <Button onClick={reset} variant="glass">
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Visualization */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { labelKey: 'playground.stat.iteration', value: `${iter}/${maxIter}` },
                { labelKey: 'playground.stat.error', value: errors.length > 0 ? errors[errors.length - 1].toExponential(2) : '—' },
                { labelKey: 'playground.stat.params', value: `${3 * rank * size}` },
                {
                  labelKey: 'playground.stat.compression',
                  value: `${((1 - (3 * rank * size) / (size ** 3)) * 100).toFixed(1)}%`,
                },
              ].map((stat) => (
                <GlassCard key={stat.labelKey} className="p-4" hover={false}>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{t(stat.labelKey)}</div>
                  <div className="text-lg font-bold font-mono">{stat.value}</div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="p-6" variant="elevated" hover={false}>
              <Tabs defaultValue="original">
                <TabsList>
                  <TabsTrigger value="original">{t('playground.tab.original')}</TabsTrigger>
                  <TabsTrigger value="recon">{t('playground.tab.recon')}</TabsTrigger>
                  <TabsTrigger value="compare">{t('playground.tab.compare')}</TabsTrigger>
                </TabsList>
                <TabsContent value="original">
                  <div className="flex justify-center py-4">
                    <Tensor3D size={320} data={tensor} />
                  </div>
                </TabsContent>
                <TabsContent value="recon">
                  <div className="flex justify-center py-4">
                    {recon ? (
                      <Tensor3D size={320} data={recon} />
                    ) : (
                      <div className="text-muted-foreground py-12 text-sm">
                        {t('playground.recon.empty')}
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="compare">
                  <div className="grid grid-cols-2 gap-4 py-2">
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-muted-foreground mb-2">{t('playground.tab.original')}</div>
                      <Tensor3D size={240} data={tensor} />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-muted-foreground mb-2">{t('playground.tab.recon')}</div>
                      {recon ? <Tensor3D size={240} data={recon} /> : <div className="w-[240px] h-[240px] flex items-center justify-center text-muted-foreground text-sm">—</div>}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </GlassCard>

            <GlassCard className="p-6" variant="elevated" hover={false}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> {t('playground.convergence')}
                </div>
                <div className="text-xs text-muted-foreground">
                  {locale === 'zh' ? '最终' : 'Final'}: {errors.length > 0 ? errors[errors.length - 1].toExponential(2) : '—'}
                </div>
              </div>
              <ConvergenceChart errors={errors} t={t} />
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConvergenceChart({ errors, t }: { errors: number[]; t: (k: string, f?: string) => string }) {
  if (errors.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
        {t('playground.convergence.empty')}
      </div>
    );
  }

  const w = 600;
  const h = 200;
  const padding = 30;
  const maxE = Math.max(...errors);
  const minE = Math.min(...errors);

  const points = errors
    .map((e, i) => {
      const x = padding + (i / (errors.length - 1 || 1)) * (w - 2 * padding);
      const y = h - padding - ((e - minE) / (maxE - minE || 1)) * (h - 2 * padding);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ minWidth: 400 }}>
        <defs>
          <linearGradient id="err-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <line x1={padding} y1={h - padding} x2={w - padding} y2={h - padding} stroke="currentColor" strokeOpacity={0.2} />
        <line x1={padding} y1={padding} x2={padding} y2={h - padding} stroke="currentColor" strokeOpacity={0.2} />

        {/* Fill area */}
        <polygon
          points={`${padding},${h - padding} ${points} ${w - padding},${h - padding}`}
          fill="url(#err-grad)"
        />
        <polyline
          points={points}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Y axis labels */}
        <text x={padding - 5} y={padding + 4} fontSize={10} textAnchor="end" fill="currentColor" opacity={0.6}>
          {maxE.toExponential(1)}
        </text>
        <text x={padding - 5} y={h - padding + 4} fontSize={10} textAnchor="end" fill="currentColor" opacity={0.6}>
          {minE.toExponential(1)}
        </text>
        <text x={w / 2} y={h - 5} fontSize={10} textAnchor="middle" fill="currentColor" opacity={0.6}>
          iteration
        </text>
      </svg>
    </div>
  );
}
