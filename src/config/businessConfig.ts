/**
 * CENTRAL BUSINESS CONFIGURATION FOR BOSS GEE FURNITURE
 * 
 * Update these values anytime to reflect new business details,
 * official domain, live app installer links, or analytics IDs.
 */

export interface BusinessConfigType {
  COMPANY_NAME: string;
  TAGLINE: string;
  MAIN_HEADLINE: string;
  SUBHEADLINE: string;
  SUPPORTING_TEXT: string;
  PHONE: string;
  CALL_TEL: string;
  WHATSAPP: string;
  WHATSAPP_RAW: string;
  WEBSITE_URL: string;
  PC_APP_DOWNLOAD_URL: string;
  ANDROID_APP_URL: string;
  IOS_APP_URL: string;
  EMAIL: string;
  ADDRESS: string;
  OPENING_HOURS: string;
  SOCIAL_LINKS: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
  GOOGLE_ANALYTICS_ID: string;
  META_PIXEL_ID: string;
  GOOGLE_TAG_MANAGER_ID: string;
  APP_VERSION: string;
  INSTALLER_NAME: string;
  PORTABLE_NAME: string;
}

export const BUSINESS_CONFIG: BusinessConfigType = {
  COMPANY_NAME: "BOSS GEE FURNITURE",
  TAGLINE: "STRONG FURNITURE. BEAUTIFUL CRAFTSMANSHIP.",
  MAIN_HEADLINE: "BUILT STRONG. CRAFTED TO LAST.",
  SUBHEADLINE: "Premium Steel & Wood Furniture for Homes, Offices, Businesses and Outdoor Spaces.",
  SUPPORTING_TEXT: "Discover beautifully crafted chairs, tables, beds and custom furniture designed around your space.",
  
  // Contact phone numbers as specified
  PHONE: "+2630785393849",
  CALL_TEL: "+263785393849", // Target for tel: link
  WHATSAPP: "+2630785393849", // Display number
  WHATSAPP_RAW: "263785393849", // Target for wa.me link

  // External URLs (editable - leave empty string if not yet published)
  WEBSITE_URL: "",
  PC_APP_DOWNLOAD_URL: "",
  ANDROID_APP_URL: "",
  IOS_APP_URL: "",

  // Business placeholders (editable)
  EMAIL: "", // e.g. "sales@bossgeefurniture.co.zw"
  ADDRESS: "", // e.g. "Harare Industrial Area, Harare, Zimbabwe"
  OPENING_HOURS: "", // e.g. "Mon - Sat: 8:00 AM - 5:30 PM"
  SOCIAL_LINKS: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },

  // Analytics placeholders (editable)
  GOOGLE_ANALYTICS_ID: "",
  META_PIXEL_ID: "",
  GOOGLE_TAG_MANAGER_ID: "",

  // PC Desktop App metadata
  APP_VERSION: "1.0.0",
  INSTALLER_NAME: "Boss-Gee-Furniture-Setup.exe",
  PORTABLE_NAME: "Boss-Gee-Furniture-Portable.exe",
};

/**
 * Analytics tracking dispatcher
 */
export type AnalyticsEventName =
  | 'page_view'
  | 'product_view'
  | 'quote_request'
  | 'whatsapp_click'
  | 'call_click'
  | 'app_download_click'
  | 'website_click'
  | 'form_submission';

export function trackEvent(name: AnalyticsEventName, metadata?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    // Send to Google Analytics if configured
    if (BUSINESS_CONFIG.GOOGLE_ANALYTICS_ID && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', name, metadata);
    }
    // Send to Meta Pixel if configured
    if (BUSINESS_CONFIG.META_PIXEL_ID && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('trackCustom', name, metadata);
    }
  }
}

/**
 * WhatsApp URL Generator with prefilled text
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMessage = "Hello Boss Gee Furniture, I am interested in your furniture. I would like more information and a quotation.";
  const text = customMessage && customMessage.trim().length > 0 ? customMessage : defaultMessage;
  return `https://wa.me/${BUSINESS_CONFIG.WHATSAPP_RAW}?text=${encodeURIComponent(text)}`;
}

/**
 * Call Telephone URL Generator
 */
export function getCallTelUrl(): string {
  return `tel:${BUSINESS_CONFIG.CALL_TEL}`;
}
