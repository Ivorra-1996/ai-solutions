const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let loaded = false;

export function isAnalyticsConfigured() {
  return Boolean(GA_ID);
}

export function loadGoogleAnalytics() {
  if (loaded || !GA_ID) return;
  loaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  // Disable GA4's automatic pageview on load; page views are sent
  // explicitly per-route via trackPageview so SPA navigation is tracked.
  window.gtag('config', GA_ID, { send_page_view: false });
}

export function trackPageview(path: string) {
  if (!loaded || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
  });
}
