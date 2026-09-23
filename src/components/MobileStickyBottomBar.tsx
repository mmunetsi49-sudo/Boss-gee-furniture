import React from 'react';
import { Phone, MessageSquare, FileText } from 'lucide-react';
import { BUSINESS_CONFIG, getCallTelUrl, getWhatsAppUrl, trackEvent } from '../config/businessConfig';

interface MobileStickyBottomBarProps {
  onOpenQuote: () => void;
}

export function MobileStickyBottomBar({ onOpenQuote }: MobileStickyBottomBarProps) {
  const handleCall = () => {
    trackEvent('call_click', { source: 'mobile_sticky_bar' });
    window.location.href = getCallTelUrl();
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'mobile_sticky_bar' });
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-800 p-2.5 px-4 shadow-[0_-8px_30px_rgba(0,0,0,0.8)]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* CALL */}
        <a
          href={getCallTelUrl()}
          onClick={handleCall}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-neutral-900 border border-neutral-700/80 text-white font-bold text-[11px] uppercase tracking-wider active:scale-95 transition-transform"
          aria-label="Call Boss Gee"
        >
          <Phone className="w-5 h-5 text-emerald-400 mb-0.5" />
          <span>CALL</span>
        </a>

        {/* WHATSAPP */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-950/90 border border-emerald-600 text-emerald-300 font-bold text-[11px] uppercase tracking-wider active:scale-95 transition-transform"
          aria-label="WhatsApp Boss Gee"
        >
          <MessageSquare className="w-5 h-5 text-emerald-400 mb-0.5" />
          <span>WHATSAPP</span>
        </button>

        {/* QUOTE */}
        <button
          onClick={() => {
            trackEvent('quote_request', { source: 'mobile_sticky_bar' });
            onOpenQuote();
          }}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-amber-600 text-neutral-950 font-black text-[11px] uppercase tracking-wider active:scale-95 transition-transform shadow-md shadow-amber-600/30"
          aria-label="Request Furniture Quote"
        >
          <FileText className="w-5 h-5 text-neutral-950 mb-0.5" />
          <span>QUOTE</span>
        </button>
      </div>
    </div>
  );
}
