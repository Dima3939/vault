import React, { useState, useEffect, useRef } from 'react';
import { Shield, Sun, Moon, Globe, ChevronDown, Check, Menu, X } from 'lucide-react';
import { LanguageCode, supportedLanguages } from '../i18n';

interface NavbarProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  currentTheme: 'dark' | 'light';
  onThemeToggle: () => void;
  t: {
    features: string;
    mpcSim: string;
    treasury: string;
    developers: string;
    compliance: string;
    pricing: string;
    faq: string;
    launchApp: string;
    requestAccess: string;
  };
  onRequestAccess: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currentTheme,
  onThemeToggle,
  t,
  onRequestAccess
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement | null>(null);

  const currentLangMeta = supportedLanguages.find(l => l.code === currentLang) || supportedLanguages[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <header className="vault-header">
      <div className="vault-header-inner">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group text-decoration-none">
            <div className="vault-logo-shield">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="vault-brand-text">
              VAULT<span className="text-emerald-400">.</span>
            </span>
          </a>
          <span className="vault-header-version-pill hidden md:inline-flex">
            <span className="pulse-dot"></span> v3.8 MPC-CMP
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <a href="#features" className="vault-nav-link">{t.features}</a>
          <a href="#mpc-simulator" className="vault-nav-link">{t.mpcSim}</a>
          <a href="#treasury-flow" className="vault-nav-link">{t.treasury}</a>
          <a href="#developers" className="vault-nav-link">{t.developers}</a>
          <a href="#compliance" className="vault-nav-link">{t.compliance}</a>
          <a href="#pricing" className="vault-nav-link">{t.pricing}</a>
          <a href="#faq" className="vault-nav-link">{t.faq}</a>
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5">
          {/* 6-Language Dropdown Picker */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="vault-lang-btn"
              title="Select Language"
              aria-expanded={langMenuOpen}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono font-bold text-xs">{currentLangMeta.badge}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="vault-lang-dropdown-menu">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/5 mb-1">
                  Select Language
                </div>
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`vault-lang-item ${lang.code === currentLang ? 'active' : ''}`}
                  >
                    <span className="text-xs font-medium">{lang.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="vault-lang-code-tag">{lang.badge}</span>
                      {lang.code === currentLang && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onThemeToggle}
            className="vault-theme-btn"
            title="Toggle Light/Dark Theme"
          >
            {currentTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Request Sovereign Vault CTA */}
          <button
            onClick={onRequestAccess}
            className="vault-btn-header-primary hidden sm:inline-flex"
          >
            {t.requestAccess}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="vault-mobile-menu-btn lg:hidden"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="vault-mobile-drawer lg:hidden">
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.features}</a>
          <a href="#mpc-simulator" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.mpcSim}</a>
          <a href="#treasury-flow" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.treasury}</a>
          <a href="#developers" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.developers}</a>
          <a href="#compliance" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.compliance}</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.pricing}</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.faq}</a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onRequestAccess();
            }}
            className="vault-btn-primary w-full mt-3"
          >
            {t.requestAccess}
          </button>
        </div>
      )}
    </header>
  );
};
