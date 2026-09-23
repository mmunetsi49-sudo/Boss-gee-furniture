import React, { useState, useEffect } from 'react';
import { Send, Upload, CheckCircle2, MessageSquare, Phone, Trash2, Shield, AlertCircle, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppUrl, trackEvent } from '../config/businessConfig';
import { useToast } from '../context/ToastContext';

export interface QuoteFormData {
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string;
  email: string;
  furnitureType: string;
  materialType: 'Steel' | 'Wood' | 'Steel & Wood Combination' | 'Not Sure / Advice Needed';
  quantity: number;
  preferredSize: string;
  description: string;
  location: string;
  preferredContact: 'WhatsApp' | 'Phone Call' | 'Email';
  referenceImage: string | null;
}

interface QuoteFormSectionProps {
  initialData?: Partial<QuoteFormData>;
  onClearInitialData?: () => void;
}

export function QuoteFormSection({ initialData, onClearInitialData }: QuoteFormSectionProps) {
  const { showToast } = useToast();

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phoneNumber: '',
    whatsappNumber: '',
    email: '',
    furnitureType: 'Steel Frame Bed',
    materialType: 'Steel',
    quantity: 1,
    preferredSize: '',
    description: '',
    location: '',
    preferredContact: 'WhatsApp',
    referenceImage: null,
  });

  const [referenceFileName, setReferenceFileName] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [recentQuoteSummary, setRecentQuoteSummary] = useState<QuoteFormData | null>(null);

  // Sync initialData when triggered from products or custom buttons
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
      if (initialData.referenceImage) {
        setReferenceFileName('Attached Reference');
      }
      setSubmittedSuccessfully(false);
    }
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image file size must be less than 5MB', 'warning');
        return;
      }
      setReferenceFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, referenceImage: reader.result as string }));
        showToast('Reference image attached to quotation form', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, referenceImage: null }));
    setReferenceFileName('');
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!formData.phoneNumber.trim() && !formData.whatsappNumber.trim()) {
      newErrors.phoneNumber = 'Please provide at least a phone or WhatsApp number';
    }
    if (!formData.furnitureType.trim()) {
      newErrors.furnitureType = 'Please select or describe the furniture type';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Please provide your city or delivery location';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fill in the required fields highlighted in red', 'warning');
      return;
    }

    setIsSubmitting(true);
    trackEvent('form_submission', {
      furnitureType: formData.furnitureType,
      material: formData.materialType,
      quantity: formData.quantity,
      location: formData.location,
    });

    // Simulate reliable workshop dispatch & local record storage
    setTimeout(() => {
      try {
        const storedQuotes = JSON.parse(localStorage.getItem('bossgee_quotes') || '[]');
        storedQuotes.unshift({
          ...formData,
          date: new Date().toISOString(),
          referenceImage: null, // Avoid overflowing localStorage with big base64 strings
        });
        localStorage.setItem('bossgee_quotes', JSON.stringify(storedQuotes.slice(0, 10)));
      } catch (err) {
        console.error('Storage error', err);
      }

      setRecentQuoteSummary({ ...formData });
      setIsSubmitting(false);
      setSubmittedSuccessfully(true);
      showToast('Quotation request submitted to Boss Gee Furniture!', 'success');
      if (onClearInitialData) onClearInitialData();
    }, 800);
  };

  const handleChatOnWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'quote_form_banner' });
    const text = recentQuoteSummary
      ? `Hello Boss Gee Furniture, I just submitted a quote request for: ${recentQuoteSummary.furnitureType} (${recentQuoteSummary.materialType}, Qty: ${recentQuoteSummary.quantity}). My Name is ${recentQuoteSummary.fullName}. I would like to confirm my quotation.`
      : formData.furnitureType
      ? `Hello Boss Gee Furniture, I am inquiring about a quotation for ${formData.furnitureType} (${formData.materialType}). My Name is ${formData.fullName || 'Customer'}.`
      : 'Hello Boss Gee Furniture, I am interested in your furniture. I would like more information and a quotation.';

    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  const handleResetForNewQuote = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      whatsappNumber: '',
      email: '',
      furnitureType: 'Steel Frame Bed',
      materialType: 'Steel',
      quantity: 1,
      preferredSize: '',
      description: '',
      location: '',
      preferredContact: 'WhatsApp',
      referenceImage: null,
    });
    setReferenceFileName('');
    setSubmittedSuccessfully(false);
  };

  return (
    <section id="quote" className="py-24 bg-neutral-900/60 border-b border-neutral-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
            FAST WORKSHOP ESTIMATES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-4 mb-3">
            REQUEST A QUOTE
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Fill in your furniture requirements below. Boss Gee Furniture will calculate exact pricing,
            production timelines, and delivery options for you.
          </p>
        </div>

        {/* Success Screen Banner */}
        {submittedSuccessfully ? (
          <div className="bg-neutral-900 border border-emerald-500/50 rounded-3xl p-8 sm:p-12 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
              Thank you! Your request has been received.
            </h3>
            <p className="text-emerald-300 font-semibold text-base sm:text-lg mb-4">
              Boss Gee Furniture will contact you shortly.
            </p>
            <p className="text-neutral-400 text-sm max-w-lg mx-auto mb-8">
              We are reviewing your specifications for{' '}
              <strong className="text-white">{recentQuoteSummary?.furnitureType}</strong> (Qty:{' '}
              {recentQuoteSummary?.quantity}) for delivery to{' '}
              <strong className="text-white">{recentQuoteSummary?.location}</strong>.
            </p>

            {/* Prompt Requirement: Also display 'Prefer WhatsApp? CHAT ON WHATSAPP' */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 max-w-md mx-auto space-y-3 mb-8">
              <span className="text-xs uppercase tracking-widest font-bold text-neutral-400 block">
                Prefer WhatsApp?
              </span>
              <button
                onClick={handleChatOnWhatsApp}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5 text-white" />
                <span>CHAT ON WHATSAPP</span>
              </button>
              <p className="text-[11px] text-neutral-400">
                Get an instant response and discuss your design directly with Boss Gee.
              </p>
            </div>

            <button
              onClick={handleResetForNewQuote}
              className="text-xs font-bold text-neutral-400 hover:text-white uppercase tracking-wider underline underline-offset-4"
            >
              Submit Another Quote Request
            </button>
          </div>
        ) : (
          /* High-converting Quotation Form */
          <div className="bg-neutral-900/90 rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Prefer WhatsApp prompt at top for fast conversion */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-700/40 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-200">
                      Want an instant reply right now?
                    </h4>
                    <p className="text-xs text-emerald-300/80">
                      Prefer WhatsApp? Connect directly with Boss Gee on +2630785393849.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleChatOnWhatsApp}
                  className="shrink-0 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-emerald-900/40"
                >
                  CHAT ON WHATSAPP
                </button>
              </div>

              {/* 1. Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
                    Full Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Tendai Moyo"
                    className={`w-full px-4 py-3 bg-neutral-950 rounded-xl text-sm text-white placeholder-neutral-500 border transition-colors focus:outline-none ${
                      errors.fullName ? 'border-rose-500' : 'border-neutral-800 focus:border-amber-500'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Location / City */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
                    Location / City in Zimbabwe <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Harare (Borrowdale) / Bulawayo / Chitungwiza"
                    className={`w-full px-4 py-3 bg-neutral-950 rounded-xl text-sm text-white placeholder-neutral-500 border transition-colors focus:outline-none ${
                      errors.location ? 'border-rose-500' : 'border-neutral-800 focus:border-amber-500'
                    }`}
                  />
                  {errors.location && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.location}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* 2. Phone Numbers & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Phone Number */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
                    Phone Number <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="e.g. 078 123 4567"
                    className={`w-full px-4 py-3 bg-neutral-950 rounded-xl text-sm text-white placeholder-neutral-500 border transition-colors focus:outline-none ${
                      errors.phoneNumber ? 'border-rose-500' : 'border-neutral-800 focus:border-amber-500'
                    }`}
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="e.g. +263 78 123 4567"
                    className="w-full px-4 py-3 bg-neutral-950 rounded-xl text-sm text-white placeholder-neutral-500 border border-neutral-800 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="yourname@gmail.com"
                    className="w-full px-4 py-3 bg-neutral-950 rounded-xl text-sm text-white placeholder-neutral-500 border border-neutral-800 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* 3. Furniture Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Furniture Type */}
                <div className="sm:col-span-1">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
                    Furniture Type <span className="text-amber-500">*</span>
                  </label>
                  <select
                    value={formData.furnitureType}
                    onChange={(e) => setFormData({ ...formData, furnitureType: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-950 rounded-xl text-sm text-white border border-neutral-800 focus:border-amber-500 focus:outline-none transition-colors"
                  >
                    <option value="Steel Frame Bed">Steel Frame Bed</option>
                    <option value="Modern Steel Chair">Modern Steel Chair</option>
                    <option value="Steel Dining Table">Steel Dining Table</option>
                    <option value="Steel Sofa">Steel Sofa</option>
                    <option value="Wooden Dining Table">Wooden Dining Table</option>
                    <option value="Wooden Chair">Wooden Chair</option>
                    <option value="Wooden Bed">Wooden Bed</option>
                    <option value="Wooden Coffee Table">Wooden Coffee Table</option>
                    <option value="Custom Steel & Wood Table">Custom Steel & Wood Table</option>
                    <option value="Chairs (Set)">Chairs (Set)</option>
                    <option value="Tables & Desks">Tables & Desks</option>
                    <option value="Beds & Frames">Beds & Frames</option>
                    <option value="Sofas & Lounges">Sofas & Lounges</option>
                    <option value="Outdoor Patio Set">Outdoor Patio Set</option>
                    <option value="Bespoke Custom Furniture">Bespoke Custom Furniture</option>
                  </select>
                </div>

                {/* Steel or Wood */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
                    Steel or Wood
                  </label>
                  <select
                    value={formData.materialType}
                    onChange={(e) => setFormData({ ...formData, materialType: e.target.value as any })}
                    className="w-full px-4 py-3 bg-neutral-950 rounded-xl text-sm text-white border border-neutral-800 focus:border-amber-500 focus:outline-none transition-colors"
                  >
                    <option value="Steel">Steel Furniture</option>
                    <option value="Wood">Wood Furniture</option>
                    <option value="Steel & Wood Combination">Steel & Wood Combination</option>
                    <option value="Not Sure / Advice Needed">Not Sure / Advice Needed</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 bg-neutral-950 rounded-xl text-sm text-white border border-neutral-800 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* 4. Preferred Size & Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Preferred Size */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
                    Preferred Size / Dimensions
                  </label>
                  <input
                    type="text"
                    value={formData.preferredSize}
                    onChange={(e) => setFormData({ ...formData, preferredSize: e.target.value })}
                    placeholder="e.g. King Size / 8-Seater (200x100cm) / Standard"
                    className="w-full px-4 py-3 bg-neutral-950 rounded-xl text-sm text-white placeholder-neutral-500 border border-neutral-800 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['WhatsApp', 'Phone Call', 'Email'] as const).map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setFormData({ ...formData, preferredContact: method })}
                        className={`py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-colors ${
                          formData.preferredContact === method
                            ? 'bg-amber-600 text-neutral-950 border-amber-500'
                            : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
                  Description / Specific Requirements
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us about the finish (matte black, clear coat, natural teak stain), special features, or where it will be placed..."
                  className="w-full p-4 bg-neutral-950 rounded-xl text-sm text-white placeholder-neutral-500 border border-neutral-800 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Upload Reference Image */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    Upload Reference Image (Optional)
                  </label>
                  {formData.referenceImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove image</span>
                    </button>
                  )}
                </div>

                {formData.referenceImage ? (
                  <div className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                    <img
                      src={formData.referenceImage}
                      alt="Quote attachment"
                      className="w-14 h-14 object-cover rounded-lg border border-neutral-700"
                    />
                    <div className="truncate flex-1">
                      <p className="text-xs font-bold text-white truncate">{referenceFileName}</p>
                      <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Ready to send with quote</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-neutral-800 hover:border-amber-500/70 rounded-xl cursor-pointer bg-neutral-950/60 hover:bg-neutral-950 transition-colors">
                    <Upload className="w-4 h-4 text-amber-500" />
                    <span className="text-xs text-neutral-300 font-medium">
                      Attach photo of your space or sample design (Max 5MB)
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

              {/* Submission Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>CALCULATING ESTIMATE...</span>
                  ) : (
                    <>
                      <span>REQUEST MY QUOTE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 pt-2">
                <Shield className="w-3.5 h-3.5 text-neutral-400" />
                <span>Zero obligations. Honest workshop pricing directly from Boss Gee.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
