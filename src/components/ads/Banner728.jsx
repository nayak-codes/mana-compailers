import { useEffect, useRef } from 'react';

/**
 * Banner728 Component for Adsterra (728x90)
 * Uses isolated iframe context to execute script safely without window.atOptions collisions
 */
export default function Banner728({ adKey = 'dee3a7589e2999900cad19c8f354a5a8', className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !adKey) return;
    const container = containerRef.current;
    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.width = '728';
    iframe.height = '90';
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
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>
      </body>
      </html>
    `);
    doc.close();
  }, [adKey]);

  return (
    <div className={`adsterra-banner-728 ${className}`} style={{ margin: '12px auto', textAlign: 'center', display: 'flex', justifyContent: 'center', minHeight: '90px' }}>
      {adKey ? (
        <div ref={containerRef} style={{ width: '728px', height: '90px' }}></div>
      ) : (
        <div style={{ width: '728px', height: '90px', border: '1px dashed #30363d', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e', fontSize: '13px' }}>
          Adsterra 728x90 Banner (Pass adKey prop)
        </div>
      )}
    </div>
  );
}
