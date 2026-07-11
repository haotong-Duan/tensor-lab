'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type TensorNodeProps = {
  x: number;
  y: number;
  size?: number;
  label?: string;
  index?: string;
  color?: string;
  filled?: boolean;
  className?: string;
};

export function TensorNode({
  x,
  y,
  size = 40,
  label,
  index,
  color = '#3b82f6',
  filled = true,
  className,
}: TensorNodeProps) {
  const half = size / 2;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={cn('select-none', className)}
    >
      {filled ? (
        <>
          <rect
            x={x - half}
            y={y - half}
            width={size}
            height={size}
            rx={size * 0.18}
            fill={color}
            fillOpacity={0.18}
            stroke={color}
            strokeWidth={1.5}
          />
          <rect
            x={x - half + 3}
            y={y - half + 3}
            width={size - 6}
            height={size - 6}
            rx={(size - 6) * 0.18}
            fill={color}
            fillOpacity={0.08}
          />
        </>
      ) : (
        <circle
          cx={x}
          cy={y}
          r={half}
          fill={color}
          fillOpacity={0.15}
          stroke={color}
          strokeWidth={1.5}
        />
      )}
      {label && (
        <text
          x={x}
          y={y + 4}
          textAnchor="middle"
          fontSize={size * 0.36}
          fontWeight={600}
          fill="currentColor"
          className="pointer-events-none"
        >
          {label}
        </text>
      )}
      {index && (
        <text
          x={x}
          y={y + half + 14}
          textAnchor="middle"
          fontSize={11}
          fontStyle="italic"
          fill="currentColor"
          opacity={0.6}
          className="pointer-events-none"
        >
          {index}
        </text>
      )}
    </motion.g>
  );
}

type TensorEdgeProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  color?: string;
  dashed?: boolean;
  width?: number;
};

export function TensorEdge({
  x1,
  y1,
  x2,
  y2,
  label,
  color = '#3b82f6',
  dashed = false,
  width = 1.5,
}: TensorEdgeProps) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g className="select-none">
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dashed ? '4 3' : undefined}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      {label && (
        <text
          x={mx}
          y={my - 6}
          textAnchor="middle"
          fontSize={10}
          fill={color}
          fontWeight={500}
        >
          {label}
        </text>
      )}
    </g>
  );
}

type TensorNetworkProps = {
  width?: number;
  height?: number;
  children: React.ReactNode;
  className?: string;
  viewBox?: string;
};

export function TensorNetwork({
  width = 600,
  height = 200,
  children,
  className,
  viewBox,
}: TensorNetworkProps) {
  const vb = viewBox ?? `0 0 ${width} ${height}`;
  return (
    <div className={cn('w-full overflow-x-auto scrollbar-thin', className)}>
      <svg
        viewBox={vb}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto block"
        style={{ minWidth: 280 }}
      >
        {children}
      </svg>
    </div>
  );
}
