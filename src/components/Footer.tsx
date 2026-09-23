import React from 'react';
import { Phone, MessageSquare, Monitor, Smartphone, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG, getCallTelUrl, getWhatsAppUrl, trackEvent } from '../config/businessConfig';
import { useToast } from '../context/ToastContext';

interface FooterProps {
  onOpenPcAppModal: () => void;
  onOpenAndroidModal: () => void;
  onOpenWebsiteModal: () => void;
  onSelectCategory: (category: string) => void;
}

export function Footer({
  onOpenPcAppModal,
  onOpenAndroidModal,
  onOpenWebsiteModal,
  onSelectCategory,
}: FooterProps) {
  const { showToast } = useToast();

  const scrollTo = (id: string, categoryFilter?: string) => {
    if (categoryFilter) {
      onSelectCategory(categoryFilter);
    }
    const elem = document.getElementById(id);
    if (elem) {
      const offset = 80;
      const pos = elem.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const handleCall = () => {
    trackEvent('call_click', { source: 'footer' });
    window.location.href = getCallTelUrl();
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'footer' });
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleVisitWebsite = () => {
    trackEvent('website_click', { source: 'footer' });
    if (BUSINESS_CONFIG.WEBSITE_URL && BUSINESS_CONFIG.WEBSITE_URL.trim() !== '') {
      window.open(BUSINESS_CONFIG.WEBSITE_URL, '_blank', 'noopener,noreferrer');
    } else {
      showToast('Website link coming soon', 'info');
      onOpenWebsiteModal();
    }
  };

  const handleDownloadPcApp = () => {
    trackEvent('app_download_click', { platform: 'windows_pc', source: 'footer' });
    if (BUSINESS_CONFIG.PC_APP_DOWNLOAD_URL && BUSINESS_CONFIG.PC_APP_DOWNLOAD_URL.trim() !== '') {
      window.open(BUSINESS_CONFIG.PC_APP_DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
    } else {
      showToast('PC APP COMING SOON', 'info');
      onOpenPcAppModal();
    }
  };

  const handleGooglePlay = () => {
    trackEvent('app_download_click', { platform: 'android', source: 'footer' });
    if (BUSINESS_CONFIG.ANDROID_APP_URL && BUSINESS_CONFIG.ANDROID_APP_URL.trim() !== '') {
      window.open(BUSINESS_CONFIG.ANDROID_APP_URL, '_blank', 'noopener,noreferrer');
    } else {
      showToast('Android Google Play release coming soon', 'info');
      onOpenAndroidModal();
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 pt-16 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-neutral-950 font-black text-lg border border-amber-500/40 shadow-lg">
                BG
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-wider">
                  {BUSINESS_CONFIG.COMPANY_NAME}
                </h3>
                <p className="text-xs text-amber-500 font-semibold tracking-wide">
                  "{BUSINESS_CONFIG.MAIN_HEADLINE}"
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Zimbabwe's specialist in heavy-duty steel furniture and timeless solid hardwood carpentry.
              Chairs, tables, beds, sofas, and custom designs made to last generations.
            </p>

            <div className="pt-2">
              <span className="text-xs uppercase font-bold text-neutral-400 block mb-1">
                Direct Contact Line:
              </span>
              <p className="text-lg font-black text-white font-mono">{BUSINESS_CONFIG.PHONE}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button
                  onClick={() => scrollTo('home')}
                  className="hover:text-amber-400 transition-colors uppercase"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('furniture')}
                  className="hover:text-amber-400 transition-colors uppercase"
                >
                  Furniture
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('steel')}
                  className="hover:text-amber-400 transition-colors uppercase"
                >
                  Steel Furniture
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('wood')}
                  className="hover:text-amber-400 transition-colors uppercase"
                >
                  Wood Furniture
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('gallery')}
                  className="hover:text-amber-400 transition-colors uppercase"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('custom-orders')}
                  className="hover:text-amber-400 transition-colors uppercase"
                >
                  Custom Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-amber-400 transition-colors uppercase"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="hover:text-amber-400 transition-colors uppercase"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Required Footer Action Buttons */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
              Actions & Apps
            </h4>

            <div className="grid grid-cols-2 gap-2">
              {/* CALL */}
              <a
                href={getCallTelUrl()}
                onClick={handleCall}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>CALL</span>
              </a>

              {/* WHATSAPP */}
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/80 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WHATSAPP</span>
              </button>

              {/* DOWNLOAD PC APP */}
              <button
                onClick={handleDownloadPcApp}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-amber-600/40 text-xs font-bold uppercase tracking-wider transition-colors col-span-2"
              >
                <Monitor className="w-3.5 h-3.5 text-amber-500" />
                <span>DOWNLOAD PC APP</span>
              </button>

              {/* GOOGLE PLAY */}
              <button
                onClick={handleGooglePlay}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>GOOGLE PLAY</span>
              </button>

              {/* VISIT WEBSITE */}
              <button
                onClick={handleVisitWebsite}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>VISIT WEBSITE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>
            </div>

            <p className="text-[11px] text-neutral-500">
              Crafted in Zimbabwe for local homes, offices, schools, and commercial hospitality.
            </p>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 Boss Gee Furniture. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400">Harare & Bulawayo Delivery</span>
            <span>•</span>
            <span className="hover:text-neutral-400">Custom Metal & Wood Workshop</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
