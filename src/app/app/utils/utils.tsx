import { JSX, ReactNode, RefObject } from "react";
import { FriendRequest as DBFriendRequest } from '@prisma/client';
import Appearance from "../components/settings/Appearance";
import { Channel, DirectMessage, Message, Server, User } from "./socket_utils";

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

export enum ExploreBoxMode {
    PublicServerList = 0,
    ServerJoin = 1,
    Loading = 2,
    AddFriend = 3,
}

export interface Currents {
    user: UserResource | null;
    server: Server | null;
    channel: Channel | null;
    exploreboxmode: ExploreBoxMode | null;
    contextmenu: ContextMenu;
    contextmenumode: Number | null;
    friendsdiv: FriendsDivStatus;
    directmessage: DirectMessage | null;
    setting: string | null;
}

export interface FriendsDivStatus {
    visible: boolean,
    status: ViewingFriendsDiv,
}

export async function GetUser(id: string) {
    return (await (await fetch('/api/v1/user/get', {
        method: "POST",
        body: JSON.stringify({
            id: id
        })
    })).json()).data as User;
}

export function ToUser(resource: UserResource): User {
    return {
        id: resource.id,
        username: resource.username ?? '',
        avatarUrl: resource.avatar,
    }
}

export type ViewingFriendsDiv = 'online' | 'offline' | 'blocked' | 'pending';

export function SyntaxHighlight(patterns: SyntaxPattern[], incoming: string, styles: any): JSX.Element[] {
    const ustyles = require("./util.module.css");

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

export interface SettingsProps {
    Currents: Currents,
    updateSettings: (setting: string, data: any) => void;
    
}

export const componentMap: Map<string, React.FC<SettingsProps>> = new Map([
    ["Appearance", Appearance]
]);

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
    if (getLocale().startsWith("tr")) {
        return TurkishDayNames[day];
    } else if (getLocale().startsWith("de")) {
        return GermanDayNames[day];
    } else {
        return EnglishDayNames[day];
    }
}

export function GetTodayNameLocale() {
    if (getLocale().startsWith("tr")) {
        return TurkishTYT[0] + ' Saat';
    } else if (getLocale().startsWith("de")) {
        return GermanTYT[0] + ' um';
    } else {
        return TurkishTYT[0] + ' at';
    }
}

export function GetYesterdayNameLocale() {
    if (getLocale().startsWith("tr")) {
        return TurkishTYT[1] + ' Saat';
    } else if (getLocale().startsWith("de")) {
        return GermanTYT[1] + ' um';
    } else {
        return TurkishTYT[1] + ' at';
    }
}

export function GetTomorrowNameLocale() {
    if (getLocale().startsWith("tr")) {
        return TurkishTYT[2] + ' Saat';
    } else if (getLocale().startsWith("de")) {
        return GermanTYT[2] + ' um';
    } else {
        return TurkishTYT[2] + ' at';
    }
}

export function GetMessageDateString(date: Date): string {
    const now = new Date(Date.now());
    if (date.getDate() == now.getDate() && date.getMonth() == now.getMonth() && date.getFullYear() == now.getFullYear()) {
        return `${GetTodayNameLocale()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    } else if (date.getDate() == (now.getDate() - 1) && date.getMonth() == now.getMonth() && date.getFullYear() == now.getFullYear()) {
        return `${GetYesterdayNameLocale()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    } else if (date.getDate() == (now.getDate() + 1) && date.getMonth() == now.getMonth() && date.getFullYear() == now.getFullYear()) {
        return `${GetTomorrowNameLocale()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    } else {
        return `${(date.getDate()).toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} `
    }
}

export interface MessageInfo {
    Message: Message,
    deleteConfirm: boolean,
    editMode: boolean,
    ref: HTMLDivElement | null,
}

export const UpdateMessageInfo = (message: Message, key: any, value: any, setMessageInfos: any) => {
    setMessageInfos((prev: any) =>
        prev.map((info: any) =>
            info.Message.id === message.id
                ? { ...info, [key]: value } // Update the specific message
                : info // Keep the rest unchanged
        )
    );
}