import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Check, MousePointerClick } from 'lucide-react';

export default function DwellButton({
  children,
  onClick,
  isAdaptiveActive = false,
  dwellTimeMs = 500,
  className = '',
  disabled = false,
  type = 'button'
}) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);

  const holdTimerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const startHold = (e) => {
    if (disabled || isTriggered) return;

    if (!isAdaptiveActive) {
      // Normal click mode
      return;
    }

    setIsHolding(true);
    startTimeRef.current = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / dwellTimeMs) * 100);
      setProgress(pct);

      if (elapsed >= dwellTimeMs) {
        clearInterval(progressIntervalRef.current);
        setIsTriggered(true);
        setIsHolding(false);
        setProgress(100);
        
        // Trigger action
        if (onClick) onClick(e);

        setTimeout(() => {
          setIsTriggered(false);
          setProgress(0);
        }, 1000);
      }
    }, 16);
  };

  const cancelHold = () => {
    if (!isAdaptiveActive) return;
    setIsHolding(false);
    setProgress(0);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
  };

  const handleClick = (e) => {
    if (disabled) return;
    if (!isAdaptiveActive) {
      if (onClick) onClick(e);
    }
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    };
  }, []);

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      className={`relative overflow-hidden transition-all duration-200 select-none ${
        isAdaptiveActive
          ? 'py-4 px-7 text-sm sm:text-base font-bold rounded-2xl shadow-lg ring-2 ring-teal-400/40 hover:ring-teal-400 active:scale-98'
          : 'py-2.5 px-6 text-xs sm:text-sm font-semibold rounded-xl'
      } ${className}`}
    >
      {/* Progress Fill Bar for Dwell Click */}
      {isAdaptiveActive && (
        <div
          className="absolute inset-0 bg-teal-300/30 transition-all duration-75 pointer-events-none"
          style={{ width: `${progress}%` }}
        />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isTriggered ? (
          <>
            <Check className="w-5 h-5 text-teal-200 animate-bounce" />
            <span>Confirmed!</span>
          </>
        ) : (
          <>
            {children}
            {isAdaptiveActive && (
              <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-black/20 text-teal-200 border border-teal-300/30">
                {isHolding ? `${Math.round(progress)}%` : 'Hold 500ms'}
              </span>
            )}
          </>
        )}
      </span>
    </button>
  );
}
