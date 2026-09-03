import React, { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { type Language, type Translations, translations } from '../locales/translations';

interface LanguageContextType {
  language: Language; // Citizen selected language preference
  effectiveLanguage: Language; // Effective language (en on authority dashboards, language on public)
  setLanguage: (lang: Language) => void;
  t: Translations;
  isAuthorityZone: boolean;
  tStatus: (status: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Load initial citizen language preference from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('mplads_citizen_lang');
      if (saved === 'hi' || saved === 'mr' || saved === 'en') {
        return saved as Language;
      }
    } catch (e) {
      console.error('Failed to load language preference', e);
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('mplads_citizen_lang', lang);
    } catch (e) {
      console.error('Failed to save language preference', e);
    }
  };

  // Check if current route belongs to Authority Zone
  const pathname = location.pathname;
  const isAuthorityZone = (
    pathname.startsWith('/mp') ||
    pathname.startsWith('/district') ||
    pathname.startsWith('/state') ||
    pathname.startsWith('/ministry') ||
    pathname.startsWith('/admin')
  );

  // Authority Zone is STRICTLY English-only per prompt requirement
  const effectiveLanguage: Language = isAuthorityZone ? 'en' : language;

  // Active translation dictionary
  const t = translations[effectiveLanguage] || translations.en;

  // Helper for translating status values on public UI while leaving database values unchanged
  const tStatus = (status: string): string => {
    if (effectiveLanguage === 'en') return status;
    const lower = status.toLowerCase();
    
    if (lower.includes('submitted')) return t.track.statusSubmitted;
    if (lower.includes('review')) return t.track.statusUnderReview;
    if (lower.includes('assigned')) return t.track.statusAssigned;
    if (lower.includes('progress') || lower.includes('ongoing')) return t.track.statusInProgress;
    if (lower.includes('resolved') || lower.includes('completed')) return t.track.statusResolved;
    if (lower.includes('closed')) return t.track.statusClosed;

    return status;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        effectiveLanguage,
        setLanguage,
        t,
        isAuthorityZone,
        tStatus
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
