import React, { useState, useEffect } from 'react';
import styles from "@/app/app/page.module.css";
import { useKBState } from '@/store/kbState';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
  return <span className={styles.colorfulTextStyle} style={{ animationDuration: time }}>{text}</span>;
};

interface SpoilerTextProps {
  text: string;
}

export const SpoilerText: React.FC<SpoilerTextProps> = ({ text }) => {
  const [clicked, setclicked] = useState<boolean>(false);

  const handleClick = () => {
    setclicked(!useKBState.getState().kbState.includes("Alt"));
  };

  return <span className={`${styles.spoilerTextStyle} ${!clicked && styles.spoilerTextStyle_active}`} style={{ cursor: clicked ? (useKBState.getState().kbState.includes("Alt") ? "pointer" : "auto") : "pointer" }} onClick={handleClick}>{text}</span>;
};

interface LinkTextProps {
  text: string;
  url: string;
}

export const LinkText: React.FC<LinkTextProps> = ({ text, url }) => {
  return <a href={url} target='_blank' className={styles.linkTextStyle}>{text}</a>;
};

interface ColoredTextProps {
  text: string;
  color: string;
}

const IsHexColor = (text: string) => /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test(text);

export const ColoredText: React.FC<ColoredTextProps> = ({ text, color }) => {
  return <span style={{ color: IsHexColor(color) ? color : "var(--cb-color-black)" }}>{text}</span>;
};

interface ColoredTextNameProps {
  text: string;
  color: string;
}

export const ColoredTextName: React.FC<ColoredTextNameProps> = ({ text, color }) => {
  return <span style={{ color: color }}>{text}</span>;
};

interface ColoredTextRGBProps {
  text: string;
  colorR: string;
  colorG: string;
  colorB: string;
}

export const ColoredTextRGB: React.FC<ColoredTextRGBProps> = ({ text, ...colors }) => {
  return <span style={{ color: `rgb(${colors.colorR},${colors.colorG},${colors.colorB})` }}>{text}</span>;
};

interface BacktickTextProps {
  text: string;
};

export const BacktickText: React.FC<BacktickTextProps> = ({ text }) => {
  return <span className={styles.backtickTextStyle}>{text}</span>;
}


interface DoubleBacktickTextProps {
  text: string;
};

export const DoubleBacktickText: React.FC<DoubleBacktickTextProps> = ({ text }) => {
  return <span className={styles.doubleBacktickTextStyle}>{text}</span>;
}

interface CodeTextProps {
  text: string;
  codeLanguage: string;
};

export const CodeText: React.FC<CodeTextProps> = ({ text, codeLanguage }) => {
  return (
    <SyntaxHighlighter language={codeLanguage} style={a11yDark}>
      {text}
    </SyntaxHighlighter>
  )
}

interface CodeTextWithStyleProps {
  text: string;
  codeLanguage: string;
  style: string;
};

import codeStyles from "react-syntax-highlighter/dist/esm/styles/hljs";

export const CodeTextWithStyle: React.FC<CodeTextWithStyleProps> = ({ text, codeLanguage, style }) => {
  const selectedStyle = (style in codeStyles) ? codeStyles[style as keyof typeof codeStyles] : a11yDark;

  return (
    <SyntaxHighlighter language={codeLanguage} style={selectedStyle}>
      {text}
    </SyntaxHighlighter>
  );
}