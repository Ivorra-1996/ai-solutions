import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageview } from '@/lib/analytics';

export function useAnalyticsPageview() {
  const location = useLocation();

  useEffect(() => {
    trackPageview(location.pathname);
  }, [location.pathname]);
}
