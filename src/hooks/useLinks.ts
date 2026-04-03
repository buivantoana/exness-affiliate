// src/hooks/useLinks.js
import { useQuery } from 'react-query';
import { api } from '../service/api';

export const useLinks = () => {
  // Lấy subpath từ URL (ví dụ: /gold → "gold")
  const segment = window.location.pathname.split('/').filter(Boolean)[0] || null;

  const queryKey = ['links', segment];

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => api.getLinks(segment),
    staleTime: 60000,        // đúng theo yêu cầu tài liệu
    cacheTime: 300000,
  });

  // Hàm navigate đến các link affiliate
  const navTo = (type) => {
    if (!data) return;
    
    const link = data[`${type}Link`] || data.registerLink || '/';
    window.location.href = link;   // hoặc window.open(link, '_blank') nếu muốn
  };

  return {
    ...data,           // registerLink, tryDemoLink, liveChatLink, ...
    navTo,
    isLoading,
    error,
    segment,           // hữu ích khi debug
  };
};