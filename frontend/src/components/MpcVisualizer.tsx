import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ShieldCheck, RefreshCw, Key, Zap, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MpcVisualizerProps {
  t: {
    title: string;
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
  type: 'center' | 'shard';
  active: boolean;
  color: string;
  role: string;
  badge: string;
}

export const MpcVisualizer: React.FC<MpcVisualizerProps> = ({ t }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [signatureDone, setSignatureDone] = useState(false);
  const [signatureHash, setSignatureHash] = useState<string>(
    '0x7f9a8b1c4e2d0f3a6b5c8d1e4f7a2b9c0d3e6f8a1b4c7d0e3f6a9b2c5d8e1f4a'
  );

  const triggerCeremony = () => {
    setIsSigning(true);
    setSignatureDone(false);
    
    // Generate new cryptographic signature hash
    const randomHex = Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    
    setTimeout(() => {
      setSignatureHash(`0x${randomHex}`);
      setIsSigning(false);
      setSignatureDone(true);
      confetti({ particleCount: 65, spread: 60, origin: { y: 0.65 } });
    }, 1400);
  };

  const resetCeremony = () => {
    setIsSigning(false);
    setSignatureDone(false);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 760;
    const height = 440;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Defs for gradients & filters
    const defs = svg.append('defs');

    // Laser glow filter
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%').attr('y', '-50%')
      .attr('width', '200%').attr('height', '200%');
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Laser Gradient
    const laserGradient = defs.append('linearGradient')
      .attr('id', 'laserGrad')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '100%');
    laserGradient.append('stop').attr('offset', '0%').attr('stop-color', '#818CF8');
    laserGradient.append('stop').attr('offset', '100%').attr('stop-color', '#10B981');

    // Center Node Gradient
    const coreGrad = defs.append('radialGradient')
      .attr('id', 'coreGrad')
      .attr('cx', '50%').attr('cy', '50%').attr('r', '50%');
    coreGrad.append('stop').attr('offset', '0%').attr('stop-color', '#312E81');
    coreGrad.append('stop').attr('offset', '100%').attr('stop-color', '#1E1B4B');

    // Active Node Gradient
    const nodeGrad = defs.append('linearGradient')
      .attr('id', 'nodeGrad')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '100%');
    nodeGrad.append('stop').attr('offset', '0%').attr('stop-color', '#6366F1');
    nodeGrad.append('stop').attr('offset', '100%').attr('stop-color', '#4F46E5');

    // Container group
    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Geometric Blueprint Grid & Concentric Rings
    const ringRadius = [170, 115, 60];
    ringRadius.forEach((r, idx) => {
      g.append('circle')
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', idx === 0 ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.06)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', idx === 1 ? '4 4' : 'none');
    });

    // Crosshair axes
    g.append('line')
      .attr('x1', -180).attr('y1', 0).attr('x2', 180).attr('y2', 0)
      .attr('stroke', 'rgba(255, 255, 255, 0.05)').attr('stroke-dasharray', '2 4');
    g.append('line')
      .attr('x1', 0).attr('y1', -180).attr('x2', 0).attr('y2', 180)
      .attr('stroke', 'rgba(255, 255, 255, 0.05)').attr('stroke-dasharray', '2 4');

    // 5 Shard Nodes positioned in pentagon
    const shardNodes: NodeData[] = [
      { id: '1', name: 'Shard Alpha', badge: 'S1', type: 'shard', active: true, color: '#6366F1', role: 'Zurich Nitro Enclave' },
      { id: '2', name: 'Shard Beta', badge: 'S2', type: 'shard', active: true, color: '#6366F1', role: 'Frankfurt Conf. VM' },
      { id: '3', name: 'Shard Gamma', badge: 'S3', type: 'shard', active: true, color: '#6366F1', role: 'London Cloud HSM' },
      { id: '4', name: 'Shard Delta', badge: 'S4', type: 'shard', active: false, color: '#64748B', role: 'Mobile Biometric (Standby)' },
      { id: '5', name: 'Shard Epsilon', badge: 'S5', type: 'shard', active: false, color: '#64748B', role: 'Cold DR Vault (Standby)' },
    ];

    const angleStep = (2 * Math.PI) / 5;
    const distance = 145;

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
        .attr('stroke', isParticipating ? (signatureDone ? '#10B981' : '#6366F1') : 'rgba(255, 255, 255, 0.1)')
        .attr('stroke-width', isParticipating ? (isSigning ? 3 : 2) : 1)
        .attr('stroke-dasharray', isParticipating ? (isSigning ? '8 4' : 'none') : '3 3')
        .attr('opacity', isParticipating ? 1 : 0.4)
        .attr('filter', isParticipating ? 'url(#glow)' : 'none');

      if (isSigning && isParticipating) {
        line.append('animate')
          .attr('attributeName', 'stroke-dashoffset')
          .attr('values', '24;0')
          .attr('dur', '0.5s')
          .attr('repeatCount', 'indefinite');
      }
    });

    // Draw Central Aggregator Hub
    const centerGroup = g.append('g').attr('class', 'center-hub');
    
    // Outer glow aura
    centerGroup.append('circle')
      .attr('r', 44)
      .attr('fill', signatureDone ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 102, 241, 0.15)')
      .attr('stroke', signatureDone ? '#10B981' : '#6366F1')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4 4')
      .attr('filter', 'url(#glow)');

    // Core Solid Circle
    centerGroup.append('circle')
      .attr('r', 32)
      .attr('fill', 'url(#coreGrad)')
      .attr('stroke', signatureDone ? '#10B981' : '#818CF8')
      .attr('stroke-width', 2.5);

    centerGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', -2)
      .attr('fill', '#FFFFFF')
      .attr('font-size', '13px')
      .attr('font-weight', '800')
      .attr('font-family', 'var(--font-mono)')
      .text('MPC TSS');

    centerGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 14)
      .attr('fill', signatureDone ? '#10B981' : '#A5B4FC')
      .attr('font-size', '9px')
      .attr('font-weight', '700')
      .attr('font-family', 'var(--font-mono)')
      .text(signatureDone ? '✓ VERIFIED' : '3/5 QUORUM');

    // Draw Shard Nodes
    const nodeGroups = g.selectAll('.shard-node')
      .data(shardNodes)
      .enter()
      .append('g')
      .attr('class', 'shard-node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    // Outer ring for active shards
    nodeGroups.filter(d => d.active).append('circle')
      .attr('r', 25)
      .attr('fill', 'none')
      .attr('stroke', '#6366F1')
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.6)
      .attr('filter', 'url(#glow)');

    // Shard Circle Body
    nodeGroups.append('circle')
      .attr('r', 19)
      .attr('fill', d => d.active ? 'url(#nodeGrad)' : '#1E293B')
      .attr('stroke', d => d.active ? '#A5B4FC' : '#475569')
      .attr('stroke-width', 2)
      .attr('filter', d => d.active ? 'url(#glow)' : 'none');

    // Shard Badge Text (S1, S2...)
    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('font-size', '12px')
      .attr('font-weight', '800')
      .attr('font-family', 'var(--font-mono)')
      .attr('fill', d => d.active ? '#FFFFFF' : '#94A3B8')
      .text(d => d.badge);

    // High-Contrast Label Pill Under Node
    nodeGroups.each(function(d) {
      const el = d3.select(this);
      const isTop = (d.y || 0) < 0;
      const pillY = isTop ? -34 : 26;

      // Label background pill
      el.append('rect')
        .attr('x', -65)
        .attr('y', pillY)
        .attr('width', 130)
        .attr('height', 20)
        .attr('rx', 6)
        .attr('fill', '#0F172A')
        .attr('stroke', d.active ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.1)')
        .attr('stroke-width', 1);

      // Label text
      el.append('text')
        .attr('text-anchor', 'middle')
        .attr('x', 0)
        .attr('y', pillY + 14)
        .attr('font-size', '9.5px')
        .attr('font-weight', '700')
        .attr('fill', d.active ? '#F8FAFC' : '#94A3B8')
        .attr('font-family', 'var(--font-sans)')
        .text(d.role);
    });

  }, [isSigning, signatureDone]);

  return (
    <div className="mpc-visualizer-card">
      <div className="mpc-header">
        <div className="mpc-header-left">
          <Key className="mpc-header-icon text-indigo-400" />
          <h3 className="mpc-header-title">{t.title}</h3>
        </div>
        <div className="mpc-badge-active">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>3/5 Quorum Active</span>
        </div>
      </div>

      <div className="mpc-d3-container">
        <svg
          ref={svgRef}
          viewBox="0 0 760 440"
          className="mpc-d3-svg"
        />
      </div>

      <div className="mpc-terminal-box">
        <div className="terminal-header">
          <span className="terminal-header-title">
            <Zap className="terminal-icon" />
            ECDSA_SIGNATURE_PAYLOAD (DER FORMAT)
          </span>
          <span className="terminal-header-meta font-mono text-slate-400">Curve: secp256k1</span>
        </div>
        <div className="terminal-body">
          <span className="signature-hash-text font-mono">
            {signatureHash}
          </span>
        </div>
      </div>

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
