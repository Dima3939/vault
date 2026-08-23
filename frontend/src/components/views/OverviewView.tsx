import React, { useState } from 'react';
import { 
  TrendingUp, 
  Shield, 
  Key, 
  Clock, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Sliders, 
  Plus, 
  Check, 
  X, 
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DashboardTab } from '../Sidebar';

interface OverviewViewProps {
  onNavigateTab: (tab: DashboardTab) => void;
  onInitiateTransfer: () => void;
  t: any;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigateTab,
  t
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1H' | '24H' | '7D' | '30D' | '1Y'>('24H');
  const [approvedSigners, setApprovedSigners] = useState<{ john: boolean; sarah: boolean; michael: boolean }>({
    john: true,
    sarah: true,
    michael: false
  });
  const [userApproved, setUserApproved] = useState(false);
  const [policies, setPolicies] = useState([
    { id: 'p1', title: 'Large Transfer Quorum', desc: 'Transfers > $100,000 require 3+ approvals', conditions: '3 of 5', active: true },
    { id: 'p2', title: 'New Beneficiary Policy', desc: 'New addresses require 24h whitelist delay', conditions: '24h Lock', active: true },
    { id: 'p3', title: 'Time-lock Vault Security', desc: 'Lock transfers outside corporate hours', conditions: '08:00-18:00', active: false },
    { id: 'p4', title: 'Multi-Cloud HSM Routing', desc: 'Require AWS Nitro + GCP Confidential VM', conditions: 'Multi-Cloud', active: true },
  ]);

  const ovT = t?.os?.overview || {};

  const handleApproveTransaction = () => {
    setApprovedSigners(prev => ({ ...prev, michael: true }));
    setUserApproved(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleRejectTransaction = () => {
    setApprovedSigners(prev => ({ ...prev, michael: false }));
    setUserApproved(false);
  };

  const togglePolicy = (id: string) => {
    setPolicies(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="overview-container">
      {/* 1. TOP 4 METRIC STAT CARDS */}
      <div className="overview-metrics-grid">
        {/* Card 1: Total Portfolio Value */}
        <div className="overview-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">{ovT.totalBalance || 'Total Portfolio Value'}</span>
            <div className="stat-card-icon-wrap emerald">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="stat-card-value font-mono">$109,899,250.00</div>
          <div className="stat-card-badge positive">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4.28% {ovT.growthPeriod || '(24h)'}</span>
          </div>
        </div>

        {/* Card 2: Active Cold Enclaves */}
        <div className="overview-stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">{ovT.activeEnclaves || 'Active Cold Enclaves'}</span>
            <div className="stat-card-icon-wrap indigo">
              <Shield className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div className="stat-card-value font-mono">18 / 18</div>
          <div className="stat-card-subtext">{ovT.fipsStatus || 'FIPS 140-2 Level 3 Active'}</div>
        </div>

        {/* Card 3: Pending Approvals */}
        <div className="overview-stat-card cursor-pointer" onClick={() => onNavigateTab('approvals')}>
          <div className="stat-card-header">
            <span className="stat-card-label">{ovT.pendingApprovals || 'Pending Approvals'}</span>
            <div className="stat-card-icon-wrap amber">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div className="stat-card-value font-mono text-amber-400">7</div>
          <div className="stat-card-subtext">{ovT.quorumActionNeeded || '3 Requires Your Signature'}</div>
        </div>

        {/* Card 4: MPC Key Groups */}
        <div className="overview-stat-card cursor-pointer" onClick={() => onNavigateTab('mpc')}>
          <div className="stat-card-header">
            <span className="stat-card-label">{ovT.mpcKeyHealth || 'MPC Shard Quorum'}</span>
            <div className="stat-card-icon-wrap purple">
              <Key className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="stat-card-value font-mono text-emerald-400">100%</div>
          <div className="stat-card-subtext">{ovT.zeroKnowledgeValid || 'Zero-Knowledge Verified'}</div>
        </div>
      </div>

      {/* 2. MIDDLE ROW: PORTFOLIO BALANCE AREA CHART & ASSET DONUT */}
      <div className="overview-charts-grid">
        {/* Left: Portfolio Balance Area Chart */}
        <div className="overview-chart-card balance-chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">{ovT.balanceHistory || 'Portfolio Balance Curve'}</div>
              <div className="chart-main-val font-mono">
                $109,899,250.00
                <span className="chart-delta-tag font-mono">+12.4% {ovT.chartYear || 'vs Last Month'}</span>
              </div>
            </div>

            {/* Timeframe Picker */}
            <div className="chart-timeframe-picker">
              {(['1H', '24H', '7D', '30D', '1Y'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`timeframe-btn ${selectedTimeframe === tf ? 'active' : ''}`}
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
                  fill="none" stroke="#10B981" strokeWidth="18"
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
                  <span className="legend-pct font-mono font-bold">52.8%</span>
                  <div className="legend-usd font-mono">$58,012,450</div>
                </div>
              </div>

              <div className="legend-row">
                <div className="flex items-center gap-2">
                  <span className="legend-dot bg-indigo-500"></span>
                  <span className="legend-asset-name">Ethereum</span>
                </div>
                <div className="text-right">
                  <span className="legend-pct font-mono font-bold">29.3%</span>
                  <div className="legend-usd font-mono">$32,238,450</div>
                </div>
              </div>

              <div className="legend-row">
                <div className="flex items-center gap-2">
                  <span className="legend-dot bg-emerald-500"></span>
                  <span className="legend-asset-name">USDC Yield</span>
                </div>
                <div className="text-right">
                  <span className="legend-pct font-mono font-bold">17.9%</span>
                  <div className="legend-usd font-mono">$19,648,350</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RECENT TRANSACTIONS TABLE */}
      <div className="overview-table-card">
        <div className="table-card-header">
          <div>
            <h3 className="text-base font-bold text-white">{ovT.recentTransactions || 'Recent Vault Operations'}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{ovT.ledgerSubtitle || 'Multi-Sig Quorum Signed Transactions'}</p>
          </div>
          <button onClick={() => onNavigateTab('transactions')} className="view-all-link">
            {ovT.viewLedger || 'Full Ledger'} ➔
          </button>
        </div>

        <div className="table-responsive-wrapper">
          <table className="vault-os-table">
            <thead>
              <tr>
                <th style={{ width: '130px' }}>{ovT.type || 'Type'}</th>
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
                  <div className="tx-type-cell">
                    <div className="tx-type-icon-box transfer">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                    <span className="tx-type-label transfer">{ovT.transfer || 'Transfer'}</span>
                  </div>
                </td>
                <td className="font-mono font-bold text-red-400">-250.00 BTC</td>
                <td>
                  <div className="inline-flex items-center gap-1.5 font-bold">
                    <span className="asset-tag-circle bg-amber-500 text-black">₿</span>
                    <span>BTC</span>
                  </div>
                </td>
                <td className="font-mono text-xs text-slate-400">Cold Storage 1</td>
                <td className="font-mono text-xs text-slate-300">Binance Deposit</td>
                <td>
                  <span className="status-pill completed">{ovT.completed || 'Completed'}</span>
                </td>
                <td className="text-xs text-slate-400 font-mono">2m ago</td>
              </tr>

              <tr>
                <td>
                  <div className="tx-type-cell">
                    <div className="tx-type-icon-box receive">
                      <ArrowDownLeft className="w-3.5 h-3.5" />
                    </div>
                    <span className="tx-type-label receive">{ovT.receive || 'Receive'}</span>
                  </div>
                </td>
                <td className="font-mono font-bold text-emerald-400">+1,250.00 ETH</td>
                <td>
                  <div className="inline-flex items-center gap-1.5 font-bold">
                    <span className="asset-tag-circle bg-indigo-500 text-white">Ξ</span>
                    <span>ETH</span>
                  </div>
                </td>
                <td className="font-mono text-xs text-slate-400">Coinbase Prime</td>
                <td className="font-mono text-xs text-slate-300">Hot Wallet 1</td>
                <td>
                  <span className="status-pill completed">{ovT.completed || 'Completed'}</span>
                </td>
                <td className="text-xs text-slate-400 font-mono">15m ago</td>
              </tr>

              <tr>
                <td>
                  <div className="tx-type-cell">
                    <div className="tx-type-icon-box transfer">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                    <span className="tx-type-label transfer">{ovT.transfer || 'Transfer'}</span>
                  </div>
                </td>
                <td className="font-mono font-bold text-amber-400">-50,000.00 USDC</td>
                <td>
                  <div className="inline-flex items-center gap-1.5 font-bold">
                    <span className="asset-tag-circle bg-emerald-500 text-white">$</span>
                    <span>USDC</span>
                  </div>
                </td>
                <td className="font-mono text-xs text-slate-400">Treasury Wallet</td>
                <td className="font-mono text-xs text-slate-300">Vendor Payment</td>
                <td>
                  <span className="status-pill pending">{ovT.pending || 'Pending Quorum'}</span>
                </td>
                <td className="text-xs text-slate-400 font-mono">32m ago</td>
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
            <div className="flex items-center gap-2">
              <span className="widget-title">{ovT.approvalFlowTitle || 'Transaction Approval Flow'}</span>
              <span className="high-priority-tag">{ovT.highPriority || 'High Priority'}</span>
            </div>
            <span className="text-xs font-mono text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 rounded whitespace-nowrap">
              {Object.values(approvedSigners).filter(Boolean).length} {ovT.approvalsCollected || 'of 5 Approvals'}
            </span>
          </div>

          <div className="widget-body">
            <div className="transfer-request-banner">
              <div className="transfer-amount-line font-mono">
                -250.00 BTC <span className="text-xs text-slate-400 font-sans">($16,250,000.00 USD)</span>
              </div>
              <div className="transfer-route-flex mt-1">
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
                  <span className="policy-condition-tag font-mono">{p.conditions}</span>
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
                <span className="text-[10px] text-slate-400 uppercase font-mono">{ovT.keyGroups || 'Key Groups'}</span>
                <span className="font-mono text-xl font-bold text-white mt-1">24</span>
              </div>
              <div className="mpc-mini-stat">
                <span className="text-[10px] text-slate-400 uppercase font-mono">{ovT.totalKeyShares || 'Key Shares'}</span>
                <span className="font-mono text-xl font-bold text-white mt-1">120</span>
              </div>
              <div className="mpc-mini-stat">
                <span className="text-[10px] text-slate-400 uppercase font-mono">{ovT.threshold || 'Threshold'}</span>
                <span className="font-mono text-xl font-bold text-indigo-400 mt-1">3 of 5</span>
              </div>
            </div>

            <div className="primary-wallet-group-box">
              <div className="shard-box-header">
                <div className="flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider">
                    {ovT.primaryKeyShards || 'Primary Key Shards'}
                  </span>
                </div>
                <span className="enclave-badge-mini font-mono">{ovT.teeActive || 'TEE ACTIVE'}</span>
              </div>

              <div className="shard-circles-row">
                <div className="shard-circle active">S1</div>
                <div className="shard-circle active">S2</div>
                <div className="shard-circle active">S3</div>
                <div className="shard-circle">S4</div>
                <div className="shard-circle">S5</div>
              </div>

              {/* High-Contrast Distinct Metrics Grid */}
              <div className="mpc-chip-grid">
                <div className="mpc-chip">
                  <span className="mpc-chip-label">CURVE</span>
                  <span className="mpc-chip-value">secp256k1</span>
                </div>
                <div className="mpc-chip">
                  <span className="mpc-chip-label">LATENCY</span>
                  <span className="mpc-chip-value text-emerald-400">14.2 ms</span>
                </div>
                <div className="mpc-chip">
                  <span className="mpc-chip-label">COVERAGE</span>
                  <span className="mpc-chip-value text-indigo-400">$250M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
