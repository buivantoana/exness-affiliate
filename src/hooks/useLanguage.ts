// src/hooks/useLanguage.ts
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLinks } from './useLinks';

// Helper: tạo storage key theo domain + subpath (theo tài liệu)
const getStorageKey = () => {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const segment = pathname.split('/').filter(Boolean)[0] || 'root';
  return `language_${hostname}_${segment}`;
};

export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const { defaultLanguage, isLoading } = useLinks(); // ⭐ Thêm isLoading
  const currentLanguage = i18n.language;
  const hasInitialized = useRef(false); // ⭐ Chỉ chạy 1 lần

  console.log("🔍 useLanguage debug:", { 
    defaultLanguage, 
    isLoading, 
    currentLanguage,
    hasInitialized: hasInitialized.current 
  });

  // Sync language từ server khi lần đầu
  useEffect(() => {
    // ⭐ Chờ data load xong và chưa init
    if (isLoading || hasInitialized.current) return;

    if (defaultLanguage) {
      const key = getStorageKey();
      const savedLang = localStorage.getItem(key);
      
      console.log("📦 Storage check:", { key, savedLang, defaultLanguage });
      
      // Nếu chưa có trong localStorage, dùng defaultLanguage từ server
      if (!savedLang) {
        console.log("🌐 Setting default language:", defaultLanguage);
        localStorage.setItem(key, defaultLanguage);
        i18n.changeLanguage(defaultLanguage);
      } 
      // Nếu có rồi, đồng bộ với i18n
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
    
    // Handle RTL cho Arabic
    document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
    isRTL: currentLanguage === 'ar',
  };
};