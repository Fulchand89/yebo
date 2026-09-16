import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * Reusable Tooltip Component using React Portal.
 * Immune to container `overflow: hidden` and `overflow-x: hidden`.
 * Automatically positions itself relative to the target element on the viewport.
 */
export function Tooltip({
  content,
  children,
  position = 'right',
  enabled = true,
  delay = 80,
  className = 'w-full',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const timerRef = useRef(null);
  const hideTimerRef = useRef(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case 'right':
        top = rect.top + rect.height / 2;
        left = rect.right + 10;
        break;
      case 'left':
        top = rect.top + rect.height / 2;
        left = rect.left - 10;
        break;
      case 'top':
        top = rect.top - 8;
        left = rect.left + rect.width / 2;
        break;
      case 'bottom':
      default:
        top = rect.bottom + 8;
        left = rect.left + rect.width / 2;
        break;
    }

    setCoords({ top, left });
  }, [position]);

  const showTooltip = useCallback(
    (immediate = false) => {
      if (!enabled || !content) return;
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }

      if (immediate || delay === 0) {
        calculatePosition();
        setIsVisible(true);
      } else {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          calculatePosition();
          setIsVisible(true);
        }, delay);
      }
    },
    [enabled, content, delay, calculatePosition]
  );

  const hideTooltip = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsVisible(false);
  }, []);

  const handleMouseEnter = () => {
    showTooltip(false);
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  const handleClick = () => {
    // Immediate show on click/tap
    showTooltip(true);
    // Auto dismiss after 2.5s if not hovered
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  };

  useEffect(() => {
    if (!isVisible) return;

    const handleScrollOrResize = () => {
      setIsVisible(false);
    };

    const handleOutsidePointer = (e) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    document.addEventListener('pointerdown', handleOutsidePointer);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
      document.removeEventListener('pointerdown', handleOutsidePointer);
    };
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const getTransform = () => {
    switch (position) {
      case 'right':
        return 'translate(0, -50%)';
      case 'left':
        return 'translate(-100%, -50%)';
      case 'top':
        return 'translate(-50%, -100%)';
      case 'bottom':
      default:
        return 'translate(-50%, 0)';
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        onClick={handleClick}
        className={`inline-flex ${className}`}
      >
        {children}
      </div>

      {isVisible &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="tooltip"
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              transform: getTransform(),
              zIndex: 9999,
            }}
            className="pointer-events-none px-3 py-1.5 bg-slate-900/95 backdrop-blur-xs text-white text-xs font-semibold rounded-lg shadow-xl ring-1 ring-white/10 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 select-none flex items-center gap-1.5"
          >
            {/* Arrow */}
            {position === 'right' && (
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-slate-900/95" />
            )}
            {position === 'left' && (
              <span className="absolute left-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-l-slate-900/95" />
            )}
            {position === 'top' && (
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-900/95" />
            )}
            {position === 'bottom' && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-slate-900/95" />
            )}

            {content}
          </div>,
          document.body
        )}
    </>
  );
}

export default Tooltip;
