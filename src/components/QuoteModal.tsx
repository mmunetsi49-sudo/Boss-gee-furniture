import React from 'react';
import { X, FileText } from 'lucide-react';
import { QuoteFormSection, QuoteFormData } from './QuoteFormSection';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<QuoteFormData>;
}

export function QuoteModal({ isOpen, onClose, initialData }: QuoteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-500">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                REQUEST A FURNITURE QUOTE
              </h3>
              <p className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                Direct Workshop Estimates • Boss Gee Furniture
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

        {/* Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          <QuoteFormSection initialData={initialData} />
        </div>
      </div>
    </div>
  );
}
