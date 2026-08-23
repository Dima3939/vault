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
          <div className="pricing-card-top">
            <div className="pricing-card-header">
              <div className="panel-title-group">
                <Zap className="panel-header-icon text-emerald-400" />
                <h3 className="pricing-card-title">{t.tier1Title}</h3>
              </div>
              <p className="pricing-card-desc">{t.tier1Desc}</p>
            </div>

            <div className="pricing-price-box">
              <span className="price-val">$0</span>
              <span className="price-period">{t.period}</span>
            </div>

            <ul className="pricing-feature-list">
              <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Full MPC Testnet Signing API</li>
              <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Up to 5 Warm Wallet Enclaves</li>
              <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Standard 3-of-5 ECDSA Quorums</li>
              <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Community Developer Discord</li>
            </ul>
          </div>

          <div className="pricing-card-footer">
            <button
              onClick={() => onSelectPlan('Developer Sandbox ($0/mo)')}
              className="vault-btn-secondary pricing-action-btn"
            >
              {t.tier1Btn}
            </button>
          </div>
        </div>

        {/* Tier 2: Growth Treasury (Featured) */}
        <div className="pricing-card featured">
          <div className="featured-ribbon">{t.tier2Popular}</div>
          <div className="pricing-card-top">
            <div className="pricing-card-header">
              <div className="panel-title-group">
                <Shield className="panel-header-icon text-emerald-400" />
                <h3 className="pricing-card-title">{t.tier2Title}</h3>
              </div>
              <p className="pricing-card-desc">{t.tier2Desc}</p>
            </div>

            <div className="pricing-price-box">
              <span className="price-val">
                {isAnnual ? '$1,590' : '$1,990'}
              </span>
              <span className="price-period">{t.period}</span>
            </div>

            <ul className="pricing-feature-list">
              <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> <strong>Up to $50M AUM</strong> Protected</li>
              <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Dedicated Cloud Nitro Enclaves</li>
              <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Automated AML / TRM Labs Screening</li>
              <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Sub-15ms Multi-Cloud Consensus</li>
              <li><Check className="w-4 h-4 text-emerald-400 shrink-0" /> Priority 24/7 Slack War-Room</li>
            </ul>
          </div>

          <div className="pricing-card-footer">
            <button
              onClick={() => onSelectPlan(`Growth Treasury (${isAnnual ? '$1,590/mo' : '$1,990/mo'})`)}
              className="vault-btn-primary pricing-action-btn"
            >
              {t.tier2Btn}
            </button>
          </div>
        </div>

        {/* Tier 3: Sovereign Enterprise */}
        <div className="pricing-card">
          <div className="pricing-card-top">
            <div className="pricing-card-header">
              <div className="panel-title-group">
                <Building2 className="panel-header-icon text-cyan-400" />
                <h3 className="pricing-card-title">{t.tier3Title}</h3>
              </div>
              <p className="pricing-card-desc">{t.tier3Desc}</p>
            </div>

            <div className="pricing-price-box">
              <span className="price-val">Custom</span>
              <span className="price-period">Sovereign AUM</span>
            </div>

            <ul className="pricing-feature-list">
              <li><Check className="w-4 h-4 text-cyan-400 shrink-0" /> <strong>Unlimited Multi-Billion AUM</strong></li>
              <li><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Dedicated FIPS 140-2 Level 3 HSMs</li>
              <li><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Self-Hosted GovCloud VPC Deployment</li>
              <li><Check className="w-4 h-4 text-cyan-400 shrink-0" /> $250M Lloyd's of London Crime Policy</li>
              <li><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Dedicated Security Officer & SLA</li>
            </ul>
          </div>

          <div className="pricing-card-footer">
            <button
              onClick={() => onSelectPlan('Sovereign Enterprise (Custom)')}
              className="vault-btn-secondary pricing-action-btn"
            >
              {t.tier3Btn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
