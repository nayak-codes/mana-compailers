import { useEffect, useRef } from 'react';

/**
 * Banner160 Component for Adsterra (160x600 Wide Skyscraper)
 * Uses isolated iframe context to execute script safely without window.atOptions collisions
 */
export default function Banner160({ adKey = '342fe17c760603a5f2f1617d25ca0193', className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !adKey) return;
    const container = containerRef.current;
    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.width = '160';
    iframe.height = '600';
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
            'key' : '${adKey}',
            'format' : 'iframe',
            'height' : 600,
            'width' : 160,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/${adKey}/invoke.js"></script>
      </body>
      </html>
    `);
    doc.close();
  }, [adKey]);

  return (
    <div className={`adsterra-banner-160 ${className}`} style={{ margin: '12px auto', textAlign: 'center', display: 'flex', justifyContent: 'center', minHeight: '600px' }}>
      {adKey ? (
        <div ref={containerRef} style={{ width: '160px', height: '600px' }}></div>
      ) : (
        <div style={{ width: '160px', height: '600px', border: '1px dashed #30363d', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e', fontSize: '13px' }}>
          Adsterra 160x600 Banner (Pass adKey prop)
        </div>
      )}
    </div>
  );
}
