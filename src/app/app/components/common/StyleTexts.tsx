import React, { useState, useEffect, useMemo, ReactNode, useRef, useLayoutEffect } from 'react';
import styles from "@/app/app/page.module.css";
import { useKBState } from '@/store/kbState';
import SyntaxHighlighter from 'react-syntax-highlighter';

const glitchChars = '!@#$%^&*()-_=+{}[]|;:,.<>?';

// Helper function to extract text content from React children
function getTextContent(node: React.ReactNode): string {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join('');

    if (React.isValidElement(node)) {
        // Safely access props with type assertion
        const element = node as React.ReactElement<{ children?: React.ReactNode }>;
        return getTextContent(element.props.children);
    }

    return '';
}

interface GlitchTextProps {
    children?: ReactNode;
    intervalMs?: number;
    markersEnabled?: boolean;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ children, intervalMs = 100, markersEnabled = false }) => {
    const originalText = useMemo(() => getTextContent(children), [children]);
    const [displayedText, setDisplayedText] = useState<string>(generateGlitchedText(originalText));
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (!hover) {
            const interval = setInterval(() => {
                setDisplayedText(generateGlitchedText(originalText));
            }, intervalMs);
            return () => clearInterval(interval);
        } else {
            setDisplayedText(originalText);
        }
    }, [hover, originalText, intervalMs]);

    return (
        <>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"<<<hack>>"}</span>
            )}
            <span
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ fontFamily: 'monospace' }}
            >
                {hover ? children : displayedText}
            </span>

            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"</"}&nbsp;{">"}</span>
            )}
        </>
    );
};



interface GradientTextProps {
    children?: ReactNode;
    markersEnabled?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({ children, markersEnabled = false }) => {
    return (
        <>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"<<<cool>>"}</span>
            )}
            <span className={styles.coolTextStyle}>{children}</span>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"</"}&nbsp;{">"}</span>
            )}
        </>);
};

interface ColorfulTextProps {
    children?: ReactNode;
    time: string;
    markersEnabled?: boolean;
}

export const ColorfulText: React.FC<ColorfulTextProps> = ({ children, time, markersEnabled = false }) => {
    return (
        <>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"<<<colorful>>"}</span>
            )}
            <span className={styles.colorfulTextStyle} style={{ animationDuration: time }}>{children}</span>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"</"}&nbsp;{">"}</span>
            )}
        </>);
};

interface SpoilerTextProps {
    children?: ReactNode;
    markersEnabled?: boolean;
}

export const SpoilerText: React.FC<SpoilerTextProps> = ({ children, markersEnabled = false }) => {
    const [clicked, setClicked] = useState(false);
    const { kbState } = useKBState();
    const pressingAlt = kbState.includes("Alt");
    const handleClick = () => {
        if (pressingAlt) {
            setClicked(false);
        } else {
            setClicked(true);
        }
    }

    return (
        <>
            {!markersEnabled && (
                <span
                    className={`${styles.spoilerTextStyle} ${!clicked && styles.spoilerTextStyle_active}`}
                    style={{ cursor: clicked ? (pressingAlt ? "pointer" : "auto") : "pointer" }}
                    onClick={handleClick}
                >
                    {clicked ? children : getTextContent(children).replace(/./g, '█')}
                </span>
            )}
            {markersEnabled && (
                <>
                    <span className={styles.markerTextStyle}>{"||"}</span>
                    <span style={{ background: "var(--cb-color-black-transparent)" }}>{getTextContent(children)}</span>
                    <span className={styles.markerTextStyle}>{"||"}</span>
                </>
            )}
        </>
    );
};

interface LinkTextProps {
    url: string;
    children?: ReactNode;
    markersEnabled?: boolean;
    isReversed?: boolean;
}

export const LinkText: React.FC<LinkTextProps> = ({ url, children, markersEnabled = false, isReversed = false }) => {
    return (
        <>
            {!markersEnabled && (
                <a href={url} target="_blank" rel="noopener noreferrer" className={styles.linkTextStyle}>{children}</a>
            )}
            {markersEnabled && (
                <>
                    {isReversed ? (
                        <>
                            <span className={styles.markerTextStyle}>{"("}</span>
                            <span style={{ color: "var(--cb-color-cyan)" }}>{url}</span>
                            <span className={styles.markerTextStyle}>{")"}</span>
                            <span className={styles.markerTextStyle}>{"["}</span>
                            <span style={{ color: "var(--cb-color-black)" }}>{children}</span>
                            <span className={styles.markerTextStyle}>{"]"}</span>
                        </>
                    ) : (
                        <>
                            <span className={styles.markerTextStyle}>{"["}</span>
                            <span style={{ color: "var(--cb-color-cyan)" }}>{children}</span>
                            <span className={styles.markerTextStyle}>{"]"}</span>
                            <span className={styles.markerTextStyle}>{"("}</span>
                            <span style={{ color: "var(--cb-color-black)" }}>{url}</span>
                            <span className={styles.markerTextStyle}>{")"}</span>
                        </>
                    )}
                </>
            )}
        </>
    );
};

interface ColoredTextProps {
    color: string;
    children?: ReactNode;
    markersEnabled?: boolean;
}

const IsHexColor = (text: string) => /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test(text);

export const ColoredText: React.FC<ColoredTextProps> = ({ color, children, markersEnabled = false }) => {
    return (
        <>
            {markersEnabled && (
                <>
                    <span className={styles.markerTextStyle}>{`%${color}"`}</span>
                </>
            )}
            <span style={{ color: IsHexColor(color) ? color : "var(--cb-color-black)" }}>{children}</span>
            {markersEnabled && (
                <>
                    <span className={styles.markerTextStyle}>{`"`}</span>
                </>
            )}
        </>);
};

interface ColoredTextNameProps {
    color: string;
    children?: ReactNode;
    markersEnabled?: boolean;
}

export const ColoredTextName: React.FC<ColoredTextNameProps> = ({ color, children, markersEnabled = false }) => {
    return (
        <>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{`%${color}"`}</span>
            )}
            <span style={{ color }}>{children}</span>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{`"`}</span>
            )}
        </>
    );
};

interface ColoredTextRGBProps {
    colorR: string;
    colorG: string;
    colorB: string;
    children?: ReactNode;
    markersEnabled?: boolean;
}

export const ColoredTextRGB: React.FC<ColoredTextRGBProps> = ({ colorR, colorG, colorB, children, markersEnabled = false }) => {
    return (
        <>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{`%${colorR},${colorG},${colorB}"`}</span>
            )}
            <span style={{ color: `rgb(${colorR},${colorG},${colorB})` }}>{children}</span>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{`"`}</span>
            )}
        </>
    );
};

interface BacktickTextProps {
    children?: ReactNode;
    markersEnabled?: boolean;
}

export const BacktickText: React.FC<BacktickTextProps> = ({ children, markersEnabled = false }) => {
    return (
        <>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"`"}</span>
            )}
            <span className={styles.backtickTextStyle}>{children}</span>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"`"}</span>
            )}
        </>
    );
};

interface DoubleBacktickTextProps {
    children?: ReactNode;
    markersEnabled?: boolean;
}

export const DoubleBacktickText: React.FC<DoubleBacktickTextProps> = ({ children, markersEnabled = false }) => {
    return (
        <>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"``"}</span>
            )}
            <span className={styles.doubleBacktickTextStyle}>{children}</span>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"``"}</span>
            )}
        </>
    );
};

interface CodeTextProps {
    codeLanguage: string;
    children?: ReactNode;
    markersEnabled?: boolean;
}

export const CodeText: React.FC<CodeTextProps> = ({ codeLanguage, children, markersEnabled = false, }) => {
    return (
        <>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"```" + codeLanguage}</span>
            )}
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"\n"}</span>
            )}
            <SyntaxHighlighter language={codeLanguage} style={a11yDark}>
                {getTextContent(children)}
            </SyntaxHighlighter>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"```"}</span>
            )}
        </>
    );
};

interface CodeTextWithStyleProps {
    codeLanguage: string;
    style: string;
    children?: ReactNode;
    markersEnabled?: boolean;
}

import * as codeStyles from "react-syntax-highlighter/dist/esm/styles/hljs";
import localFont from 'next/font/local';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useCurrents } from '@/store/currents';
import { DefaultUserVariables } from '@/store/variablesStore';

export const CodeTextWithStyle: React.FC<CodeTextWithStyleProps> = ({ codeLanguage, style, children, markersEnabled = false }) => {
    return (
        <>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"```" + codeLanguage + ":" + style}</span>
            )}
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"\n"}</span>
            )}
            <SyntaxHighlighter
                language={codeLanguage}
                style={codeStyles[style as keyof typeof codeStyles] || a11yDark}
            >
                {getTextContent(children)}
            </SyntaxHighlighter>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"```"}</span>
            )}
        </>
    );
};

// Helper function for GlitchText
function generateGlitchedText(text: string): string {
    return text.split('').map(char => {
        return char === ' ' ? ' ' : glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }).join('');
}

interface TextShadowTextProps {
    children?: ReactNode;
    markersEnabled?: boolean;
}

export const TextShadowText: React.FC<TextShadowTextProps> = ({ children, markersEnabled = false }) => {
    return (
        <>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"~~"}</span>
            )}
            <span className={styles.textShadowTextStyle}>{children}</span>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"~~"}</span>
            )}
        </>
    );
};


interface UnimportantTextProps {
    children?: ReactNode;
    markersEnabled?: boolean;
}

export const UnimportantText: React.FC<UnimportantTextProps> = ({ children, markersEnabled = false }) => {
    return (
        <>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"//"}</span>
            )}
            <span className={styles.unimportantTextStyle}>{children}</span>
            {markersEnabled && (
                <span className={styles.markerTextStyle}>{"//"}</span>
            )}
        </>
    );
};


interface WDTextProps {
    children?: ReactNode;
    markersEnabled?: boolean;
}

const wingdings = localFont({
    src: '../../../../../public/fonts/wingding.ttf', // path to the local font file
    weight: '400',
    style: 'normal',
    variable: '--font-mycustom',
});

export const WDText: React.FC<WDTextProps> = ({ children, markersEnabled = false }) => {
    const measureRef = useRef<HTMLSpanElement>(null);
    const [maxWidth, setMaxWidth] = useState<number>();
    const text = getTextContent(children);

    useLayoutEffect(() => {
        const el = measureRef.current;
        if (el) {
            // getBoundingClientRect is more reliable for sub-pixel widths
            const width = el.getBoundingClientRect().width;
            setMaxWidth(width);
        }
    }, [children]);

    return (
        <>
            <>
                <span
                    ref={measureRef}
                    style={{
                        position: "absolute",
                        visibility: "hidden",
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                    }}
                >
                    {children}
                </span>
            </>
            <>
                {markersEnabled && (
                    <span className={styles.markerTextStyle}>{"<<<wd>>"}</span>
                )}
                {markersEnabled && (
                    <span className={`${wingdings.className} ${styles.wdTextStyle}`} style={{
                        maxWidth: maxWidth, overflow: "hidden", whiteSpace: "nowrap", display: "inline-block", verticalAlign: "bottom",
                    }}>{text}</span>)}
                {!markersEnabled && (
                    <span className={wingdings.className}>{children}</span>
                )}
                {markersEnabled && (
                    <span className={styles.markerTextStyle}>{"</"}&nbsp;{">"}</span>
                )}
            </>
        </>
    );
};

interface MentionTextProps {
    children?: ReactNode;
    markersEnabled?: boolean;
}


export const MentionText: React.FC<MentionTextProps> = ({ children, markersEnabled = false }) => {
    const text = getTextContent(children);

    const currents = useCurrents();
    const fontSize = currents.userVariables?.channelFontSize ?? DefaultUserVariables.channelFontSize;

    return (
        <>
            <div className={styles.mentionTextStyle}>
                <span><span style={{ fontSize, color: "var(--cb-color-cyan)" }}>@</span>{text}</span>
            </div>
        </>
    )
}

interface EscapedCharProps {
    children?: ReactNode;
    markersEnabled?: boolean;
}

export const EscapedChar: React.FC<EscapedCharProps> = ({ children, markersEnabled = false }) => {
    return (
        <>
            {markersEnabled && (
                <>
                    <span className={styles.markerTextStyle}>{"\\"}</span>
                </>
            )}
            <span>{children}</span>
        </>
    )
}