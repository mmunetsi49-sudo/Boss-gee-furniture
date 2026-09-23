import React from 'react';
import { ShieldCheck, Flame, Hammer, Sparkles, Ruler, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { STEEL_FEATURES } from '../data/furnitureData';
import { trackEvent } from '../config/businessConfig';

interface SteelFurnitureSectionProps {
  onOrderSteel: () => void;
  onFilterSteelCategory: () => void;
}

const STEEL_SHOWCASE_ITEMS = [
  { name: 'Steel Chairs', desc: 'Heavy-gauge dining & bar seating', count: 'Indoor & Patio' },
  { name: 'Steel Tables', desc: 'Box-section frames & structural beams', count: 'Home & Boardroom' },
  { name: 'Steel Beds', desc: 'Zero-creak reinforced steel slat beds', count: 'Single to King' },
  { name: 'Steel Sofas', desc: 'Modern industrial welded lounge suites', count: 'Deep Cushioned' },
  { name: 'Steel Frames', desc: 'Custom architectural structural frames', count: 'Bespoke Fabrication' },
  { name: 'Outdoor Steel Furniture', desc: 'Weatherproof powder-coated patio sets', count: 'Anti-Rust Coating' },
];

export function SteelFurnitureSection({ onOrderSteel, onFilterSteelCategory }: SteelFurnitureSectionProps) {
  return (
    <section id="steel" className="py-24 bg-neutral-950 text-neutral-100 relative overflow-hidden border-b border-neutral-900">
      {/* Decorative steel texture gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neutral-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Hammer className="w-3.5 h-3.5" />
              <span>HEAVY-GAUGE METAL FABRICATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              STEEL FURNITURE BUILT FOR STRENGTH
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed">
              Every steel piece from Boss Gee Furniture is cut, welded, prepped, and electrostatically powder-coated
              in our workshop. Engineered to withstand heavy everyday use in residential, commercial, and outdoor settings.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                trackEvent('quote_request', { type: 'steel_furniture' });
                onOrderSteel();
              }}
              className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-amber-600/25 transition-all transform hover:-translate-y-0.5"
            >
              ORDER STEEL FURNITURE
            </button>
          </div>
        </div>

        {/* Steel Types Showcase Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-16">
          {STEEL_SHOWCASE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              onClick={onFilterSteelCategory}
              className="cursor-pointer p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/50 hover:bg-neutral-800/80 transition-all text-left group"
            >
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                {item.count}
              </span>
              <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors">
                {item.name}
              </h4>
              <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Core Highlights Grid */}
        <div className="bg-neutral-900/60 rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">
              ENGINEERED ADVANTAGES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1">
              THE BOSS GEE STEEL STANDARD
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEEL_FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-600/20 flex items-center justify-center shrink-0 text-amber-400">
                  {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 1 && <Flame className="w-5 h-5" />}
                  {idx === 2 && <Hammer className="w-5 h-5" />}
                  {idx === 3 && <Sparkles className="w-5 h-5" />}
                  {idx === 4 && <Ruler className="w-5 h-5" />}
                  {idx === 5 && <Layers className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-base text-white tracking-wide mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-sm font-semibold text-white">
                Have specific steel tubing gauges or powder coat RAL color codes?
              </p>
              <p className="text-xs text-neutral-400">
                We accommodate custom commercial specifications, restaurant layouts, and architectural projects.
              </p>
            </div>
            <button
              onClick={onOrderSteel}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs uppercase tracking-wider border border-neutral-700"
            >
              <span>DISCUSS STEEL ORDER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
