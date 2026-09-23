import React, { useState } from 'react';
import { Eye, ZoomIn, ZoomOut, X, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/furnitureData';
import { getWhatsAppUrl, trackEvent } from '../config/businessConfig';

const GALLERY_FILTERS = [
  { id: 'all', label: 'ALL' },
  { id: 'steel', label: 'STEEL' },
  { id: 'wood', label: 'WOOD' },
  { id: 'chairs', label: 'CHAIRS' },
  { id: 'tables', label: 'TABLES' },
  { id: 'beds', label: 'BEDS' },
  { id: 'sofas', label: 'SOFAS' },
  { id: 'custom', label: 'CUSTOM' },
];

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categories: string[];
  image: string;
  tag: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Modern Steel Chair - Matte Black',
    category: 'chairs',
    categories: ['chairs', 'steel'],
    image: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=1000&q=80',
    tag: 'Steel Seating',
  },
  {
    id: 'g-2',
    title: 'Solid Hardwood Dining Table',
    category: 'tables',
    categories: ['tables', 'wood'],
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80',
    tag: 'Timber Joinery',
  },
  {
    id: 'g-3',
    title: 'Steel Frame Industrial Bed',
    category: 'beds',
    categories: ['beds', 'steel'],
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    tag: 'Heavy-Duty Steel',
  },
  {
    id: 'g-4',
    title: 'Custom Steel & Hardwood Boardroom Table',
    category: 'custom',
    categories: ['custom', 'steel', 'wood', 'tables'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
    tag: 'Custom Hybrid',
  },
  {
    id: 'g-5',
    title: 'Architectural Steel Base Dining Table',
    category: 'tables',
    categories: ['tables', 'steel'],
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80',
    tag: 'Structural Base',
  },
  {
    id: 'g-6',
    title: 'Deep Comfort Steel Welded Sofa Suite',
    category: 'sofas',
    categories: ['sofas', 'steel'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    tag: 'Lounge Suite',
  },
  {
    id: 'g-7',
    title: 'Sculpted Solid Wood Accent Chair',
    category: 'chairs',
    categories: ['chairs', 'wood'],
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80',
    tag: 'Ergonomic Wood',
  },
  {
    id: 'g-8',
    title: 'Heirloom Solid Timber Paneled Bed',
    category: 'beds',
    categories: ['beds', 'wood'],
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80',
    tag: 'Hardwood Bedroom',
  },
  {
    id: 'g-9',
    title: 'Low Profile Hardwood Living Coffee Table',
    category: 'tables',
    categories: ['tables', 'wood'],
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80',
    tag: 'Living Table',
  },
];

export function GallerySection() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedFilter === 'all' || item.categories.includes(selectedFilter)
  );

  const openLightbox = (item: GalleryItem) => {
    trackEvent('product_view', { galleryItem: item.title });
    setActiveItem(item);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setActiveItem(null);
    setIsZoomed(false);
  };

  const handleWhatsAppInquiry = (item: GalleryItem) => {
    trackEvent('whatsapp_click', { gallery: item.title });
    const msg = `Hello Boss Gee Furniture, I am looking at "${item.title}" in your gallery. Can you provide pricing and fabrication details?`;
    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="gallery" className="py-24 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
            PORTFOLIO SHOWCASE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-4 mb-4">
            CRAFTSMANSHIP GALLERY
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Take a closer look at recent steel fabrication and timber carpentry finished in our workshop.
            Click any piece to inspect details in full-screen zoom.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {GALLERY_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedFilter === filter.id
                  ? 'bg-amber-600 text-neutral-950 font-black shadow-md shadow-amber-600/30'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 border border-neutral-800 hover:border-amber-600/50 shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-neutral-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h4 className="text-base font-bold text-white uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-amber-400/90 font-medium mt-0.5">Click to view full size</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-neutral-950/80 border border-neutral-700 flex items-center justify-center text-white group-hover:bg-amber-600 group-hover:text-neutral-950 transition-colors shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full-screen Lightbox Modal */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/95 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative max-w-5xl w-full flex flex-col max-h-[95vh] bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden shadow-2xl">
              {/* Lightbox Controls */}
              <div className="px-6 py-4 bg-neutral-950/80 border-b border-neutral-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white uppercase">{activeItem.title}</h3>
                  <span className="text-xs text-amber-400">{activeItem.tag}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs flex items-center gap-1"
                    title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                  >
                    {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isZoomed ? 'Reset Zoom' : 'Zoom'}</span>
                  </button>
                  <button
                    onClick={closeLightbox}
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Image viewport */}
              <div className="flex-1 overflow-auto bg-neutral-950 flex items-center justify-center p-4">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className={`transition-all duration-300 object-contain rounded-xl ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'max-h-[68vh] cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
              </div>

              {/* Lightbox Footer Actions */}
              <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-neutral-400">
                  Like this piece? We can fabricate it to your exact specifications.
                </span>
                <button
                  onClick={() => handleWhatsAppInquiry(activeItem)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>ENQUIRE ABOUT THIS ON WHATSAPP</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
