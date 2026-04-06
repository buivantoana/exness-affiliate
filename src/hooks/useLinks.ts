// src/hooks/useLinks.js
import { useQuery } from "react-query";
import { api } from "../service/api";

export const useLinks = () => {
  // Lấy subpath từ URL (ví dụ: /gold → "gold")
  const segment =
    window.location.pathname.split("/").filter(Boolean)[0] || null;

  const queryKey = ["links", segment];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => api.getLinks(segment),
    staleTime: 60000,
    cacheTime: 300000,
  });

  // Hàm navigate đến các link affiliate
  const navTo = (type) => {
    if (!data) return;

    // Lấy subpath từ URL
    const segment = window.location.pathname.split("/").filter(Boolean)[0];
    const subpathParam = segment ? `?subpath=${segment}` : "";

    // ⭐ Dùng relative URL (không hardcode domain)
    const goUrl = `/go/${type}${subpathParam}`;
    console.log("🔗 Redirecting to:", goUrl);
    window.location.href = goUrl;
  };

  return {
    ...data,
    navTo,
    isLoading,
    error,
    segment,
  };
};
