// src/hooks/useTracking.ts
import { useEffect, useRef } from 'react';
import { useLinks } from './useLinks';

export const useTracking = () => {
  const { gtmContainerId, ga4MeasurementId } = useLinks();
  const previousGa4Id = useRef<string | null>(null);

  // Inject GTM (cả 2 đoạn script: head + body)
  useEffect(() => {
    if (!gtmContainerId) {
      // Cleanup nếu xóa GTM ID
      const gtmHead = document.getElementById('gtm-head');
      const gtmBody = document.getElementById('gtm-body');
      if (gtmHead) gtmHead.remove();
      if (gtmBody) gtmBody.remove();
      return;
    }

    // Đoạn 1: script trong head
    if (!document.getElementById('gtm-head')) {
      const script = document.createElement('script');
      script.id = 'gtm-head';
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];
        w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});
        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";
        j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;
        f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","${gtmContainerId}");
      `;
      document.head.appendChild(script);
      console.log('✅ GTM script injected:', gtmContainerId);
    }

    // Đoạn 2: noscript ngay sau body
    if (!document.getElementById('gtm-body')) {
      const noscript = document.createElement('noscript');
      noscript.id = 'gtm-body';
      noscript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmContainerId}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
      document.body.insertBefore(noscript, document.body.firstChild);
      console.log('✅ GTM noscript injected');
    }

    return () => {
      const gtmHead = document.getElementById('gtm-head');
      const gtmBody = document.getElementById('gtm-body');
      if (gtmHead) gtmHead.remove();
      if (gtmBody) gtmBody.remove();
      console.log('🧹 GTM scripts cleaned up');
    };
  }, [gtmContainerId]);

  // Inject GA4 - SỬA LẠI
  useEffect(() => {
    // Helper để cleanup GA4
    const cleanupGa4 = () => {
      const ga4Script = document.getElementById('ga4-script');
      if (ga4Script) ga4Script.remove();
      
      // Không nên delete window.gtag vì có thể ảnh hưởng
      // Chỉ reset dataLayer nếu cần
      if (window.dataLayer && window.dataLayer.length > 0) {
        console.log('🧹 GA4 dataLayer cleaned up');
      }
    };

    // Nếu không có GA4 ID, cleanup và thoát
    if (!ga4MeasurementId) {
      cleanupGa4();
      return;
    }

    // Nếu GA4 ID thay đổi, cleanup cái cũ trước
    if (previousGa4Id.current && previousGa4Id.current !== ga4MeasurementId) {
      console.log('🔄 GA4 ID changed, cleaning up old:', previousGa4Id.current);
      cleanupGa4();
    }

    // Chỉ inject nếu chưa có script hoặc ID đã thay đổi
    const existingScript = document.getElementById('ga4-script');
    if (!existingScript || previousGa4Id.current !== ga4MeasurementId) {
      console.log('📊 Injecting GA4:', ga4MeasurementId);
      
      // Tạo script tag
      const script = document.createElement('script');
      script.id = 'ga4-script';
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`;
      script.async = true;
      document.head.appendChild(script);

      // Khởi tạo window.gtag
      window.dataLayer = window.dataLayer || [];
      
      // ⭐ Quan trọng: Kiểm tra gtag đã tồn tại chưa
      if (!window.gtag) {
        window.gtag = function() { 
          window.dataLayer?.push(arguments); 
        };
      }
      
      // Gọi gtag
      window.gtag('js', new Date());
      window.gtag('config', ga4MeasurementId);
      
      // Lưu lại ID hiện tại
      previousGa4Id.current = ga4MeasurementId;
    }

    // Cleanup khi component unmount hoặc ID thay đổi
    return () => {
      // Không cleanup ngay lập tức vì có thể ID vừa thay đổi
      // Cleanup sẽ được xử lý ở đầu effect
    };
  }, [ga4MeasurementId]);

  // Debug log
  useEffect(() => {
    console.log('🔍 Tracking status:', {
      gtm: gtmContainerId || 'not configured',
      ga4: ga4MeasurementId || 'not configured',
    });
  }, [gtmContainerId, ga4MeasurementId]);
};