// src/core/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

// Helper functions cho storage theo domain + subpath
const getStorageKey = () => {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const segment = pathname.split("/").filter(Boolean)[0] || "root";
  return `language_${hostname}_${segment}`;
};

export const getSavedLanguage = (): string | null => {
  const key = getStorageKey();
  const savedLang = localStorage.getItem(key);
  if (
    savedLang &&
    ["en", "vi", "ar", "ja", "th", "zh", "id"].includes(savedLang)
  ) {
    return savedLang;
  }
  return null;
};

export const saveLanguage = (lng: string) => {
  const key = getStorageKey();
  localStorage.setItem(key, lng);
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
};

// ⭐ Khởi tạo i18n - dùng 1 namespace duy nhất "translation"
i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // ⭐ Đường dẫn đúng với cấu trúc của bạn
    },
    ns: ["translation"], // ⭐ Chỉ 1 namespace
    defaultNS: "translation",
  });

// Set language từ localStorage sau khi init
const savedLang = getSavedLanguage();
if (savedLang) {
  i18n.changeLanguage(savedLang);
}

export default i18n;
