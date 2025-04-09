import React, { useState, useEffect } from 'react';
import styles from "@/app/app/page.module.css";
import { useKBState } from '@/store/kbState';

interface GlitchTextProps {
  text: string;
  intervalMs?: number; // How often to update the glitch effect
}

const glitchChars = '!@#$%^&*()-_=+{}[]|;:,.<>?';

function generateGlitchedText(text: string): string {
  return text.split('').map(char => {
    if (char === ' ') return ' ';
    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
  }).join('');
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, intervalMs = 100 }) => {
  const [displayedText, setDisplayedText] = useState<string>(generateGlitchedText(text));
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    if (!hover) {
      // Start interval to update the glitch text
      const interval = setInterval(() => {
        setDisplayedText(generateGlitchedText(text));
      }, intervalMs);

      return () => clearInterval(interval);
    } else {
      // Show true text on hover
      setDisplayedText(text);
    }
  }, [hover, text, intervalMs]);

  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ fontFamily: 'monospace' }}
    >
      {displayedText}
    </span>
  );
};

interface ColorfulTextProps {
  text: string;
  time: string;
}

export const ColorfulText: React.FC<ColorfulTextProps> = ({ text, time }) => {
  return <span className={styles.colorfulTextStyle} style={{animationDuration: time}}>{text}</span>;
};

interface SpoilerTextProps {
  text: string;
}

export const SpoilerText: React.FC<SpoilerTextProps> = ({ text }) => {
  const [clicked, setclicked] = useState<boolean>(false);

  const handleClick = () => {
    setclicked(!useKBState.getState().kbState.includes("Alt"));
  };

  return <span className={`${styles.spoilerTextStyle} ${!clicked && styles.spoilerTextStyle_active}`} style={{cursor: clicked ? (useKBState.getState().kbState.includes("Alt") ? "pointer" : "auto") : "pointer"}} onClick={handleClick}>{text}</span>;
};