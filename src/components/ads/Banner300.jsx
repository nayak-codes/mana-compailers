import { useEffect, useRef } from 'react';

/**
 * Banner300 Component for Adsterra (300x250 Medium Rectangle)
 * Uses isolated iframe context to execute script safely without window.atOptions collisions
 */
export default function Banner300({ adKey = 'd44e5022661dec5b70f9d8884d9d4c38', className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !adKey) return;
    const container = containerRef.current;
    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.width = '300';
    iframe.height = '250';
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
            'height' : 250,
            'width' : 300,
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
    <div className={`adsterra-banner-300 ${className}`} style={{ margin: '12px auto', textAlign: 'center', display: 'flex', justifyContent: 'center', minHeight: '250px' }}>
      {adKey ? (
        <div ref={containerRef} style={{ width: '300px', height: '250px' }}></div>
      ) : (
        <div style={{ width: '300px', height: '250px', border: '1px dashed #30363d', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e', fontSize: '13px' }}>
          Adsterra 300x250 Banner (Pass adKey prop)
        </div>
      )}
    </div>
  );
}
