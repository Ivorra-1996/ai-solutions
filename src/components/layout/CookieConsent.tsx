import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { isAnalyticsConfigured, loadGoogleAnalytics } from '@/lib/analytics';

const CONSENT_KEY = 'cookie-consent';

type Consent = 'accepted' | 'rejected';

const CookieConsent = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isAnalyticsConfigured()) return;

    const stored = localStorage.getItem(CONSENT_KEY) as Consent | null;
    if (stored === 'accepted') {
      loadGoogleAnalytics();
    } else if (stored === null) {
      setVisible(true);
    }
  }, []);

  const choose = (consent: Consent) => {
    localStorage.setItem(CONSENT_KEY, consent);
    if (consent === 'accepted') {
      loadGoogleAnalytics();
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] bg-primary text-white border-t border-white/10">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-gray-300 flex-1">{t('cookieConsent.message')}</p>
        <div className="flex gap-3 shrink-0">
          <Button
            size="sm"
            variant="outline"
            className="border-white/30 text-white bg-transparent hover:bg-white hover:text-primary"
            onClick={() => choose('rejected')}
          >
            {t('cookieConsent.reject')}
          </Button>
          <Button
            size="sm"
            className="bg-accent hover:bg-accent-light text-white"
            onClick={() => choose('accepted')}
          >
            {t('cookieConsent.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
