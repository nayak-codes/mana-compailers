import { useEffect, useRef } from 'react';

/**
 * Adsterra Native Banner Component
 * Key: 7148fb8d43caa589b3fcd5902b27502e
 */
export function AdsterraNativeBanner() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if script already appended to document
    const scriptId = 'adsterra-native-script-7148fb8d43caa589b3fcd5902b27502e';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl30525513.effectivecpmnetwork.com/7148fb8d43caa589b3fcd5902b27502e/invoke.js';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="adsterra-native-container" style={{ margin: '16px 0', width: '100%', textAlign: 'center', minHeight: '100px' }}>
      <div id="container-7148fb8d43caa589b3fcd5902b27502e" ref={containerRef}></div>
    </div>
  );
}

/**
 * Generic Adsterra Banner Component for standard sizes:
 * 728x90, 320x50, 300x250, 160x600, etc.
 * 
 * Usage:
 * <AdsterraBanner atKey="YOUR_AD_KEY" width={728} height={90} />
 */
export function AdsterraBanner({ atKey, width = 728, height = 90, format = 'iframe' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !atKey) return;
    const container = containerRef.current;
    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.width = width;
    iframe.height = height;
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    
    container.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; }</style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : '${atKey}',
            'format' : '${format}',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/${atKey}/invoke.js"></script>
      </body>
      </html>
    `);
    doc.close();
  }, [atKey, width, height, format]);

  return (
    <div style={{ margin: '12px auto', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
      <div ref={containerRef} style={{ width: `${width}px`, height: `${height}px` }}></div>
    </div>
  );
}

export default AdsterraNativeBanner;
