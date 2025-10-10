import { useState, useEffect } from 'react';

interface UseProgressAnimationProps {
  targetValue: number;
  duration?: number;
  delay?: number;
}

export const useProgressAnimation = ({
  targetValue,
  duration = 800,
  delay = 100,
}: UseProgressAnimationProps) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      
      const startTime = Date.now();
      const startValue = 0;
      const difference = targetValue - startValue;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const newValue = startValue + (difference * easeOut);
        
        setCurrentValue(newValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [targetValue, duration, delay]);

  return {
    currentValue,
    isAnimating,
  };
};