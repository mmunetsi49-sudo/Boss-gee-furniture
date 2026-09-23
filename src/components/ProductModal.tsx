import React, { useState } from 'react';
import { X, Phone, MessageSquare, Check, Upload, Trash2, Plus, Minus, Tag, Ruler, Sparkles, ShieldCheck } from 'lucide-react';
import { Product } from '../data/furnitureData';
import { BUSINESS_CONFIG, getCallTelUrl, getWhatsAppUrl, trackEvent } from '../config/businessConfig';
import { useToast } from '../context/ToastContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuoteWithDetails: (details: {
    productName: string;
    material: string;
    size: string;
    finish: string;
    quantity: number;
    referenceImagePreview: string | null;
  }) => void;
}

export function ProductModal({ product, onClose, onRequestQuoteWithDetails }: ProductModalProps) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedFinish, setSelectedFinish] = useState<string>(product.finishes[0] || 'Default');
  const [quantity, setQuantity] = useState<number>(1);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [referenceFileName, setReferenceFileName] = useState<string>('');
  const { showToast } = useToast();

  const allImages = [product.image, ...(product.additionalImages || [])];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('File size must be under 5MB', 'warning');
        return;
      }
      setReferenceFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
        showToast('Reference image attached successfully', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveReference = () => {
    setReferenceImage(null);
    setReferenceFileName('');
  };

  const handleCall = () => {
    trackEvent('call_click', { product: product.name, modal: true });
    window.location.href = getCallTelUrl();
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { product: product.name, modal: true });
    const message = `Hello Boss Gee Furniture, I am interested in the ${product.name} (${selectedSize}, ${selectedFinish}, Qty: ${quantity}). Please send me more information and a quotation.`;
    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const handleProceedToQuote = () => {
    onRequestQuoteWithDetails({
      productName: product.name,
      material: product.material,
      size: selectedSize,
      finish: selectedFinish,
      quantity,
      referenceImagePreview: referenceImage,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header bar with Close button */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              PRODUCT SPECIFICATIONS
            </span>
            <span className="text-xs text-neutral-400 font-medium hidden sm:inline">• Boss Gee Workshop</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs font-black px-3 py-1 rounded-md bg-neutral-950/90 text-amber-400 border border-amber-500/30 backdrop-blur-sm uppercase">
                    REQUEST PRICE
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImage === img
                          ? 'border-amber-500 scale-105'
                          : 'border-neutral-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Angle ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quality Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-neutral-300">Heavy-Gauge Welds & Screws</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-xs">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-neutral-300">Custom Sizing Available</span>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Customizer */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 text-sm text-neutral-300 mb-4">
                  <Tag className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold">{product.material}</span>
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Dimensions */}
              <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/90 flex items-start gap-3">
                <Ruler className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-neutral-400 uppercase font-bold tracking-wider block">
                    Dimensions (Standard / Customizable)
                  </span>
                  <p className="text-sm font-semibold text-neutral-200 mt-0.5">
                    {product.dimensions}
                  </p>
                </div>
              </div>

              {/* Detailed Specs list */}
              {product.detailedSpecs && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                    Build Specifications
                  </span>
                  <div className="space-y-1.5">
                    {product.detailedSpecs.map((spec, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
                    Select Available Size / Configuration:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                          selectedSize === size
                            ? 'bg-amber-600 text-neutral-950 border-amber-500 font-bold'
                            : 'bg-neutral-950/80 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Finish / Color Selector */}
              {product.finishes && product.finishes.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
                    Finish / Coating / Timber Treatment:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.finishes.map((finish) => (
                      <button
                        key={finish}
                        onClick={() => setSelectedFinish(finish)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                          selectedFinish === finish
                            ? 'bg-neutral-100 text-neutral-950 border-white font-bold'
                            : 'bg-neutral-950/80 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-950/70 border border-neutral-800">
                <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Quantity Required:
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-base font-black text-white w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Reference Image Upload */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    Upload Reference Image (Optional):
                  </span>
                  {referenceImage && (
                    <button
                      onClick={handleRemoveReference}
                      className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-neutral-400">
                  Have a specific space photo, sketch, or custom adjustment in mind? Attach it here.
                </p>

                {referenceImage ? (
                  <div className="flex items-center gap-3 p-2 bg-neutral-900 rounded-lg border border-neutral-700">
                    <img
                      src={referenceImage}
                      alt="Uploaded reference"
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="text-xs truncate flex-1">
                      <p className="font-semibold text-neutral-200 truncate">{referenceFileName}</p>
                      <p className="text-[10px] text-emerald-400">Attached to quote</p>
                    </div>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-neutral-700 hover:border-amber-500/60 rounded-xl cursor-pointer bg-neutral-900/50 hover:bg-neutral-900 transition-colors">
                    <Upload className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-medium text-neutral-300">
                      Choose picture from computer or phone
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions: Request Quote, WhatsApp, Call */}
        <div className="p-4 sm:p-6 bg-neutral-950 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Request Quote button */}
          <button
            onClick={handleProceedToQuote}
            className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2"
          >
            <span>REQUEST QUOTE FOR THIS PIECE</span>
          </button>

          {/* WhatsApp with product prefilled */}
          <button
            onClick={handleWhatsApp}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-600 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WHATSAPP (+263785393849)</span>
          </button>

          {/* Call button */}
          <a
            href={getCallTelUrl()}
            onClick={handleCall}
            className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>CALL BOSS GEE</span>
          </a>
        </div>
      </div>
    </div>
  );
}
