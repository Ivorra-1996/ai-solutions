import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../utils/translations';
import type { Language } from '../utils/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextType>(() => {
    const t = (path: string): string => {
      const resolved = path.split('.').reduce<unknown>((obj, key) => {
        if (obj && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, key)) {
          return (obj as Record<string, unknown>)[key];
        }
        return undefined;
      }, translations[language]);
      return typeof resolved === 'string' ? resolved : path;
    };
    return { language, setLanguage, t };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
