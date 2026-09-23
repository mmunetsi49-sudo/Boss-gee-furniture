import React from 'react';
import { ArrowRight, CheckCircle2, PhoneCall, Sparkles, Hammer, ShoppingBag } from 'lucide-react';
import { trackEvent } from '../config/businessConfig';

interface HowItWorksSectionProps {
  onStartOrder: () => void;
}

const STEPS = [
  {
    step: 'STEP 1',
    title: 'Choose Your Furniture',
    desc: 'Browse our steel, wood, and custom furniture catalogue or prepare your custom measurements.',
    icon: ShoppingBag,
  },
  {
    step: 'STEP 2',
    title: 'Contact Boss Gee Furniture',
    desc: 'Reach out via our online quote request, direct phone call, or immediate WhatsApp chat.',
    icon: PhoneCall,
  },
  {
    step: 'STEP 3',
    title: 'Discuss Design & Price',
    desc: 'We finalize timber species, steel profile gauges, powder-coat finishes, and pricing.',
    icon: Sparkles,
  },
  {
    step: 'STEP 4',
    title: 'We Build Your Furniture',
    desc: 'Our artisans build, quality-check, and deliver your strong, beautifully finished piece.',
    icon: Hammer,
  },
];

export function HowItWorksSection({ onStartOrder }: HowItWorksSectionProps) {
  return (
    <section className="py-24 bg-neutral-900/50 border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
            SIMPLE 4-STEP PROCESS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-4 mb-3">
            HOW IT WORKS
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            From initial concept to your doorstep, we make getting custom furniture straightforward and hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-amber-600/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-amber-500 tracking-widest uppercase">
                      {s.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-white uppercase mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center gap-1.5 text-xs text-neutral-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Boss Gee Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA: START YOUR ORDER */}
        <div className="text-center">
          <button
            onClick={() => {
              trackEvent('quote_request', { source: 'how_it_works' });
              onStartOrder();
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>START YOUR ORDER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
