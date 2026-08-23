import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { 
  Zap, 
  RefreshCw, 
  Terminal, 
  CheckCircle2, 
  Network
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MpcVisualizerProps {
  t: {
    tag: string;
    title: string;
    desc: string;
    initiateBtn: string;
    resetBtn: string;
    signingStatus: string;
    curveMetric: string;
    entropyMetric: string;
    latencyMetric: string;
    shards: Array<{ id: string; role: string; status: string }>;
  };
}

interface NodeData extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  badge: string;
  type: 'core' | 'shard';
  active: boolean;
  color: string;
  role: string;
}

export const MpcVisualizer: React.FC<MpcVisualizerProps> = ({ t }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [signatureDone, setSignatureDone] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [signatureHash, setSignatureHash] = useState('0x4f8a92bc1e3d7a09...8e3f');

  const triggerCeremony = () => {
    if (isSigning) return;
    setIsSigning(true);
    setSignatureDone(false);
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 700);
    setTimeout(() => setActiveStep(3), 1400);
    setTimeout(() => {
      setIsSigning(false);
      setSignatureDone(true);
      setSignatureHash('0x9a8f4c2e1b3d7a8890cf1245ab78c43ef190e213b567d890fae41235bc671a98');
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 2200);
  };

  const resetCeremony = () => {
    setIsSigning(false);
    setSignatureDone(false);
    setActiveStep(0);
    setSignatureHash('0x4f8a92bc1e3d7a09...8e3f');
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 540;
    const height = 380;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .attr('preserveAspectRatio', 'xMidYMid meet');

    const defs = svg.append('defs');

    // Glow Filter
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%').attr('y', '-50%')
      .attr('width', '200%').attr('height', '200%');
    filter.append('feGaussianBlur').attr('stdDeviation', '6').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Container group
    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Blueprint Grid & Concentric Rings
    const ringRadius = [150, 100, 50];
    ringRadius.forEach((r, idx) => {
      g.append('circle')
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', idx === 0 ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.08)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', idx === 1 ? '4 4' : 'none');
    });

    // Crosshair axes
    g.append('line')
      .attr('x1', -160).attr('y1', 0).attr('x2', 160).attr('y2', 0)
      .attr('stroke', 'rgba(255, 255, 255, 0.06)').attr('stroke-dasharray', '2 4');
    g.append('line')
      .attr('x1', 0).attr('y1', -160).attr('x2', 0).attr('y2', 160)
      .attr('stroke', 'rgba(255, 255, 255, 0.06)').attr('stroke-dasharray', '2 4');

    // 5 Shard Nodes positioned in pentagon
    const shardNodes: NodeData[] = [
      { id: '1', name: 'Shard Alpha', badge: 'S1', type: 'shard', active: true, color: '#6366F1', role: 'Zurich Nitro Enclave' },
      { id: '2', name: 'Shard Beta', badge: 'S2', type: 'shard', active: true, color: '#6366F1', role: 'Frankfurt Conf. VM' },
      { id: '3', name: 'Shard Gamma', badge: 'S3', type: 'shard', active: true, color: '#6366F1', role: 'London Cloud HSM' },
      { id: '4', name: 'Shard Delta', badge: 'S4', type: 'shard', active: false, color: '#64748B', role: 'Mobile Biometric (Standby)' },
      { id: '5', name: 'Shard Epsilon', badge: 'S5', type: 'shard', active: false, color: '#64748B', role: 'Cold DR Vault (Standby)' },
    ];

    const angleStep = (2 * Math.PI) / 5;
    const distance = 125;

    shardNodes.forEach((node, i) => {
      const angle = i * angleStep - Math.PI / 2;
      node.x = Math.cos(angle) * distance;
      node.y = Math.sin(angle) * distance;
    });

    // Draw Laser Beams from Active Shards to Center
    shardNodes.forEach((node) => {
      const isParticipating = node.active;
      
      const line = g.append('line')
        .attr('x1', node.x || 0)
        .attr('y1', node.y || 0)
        .attr('x2', 0)
        .attr('y2', 0)
        .attr('stroke', isParticipating ? (signatureDone ? '#10B981' : '#6366F1') : 'rgba(255, 255, 255, 0.12)')
        .attr('stroke-width', isParticipating ? (isSigning ? 3.5 : 2) : 1)
        .attr('stroke-dasharray', isParticipating ? (isSigning ? '8 4' : 'none') : '3 3')
        .attr('opacity', isParticipating ? 1 : 0.4)
        .attr('filter', isParticipating ? 'url(#glow)' : 'none');

      if (isSigning && isParticipating) {
        let offset = 0;
        d3.timer(() => {
          offset -= 1.5;
          line.attr('stroke-dashoffset', offset);
        });
      }
    });

    // Draw Shard Node Circles
    shardNodes.forEach((node) => {
      const nodeG = g.append('g').attr('transform', `translate(${node.x}, ${node.y})`);

      // Outer Glow Halo
      if (node.active) {
        nodeG.append('circle')
          .attr('r', 26)
          .attr('fill', 'none')
          .attr('stroke', signatureDone ? '#10B981' : '#6366F1')
          .attr('stroke-width', 1.5)
          .attr('opacity', 0.4)
          .attr('filter', 'url(#glow)');
      }

      // Main Node Base Circle
      nodeG.append('circle')
        .attr('r', 20)
        .attr('fill', node.active ? '#1E1B4B' : '#0F172A')
        .attr('stroke', node.active ? (signatureDone ? '#10B981' : '#818CF8') : '#334155')
        .attr('stroke-width', 2);

      // Shard Badge Label (S1..S5)
      nodeG.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('fill', node.active ? '#FFFFFF' : '#64748B')
        .attr('font-size', '13px')
        .attr('font-weight', '800')
        .attr('font-family', 'JetBrains Mono, monospace')
        .text(node.badge);
    });

    // Center Zero-Knowledge Core
    const coreG = g.append('g');

    coreG.append('circle')
      .attr('r', 38)
      .attr('fill', signatureDone ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)')
      .attr('stroke', signatureDone ? '#10B981' : '#6366F1')
      .attr('stroke-width', 2)
      .attr('filter', 'url(#glow)');

    coreG.append('circle')
      .attr('r', 28)
      .attr('fill', '#0B0E17')
      .attr('stroke', signatureDone ? '#10B981' : '#818CF8')
      .attr('stroke-width', 2);

    coreG.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .attr('fill', signatureDone ? '#10B981' : '#FFFFFF')
      .attr('font-size', '10px')
      .attr('font-weight', '800')
      .attr('font-family', 'JetBrains Mono, monospace')
      .text(signatureDone ? 'SIGNATURE' : 'ECDSA');

    coreG.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .attr('fill', signatureDone ? '#10B981' : '#818CF8')
      .attr('font-size', '10px')
      .attr('font-weight', '800')
      .attr('font-family', 'JetBrains Mono, monospace')
      .text(signatureDone ? 'VALID' : '3/5 QUORUM');

  }, [isSigning, signatureDone, activeStep]);

  return (
    <div className="mpc-visualizer-card">
      <div className="mpc-header">
        <div className="mpc-header-left">
          <Network className="mpc-header-icon" />
          <div>
            <h3 className="mpc-header-title">{t.title}</h3>
            <p className="text-xs text-slate-400 mt-1">{t.desc}</p>
          </div>
        </div>
        <div className="mpc-badge-active">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>3/5 Quorum Active</span>
        </div>
      </div>

      {/* Interactive High-Res Canvas */}
      <div className="mpc-d3-container">
        <svg ref={svgRef} className="mpc-d3-svg" />
      </div>

      {/* Output Hash Terminal */}
      <div className="mpc-terminal-box">
        <div className="terminal-header">
          <div className="terminal-header-title">
            <Terminal className="terminal-icon" />
            <span>ECDSA_SIGNATURE_PAYLOAD (DER FORMAT)</span>
          </div>
          <span className="terminal-header-meta font-mono text-slate-400">Curve: secp256k1</span>
        </div>
        <div className="terminal-body">
          <span className="signature-hash-text font-mono">
            {signatureHash}
          </span>
        </div>
      </div>

      {/* Metrics Grid (Full-width 1-column on mobile as requested) */}
      <div className="mpc-metrics-grid">
        <div className="metric-box">
          <span className="metric-label">{t.curveMetric}</span>
          <span className="metric-value font-mono">Secp256k1 / Ed25519</span>
        </div>
        <div className="metric-box">
          <span className="metric-label">{t.entropyMetric}</span>
          <span className="metric-value font-mono">256-bit CSPRNG</span>
        </div>
        <div className="metric-box">
          <span className="metric-label">{t.latencyMetric}</span>
          <span className="metric-value font-mono text-emerald-400">14.2 ms (p99)</span>
        </div>
      </div>

      <div className="mpc-controls-footer">
        <button
          onClick={triggerCeremony}
          disabled={isSigning}
          className={`btn-modal-primary flex items-center gap-2 ${isSigning ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSigning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{t.signingStatus}</span>
            </>
          ) : signatureDone ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Signature Validated (3/5 Met)</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>{t.initiateBtn}</span>
            </>
          )}
        </button>
        <button
          onClick={resetCeremony}
          className="btn-modal-secondary"
        >
          {t.resetBtn}
        </button>
      </div>
    </div>
  );
};
