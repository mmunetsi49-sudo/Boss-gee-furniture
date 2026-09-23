import React, { useState } from 'react';
import { Upload, ArrowRight, CheckCircle2, FileImage, Sparkles, MessageSquare, Trash2 } from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppUrl, trackEvent } from '../config/businessConfig';
import { useToast } from '../context/ToastContext';

interface CustomFurnitureSectionProps {
  onStartCustomOrder: (initialData?: { description?: string; referenceImage?: string | null }) => void;
}

const CUSTOM_STEPS = [
  {
    num: '01',
    title: 'SEND YOUR IDEA',
    desc: 'Share a photo, sketch, screenshot from Pinterest, or exact room measurements.',
  },
  {
    num: '02',
    title: 'DISCUSS YOUR DESIGN',
    desc: 'We review timber species, steel profile thicknesses, finishes, and functional needs with you.',
  },
  {
    num: '03',
    title: 'RECEIVE YOUR QUOTE',
    desc: 'Get an honest, itemized quotation directly from our workshop with transparent timelines.',
  },
  {
    num: '04',
    title: 'WE BUILD IT',
    desc: 'Our craftsmen cut, weld, plane, sand, and finish your piece to exact perfection.',
  },
];

export function CustomFurnitureSection({ onStartCustomOrder }: CustomFurnitureSectionProps) {
  const [quickIdea, setQuickIdea] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const { showToast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('File size must be under 5MB', 'warning');
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        showToast('Reference picture attached!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLaunchCustomOrder = () => {
    trackEvent('quote_request', { type: 'custom_section_start' });
    onStartCustomOrder({
      description: quickIdea,
      referenceImage: uploadedImage,
    });
  };

  const handleCustomWhatsApp = () => {
    trackEvent('whatsapp_click', { type: 'custom_idea' });
    const msg = `Hello Boss Gee Furniture, I have a custom furniture idea I would like to build. ${quickIdea ? `Details: ${quickIdea}` : 'Can I send you a picture and measurements for quotation?'}`;
    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="custom-orders" className="py-24 bg-neutral-950 text-neutral-100 relative overflow-hidden border-b border-neutral-900">
      {/* Decorative background lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
            BESPOKE WORKSHOP COMMISSIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-4 mb-4">
            YOUR IDEA. OUR CRAFTSMANSHIP.
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
            Have your own design or measurements? Send us your idea and let Boss Gee Furniture turn it into a finished piece.
          </p>
        </div>

        {/* 4 Steps as required */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CUSTOM_STEPS.map((step) => (
            <div
              key={step.num}
              className="relative p-6 sm:p-7 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-600/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-black text-amber-500/30 group-hover:text-amber-500/60 transition-colors tracking-tight font-mono block mb-3">
                  {step.num}
                </span>
                <h3 className="text-base sm:text-lg font-black text-white tracking-wide uppercase mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">
                  Step {step.num}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-neutral-600 group-hover:text-amber-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Custom Order Quick Launch Box */}
        <div className="max-w-3xl mx-auto bg-neutral-900 rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
                Describe Your Idea or Required Measurements:
              </label>
              <textarea
                rows={3}
                value={quickIdea}
                onChange={(e) => setQuickIdea(e.target.value)}
                placeholder="Example: I need a 2.4-meter solid Mukwa table with black steel X-frame legs for an 8-seater dining room in Harare..."
                className="w-full p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
              />
            </div>

            {/* Reference Picture Upload */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Attach Reference Picture or Sketch:
                </label>
                {uploadedImage && (
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setFileName('');
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear Image</span>
                  </button>
                )}
              </div>

              {uploadedImage ? (
                <div className="flex items-center gap-4 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                  <img
                    src={uploadedImage}
                    alt="Custom design preview"
                    className="w-16 h-16 object-cover rounded-lg border border-neutral-700"
                  />
                  <div className="flex-1 truncate">
                    <p className="text-xs font-bold text-white truncate">{fileName}</p>
                    <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ready to attach to quote</span>
                    </p>
                  </div>
                </div>
              ) : (
                <label className="border-2 border-dashed border-neutral-700 hover:border-amber-500/70 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-neutral-950/50 hover:bg-neutral-950 transition-colors group">
                  <Upload className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform mb-2" />
                  <span className="text-xs font-semibold text-neutral-200">
                    Click to browse and upload reference picture
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-1">
                    Supports JPG, PNG, WEBP (Max 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Launch Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleLaunchCustomOrder}
                className="w-full py-4 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>START CUSTOM ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleCustomWhatsApp}
                className="w-full py-4 px-6 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-600 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>DISCUSS VIA WHATSAPP</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
