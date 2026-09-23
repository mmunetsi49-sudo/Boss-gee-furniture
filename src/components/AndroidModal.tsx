import React from 'react';
import { X, Smartphone, Check, MessageSquare, Phone, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';
import { BUSINESS_CONFIG, getCallTelUrl, getWhatsAppUrl, trackEvent } from '../config/businessConfig';

interface AndroidModalProps {
  onClose: () => void;
  onOpenQuote: () => void;
}

export function AndroidModal({ onClose, onOpenQuote }: AndroidModalProps) {
  const isAndroidConfigured = !!(BUSINESS_CONFIG.ANDROID_APP_URL && BUSINESS_CONFIG.ANDROID_APP_URL.trim());

  const handleLaunch = () => {
    trackEvent('app_download_click', { platform: 'android_modal' });
    if (isAndroidConfigured) {
      window.open(BUSINESS_CONFIG.ANDROID_APP_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'android_modal' });
    const msg = 'Hello Boss Gee Furniture, I am inquiring about your Android mobile app and furniture catalogue.';
    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                Google Play Store Architecture
              </h3>
              <p className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">
                Boss Gee Mobile App (Android / Capacitor)
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

        <div className="space-y-6">
          {isAndroidConfigured ? (
            <div className="space-y-4 text-center">
              <p className="text-sm text-neutral-300">
                Opening Boss Gee Furniture on Google Play Store:
              </p>
              <button
                onClick={handleLaunch}
                className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg"
              >
                VIEW ON GOOGLE PLAY STORE
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Google Play Publishing Ready
                </span>
                <h4 className="text-lg font-black text-white uppercase tracking-tight mt-2">
                  Android App Architecture Configured
                </h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  The project contains complete <code>capacitor.config.json</code>, cross-platform assets, and shared catalogue architecture ready to be packaged into an Android App Bundle (<code>.aab</code>) for Google Play release.
                </p>
              </div>

              <div className="space-y-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Package ID: <code className="text-amber-400 font-mono">com.bossgee.furniture</code></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Shares exact same furniture catalogue, WhatsApp, & Call systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Update <code className="text-amber-400 font-mono">ANDROID_APP_URL</code> in central config when live</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick buttons */}
          <div className="pt-4 border-t border-neutral-800 grid grid-cols-2 gap-2">
            <button
              onClick={handleWhatsApp}
              className="py-3 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-600 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Contact via WhatsApp</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="py-3 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
            >
              <span>Request Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
