import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Monitor, Shield, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG, getCallTelUrl, getWhatsAppUrl, trackEvent } from '../config/businessConfig';
import { useToast } from '../context/ToastContext';

interface HeaderProps {
  onOpenQuoteModal: (category?: string) => void;
  onOpenPcAppModal: () => void;
  onOpenWebsiteModal: () => void;
  onSelectCategory: (category: string) => void;
}

export function Header({
  onOpenQuoteModal,
  onOpenPcAppModal,
  onOpenWebsiteModal,
  onSelectCategory,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, categoryFilter?: string) => {
    setMobileMenuOpen(false);
    if (categoryFilter) {
      onSelectCategory(categoryFilter);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleCall = () => {
    trackEvent('call_click', { source: 'header' });
    window.location.href = getCallTelUrl();
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'header' });
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleVisitWebsite = () => {
    trackEvent('website_click', { source: 'header' });
    if (BUSINESS_CONFIG.WEBSITE_URL && BUSINESS_CONFIG.WEBSITE_URL.trim() !== '') {
      window.open(BUSINESS_CONFIG.WEBSITE_URL, '_blank', 'noopener,noreferrer');
    } else {
      showToast('Website link coming soon', 'info');
      onOpenWebsiteModal();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl py-3'
          : 'bg-neutral-950/75 backdrop-blur-sm border-b border-neutral-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
            aria-label="Boss Gee Furniture Home"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg shadow-amber-900/30 border border-amber-500/40 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-neutral-950 text-xl tracking-tighter">BG</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-wider text-white uppercase font-sans">
                  BOSS GEE
                </span>
                <span className="text-amber-500 font-bold text-xs tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  FURNITURE
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-medium tracking-wider hidden sm:block uppercase">
                Steel & Wood Specialist • Zimbabwe
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5 text-xs font-semibold tracking-wider text-neutral-300">
            <button
              onClick={() => handleNavClick('home')}
              className="px-2.5 py-1.5 rounded hover:text-white hover:bg-neutral-800/60 transition-colors uppercase"
            >
              HOME
            </button>
            <button
              onClick={() => handleNavClick('furniture')}
              className="px-2.5 py-1.5 rounded hover:text-white hover:bg-neutral-800/60 transition-colors uppercase"
            >
              FURNITURE
            </button>
            <button
              onClick={() => handleNavClick('steel')}
              className="px-2.5 py-1.5 rounded hover:text-amber-400 hover:bg-neutral-800/60 transition-colors uppercase"
            >
              STEEL
            </button>
            <button
              onClick={() => handleNavClick('wood')}
              className="px-2.5 py-1.5 rounded hover:text-amber-400 hover:bg-neutral-800/60 transition-colors uppercase"
            >
              WOOD
            </button>
            <button
              onClick={() => handleNavClick('furniture', 'chairs')}
              className="px-2.5 py-1.5 rounded hover:text-white hover:bg-neutral-800/60 transition-colors uppercase"
            >
              CHAIRS
            </button>
            <button
              onClick={() => handleNavClick('furniture', 'tables')}
              className="px-2.5 py-1.5 rounded hover:text-white hover:bg-neutral-800/60 transition-colors uppercase"
            >
              TABLES
            </button>
            <button
              onClick={() => handleNavClick('furniture', 'beds')}
              className="px-2.5 py-1.5 rounded hover:text-white hover:bg-neutral-800/60 transition-colors uppercase"
            >
              BEDS
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="px-2.5 py-1.5 rounded hover:text-white hover:bg-neutral-800/60 transition-colors uppercase"
            >
              GALLERY
            </button>
            <button
              onClick={() => handleNavClick('custom-orders')}
              className="px-2.5 py-1.5 rounded hover:text-amber-400 hover:bg-neutral-800/60 transition-colors uppercase"
            >
              CUSTOM ORDERS
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="px-2.5 py-1.5 rounded hover:text-white hover:bg-neutral-800/60 transition-colors uppercase"
            >
              ABOUT
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-2.5 py-1.5 rounded hover:text-white hover:bg-neutral-800/60 transition-colors uppercase"
            >
              CONTACT
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Visit Website link */}
            <button
              onClick={handleVisitWebsite}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white transition-all flex items-center gap-1"
              title="Visit official website"
            >
              <span>VISIT WEBSITE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* PC App button */}
            <button
              onClick={onOpenPcAppModal}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700/80 hover:border-amber-600/50 text-neutral-300 hover:text-amber-400 transition-all flex items-center gap-1.5 shadow-sm"
              title="Windows PC Desktop Application"
            >
              <Monitor className="w-3.5 h-3.5 text-amber-500" />
              <span>PC APP</span>
            </button>

            {/* Quick Call */}
            <a
              href={getCallTelUrl()}
              onClick={() => trackEvent('call_click', { source: 'header_icon' })}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white transition-colors"
              title={`Call ${BUSINESS_CONFIG.PHONE}`}
              aria-label="Call Boss Gee"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
            </a>

            {/* Quick WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-700/50 hover:border-emerald-500 text-emerald-400 hover:text-emerald-300 transition-colors"
              title={`WhatsApp ${BUSINESS_CONFIG.PHONE}`}
              aria-label="WhatsApp Boss Gee"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            {/* Primary CTA: GET A QUOTE */}
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider bg-amber-600 hover:bg-amber-500 text-neutral-950 shadow-md shadow-amber-600/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              GET A QUOTE
            </button>
          </div>

          {/* Mobile Right Controls: Hamburger + Quote */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider bg-amber-600 text-neutral-950 shadow-sm"
            >
              QUOTE
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-neutral-950/98 border-b border-neutral-800 px-5 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold tracking-wider">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200"
            >
              HOME
            </button>
            <button
              onClick={() => handleNavClick('furniture')}
              className="text-left px-3 py-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200"
            >
              FURNITURE
            </button>
            <button
              onClick={() => handleNavClick('steel')}
              className="text-left px-3 py-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-amber-400 font-bold"
            >
              STEEL FURNITURE
            </button>
            <button
              onClick={() => handleNavClick('wood')}
              className="text-left px-3 py-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-amber-400 font-bold"
            >
              WOOD FURNITURE
            </button>
            <button
              onClick={() => handleNavClick('furniture', 'chairs')}
              className="text-left px-3 py-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200"
            >
              CHAIRS
            </button>
            <button
              onClick={() => handleNavClick('furniture', 'tables')}
              className="text-left px-3 py-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200"
            >
              TABLES
            </button>
            <button
              onClick={() => handleNavClick('furniture', 'beds')}
              className="text-left px-3 py-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200"
            >
              BEDS
            </button>
            <button
              onClick={() => handleNavClick('furniture', 'sofas')}
              className="text-left px-3 py-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200"
            >
              SOFAS
            </button>
            <button
              onClick={() => handleNavClick('custom-orders')}
              className="text-left px-3 py-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-amber-300 font-bold col-span-2"
            >
              CUSTOM ORDERS (YOUR IDEA)
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="text-left px-3 py-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200"
            >
              GALLERY
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left px-3 py-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200"
            >
              ABOUT US
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left px-3 py-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200 col-span-2"
            >
              CONTACT
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-800/80 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCall}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-bold text-xs"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>CALL NOW</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-950/80 border border-emerald-600 text-emerald-300 font-bold text-xs"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WHATSAPP</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPcAppModal();
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 font-semibold text-xs"
              >
                <Monitor className="w-4 h-4 text-amber-500" />
                <span>PC DESKTOP APP</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleVisitWebsite();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 font-semibold text-xs"
              >
                <span>VISIT WEBSITE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-sm tracking-wider uppercase text-center shadow-lg shadow-amber-600/20"
            >
              REQUEST A QUOTE
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
