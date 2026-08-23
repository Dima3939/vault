import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Globe, 
  Sun, 
  Moon, 
  Plus, 
  Menu, 
  ChevronDown, 
  Check, 
  Radio,
  Shield
} from 'lucide-react';
import { LanguageCode, supportedLanguages } from '../i18n';
import { DashboardTab } from './Sidebar';

interface TopHeaderProps {
  activeTab: DashboardTab;
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  currentTheme: 'dark' | 'light';
  onThemeToggle: () => void;
  onOpenMobileMenu: () => void;
  onNewTransferClick: () => void;
  t: any;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  currentLang,
  onLanguageChange,
  currentTheme,
  onThemeToggle,
  onOpenMobileMenu,
  onNewTransferClick,
  t
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);

  const headerT = t?.os?.header || {};
  const sidebarT = t?.os?.sidebar || {};

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabTitles: Record<DashboardTab, { title: string; subtitle: string }> = {
    overview: {
      title: sidebarT.overview || 'Overview',
      subtitle: 'Real-time summary of your digital asset treasury & enclave operations'
    },
    wallets: {
      title: sidebarT.wallets || 'Wallets & Treasury',
      subtitle: 'Multi-chain liquidity routing and segregated cold storage enclaves'
    },
    transactions: {
      title: sidebarT.transactions || 'Transactions',
      subtitle: 'Audited cryptographic ledger of institutional fund movements'
    },
    approvals: {
      title: sidebarT.approvals || 'Pending Approvals',
      subtitle: 'Multi-Party Computation (MPC-CMP) 3-of-5 threshold quorum requests'
    },
    policies: {
      title: sidebarT.policies || 'Policy Engine',
      subtitle: 'Rule-based execution guards, velocity controls, and whitelists'
    },
    mpc: {
      title: sidebarT.mpc || 'MPC Key Infrastructure',
      subtitle: 'Geodistributed mathematical key shard topology and signing ceremony'
    },
    sdk: {
      title: sidebarT.sdk || 'Developer SDK',
      subtitle: 'Type-safe multi-language APIs and RPC endpoints for treasury automation'
    },
    compliance: {
      title: sidebarT.compliance || 'Compliance & HSM',
      subtitle: 'FIPS 140-2 Level 3, SOC 2 Type II, and multi-cloud enclaves'
    },
    pricing: {
      title: sidebarT.pricing || 'Pricing & Tiers',
      subtitle: 'Institutional custody tiers and asset under management billing'
    },
    faq: {
      title: sidebarT.faq || 'Knowledge Base',
      subtitle: 'Deep cryptographic architecture, security guarantees and operations'
    }
  };

  const currentMeta = tabTitles[activeTab] || tabTitles.overview;
  const currentLangObj = supportedLanguages.find(l => l.code === currentLang) || supportedLanguages[0];

  return (
    <header className="vault-top-header">
      <div className="header-left">
        <button 
          onClick={onOpenMobileMenu} 
          className="header-mobile-toggle"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5 text-slate-300" />
        </button>

        {/* Mobile Brand Title (Always compact on mobile) */}
        <div className="header-mobile-brand sm:hidden">
          <div className="w-5 h-5 rounded bg-indigo-500/20 border border-indigo-500 flex items-center justify-center">
            <Shield className="w-3 h-3 text-indigo-400" />
          </div>
          <span className="font-mono font-extrabold text-sm text-white tracking-wider">VAULT.</span>
        </div>

        {/* Desktop Title & Subtitle */}
        <div className="header-title-box hidden sm:flex">
          <h1 className="header-main-title">{currentMeta.title}</h1>
          <p className="header-sub-title">{currentMeta.subtitle}</p>
        </div>
      </div>

      <div className="header-right">
        {/* Enclave Status Pill (Only on Desktop) */}
        <div className="enclave-status-indicator hidden lg:flex">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-emerald-400 font-semibold">{headerT.secureEnv || 'Secure Environment'}</span>
        </div>

        {/* Notifications (Hidden on mobile to save space) */}
        <div className="relative header-notif-wrapper hidden md:block" ref={notifRef}>
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="header-action-icon-btn"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="notif-badge-dot"></span>
          </button>

          {notificationsOpen && (
            <div className="header-notif-dropdown">
              <div className="notif-dropdown-header">
                <span className="font-bold text-xs">{headerT.notifications || 'Security Notifications'}</span>
                <span className="text-[10px] text-emerald-400 font-mono">{headerT.allEnclavesOk || 'ALL ENCLAVES OK'}</span>
              </div>
              <div className="notif-list">
                <div className="notif-item unread">
                  <div className="notif-dot"></div>
                  <div className="notif-content">
                    <p className="notif-title">Quorum Signing Requested</p>
                    <p className="notif-desc">Transfer -250.00 BTC requires your signature</p>
                    <span className="notif-time">2 min ago</span>
                  </div>
                </div>
                <div className="notif-item">
                  <div className="notif-dot gray"></div>
                  <div className="notif-content">
                    <p className="notif-title">Zurich Shard Refreshed</p>
                    <p className="notif-desc">Ephemeral memory zeroized successfully</p>
                    <span className="notif-time">14 min ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Language Dropdown */}
        <div className="relative" ref={langRef}>
          <button 
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="header-lang-btn"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="font-mono text-xs font-bold">{currentLangObj.badge}</span>
            <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {langDropdownOpen && (
            <div className="header-lang-dropdown">
              <div className="lang-menu-title">
                {t.nav?.langTitle || 'Language'}
              </div>
              {supportedLanguages.map(l => (
                <button
                  key={l.code}
                  onClick={() => {
                    onLanguageChange(l.code);
                    setLangDropdownOpen(false);
                  }}
                  className={`lang-option-row ${currentLang === l.code ? 'active' : ''}`}
                >
                  <span className="text-xs font-medium">{l.name}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-1 py-0.5 rounded">{l.badge}</span>
                    {currentLang === l.code && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={onThemeToggle}
          className="header-action-icon-btn"
          title="Toggle Theme"
        >
          {currentTheme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-slate-700" />
          )}
        </button>

        {/* New Transfer Button: Icon-only on mobile, icon+text on desktop */}
        <button 
          onClick={onNewTransferClick}
          className="header-cta-btn"
          title={headerT.newTransfer || 'New Transfer'}
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span className="cta-btn-text">{headerT.newTransfer || 'New Transfer'}</span>
        </button>
      </div>
    </header>
  );
};
