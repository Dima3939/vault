import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

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
    <div className="faq-section-wrapper">
      <div className="section-header-row mb-8">
        <div>
          <span className="section-tag-pill">{t.tag}</span>
          <h2 className="section-main-heading">{t.title}</h2>
          <p className="section-sub-desc">{t.desc}</p>
        </div>
      </div>

      <div className="faq-container">
        {faqItems.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="faq-question-btn"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="faq-question-icon" />
                  <span className="faq-question-text">{item.q}</span>
                </div>
                <span className="faq-toggle-icon">
                  {isOpen ? <Minus className="w-4 h-4 text-indigo-400" /> : <Plus className="w-4 h-4 text-slate-400" />}
                </span>
              </button>

              {isOpen && (
                <div className="faq-answer-content">
                  <p className="faq-answer-text">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
