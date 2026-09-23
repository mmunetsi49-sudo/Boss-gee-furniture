import React from 'react';
import { Download, Monitor, Smartphone, Check, Sparkles, AlertCircle, Laptop, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG, trackEvent } from '../config/businessConfig';
import { useToast } from '../context/ToastContext';

interface AppDownloadSectionProps {
  onOpenPcAppModal: () => void;
  onOpenAndroidModal: () => void;
}

export function AppDownloadSection({ onOpenPcAppModal, onOpenAndroidModal }: AppDownloadSectionProps) {
  const { showToast } = useToast();

  const handleDownloadPcApp = () => {
    trackEvent('app_download_click', { platform: 'windows_pc' });
    if (BUSINESS_CONFIG.PC_APP_DOWNLOAD_URL && BUSINESS_CONFIG.PC_APP_DOWNLOAD_URL.trim() !== '') {
      window.open(BUSINESS_CONFIG.PC_APP_DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
    } else {
      showToast('PC APP COMING SOON', 'info');
      onOpenPcAppModal();
    }
  };

  const handleGooglePlay = () => {
    trackEvent('app_download_click', { platform: 'android' });
    if (BUSINESS_CONFIG.ANDROID_APP_URL && BUSINESS_CONFIG.ANDROID_APP_URL.trim() !== '') {
      window.open(BUSINESS_CONFIG.ANDROID_APP_URL, '_blank', 'noopener,noreferrer');
    } else {
      showToast('Android Google Play release coming soon', 'info');
      onOpenAndroidModal();
    }
  };

  const isPcUrlConfigured = !!(BUSINESS_CONFIG.PC_APP_DOWNLOAD_URL && BUSINESS_CONFIG.PC_APP_DOWNLOAD_URL.trim());

  return (
    <section id="app" className="py-24 bg-neutral-950 border-b border-neutral-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 rounded-3xl border border-neutral-800 p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
                <Monitor className="w-3.5 h-3.5" />
                <span>CROSS-PLATFORM DESKTOP & MOBILE SUITE</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                GET THE BOSS GEE FURNITURE APP
              </h2>

              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                Install the Boss Gee Furniture app on your computer for quick access to our furniture catalogue, quotations and contact options.
              </p>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Instant Desktop Windows Access',
                  'Offline-Ready Furniture Catalogue',
                  'Direct 1-Click WhatsApp & Calling',
                  'Fast Quotation & Custom Orders',
                  'Windows 10 & 11 Optimized (Installer & Portable)',
                  'Shared Inventory & Real-Time Updates',
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons: DOWNLOAD PC APP & GET IT ON GOOGLE PLAY */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                {/* Main button: DOWNLOAD PC APP */}
                <button
                  onClick={handleDownloadPcApp}
                  className="px-6 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-neutral-950" />
                  <span>{isPcUrlConfigured ? 'DOWNLOAD PC APP' : 'PC APP COMING SOON'}</span>
                </button>

                {/* Additional button: GET IT ON GOOGLE PLAY */}
                <button
                  onClick={handleGooglePlay}
                  className="px-6 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-100 border border-neutral-700 hover:border-neutral-500 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>GET IT ON GOOGLE PLAY</span>
                </button>
              </div>

              {/* Notice for packaging details */}
              <div className="pt-2">
                <button
                  onClick={onOpenPcAppModal}
                  className="text-xs text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 underline underline-offset-4"
                >
                  <span>Explore Windows Installer (.exe) specifications & Desktop Simulator</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Right Graphic: Mockup of Windows PC Desktop Frame */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl p-4 overflow-hidden">
                {/* Windows Window Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 font-mono text-[11px] text-neutral-300">
                      Boss Gee Furniture - Desktop v1.0.0
                    </span>
                  </div>
                  <span className="text-[10px] bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 text-amber-400">
                    Windows PC
                  </span>
                </div>

                {/* App Content Preview */}
                <div className="space-y-3">
                  <div className="h-36 rounded-xl overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=700&q=80"
                      alt="Boss Gee PC Desktop Preview"
                      className="w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <p className="text-xs font-black text-white uppercase">BOSS GEE WORKSHOP</p>
                      <p className="text-[10px] text-amber-400">Full Catalogue & Instant Quotations</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                      <span className="text-neutral-400 block text-[9px] uppercase font-bold">Catalog</span>
                      <strong className="text-white">Steel & Wood Models</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                      <span className="text-neutral-400 block text-[9px] uppercase font-bold">Direct Line</span>
                      <strong className="text-emerald-400">+263 78 539 3849</strong>
                    </div>
                  </div>

                  <button
                    onClick={onOpenPcAppModal}
                    className="w-full py-2.5 rounded-lg bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-neutral-950 border border-amber-600/40 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Open Windows PC App Hub</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
