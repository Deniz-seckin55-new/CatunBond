import { JSX, ReactNode } from "react";
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

export interface UserResource {
    id: string;
    username: string | null;
    avatar: string;
}

export interface ContextMenu {
    x: number;
    y: number;
    shown: boolean;
}

export interface Currents {
    user: UserResource | null;
    server: Server | null;
    channel: Channel | null;
    exploreboxmode: Number | null;
    contextmenu: ContextMenu;
    contextmenumode: Number | null;
}

export interface Message {
    id: bigint | null;
    content: string;
    timestamp: Date;
    channel: Channel;
    repliedTo: string | null;
    author: User
}

export interface Channel {
    id: string;
    name: string;
}

export interface User {
    id: string;
    username: string;
    avatarUrl: string | null;
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

export enum SocketInformationType {
    ClientSendMessage
}

export enum AllowedTypes {
    Message
}

export interface SocketData {
    infoType: SocketInformationType,
    dataType: AllowedTypes,
    data: any
}

export interface MessageSocketPacket {
    Message: Message;
}

export interface ClientResponsePacket {
    dataType: AllowedTypes,
    data: any
}

export function getLocale() {
    if (navigator.languages !== undefined)
        return navigator.languages[0];
    return navigator.language ?? 'en-US';
}

export function getDayNameLocale(date: Date) {
    return date.toLocaleDateString(getLocale(), { weekday: 'long' });
}

const TurkishDayNames = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
const EnglishDayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const GermanDayNames = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

const TurkishTYT = ["Bugün", "Dün", "Yarın"];
const EnglishTYT = ["Today", "Yesterday", "Tomorrow"];
const GermanTYT = ["Heute", "Gestern", "Morgen"];
export function TranslateDayName(day: number) {
    if(getLocale().startsWith("tr")) {
        return TurkishDayNames[day];
    } else if(getLocale().startsWith("de")) {
        return GermanDayNames[day];
    } else {
        return EnglishDayNames[day];
    }
}

export function GetTodayNameLocale() {
    if(getLocale().startsWith("tr")) {
        return TurkishTYT[0]+' Saat';
    } else if(getLocale().startsWith("de")) {
        return GermanTYT[0]+' um';
    } else {
        return TurkishTYT[0]+' at';
    }
}

export function GetYesterdayNameLocale() {
    if(getLocale().startsWith("tr")) {
        return TurkishTYT[1]+' Saat';
    } else if(getLocale().startsWith("de")) {
        return GermanTYT[1]+' um';
    } else {
        return TurkishTYT[1]+' at';
    }
}

export function GetTomorrowNameLocale() {
    if(getLocale().startsWith("tr")) {
        return TurkishTYT[2]+' Saat';
    } else if(getLocale().startsWith("de")) {
        return GermanTYT[2]+' um';
    } else {
        return TurkishTYT[2]+' at';
    }
}

export function GetMessageDateString(date: Date): string {
    console.log(GetTodayNameLocale());
    const now = new Date();
    if (date.getDay() == now.getDay() && date.getMonth() == now.getMonth() && date.getFullYear() == now.getFullYear()) {
        return `${GetTodayNameLocale()} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`
    } else if (date.getDay() == (now.getDay() - 1) && date.getMonth() == now.getMonth() && date.getFullYear() == now.getFullYear()) {
        return `${GetYesterdayNameLocale()} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`
    } else if (date.getDay() == (now.getDay() + 1) && date.getMonth() == now.getMonth() && date.getFullYear() == now.getFullYear()) {
        return `${GetTomorrowNameLocale()} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`
    } else {
        return `${date.getDay()}`
    }
}