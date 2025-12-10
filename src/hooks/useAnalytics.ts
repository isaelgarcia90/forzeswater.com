// Google Analytics 4 Event Tracking Hook
// Measurement ID should be replaced with your actual GA4 ID

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

type EventCategory = 
  | "cta_click" 
  | "form_submit" 
  | "contact_click" 
  | "scroll_depth" 
  | "modal_open"
  | "navigation";

interface TrackEventParams {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
}

export const useAnalytics = () => {
  const trackEvent = ({ category, action, label, value }: TrackEventParams) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackCTAClick = (ctaName: string, location: string) => {
    trackEvent({
      category: "cta_click",
      action: "click",
      label: `${ctaName} - ${location}`,
    });
  };

  const trackFormSubmit = (formName: string, success: boolean) => {
    trackEvent({
      category: "form_submit",
      action: success ? "submit_success" : "submit_error",
      label: formName,
    });
  };

  const trackContactClick = (contactType: string) => {
    trackEvent({
      category: "contact_click",
      action: "click",
      label: contactType,
    });
  };

  const trackScrollDepth = (percentage: number) => {
    trackEvent({
      category: "scroll_depth",
      action: "scroll",
      label: `${percentage}%`,
      value: percentage,
    });
  };

  const trackModalOpen = (modalName: string) => {
    trackEvent({
      category: "modal_open",
      action: "open",
      label: modalName,
    });
  };

  const trackNavigation = (sectionName: string) => {
    trackEvent({
      category: "navigation",
      action: "navigate",
      label: sectionName,
    });
  };

  return {
    trackEvent,
    trackCTAClick,
    trackFormSubmit,
    trackContactClick,
    trackScrollDepth,
    trackModalOpen,
    trackNavigation,
  };
};

export default useAnalytics;
