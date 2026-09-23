import React from 'react';
import { PenTool, ShieldCheck, Hammer, Sparkles, Layers, UserCheck } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/furnitureData';

const ICONS = [PenTool, ShieldCheck, Hammer, Sparkles, Layers, UserCheck];

export function WhyChooseSection() {
  return (
    <section id="about" className="py-24 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
            OUR COMMITMENT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-4 mb-3">
            WHY CHOOSE BOSS GEE FURNITURE?
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Built on honest manufacturing standards, precision metal fabrication, and authentic solid timber woodworking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-600/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-600/10 border border-amber-600/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-wide mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                    Boss Gee Craft Guarantee
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
