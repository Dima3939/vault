import { useState, useEffect } from 'react';
import { translations, LanguageCode } from './i18n';
import { Sidebar, DashboardTab } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { OverviewView } from './components/views/OverviewView';
import { MpcVisualizer } from './components/MpcVisualizer';
import { TreasuryFlowChart } from './components/TreasuryFlowChart';
import { PolicyBuilder } from './components/PolicyBuilder';
import { SdkQuickstart } from './components/SdkQuickstart';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { NewTransferModal } from './components/modals/NewTransferModal';
import { 
  Award, 
  FileCheck2, 
  Building2, 
  Check, 
  X, 
  ArrowUpRight, 
  ArrowDownLeft,
  Search,
  Plus,
  ShieldCheck
} from 'lucide-react';

interface TransactionItem {
  id: string;
  type: 'Transfer' | 'Receive';
  amount: string;
  asset: string;
  txHash: string;
  from: string;
  to: string;
  status: 'Completed' | 'Pending Quorum';
  time: string;
  isPositive?: boolean;
}

export function App() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [approvalsCount] = useState(7);

  // Transactions Search & Filter State
  const [txSearchQuery, setTxSearchQuery] = useState('');
  const [txFilterType, setTxFilterType] = useState<'ALL' | 'TRANSFER' | 'RECEIVE' | 'PENDING'>('ALL');

  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    return (localStorage.getItem('vault_lang') as LanguageCode) || 'en';
  });

  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('vault_theme') as 'dark' | 'light') || 'dark';
  });

  // Update theme on root DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('vault_theme', currentTheme);
  }, [currentTheme]);

  const handleLanguageChange = (lang: LanguageCode) => {
    setCurrentLang(lang);
    localStorage.setItem('vault_lang', lang);
  };

  const handleThemeToggle = () => {
    setCurrentTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const t = translations[currentLang] || translations.en;

  const rawTransactions: TransactionItem[] = [
    {
      id: 'tx-1',
      type: 'Transfer',
      amount: '-250.00 BTC',
      asset: 'BTC',
      txHash: '0x8f3a9b1c4e2d0f3a...7d0e',
      from: 'Cold Storage 1',
      to: 'Binance Deposit',
      status: 'Completed',
      time: '2m ago'
    },
    {
      id: 'tx-2',
      type: 'Receive',
      amount: '+1,250.00 ETH',
      asset: 'ETH',
      txHash: '0x4a1c902b5e7d1a3c...3b21',
      from: 'Coinbase Prime',
      to: 'Hot Wallet 1',
      status: 'Completed',
      time: '15m ago',
      isPositive: true
    },
    {
      id: 'tx-3',
      type: 'Transfer',
      amount: '-50,000.00 USDC',
      asset: 'USDC',
      txHash: '0x99dc1122aa3344bb...14ae',
      from: 'Treasury Wallet',
      to: 'Vendor Payment',
      status: 'Pending Quorum',
      time: '32m ago'
    },
    {
      id: 'tx-4',
      type: 'Receive',
      amount: '+4,500.00 SOL',
      asset: 'SOL',
      txHash: '0x71ba334c90ef221d...892c',
      from: 'Kraken Institutional',
      to: 'Staking Enclave',
      status: 'Completed',
      time: '1h ago',
      isPositive: true
    },
    {
      id: 'tx-5',
      type: 'Transfer',
      amount: '-100,000.00 USDC',
      asset: 'USDC',
      txHash: '0x55ee110099bb44aa...991f',
      from: 'Yield Reserve',
      to: 'Aave v3 Pool',
      status: 'Completed',
      time: '3h ago'
    }
  ];

  const filteredTransactions = rawTransactions.filter(tx => {
    const matchesSearch = 
      tx.txHash.toLowerCase().includes(txSearchQuery.toLowerCase()) ||
      tx.asset.toLowerCase().includes(txSearchQuery.toLowerCase()) ||
      tx.from.toLowerCase().includes(txSearchQuery.toLowerCase()) ||
      tx.to.toLowerCase().includes(txSearchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (txFilterType === 'TRANSFER') return tx.type === 'Transfer';
    if (txFilterType === 'RECEIVE') return tx.type === 'Receive';
    if (txFilterType === 'PENDING') return tx.status === 'Pending Quorum';

    return true;
  });

  return (
    <div className="vault-os-layout">
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        approvalsCount={approvalsCount}
        t={t}
      />

      {/* 2. MAIN APPLICATION WORKSPACE */}
      <div className="vault-os-main">
        {/* Top Header */}
        <TopHeader
          activeTab={activeTab}
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          currentTheme={currentTheme}
          onThemeToggle={handleThemeToggle}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          onNewTransferClick={() => setTransferModalOpen(true)}
          t={t}
        />

        {/* Dynamic Tab Body */}
        <main className="vault-os-content">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <OverviewView
              onNavigateTab={setActiveTab}
              onInitiateTransfer={() => setTransferModalOpen(true)}
              t={t}
            />
          )}

          {/* TAB 2: WALLETS & TREASURY */}
          {activeTab === 'wallets' && (
            <div className="tab-view-container">
              {/* Header Section */}
              <div className="section-header-row mb-6">
                <div>
                  <span className="section-tag-pill">SOVEREIGN ENCLAVES</span>
                  <h2 className="section-main-heading">Institutional Multi-Chain Wallets</h2>
                  <p className="section-sub-desc">Isolated HSM cryptographic enclaves across Bitcoin SegWit, Ethereum ERC-4337, and Solana</p>
                </div>
                <button 
                  onClick={() => setTransferModalOpen(true)}
                  className="btn-modal-primary flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Deposit / Transfer</span>
                </button>
              </div>

              {/* Multi-Chain Wallets Grid with Generous, Distinct Layout */}
              <div className="wallets-cards-grid">
                <div className="wallet-card-item">
                  <div className="wallet-card-header">
                    <div className="wallet-card-brand">
                      <span className="asset-tag-circle bg-amber-500 text-black font-bold">₿</span>
                      <span className="wallet-card-title">Bitcoin Treasury</span>
                    </div>
                    <span className="enclave-badge-tag emerald">SEGWIT NATIVE</span>
                  </div>
                  <div className="wallet-card-balance-block">
                    <div className="wallet-crypto-amount font-mono">890.45 BTC</div>
                    <div className="wallet-fiat-amount font-mono">$58,012,450.00 USD</div>
                  </div>
                  <div className="wallet-address-bar font-mono">
                    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                  </div>
                </div>

                <div className="wallet-card-item">
                  <div className="wallet-card-header">
                    <div className="wallet-card-brand">
                      <span className="asset-tag-circle bg-indigo-500 text-white font-bold">Ξ</span>
                      <span className="wallet-card-title">Ethereum Staking</span>
                    </div>
                    <span className="enclave-badge-tag indigo">ERC-4337</span>
                  </div>
                  <div className="wallet-card-balance-block">
                    <div className="wallet-crypto-amount font-mono">11,200.00 ETH</div>
                    <div className="wallet-fiat-amount font-mono">$32,238,450.00 USD</div>
                  </div>
                  <div className="wallet-address-bar font-mono">
                    0x71C...8491 (Lido Staking Pool)
                  </div>
                </div>

                <div className="wallet-card-item">
                  <div className="wallet-card-header">
                    <div className="wallet-card-brand">
                      <span className="asset-tag-circle bg-emerald-500 text-white font-bold">$</span>
                      <span className="wallet-card-title">USDC Liquidity</span>
                    </div>
                    <span className="enclave-badge-tag cyan">YIELD VAULT</span>
                  </div>
                  <div className="wallet-card-balance-block">
                    <div className="wallet-crypto-amount font-mono">19,648,350 USDC</div>
                    <div className="wallet-fiat-amount font-mono text-emerald-400 font-bold">4.85% Net APY Yield</div>
                  </div>
                  <div className="wallet-address-bar font-mono">
                    0x49F...E21D (Circle Institutional Account)
                  </div>
                </div>
              </div>

              {/* Treasury Liquidity Flow Chart */}
              <div className="mt-10">
                <TreasuryFlowChart t={t.treasury} />
              </div>
            </div>
          )}

          {/* TAB 3: TRANSACTIONS */}
          {activeTab === 'transactions' && (
            <div className="tab-view-container">
              {/* Header Section */}
              <div className="section-header-row mb-6">
                <div>
                  <span className="section-tag-pill">AUDITED LEDGER</span>
                  <h2 className="section-main-heading">Cryptographic Transaction Ledger</h2>
                  <p className="section-sub-desc">All transfers are cryptographically signed with 3-of-5 MPC threshold quorums</p>
                </div>

                {/* Search & Filter Toolbar */}
                <div className="tx-toolbar-container">
                  {/* Filter Pills */}
                  <div className="tx-filter-pills">
                    {(['ALL', 'TRANSFER', 'RECEIVE', 'PENDING'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setTxFilterType(f)}
                        className={`tx-filter-pill-btn ${txFilterType === f ? 'active' : ''}`}
                      >
                        {f === 'ALL' ? 'All Transactions' : f === 'TRANSFER' ? 'Transfers' : f === 'RECEIVE' ? 'Receives' : 'Pending Quorum'}
                      </button>
                    ))}
                  </div>

                  {/* Search Input Box */}
                  <div className="tx-search-box">
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <input 
                      type="text" 
                      value={txSearchQuery}
                      onChange={(e) => setTxSearchQuery(e.target.value)}
                      placeholder="Search hash, asset, address..." 
                      className="tx-search-input font-mono"
                    />
                    {txSearchQuery && (
                      <button onClick={() => setTxSearchQuery('')} className="text-slate-400 hover:text-white text-xs">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="overview-table-card">
                <div className="table-responsive-wrapper">
                  <table className="vault-os-table">
                    <thead>
                      <tr>
                        <th style={{ width: '140px' }}>Type</th>
                        <th>Amount</th>
                        <th>Asset</th>
                        <th>Tx Hash</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center py-10 text-slate-400 font-mono text-sm">
                            No transactions match your search filter "{txSearchQuery}".
                          </td>
                        </tr>
                      ) : (
                        filteredTransactions.map(tx => (
                          <tr key={tx.id}>
                            <td>
                              <div className="tx-type-cell">
                                <div className={`tx-type-icon-box ${tx.type === 'Receive' ? 'receive' : 'transfer'}`}>
                                  {tx.type === 'Receive' ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                                </div>
                                <span className={`tx-type-label ${tx.type === 'Receive' ? 'receive' : 'transfer'}`}>
                                  {tx.type}
                                </span>
                              </div>
                            </td>
                            <td className={`font-mono font-bold ${tx.type === 'Receive' ? 'text-emerald-400' : 'text-red-400'}`}>
                              {tx.amount}
                            </td>
                            <td>
                              <span className="asset-pill-tag font-bold">{tx.asset}</span>
                            </td>
                            <td className="font-mono text-xs text-indigo-400 hover:underline cursor-pointer">
                              {tx.txHash}
                            </td>
                            <td className="font-mono text-xs text-slate-400">{tx.from}</td>
                            <td className="font-mono text-xs text-slate-300">{tx.to}</td>
                            <td>
                              <span className={`status-pill ${tx.status === 'Completed' ? 'completed' : 'pending'}`}>
                                {tx.status}
                              </span>
                            </td>
                            <td className="text-xs text-slate-400 font-mono">{tx.time}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: APPROVALS */}
          {activeTab === 'approvals' && (
            <div className="tab-view-container">
              <div className="section-header-row mb-6">
                <div>
                  <span className="section-tag-pill">QUORUM SIGNING</span>
                  <h2 className="section-main-heading">Active Multi-Sig Quorum Requests</h2>
                  <p className="section-sub-desc">Threshold Multi-Party Computation signing ceremony requiring 3 of 5 enclave confirmations</p>
                </div>
              </div>

              <div className="overview-widget-card p-8 mb-8">
                <div className="widget-header mb-6 pb-4">
                  <div className="widget-title-group">
                    <span className="widget-title text-xl font-extrabold">Transfer Request #TX-481-MPC</span>
                    <span className="high-priority-tag">Quorum Action Required</span>
                  </div>
                  <span className="font-mono text-xs text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/30 px-3 py-1.5 rounded">
                    3 of 5 Shards Active
                  </span>
                </div>

                <div className="p-2">
                  <div className="transfer-request-banner mb-8 p-6">
                    <div className="transfer-amount-line font-mono text-3xl font-extrabold text-red-400">
                      -250.00 BTC <span className="text-sm text-slate-400 font-normal font-sans">($16,250,000.00 USD)</span>
                    </div>
                    <div className="transfer-route-flex mt-3 text-sm">
                      <span className="route-node font-mono">Cold Storage 1 (bc1q...7w9m)</span>
                      <span className="text-indigo-400 font-bold text-base">➔</span>
                      <span className="route-node font-mono">Binance Institutional Deposit</span>
                    </div>
                  </div>

                  <div className="signers-list mb-8 flex flex-col gap-4">
                    <div className="signer-item p-4">
                      <div className="signer-avatar">JS</div>
                      <div className="signer-info">
                        <div className="signer-name text-sm font-bold">John Smith</div>
                        <div className="signer-role text-xs text-slate-400">Chief Compliance Officer</div>
                      </div>
                      <span className="signer-status-badge approved">✓ Approved via Hardware Token</span>
                    </div>

                    <div className="signer-item p-4">
                      <div className="signer-avatar">SJ</div>
                      <div className="signer-info">
                        <div className="signer-name text-sm font-bold">Sarah Johnson</div>
                        <div className="signer-role text-xs text-slate-400">Head of Risk Management</div>
                      </div>
                      <span className="signer-status-badge approved">✓ Approved via Biometric Enclave</span>
                    </div>

                    <div className="signer-item highlight p-4">
                      <div className="signer-avatar me">MC</div>
                      <div className="signer-info">
                        <div className="signer-name text-sm font-bold">Michael Chen (You)</div>
                        <div className="signer-role text-xs text-slate-400">Treasury Manager</div>
                      </div>
                      <span className="signer-status-badge pending">● Signature Required</span>
                    </div>
                  </div>

                  {/* Clean side-by-side action buttons with generous spacing */}
                  <div className="approvals-action-row">
                    <button className="btn-widget-reject">
                      <X className="w-4 h-4" />
                      <span>Reject Request</span>
                    </button>
                    <button className="btn-widget-approve">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Approve & Sign MPC Shard</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: POLICIES */}
          {activeTab === 'policies' && (
            <div className="tab-view-container">
              <div className="section-header-row mb-6">
                <div>
                  <span className="section-tag-pill">GOVERNANCE ENGINE</span>
                  <h2 className="section-main-heading">Programmable Policy & Compliance Engine</h2>
                  <p className="section-sub-desc">Enforce corporate execution rules, velocity caps, and automated AML screenings</p>
                </div>
              </div>
              <PolicyBuilder t={t.policy} />
            </div>
          )}

          {/* TAB 6: MPC */}
          {activeTab === 'mpc' && (
            <div className="tab-view-container">
              <div className="section-header-row mb-6">
                <div>
                  <span className="section-tag-pill">CRYPTOGRAPHIC CORE</span>
                  <h2 className="section-main-heading">MPC-CMP Key Infrastructure Visualizer</h2>
                  <p className="section-sub-desc">Distributed mathematical key shard consensus with zero private key assembly</p>
                </div>
              </div>
              <MpcVisualizer t={t.mpc} />
            </div>
          )}

          {/* TAB 7: SDK */}
          {activeTab === 'sdk' && (
            <div className="tab-view-container">
              <div className="section-header-row mb-6">
                <div>
                  <span className="section-tag-pill">DEVELOPER ACCESS</span>
                  <h2 className="section-main-heading">Developer SDK & API Console</h2>
                  <p className="section-sub-desc">Automate institutional treasury movements with type-safe client libraries</p>
                </div>
              </div>
              <SdkQuickstart t={t.sdk} />
            </div>
          )}

          {/* TAB 8: COMPLIANCE */}
          {activeTab === 'compliance' && (
            <div className="tab-view-container">
              <div className="section-header-row mb-6">
                <div>
                  <span className="section-tag-pill">CERTIFICATIONS & AUDITS</span>
                  <h2 className="section-main-heading">Institutional Compliance & Security Standards</h2>
                  <p className="section-sub-desc">Engineered to satisfy the stringent requirements of sovereign wealth funds and tier-1 banks</p>
                </div>
              </div>

              <div className="overview-chart-card mb-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">Technical Security & Compliance Matrix</h3>
                  <p className="text-xs text-slate-400 font-medium">Institutional grade certification and physical tamper zeroization standards</p>
                </div>

                <div className="swiss-tech-table-card">
                  <table className="swiss-tech-table">
                    <thead>
                      <tr>
                        <th>Security Capability</th>
                        <th>Legacy Hot Wallets</th>
                        <th>Smart Contract Multi-Sig</th>
                        <th className="highlight-col">Vault Sovereign MPC-CMP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Key Generation</strong></td>
                        <td className="text-red-400"><X className="inline w-3.5 h-3.5 mr-1" /> Single Machine Memory</td>
                        <td>On-Chain Contract</td>
                        <td className="highlight-col text-emerald-400 font-bold"><Check className="inline w-3.5 h-3.5 mr-1" /> Never Assembled (3/5 Shards)</td>
                      </tr>
                      <tr>
                        <td><strong>Signing Latency (p99)</strong></td>
                        <td>250 ms</td>
                        <td>15,000 ms (Gas Dependent)</td>
                        <td className="highlight-col text-emerald-400 font-bold"><Check className="inline w-3.5 h-3.5 mr-1" /> 14.2 ms (Sub-Millisecond)</td>
                      </tr>
                      <tr>
                        <td><strong>Hardware Protection</strong></td>
                        <td>None / Software</td>
                        <td>None</td>
                        <td className="highlight-col text-emerald-400 font-bold"><Check className="inline w-3.5 h-3.5 mr-1" /> FIPS 140-2 Level 3 HSM</td>
                      </tr>
                      <tr>
                        <td><strong>Specie Insurance</strong></td>
                        <td>Optional</td>
                        <td>None</td>
                        <td className="highlight-col text-emerald-400 font-bold"><Check className="inline w-3.5 h-3.5 mr-1" /> $250M Lloyd's of London</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="compliance-grid">
                <div className="compliance-cell">
                  <div className="compliance-badge-icon">
                    <Award className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="compliance-cell-title">FIPS 140-2 Level 3</h4>
                  <p className="compliance-cell-desc">Tamper-evident physical cryptographic coprocessor protection.</p>
                </div>
                <div className="compliance-cell">
                  <div className="compliance-badge-icon">
                    <FileCheck2 className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h4 className="compliance-cell-title">SOC 2 Type II Certified</h4>
                  <p className="compliance-cell-desc">Annual third-party audit of all security enclaves by Big 4 firm.</p>
                </div>
                <div className="compliance-cell">
                  <div className="compliance-badge-icon">
                    <ShieldCheck className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="compliance-cell-title">ISO 27001 & ISO 27701</h4>
                  <p className="compliance-cell-desc">International standards for enterprise data privacy & security.</p>
                </div>
                <div className="compliance-cell">
                  <div className="compliance-badge-icon">
                    <Building2 className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h4 className="compliance-cell-title">CCSS Level 3 Certified</h4>
                  <p className="compliance-cell-desc">Highest level of Cryptocurrency Security Standard architecture.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: PRICING */}
          {activeTab === 'pricing' && (
            <div className="tab-view-container">
              <PricingSection t={t.pricing} onSelectPlan={() => setTransferModalOpen(true)} />
            </div>
          )}

          {/* TAB 10: FAQ */}
          {activeTab === 'faq' && (
            <div className="tab-view-container">
              <FaqSection t={t.faq} />
            </div>
          )}
        </main>
      </div>

      {/* 3. INTERACTIVE TRANSFER MODAL */}
      <NewTransferModal
        isOpen={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
      />
    </div>
  );
}
