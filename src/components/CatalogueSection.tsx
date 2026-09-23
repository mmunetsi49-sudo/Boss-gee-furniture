import React, { useState } from 'react';
import { Phone, MessageSquare, SlidersHorizontal, Search, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { Product, PRODUCTS_DATA } from '../data/furnitureData';
import { BUSINESS_CONFIG, getCallTelUrl, getWhatsAppUrl, trackEvent } from '../config/businessConfig';

interface CatalogueSectionProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenProductModal: (product: Product) => void;
  onRequestQuoteForProduct: (product: Product) => void;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'ALL FURNITURE' },
  { id: 'steel', label: 'STEEL' },
  { id: 'wood', label: 'WOOD' },
  { id: 'chairs', label: 'CHAIRS' },
  { id: 'tables', label: 'TABLES' },
  { id: 'beds', label: 'BEDS' },
  { id: 'sofas', label: 'SOFAS' },
  { id: 'custom', label: 'CUSTOM' },
];

export function CatalogueSection({
  selectedCategory,
  onSelectCategory,
  onOpenProductModal,
  onRequestQuoteForProduct,
}: CatalogueSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.categories.includes(selectedCategory as any);
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCall = (productName: string) => {
    trackEvent('call_click', { product: productName });
    window.location.href = getCallTelUrl();
  };

  const handleWhatsApp = (productName: string) => {
    trackEvent('whatsapp_click', { product: productName });
    const message = `Hello Boss Gee Furniture, I am interested in the ${productName}. Please send me more information and a quotation.`;
    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="furniture" className="py-24 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
            WORKSHOP CATALOGUE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-4 mb-4">
            FEATURED FURNITURE
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every piece is built to order with heavy-duty structural integrity.
            Select any model to view specifications, request a competitive quotation, or customize sizes.
          </p>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  trackEvent('page_view', { tab: tab.id });
                  onSelectCategory(tab.id);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-amber-600 text-neutral-950 shadow-md shadow-amber-600/30 font-black'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search furniture or material..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900/40 rounded-3xl border border-neutral-800">
            <p className="text-neutral-400 text-base mb-3">No furniture pieces matched your search criteria.</p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-lg bg-amber-600 text-neutral-950 font-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-neutral-900/90 rounded-2xl overflow-hidden border border-neutral-800 hover:border-amber-600/50 transition-all duration-300 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-amber-950/20"
              >
                {/* Product Image */}
                <div
                  onClick={() => onOpenProductModal(product)}
                  className="relative h-64 overflow-hidden cursor-pointer bg-neutral-950"
                >
                  <img
                    src={product.image}
                    alt={`Boss Gee Furniture - ${product.name}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-70" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {product.inStockBadge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-neutral-950/90 text-amber-400 border border-amber-500/30 backdrop-blur-sm">
                        {product.inStockBadge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-600 text-neutral-950 shadow-md">
                      View Details & Specs
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3
                        onClick={() => onOpenProductModal(product)}
                        className="text-xl font-black text-white hover:text-amber-400 transition-colors cursor-pointer uppercase tracking-tight"
                      >
                        {product.name}
                      </h3>
                      {/* Price Badge: Always REQUEST PRICE as requested */}
                      <span className="shrink-0 text-xs font-black px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                        REQUEST PRICE
                      </span>
                    </div>

                    {/* Material */}
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-3">
                      <Tag className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="font-semibold text-neutral-300">{product.material}</span>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3 mb-6">
                      {product.description}
                    </p>
                  </div>

                  {/* 4 Required Action Buttons: REQUEST PRICE, WHATSAPP, CALL, CUSTOMIZE */}
                  <div className="space-y-2 pt-4 border-t border-neutral-800">
                    <div className="grid grid-cols-2 gap-2">
                      {/* REQUEST PRICE */}
                      <button
                        onClick={() => {
                          trackEvent('quote_request', { product: product.name });
                          onRequestQuoteForProduct(product);
                        }}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-600/20"
                      >
                        <span>REQUEST PRICE</span>
                      </button>

                      {/* CUSTOMIZE */}
                      <button
                        onClick={() => {
                          trackEvent('product_view', { product: product.name, action: 'customize' });
                          onOpenProductModal(product);
                        }}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs uppercase tracking-wider transition-colors border border-neutral-700"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                        <span>CUSTOMIZE</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {/* WHATSAPP */}
                      <button
                        onClick={() => handleWhatsApp(product.name)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 font-bold text-xs uppercase tracking-wider transition-colors border border-emerald-700/60"
                        title="Chat on WhatsApp about this piece"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WHATSAPP</span>
                      </button>

                      {/* CALL */}
                      <a
                        href={getCallTelUrl()}
                        onClick={() => handleCall(product.name)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors border border-neutral-700"
                        title="Call Boss Gee about this piece"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>CALL</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
