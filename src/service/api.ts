// src/services/api.js

import { url_be } from "../config";

export const api = {
  // Lấy tất cả links (quan trọng nhất)
  getLinks: async (subpath = null) => {
    let url = `/api/links`;
    if (subpath) url += `?subpath=${subpath}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch links");
    return res.json();
  },

  // Lấy danh sách sub-paths hợp lệ
  getSubPaths: async () => {
    const url = `/api/sub-paths`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch sub paths");
    return res.json();
  },

  // Lấy ngôn ngữ mặc định
  getDefaultLanguage: async (subpath = null) => {
    let url = `/api/default-language`;
    if (subpath) url += `?subpath=${subpath}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch default language");
    return res.json();
  },
};
