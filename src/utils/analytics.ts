// Analytics and SEO Tracking for Cucinanostrard
// Dominican Republic Dessert Caterer - Comprehensive SEO Monitoring
// Enhanced tracking for Google domination strategy

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    fbq: (...args: unknown[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
}

// Configuration constants
const ANALYTICS_CONFIG = {
  GA4_MEASUREMENT_ID: "G-XXXXXXXXXX", // Replace with actual GA4 ID
  GTM_CONTAINER_ID: "GTM-XXXXXXX", // Replace with actual GTM ID
  FB_PIXEL_ID: "XXXXXXXXXXXXXXXXX", // Replace with actual Facebook Pixel ID
  HOTJAR_ID: "XXXXXXX", // Replace with actual Hotjar ID
  BUSINESS_INFO: {
    name: "Cucinanostrard",
    location: "Santo Domingo, República Dominicana",
    industry: "Artisanal Desserts",
    phone: "+1-809-XXX-XXXX",
    currency: "DOP",
  },
};

// SEO Event Types for Dominican Republic Market
// Web Vitals Metric Type
interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: "good" | "needs-improvement" | "poor";
}

export enum SEOEvents {
  // Core Business Events
  MENU_VIEW = "menu_view",
  PRODUCT_VIEW = "product_view",
  WHATSAPP_CLICK = "whatsapp_click",
  CALL_CLICK = "call_click",
  CONTACT_FORM_SUBMIT = "contact_form_submit",

  // Local SEO Events
  LOCATION_SEARCH = "location_search",
  DIRECTIONS_CLICK = "directions_click",
  BUSINESS_HOURS_VIEW = "business_hours_view",

  // Product Specific Events
  CUSTOM_CAKE_INQUIRY = "custom_cake_inquiry",
  MACARONS_INTEREST = "macarons_interest",
  WEDDING_CAKE_INQUIRY = "wedding_cake_inquiry",
  BIRTHDAY_CAKE_INQUIRY = "birthday_cake_inquiry",

  // Dominican Market Specific
  TRES_LECHES_VIEW = "tres_leches_view",
  QUESILLO_INTEREST = "quesillo_interest",
  TRADITIONAL_SWEETS_VIEW = "traditional_sweets_view",

  // Conversion Events
  QUOTE_REQUEST = "quote_request",
  ORDER_INQUIRY = "order_inquiry",
  CONSULTATION_REQUEST = "consultation_request",

  // Social Media Events
  INSTAGRAM_CLICK = "instagram_click",
  FACEBOOK_CLICK = "facebook_click",
  SOCIAL_SHARE = "social_share",

  // Performance Events
  PAGE_LOAD_TIME = "page_load_time",
  CORE_WEB_VITALS = "core_web_vitals",
  MOBILE_PERFORMANCE = "mobile_performance",

  // User Behavior Events
  SCROLL_DEPTH = "scroll_depth",
  TIME_ON_PAGE = "time_on_page",
  BOUNCE_RATE = "bounce_rate",

  // Search Events
  INTERNAL_SEARCH = "internal_search",
  FILTER_USE = "filter_use",
  SORT_CHANGE = "sort_change",

  // Local Business Events
  REVIEW_CLICK = "review_click",
  GOOGLE_BUSINESS_CLICK = "google_business_click",
  SERVICE_AREA_VIEW = "service_area_view",
}

// Enhanced Event Parameters for SEO Tracking
interface SEOEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  currency?: string;
  location?: string;
  product_category?: string;
  product_name?: string;
  search_term?: string;
  page_location?: string;
  page_title?: string;
  user_agent?: string;
  referrer?: string;
  session_id?: string;
  user_id?: string;
  conversion_value?: number;
  lead_type?: string;
  business_goal?: string;
  local_intent?: boolean;
  mobile_device?: boolean;
  // Dominican Republic specific
  dr_region?: string;
  dr_city?: string;
  spanish_speaker?: boolean;
  local_customer?: boolean;
}

// Analytics Manager Class
class AnalyticsManager {
  private isInitialized = false;
  private sessionId: string;
  private userId: string;
  private startTime: number;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.userId = this.generateUserId();
    this.startTime = Date.now();
  }

  // Initialize all tracking systems
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize Google Analytics 4
      await this.initializeGA4();

      // Initialize Google Tag Manager
      await this.initializeGTM();

      // Initialize Facebook Pixel
      await this.initializeFacebookPixel();

      // Initialize Hotjar
      await this.initializeHotjar();

      // Set up enhanced e-commerce
      this.setupEnhancedEcommerce();

      // Track page load performance
      this.trackPageLoadPerformance();

      // Set up automatic tracking
      this.setupAutomaticTracking();

      this.isInitialized = true;

      console.log("🎯 Cucinanostrard Analytics initialized successfully");
    } catch (error) {
      console.error("❌ Analytics initialization failed:", error);
    }
  }

  // Initialize Google Analytics 4
  private async initializeGA4(): Promise<void> {
    // Load gtag script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args) {
      window.dataLayer.push(args);
    };

    // Configure GA4 for Dominican Republic business
    window.gtag("js", new Date());
    window.gtag("config", ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
      // Enhanced e-commerce settings
      send_page_view: true,
      currency: "DOP",
      country: "DO",
      language: "es",

      // Custom dimensions for Dominican market
      custom_map: {
        custom_parameter_1: "dr_region",
        custom_parameter_2: "product_category",
        custom_parameter_3: "lead_type",
        custom_parameter_4: "local_intent",
      },

      // Privacy and compliance
      anonymize_ip: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: true,

      // Performance tracking
      site_speed_sample_rate: 100,

      // Local business tracking
      business_name: ANALYTICS_CONFIG.BUSINESS_INFO.name,
      business_location: ANALYTICS_CONFIG.BUSINESS_INFO.location,
      business_industry: ANALYTICS_CONFIG.BUSINESS_INFO.industry,
    });

    // Set user properties for Dominican market
    window.gtag("set", {
      user_properties: {
        country: "Dominican Republic",
        business_type: "artisanal_desserts",
        target_market: "dominican_spanish_speakers",
        service_area: "santo_domingo_santiago",
      },
    });
  }

  // Initialize Google Tag Manager
  private async initializeGTM(): Promise<void> {
    // GTM script
    const script = document.createElement("script");
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${ANALYTICS_CONFIG.GTM_CONTAINER_ID}');
    `;
    document.head.appendChild(script);

    // GTM noscript
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${ANALYTICS_CONFIG.GTM_CONTAINER_ID}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.appendChild(noscript);
  }

  // Initialize Facebook Pixel
  private async initializeFacebookPixel(): Promise<void> {
    // Facebook Pixel script
    const script = document.createElement("script");
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${ANALYTICS_CONFIG.FB_PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Facebook Pixel noscript
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
      <img height="1" width="1" style="display:none"
           src="https://www.facebook.com/tr?id=${ANALYTICS_CONFIG.FB_PIXEL_ID}&ev=PageView&noscript=1" />
    `;
    document.body.appendChild(noscript);
  }

  // Initialize Hotjar
  private async initializeHotjar(): Promise<void> {
    const script = document.createElement("script");
    script.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${ANALYTICS_CONFIG.HOTJAR_ID},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(script);
  }

  // Track SEO Events
  public trackSEOEvent(event: SEOEvents, params: SEOEventParams = {}): void {
    if (!this.isInitialized) {
      console.warn("Analytics not initialized. Event not tracked:", event);
      return;
    }

    const enhancedParams = {
      ...params,
      event_category: params.event_category || "seo_tracking",
      session_id: this.sessionId,
      user_id: this.userId,
      timestamp: Date.now(),
      page_location: window.location.href,
      page_title: document.title,
      user_agent: navigator.userAgent,
      referrer: document.referrer,
      // Dominican Republic specific
      dr_region: this.getDominicanRegion(),
      dr_city: this.getDominicanCity(),
      spanish_speaker: this.isSpanishSpeaker(),
      local_customer: this.isLocalCustomer(),
      mobile_device: this.isMobileDevice(),
    };

    // Track in GA4
    window.gtag("event", event, enhancedParams);

    // Track in Facebook Pixel
    if (window.fbq) {
      window.fbq("track", "CustomEvent", {
        event_name: event,
        ...enhancedParams,
      });
    }

    // Track in GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: event,
      ...enhancedParams,
    });

    console.log(`📊 SEO Event tracked: ${event}`, enhancedParams);
  }

  // Track WhatsApp interactions (critical for Dominican market)
  public trackWhatsAppInteraction(action: string, productName?: string): void {
    this.trackSEOEvent(SEOEvents.WHATSAPP_CLICK, {
      event_category: "whatsapp_interaction",
      event_label: action,
      product_name: productName,
      conversion_value: 1,
      lead_type: "whatsapp_inquiry",
      business_goal: "lead_generation",
      local_intent: true,
    });
  }

  // Track product views with enhanced e-commerce
  public trackProductView(
    productId: string,
    productName: string,
    category: string,
    price: number,
  ): void {
    // GA4 Enhanced E-commerce
    window.gtag("event", "view_item", {
      currency: "DOP",
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          item_category: category,
          price: price,
          quantity: 1,
        },
      ],
    });

    // Custom SEO tracking
    this.trackSEOEvent(SEOEvents.PRODUCT_VIEW, {
      event_category: "product_interaction",
      product_name: productName,
      product_category: category,
      value: price,
      currency: "DOP",
    });
  }

  // Track form submissions
  public trackFormSubmission(formType: string, leadValue: number = 0): void {
    // GA4 conversion event
    window.gtag("event", "generate_lead", {
      currency: "DOP",
      value: leadValue,
      form_type: formType,
    });

    // Custom SEO tracking
    this.trackSEOEvent(SEOEvents.CONTACT_FORM_SUBMIT, {
      event_category: "lead_generation",
      event_label: formType,
      conversion_value: leadValue,
      lead_type: formType,
      business_goal: "lead_generation",
    });
  }

  // Track search queries
  public trackSearch(searchTerm: string, resultsCount: number): void {
    window.gtag("event", "search", {
      search_term: searchTerm,
      results_count: resultsCount,
    });

    this.trackSEOEvent(SEOEvents.INTERNAL_SEARCH, {
      event_category: "search",
      search_term: searchTerm,
      event_label: `${resultsCount} results`,
    });
  }

  // Track Core Web Vitals for SEO
  public trackCoreWebVitals(): void {
    // Track when available
    try {
      import("web-vitals" as any)
        .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          getCLS((metric: WebVitalsMetric) => {
            this.trackSEOEvent(SEOEvents.CORE_WEB_VITALS, {
              event_category: "performance",
              event_label: "CLS",
              value: Math.round(metric.value * 1000),
            });
          });

          getFID((metric: WebVitalsMetric) => {
            this.trackSEOEvent(SEOEvents.CORE_WEB_VITALS, {
              event_category: "performance",
              event_label: "FID",
              value: Math.round(metric.value),
            });
          });

          getFCP((metric: WebVitalsMetric) => {
            this.trackSEOEvent(SEOEvents.CORE_WEB_VITALS, {
              event_category: "performance",
              event_label: "FCP",
              value: Math.round(metric.value),
            });
          });

          getLCP((metric: WebVitalsMetric) => {
            this.trackSEOEvent(SEOEvents.CORE_WEB_VITALS, {
              event_category: "performance",
              event_label: "LCP",
              value: Math.round(metric.value),
            });
          });

          getTTFB((metric: WebVitalsMetric) => {
            this.trackSEOEvent(SEOEvents.CORE_WEB_VITALS, {
              event_category: "performance",
              event_label: "TTFB",
              value: Math.round(metric.value),
            });
          });
        })
        .catch(() => {
          console.warn(
            "web-vitals package not available - Core Web Vitals tracking disabled",
          );
        });
    } catch (_error) {
      console.warn(
        "web-vitals package not available - Core Web Vitals tracking disabled",
      );
    }
  }

  // Setup enhanced e-commerce tracking
  private setupEnhancedEcommerce(): void {
    // Set up purchase tracking
    window.gtag("config", ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
      custom_map: {
        custom_parameter_1: "dessert_type",
        custom_parameter_2: "order_method",
        custom_parameter_3: "delivery_zone",
      },
    });
  }

  // Track page load performance
  private trackPageLoadPerformance(): void {
    window.addEventListener("load", () => {
      const loadTime = Date.now() - this.startTime;

      this.trackSEOEvent(SEOEvents.PAGE_LOAD_TIME, {
        event_category: "performance",
        value: loadTime,
        mobile_device: this.isMobileDevice(),
      });
    });
  }

  // Setup automatic tracking
  private setupAutomaticTracking(): void {
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener("scroll", () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100,
      );

      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        this.trackSEOEvent(SEOEvents.SCROLL_DEPTH, {
          event_category: "engagement",
          value: scrollPercent,
          event_label: `${scrollPercent}%`,
        });
      }
    });

    // Track time on page
    let timeOnPage = 0;
    setInterval(() => {
      timeOnPage += 15;
      if (timeOnPage % 60 === 0) {
        // Every minute
        this.trackSEOEvent(SEOEvents.TIME_ON_PAGE, {
          event_category: "engagement",
          value: timeOnPage,
          event_label: `${timeOnPage}s`,
        });
      }
    }, 15000);
  }

  // Utility methods
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateUserId(): string {
    let userId = localStorage.getItem("cucinanostrard_user_id");
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("cucinanostrard_user_id", userId);
    }
    return userId;
  }

  private getDominicanRegion(): string {
    // This could be enhanced with IP geolocation
    return "distrito_nacional"; // Default to DN
  }

  private getDominicanCity(): string {
    // This could be enhanced with IP geolocation
    return "santo_domingo"; // Default to Santo Domingo
  }

  private isSpanishSpeaker(): boolean {
    return navigator.language.startsWith("es");
  }

  private isLocalCustomer(): boolean {
    // Check if referrer is from Dominican websites or local search
    const referrer = document.referrer.toLowerCase();
    return (
      referrer.includes(".do") ||
      referrer.includes("google.com.do") ||
      referrer.includes("santo domingo") ||
      referrer.includes("dominican")
    );
  }

  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }
}

// Create global analytics instance
const analytics = new AnalyticsManager();

// Export for use throughout the application
export { analytics, type SEOEventParams };
export default analytics;

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    analytics.initialize();
  });
} else {
  analytics.initialize();
}

// Export convenience functions
export const trackEvent = (event: SEOEvents, params?: SEOEventParams) => {
  analytics.trackSEOEvent(event, params);
};

export const trackWhatsApp = (action: string, productName?: string) => {
  analytics.trackWhatsAppInteraction(action, productName);
};

export const trackProduct = (
  productId: string,
  productName: string,
  category: string,
  price: number,
) => {
  analytics.trackProductView(productId, productName, category, price);
};

export const trackForm = (formType: string, leadValue?: number) => {
  analytics.trackFormSubmission(formType, leadValue);
};

export const trackSearch = (searchTerm: string, resultsCount: number) => {
  analytics.trackSearch(searchTerm, resultsCount);
};

// Dominican Republic specific tracking helpers
export const trackDominicanSpecificEvent = (
  eventType: "tres_leches" | "quesillo" | "majarete" | "traditional",
  productName: string,
) => {
  const eventMap = {
    tres_leches: SEOEvents.TRES_LECHES_VIEW,
    quesillo: SEOEvents.QUESILLO_INTEREST,
    majarete: SEOEvents.TRADITIONAL_SWEETS_VIEW,
    traditional: SEOEvents.TRADITIONAL_SWEETS_VIEW,
  };

  trackEvent(eventMap[eventType], {
    event_category: "dominican_products",
    product_name: productName,
    local_intent: true,
    spanish_speaker: true,
  });
};

console.log(
  "🇩🇴 Cucinanostrard Analytics loaded - Ready for Dominican market domination!",
);
