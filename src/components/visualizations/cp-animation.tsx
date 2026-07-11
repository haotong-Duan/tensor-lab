'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CPAnimation() {
  const [rank, setRank] = useState(3);
  const [active, setActive] = useState(0); // which component to show
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % rank);
    }, 1500);
    return () => clearInterval(t);
  }, [playing, rank]);

  // Generate 3 fixed "components" for visualization
  const components = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 2 * Math.PI) / 8;
    return {
      a: [Math.cos(angle * 1.3), Math.sin(angle * 0.7), Math.cos(angle * 1.1 + 0.5), Math.sin(angle * 0.9)],
      b: [Math.sin(angle * 0.5 + 0.3), Math.cos(angle * 1.4), Math.sin(angle * 0.6)],
      c: [Math.cos(angle * 0.8 + 1.0), Math.sin(angle * 1.1), Math.cos(angle * 0.4)],
    };
  });

  return (
    <GlassCard className="p-6" variant="elevated" hover={false}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-semibold">CP Reconstruction</div>
        <div className="flex items-center gap-2">
          <Button size="icon-sm" variant="glass" onClick={() => setRank(Math.max(1, rank - 1))}>
            <Minus className="w-3 h-3" />
          </Button>
          <span className="text-sm font-mono w-12 text-center">R={rank}</span>
          <Button size="icon-sm" variant="glass" onClick={() => setRank(Math.min(8, rank + 1))}>
            <Plus className="w-3 h-3" />
          </Button>
          <Button size="icon-sm" variant={playing ? 'primary' : 'glass'} onClick={() => setPlaying(!playing)}>
            {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </Button>
          <Button size="icon-sm" variant="ghost" onClick={() => { setActive(0); setPlaying(false); }}>
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {['A', 'B', 'C'].map((label, mode) => (
          <div key={label}>
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Factor {label} ({mode === 0 ? 'I₁' : mode === 1 ? 'I₂' : 'I₃'})
            </div>
            <svg viewBox="0 0 200 60" className="w-full h-16">
              {Array.from({ length: rank }).map((_, r) => {
                const comp = components[r];
                const values = mode === 0 ? comp.a : mode === 1 ? comp.b : comp.c;
                const points = values
                  .map((v, i) => {
                    const x = (i / (values.length - 1)) * 200;
                    const y = 30 - v * 22;
                    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
                  })
                  .join(' ');
                const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#f43f5e', '#a855f7'];
                return (
                  <g key={r} className="transition-opacity duration-500"
                     style={{ opacity: r < rank ? (r === active ? 1 : 0.3) : 0 }}>
                    <path d={points} fill="none" stroke={colors[r]} strokeWidth={r === active ? 2.5 : 1.5} />
                    {values.map((v, i) => {
                      const x = (i / (values.length - 1)) * 200;
                      const y = 30 - v * 22;
                      return <circle key={i} cx={x} cy={y} r={r === active ? 3.5 : 2} fill={colors[r]} />;
                    })}
                  </g>
                );
              })}
            </svg>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border/40 text-xs text-muted-foreground">
        Showing component <span className="font-mono font-semibold text-foreground">r = {active + 1}</span> of R = {rank}.
        The full tensor is <span className="font-mono">X ≈ Σᵣ λᵣ · aᵣ ∘ bᵣ ∘ cᵣ</span>.
      </div>
    </GlassCard>
  );
}
