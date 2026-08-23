import React, { useState } from 'react';
import { Check, Shield, Zap, Building2 } from 'lucide-react';

interface PricingSectionProps {
  t: {
    tag: string;
    title: string;
    desc: string;
    monthly: string;
    annual: string;
    saveBadge: string;
    period: string;
    tier1Title: string;
    tier1Desc: string;
    tier1Btn: string;
    tier2Title: string;
    tier2Desc: string;
    tier2Popular: string;
    tier2Btn: string;
    tier3Title: string;
    tier3Desc: string;
    tier3Btn: string;
  };
  onSelectPlan: (plan: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ t, onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="pricing-section-wrapper">
      <div className="section-header-row mb-6">
        <div>
          <span className="section-tag-pill">{t.tag}</span>
          <h2 className="section-main-heading">{t.title}</h2>
          <p className="section-sub-desc">{t.desc}</p>
        </div>
      </div>

      {/* Segmented Monthly / Annual Switch with Guaranteed 60px Margin */}
      <div className="segmented-switch-wrapper" style={{ marginTop: '1.5rem', marginBottom: '4.5rem' }}>
        <div className="segmented-switch-container">
          <button
            onClick={() => setIsAnnual(false)}
            className={`switch-segment ${!isAnnual ? 'active' : ''}`}
          >
            {t.monthly}
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`switch-segment ${isAnnual ? 'active' : ''}`}
          >
            <span>{t.annual}</span>
            <span className="discount-tag">{t.saveBadge}</span>
          </button>
        </div>
      </div>

      <div className="pricing-cards-grid" style={{ marginTop: '1.5rem' }}>
        {/* Tier 1: Developer Sandbox */}
        <div className="pricing-card">
          <div className="pricing-card-top">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-slate-400" />
              <h3 className="pricing-card-title">{t.tier1Title}</h3>
            </div>
            <p className="pricing-card-desc">{t.tier1Desc}</p>
            <div className="pricing-price-box">
              <span className="price-val">$0</span>
              <span className="price-period">{t.period}</span>
            </div>
            <ul className="pricing-feature-list">
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Up to 5 MPC Key Shards</li>
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Testnet Multi-Chain Routing</li>
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Basic REST API Access</li>
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Community Discord Support</li>
            </ul>
          </div>
          <div className="pricing-card-footer">
            <button onClick={() => onSelectPlan('sandbox')} className="vault-btn-secondary pricing-action-btn">
              {t.tier1Btn}
            </button>
          </div>
        </div>

        {/* Tier 2: Growth Treasury (Featured) */}
        <div className="pricing-card featured">
          <div className="featured-ribbon">{t.tier2Popular}</div>
          <div className="pricing-card-top">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-indigo-400" />
              <h3 className="pricing-card-title">{t.tier2Title}</h3>
            </div>
            <p className="pricing-card-desc">{t.tier2Desc}</p>
            <div className="pricing-price-box">
              <span className="price-val font-mono">{isAnnual ? '$1,990' : '$2,490'}</span>
              <span className="price-period">{t.period}</span>
            </div>
            <ul className="pricing-feature-list">
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> 3-of-5 MPC Quorum Enforcement</li>
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Multi-Cloud AWS/GCP Enclaves</li>
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Automated Policy & Velocity Limits</li>
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> $50M AUM Specie Coverage</li>
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> 24/7 Dedicated Telegram Desk</li>
            </ul>
          </div>
          <div className="pricing-card-footer">
            <button onClick={() => onSelectPlan('growth')} className="vault-btn-primary pricing-action-btn">
              {t.tier2Btn}
            </button>
          </div>
        </div>

        {/* Tier 3: Sovereign Enterprise */}
        <div className="pricing-card">
          <div className="pricing-card-top">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-5 h-5 text-slate-300" />
              <h3 className="pricing-card-title">{t.tier3Title}</h3>
            </div>
            <p className="pricing-card-desc">{t.tier3Desc}</p>
            <div className="pricing-price-box">
              <span className="price-val font-mono">Custom</span>
              <span className="price-period">/ tailored AUM</span>
            </div>
            <ul className="pricing-feature-list">
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Unlimited AUM & Multi-Tenancy</li>
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Dedicated FIPS 140-2 Level 3 HSMs</li>
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Custom Terraform GovCloud VPC</li>
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> $250M Lloyd's of London Underwriting</li>
              <li><Check className="w-4 h-4 text-indigo-400 shrink-0" /> 1-Hour SLA Security Incident Response</li>
            </ul>
          </div>
          <div className="pricing-card-footer">
            <button onClick={() => onSelectPlan('enterprise')} className="vault-btn-secondary pricing-action-btn">
              {t.tier3Btn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
