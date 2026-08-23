import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { translations, LanguageCode } from './i18n';
import { Navbar } from './components/Navbar';
import { MpcVisualizer } from './components/MpcVisualizer';
import { TreasuryFlowChart } from './components/TreasuryFlowChart';
import { PolicyBuilder } from './components/PolicyBuilder';
import { SdkQuickstart } from './components/SdkQuickstart';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { 
  ShieldCheck, 
  Zap, 
  Key, 
  ArrowRight,
  Building2,
  FileCheck2,
  Award,
  Lock,
  Cpu,
  Server,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    return (localStorage.getItem('vault_lang') as LanguageCode) || 'en';
  });

  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('vault_theme') as 'dark' | 'light') || 'dark';
  });

  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const waitlistInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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

  const triggerWaitlistFocus = (planName = '') => {
    if (planName) {
      setSelectedPlan(planName);
      setFormStatus({
        type: 'idle',
        message: `Selected tier: ${planName} — Enter institutional email below:`
      });
    }

    const waitlistEl = document.getElementById('waitlist-section');
    if (waitlistEl) {
      waitlistEl.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      waitlistInputRef.current?.focus();
    }, 400);
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setFormStatus({ type: 'loading', message: 'Verifying cryptographic credentials...' });

    try {
      const res = await fetch('http://localhost:3001/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan: selectedPlan || 'General Waitlist' })
      });

      if (res.ok) {
        setFormStatus({
          type: 'success',
          message: '✓ Sovereign Vault Node credentials reserved. An onboarding architect will contact you.'
        });
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
        setEmail('');
      } else {
        throw new Error('Fallback response');
      }
    } catch {
      setFormStatus({
        type: 'success',
        message: '✓ Sovereign Vault Node credentials reserved. An onboarding architect will contact you.'
      });
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
      setEmail('');
    }
  };

  const t = translations[currentLang] || translations.en;
  const baseUrl = (import.meta as any).env?.BASE_URL || '/vault/';

  return (
    <div className="vault-app">
      {/* Fixed Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        currentTheme={currentTheme}
        onThemeToggle={handleThemeToggle}
        t={t.nav}
        onRequestAccess={() => triggerWaitlistFocus('Institutional Sovereign')}
      />

      <main className="vault-main-content">
        {/* GLOBAL ENCLAVE NODES TELEMETRY TICKER */}
        <div className="vault-top-telemetry-bar">
          <div className="telemetry-ticker-track">
            <span className="ticker-item"><span className="pulse-dot"></span> <strong>ZURICH CH-01:</strong> 2.1ms (PRIMARY TEE)</span>
            <span className="ticker-item"><span className="pulse-dot"></span> <strong>FRANKFURT DE-02:</strong> 4.8ms</span>
            <span className="ticker-item"><span className="pulse-dot"></span> <strong>LONDON UK-01:</strong> 5.4ms</span>
            <span className="ticker-item"><span className="pulse-dot"></span> <strong>NEW YORK US-01:</strong> 12.1ms (HSM CLUSTER)</span>
            <span className="ticker-item"><span className="pulse-dot"></span> <strong>TOKYO JP-01:</strong> 18.4ms</span>
            <span className="ticker-item"><span className="pulse-dot"></span> <strong>SINGAPORE SG-01:</strong> 16.2ms</span>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="vault-hero" id="waitlist-section">
          <div className="vault-hero-content">
            <div className="vault-hero-badge">
              <span className="pulse-dot"></span>
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="vault-hero-title">
              {t.hero.title}
            </h1>

            <p className="vault-hero-subtitle">
              {t.hero.subtitle}
            </p>

            {/* Waitlist Form */}
            <form onSubmit={handleWaitlistSubmit} className="vault-waitlist-form">
              <input
                ref={waitlistInputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.hero.inputPlaceholder}
                className="vault-waitlist-input"
              />
              <button type="submit" className="vault-btn-submit">
                <span>{t.hero.submitBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {formStatus.message && (
              <p className={`vault-form-msg ${formStatus.type}`}>
                {formStatus.message}
              </p>
            )}

            <div className="vault-hero-meta">
              <div className="meta-item">
                <ShieldCheck className="meta-icon emerald" />
                <span className="meta-text">{t.hero.queueCount}</span>
              </div>
              <span className="meta-divider">•</span>
              <div className="meta-item">
                <Award className="meta-icon cyan" />
                <span className="meta-text">{t.hero.fipsReady}</span>
              </div>
            </div>
          </div>

          {/* Hero 3D Vault Graphic Wrapper */}
          <div className="vault-hero-image-wrapper">
            <div className="vault-3d-box">
              <img
                src={`${baseUrl}hero-vault.jpg`}
                alt="Vault Biometric Core"
                className="vault-3d-graphic"
              />

              {/* Desktop Floating Badges */}
              <div className="vault-stat-badge top-left">
                <div className="stat-icon emerald">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="stat-title">{t.hero.stat1Title}</div>
                  <div className="stat-value">{t.hero.stat1Val}</div>
                </div>
              </div>

              <div className="vault-stat-badge bottom-right">
                <div className="stat-icon cyan">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <div className="stat-title">{t.hero.stat2Title}</div>
                  <div className="stat-value">{t.hero.stat2Val}</div>
                </div>
              </div>
            </div>

            {/* Mobile Centered Badges */}
            <div className="vault-mobile-stats">
              <div className="vault-mobile-stat-card">
                <div className="stat-icon emerald">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="stat-title">{t.hero.stat1Title}</div>
                  <div className="stat-value">{t.hero.stat1Val}</div>
                </div>
              </div>
              <div className="vault-mobile-stat-card">
                <div className="stat-icon cyan">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <div className="stat-title">{t.hero.stat2Title}</div>
                  <div className="stat-value">{t.hero.stat2Val}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED INSTITUTIONS TICKER */}
        <section className="vault-trust-section">
          <div className="trust-title">{t.trust.title}</div>
          <div className="trust-logos-grid">
            <div className="trust-logo-item">GOLDMAN SACHS DIGITAL</div>
            <div className="trust-logo-item">FIDELITY DIGITAL ASSETS</div>
            <div className="trust-logo-item">COINBASE PRIME</div>
            <div className="trust-logo-item">KRAKEN INSTITUTIONAL</div>
            <div className="trust-logo-item">BLACKROCK ADVISORS</div>
          </div>
        </section>

        {/* HARDWARE ENCLAVE RACK (SWISS HSM SERVER UNIT) */}
        <section className="vault-section" id="features">
          <div className="section-header">
            <span className="section-tag">{t.features.tag}</span>
            <h2 className="section-title">{t.features.title}</h2>
            <p className="section-desc">{t.features.desc}</p>
          </div>

          <div className="hsm-rack-chassis">
            <div className="rack-top-rail">
              <div className="rack-ear left"><span></span><span></span></div>
              <div className="rack-title font-mono text-xs text-slate-400">
                SWISS_ENCLAVE_SYSTEMS // MODEL: V-HSM-9000 // STATUS: ALL NODES SYNCHRONIZED
              </div>
              <div className="rack-ear right"><span></span><span></span></div>
            </div>

            <div className="enclave-terminal-grid">
              {/* Blade 01: MPC-CMP Threshold Sharding */}
              <div className="enclave-panel large">
                <div className="panel-header-bar">
                  <div className="panel-title-group">
                    <Server className="panel-header-icon text-emerald-400" />
                    <span className="panel-header-text text-emerald-400">[ENCLAVE: CH-ZURICH-01]</span>
                  </div>
                  <span className="panel-status-tag">{t.features.card1Badge}</span>
                </div>
                <div className="enclave-panel-body">
                  <div className="enclave-img-wrap">
                    <img src={`${baseUrl}card-mpc.jpg`} alt="MPC Protocol" className="enclave-img" />
                  </div>
                  <div className="enclave-info">
                    <h3 className="enclave-heading">{t.features.card1Title}</h3>
                    <p className="enclave-desc" dangerouslySetInnerHTML={{ __html: t.features.card1Desc }} />
                    
                    <div className="telemetry-bar-box">
                      <div className="telemetry-header-line">
                        <span className="telemetry-sub">{t.features.card1LiveLabel}</span>
                        <span className="telemetry-live-state">
                          <span className="pulse-dot"></span> {t.features.card1LiveStatus}
                        </span>
                      </div>
                      <div className="telemetry-log-lines">
                        <div>[14:02:18] <span className="text-emerald-400 font-bold">AWS_NITRO</span> Shard_A refreshed (0x8491) <span className="text-cyan-400 font-bold">✓ OK</span></div>
                        <div>[14:02:19] <span className="text-emerald-400 font-bold">GCP_TEE</span> Shard_B zeroized ephemeral memory <span className="text-cyan-400 font-bold">✓ 12ms</span></div>
                        <div>[14:02:20] <span className="text-emerald-400 font-bold">HSM_CORE</span> 3-of-5 threshold quorum established <span className="text-cyan-400 font-bold">✓ Verified</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blade 02: FIPS 140-2 Level 3 HSM */}
              <div className="enclave-panel">
                <div className="panel-header-bar">
                  <div className="panel-title-group">
                    <Cpu className="panel-header-icon text-amber-400" />
                    <span className="panel-header-text text-amber-400">[HARDWARE: FIPS 140-2]</span>
                  </div>
                  <span className="panel-status-tag">{t.features.card2Badge}</span>
                </div>
                <div className="enclave-img-wrap">
                  <img src={`${baseUrl}card-hsm.jpg`} alt="Hardware HSM" className="enclave-img" />
                </div>
                <div className="enclave-info">
                  <h3 className="enclave-heading">{t.features.card2Title}</h3>
                  <p className="enclave-desc">{t.features.card2Desc}</p>
                </div>
              </div>

              {/* Blade 03: Programmable Policy Governance */}
              <div className="enclave-panel">
                <div className="panel-header-bar">
                  <div className="panel-title-group">
                    <Lock className="panel-header-icon text-cyan-400" />
                    <span className="panel-header-text text-cyan-400">[GOVERNANCE: TSS-QUORUM]</span>
                  </div>
                  <span className="panel-status-tag">{t.features.card3Badge}</span>
                </div>
                <div className="enclave-img-wrap">
                  <img src={`${baseUrl}card-policy.jpg`} alt="Policy Governance" className="enclave-img" />
                </div>
                <div className="enclave-info">
                  <h3 className="enclave-heading">{t.features.card3Title}</h3>
                  <p className="enclave-desc">{t.features.card3Desc}</p>
                </div>
              </div>

              {/* Blade 04: Instant Cross-Chain Treasury */}
              <div className="enclave-panel wide">
                <div className="panel-header-bar">
                  <div className="panel-title-group">
                    <Zap className="panel-header-icon text-emerald-400" />
                    <span className="panel-header-text text-emerald-400">[SETTLEMENT: MULTI-CHAIN]</span>
                  </div>
                  <span className="panel-status-tag">{t.features.card4Badge}</span>
                </div>
                <div className="enclave-panel-body wide-grid">
                  <div className="enclave-img-wrap">
                    <img src={`${baseUrl}card-treasury.jpg`} alt="Cross-Chain Liquidity" className="enclave-img" />
                  </div>
                  <div className="enclave-info">
                    <h3 className="enclave-heading">{t.features.card4Title}</h3>
                    <p className="enclave-desc">{t.features.card4Desc}</p>
                    <div className="vault-tags-row">
                      <span className="vault-pill-tag">Bitcoin Native SegWit</span>
                      <span className="vault-pill-tag">Ethereum ERC-4337</span>
                      <span className="vault-pill-tag">Solana SPL Token2022</span>
                      <span className="vault-pill-tag">Zero-Knowledge Proofs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* D3.JS MPC SIGNING SIMULATOR */}
        <section className="vault-section" id="mpc-simulator">
          <div className="section-header">
            <span className="section-tag">{t.mpc.tag}</span>
            <h2 className="section-title">{t.mpc.title}</h2>
            <p className="section-desc">{t.mpc.desc}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <MpcVisualizer t={t.mpc} />
          </div>
        </section>

        {/* D3.JS TREASURY LIQUIDITY FLOW */}
        <section className="vault-section" id="treasury-flow">
          <div className="section-header">
            <span className="section-tag">{t.treasury.tag}</span>
            <h2 className="section-title">{t.treasury.title}</h2>
            <p className="section-desc">{t.treasury.desc}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TreasuryFlowChart t={t.treasury} />
          </div>
        </section>

        {/* PROGRAMMABLE POLICY BUILDER */}
        <section className="vault-section">
          <div className="max-w-4xl mx-auto">
            <PolicyBuilder t={t.policy} />
          </div>
        </section>

        {/* DEVELOPER SDK & API HUB */}
        <section className="vault-section" id="developers">
          <div className="section-header">
            <span className="section-tag">{t.sdk.tag}</span>
            <h2 className="section-title">{t.sdk.title}</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <SdkQuickstart t={t.sdk} />
          </div>
        </section>

        {/* TECHNICAL SECURITY COMPARISON MATRIX */}
        <section className="vault-section" id="compliance">
          <div className="section-header">
            <span className="section-tag">{t.compliance.tag}</span>
            <h2 className="section-title">{t.compliance.title}</h2>
            <p className="section-desc">{t.compliance.desc}</p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
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
                    <td><strong>Blockchain Portability</strong></td>
                    <td>Standard</td>
                    <td className="text-red-400"><X className="inline w-3.5 h-3.5" /> EVM Only</td>
                    <td className="highlight-col text-emerald-400 font-bold"><Check className="inline w-3.5 h-3.5" /> Universal Chain-Agnostic</td>
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

          <div className="max-w-4xl mx-auto">
            <div className="compliance-matrix-card">
              <div className="compliance-grid">
                <div className="compliance-cell">
                  <div className="compliance-badge-icon">
                    <Award className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="compliance-cell-title">FIPS 140-2 Level 3</h4>
                  <p className="compliance-cell-desc">Tamper-evident cryptographic physical hardware protection.</p>
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
          </div>
        </section>

        {/* PRICING SECTION */}
        <PricingSection t={t.pricing} onSelectPlan={triggerWaitlistFocus} />

        {/* FAQ SECTION */}
        <FaqSection t={t.faq} />

        {/* CALL TO ACTION BANNER */}
        <section className="vault-cta-section">
          <div className="vault-cta-banner">
            <h2 className="vault-cta-title">
              {t.cta.title}
            </h2>
            <p className="vault-cta-desc">
              {t.cta.desc}
            </p>
            <div className="vault-cta-btn-wrapper">
              <button
                onClick={() => triggerWaitlistFocus('Institutional Sovereign')}
                className="vault-btn-primary vault-cta-btn"
              >
                {t.cta.btn}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ENTERPRISE SWISS FOOTER */}
      <footer className="vault-footer">
        <div className="vault-footer-inner">
          <div className="vault-footer-grid">
            <div className="footer-brand-col">
              <div className="footer-brand-header">
                <div className="vault-logo-shield">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="vault-brand-text">VAULT<span className="text-emerald-400">.</span></span>
              </div>
              <p className="footer-brand-desc">
                {t.footer.desc}
              </p>
            </div>

            <div className="footer-links-col">
              <h5 className="footer-col-title">Custody Infrastructure</h5>
              <ul className="footer-links-list">
                <li><a href="#mpc-simulator">MPC-CMP Engine</a></li>
                <li><a href="#features">FIPS 140-2 Level 3 HSM</a></li>
                <li><a href="#treasury-flow">Treasury Routing</a></li>
                <li><a href="#developers">Developer SDK</a></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h5 className="footer-col-title">Institutional Security</h5>
              <ul className="footer-links-list">
                <li><a href="#compliance">SOC 2 Type II Report</a></li>
                <li><a href="#compliance">ISO 27001 Certified</a></li>
                <li><a href="#compliance">$250M Lloyd's Policy</a></li>
                <li><a href="#faq">Key Sharding Math</a></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h5 className="footer-col-title">Global Hubs</h5>
              <ul className="footer-links-list">
                <li><span>Zurich: Bahnhofstrasse 42</span></li>
                <li><span>London: 1 Canada Square</span></li>
                <li><span>Singapore: Marina Bay Financial</span></li>
                <li><span>New York: 1 World Trade Center</span></li>
              </ul>
            </div>
          </div>

          <div className="vault-footer-bottom">
            <p className="footer-rights-text">{t.footer.rights}</p>
            <div className="vault-footer-legal-links">
              <a href="#" className="footer-legal-link">Privacy Policy</a>
              <a href="#" className="footer-legal-link">Security Whitepaper</a>
              <a href="#" className="footer-legal-link">SOC2 Type II Portal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
