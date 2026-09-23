import React from 'react';
import { X, Globe, Phone, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG, getCallTelUrl, getWhatsAppUrl, trackEvent } from '../config/businessConfig';

interface WebsiteModalProps {
  onClose: () => void;
  onOpenQuote: () => void;
}

export function WebsiteModal({ onClose, onOpenQuote }: WebsiteModalProps) {
  const isUrlConfigured = !!(BUSINESS_CONFIG.WEBSITE_URL && BUSINESS_CONFIG.WEBSITE_URL.trim());

  const handleLaunch = () => {
    trackEvent('website_click', { source: 'website_modal' });
    if (isUrlConfigured) {
      window.open(BUSINESS_CONFIG.WEBSITE_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'website_modal' });
    const msg = 'Hello Boss Gee Furniture, I am browsing your furniture catalogue and would like more information.';
    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    trackEvent('call_click', { source: 'website_modal' });
    window.location.href = getCallTelUrl();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                Official Website
              </h3>
              <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                Boss Gee Furniture • Zimbabwe
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-center">
          {isUrlConfigured ? (
            <div className="space-y-4">
              <p className="text-sm text-neutral-300">
                You are about to visit the official Boss Gee Furniture website at:
              </p>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 font-mono text-sm text-amber-400 break-all">
                {BUSINESS_CONFIG.WEBSITE_URL}
              </div>
              <button
                onClick={handleLaunch}
                className="w-full py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                OPEN WEBSITE NOW
              </button>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
                <Globe className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-black text-white uppercase tracking-tight">
                Website link coming soon
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm mx-auto">
                The official custom domain link is currently being connected in <code>src/config/businessConfig.ts</code>.
                In the meantime, you can browse all furniture, request quotes, or contact Boss Gee directly.
              </p>
            </div>
          )}

          {/* Quick contact options */}
          <div className="pt-4 border-t border-neutral-800 space-y-2">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
              Direct Contact Options:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleWhatsApp}
                className="py-3 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-600 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </button>
              <a
                href={getCallTelUrl()}
                onClick={handleCall}
                className="py-3 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white border border-neutral-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
