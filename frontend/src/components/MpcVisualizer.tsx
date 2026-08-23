import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ShieldCheck, RefreshCw, Key, Zap } from 'lucide-react';

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
    }, 1200);
  };

  const resetCeremony = () => {
    setIsSigning(false);
    setSignatureDone(false);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Container group
    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Outer concentric security rings
    const ringRadius = [150, 100, 50];
    ringRadius.forEach((r, idx) => {
      g.append('circle')
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', idx === 0 ? 'var(--vault-border)' : 'var(--vault-emerald-dim)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', idx === 1 ? '4 4' : 'none')
        .attr('opacity', 0.6);
    });

    // 5 Shard Nodes positioned in pentagon
    const shardNodes: NodeData[] = [
      { id: '1', name: 'Shard Alpha', type: 'shard', active: true, color: '#00E599', role: 'AWS Nitro Enclave' },
      { id: '2', name: 'Shard Beta', type: 'shard', active: true, color: '#00E599', role: 'GCP Confidential VM' },
      { id: '3', name: 'Shard Gamma', type: 'shard', active: true, color: '#00E599', role: 'Ledger HSM Co-Signer' },
      { id: '4', name: 'Shard Delta', type: 'shard', active: false, color: '#FFB800', role: 'Mobile Biometric' },
      { id: '5', name: 'Shard Epsilon', type: 'shard', active: false, color: '#64748B', role: 'Cold DR Key Vault' },
    ];

    const angleStep = (2 * Math.PI) / 5;
    const distance = 130;

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
        .attr('stroke', isParticipating ? '#00E599' : 'var(--vault-border)')
        .attr('stroke-width', isParticipating ? (isSigning ? 3 : 1.5) : 1)
        .attr('stroke-dasharray', isParticipating ? (isSigning ? '6 3' : 'none') : '3 3')
        .attr('opacity', isParticipating ? 0.85 : 0.25);

      if (isSigning && isParticipating) {
        line.append('animate')
          .attr('attributeName', 'stroke-dashoffset')
          .attr('values', '20;0')
          .attr('dur', '0.6s')
          .attr('repeatCount', 'indefinite');
      }
    });

    // Draw Central Aggregator Hub
    const centerGroup = g.append('g').attr('class', 'center-hub');
    
    // Central Pulse Circle
    centerGroup.append('circle')
      .attr('r', 28)
      .attr('fill', signatureDone ? 'rgba(0, 229, 153, 0.25)' : 'rgba(0, 229, 153, 0.1)')
      .attr('stroke', signatureDone ? '#00E599' : '#00E599')
      .attr('stroke-width', 2)
      .attr('filter', 'drop-shadow(0 0 15px rgba(0, 229, 153, 0.5))');

    centerGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('fill', '#00E599')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .attr('font-family', 'var(--font-mono)')
      .text('MPC');

    // Draw Shard Nodes
    const nodeGroups = g.selectAll('.shard-node')
      .data(shardNodes)
      .enter()
      .append('g')
      .attr('class', 'shard-node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    nodeGroups.append('circle')
      .attr('r', 16)
      .attr('fill', 'var(--vault-surface)')
      .attr('stroke', d => d.active ? d.color : 'var(--vault-border)')
      .attr('stroke-width', d => d.active ? 2 : 1)
      .attr('filter', d => d.active ? `drop-shadow(0 0 8px ${d.color}40)` : 'none');

    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 4)
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('font-family', 'var(--font-mono)')
      .attr('fill', d => d.active ? d.color : 'var(--vault-text-dim)')
      .text((_, i) => `S${i + 1}`);

    // Shard Labels
    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 28)
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-mono)')
      .attr('fill', 'var(--vault-text-muted)')
      .text(d => d.name);

  }, [isSigning, signatureDone]);

  return (
    <div className="mpc-visualizer-card">
      <div className="mpc-header">
        <div className="mpc-header-left">
          <ShieldCheck className="mpc-header-icon" />
          <h3 className="mpc-header-title">{t.title}</h3>
        </div>
        <div className="mpc-header-right">
          <span className="mpc-badge-active">
            <span className="pulse-dot"></span> 3/5 Quorum Active
          </span>
        </div>
      </div>

      <div className="mpc-d3-container">
        <svg 
          ref={svgRef} 
          viewBox="0 0 600 400" 
          className="mpc-d3-svg"
        />
      </div>

      {/* Cryptographic Signature Output Terminal */}
      <div className="mpc-terminal-box">
        <div className="terminal-header">
          <div className="terminal-header-title">
            <Zap className="terminal-icon" />
            <span>ECDSA_SIGNATURE_PAYLOAD (DER FORMAT)</span>
          </div>
          <span className="terminal-header-meta">Curve: secp256k1</span>
        </div>
        <div className="terminal-body">
          <span className="signature-hash-text">{signatureHash}</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mpc-metrics-grid">
        <div className="metric-box">
          <span className="metric-label">{t.curveMetric}</span>
          <span className="metric-value font-mono">Secp256k1 / Ed25519</span>
        </div>
        <div className="metric-box">
          <span className="metric-label">{t.entropyMetric}</span>
          <span className="metric-value font-mono text-emerald-400">256-bit CSPRNG</span>
        </div>
        <div className="metric-box">
          <span className="metric-label">{t.latencyMetric}</span>
          <span className="metric-value font-mono text-cyan-400">14.2 ms (p99)</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="mpc-controls-footer">
        <button 
          onClick={triggerCeremony} 
          disabled={isSigning}
          className="vault-btn-primary"
        >
          {isSigning ? (
            <>
              <RefreshCw className="btn-icon animate-spin" />
              <span>Generating TSS Protocol Proof...</span>
            </>
          ) : (
            <>
              <Key className="btn-icon" />
              <span>{t.initiateBtn}</span>
            </>
          )}
        </button>

        <button onClick={resetCeremony} className="vault-btn-secondary">
          <span>{t.resetBtn}</span>
        </button>
      </div>
    </div>
  );
};
