import { useEffect, useRef } from 'react';

/**
 * NativeBanner Component for Adsterra
 * Standard native ad widget wrapper
 */
export default function NativeBanner({
  adKey = '7148fb8d43caa589b3fcd5902b27502e',
  scriptSrc = 'https://pl30525513.effectivecpmnetwork.com/7148fb8d43caa589b3fcd5902b27502e/invoke.js',
  className = ''
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scriptId = `adsterra-native-script-${adKey}`;
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = scriptSrc;
      document.body.appendChild(script);
    }
  }, [adKey, scriptSrc]);

  return (
    <div className={`adsterra-native-wrapper ${className}`} style={{ width: '100%', margin: '16px 0', textAlign: 'center' }}>
      <div id={`container-${adKey}`} ref={containerRef}></div>
    </div>
  );
}
