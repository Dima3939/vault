import React, { useState } from 'react';
import { Check, Shield, Zap, Building } from 'lucide-react';

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
    <section className="vault-section" id="pricing">
      <div className="section-header">
        <span className="section-tag">{t.tag}</span>
        <h2 className="section-title">{t.title}</h2>
        <p className="section-desc">{t.desc}</p>

        {/* Segmented Monthly / Annual Switch */}
        <div className="segmented-switch-wrapper">
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
      </div>

      <div className="pricing-cards-grid">
        {/* Tier 1: Developer Sandbox */}
        <div className="pricing-card">
          <div className="pricing-card-header">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">{t.tier1Title}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-2 min-h-[36px]">{t.tier1Desc}</p>
          </div>

          <div className="pricing-price-box my-6">
            <span className="price-val font-mono font-extrabold text-4xl text-white">$0</span>
            <span className="price-period text-slate-400 text-xs ml-1">{t.period}</span>
          </div>

          <ul className="pricing-feature-list">
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Full MPC Testnet Signing API</li>
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Up to 5 Warm Wallet Enclaves</li>
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Standard 3-of-5 ECDSA Quorums</li>
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Community Developer Discord</li>
          </ul>

          <button
            onClick={() => onSelectPlan('Developer Sandbox ($0/mo)')}
            className="vault-btn-secondary w-full mt-6"
          >
            {t.tier1Btn}
          </button>
        </div>

        {/* Tier 2: Growth Treasury (Featured) */}
        <div className="pricing-card featured">
          <div className="featured-ribbon">{t.tier2Popular}</div>
          <div className="pricing-card-header">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">{t.tier2Title}</h3>
            </div>
            <p className="text-xs text-slate-300 mt-2 min-h-[36px]">{t.tier2Desc}</p>
          </div>

          <div className="pricing-price-box my-6">
            <span className="price-val font-mono font-extrabold text-4xl text-white">
              {isAnnual ? '$1,590' : '$1,990'}
            </span>
            <span className="price-period text-slate-400 text-xs ml-1">{t.period}</span>
          </div>

          <ul className="pricing-feature-list">
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> <strong>Up to $50M AUM</strong> Protected</li>
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Dedicated Cloud Nitro Enclaves</li>
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Automated AML / TRM Labs Screening</li>
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Sub-15ms Multi-Cloud Consensus</li>
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Priority 24/7 Slack War-Room</li>
          </ul>

          <button
            onClick={() => onSelectPlan(`Growth Treasury (${isAnnual ? '$1,590/mo' : '$1,990/mo'})`)}
            className="vault-btn-primary w-full mt-6"
          >
            {t.tier2Btn}
          </button>
        </div>

        {/* Tier 3: Sovereign Enterprise */}
        <div className="pricing-card">
          <div className="pricing-card-header">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">{t.tier3Title}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-2 min-h-[36px]">{t.tier3Desc}</p>
          </div>

          <div className="pricing-price-box my-6">
            <span className="price-val font-mono font-extrabold text-4xl text-white">Custom</span>
            <span className="price-period text-slate-400 text-xs ml-1">Sovereign AUM</span>
          </div>

          <ul className="pricing-feature-list">
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> <strong>Unlimited Multi-Billion AUM</strong></li>
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Dedicated FIPS 140-2 Level 3 HSMs</li>
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Self-Hosted GovCloud VPC Deployment</li>
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> $250M Lloyd's of London Crime Policy</li>
            <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Dedicated Security Officer & SLA</li>
          </ul>

          <button
            onClick={() => onSelectPlan('Sovereign Enterprise Custom')}
            className="vault-btn-secondary w-full mt-6"
          >
            {t.tier3Btn}
          </button>
        </div>
      </div>
    </section>
  );
};
