import React, { useState } from 'react';
import { Shield, Clock, Globe, CheckCircle, Sliders } from 'lucide-react';

interface PolicyBuilderProps {
  t: {
    rule1: string;
    rule1Desc: string;
    rule2: string;
    rule2Desc: string;
    rule3: string;
    rule3Desc: string;
  };
}

export const PolicyBuilder: React.FC<PolicyBuilderProps> = ({ t }) => {
  const [rule1Active, setRule1Active] = useState(true);
  const [rule2Active, setRule2Active] = useState(true);
  const [rule3Active, setRule3Active] = useState(true);

  const activeCount = (rule1Active ? 1 : 0) + (rule2Active ? 1 : 0) + (rule3Active ? 1 : 0);

  return (
    <div className="policy-builder-card">
      <div className="policy-header">
        <div className="flex items-center gap-2">
          <Sliders className="text-emerald-400 w-5 h-5" />
          <h3 className="text-lg font-bold text-white tracking-tight">Programmable Policy & Compliance Engine</h3>
        </div>
        <div className="security-score-badge">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Security Score: {activeCount === 3 ? '100% (Sovereign)' : activeCount === 2 ? '75% (High)' : '50% (Standard)'}</span>
        </div>
      </div>

      <div className="policy-rules-list">
        {/* Rule 1 */}
        <div className={`policy-item ${rule1Active ? 'active' : ''}`} onClick={() => setRule1Active(!rule1Active)}>
          <div className="policy-item-icon">
            <Clock className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="policy-item-content">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-white">{t.rule1}</h4>
              <span className="font-mono text-xs text-emerald-400">{rule1Active ? 'ENFORCED' : 'DISABLED'}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{t.rule1Desc}</p>
          </div>
        </div>

        {/* Rule 2 */}
        <div className={`policy-item ${rule2Active ? 'active' : ''}`} onClick={() => setRule2Active(!rule2Active)}>
          <div className="policy-item-icon">
            <Globe className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="policy-item-content">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-white">{t.rule2}</h4>
              <span className="font-mono text-xs text-cyan-400">{rule2Active ? 'ENFORCED' : 'DISABLED'}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{t.rule2Desc}</p>
          </div>
        </div>

        {/* Rule 3 */}
        <div className={`policy-item ${rule3Active ? 'active' : ''}`} onClick={() => setRule3Active(!rule3Active)}>
          <div className="policy-item-icon">
            <CheckCircle className="w-5 h-5 text-amber-400" />
          </div>
          <div className="policy-item-content">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-white">{t.rule3}</h4>
              <span className="font-mono text-xs text-amber-400">{rule3Active ? 'ENFORCED' : 'DISABLED'}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{t.rule3Desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
