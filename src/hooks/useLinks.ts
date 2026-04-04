// src/hooks/useLinks.js
import { useQuery } from "react-query";
import { api } from "../service/api";
import { url_be } from "../config";

export const useLinks = () => {
  // Lấy subpath từ URL (ví dụ: /gold → "gold")
  const segment =
    window.location.pathname.split("/").filter(Boolean)[0] || null;

  const queryKey = ["links", segment];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => api.getLinks(segment),
    staleTime: 60000, // đúng theo yêu cầu tài liệu
    cacheTime: 300000,
  });

  // Hàm navigate đến các link affiliate
  const navTo = (type) => {
    if (!data) return;

    // Lấy subpath từ URL
    const segment = window.location.pathname.split("/").filter(Boolean)[0];
    const subpathParam = segment ? `?subpath=${segment}` : "";

    // ⭐ Lấy domain của BE từ environment variable hoặc hardcode cho production

    const baseUrl = url_be;

    // Redirect qua BE để ghi analytics
    const goUrl = `${baseUrl}/go/${type}${subpathParam}`;
    console.log("🔗 Redirecting to:", goUrl);
    window.location.href = goUrl;
  };

  return {
    ...data, // registerLink, tryDemoLink, liveChatLink, ...
    navTo,
    isLoading,
    error,
    segment, // hữu ích khi debug
  };
};
