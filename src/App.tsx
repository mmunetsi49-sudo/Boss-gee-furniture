/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { CategoriesSection } from './components/CategoriesSection';
import { SteelFurnitureSection } from './components/SteelFurnitureSection';
import { WoodFurnitureSection } from './components/WoodFurnitureSection';
import { CatalogueSection } from './components/CatalogueSection';
import { ProductModal } from './components/ProductModal';
import { CustomFurnitureSection } from './components/CustomFurnitureSection';
import { QuoteFormSection, QuoteFormData } from './components/QuoteFormSection';
import { GallerySection } from './components/GallerySection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AppDownloadSection } from './components/AppDownloadSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileStickyBottomBar } from './components/MobileStickyBottomBar';
import { PcAppModal } from './components/PcAppModal';
import { AndroidModal } from './components/AndroidModal';
import { WebsiteModal } from './components/WebsiteModal';
import { QuoteModal } from './components/QuoteModal';
import { ToastProvider } from './context/ToastContext';
import { Product } from './data/furnitureData';
import { BUSINESS_CONFIG } from './config/businessConfig';
import { Monitor, Smartphone, Globe, ArrowUp, Laptop } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isPcAppModalOpen, setIsPcAppModalOpen] = useState(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);
  const [isWebsiteModalOpen, setIsWebsiteModalOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState<Partial<QuoteFormData> | undefined>(undefined);
  const [isDesktopFrameActive, setIsDesktopFrameActive] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      const headerOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Handlers for quote actions
  const handleOpenQuoteModal = (categoryName?: string) => {
    if (categoryName) {
      setQuoteInitialData({
        furnitureType: categoryName,
        materialType: categoryName.toLowerCase().includes('wood')
          ? 'Wood'
          : categoryName.toLowerCase().includes('steel')
          ? 'Steel'
          : 'Steel & Wood Combination',
      });
    }
    setIsQuoteModalOpen(true);
  };

  const handleRequestQuoteForProduct = (product: Product) => {
    setQuoteInitialData({
      furnitureType: product.name,
      materialType: product.categories.includes('wood') && product.categories.includes('steel')
        ? 'Steel & Wood Combination'
        : product.categories.includes('wood')
        ? 'Wood'
        : 'Steel',
      preferredSize: product.sizes?.[0] || '',
      description: `Inquiry for ${product.name}. Material: ${product.material}.`,
    });
    scrollToSection('quote');
  };

  const handleProductModalQuote = (details: {
    productName: string;
    material: string;
    size: string;
    finish: string;
    quantity: number;
    referenceImagePreview: string | null;
  }) => {
    setQuoteInitialData({
      furnitureType: details.productName,
      materialType: details.material.toLowerCase().includes('wood') && details.material.toLowerCase().includes('steel')
        ? 'Steel & Wood Combination'
        : details.material.toLowerCase().includes('wood')
        ? 'Wood'
        : 'Steel',
      preferredSize: details.size,
      quantity: details.quantity,
      description: `Finish/Coating: ${details.finish}. Size: ${details.size}. Base Material: ${details.material}.`,
      referenceImage: details.referenceImagePreview,
    });
    scrollToSection('quote');
  };

  const handleStartCustomOrder = (initial?: { description?: string; referenceImage?: string | null }) => {
    setQuoteInitialData({
      furnitureType: 'Bespoke Custom Furniture',
      materialType: 'Steel & Wood Combination',
      description: initial?.description || 'Custom furniture commission. Requesting sizing and workshop quotation.',
      referenceImage: initial?.referenceImage || null,
    });
    scrollToSection('quote');
  };

  const handleSelectCategoryAndScroll = (category: string) => {
    setSelectedCategory(category);
    scrollToSection('furniture');
  };

  return (
    <ToastProvider>
      <div className={`min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans transition-all duration-300 ${
        isDesktopFrameActive ? 'p-2 sm:p-6 bg-neutral-900' : ''
      }`}>
        {/* Optional Windows PC Desktop Simulator Frame Wrapper */}
        <div className={`flex flex-col flex-1 bg-neutral-950 ${
          isDesktopFrameActive ? 'rounded-2xl border-2 border-amber-600/50 shadow-2xl overflow-hidden' : ''
        }`}>
          {isDesktopFrameActive && (
            <div className="bg-neutral-950 px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-xs select-none">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-bold text-white ml-2">
                  Boss Gee Furniture - Windows PC Desktop App (Simulated Execution)
                </span>
              </div>
              <button
                onClick={() => setIsDesktopFrameActive(false)}
                className="text-neutral-400 hover:text-white px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800"
              >
                Exit Desktop View
              </button>
            </div>
          )}

          {/* Sticky Header Navigation */}
          <Header
            onOpenQuoteModal={handleOpenQuoteModal}
            onOpenPcAppModal={() => setIsPcAppModalOpen(true)}
            onOpenWebsiteModal={() => setIsWebsiteModalOpen(true)}
            onSelectCategory={handleSelectCategoryAndScroll}
          />

          {/* Main Content Sections */}
          <main className="flex-1">
            {/* 1. Hero Section */}
            <Hero
              onOpenQuoteModal={() => handleOpenQuoteModal()}
              onScrollToFurniture={() => scrollToSection('furniture')}
            />

            {/* 2. Trust Bar */}
            <TrustBar />

            {/* 3. Furniture Categories Section */}
            <CategoriesSection
              onSelectCategory={handleSelectCategoryAndScroll}
              onRequestQuoteForCategory={(catName) => handleOpenQuoteModal(catName)}
            />

            {/* 4. Dedicated Steel Furniture Section */}
            <SteelFurnitureSection
              onOrderSteel={() => handleOpenQuoteModal('Steel Furniture')}
              onFilterSteelCategory={() => handleSelectCategoryAndScroll('steel')}
            />

            {/* 5. Dedicated Wood Furniture Section */}
            <WoodFurnitureSection
              onOrderWood={() => handleOpenQuoteModal('Wood Furniture')}
              onFilterWoodCategory={() => handleSelectCategoryAndScroll('wood')}
            />

            {/* 6. Featured Products Catalogue */}
            <CatalogueSection
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onOpenProductModal={(product) => setSelectedProductForModal(product)}
              onRequestQuoteForProduct={handleRequestQuoteForProduct}
            />

            {/* 7. Custom Furniture Major Conversion Section */}
            <CustomFurnitureSection onStartCustomOrder={handleStartCustomOrder} />

            {/* 8. High-Converting Quote Form Section */}
            <QuoteFormSection
              initialData={quoteInitialData}
              onClearInitialData={() => setQuoteInitialData(undefined)}
            />

            {/* 9. Craftsmanship Gallery */}
            <GallerySection />

            {/* 10. How It Works Section */}
            <HowItWorksSection onStartOrder={() => scrollToSection('quote')} />

            {/* 11. Why Choose Boss Gee Furniture */}
            <WhyChooseSection />

            {/* 12. Client Testimonials */}
            <TestimonialsSection />

            {/* 13. PC Desktop & Mobile App Download Section */}
            <AppDownloadSection
              onOpenPcAppModal={() => setIsPcAppModalOpen(true)}
              onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
            />

            {/* 14. Contact Section */}
            <ContactSection onOpenQuoteModal={() => handleOpenQuoteModal()} />
          </main>

          {/* Footer */}
          <Footer
            onOpenPcAppModal={() => setIsPcAppModalOpen(true)}
            onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
            onOpenWebsiteModal={() => setIsWebsiteModalOpen(true)}
            onSelectCategory={handleSelectCategoryAndScroll}
          />

          {/* Mobile Sticky Bottom Bar */}
          <MobileStickyBottomBar onOpenQuote={() => scrollToSection('quote')} />

          {/* Floating Quick Action: Desktop Simulator Pill */}
          <div className="fixed bottom-24 left-4 z-30 hidden lg:block">
            <button
              onClick={() => setIsDesktopFrameActive(!isDesktopFrameActive)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 hover:border-amber-500/50 text-neutral-300 hover:text-white text-xs font-semibold shadow-xl backdrop-blur-md transition-all"
              title="Toggle PC Desktop App simulation"
            >
              <Monitor className="w-3.5 h-3.5 text-amber-500" />
              <span>{isDesktopFrameActive ? 'Exit PC App Frame' : 'Simulate Windows App'}</span>
            </button>
          </div>
        </div>

        {/* Modals & Overlays */}
        <ProductModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onRequestQuoteWithDetails={handleProductModalQuote}
        />

        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          initialData={quoteInitialData}
        />

        {isPcAppModalOpen && (
          <PcAppModal
            onClose={() => setIsPcAppModalOpen(false)}
            onOpenQuote={() => {
              setIsPcAppModalOpen(false);
              handleOpenQuoteModal();
            }}
            onOpenWebsite={() => {
              setIsPcAppModalOpen(false);
              setIsWebsiteModalOpen(true);
            }}
          />
        )}

        {isAndroidModalOpen && (
          <AndroidModal
            onClose={() => setIsAndroidModalOpen(false)}
            onOpenQuote={() => {
              setIsAndroidModalOpen(false);
              handleOpenQuoteModal();
            }}
          />
        )}

        {isWebsiteModalOpen && (
          <WebsiteModal
            onClose={() => setIsWebsiteModalOpen(false)}
            onOpenQuote={() => {
              setIsWebsiteModalOpen(false);
              handleOpenQuoteModal();
            }}
          />
        )}
      </div>
    </ToastProvider>
  );
}
