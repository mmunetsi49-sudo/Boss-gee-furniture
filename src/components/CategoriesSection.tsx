import React from 'react';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/furnitureData';
import { trackEvent } from '../config/businessConfig';

interface CategoriesSectionProps {
  onSelectCategory: (categoryId: string) => void;
  onRequestQuoteForCategory: (categoryName: string) => void;
}

export function CategoriesSection({
  onSelectCategory,
  onRequestQuoteForCategory,
}: CategoriesSectionProps) {
  return (
    <section id="categories" className="py-20 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
            OUR SPECIALIZATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-4 mb-4">
            FURNITURE CATEGORIES
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Engineered with uncompromising structural strength and tailored with fine artisanal touches.
            Browse our core furniture types or commission a bespoke piece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES_DATA.map((cat, idx) => (
            <div
              key={cat.id}
              className={`group bg-neutral-900/90 rounded-2xl overflow-hidden border border-neutral-800 hover:border-amber-600/50 transition-all duration-300 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-amber-950/20 ${
                cat.id === 'custom' ? 'lg:col-span-3 lg:grid lg:grid-cols-2 lg:items-center' : ''
              }`}
            >
              {/* Card Image */}
              <div className={`relative overflow-hidden bg-neutral-950 ${cat.id === 'custom' ? 'h-64 sm:h-80 lg:h-full' : 'h-60 sm:h-64'}`}>
                <img
                  src={cat.image}
                  alt={`Boss Gee Furniture - ${cat.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-neutral-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-sm">
                    {cat.itemCountLabel}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider block mb-1">
                    {cat.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                {/* Buttons: VIEW PRODUCTS + REQUEST QUOTE */}
                <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-neutral-800/80">
                  <button
                    onClick={() => {
                      trackEvent('page_view', { category: cat.id });
                      onSelectCategory(cat.id);
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-bold text-xs uppercase tracking-wider transition-colors border border-neutral-700"
                  >
                    <span>VIEW PRODUCTS</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>

                  <button
                    onClick={() => {
                      trackEvent('quote_request', { category: cat.name });
                      onRequestQuoteForCategory(cat.name);
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all border border-amber-600/40"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>REQUEST QUOTE</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
