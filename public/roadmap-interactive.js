/**
 * Our Compiler — Interactive Roadmap Engine (2026)
 * Features:
 * 1. Interactive Progress Bar with LocalStorage persistence
 * 2. Clickable checklist items with instant progress calculation & sound/visual check
 * 3. Mac Window Dots on all code blocks (🔴 🟡 🟢)
 * 4. 1-Click Code Copy Button with visual feedback (📋 Copy -> ✓ Copied!)
 * 5. Automatic robust syntax highlighting for Python, C#, C++, JS, SQL
 */

(function () {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRoadmapInteractivity);
  } else {
    initRoadmapInteractivity();
  }

  function initRoadmapInteractivity() {
    initCodeBlocks();
    initChecklistProgress();
    initSmoothScroll();
  }

  // ── 1. Mac Terminal Header & Copy Code Button ──────────────────────────────
  function initCodeBlocks() {
    const codeCards = document.querySelectorAll('.rm-code-card');
    codeCards.forEach((card) => {
      const header = card.querySelector('.rm-code-header');
      const codeElem = card.querySelector('pre code');
      if (!header || !codeElem) return;

      // Add Mac Window Dots if not present
      if (!header.querySelector('.rm-code-dots')) {
        const dotsWrap = document.createElement('div');
        dotsWrap.className = 'rm-code-dots';
        dotsWrap.innerHTML = '<span class="rm-dot rm-dot-red"></span><span class="rm-dot rm-dot-yellow"></span><span class="rm-dot rm-dot-green"></span>';
        header.insertBefore(dotsWrap, header.firstChild);
      }

      // Add Copy Button if not present
      if (!header.querySelector('.rm-copy-btn')) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'rm-copy-btn';
        copyBtn.setAttribute('type', 'button');
        copyBtn.setAttribute('aria-label', 'Copy code snippet');
        copyBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> <span>Copy</span>';
        
        copyBtn.addEventListener('click', () => {
          const rawCode = codeElem.innerText;
          navigator.clipboard.writeText(rawCode).then(() => {
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> <span style="color:#22c55e;">Copied!</span>';
            setTimeout(() => {
              copyBtn.classList.remove('copied');
              copyBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> <span>Copy</span>';
            }, 2000);
          }).catch(() => {
            copyBtn.querySelector('span').innerText = 'Failed';
          });
        });

        header.appendChild(copyBtn);
      }

      // Apply Syntax Highlighting
      highlightCode(codeElem);
    });
  }

  // ── 2. Robust Client-Side Syntax Highlighting ──────────────────────────────
  function highlightCode(codeElem) {
    if (codeElem.dataset.highlighted) return;
    codeElem.dataset.highlighted = 'true';

    const rawCode = codeElem.textContent;

    const escapeHtml = (str) =>
      str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const tokenRegex = /(\/\/.*$|#.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b(?:using|public|private|protected|class|struct|namespace|static|void|int|float|double|bool|string|var|new|this|return|if|else|for|while|foreach|switch|case|break|continue|try|catch|finally|throw|def|import|from|as|in|is|not|and|or|lambda|async|await|const|let|function|interface|type|extends|implements|export|default|null|true|false)\b)|(\b\d+(?:\.\d+)?[fFdD]?\b)|(\b[A-Z][a-zA-Z0-9_]*\b)/gm;

    let result = '';
    let lastIndex = 0;
    let match;
    tokenRegex.lastIndex = 0;

    while ((match = tokenRegex.exec(rawCode)) !== null) {
      result += escapeHtml(rawCode.slice(lastIndex, match.index));
      const [full, comment, string, keyword, number, typeName] = match;
      if (comment) result += `<span class="sh-comment">${escapeHtml(comment)}</span>`;
      else if (string) result += `<span class="sh-string">${escapeHtml(string)}</span>`;
      else if (keyword) result += `<span class="sh-keyword">${escapeHtml(keyword)}</span>`;
      else if (number) result += `<span class="sh-number">${escapeHtml(number)}</span>`;
      else if (typeName) result += `<span class="sh-type">${escapeHtml(typeName)}</span>`;
      else result += escapeHtml(full);

      lastIndex = match.index + full.length;
    }
    result += escapeHtml(rawCode.slice(lastIndex));

    codeElem.innerHTML = result;
  }

  // ── 3. Interactive Progress Tracker & Checkpoints ─────────────────────────
  function initChecklistProgress() {
    const checklistItems = document.querySelectorAll('.rm-checklist-item');
    if (!checklistItems || checklistItems.length === 0) return;

    const storageKey = 'rm_progress_' + window.location.pathname.replace(/[^a-zA-Z0-9]/g, '_');
    let savedProgress = [];
    try {
      savedProgress = JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch (e) {
      savedProgress = [];
    }

    // Insert Progress Card right after hero or flowchart
    const insertionPoint = document.querySelector('.rm-flowchart') || document.querySelector('.rm-hero');
    if (insertionPoint && !document.querySelector('.rm-progress-card')) {
      const progressCard = document.createElement('div');
      progressCard.className = 'rm-progress-card';
      progressCard.innerHTML = `
        <div class="rm-progress-top">
          <div class="rm-progress-meta">
            <span class="rm-progress-icon">🎯</span>
            <div>
              <div class="rm-progress-title">Your Learning Journey</div>
              <div class="rm-progress-subtitle">Click topics below as you learn them — progress saves in browser</div>
            </div>
          </div>
          <div class="rm-progress-score">
            <span class="rm-progress-percent">0%</span>
            <span class="rm-progress-ratio">0 of ${checklistItems.length} topics done</span>
          </div>
        </div>
        <div class="rm-progress-bar-bg">
          <div class="rm-progress-bar-fill" style="width: 0%"></div>
        </div>
      `;
      insertionPoint.parentNode.insertBefore(progressCard, insertionPoint.nextSibling);
    }

    // Make items interactive
    checklistItems.forEach((item, index) => {
      item.setAttribute('role', 'checkbox');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-checked', 'false');
      item.classList.add('rm-interactive');

      // Check if previously completed
      if (savedProgress.includes(index)) {
        item.classList.add('is-completed');
        item.setAttribute('aria-checked', 'true');
      }

      // Click handler
      const toggleCheck = () => {
        const isNowCompleted = item.classList.toggle('is-completed');
        item.setAttribute('aria-checked', isNowCompleted ? 'true' : 'false');
        
        let currentSaved = [];
        try {
          currentSaved = JSON.parse(localStorage.getItem(storageKey) || '[]');
        } catch (e) {
          currentSaved = [];
        }

        if (isNowCompleted) {
          if (!currentSaved.includes(index)) currentSaved.push(index);
        } else {
          currentSaved = currentSaved.filter((i) => i !== index);
        }

        try {
          localStorage.setItem(storageKey, JSON.stringify(currentSaved));
        } catch (e) {}

        updateProgressUI(currentSaved.length, checklistItems.length);
      };

      item.addEventListener('click', toggleCheck);
      item.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggleCheck();
        }
      });
    });

    // Initial Progress render
    updateProgressUI(savedProgress.length, checklistItems.length);
  }

  function updateProgressUI(completed, total) {
    const percentElem = document.querySelector('.rm-progress-percent');
    const ratioElem = document.querySelector('.rm-progress-ratio');
    const fillElem = document.querySelector('.rm-progress-bar-fill');
    if (!percentElem || !ratioElem || !fillElem || total === 0) return;

    const percent = Math.round((completed / total) * 100);
    percentElem.innerText = percent + '%';
    ratioElem.innerText = `${completed} of ${total} topics done`;
    fillElem.style.width = percent + '%';

    if (percent === 100) {
      fillElem.classList.add('is-finished');
    } else {
      fillElem.classList.remove('is-finished');
    }
  }

  // ── 4. Smooth Scrolling for Flowchart links ────────────────────────────────
  function initSmoothScroll() {
    const flowLinks = document.querySelectorAll('.rm-flow-node');
    flowLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetElem = document.querySelector(targetId);
          if (targetElem) {
            e.preventDefault();
            targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            targetElem.classList.add('rm-target-highlight');
            setTimeout(() => {
              targetElem.classList.remove('rm-target-highlight');
            }, 1500);
          }
        }
      });
    });
  }
})();
