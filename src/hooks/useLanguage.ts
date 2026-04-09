// src/hooks/useLanguage.ts
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLinks } from './useLinks';

const getStorageKey = () => {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const segment = pathname.split('/').filter(Boolean)[0] || 'root';
  return `language_${hostname}_${segment}`;
};

export const useLanguage = (domain: any) => {
  console.log("AAAA domain", domain);
  
  const { i18n, t: originalT } = useTranslation(); // ← Lấy originalT từ useTranslation không có namespace
  
  // Wrap lại nhưng KHÔNG thêm domain nếu key đã có domain
  const t = (key: string, options?: any) => {
    // Nếu key đã có domain ở đầu thì không thêm nữa
    if (key.startsWith(`${domain}.`)) {
      console.log(`🔀 Key đã có domain: "${key}"`);
      return originalT(key, options);
    }
    // Nếu chưa có thì thêm domain vào
    const fullKey = `${domain}.${key}`;
    console.log(`🔀 Mapping: "${key}" -> "${fullKey}"`);
    return originalT(fullKey, options);
  };
  
  const { defaultLanguage, isLoading } = useLinks();
  const currentLanguage = i18n.language;
  const hasInitialized = useRef(false);

  console.log("🔍 useLanguage debug:", { 
    domain,
    defaultLanguage, 
    isLoading, 
    currentLanguage,
  });

  useEffect(() => {
    if (isLoading || hasInitialized.current) return;

    if (defaultLanguage) {
      const key = getStorageKey();
      const savedLang = localStorage.getItem(key);
      
      console.log("📦 Storage check:", { key, savedLang, defaultLanguage });
      
      if (!savedLang) {
        console.log("🌐 Setting default language:", defaultLanguage);
        localStorage.setItem(key, defaultLanguage);
        i18n.changeLanguage(defaultLanguage);
      } 
      else if (savedLang !== currentLanguage) {
        console.log("🔄 Syncing with saved language:", savedLang);
        i18n.changeLanguage(savedLang);
      }
      
      hasInitialized.current = true;
    }
  }, [defaultLanguage, isLoading, i18n, currentLanguage]);

  const changeLanguage = (langCode: string) => {
    const key = getStorageKey();
    console.log("🏳️ Changing language to:", langCode, "key:", key);
    
    localStorage.setItem(key, langCode);
    i18n.changeLanguage(langCode);
    document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
    isRTL: currentLanguage === 'ar',
  };
};