'use client';

import { TensorNetwork, TensorNode, TensorEdge } from './tensor-network';

export function CPDiagram({ rank = 3 }: { rank?: number }) {
  const nodeSize = 52;
  const radius = 88;
  const cx = 300;
  const cy = 140;
  const angleStep = (Math.PI * 2) / 3;
  const startAngle = -Math.PI / 2;

  const factors = Array.from({ length: 3 }, (_, i) => {
    const angle = startAngle + i * angleStep;
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      label: `A${i + 1}`,
    };
  });

  // Content extent: top of top node at y = cy - radius - nodeSize/2 = 140-88-26 = 26
  // Bottom of bottom node at y = cy + radius*0.5 + nodeSize/2 = 140+44+26 = 210
  // Caption at y = cy + radius*0.5 + nodeSize/2 + 22 = 232
  // viewBox: y from 0 to 260 to fit all content with padding

  return (
    <TensorNetwork viewBox="0 0 600 260" width={600} height={260}>
      {/* Lines from center to each factor */}
      {factors.map((f, i) => (
        <g key={`lines-${i}`}>
          {Array.from({ length: rank }).map((_, r) => (
            <line
              key={`line-${i}-${r}`}
              x1={cx}
              y1={cy}
              x2={f.x}
              y2={f.y}
              stroke="#cbd5e1"
              strokeWidth={1}
              strokeOpacity={0.7}
            />
          ))}
        </g>
      ))}

      {/* Center lambda node */}
      <TensorNode
        x={cx}
        y={cy}
        size={32}
        label="λ"
        color="#f59e0b"
        filled={false}
      />

      {/* Factor nodes */}
      {factors.map((f, i) => (
        <TensorNode
          key={`factor-${i}`}
          x={f.x}
          y={f.y}
          size={nodeSize}
          label={f.label}
          color="#3b82f6"
        />
      ))}

      {/* Caption */}
      <text
        x={cx}
        y={cy + radius * 0.5 + nodeSize / 2 + 22}
        textAnchor="middle"
        fontSize={12}
        fill="currentColor"
        opacity={0.6}
      >
        {`Sum of ${rank} rank-1 components`}
      </text>
    </TensorNetwork>
  );
}

export function TuckerDiagram({ ranks = [3, 3, 3] }: { ranks?: number[] }) {
  const nodeSize = 52;
  const radius = 95;
  const cx = 300;
  const cy = 130;
  const angleStep = (Math.PI * 2) / 3;
  const startAngle = -Math.PI / 2;

  const factors = Array.from({ length: 3 }, (_, i) => {
    const angle = startAngle + i * angleStep;
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      label: `U${i + 1}`,
    };
  });

  // Content extent: top of top node at y = cy - radius - nodeSize/2 = 130-95-26 = 9
  // Bottom of bottom node at y = cy + radius*0.5 + nodeSize/2 = 130+47.5+26 = 203.5
  // "I_n × R_n" labels at y = 219.5
  // Core caption at y = cy + radius*0.5 + nodeSize/2 + 24 = 227.5
  // viewBox: y from 0 to 250

  return (
    <TensorNetwork viewBox="0 0 600 250" width={600} height={250}>
      {/* Bonds from core to each factor */}
      {factors.map((f, i) => (
        <line
          key={`bond-${i}`}
          x1={cx}
          y1={cy}
          x2={f.x}
          y2={f.y}
          stroke="#3b82f6"
          strokeWidth={1.5}
          strokeOpacity={0.7}
        />
      ))}

      {/* Core tensor G */}
      <TensorNode
        x={cx}
        y={cy}
        size={60}
        label="G"
        color="#8b5cf6"
      />

      {/* Factor nodes */}
      {factors.map((f, i) => (
        <g key={`factor-${i}`}>
          <TensorNode
            x={f.x}
            y={f.y}
            size={nodeSize}
            label={f.label}
            color="#3b82f6"
          />
          <text
            x={f.x}
            y={f.y + nodeSize / 2 + 16}
            textAnchor="middle"
            fontSize={10}
            fill="currentColor"
            opacity={0.6}
            fontStyle="italic"
          >
            {`I${i + 1} × R${i + 1}`}
          </text>
        </g>
      ))}

      {/* Caption */}
      <text
        x={cx}
        y={cy + radius * 0.5 + nodeSize / 2 + 30}
        textAnchor="middle"
        fontSize={12}
        fill="currentColor"
        opacity={0.6}
      >
        {`Core (${ranks[0]}, ${ranks[1]}, ${ranks[2]})`}
      </text>
    </TensorNetwork>
  );
}

export function TTDiagram({ order = 5, ranks = [1, 3, 3, 3, 3, 1] }: { order?: number; ranks?: number[] }) {
  const startX = 90;
  const endX = 510;
  const cy = 120;
  const step = (endX - startX) / (order - 1);
  const nodeSize = 52;

  const cores = Array.from({ length: order }, (_, i) => ({
    x: startX + i * step,
    y: cy,
    label: `G${i + 1}`,
  }));

  return (
    <TensorNetwork viewBox="0 0 600 240" width={600} height={240}>
      {/* Bond labels above */}
      {Array.from({ length: order - 1 }, (_, i) => (
        <text
          key={`bond-${i}`}
          x={startX + (i + 0.5) * step}
          y={cy - 56}
          textAnchor="middle"
          fontSize={11}
          fill="currentColor"
          opacity={0.6}
          fontStyle="italic"
        >
          {`r${i + 1}=${ranks[i + 1] ?? 'r'}`}
        </text>
      ))}

      {/* Cores and bonds */}
      {cores.map((c, i) => (
        <g key={`core-${i}`}>
          <TensorNode
            x={c.x}
            y={c.y}
            size={nodeSize}
            label={c.label}
            color="#3b82f6"
          />
          {i < order - 1 && (
            <TensorEdge
              x1={c.x + nodeSize / 2}
              y1={c.y}
              x2={cores[i + 1].x - nodeSize / 2}
              y2={cores[i + 1].y}
              color="#8b5cf6"
              width={2}
            />
          )}
        </g>
      ))}

      {/* Physical index labels below */}
      {cores.map((c, i) => (
        <text
          key={`phys-${i}`}
          x={c.x}
          y={cy + nodeSize / 2 + 18}
          textAnchor="middle"
          fontSize={11}
          fill="currentColor"
          opacity={0.6}
          fontStyle="italic"
        >
          {`n${i + 1}`}
        </text>
      ))}
    </TensorNetwork>
  );
}

export function TRDiagram({ order = 5, rank = 3 }: { order?: number; rank?: number }) {
  const radius = 70;
  const cx = 300;
  const cy = 120;
  const angleStep = (Math.PI * 2) / order;
  const startAngle = -Math.PI / 2;
  const nodeSize = 44;

  const cores = Array.from({ length: order }, (_, i) => {
    const angle = startAngle + i * angleStep;
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      label: `G${i + 1}`,
    };
  });

  return (
    <TensorNetwork viewBox="0 0 600 280" width={600} height={280}>
      {cores.map((c, i) => {
        const next = cores[(i + 1) % order];
        return (
          <line
            key={`bond-${i}`}
            x1={c.x}
            y1={c.y}
            x2={next.x}
            y2={next.y}
            stroke="#8b5cf6"
            strokeWidth={1.5}
            strokeOpacity={0.7}
          />
        );
      })}

      {cores.map((c, i) => (
        <TensorNode
          key={`core-${i}`}
          x={c.x}
          y={c.y}
          size={nodeSize}
          label={c.label}
          color="#3b82f6"
        />
      ))}

      <text
        x={cx}
        y={cy + radius + 50}
        textAnchor="middle"
        fontSize={12}
        fill="currentColor"
        opacity={0.6}
      >
        {`Cyclic bond: rank r = ${rank}`}
      </text>
    </TensorNetwork>
  );
}

export function MPSDiagram({ sites = 6, chi = 4 }: { sites?: number; chi?: number }) {
  const startX = 80;
  const endX = 520;
  const cy = 120;
  const step = (endX - startX) / (sites - 1);
  const nodeSize = 44;

  const tensors = Array.from({ length: sites }, (_, i) => ({
    x: startX + i * step,
    y: cy,
    label: i === 0 || i === sites - 1 ? '•' : 'A',
  }));

  return (
    <TensorNetwork viewBox="0 0 600 240" width={600} height={240}>
      {/* Site labels above */}
      {tensors.map((t, i) => (
        <text
          key={`site-${i}`}
          x={t.x}
          y={cy - 48}
          textAnchor="middle"
          fontSize={11}
          fill="currentColor"
          opacity={0.6}
        >
          {`s${i + 1}`}
        </text>
      ))}

      {/* Tensors and bonds */}
      {tensors.map((t, i) => (
        <g key={`mps-${i}`}>
          {i === 0 || i === sites - 1 ? (
            <circle
              cx={t.x}
              cy={t.y}
              r={nodeSize / 2}
              fill="#3b82f6"
              fillOpacity={0.18}
              stroke="#3b82f6"
              strokeWidth={1.5}
            />
          ) : (
            <TensorNode x={t.x} y={t.y} size={nodeSize} label={t.label} color="#3b82f6" />
          )}
          {i < sites - 1 && (
            <TensorEdge
              x1={t.x + nodeSize / 2}
              y1={t.y}
              x2={tensors[i + 1].x - nodeSize / 2}
              y2={tensors[i + 1].y}
              color="#8b5cf6"
              width={2}
            />
          )}
        </g>
      ))}

      <text
        x={(tensors[0].x + tensors[tensors.length - 1].x) / 2}
        y={cy + 70}
        textAnchor="middle"
        fontSize={12}
        fill="currentColor"
        opacity={0.6}
      >
        {`Bond dimension χ = ${chi}`}
      </text>
    </TensorNetwork>
  );
}

export function MERADiagram({ levels = 3 }: { levels?: number }) {
  const startX = 70;
  const endX = 530;
  const cy = 130;
  const nodesPerLevel = [1, 2, 4, 8, 16].slice(0, levels);
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  return (
    <TensorNetwork viewBox="0 0 600 320" width={600} height={320}>
      {nodesPerLevel.map((count, lvl) => {
        const step = count > 1 ? (endX - startX) / (count - 1) : 0;
        const yOffset = (lvl - (levels - 1) / 2) * 60;
        return (
          <g key={`level-${lvl}`}>
            {Array.from({ length: count }, (_, i) => {
              const x = count === 1 ? (startX + endX) / 2 : startX + i * step;
              const y = cy + yOffset;
              return (
                <TensorNode
                  key={`node-${lvl}-${i}`}
                  x={x}
                  y={y}
                  size={24}
                  color={colors[lvl % colors.length]}
                />
              );
            })}
          </g>
        );
      })}
    </TensorNetwork>
  );
}

export function PEPSDiagram({ m = 3, n = 3 }: { m?: number; n?: number }) {
  const startX = 130;
  const startY = 70;
  const step = 90;
  const nodeSize = 44;
  const cx = startX + ((n - 1) * step) / 2;
  const cy = startY + ((m - 1) * step) / 2;

  return (
    <TensorNetwork viewBox="0 0 500 360" width={500} height={360}>
      {Array.from({ length: m }).map((_, i) =>
        Array.from({ length: n }).map((_, j) => {
          const x = startX + j * step;
          const y = startY + i * step;
          return (
            <g key={`peps-${i}-${j}`}>
              <TensorNode x={x} y={y} size={nodeSize} color="#8b5cf6" />
              {j < n - 1 && (
                <TensorEdge
                  x1={x + nodeSize / 2}
                  y1={y}
                  x2={x + step - nodeSize / 2}
                  y2={y}
                  color="#3b82f6"
                  width={1.5}
                />
              )}
              {i < m - 1 && (
                <TensorEdge
                  x1={x}
                  y1={y + nodeSize / 2}
                  x2={x}
                  y2={y + step - nodeSize / 2}
                  color="#3b82f6"
                  width={1.5}
                />
              )}
            </g>
          );
        }),
      )}

      <text
        x={cx}
        y={startY - 24}
        textAnchor="middle"
        fontSize={12}
        fill="currentColor"
        opacity={0.6}
      >
        {`${m} × ${n} PEPS lattice`}
      </text>
    </TensorNetwork>
  );
}
