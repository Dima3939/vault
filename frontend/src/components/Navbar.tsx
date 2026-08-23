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
        <div className="vault-brand-group">
          <a href="#" className="vault-brand-link">
            <div className="vault-logo-shield">
              <Shield className="vault-logo-icon" />
            </div>
            <span className="vault-brand-text">
              VAULT<span className="vault-brand-dot">.</span>
            </span>
          </a>
          <span className="vault-header-version-pill">
            <span className="pulse-dot"></span> v3.8 MPC-CMP
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="vault-desktop-nav">
          <a href="#features" className="vault-nav-link">{t.features}</a>
          <a href="#mpc-simulator" className="vault-nav-link">{t.mpcSim}</a>
          <a href="#treasury-flow" className="vault-nav-link">{t.treasury}</a>
          <a href="#developers" className="vault-nav-link">{t.developers}</a>
          <a href="#compliance" className="vault-nav-link">{t.compliance}</a>
          <a href="#pricing" className="vault-nav-link">{t.pricing}</a>
          <a href="#faq" className="vault-nav-link">{t.faq}</a>
        </nav>

        {/* Header Actions */}
        <div className="vault-header-actions">
          {/* 6-Language Dropdown Picker */}
          <div className="vault-lang-wrapper" ref={langDropdownRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLangMenuOpen(!langMenuOpen);
              }}
              className="vault-lang-btn"
              title="Select Language"
              aria-expanded={langMenuOpen}
            >
              <Globe className="vault-globe-icon" />
              <span className="vault-lang-code">{currentLangMeta.badge}</span>
              <ChevronDown className={`vault-chevron ${langMenuOpen ? 'open' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="vault-lang-dropdown-menu">
                <div className="vault-lang-menu-title">
                  Language / Мова / Sprache
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
                    <span className="vault-lang-item-name">{lang.name}</span>
                    <div className="vault-lang-item-right">
                      <span className="vault-lang-code-tag">{lang.badge}</span>
                      {lang.code === currentLang && <Check className="vault-check-icon" />}
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
            {currentTheme === 'dark' ? <Sun className="vault-theme-icon sun" /> : <Moon className="vault-theme-icon moon" />}
          </button>

          {/* Request Sovereign Vault CTA */}
          <button
            onClick={onRequestAccess}
            className="vault-btn-header-primary"
          >
            {t.requestAccess}
          </button>

          {/* Mobile Menu Trigger (Only on small screens) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="vault-mobile-toggle-btn"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="vault-mobile-drawer">
          <div className="vault-mobile-links-grid">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.features}</a>
            <a href="#mpc-simulator" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.mpcSim}</a>
            <a href="#treasury-flow" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.treasury}</a>
            <a href="#developers" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.developers}</a>
            <a href="#compliance" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.compliance}</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.pricing}</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="vault-mobile-link">{t.faq}</a>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onRequestAccess();
            }}
            className="vault-btn-primary w-full mt-4"
          >
            {t.requestAccess}
          </button>
        </div>
      )}
    </header>
  );
};
