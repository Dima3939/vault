import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TrendingUp, Layers, CheckCircle2 } from 'lucide-react';

interface TreasuryFlowProps {
  t: any;
}

interface AssetSegment {
  name: string;
  ticker: string;
  percentage: number;
  usdValue: string;
  color: string;
  yieldApy: string;
}

export const TreasuryFlowChart: React.FC<TreasuryFlowProps> = ({ t }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<string>('BTC');

  const assets: AssetSegment[] = [
    { name: 'Bitcoin Reserves', ticker: 'BTC', percentage: 42, usdValue: '$1,764,000,000', color: '#F59E0B', yieldApy: '4.2%' },
    { name: 'Ethereum Staking', ticker: 'ETH', percentage: 28, usdValue: '$1,176,000,000', color: '#6366F1', yieldApy: '5.8%' },
    { name: 'Solana High-Yield', ticker: 'SOL', percentage: 16, usdValue: '$672,000,000', color: '#06B6D4', yieldApy: '7.1%' },
    { name: 'Institutional USD', ticker: 'USDC', percentage: 14, usdValue: '$588,000,000', color: '#10B981', yieldApy: '4.9%' },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 500;
    const height = 240;
    const margin = { top: 25, right: 20, bottom: 45, left: 45 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // X Scale (Assets)
    const x = d3.scaleBand()
      .domain(assets.map(d => d.ticker))
      .range([0, innerWidth])
      .padding(0.35);

    // Y Scale (Percentage)
    const y = d3.scaleLinear()
      .domain([0, 50])
      .range([innerHeight, 0]);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.15)
      .call(d3.axisLeft(y).ticks(4).tickSize(-innerWidth).tickFormat(() => ''));

    // Bars
    g.selectAll('.bar')
      .data(assets)
      .enter()
      .append('rect')
      .attr('class', 'bar cursor-pointer')
      .attr('x', d => x(d.ticker) || 0)
      .attr('y', innerHeight)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('rx', 6)
      .attr('fill', d => d.color)
      .attr('opacity', d => d.ticker === selectedAsset ? 1 : 0.65)
      .attr('filter', d => d.ticker === selectedAsset ? `drop-shadow(0 0 12px ${d.color}70)` : 'none')
      .on('click', (_, d) => setSelectedAsset(d.ticker))
      .transition()
      .duration(700)
      .attr('y', d => y(d.percentage))
      .attr('height', d => innerHeight - y(d.percentage));

    // Value Labels on Top of Bars
    g.selectAll('.bar-label')
      .data(assets)
      .enter()
      .append('text')
      .attr('x', d => (x(d.ticker) || 0) + x.bandwidth() / 2)
      .attr('y', d => y(d.percentage) - 8)
      .attr('text-anchor', 'middle')
      .attr('fill', '#FFFFFF')
      .attr('font-size', '12px')
      .attr('font-weight', '700')
      .attr('font-family', 'var(--font-mono)')
      .text(d => `${d.percentage}%`);

    // X Axis Labels
    g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(x).tickSize(0))
      .call(g => g.select('.domain').remove())
      .selectAll('text')
      .attr('dy', '16px')
      .attr('fill', '#94A3B8')
      .attr('font-family', 'var(--font-mono)')
      .attr('font-weight', '700')
      .attr('font-size', '12px');

  }, [selectedAsset]);

  const activeAssetData = assets.find(a => a.ticker === selectedAsset) || assets[0];

  return (
    <div className="treasury-card">
      <div className="treasury-header">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="text-indigo-400 w-5 h-5" />
            <h3 className="text-lg font-bold text-white tracking-tight">Institutional Treasury Allocation</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">Multi-Chain Vault Liquidity Pool #471-ZK</p>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 font-mono uppercase">{t.totalAum || 'Total Liquidity'}</span>
          <div className="text-xl font-extrabold text-white font-mono">$4,200,000,000</div>
        </div>
      </div>

      <div className="treasury-grid-layout">
        {/* D3 Bar Chart */}
        <div className="treasury-d3-box">
          <svg ref={svgRef} viewBox="0 0 500 240" className="w-full h-auto select-none" />
        </div>

        {/* Selected Asset Details Box */}
        <div className="treasury-asset-detail-card">
          <div className="asset-detail-header">
            <span className="asset-badge" style={{ backgroundColor: `${activeAssetData.color}20`, color: activeAssetData.color, borderColor: `${activeAssetData.color}50` }}>
              {activeAssetData.ticker}
            </span>
            <span className="text-base font-bold text-white">{activeAssetData.name}</span>
          </div>

          <div className="asset-metrics-stack flex flex-col gap-3 mt-4">
            <div className="flex justify-between items-center py-2.5 border-b border-white/10">
              <span className="text-xs text-slate-400 font-medium">Vault Balance:</span>
              <span className="text-sm font-bold text-white font-mono">{activeAssetData.usdValue}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-white/10">
              <span className="text-xs text-slate-400 font-medium">Yield Strategy (APY):</span>
              <span className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> {activeAssetData.yieldApy}
              </span>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <span className="text-xs text-slate-400 font-medium">Settlement Speed:</span>
              <span className="text-sm font-bold text-indigo-400 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Instant ZK-Finality
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
