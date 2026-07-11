'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Tensor3DProps = {
  size?: number;
  data?: number[][][];
  className?: string;
  showSlices?: boolean;
  rotateSpeed?: number;
  highlightMode?: number | null;
  highlightFiber?: { mode: number; index: number } | null;
  wireframe?: boolean;
};

export function Tensor3D({
  size = 280,
  data,
  className,
  showSlices = true,
  rotateSpeed = 0.3,
  highlightMode = null,
  highlightFiber = null,
  wireframe = false,
}: Tensor3DProps) {
  const [rotation, setRotation] = React.useState({ x: -25, y: 35 });
  const [isDragging, setIsDragging] = React.useState(false);
  const lastMouse = React.useRef({ x: 0, y: 0 });

  // Generate default 3D data if not provided
  const tensor = React.useMemo(() => {
    if (data) return data;
    const result: number[][][] = [];
    for (let i = 0; i < 5; i++) {
      result[i] = [];
      for (let j = 0; j < 5; j++) {
        result[i][j] = [];
        for (let k = 0; k < 5; k++) {
          const center = 2;
          const d = Math.sqrt((i - center) ** 2 + (j - center) ** 2 + (k - center) ** 2);
          result[i][j][k] = Math.max(0, 1 - d / 3);
        }
      }
    }
    return result;
  }, [data]);

  const N = tensor.length;
  const cellSize = size / (N * 1.5);

  // Project 3D -> 2D (isometric + rotation)
  const project = React.useCallback(
    (x: number, y: number, z: number) => {
      const radX = (rotation.x * Math.PI) / 180;
      const radY = (rotation.y * Math.PI) / 180;
      // Rotate around Y
      const x1 = x * Math.cos(radY) + z * Math.sin(radY);
      const z1 = -x * Math.sin(radY) + z * Math.cos(radY);
      // Rotate around X
      const y1 = y * Math.cos(radX) - z1 * Math.sin(radX);
      const z2 = y * Math.sin(radX) + z1 * Math.cos(radX);
      return { x: x1, y: y1, z: z2 };
    },
    [rotation],
  );

  // Auto-rotate
  React.useEffect(() => {
    if (isDragging) return;
    let raf: number;
    const tick = () => {
      setRotation((r) => ({ ...r, y: r.y + rotateSpeed * 0.3 }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isDragging, rotateSpeed]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    setRotation((r) => ({
      x: Math.max(-89, Math.min(89, r.x + dy * 0.5)),
      y: r.y + dx * 0.5,
    }));
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => setIsDragging(false);

  // Project all cell centers
  const cells = React.useMemo(() => {
    const arr: Array<{
      i: number;
      j: number;
      k: number;
      x: number;
      y: number;
      z: number;
      value: number;
    }> = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        for (let k = 0; k < N; k++) {
          const px = (i - N / 2) * cellSize;
          const py = (j - N / 2) * cellSize;
          const pz = (k - N / 2) * cellSize;
          const p = project(px, py, pz);
          arr.push({ i, j, k, x: p.x, y: p.y, z: p.z, value: tensor[i][j][k] });
        }
      }
    }
    return arr.sort((a, b) => a.z - b.z);
  }, [N, cellSize, project, tensor]);

  const valueToColor = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    // Blue gradient
    if (clamped < 0.2) return `rgba(59, 130, 246, ${0.15 + clamped * 0.5})`;
    if (clamped < 0.5) return `rgba(99, 102, 241, ${0.3 + clamped * 0.5})`;
    if (clamped < 0.8) return `rgba(139, 92, 246, ${0.5 + clamped * 0.5})`;
    return `rgba(236, 72, 153, ${0.6 + clamped * 0.4})`;
  };

  const strokeColor = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    if (clamped < 0.2) return 'rgba(59, 130, 246, 0.4)';
    if (clamped < 0.5) return 'rgba(99, 102, 241, 0.5)';
    if (clamped < 0.8) return 'rgba(139, 92, 246, 0.6)';
    return 'rgba(236, 72, 153, 0.7)';
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing',
        className,
      )}
      style={{ width: size, height: size }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <svg viewBox={`-${size / 2} -${size / 2} ${size} ${size}`} className="w-full h-full">
        <defs>
          <linearGradient id="tensor-axis" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Axes */}
        {(() => {
          const ax = project(((N / 2) * cellSize) + 20, 0, 0);
          const ay = project(0, ((N / 2) * cellSize) + 20, 0);
          const az = project(0, 0, ((N / 2) * cellSize) + 20);
          return (
            <g opacity={0.6}>
              <line x1={0} y1={0} x2={ax.x} y2={ax.y} stroke="#3b82f6" strokeWidth={1.5} />
              <text x={ax.x + 5} y={ax.y + 4} fontSize={11} fill="#3b82f6" fontStyle="italic">
                n₁
              </text>
              <line x1={0} y1={0} x2={ay.x} y2={ay.y} stroke="#10b981" strokeWidth={1.5} />
              <text x={ay.x + 5} y={ay.y + 4} fontSize={11} fill="#10b981" fontStyle="italic">
                n₂
              </text>
              <line x1={0} y1={0} x2={az.x} y2={az.y} stroke="#f59e0b" strokeWidth={1.5} />
              <text x={az.x + 5} y={az.y + 4} fontSize={11} fill="#f59e0b" fontStyle="italic">
                n₃
              </text>
            </g>
          );
        })()}

        {/* Cells */}
        {cells.map((cell) => {
          const isHighlighted =
            (highlightMode !== null && (
              (highlightMode === 0 && cell.i === highlightFiber?.index) ||
              (highlightMode === 1 && cell.j === highlightFiber?.index) ||
              (highlightMode === 2 && cell.k === highlightFiber?.index)
            )) ||
            (highlightFiber && highlightFiber.mode === 0 && cell.i === highlightFiber.index) ||
            (highlightFiber && highlightFiber.mode === 1 && cell.j === highlightFiber.index) ||
            (highlightFiber && highlightFiber.mode === 2 && cell.k === highlightFiber.index);

          const r = cellSize * 0.38;
          return (
            <motion.rect
              key={`${cell.i}-${cell.j}-${cell.k}`}
              x={cell.x - r}
              y={cell.y - r}
              width={r * 2}
              height={r * 2}
              rx={r * 0.2}
              fill={valueToColor(cell.value)}
              stroke={isHighlighted ? '#ec4899' : strokeColor(cell.value)}
              strokeWidth={isHighlighted ? 2 : wireframe ? 0.5 : 1}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: (cell.i + cell.j + cell.k) * 0.01, duration: 0.4 }}
              style={{ filter: isHighlighted ? 'url(#glow)' : undefined }}
            />
          );
        })}
      </svg>
    </div>
  );
}
