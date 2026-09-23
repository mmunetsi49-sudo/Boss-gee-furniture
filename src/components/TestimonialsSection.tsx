import React from 'react';
import { Star, Quote, MapPin, CheckCircle, Info } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/furnitureData';

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-neutral-900/40 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
            CLIENT FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-4 mb-3">
            WHAT CUSTOMERS SAY
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Real satisfaction from homeowners, lodge proprietors, and corporate offices across Zimbabwe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-neutral-800" />
                </div>

                <p className="text-neutral-300 text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-neutral-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{t.author}</h4>
                      <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        <span>{t.location}</span>
                      </p>
                    </div>
                    <span className="text-[11px] text-neutral-500 font-medium">{t.date}</span>
                  </div>
                  <p className="text-[11px] text-amber-400/90 font-semibold mt-2">
                    Project: {t.project}
                  </p>
                </div>

                {/* Explicitly marked placeholder note as requested */}
                <div className="mt-3 p-1.5 rounded bg-neutral-900/60 border border-neutral-800/80 text-[10px] text-neutral-400 flex items-center gap-1.5">
                  <Info className="w-3 h-3 text-neutral-400 shrink-0" />
                  <span className="truncate">{t.verifiedNote}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
