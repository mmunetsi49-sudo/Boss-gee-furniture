import React from 'react';
import { TreePine, ShieldCheck, Sparkles, PenTool, Maximize, ArrowRight } from 'lucide-react';
import { WOOD_FEATURES } from '../data/furnitureData';
import { trackEvent } from '../config/businessConfig';

interface WoodFurnitureSectionProps {
  onOrderWood: () => void;
  onFilterWoodCategory: () => void;
}

const WOOD_SHOWCASE_ITEMS = [
  { name: 'Wooden Chairs', desc: 'Carved solid timber dining & carver seating', tag: 'Mortise & Tenon' },
  { name: 'Wooden Tables', desc: 'Thick hardwood slabs & expandable banquet tops', tag: 'Hand-Planed' },
  { name: 'Wooden Beds', desc: 'Stately headboards & heavy post structural bases', tag: 'Solid Timber' },
  { name: 'Wooden Sofas', desc: 'Hardwood exposed frames with plush cushions', tag: 'Rich Grain' },
  { name: 'Coffee Tables', desc: 'Solid wood living centerpieces with storage', tag: 'Satin Finish' },
  { name: 'Dining Furniture', desc: 'Complete coordinated family dining suites', tag: 'Custom Seaters' },
];

export function WoodFurnitureSection({ onOrderWood, onFilterWoodCategory }: WoodFurnitureSectionProps) {
  return (
    <section id="wood" className="py-24 bg-neutral-900/40 text-neutral-100 relative overflow-hidden border-b border-neutral-900">
      {/* Warm natural timber accent glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              <TreePine className="w-3.5 h-3.5" />
              <span>SOLID HARDWOOD CARPENTRY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              WOOD FURNITURE WITH TIMELESS STYLE
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed">
              Experience the organic beauty, warmth, and resilience of natural seasoned timber.
              Boss Gee builds dining tables, beds, and chairs crafted with generational joinery techniques
              that never loosen or squeak.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                trackEvent('quote_request', { type: 'wood_furniture' });
                onOrderWood();
              }}
              className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-amber-600/25 transition-all transform hover:-translate-y-0.5"
            >
              ORDER WOOD FURNITURE
            </button>
          </div>
        </div>

        {/* Wood Showcase Types */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-16">
          {WOOD_SHOWCASE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              onClick={onFilterWoodCategory}
              className="cursor-pointer p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-600/50 hover:bg-neutral-800 transition-all text-left group"
            >
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                {item.tag}
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

        {/* Core Wood Highlights Grid */}
        <div className="bg-neutral-900/80 rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">
              CARPENTRY EXCELLENCE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1">
              THE BOSS GEE TIMBER STANDARD
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {WOOD_FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 hover:border-amber-700/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400 mb-4">
                  {idx === 0 && <TreePine className="w-5 h-5" />}
                  {idx === 1 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 2 && <Sparkles className="w-5 h-5" />}
                  {idx === 3 && <PenTool className="w-5 h-5" />}
                  {idx === 4 && <Maximize className="w-5 h-5" />}
                </div>
                <h4 className="font-bold text-base text-white tracking-wide mb-1">
                  {feature.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-sm font-semibold text-white">
                Looking for indigenous Zimbabwean hardwoods like Mukwa or Teak?
              </p>
              <p className="text-xs text-neutral-400">
                We hand-select seasoned boards with deep character, high moisture tolerance, and natural grain brilliance.
              </p>
            </div>
            <button
              onClick={onOrderWood}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs uppercase tracking-wider border border-neutral-700"
            >
              <span>DISCUSS WOOD ORDER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
