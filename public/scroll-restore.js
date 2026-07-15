// Preserve scroll position when navigating between pages
(function() {
  // Restore scroll position on page load
  window.addEventListener('load', function() {
    const scrollPos = sessionStorage.getItem('scrollPos');
    if (scrollPos) {
      window.scrollTo(0, parseInt(scrollPos, 10));
      sessionStorage.removeItem('scrollPos');
    }
  });

  // Save scroll position before navigating away
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname === window.location.hostname) {
      // Only save for same-domain links
      sessionStorage.setItem('scrollPos', window.scrollY);
    }
  });
})();
