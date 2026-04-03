// src/hooks/useTracking.js
import { useEffect } from 'react';
import { useLinks } from './useLinks';

export const useTracking = () => {
  const { gtmContainerId, ga4MeasurementId } = useLinks();

  // Inject GTM (cả 2 đoạn script: head + body)
  useEffect(() => {
    if (!gtmContainerId) {
      // Cleanup nếu xóa GTM ID
      document.getElementById('gtm-head')?.remove();
      document.getElementById('gtm-body')?.remove();
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
    }

    return () => {
      document.getElementById('gtm-head')?.remove();
      document.getElementById('gtm-body')?.remove();
    };
  }, [gtmContainerId]);

  // Inject GA4
  useEffect(() => {
    if (!ga4MeasurementId) {
      document.getElementById('ga4-script')?.remove();
      delete window.gtag;
      return;
    }

    if (!document.getElementById('ga4-script')) {
      const script = document.createElement('script');
      script.id = 'ga4-script';
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { dataLayer.push(arguments); };
      gtag('js', new Date());
      gtag('config', ga4MeasurementId);
    }

    return () => {
      document.getElementById('ga4-script')?.remove();
    };
  }, [ga4MeasurementId]);
};