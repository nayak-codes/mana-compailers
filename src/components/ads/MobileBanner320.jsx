import { useEffect, useRef } from 'react';

/**
 * MobileBanner320 Component for Adsterra (320x50 Mobile Leaderboard)
 * Uses isolated iframe context to execute script safely without window.atOptions collisions
 */
export default function MobileBanner320({ adKey = '6734480b17947578f44c486131a56cce', className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !adKey) return;
    const container = containerRef.current;
    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.width = '320';
    iframe.height = '50';
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
            'height' : 50,
            'width' : 320,
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
    <div className={`adsterra-mobile-banner-320 ${className}`} style={{ margin: '12px auto', textAlign: 'center', display: 'flex', justifyContent: 'center', minHeight: '50px' }}>
      {adKey ? (
        <div ref={containerRef} style={{ width: '320px', height: '50px' }}></div>
      ) : (
        <div style={{ width: '320px', height: '50px', border: '1px dashed #30363d', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e', fontSize: '12px' }}>
          Adsterra 320x50 Mobile Banner (Pass adKey prop)
        </div>
      )}
    </div>
  );
}
