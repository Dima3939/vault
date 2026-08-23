import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqSectionProps {
  t: {
    tag: string;
    title: string;
    desc: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
  };
}

export const FaqSection: React.FC<FaqSectionProps> = ({ t }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
  ];

  return (
    <section className="vault-section" id="faq">
      <div className="section-header text-center max-w-3xl mx-auto mb-12">
        <span className="section-tag">{t.tag}</span>
        <h2 className="section-title text-white">{t.title}</h2>
        <p className="section-desc">{t.desc}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="faq-question-btn"
              >
                <span className="text-base font-semibold text-white text-left">{item.q}</span>
                <span className="faq-toggle-icon">
                  {isOpen ? <Minus className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4 text-slate-400" />}
                </span>
              </button>

              {isOpen && (
                <div className="faq-answer-content">
                  <p className="text-sm text-slate-300 leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
