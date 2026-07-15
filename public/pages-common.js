(function () {
  var theme = localStorage.getItem('theme') || 'dark';
  if (theme === 'light') {
    document.documentElement.classList.add('light-theme');
    document.addEventListener('DOMContentLoaded', function () {
      document.body.classList.add('light-theme');
    });
  }
})();

// Preserve scroll position when navigating between pages
(function() {
  // Restore scroll position on page load - wait for all images and content
  var restoreScrollTimeout;
  
  function restoreScroll() {
    var scrollPos = sessionStorage.getItem('scrollPos');
    if (scrollPos) {
      var pos = parseInt(scrollPos, 10);
      window.scrollTo(0, pos);
      sessionStorage.removeItem('scrollPos');
    }
  }
  
  // Try multiple times to restore - waits for layout to settle
  window.addEventListener('load', function() {
    restoreScroll();
    // Also try after a small delay to account for lazy-loaded content
    setTimeout(restoreScroll, 100);
    setTimeout(restoreScroll, 500);
  });

  // Also restore when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(restoreScroll, 50);
  });

  // Save scroll position before navigating away
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (link && link.hostname === window.location.hostname && !link.hasAttribute('download')) {
      // Only save for same-domain links (internal navigation)
      sessionStorage.setItem('scrollPos', window.scrollY);
    }
  });
})();
