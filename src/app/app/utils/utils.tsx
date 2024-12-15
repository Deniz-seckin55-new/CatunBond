import { JSX } from "react";
import ustyles from "./util.module.css";

export interface Server {
    id: string;
    name: string;
    image: string;
}

export interface Channel {
    id: string;
    name: string;
}

export interface SyntaxPattern {
    pattern: RegExp;
    className: string;
}

export interface Currents {
    server: Server | null;
    channel: Channel | null;
}

export type ViewingFriendsDiv = 'online' | 'offline' | 'blocked';

export function SyntaxHighlight(patterns: SyntaxPattern[], incoming: string, styles: any): JSX.Element[] {
    const elements: JSX.Element[] = [];
    let cursor = 0;

    for (const pattern of patterns) {
        const matches = incoming.matchAll(pattern.pattern);

        for (const match of matches) {
            if (match.index === undefined) continue;

            if (cursor < match.index) {
                elements.push(<span key={`text-${cursor}`}>{incoming.slice(cursor, match.index)}</span>);
            }

            elements.push(
                <span key={`match-${match.index}`} className={`${styles[pattern.className]} ${ustyles.hl}`}>
                    {match[0]}
                </span>
            );

            cursor = match.index + match[0].length;
        }
    }

    // Add any remaining text after the last match
    if (cursor < incoming.length) {
        elements.push(<span key={`text-${cursor}`} className={ustyles.hl}>{incoming.slice(cursor)}</span>);
    }

    return elements;
}

export function getLineHeight(element: HTMLElement): number {
    const computedStyle = window.getComputedStyle(element);
    const lineHeight = computedStyle.lineHeight;

    if (lineHeight === 'normal') {
        const fontSize = parseFloat(computedStyle.fontSize);
        return fontSize * 1.2; // Assuming normal line height is 1.2 times the font size
    }

    return parseFloat(lineHeight);
}