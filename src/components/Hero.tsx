import React from 'react';
import { Phone, MessageSquare, ArrowDown, FileText, Sparkles, Shield, Layers } from 'lucide-react';
import { BUSINESS_CONFIG, getCallTelUrl, getWhatsAppUrl, trackEvent } from '../config/businessConfig';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onScrollToFurniture: () => void;
}

export function Hero({ onOpenQuoteModal, onScrollToFurniture }: HeroProps) {
  const handleCall = () => {
    trackEvent('call_click', { source: 'hero' });
    window.location.href = getCallTelUrl();
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'hero' });
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-neutral-950">
      {/* Background Graphic & Texture */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=2000&q=80"
          alt="Boss Gee Furniture Workshop Steel and Wood Craftsmanship"
          className="w-full h-full object-cover object-center opacity-25 filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(180,83,9,0.25),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Brand Tag / Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-amber-600/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-inner backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>BOSS GEE FURNITURE • ZIMBABWE</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-300 font-normal">STEEL & WOOD SPECIALISTS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[1.08] mb-6">
            BUILT STRONG.{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-200 bg-clip-text text-transparent">
              CRAFTED TO LAST.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-2xl font-semibold text-neutral-200 max-w-3xl mx-auto mb-4 leading-snug">
            {BUSINESS_CONFIG.SUBHEADLINE}
          </p>

          {/* Supporting text */}
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {BUSINESS_CONFIG.SUPPORTING_TEXT}
          </p>

          {/* 4 Hero Conversion Buttons as requested */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {/* GET A QUOTE */}
            <button
              onClick={() => {
                trackEvent('quote_request', { source: 'hero_primary' });
                onOpenQuoteModal();
              }}
              className="group relative flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm tracking-wider uppercase bg-amber-600 hover:bg-amber-500 text-neutral-950 shadow-xl shadow-amber-600/25 transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              <FileText className="w-4 h-4 text-neutral-950" />
              <span>GET A QUOTE</span>
            </button>

            {/* VIEW FURNITURE */}
            <button
              onClick={() => {
                trackEvent('page_view', { target: 'catalogue' });
                onScrollToFurniture();
              }}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm tracking-wider uppercase bg-neutral-900/90 hover:bg-neutral-800 text-neutral-100 border border-neutral-700 hover:border-neutral-500 shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>VIEW FURNITURE</span>
            </button>

            {/* CALL NOW */}
            <a
              href={getCallTelUrl()}
              onClick={handleCall}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm tracking-wider uppercase bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-emerald-500/60 shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0 group"
            >
              <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>CALL NOW</span>
            </a>

            {/* WHATSAPP US */}
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm tracking-wider uppercase bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-600 hover:border-emerald-400 shadow-xl shadow-emerald-950/40 transition-all transform hover:-translate-y-1 active:translate-y-0 group"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>WHATSAPP US</span>
            </button>
          </div>

          {/* Quick Contact & Direct Phone Notice */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Direct Workshop Line: <strong className="text-neutral-200">{BUSINESS_CONFIG.PHONE}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Heavy-Duty Steel & Solid Hardwood Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
