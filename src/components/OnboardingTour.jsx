import React, { useState, useEffect, useRef } from 'react'

const TOUR_STEPS = [
  {
    id: 'lang-and-run',
    targetId: 'tour-step-run',
    title: '🚀 Choose Language & Run Code',
    badge: 'Step 1 of 5',
    clickAction: 'Click the green "▶ Run Code" button in the top toolbar (or press Ctrl + Enter)',
    description: 'Select your preferred language (Python, C, Java, C++, JS, Rust, Go...) from the top-left dropdown, then click ▶ Run Code to execute your program instantly!',
    icon: '⚡'
  },
  {
    id: 'multi-file-tabs',
    targetId: 'tour-step-tabs',
    title: '📁 Multi-File Code Tabs',
    badge: 'Step 2 of 5',
    clickAction: 'Click the "+ New Tab" button right next to main.py tab',
    description: 'Working on multi-file projects? Click "+ New Tab" to add new code files, double-click any tab to rename it, and switch between files effortlessly.',
    icon: '📁'
  },
  {
    id: 'format-code',
    targetId: 'tour-step-format',
    title: '✨ Code Beautifier & Format Code',
    badge: 'Step 3 of 5',
    clickAction: 'Click the "✨ Format Code" button on the top-right of Editor panel',
    description: 'Clean up messy code with 1-click! Click ✨ Format Code to auto-indent, fix spacing, and beautify your code syntax instantly.',
    icon: '✨'
  },
  {
    id: 'terminal-output',
    targetId: 'tour-step-terminal',
    title: '🖥️ Interactive Stdin & Terminal Output',
    badge: 'Step 4 of 5',
    clickAction: 'Click inside the Stdin prompt in the right-side Terminal panel',
    description: 'View execution logs, speed, and return status. For interactive code requiring user input (like scanf or input()), type directly into the terminal Stdin prompt!',
    icon: '🖥️'
  },
  {
    id: 'share-code',
    targetId: 'tour-step-share',
    title: '📤 Share Code & Cloud Storage',
    badge: 'Step 5 of 5',
    clickAction: 'Click the "📤 Share Code" button on the top-right toolbar',
    description: 'Share your solutions with friends, teachers, or colleagues! Click 📤 Share Code to generate a short link or a 4-digit PIN for instant access.',
    icon: '📤'
  }
]

export default function OnboardingTour({ isOpen, onClose, isMobile }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetRect, setTargetRect] = useState(null)
  const cardRef = useRef(null)

  // Update target rectangle when step changes or window resizes
  useEffect(() => {
    if (!isOpen) return

    const updateRect = () => {
      const step = TOUR_STEPS[currentStep]
      if (!step || !step.targetId) {
        setTargetRect(null)
        return
      }

      const el = document.getElementById(step.targetId) || document.querySelector(`.${step.targetId}`)
      if (el) {
        const rect = el.getBoundingClientRect()
        setTargetRect({
          top: rect.top - 6,
          left: rect.left - 6,
          width: rect.width + 12,
          height: rect.height + 12
        })
        // Scroll element into view if out of viewport
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      } else {
        setTargetRect(null)
      }
    }

    updateRect()
    window.addEventListener('resize', updateRect)
    window.addEventListener('scroll', updateRect)

    return () => {
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect)
    }
  }, [isOpen, currentStep])

  if (!isOpen) return null

  const step = TOUR_STEPS[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === TOUR_STEPS.length - 1

  const handleNext = () => {
    if (isLastStep) {
      handleComplete()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = () => {
    try {
      localStorage.setItem('has_seen_compiler_tour', 'true')
    } catch (e) {}
    onClose()
  }

  // Determine card position relative to spotlight target
  let tooltipStyle = {}
  if (targetRect && !isMobile && window.innerWidth > 768) {
    const spaceBelow = window.innerHeight - (targetRect.top + targetRect.height)
    const spaceAbove = targetRect.top

    if (spaceBelow >= 240) {
      // Position below target
      tooltipStyle = {
        top: `${targetRect.top + targetRect.height + 14}px`,
        left: `${Math.max(20, Math.min(window.innerWidth - 460, targetRect.left + (targetRect.width / 2) - 220))}px`,
      }
    } else if (spaceAbove >= 240) {
      // Position above target
      tooltipStyle = {
        top: `${Math.max(10, targetRect.top - 260)}px`,
        left: `${Math.max(20, Math.min(window.innerWidth - 460, targetRect.left + (targetRect.width / 2) - 220))}px`,
      }
    } else {
      // Center fallback
      tooltipStyle = {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    }
  } else {
    // Mobile center fallback
    tooltipStyle = {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  return (
    <div className="tour-overlay-container">
      {/* Backdrop (Invisible overlay to allow viewing page background cleanly) */}
      <div className="tour-backdrop" onClick={handleComplete} />

      {/* Spotlight highlight element */}
      {targetRect && (
        <div
          className="tour-spotlight-box"
          style={{
            top: `${targetRect.top}px`,
            left: `${targetRect.left}px`,
            width: `${targetRect.width}px`,
            height: `${targetRect.height}px`
          }}
        >
          <div className="tour-spotlight-pulse" />
        </div>
      )}

      {/* Tour Tooltip Modal Card */}
      <div
        ref={cardRef}
        className="tour-card-modal"
        style={tooltipStyle}
      >
        {/* Top bar with step badge & close */}
        <div className="tour-card-header">
          <div className="tour-badge-pill">
            <span className="tour-badge-dot" />
            <span>{step.badge}</span>
          </div>
          <button
            type="button"
            className="tour-close-btn"
            onClick={handleComplete}
            title="Skip tour"
          >
            ✕
          </button>
        </div>

        {/* Content body */}
        <div className="tour-card-body">
          <div className="tour-icon-title">
            <span className="tour-step-icon">{step.icon}</span>
            <h3 className="tour-step-title">{step.title}</h3>
          </div>
          
          <p className="tour-step-desc">{step.description}</p>

          {/* Explicit Click Location Callout Box */}
          <div className="tour-click-action-box">
            <div className="tour-click-header">
              <span className="tour-click-badge">👉 WHERE TO CLICK:</span>
            </div>
            <div className="tour-click-text">{step.clickAction}</div>
          </div>
        </div>

        {/* Step dots & Navigation Footer */}
        <div className="tour-card-footer">
          {/* Step dots */}
          <div className="tour-dots-indicator">
            {TOUR_STEPS.map((s, idx) => (
              <span
                key={s.id}
                className={`tour-dot ${idx === currentStep ? 'active' : idx < currentStep ? 'completed' : ''}`}
                onClick={() => setCurrentStep(idx)}
                title={`Go to ${s.title}`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="tour-nav-buttons">
            {!isFirstStep && (
              <button
                type="button"
                className="tour-btn tour-btn-secondary"
                onClick={handlePrev}
              >
                ◀ Back
              </button>
            )}
            <button
              type="button"
              className="tour-btn tour-btn-primary"
              onClick={handleNext}
            >
              {isLastStep ? 'Got it! Start Coding 🚀' : 'Next Step ▶'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
