import React from 'react';
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CheckSquare,
  Sliders,
  Key,
  Terminal,
  ShieldCheck,
  CreditCard,
  HelpCircle,
  Lock,
  ChevronRight
} from 'lucide-react';

export type DashboardTab = 
  | 'overview' 
  | 'wallets' 
  | 'transactions' 
  | 'approvals' 
  | 'policies' 
  | 'mpc' 
  | 'sdk' 
  | 'compliance' 
  | 'pricing' 
  | 'faq';

interface SidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  approvalsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  approvalsCount
}) => {
  const menuItems: Array<{ id: DashboardTab; label: string; icon: React.ElementType; badge?: string | number }> = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'wallets', label: 'Wallets & Treasury', icon: Wallet },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'approvals', label: 'Approvals', icon: CheckSquare, badge: approvalsCount },
    { id: 'policies', label: 'Policy Engine', icon: Sliders },
    { id: 'mpc', label: 'MPC Key Shards', icon: Key },
    { id: 'sdk', label: 'Developer SDK', icon: Terminal },
    { id: 'compliance', label: 'Compliance & HSM', icon: ShieldCheck },
    { id: 'pricing', label: 'Pricing & Tiers', icon: CreditCard },
    { id: 'faq', label: 'Knowledge Base', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="sidebar-mobile-backdrop"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`vault-sidebar ${isOpenMobile ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo-box">
            <Lock className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="brand-text-group">
            <span className="brand-title">VAULT<span className="text-indigo-400">.</span></span>
            <span className="brand-subtitle">INSTITUTIONAL CUSTODY</span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">PLATFORM</div>
          {menuItems.slice(0, 6).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && Number(item.badge) > 0 && (
                  <span className="nav-item-badge">{item.badge}</span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-400 nav-active-arrow" />}
              </button>
            );
          })}

          <div className="nav-section-label mt-4">INFRASTRUCTURE</div>
          {menuItems.slice(6).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-item-left">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-400 nav-active-arrow" />}
              </button>
            );
          })}
        </nav>

        {/* User Account / Institution Footer */}
        <div className="sidebar-profile-card">
          <div className="profile-avatar">
            <span className="avatar-initials">SF</span>
            <span className="avatar-status-dot"></span>
          </div>
          <div className="profile-info">
            <div className="profile-name">Sovereign Treasury</div>
            <div className="profile-tier">Tier-1 Enclave Node</div>
          </div>
        </div>
      </aside>
    </>
  );
};
