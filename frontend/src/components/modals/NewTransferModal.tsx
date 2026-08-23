import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, Check, Key } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NewTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewTransferModal: React.FC<NewTransferModalProps> = ({
  isOpen,
  onClose
}) => {
  const [asset, setAsset] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [step, setStep] = useState<'form' | 'signing' | 'done'>('form');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !recipient) return;

    setStep('signing');
    setTimeout(() => {
      setStep('done');
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    }, 1600);
  };

  const handleReset = () => {
    setStep('form');
    setAmount('');
    setRecipient('');
    onClose();
  };

  return (
    <div className="modal-backdrop-overlay">
      <div className="modal-content-card">
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Initiate Sovereign MPC Transfer</h3>
          </div>
          <button onClick={handleReset} className="modal-close-btn">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {step === 'form' && (
          <form onSubmit={handleSubmit} className="modal-body-form">
            <div className="form-group">
              <label className="form-label">Asset Selection</label>
              <div className="asset-selector-pills">
                {(['BTC', 'ETH', 'SOL', 'USDC'] as const).map(a => (
                  <button
                    type="button"
                    key={a}
                    onClick={() => setAsset(a)}
                    className={`asset-pill-btn ${asset === a ? 'active' : ''}`}
                  >
                    <span>{a === 'BTC' ? '₿' : a === 'ETH' ? 'Ξ' : a === 'SOL' ? '◎' : '$'}</span>
                    <span>{a}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Transfer Amount</label>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="modal-input font-mono font-bold text-lg"
                />
                <span className="absolute right-3 top-3 text-xs font-mono text-slate-400 font-bold">{asset}</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Recipient Address / Whitelisted Enclave</label>
              <input
                type="text"
                required
                placeholder="e.g. bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="modal-input font-mono text-xs"
              />
            </div>

            <div className="modal-security-callout">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs text-slate-300">
                Requires 3-of-5 MPC threshold quorum consensus across Zurich and London HSM nodes.
              </span>
            </div>

            <div className="modal-actions-footer">
              <button type="button" onClick={handleReset} className="btn-modal-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-modal-primary">
                <span>Broadcast to Quorum</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 'signing' && (
          <div className="modal-signing-state">
            <div className="signing-spinner-ring">
              <div className="inner-pulse"></div>
            </div>
            <h4 className="text-base font-bold text-white mt-4">Gathering 3-of-5 MPC Shard Signatures</h4>
            <p className="text-xs text-slate-400 max-w-xs text-center mt-1">
              Zeroizing ephemeral enclave memory and assembling DER signature payload...
            </p>
          </div>
        )}

        {step === 'done' && (
          <div className="modal-done-state">
            <div className="done-icon-box">
              <Check className="w-7 h-7 text-emerald-400" />
            </div>
            <h4 className="text-lg font-bold text-white mt-4">Transaction Broadcast to Blockchain</h4>
            <p className="text-xs font-mono text-emerald-400 mt-1">
              Tx: 0x8f3a9b...7d0e (Sub-15ms Consensus)
            </p>
            <p className="text-xs text-slate-300 text-center mt-3">
              {amount} {asset} successfully transferred. Ledger updated across all 5 enclaves.
            </p>
            <button onClick={handleReset} className="btn-modal-primary mt-6 w-full">
              Back to Overview
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
