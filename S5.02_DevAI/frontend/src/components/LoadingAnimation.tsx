import React, { useEffect, useState } from 'react';
import './LoadingAnimation.css';

interface LoadingAnimationProps {
  onComplete?: () => void;
  duration?: number;
  minDuration?: number;
  isReady?: boolean; // New prop to indicate when actual loading is complete
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  onComplete, 
  duration = 3000,
  minDuration = 2500,
  isReady = false
}) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [canComplete, setCanComplete] = useState(false);
  const [actualProgress, setActualProgress] = useState(0);

  const fullText = 'INITIALIZING FITBIT CYBER';
  const phrases = [
    'CONNECTING TO CYBERNET...',
    'AUTHENTICATING CREDENTIALS...',
    'LOADING USER PROFILE...',
    'SYNCHRONIZING DATA...',
    'INITIALIZING FITBIT CYBER...',
    'WELCOME TO THE MATRIX'
  ];

  useEffect(() => {
    const startTime = Date.now();
    let animationCompleted = false;
    
    // Adaptive progress calculation
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const baseProgress = Math.min((elapsed / duration) * 100, 95);
      
      if (isReady && elapsed >= minDuration) {
        // If data is ready and minimum time has passed, complete the animation
        if (!animationCompleted) {
          animationCompleted = true;
          setProgress(100);
          setCanComplete(true);
          setCurrentText('SYSTEM READY');
          
          setTimeout(() => {
            if (onComplete) {
              onComplete();
            }
          }, 500);
        }
      } else {
        // Normal progress animation
        setProgress(baseProgress);
        setActualProgress(baseProgress);
      }
    };

    // Progress animation timer
    const progressTimer = setInterval(updateProgress, 50);

    // Text typing animation
    let phraseIndex = 0;
    let charIndex = 0;

    const typeText = () => {
      if (phraseIndex < phrases.length && !animationCompleted) {
        const currentPhrase = phrases[phraseIndex];
        
        if (charIndex < currentPhrase.length) {
          setCurrentText(currentPhrase.substring(0, charIndex + 1));
          charIndex++;
          setTimeout(typeText, 50);
        } else {
          // Phrase complete, wait and move to next
          setTimeout(() => {
            phraseIndex++;
            charIndex = 0;
            setCurrentText('');
            typeText();
          }, 800);
        }
      }
    };

    typeText();

    // Cursor blinking
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Fallback completion (if isReady never becomes true)
    const fallbackTimer = setTimeout(() => {
      if (!animationCompleted) {
        console.warn('LoadingAnimation: Fallback completion triggered');
        animationCompleted = true;
        setProgress(100);
        setCanComplete(true);
        setCurrentText('INITIALIZATION COMPLETE');
        
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
        }, 500);
      }
    }, Math.max(duration, minDuration) + 1000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(cursorTimer);
      clearTimeout(fallbackTimer);
    };
  }, [duration, minDuration, isReady, onComplete]);

  return (
    <div className="loading-animation-overlay">
      <div className="loading-animation-container">
        {/* Background Grid Effect */}
        <div className="grid-background"></div>
        
        {/* Main Loading Content */}
        <div className="loading-content">
          {/* Logo Section */}
          <div className="loading-logo">
            <div className="logo-icon">⚡</div>
            <h1 className="logo-text">{fullText}</h1>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className={`progress-fill ${canComplete ? 'complete' : ''}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-text">{Math.round(progress)}%</div>
          </div>

          {/* Status Text */}
          <div className="status-container">
            <div className={`status-text ${canComplete ? 'ready' : ''}`}>
              {currentText}
              <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>|</span>
            </div>
          </div>

          {/* Scanning Lines Effect */}
          <div className="scanning-lines">
            <div className="scan-line"></div>
            <div className="scan-line"></div>
            <div className="scan-line"></div>
          </div>

          {/* Data Streams */}
          <div className="data-streams">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="data-stream" 
                style={{ 
                  left: `${15 + i * 15}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              ></div>
            ))}
          </div>

          {/* Circuit Pattern */}
          <div className="circuit-pattern">
            <svg width="100%" height="100%" viewBox="0 0 400 200">
              <path 
                d="M50,100 L100,100 L100,50 L200,50 L200,150 L300,150 L300,100 L350,100" 
                className="circuit-line"
              />
              <circle cx="100" cy="100" r="3" className="circuit-node" />
              <circle cx="200" cy="50" r="3" className="circuit-node" />
              <circle cx="200" cy="150" r="3" className="circuit-node" />
              <circle cx="300" cy="150" r="3" className="circuit-node" />
            </svg>
          </div>
        </div>

        {/* Holographic Effect */}
        <div className="holographic-overlay"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;