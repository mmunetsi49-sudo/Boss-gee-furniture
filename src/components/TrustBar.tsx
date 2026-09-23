import React from 'react';
import { Check, ShieldCheck, Sparkles, Hammer, Layers, Compass } from 'lucide-react';

const TRUST_POINTS = [
  { text: 'Custom Furniture', desc: 'Built to your dimensions' },
  { text: 'Strong Construction', desc: 'Heavy-gauge steel & solid wood' },
  { text: 'Quality Materials', desc: 'Selected hardwoods & alloys' },
  { text: 'Professional Finishing', desc: 'Smooth seams & durable coating' },
  { text: 'Steel & Wood Designs', desc: 'Mastery in both mediums' },
];

export function TrustBar() {
  return (
    <section className="bg-neutral-900 border-y border-neutral-800/80 py-5 relative z-20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {TRUST_POINTS.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-800/50 hover:border-amber-500/30 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-amber-400 stroke-[3]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-neutral-100 tracking-wide">
                  {item.text}
                </p>
                <p className="text-[11px] text-neutral-400 hidden sm:block">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
