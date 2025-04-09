import { JSX, ReactNode, RefObject } from "react";
import { FriendRequest as DBFriendRequest, VoiceChat as DBVoiceChat, Prisma } from '@prisma/client';
import Appearance from "../components/settings/Appearance";
import { Category, Channel, DirectMessage, Message, SendMessageI, Server, User, VoiceChatInformation } from "./socket_utils";
import { DetailedDBUser } from "./socket_utils";
import emojiNames from "@/data/emojiList.json";
import { genInvite } from "@/app/api/v1/utils/utils";
import { useCurrents } from "@/store/currents";
import { ColorfulText, GlitchText, SpoilerText } from "../components/common/StyleTexts";
import ServerInformation from "../components/settings/ServerInformation";
import ServerInvites from "../components/settings/Invites";
import ChannelInformation from "../components/settings/ChannelInformation";

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
    currentID: string;
    currentObject: any;
}

export enum ExploreBoxMode {
    PublicServerList = 0,
    ServerJoin = 1,
    Loading = 2,
    AddFriend = 3,
    ServerCreate = 4,
    ChannelCreate = 5,
    CategoryCreate = 6,
    UserMute = 7,
    UserKick = 8,
    UserBan = 9,
}

export interface TooltipInfo {
    text: string;
    textColor: string;
    ref: HTMLDivElement | null;
    position: { left: number, top: number };
    visible: boolean;
}

export interface Currents {
    user: DetailedDBUser | null;
    server: Server | null;
    channel: Channel | null;
    exploreboxmode: ExploreBoxMode | null;
    contextmenu: ContextMenu;
    contextmenumode: ContextMenuMode | null;
    friendsdiv: FriendsDivStatus;
    directmessage: DirectMessage | null;
    setting: string | null;
    vc: DBVoiceChatWithMembers | null;
    voicechatopen: boolean;
    tooltip: TooltipInfo;
    settingsMode: SettingsMode;
    userFetching: boolean;
    BgBlurV: boolean;
    ExploreBoxV: boolean;
    confirmationMenu: boolean;
    confirmationMenuText: string;
    confirmationMenuRetypeText?: string;
    settingsDivV: boolean;
    SideBoxChannelsV: boolean;
    Categories: Category[];
    ServerUsersDivV: boolean;
    settingsObject: any;
    setSettingsObject: (settingsObject: any) => void;
    setServerUsersDivV: (ServerUsersDivV: boolean) => void;
    onClickAppIcon: () => void;
    setCategories: (categories: Category[]) => void;
    setSideBoxChannelsV: (SideBoxChannelsV: boolean) => void;
    setSettingsDivV: (settingDivV: boolean) => void;
    setconfirmationMenuRetypeText: (retype: (string | undefined)) => void;
    confirmationMenuCallback: (answer: boolean) => void,
    setconfirmationMenuCallback: (confirmationMenuCallback: (answer: boolean) => void) => void;
    setConfirmationMenuText: (text: string) => void;
    setConfirmationMenu: (confirmationMenu: boolean) => void;
    setBgBlurV: (BgBlurV: boolean) => void;
    setExploreBoxV: (ExploreBoxV: boolean) => void;
    setUserFetching: (fetching: boolean) => void;
    setChannel: (Channel: Channel | null) => void;
    setServer: (server: Server | null) => void;
    setExploreBoxMode: (exploreboxmode: ExploreBoxMode | null) => void;
    setUser: (user: DetailedDBUser | null) => void;
    setContextMenuShown: (shown: boolean) => void;
    setContextMenuXY: (x: number, y: number) => void;
    setContextMenuID: (currentID: string) => void;
    setContextMenuObject: (object: any) => void;
    setFriendsDivV: (visible: boolean) => void;
    setFriendsDivState: (status: ViewingFriendsDiv) => void;
    setDirectMessage: (directmessage: DirectMessage | null) => void;
    setSetting: (setting: string | null) => void;
    setVC: (vc: DBVoiceChatWithMembers | null) => void;
    setVCOpen: (voicechatopen: boolean) => void;
    setTooltipPosition: (left: number, top: number) => void;
    setSettingsMode: (settingsMode: SettingsMode) => void;
    setContextMenuMode: (mode: ContextMenuMode | null) => void;
    setVCUsers: (users: User[]) => void;
    setTooltipText: (text: string) => void;
    setTooltipTextColor: (textColor: string) => void;
    setTooltipV: (visible: boolean) => void;
    setTooltipRef: (ref: HTMLDivElement | null) => void;
    setUserServers: (servers: Server[]) => void;
    deleteUserServer: (server: Server) => void;
    addUserServer: (server: Server) => void;
}

export type SettingsMode = 'UserApp' | 'Server' | 'Channel' | 'Direct Message';

export type ContextMenuMode = 'User' | 'Channel' | 'Server' | 'Direct Message' | 'UserProfileView';

export interface FriendsDivStatus {
    visible: boolean,
    status: ViewingFriendsDiv,
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

function renderMatchContent(className: string, match: RegExpMatchArray): JSX.Element | string {
    switch (className) {
        case "hackTextStyle":
            return <GlitchText text={match[1]} />;
        case "colorfulTextStyle":
            return <ColorfulText text={match[1]} time="10s" />;
        case "colorfulfastTextStyle":
            return <ColorfulText text={match[1]} time="5s" />;
        case "spoilerTextStyle":
            return <SpoilerText text={match[1]} />;
        default:
            return match[1];
    }
}

export function SyntaxHighlight(
    patterns: SyntaxPattern[],
    incoming: string,
    styles: Record<string, string>
): JSX.Element[] {
    const ustyles = require("./util.module.css");

    let elements: (string | JSX.Element)[] = [incoming]; // Start with the full text
    let lastIndex = 0;

    for (const pattern of patterns) {
        let newElements: (string | JSX.Element)[] = [];

        for (const el of elements) {
            if (typeof el === "string") {
                // If it's plain text, apply syntax highlighting
                const matches = [...el.matchAll(pattern.pattern)];
                let cursor = 0;

                for (const match of matches) {
                    if (match.index === undefined) continue;

                    // Add unstyled text before the match
                    if (cursor < match.index) {
                        newElements.push(el.slice(cursor, match.index));
                    }

                    // Add styled match
                    newElements.push(
                        <span key={`match-${lastIndex++}`} className={`${styles[pattern.className]} ${ustyles.hl}`}>
                            {renderMatchContent(pattern.className, match)}
                        </span>
                    );

                    cursor = match.index + match[0].length;
                }

                // Add any remaining text after the last match
                if (cursor < el.length) {
                    newElements.push(el.slice(cursor));
                }
            } else {
                // If it's already a JSX element, keep it
                newElements.push(el);
            }
        }

        elements = newElements;
    }

    return elements.map((el, index) =>
        typeof el === "string" ? <span key={`text-${index}`}>{el}</span> : el
    );
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

export type SettingUpdateType = 'UserInfo' | 'ServerInfo' | 'ServerInvites' | 'ChannelInfo';

export interface SettingsProps {
    Currents: Currents,
    updateSettings: (setting: string, data: any, dataType: SettingUpdateType, callbackFn: () => void) => void;
}

export const componentMap: Map<string, React.FC<SettingsProps>> = new Map([
    ["Appearance", Appearance],
    ["Server Information", ServerInformation],
    ["Invites", ServerInvites],
    ["Channel Information", ChannelInformation],
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
    setMessageInfos((prev: MessageInfo[]) =>
        prev.map((info: MessageInfo) =>
            info.Message.id === message.id
                ? { ...info, [key]: value } // Update the specific message
                : info // Keep the rest unchanged
        )
    );
}

export const onMouseOverTooltipElement = (ev: React.MouseEvent, text: string, currents: Currents) => {
    if (!currents.tooltip.ref) return;

    const rect = ev.currentTarget.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const tooltipHeight = currents.tooltip.ref.offsetHeight || 30;
    const tooltipWidth = currents.tooltip.ref.offsetWidth || 100;

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

    currents.setTooltipText(text);
    currents.setTooltipTextColor("#F0F7EE");
    currents.setTooltipPosition(left, top);
    currents.setTooltipV(true);
}

export const onMouseOverTooltipElementWithColor = (ev: React.MouseEvent, text: string, textColor: string, currents: Currents) => {
    if (!currents.tooltip.ref) return;

    const rect = ev.currentTarget.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const tooltipHeight = currents.tooltip.ref.offsetHeight || 30;
    const tooltipWidth = currents.tooltip.ref.offsetWidth || 100;

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

    currents.setTooltipText(text);
    currents.setTooltipTextColor(textColor);
    currents.setTooltipPosition(left, top);
    currents.setTooltipV(true);
}
export const onMouseLeaveTooltipElement = (currents: Currents) => {
    currents.setTooltipV(false);
}

export function _arrayBufferToBase64(buffer: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
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

    if (allAutocompletes.length === 0) return null;

    return allAutocompletes;
}

export function genTempID(): string {
    return "temp_" + genInvite(4) + Date.now().toString().slice(-2);
}

export function tempMessageToMessage(recievedMessage: SendMessageI): Message {
    var newMessage: Message = {
        author: recievedMessage.author,
        authorId: recievedMessage.author.id,
        channel: {
            id: recievedMessage.channelId,
            name: '',
            categoryId: '',
        },
        channelId: recievedMessage.channelId,
        content: recievedMessage.content,
        id: recievedMessage.tempID,
        timestamp: recievedMessage.timestamp,
        repliedToId: null,
        repliedTo: null,
    };

    if (recievedMessage.repliedToId && recievedMessage.repliedToAuthor) {
        newMessage.repliedToId = recievedMessage.repliedToId;
        newMessage.repliedTo = {
            author: {
                id: recievedMessage.repliedToAuthor.id,
                username: recievedMessage.repliedToAuthor.username,
                avatarUrl: recievedMessage.repliedToAuthor.avatarUrl,
            },
            authorId: recievedMessage.repliedToAuthor.id,
            channel: { id: '', name: '', categoryId: null },
            channelId: '', content: recievedMessage.repliedToContent!, id: '', repliedTo: null, repliedToId: null, timestamp: new Date(),
        }
    }

    return newMessage;
}

declare global {
    interface Number {
        clamp(min: number, max: number): number;
    }
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function (this: number, min: number, max: number): number {
    return Math.min(Math.max(this, min), max);
};

export async function copyToClipboard(content: string) {
    await navigator.clipboard.writeText(content);
}

export function OpenConfirmationMenu(currents: Currents, question: string, f: (answer: boolean) => void) {
    console.log("Openning Conf.Menu!");

    currents.setconfirmationMenuCallback(f);
    currents.setConfirmationMenuText(question);
    currents.setConfirmationMenu(true);
}

export function OpenConfirmationMenuWithRetype(currents: Currents, question: string, retypeText: string, f: (answer: boolean) => void) {
    console.log("Openning Conf.Menu!");

    currents.setconfirmationMenuCallback(f);
    currents.setConfirmationMenuText(question);
    currents.setconfirmationMenuRetypeText(retypeText);
    currents.setConfirmationMenu(true);
}