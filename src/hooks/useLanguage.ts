// src/hooks/useLanguage.js
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
// import { api } from '../services/api';

const TRANSLATIONS = {
  en: { /* English texts */ },
  vi: { /* Vietnamese texts */ },
  ar: { /* Arabic texts (RTL) */ },
  // ... 7 languages
};

export const useLanguage = () => {
  const segment = window.location.pathname.split('/').filter(Boolean)[0] || null;
  const hostname = window.location.hostname;
  
  const storageKey = `language_${hostname}_${segment || 'root'}`;
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem(storageKey) || 'en';
  });

  const { data: defaultLang } = useQuery({
    queryKey: ['defaultLanguage', segment],
    queryFn: () => api.getDefaultLanguage(segment),
    staleTime: 60000,
  });

  // Sync với default language từ server khi lần đầu
  useEffect(() => {
    if (defaultLang?.defaultLanguage && !localStorage.getItem(storageKey)) {
      setLanguage(defaultLang.defaultLanguage);
      localStorage.setItem(storageKey, defaultLang.defaultLanguage);
    }
  }, [defaultLang, storageKey]);

  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem(storageKey, langCode);
    // Set RTL cho Arabic
    if (langCode === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  };

  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return { language, changeLanguage, t, isRTL: language === 'ar' };
};