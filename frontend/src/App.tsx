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
  Filter,
  Plus,
  ShieldCheck
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [approvalsCount] = useState(7);

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
              <div className="wallets-header-bar flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Institutional Multi-Chain Wallets</h2>
                  <p className="text-xs text-slate-400">Isolated HSM enclaves across Bitcoin, Ethereum, Solana, and ERC-4337</p>
                </div>
                <button 
                  onClick={() => setTransferModalOpen(true)}
                  className="btn-modal-primary flex items-center gap-1.5 text-xs py-2 px-4"
                >
                  <Plus className="w-4 h-4" />
                  <span>Deposit / Transfer</span>
                </button>
              </div>

              {/* Multi-Chain Wallets Grid */}
              <div className="wallets-cards-grid grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="wallet-card-item">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <span className="asset-tag-circle bg-amber-500 text-black">₿</span>
                      <span className="font-bold text-sm text-white">Bitcoin Treasury</span>
                    </div>
                    <span className="enclave-badge-mini">SEGWIT NATIVE</span>
                  </div>
                  <div className="font-mono text-2xl font-extrabold text-white mb-1">890.45 BTC</div>
                  <div className="font-mono text-xs text-slate-400 mb-4">$58,012,450 USD</div>
                  <div className="wallet-address-bar font-mono text-[11px] text-slate-300 bg-black/40 p-2 rounded border border-white/5 truncate">
                    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                  </div>
                </div>

                <div className="wallet-card-item">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <span className="asset-tag-circle bg-indigo-500 text-white">Ξ</span>
                      <span className="font-bold text-sm text-white">Ethereum Staking</span>
                    </div>
                    <span className="enclave-badge-mini">ERC-4337</span>
                  </div>
                  <div className="font-mono text-2xl font-extrabold text-white mb-1">11,200.00 ETH</div>
                  <div className="font-mono text-xs text-slate-400 mb-4">$32,238,450 USD</div>
                  <div className="wallet-address-bar font-mono text-[11px] text-slate-300 bg-black/40 p-2 rounded border border-white/5 truncate">
                    0x71C...8491 (Lido Staking Pool)
                  </div>
                </div>

                <div className="wallet-card-item">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <span className="asset-tag-circle bg-emerald-500 text-white">$</span>
                      <span className="font-bold text-sm text-white">USDC Liquidity</span>
                    </div>
                    <span className="enclave-badge-mini">YIELD VAULT</span>
                  </div>
                  <div className="font-mono text-2xl font-extrabold text-white mb-1">19,648,350 USDC</div>
                  <div className="font-mono text-xs text-emerald-400 mb-4">4.85% Net APY Yield</div>
                  <div className="wallet-address-bar font-mono text-[11px] text-slate-300 bg-black/40 p-2 rounded border border-white/5 truncate">
                    0x49F...E21D (Circle Institutional Account)
                  </div>
                </div>
              </div>

              {/* Treasury Liquidity Flow Chart */}
              <TreasuryFlowChart t={t.treasury} />
            </div>
          )}

          {/* TAB 3: TRANSACTIONS */}
          {activeTab === 'transactions' && (
            <div className="tab-view-container">
              <div className="transactions-header-bar flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Cryptographic Transaction Ledger</h2>
                  <p className="text-xs text-slate-400">All transfers are cryptographically signed with 3-of-5 MPC threshold quorums</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="tx-search-box">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search tx hash, address, or asset..." 
                      className="tx-search-input font-mono text-xs"
                    />
                  </div>
                  <button className="btn-filter-icon">
                    <Filter className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>

              <div className="overview-table-card">
                <div className="table-responsive-wrapper">
                  <table className="vault-os-table">
                    <thead>
                      <tr>
                        <th>Type</th>
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
                      <tr>
                        <td>
                          <div className="flex items-center gap-1.5 text-red-400 font-medium">
                            <ArrowUpRight className="w-4 h-4" />
                            <span>Transfer</span>
                          </div>
                        </td>
                        <td className="font-mono font-bold text-red-400">-250.00 BTC</td>
                        <td><span className="asset-pill-tag font-bold">BTC</span></td>
                        <td className="font-mono text-xs text-indigo-400">0x8f3a9b...7d0e</td>
                        <td className="font-mono text-xs text-slate-400">Cold Storage 1</td>
                        <td className="font-mono text-xs text-slate-300">Binance Deposit</td>
                        <td><span className="status-pill completed">Completed</span></td>
                        <td className="text-xs text-slate-400">2m ago</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                            <ArrowDownLeft className="w-4 h-4" />
                            <span>Receive</span>
                          </div>
                        </td>
                        <td className="font-mono font-bold text-emerald-400">+1,250.00 ETH</td>
                        <td><span className="asset-pill-tag font-bold">ETH</span></td>
                        <td className="font-mono text-xs text-indigo-400">0x4a1c90...3b21</td>
                        <td className="font-mono text-xs text-slate-400">Coinbase Prime</td>
                        <td className="font-mono text-xs text-slate-300">Hot Wallet 1</td>
                        <td><span className="status-pill completed">Completed</span></td>
                        <td className="text-xs text-slate-400">15m ago</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                            <ArrowUpRight className="w-4 h-4" />
                            <span>Transfer</span>
                          </div>
                        </td>
                        <td className="font-mono font-bold text-amber-400">-50,000.00 USDC</td>
                        <td><span className="asset-pill-tag font-bold">USDC</span></td>
                        <td className="font-mono text-xs text-indigo-400">0x99dc11...14ae</td>
                        <td className="font-mono text-xs text-slate-400">Treasury Wallet</td>
                        <td className="font-mono text-xs text-slate-300">Vendor Payment</td>
                        <td><span className="status-pill pending">Pending Quorum</span></td>
                        <td className="text-xs text-slate-400">32m ago</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: APPROVALS */}
          {activeTab === 'approvals' && (
            <div className="tab-view-container">
              <div className="max-w-4xl mx-auto">
                <div className="overview-widget-card mb-8">
                  <div className="widget-header">
                    <div className="widget-title-group">
                      <span className="widget-title text-lg">Active Multi-Sig Quorum Requests</span>
                      <span className="high-priority-tag">Action Required</span>
                    </div>
                    <span className="font-mono text-xs text-indigo-400 font-bold">3 of 5 Shards Active</span>
                  </div>

                  <div className="p-6">
                    <div className="transfer-request-banner mb-6">
                      <div className="transfer-amount-line font-mono text-xl font-extrabold text-white">
                        -250.00 BTC <span className="text-sm text-slate-400 font-normal">($16,250,000.00 USD)</span>
                      </div>
                      <div className="transfer-route-flex mt-2">
                        <span className="route-node font-mono">Cold Storage 1 (bc1q...7w9m)</span>
                        <span className="text-indigo-400 font-bold">➔</span>
                        <span className="route-node font-mono">Binance Institutional Deposit</span>
                      </div>
                    </div>

                    <div className="signers-list mb-6">
                      <div className="signer-item">
                        <div className="signer-avatar">JS</div>
                        <div className="signer-info">
                          <div className="signer-name font-bold">John Smith</div>
                          <div className="signer-role text-xs text-slate-400">Chief Compliance Officer</div>
                        </div>
                        <span className="signer-status-badge approved">✓ Approved via Hardware Token</span>
                      </div>

                      <div className="signer-item">
                        <div className="signer-avatar">SJ</div>
                        <div className="signer-info">
                          <div className="signer-name font-bold">Sarah Johnson</div>
                          <div className="signer-role text-xs text-slate-400">Head of Risk Management</div>
                        </div>
                        <span className="signer-status-badge approved">✓ Approved via Biometric Enclave</span>
                      </div>

                      <div className="signer-item highlight">
                        <div className="signer-avatar me">MC</div>
                        <div className="signer-info">
                          <div className="signer-name font-bold">Michael Chen (You)</div>
                          <div className="signer-role text-xs text-slate-400">Treasury Manager</div>
                        </div>
                        <span className="signer-status-badge pending">● Signature Required</span>
                      </div>
                    </div>

                    <div className="flex gap-4 justify-end">
                      <button className="btn-widget-reject py-3 px-6 text-sm">
                        <X className="w-4 h-4" />
                        <span>Reject Request</span>
                      </button>
                      <button className="btn-widget-approve py-3 px-8 text-sm">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Approve & Sign MPC Shard</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: POLICIES */}
          {activeTab === 'policies' && (
            <div className="tab-view-container max-w-4xl mx-auto">
              <PolicyBuilder t={t.policy} />
            </div>
          )}

          {/* TAB 6: MPC */}
          {activeTab === 'mpc' && (
            <div className="tab-view-container max-w-4xl mx-auto">
              <MpcVisualizer t={t.mpc} />
            </div>
          )}

          {/* TAB 7: SDK */}
          {activeTab === 'sdk' && (
            <div className="tab-view-container max-w-4xl mx-auto">
              <SdkQuickstart t={t.sdk} />
            </div>
          )}

          {/* TAB 8: COMPLIANCE */}
          {activeTab === 'compliance' && (
            <div className="tab-view-container max-w-4xl mx-auto">
              <div className="overview-chart-card mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Technical Security & Compliance Matrix</h3>
                <p className="text-xs text-slate-400 mb-6">Institutional grade certification and physical tamper zeroization standards</p>

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
                        <td className="text-red-400"><X className="inline w-3.5 h-3.5" /> Single Machine Memory</td>
                        <td>On-Chain Contract</td>
                        <td className="highlight-col text-emerald-400 font-bold"><Check className="inline w-3.5 h-3.5" /> Never Assembled (3/5 Shards)</td>
                      </tr>
                      <tr>
                        <td><strong>Signing Latency (p99)</strong></td>
                        <td>250 ms</td>
                        <td>15,000 ms (Gas Dependent)</td>
                        <td className="highlight-col text-emerald-400 font-bold"><Check className="inline w-3.5 h-3.5" /> 14.2 ms (Sub-Millisecond)</td>
                      </tr>
                      <tr>
                        <td><strong>Hardware Protection</strong></td>
                        <td>None / Software</td>
                        <td>None</td>
                        <td className="highlight-col text-emerald-400 font-bold"><Check className="inline w-3.5 h-3.5" /> FIPS 140-2 Level 3 HSM</td>
                      </tr>
                      <tr>
                        <td><strong>Specie Insurance</strong></td>
                        <td>Optional</td>
                        <td>None</td>
                        <td className="highlight-col text-emerald-400 font-bold"><Check className="inline w-3.5 h-3.5" /> $250M Lloyd's of London</td>
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
            <div className="tab-view-container max-w-4xl mx-auto">
              <PricingSection t={t.pricing} onSelectPlan={() => setTransferModalOpen(true)} />
            </div>
          )}

          {/* TAB 10: FAQ */}
          {activeTab === 'faq' && (
            <div className="tab-view-container max-w-4xl mx-auto">
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
