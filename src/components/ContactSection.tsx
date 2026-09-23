import React from 'react';
import { Phone, MessageSquare, FileText, MapPin, Mail, Clock, Share2, Shield, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG, getCallTelUrl, getWhatsAppUrl, trackEvent } from '../config/businessConfig';

interface ContactSectionProps {
  onOpenQuoteModal: () => void;
}

export function ContactSection({ onOpenQuoteModal }: ContactSectionProps) {
  const handleCall = () => {
    trackEvent('call_click', { source: 'contact_section' });
    window.location.href = getCallTelUrl();
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'contact_section' });
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
            DIRECT WORKSHOP INQUIRIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-4 mb-3">
            LET'S BUILD YOUR NEXT PIECE.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Get in touch directly with Boss Gee Furniture. Whether you need standard items or a bespoke architectural piece, we are ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Business Contact Card */}
          <div className="lg:col-span-7 bg-neutral-900/90 rounded-3xl p-8 sm:p-10 border border-neutral-800 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-neutral-950 font-black text-xl border border-amber-500/40 shadow-lg">
                  BG
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider">
                    {BUSINESS_CONFIG.COMPANY_NAME}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold tracking-wide">
                    {BUSINESS_CONFIG.TAGLINE}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 mb-8 space-y-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                  Official Business & Owner Phone:
                </span>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-wider font-mono">
                  {BUSINESS_CONFIG.PHONE}
                </p>
                <p className="text-xs text-emerald-400 font-medium">
                  • Active on Direct Calling & WhatsApp Messaging
                </p>
              </div>

              {/* 3 Required Contact Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* CALL NOW */}
                <a
                  href={getCallTelUrl()}
                  onClick={handleCall}
                  className="py-4 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-emerald-500/60 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 group"
                >
                  <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>CALL NOW</span>
                </a>

                {/* WHATSAPP */}
                <button
                  onClick={handleWhatsApp}
                  className="py-4 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-600 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 group"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>WHATSAPP</span>
                </button>

                {/* REQUEST A QUOTE */}
                <button
                  onClick={() => {
                    trackEvent('quote_request', { source: 'contact_section_cta' });
                    onOpenQuoteModal();
                  }}
                  className="py-4 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>REQUEST A QUOTE</span>
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
              <span>Rapid response across Harare, Bulawayo & throughout Zimbabwe.</span>
              <span className="font-mono text-amber-500">Fast Turnaround</span>
            </div>
          </div>

          {/* Business Details with Editable Placeholders as required by prompt */}
          <div className="lg:col-span-5 bg-neutral-900/60 rounded-3xl p-8 sm:p-10 border border-neutral-800 flex flex-col justify-between space-y-6">
            <div>
              <h4 className="text-lg font-black text-white uppercase tracking-tight mb-6">
                Workshop & Operation Details
              </h4>

              <div className="space-y-4">
                {/* Business Address placeholder */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Business Address
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 mt-0.5 font-medium">
                      {BUSINESS_CONFIG.ADDRESS || 'Harare / Zimbabwe Workshop Location (Configurable in Central Config)'}
                    </p>
                  </div>
                </div>

                {/* Email placeholder */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Email Inquiries
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 mt-0.5 font-medium">
                      {BUSINESS_CONFIG.EMAIL || 'sales@bossgeefurniture.co.zw (Configurable in Central Config)'}
                    </p>
                  </div>
                </div>

                {/* Opening Hours placeholder */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Opening Hours
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 mt-0.5 font-medium">
                      {BUSINESS_CONFIG.OPENING_HOURS || 'Monday – Saturday: 8:00 AM – 5:30 PM (Configurable in Central Config)'}
                    </p>
                  </div>
                </div>

                {/* Social Media placeholder */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80">
                  <Share2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Social Media Channels
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 mt-0.5 font-medium">
                      Facebook, Instagram & TikTok channels (Configurable in Central Config)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-neutral-950/90 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
              <strong className="text-white block mb-0.5">Custom Commissions Welcome</strong>
              Send pictures of existing spaces or design sketches directly to our phone or WhatsApp for quick evaluation.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
