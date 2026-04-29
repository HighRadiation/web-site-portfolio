'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

type TranslationKeys = 'home' | 'about' | 'experience' | 'projects' | 'contact';

const translations: Record<Language, Record<TranslationKeys, string>> = {
  en: {
    home: 'Home',
    about: 'About',
    experience: 'Experience & Education',
    projects: 'Projects',
    contact: 'Contact',
  },
  tr: {
    home: 'Ana Sayfa',
    about: 'Hakkımda',
    experience: 'Deneyim & Eğitim',
    projects: 'Projeler',
    contact: 'İletişim',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return (
      translations[language][key as TranslationKeys] ||
      translations['en'][key as TranslationKeys] ||
      key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
