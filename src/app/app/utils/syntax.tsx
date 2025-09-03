import React, { JSX } from "react";
import { renderMatchContent } from "./utils";
export interface SyntaxPattern {
    className: string;
    pattern: RegExp;
}

interface SyntaxNode {
    type: "text" | "styled";
    content: string;
    className?: string;
    match?: RegExpMatchArray;
    children?: SyntaxNode[];
}

export function SyntaxHighlight(
    patterns: SyntaxPattern[],
    text: string,
    styles: Record<string, string>,
    messageId: string,
    markersEnabled: boolean = false,
    isReply: boolean = false
): JSX.Element[] {
    const tree = parseTree(text, patterns);
    return renderTree(tree, styles, undefined, markersEnabled, messageId, isReply);
}

function parseTree(text: string, patterns: SyntaxPattern[], depth = 0): SyntaxNode[] {
    if (depth > 10) return [{ type: "text", content: text }];

    // find earliest match…
    let earliestMatch: {
        index: number;
        match: RegExpMatchArray;
        pattern: SyntaxPattern;
    } | null = null;

    for (const pattern of patterns) {
        const re = new RegExp(pattern.pattern.source.replace("İ", String(depth)), pattern.pattern.flags);
        for (const match of text.matchAll(re)) {
            if (match.index == null) continue;
            if (!earliestMatch || match.index < earliestMatch.index) {
                earliestMatch = { index: match.index, match, pattern };
            }
        }
    }

    if (!earliestMatch) {
        return [{ type: "text", content: text }];
    }

    const { index, match, pattern } = earliestMatch;
    const before = text.slice(0, index);
    const fullMatch = match[0];

    // ← here’s the little change!
    const inner = match[match.length - 1] || "";

    const nodes: SyntaxNode[] = [];
    if (before) {
        nodes.push(...parseTree(before, patterns, depth));
    }

    nodes.push({
        type: "styled",
        content: inner,
        className: pattern.className,
        match,
        children: parseTree(inner, patterns, depth + 1),
    });

    const after = text.slice(index + fullMatch.length);
    if (after) {
        nodes.push(...parseTree(after, patterns, depth));
    }

    return nodes;
}


import ustyles from "./util.module.css";

function renderTree(
    nodes: SyntaxNode[],
    styles: Record<string, string>,
    keyPrefix = "",
    markersEnabled: boolean,
    messageId: string,
    isReply: boolean
): React.ReactElement[] {  // Explicitly return array of elements
    return nodes.map((node, i) => {
        const key = `${keyPrefix}-${i}`;

        if (node.type === "text") {
            return <span key={key}>{node.content}</span>;
        }

        const childrenContent = node.children
            ? renderTree(node.children, styles, key, markersEnabled, messageId, isReply)
            : undefined;

        const rendered = renderMatchContent(
            node.className!,
            node.match!,
            messageId,
            childrenContent,
            markersEnabled,
            isReply
        );

        if (React.isValidElement(rendered)) {
            return React.cloneElement(rendered, { key });
        }

        const className = `${styles[node.className!]} ${ustyles.hl}`;

        return (
            <span key={key} className={className}>
                {rendered}
            </span>
        );
    });
}