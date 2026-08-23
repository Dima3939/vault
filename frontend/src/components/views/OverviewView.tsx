import React, { useState } from 'react';
import {
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  AlertCircle,
  Sliders,
  Plus,
  Check,
  X,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OverviewViewProps {
  onNavigateTab: (tab: any) => void;
  onInitiateTransfer: () => void;
  t: any;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigateTab,
  t
}) => {
  const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D' | '30D' | '1Y'>('24H');
  const [approvalsCount, setApprovalsCount] = useState(3);
  const [userApproved, setUserApproved] = useState(false);
  const [approvedSigners, setApprovedSigners] = useState<Record<string, boolean>>({
    'john': true,
    'sarah': true,
    'michael': false,
    'david': false,
    'emily': false
  });

  const ovT = t?.os?.overview || {};

  const [policies, setPolicies] = useState([
    { id: '1', title: 'Large Transaction Policy', desc: 'Transfers > $100,000 require 3+ approvals', active: true, conditions: 2 },
    { id: '2', title: 'New Beneficiary Policy', desc: 'New addresses require whitelist approval', active: true, conditions: 3 },
    { id: '3', title: 'Time-based Policy', desc: 'Transactions outside business hours locked', active: true, conditions: 2 },
    { id: '4', title: 'Asset Policy', desc: 'Specific gas rules for high-value tokens', active: true, conditions: 4 },
    { id: '5', title: 'Geographic Policy', desc: 'Hardware enclave IP whitelist validation', active: false, conditions: 1 },
  ]);

  const togglePolicy = (id: string) => {
    setPolicies(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const handleApproveTransaction = () => {
    if (userApproved) return;
    setUserApproved(true);
    setApprovedSigners(prev => ({ ...prev, michael: true }));
    setApprovalsCount(prev => Math.max(0, prev - 1));
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
  };

  const handleRejectTransaction = () => {
    setUserApproved(false);
    setApprovedSigners(prev => ({ ...prev, michael: false }));
  };

  return (
    <div className="overview-container">
      {/* 1. TOP METRIC SUMMARY CARDS */}
      <div className="overview-metrics-grid">
        {/* Total Assets */}
        <div className="overview-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">{ovT.totalAssets || 'Total Assets'}</span>
            <div className="stat-card-icon-wrap emerald">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-card-value font-mono">$128,750,350.45</div>
            <div className="stat-card-badge positive">
              <TrendingUp className="w-3 h-3" />
              <span>+3.24% (24h)</span>
            </div>
          </div>
        </div>

        {/* Wallets */}
        <div className="overview-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">{ovT.activeWallets || 'Active Wallets'}</span>
            <div className="stat-card-icon-wrap indigo">
              <Wallet className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-card-value font-mono">24</div>
            <div className="stat-card-subtext">{ovT.walletsSub || 'Segregated Enclaves'}</div>
          </div>
        </div>

        {/* Transactions (24h) */}
        <div className="overview-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">{ovT.transactions24h || 'Transactions (24h)'}</span>
            <div className="stat-card-icon-wrap purple">
              <Layers className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-card-value font-mono">47</div>
            <div className="stat-card-badge positive">
              <span>{ovT.volume24h || '+12.5% volume'}</span>
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="overview-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">{ovT.pendingApprovals || 'Pending Approvals'}</span>
            <div className="stat-card-icon-wrap amber">
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-card-value font-mono text-amber-400">{userApproved ? 2 : approvalsCount}</div>
            <div className="stat-card-subtext text-amber-400/80 font-medium">{ovT.requiresQuorum || 'Requires Quorum Action'}</div>
          </div>
        </div>
      </div>

      {/* 2. CHARTS ROW: PORTFOLIO BALANCE + ASSET ALLOCATION */}
      <div className="overview-charts-grid">
        {/* Left: Portfolio Balance Area Chart */}
        <div className="overview-chart-card balance-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">{ovT.portfolioBalance || 'Portfolio Balance'}</div>
              <div className="chart-main-val font-mono">
                $128,750,350.45 <span className="chart-delta-tag">+3.24% (24h)</span>
              </div>
            </div>

            {/* Timeframe selector */}
            <div className="chart-timeframe-picker">
              {(['1H', '24H', '7D', '30D', '1Y'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Area Line Chart */}
          <div className="chart-svg-wrapper">
            <svg viewBox="0 0 700 220" className="balance-area-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="balanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Background Grid Lines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <line x1="0" y1="95" x2="700" y2="95" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <line x1="0" y1="150" x2="700" y2="150" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

              {/* Area Fill */}
              <path
                d="M 0 160 Q 100 130, 180 145 T 320 110 T 460 120 T 580 80 T 700 65 L 700 220 L 0 220 Z"
                fill="url(#balanceGradient)"
              />

              {/* Top Smooth Line */}
              <path
                d="M 0 160 Q 100 130, 180 145 T 320 110 T 460 120 T 580 80 T 700 65"
                fill="none"
                stroke="#818CF8"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Interactive Current Point */}
              <circle cx="700" cy="65" r="5" fill="#818CF8" />
              <circle cx="700" cy="65" r="10" fill="none" stroke="#818CF8" strokeOpacity="0.5" className="animate-ping" />
            </svg>

            {/* Time Axis Labels */}
            <div className="chart-x-axis">
              <span>00:00</span>
              <span>04:00</span>
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
              <span>24:00</span>
            </div>
          </div>
        </div>

        {/* Right: Asset Allocation Donut */}
        <div className="overview-chart-card allocation-card">
          <div className="chart-card-header">
            <div className="chart-card-title">{ovT.assetAllocation || 'Asset Allocation'}</div>
            <button onClick={() => onNavigateTab('wallets')} className="view-all-link">
              {ovT.viewAll || 'View all'}
            </button>
          </div>

          <div className="donut-chart-container">
            {/* SVG Donut */}
            <div className="donut-svg-box">
              <svg viewBox="0 0 160 160" className="donut-svg">
                {/* Bitcoin slice (45.2%) */}
                <circle
                  cx="80" cy="80" r="58"
                  fill="none" stroke="#F59E0B" strokeWidth="18"
                  strokeDasharray="164.5 364.4"
                  strokeDashoffset="0"
                />
                {/* Ethereum slice (25.1%) */}
                <circle
                  cx="80" cy="80" r="58"
                  fill="none" stroke="#6366F1" strokeWidth="18"
                  strokeDasharray="91.4 364.4"
                  strokeDashoffset="-164.5"
                />
                {/* USDC slice (15.3%) */}
                <circle
                  cx="80" cy="80" r="58"
                  fill="none" stroke="#00E599" strokeWidth="18"
                  strokeDasharray="55.7 364.4"
                  strokeDashoffset="-255.9"
                />
                {/* Other assets slice (14.4%) */}
                <circle
                  cx="80" cy="80" r="58"
                  fill="none" stroke="#06B6D4" strokeWidth="18"
                  strokeDasharray="52.8 364.4"
                  strokeDashoffset="-311.6"
                />
              </svg>
              <div className="donut-center-text">
                <span className="text-[10px] text-slate-400 font-mono">ASSETS</span>
                <span className="font-mono font-bold text-sm text-white">{ovT.chainsCount || '4 CHAINS'}</span>
              </div>
            </div>

            {/* Asset Legend Rows */}
            <div className="donut-legend-list">
              <div className="legend-row">
                <div className="flex items-center gap-2">
                  <span className="legend-dot bg-amber-500"></span>
                  <span className="legend-asset-name">Bitcoin</span>
                </div>
                <div className="text-right">
                  <div className="legend-pct font-mono font-bold">45.2%</div>
                  <div className="legend-usd font-mono">$58,012,450</div>
                </div>
              </div>

              <div className="legend-row">
                <div className="flex items-center gap-2">
                  <span className="legend-dot bg-indigo-500"></span>
                  <span className="legend-asset-name">Ethereum</span>
                </div>
                <div className="text-right">
                  <div className="legend-pct font-mono font-bold">25.1%</div>
                  <div className="legend-usd font-mono">$32,238,450</div>
                </div>
              </div>

              <div className="legend-row">
                <div className="flex items-center gap-2">
                  <span className="legend-dot bg-emerald-400"></span>
                  <span className="legend-asset-name">USDC</span>
                </div>
                <div className="text-right">
                  <div className="legend-pct font-mono font-bold">15.3%</div>
                  <div className="legend-usd font-mono">$19,648,350</div>
                </div>
              </div>

              <div className="legend-row">
                <div className="flex items-center gap-2">
                  <span className="legend-dot bg-cyan-400"></span>
                  <span className="legend-asset-name">Solana / Other</span>
                </div>
                <div className="text-right">
                  <div className="legend-pct font-mono font-bold">14.4%</div>
                  <div className="legend-usd font-mono">$18,740,100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RECENT TRANSACTIONS TABLE */}
      <div className="overview-table-card">
        <div className="table-card-header">
          <div className="chart-card-title">{ovT.recentTransactions || 'Recent Transactions'}</div>
          <button onClick={() => onNavigateTab('transactions')} className="view-all-link">
            {ovT.viewAll || 'View all'}
          </button>
        </div>

        <div className="table-responsive-wrapper">
          <table className="vault-os-table">
            <thead>
              <tr>
                <th>{ovT.type || 'Type'}</th>
                <th>{ovT.amount || 'Amount'}</th>
                <th>{ovT.asset || 'Asset'}</th>
                <th>{ovT.from || 'From'}</th>
                <th>{ovT.to || 'To'}</th>
                <th>{ovT.status || 'Status'}</th>
                <th>{ovT.time || 'Time'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center gap-1.5 text-red-400">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{ovT.transfer || 'Transfer'}</span>
                  </div>
                </td>
                <td className="font-mono font-bold text-red-400">-250.00 BTC</td>
                <td>
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="asset-tag-circle bg-amber-500 text-black">₿</span>
                    <span>BTC</span>
                  </div>
                </td>
                <td className="font-mono text-xs text-slate-400">Cold Storage 1</td>
                <td className="font-mono text-xs text-slate-300">Binance Deposit</td>
                <td>
                  <span className="status-pill completed">{ovT.completed || 'Completed'}</span>
                </td>
                <td className="text-xs text-slate-400">2m ago</td>
              </tr>

              <tr>
                <td>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <ArrowDownLeft className="w-4 h-4" />
                    <span>{ovT.receive || 'Receive'}</span>
                  </div>
                </td>
                <td className="font-mono font-bold text-emerald-400">+1,250.00 ETH</td>
                <td>
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="asset-tag-circle bg-indigo-500 text-white">Ξ</span>
                    <span>ETH</span>
                  </div>
                </td>
                <td className="font-mono text-xs text-slate-400">Coinbase Prime</td>
                <td className="font-mono text-xs text-slate-300">Hot Wallet 1</td>
                <td>
                  <span className="status-pill completed">{ovT.completed || 'Completed'}</span>
                </td>
                <td className="text-xs text-slate-400">15m ago</td>
              </tr>

              <tr>
                <td>
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{ovT.transfer || 'Transfer'}</span>
                  </div>
                </td>
                <td className="font-mono font-bold text-amber-400">-50,000.00 USDC</td>
                <td>
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="asset-tag-circle bg-emerald-500 text-white">$</span>
                    <span>USDC</span>
                  </div>
                </td>
                <td className="font-mono text-xs text-slate-400">Treasury Wallet</td>
                <td className="font-mono text-xs text-slate-300">Vendor Payment</td>
                <td>
                  <span className="status-pill pending">{ovT.pending || 'Pending Quorum'}</span>
                </td>
                <td className="text-xs text-slate-400">32m ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. BOTTOM 3 INTERACTIVE MODULES */}
      <div className="overview-bottom-grid">
        {/* Module 1: Transaction Approval Flow */}
        <div className="overview-widget-card approval-widget">
          <div className="widget-header">
            <div className="widget-title-group">
              <span className="widget-title">{ovT.approvalFlowTitle || 'Transaction Approval Flow'}</span>
              <span className="high-priority-tag">{ovT.highPriority || 'High Priority'}</span>
            </div>
            <span className="text-xs font-mono text-indigo-400">
              {Object.values(approvedSigners).filter(Boolean).length} {ovT.approvalsCollected || 'of 5 Approvals'}
            </span>
          </div>

          <div className="widget-body">
            <div className="transfer-request-banner">
              <div className="transfer-amount-line font-mono">
                -250.00 BTC <span className="text-xs text-slate-400 font-sans">($16,250,000.00 USD)</span>
              </div>
              <div className="transfer-route-flex">
                <div className="route-node font-mono">Cold Storage 1 (0x8f3a)</div>
                <div className="text-indigo-400 font-bold">➔</div>
                <div className="route-node font-mono">Binance Deposit</div>
              </div>
            </div>

            {/* Signers list */}
            <div className="signers-list">
              <div className="signer-item">
                <div className="signer-avatar">JS</div>
                <div className="signer-info">
                  <div className="signer-name">John Smith</div>
                  <div className="signer-role">Compliance Officer</div>
                </div>
                <span className="signer-status-badge approved">✓ {ovT.approved || 'Approved'}</span>
              </div>

              <div className="signer-item">
                <div className="signer-avatar">SJ</div>
                <div className="signer-info">
                  <div className="signer-name">Sarah Johnson</div>
                  <div className="signer-role">Risk Manager</div>
                </div>
                <span className="signer-status-badge approved">✓ {ovT.approved || 'Approved'}</span>
              </div>

              <div className="signer-item highlight">
                <div className="signer-avatar me">MC</div>
                <div className="signer-info">
                  <div className="signer-name">Michael Chen (You)</div>
                  <div className="signer-role">Treasury Manager</div>
                </div>
                {approvedSigners.michael ? (
                  <span className="signer-status-badge approved">✓ {ovT.approvedByYou || 'Approved by You'}</span>
                ) : (
                  <span className="signer-status-badge pending">● {ovT.signatureRequired || 'Signature Required'}</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="approval-actions-footer">
              <button 
                onClick={handleRejectTransaction}
                className="btn-widget-reject"
              >
                <X className="w-4 h-4" />
                <span>{ovT.rejectBtn || 'Reject'}</span>
              </button>
              <button 
                onClick={handleApproveTransaction}
                disabled={userApproved}
                className={`btn-widget-approve ${userApproved ? 'completed' : ''}`}
              >
                {userApproved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{ovT.quorumMet || 'Threshold Quorum Met!'}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{ovT.approveBtn || 'Approve MPC Ceremony'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Module 2: Policy Engine */}
        <div className="overview-widget-card policy-widget">
          <div className="widget-header">
            <span className="widget-title">{ovT.policyEngineTitle || 'Policy Engine'}</span>
            <button onClick={() => onNavigateTab('policies')} className="btn-add-policy">
              <Plus className="w-3.5 h-3.5" />
              <span>{ovT.newPolicyBtn || 'New Policy'}</span>
            </button>
          </div>

          <div className="policies-list">
            {policies.map((p) => (
              <div key={p.id} className="policy-row-item">
                <div className="policy-row-left">
                  <div className={`policy-status-icon ${p.active ? 'active' : ''}`}>
                    <Sliders className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="policy-row-title">{p.title}</div>
                    <div className="policy-row-desc">{p.desc}</div>
                  </div>
                </div>
                <div className="policy-row-right">
                  <span className="policy-condition-tag font-mono">{p.conditions} {ovT.rulesCount || 'rules'}</span>
                  <button 
                    onClick={() => togglePolicy(p.id)}
                    className={`policy-toggle-switch ${p.active ? 'on' : 'off'}`}
                  >
                    <span className="toggle-slider"></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 3: Key Management MPC Infrastructure */}
        <div className="overview-widget-card mpc-widget">
          <div className="widget-header">
            <span className="widget-title">{ovT.keyManagementTitle || 'Key Management (MPC-CMP)'}</span>
            <button onClick={() => onNavigateTab('mpc')} className="view-all-link">
              {ovT.inspectShards || 'Inspect Shards'}
            </button>
          </div>

          <div className="mpc-widget-body">
            <div className="mpc-numbers-row">
              <div className="mpc-mini-stat">
                <span className="text-[10px] text-slate-400 uppercase">{ovT.keyGroups || 'Key Groups'}</span>
                <span className="font-mono text-xl font-bold text-white">24</span>
              </div>
              <div className="mpc-mini-stat">
                <span className="text-[10px] text-slate-400 uppercase">{ovT.totalKeyShares || 'Total Key Shares'}</span>
                <span className="font-mono text-xl font-bold text-white">120</span>
              </div>
              <div className="mpc-mini-stat">
                <span className="text-[10px] text-slate-400 uppercase">{ovT.threshold || 'Threshold'}</span>
                <span className="font-mono text-xl font-bold text-indigo-400">3 of 5</span>
              </div>
            </div>

            <div className="primary-wallet-group-box">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs font-bold text-slate-200">{ovT.primaryKeyShards || 'Primary Treasury Key Shards'}</span>
                <span className="enclave-badge-mini font-mono">{ovT.teeActive || 'TEE ACTIVE'}</span>
              </div>

              <div className="shard-circles-row">
                <div className="shard-circle active">S1</div>
                <div className="shard-circle active">S2</div>
                <div className="shard-circle active">S3</div>
                <div className="shard-circle inactive">S4</div>
                <div className="shard-circle inactive">S5</div>
              </div>

              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-3">
                <span>Curve: secp256k1</span>
                <span>Latency: 14.2ms</span>
                <span>Lloyd's: $250M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
