import React, { useState } from 'react';
import { X, Monitor, Download, Laptop, Check, Phone, MessageSquare, ArrowUpRight, FileText, Terminal, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG, getCallTelUrl, getWhatsAppUrl, trackEvent } from '../config/businessConfig';
import { useToast } from '../context/ToastContext';

interface PcAppModalProps {
  onClose: () => void;
  onOpenQuote: () => void;
  onOpenWebsite: () => void;
}

export function PcAppModal({ onClose, onOpenQuote, onOpenWebsite }: PcAppModalProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'buildGuide'>('overview');

  const isDownloadConfigured = !!(BUSINESS_CONFIG.PC_APP_DOWNLOAD_URL && BUSINESS_CONFIG.PC_APP_DOWNLOAD_URL.trim());

  const handleDownload = () => {
    trackEvent('app_download_click', { platform: 'windows_pc_modal' });
    if (isDownloadConfigured) {
      window.open(BUSINESS_CONFIG.PC_APP_DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
    } else {
      showToast('PC APP COMING SOON - Download URL being finalized', 'info');
    }
  };

  const handleCall = () => {
    trackEvent('call_click', { source: 'pc_app_modal' });
    window.location.href = getCallTelUrl();
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'pc_app_modal' });
    const msg = 'Hello Boss Gee Furniture, I am inquiring about the Windows PC Desktop App and furniture catalogue.';
    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-500">
              <Monitor className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                BOSS GEE FURNITURE PC APP
              </h3>
              <p className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                Official Windows Desktop Application • v{BUSINESS_CONFIG.APP_VERSION}
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

        {/* Tab switch */}
        <div className="px-6 pt-3 flex gap-2 border-b border-neutral-800/80 bg-neutral-950/30">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-amber-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Application Overview
          </button>
          <button
            onClick={() => setActiveTab('buildGuide')}
            className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'buildGuide'
                ? 'border-amber-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Windows Installer & Build Setup
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'overview' ? (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Windows 10 / 11 Compatible
                    </span>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mt-2">
                      Installer & Portable Executable
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                      Install the standalone Boss Gee Furniture desktop program directly onto your PC for full offline-ready access to our furniture catalogue, instant quotation generation, and direct workshop communication.
                    </p>
                  </div>
                </div>

                {/* PC App Nav items as specified in prompt */}
                <div className="mt-4 pt-4 border-t border-neutral-800">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block mb-2">
                    Integrated PC App Navigation:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-neutral-300">
                    {['HOME', 'FURNITURE', 'STEEL', 'WOOD', 'CHAIRS', 'TABLES', 'BEDS', 'CUSTOM ORDER', 'GALLERY', 'CONTACT'].map((nav) => (
                      <span key={nav} className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800">
                        {nav}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Windows Installer: <code className="text-amber-400">{BUSINESS_CONFIG.INSTALLER_NAME}</code></span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Portable Executable: <code className="text-amber-400">{BUSINESS_CONFIG.PORTABLE_NAME}</code></span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Offline-ready catalogue caching</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct VoIP call & WhatsApp routing</span>
                </div>
              </div>

              {/* Status & Download Action */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-white block">
                    {isDownloadConfigured ? 'Direct Installer Ready' : 'Download Link Configuration'}
                  </span>
                  <p className="text-[11px] text-neutral-400">
                    {isDownloadConfigured
                      ? `Click below to download ${BUSINESS_CONFIG.INSTALLER_NAME}`
                      : 'Real download URL will be activated when published to release server.'}
                  </p>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloadConfigured ? 'DOWNLOAD WINDOWS INSTALLER' : 'PC APP COMING SOON'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Build Guide Tab */
            <div className="space-y-4 text-xs text-neutral-300">
              <p className="text-neutral-400 leading-relaxed">
                This project has been pre-configured with complete Electron <code>main.cjs</code>, <code>preload.cjs</code>, and <code>electron-builder.json</code> configs to build the official Windows binary.
              </p>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Terminal className="w-4 h-4" />
                  <span>Terminal Build Commands:</span>
                </div>
                <div className="p-3 bg-neutral-900 rounded-lg text-emerald-400 overflow-x-auto">
                  <code># 1. Compile web assets</code><br />
                  <code>npm run build</code><br /><br />
                  <code># 2. Package Windows Installer & Portable EXE</code><br />
                  <code>npm run build:win</code>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-1 text-[11px]">
                <strong className="text-white block">Output Artifacts:</strong>
                <p>• <code>dist-electron/{BUSINESS_CONFIG.INSTALLER_NAME}</code> (NSIS Installer with Start Menu & Desktop Shortcut)</p>
                <p>• <code>dist-electron/{BUSINESS_CONFIG.PORTABLE_NAME}</code> (Standalone portable executable without setup)</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Quick Actions as required: CALL NOW, WHATSAPP, VISIT WEBSITE, REQUEST QUOTE */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* CALL NOW */}
          <button
            onClick={handleCall}
            className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider border border-neutral-700 flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>CALL NOW</span>
          </button>

          {/* WHATSAPP */}
          <button
            onClick={handleWhatsApp}
            className="p-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-700 flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WHATSAPP</span>
          </button>

          {/* VISIT WEBSITE */}
          <button
            onClick={onOpenWebsite}
            className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold text-xs uppercase tracking-wider border border-neutral-700 flex items-center justify-center gap-1.5"
          >
            <span>WEBSITE</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {/* REQUEST QUOTE */}
          <button
            onClick={() => {
              onClose();
              onOpenQuote();
            }}
            className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>QUOTE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
