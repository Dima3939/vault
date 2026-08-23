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
        <div className={`policy-item-v2 ${rule1Active ? 'active' : ''}`} onClick={() => setRule1Active(!rule1Active)}>
          <div className="policy-item-header">
            <div className="flex items-center gap-3">
              <div className="policy-item-icon-box emerald">
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="font-bold text-sm text-white">{t.rule1}</h4>
            </div>
            <span className={`policy-status-pill font-mono ${rule1Active ? 'active' : 'disabled'}`}>
              {rule1Active ? 'ENFORCED' : 'DISABLED'}
            </span>
          </div>
          <p className="policy-item-description">{t.rule1Desc}</p>
        </div>

        {/* Rule 2 */}
        <div className={`policy-item-v2 ${rule2Active ? 'active' : ''}`} onClick={() => setRule2Active(!rule2Active)}>
          <div className="policy-item-header">
            <div className="flex items-center gap-3">
              <div className="policy-item-icon-box cyan">
                <Globe className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="font-bold text-sm text-white">{t.rule2}</h4>
            </div>
            <span className={`policy-status-pill font-mono ${rule2Active ? 'active' : 'disabled'}`}>
              {rule2Active ? 'ENFORCED' : 'DISABLED'}
            </span>
          </div>
          <p className="policy-item-description">{t.rule2Desc}</p>
        </div>

        {/* Rule 3 */}
        <div className={`policy-item-v2 ${rule3Active ? 'active' : ''}`} onClick={() => setRule3Active(!rule3Active)}>
          <div className="policy-item-header">
            <div className="flex items-center gap-3">
              <div className="policy-item-icon-box amber">
                <CheckCircle className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="font-bold text-sm text-white">{t.rule3}</h4>
            </div>
            <span className={`policy-status-pill font-mono ${rule3Active ? 'active' : 'disabled'}`}>
              {rule3Active ? 'ENFORCED' : 'DISABLED'}
            </span>
          </div>
          <p className="policy-item-description">{t.rule3Desc}</p>
        </div>
      </div>
    </div>
  );
};
