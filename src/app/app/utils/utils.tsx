import { JSX, ReactNode, RefObject } from "react";
import { FriendRequest as DBFriendRequest, VoiceChat as DBVoiceChat, Prisma } from '@prisma/client';
import Appearance from "../components/settings/Appearance";
import { Channel, DirectMessage, Message, Server, User, VoiceChatInformation } from "./socket_utils";
import { DetailedDBUser } from "./socket_utils";
import emojiNames from "@/data/emojiList.json";

export type DBVoiceChatWithMembers = Prisma.VoiceChatGetPayload<{
    include: {
        members: { 
            select: {
                id: true,
                username: true,
                avatarUrl: true,
            }
        }
    }
}>

export type DBUser = Prisma.UserGetPayload<{
    select: {
        id: true,
        username: true,
        avatarUrl: true,
    }
}>;

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
    ServerCreate = 4,
}

export interface TooltipInfo {
    text: string;
    ref: HTMLDivElement  | null;
    position: {left: number, top: number};
    visible: boolean;
}

export interface Currents {
    user: DetailedDBUser | null;
    server: Server | null;
    channel: Channel | null;
    exploreboxmode: ExploreBoxMode | null;
    contextmenu: ContextMenu;
    contextmenumode: Number | null;
    friendsdiv: FriendsDivStatus;
    directmessage: DirectMessage | null;
    setting: string | null;
    vc: DBVoiceChatWithMembers | null;
    voicechatopen: boolean;
    tooltip: TooltipInfo;
    settingsMode: SettingsMode;
}

export type SettingsMode = 'UserApp' | 'Server' | 'Channel' | 'Direct Message'; 

export interface FriendsDivStatus {
    visible: boolean,
    status: ViewingFriendsDiv,
}

export async function GetUser(id: string) {
    return (await (await fetch(`/api/v1/users/${id}`)).json()).data as User;
}

export function ToUserSmall(resource: DetailedDBUser): User {
    return {
        id: resource.id,
        username: resource.username ?? '',
        avatarUrl: resource.avatarUrl,
    }
}

export function DBuserToUser(resource: DBUser): User {
    return {
        id: resource.id,
        username: resource.username ?? '',
        avatarUrl: resource.avatarUrl ?? '',
    }
}

export function ToVCInfo(dbvc: DBVoiceChatWithMembers): VoiceChatInformation {
    return {
        id: dbvc.channelId,
        users: dbvc.members.map(member => DBuserToUser(member)),
        startTime: dbvc.createdAt,
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

export const onMouseOverTooltipElement = (ev: React.MouseEvent, text: string, Currents: Currents, setCurrents: React.Dispatch<React.SetStateAction<Currents>>) => {
    if(!Currents.tooltip.ref) return;

    const rect = ev.currentTarget.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const tooltipHeight = Currents.tooltip.ref.offsetHeight || 30;
    const tooltipWidth = Currents.tooltip.ref.offsetWidth || 100;
    
    let top = rect.top + scrollY - tooltipHeight - 10; // Default: Above the button
    let left = rect.left + scrollX + rect.width / 2 - tooltipWidth / 2; // Center horizontally

    // Prevent tooltip from going out of the screen
    if (top < 0) {
        top = rect.bottom + scrollY + 10; // Move below if it overflows top
        //setPlacement("bottom");
    } else {
        //setPlacement("top");
    }

    if (left < 0) left = 10; // Prevent left overflow
    if (left + tooltipWidth > window.innerWidth) left = window.innerWidth - tooltipWidth - 10; // Prevent right overflow


    setCurrents((prev) => ({
        ...prev,
        tooltip: {
            text: text,
            position: {left: left, top: top},
            visible: true,
            ref: prev.tooltip.ref,
        }
    }));
}

export const onMouseLeaveTooltipElement = (setCurrents: React.Dispatch<React.SetStateAction<Currents>>) => {
    setCurrents((prev) => ({
        ...prev,
        tooltip: {
            ...prev.tooltip,
            visible: false,
        }
    }));
}

export function _arrayBufferToBase64( buffer: ArrayBuffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

export function _base64ToarrayBuffer(base64: string) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

export function AutocompleteEmojiName(text: string): string[] | null {
    const emojis: string[] = emojiNames.data;
    
    const allAutocompletes = emojis.filter((emojiName) => emojiName.startsWith(text));

    if(allAutocompletes.length === 0) return null;

    return allAutocompletes;
}