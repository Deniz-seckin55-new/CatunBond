import React, { JSX } from "react";
import { Prisma } from '@prisma/client';
import Appearance from "../components/settings/Appearance";
import { Category, Channel, ChannelInfo, DirectMessage, Message, SendMessageI, Server, ServerInfo, ServerInvites as SI, User, UserInfo, VoiceChatInformation } from "./socket_utils";
import { DetailedDBUser } from "./socket_utils";
import emojiNames from "@/data/emojiList.json";
import { genInvite } from "@/app/api/v1/utils/utils";
import { BacktickText, CodeText, CodeTextWithStyle, ColoredText, ColoredTextName, ColoredTextRGB, ColorfulText, DoubleBacktickText, EscapedChar, GlitchText, GradientText, LinkText, MentionText, SpoilerText, TextShadowText, UnimportantText, WDText } from "../components/common/StyleTexts";
import ServerInformation from "../components/settings/ServerInformation";
import ChannelInformation from "../components/settings/ChannelInformation";
import ChannelRules from "../components/settings/ChannelRules";
import { ChannelInfosStore } from "@/store/channelInfos";
import axios from "axios";
import ServerInvites from "../components/settings/Invites";
import emojiData from "@/data/emojiData.json";

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
    currentObject: unknown;
    includes: { label: string, action: (() => void) }[],
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
    settingsObject: unknown;
    userVariables: UserVariables | null;
    setUserVariables: (userVariables: UserVariables | null) => void;
    setSettingsObject: (settingsObject: unknown) => void;
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
    setContextMenuObject: (object: unknown) => void;
    setContextMenuIncludes: (includes: { label: string, action: (() => void) }[]) => void;
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

export type ContextMenuMode = 'User' | 'Channel' | 'Server' | 'Direct Message' | 'UserProfileView' | 'Message';

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

import { toArray as toArrayEmoji } from "react-emoji-render";
const isAsciiEmoji = (text: string) => {
    return /^[:;xX=8B][\-^]?[)(DPpOo3@$/|\\]+$/i.test(text.trim());
};

export const parseEmojis = (value: string) => {
    const emojisArray = toArrayEmoji(value);

    const newValue = emojisArray.reduce((previous: string, current: any) => {
        if (typeof current === "string") {
            return previous + current;
        }

        const original = current.props.children;

        // If it's an ASCII emoticon like ":D", ":p", don't convert
        if (typeof original === "string" && isAsciiEmoji(original)) {
            return previous + original;
        }

        return previous + original;
    }, "");

    return newValue;
};

export type ViewingFriendsDiv = 'online' | 'offline' | 'blocked' | 'pending';

import ustyles from "@/app/app/page.module.css";
import { UserVariables } from "@/store/variablesStore";
import AppLayout from "../components/settings/AppLayout";
export function renderMatchContent(
    className: string,
    match: RegExpMatchArray,
    children?: React.ReactNode,  // Single ReactNode instead of array
    markersEnabled?: boolean,
): React.ReactElement {  // Always return a ReactElement
    // Wrap all returns in React.createElement or JSX
    switch (className) {
        case "hackTextStyle":
            return <GlitchText markersEnabled={markersEnabled}>{children ?? match[1]}</GlitchText>;
        case "coolTextStyle":
            return <GradientText markersEnabled={markersEnabled}>{children ?? match[1]}</GradientText>;
        case "colorfulTextStyle":
            return <ColorfulText markersEnabled={markersEnabled} time="10s">{children ?? match[1]}</ColorfulText>;
        case "colorfulfastTextStyle":
            return <ColorfulText markersEnabled={markersEnabled} time="5s">{children ?? match[1]}</ColorfulText>;
        case "spoilerTextStyle":
            return <SpoilerText markersEnabled={markersEnabled}>{children ?? match[1]}</SpoilerText>;
        case "linkTextStyle":
            return <LinkText markersEnabled={markersEnabled} url={match[2]}>{match[1]}</LinkText>;
        case "linkTextStyleRev":
            return <LinkText markersEnabled={markersEnabled} isReversed={true} url={match[1]}>{match[2]}</LinkText>;
        case "coloredTextStyle":
            return <ColoredText markersEnabled={markersEnabled} color={match[1]} >{children ?? match[2]}</ColoredText>;
        case "coloredTextNameStyle":
            return <ColoredTextName markersEnabled={markersEnabled} color={match[1]}>{children ?? match[2]}</ColoredTextName>;
        case "coloredTextStyleRGB":
            return (
                <ColoredTextRGB markersEnabled={markersEnabled} colorR={match[1]} colorG={match[2]} colorB={match[3]}>
                    {children ?? match[4]}
                </ColoredTextRGB>
            );
        case "backtickTextStyle":
            return <BacktickText markersEnabled={markersEnabled}>{children ?? match[1]}</BacktickText>;
        case "doubleBacktickTextStyle":
            return <DoubleBacktickText markersEnabled={markersEnabled}>{children ?? match[1]}</DoubleBacktickText>;
        case "codeTextStyle":
            return <CodeText markersEnabled={markersEnabled} codeLanguage={match[1]}>{match[2]}</CodeText>;
        case "codeTextWithStyleStyle":
            return (
                <CodeTextWithStyle markersEnabled={markersEnabled} codeLanguage={match[1]} style={match[2]}>
                    {match[3]}
                </CodeTextWithStyle>
            );
        case "textShadowTextStyle":
            return <TextShadowText markersEnabled={markersEnabled}>{children ?? match[1]}</TextShadowText>;
        case "unimportantTextStyle":
            return <UnimportantText markersEnabled={markersEnabled}>{children ?? match[1]}</UnimportantText>
        case "emojiTextStyle":
            const parsed = parseEmojis(`:${match[1]}:`);
            return <span>{parsed}</span>;
        case "md_italic":
            if (markersEnabled)
                return <><span className={ustyles.markerTextStyle}>{"*"}</span><span className={ustyles[className]}>{children ?? match[1]}</span><span className={ustyles.markerTextStyle}>{"*"}</span></>;
            else
                return <span className={ustyles[className]}>{children ?? match[1]}</span>;
        case "md_bold":
            if (markersEnabled)
                return <><span className={ustyles.markerTextStyle}>{"**"}</span><span className={ustyles[className]}>{children ?? match[1]}</span><span className={ustyles.markerTextStyle}>{"**"}</span></>;
            else
                return <span className={ustyles[className]}>{children ?? match[1]}</span>;
        case "md_italicbold":
            if (markersEnabled)
                return <><span className={ustyles.markerTextStyle}>{"***"}</span><span className={ustyles[className]}>{children ?? match[1]}</span><span className={ustyles.markerTextStyle}>{"***"}</span></>;
            else
                return <span className={ustyles[className]}>{children ?? match[1]}</span>;
        case "rainbowTextStyle":
            if (markersEnabled)
                return <><span className={ustyles.markerTextStyle}>{"<<<rainbow>>"}</span><span className={ustyles[className]}>{children ?? match[1]}</span><span className={ustyles.markerTextStyle}>{"</ >"}</span></>;
            else
                return <span className={ustyles[className]}>{children ?? match[1]}</span>;
        case "wdTextStyle":
            return <WDText markersEnabled={markersEnabled}>{children ?? match[1]}</WDText>;
        case "escapedCharTextStyle":
            return <EscapedChar markersEnabled={markersEnabled}>{match[1]}</EscapedChar>;
        case "newLineTextStyle":
            return <br />
        case "mentionTextStyle":
            return <MentionText markersEnabled={markersEnabled}>{match[1]}</MentionText>
        default:
            return <span className={ustyles[className]}>{children ?? match[1]}</span>; // Wrap in fragment to ensure ReactElement return
    }
}
export function OLDSyntaxHighlight(
    patterns: SyntaxPattern[],
    incoming: string,
    styles: Record<string, string>
): JSX.Element[] {
    let elements: (string | JSX.Element)[] = [incoming]; // Start with the full text
    let lastIndex = 0;

    for (const pattern of patterns) {
        const newElements: (string | JSX.Element)[] = [];

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

export type SettingUpdateType = 'UserInfo' | 'UserVariables' | 'ServerInfo' | 'ServerInvites' | 'ChannelInfo';

export interface SettingsProps {
    Currents: Currents,
    updateSettings: (setting: string, data: UserInfo | UserVariables | ServerInfo | ChannelInfo | SI, dataType: SettingUpdateType, callbackFn: () => void) => void;
}

export const componentMap: Map<string, React.FC<SettingsProps>> = new Map([
    ["Appearance", Appearance],
    ["Server Information", ServerInformation],
    ["Invites", ServerInvites],
    ["Channel Information", ChannelInformation],
    ["Channel Rules", ChannelRules],
    ["App Appearance", AppLayout],
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
        return EnglishTYT[0] + ' at';
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

export const UpdateMessageInfo = (message: Message, key: string | number | symbol, value: unknown, setMessageInfos: (f: ((messagesList: MessageInfo[]) => MessageInfo[])) => void) => {
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
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export function _base64ToarrayBuffer(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
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

export const AllMessageSyntaxHighlights = [
    {
        className: "mentionTextStyle",
        pattern: /(?<!\\)\@([^ ]+)( |$)/g
    },
    {
        className: "newLineTextStyle",
        pattern: /\n$/g
    }, {
        className: "wdTextStyle",
        pattern: /<<<wd>>(.+?)(?<!\\)<\/İ>/gmi,
    }, {
        className: "emojiTextStyle",
        pattern: /(?<!\\):(.+?)(?<!\\):/gi
    }, {
        className: "unimportantTextStyle",
        pattern: /(?<!\\)\/\/(.+?)(?<!\\)\/\//gmi
    }, {
        className: "textShadowTextStyle",
        pattern: /(?<!\\)~~(.+?)(?<!\\)~~/gmi
    }, {
        className: "codeTextWithStyleStyle",
        pattern: /(?<!\\)```(.+?):(.+?)\n((.|\n)+)\n?(?<!\\)```/gmi,
    }, {
        className: "codeTextStyle",
        pattern: /(?<!\\)```(.+?)\n((.|\n)+)\n?(?<!\\)```/gmi,
    }, {
        className: "codeTextWithStyleStyle",
        pattern: /(?<!\\)!<(.+?):(.+?)\/(.+?)>/gmi,
    }, {
        className: "codeTextStyle",
        pattern: /(?<!\\)!<(.+?)\/(.+?)>/gmi,
    }, {
        className: "doubleBacktickTextStyle",
        pattern: /(?<!\\)``(.+?)(?<!\\)``/g,
    }, {
        className: "backtickTextStyle",
        pattern: /(?<!\\)`(.+?)(?<!\\)`/g,
    }, {
        className: "coloredTextNameStyle",
        pattern: /(?<!\\)\%([A-Z]+)\"(.+?)\"/gmi,
    }, {
        className: "coloredTextStyleRGB",
        pattern: /(?<!\\)\%([0-9]+),([0-9]+),([0-9]+)\"(.+?)\"/gm,
    }, {
        className: "coloredTextStyle",
        pattern: /(?<!\\)\%(.+?)\"(.+?)\"/gm,
    }, {
        className: "linkTextStyleRev",
        pattern: /(?<!\\)\((.+?)\)\[(.+?)\]/g,
    }, {
        className: "linkTextStyle",
        pattern: /(?<!\\)\[(.+?)\]\((.+?)\)/g,
    }, {
        className: "spoilerTextStyle",
        pattern: /(?<!\\)\|\|(.+?)(?<!\\)\|\|/gm
    }, {
        className: "colorfulfastTextStyle",
        pattern: /<<<colorfulfast>>(.+?)(?<!\\)<\/İ>/gm
    }, {
        className: "colorfulTextStyle",
        pattern: /<<<colorful>>(.+?)(?<!\\)<\/İ>/gm
    }, {
        className: "hackTextStyle",
        pattern: /<<<hack>>(.+?)(?<!\\)<\/İ>/gm
    }, {
        className: "coolTextStyle",
        pattern: /<<<cool>>(.+?)(?<!\\)<\/İ>/gm
    }, {
        className: "rainbowTextStyle",
        pattern: /<<<rainbow>>(.+?)(?<!\\)<\/İ>/gm
    }, {
        className: "md_italicbold",
        pattern: /(?<!\\)\*{3}(.+?)(?<!\\)\*{3}/gm
    }, {
        className: "md_bold",
        pattern: /(?<!\\)\*{2}(.+?)(?<!\\)\*{2}/gm
    }, {
        className: "md_italic",
        pattern: /(?<!\\)\*(.+?)(?<!\\)\*/gm
    }, {
        className: "escapedCharTextStyle",
        pattern: /\\(.)/g
    }];

export const fetchChannelInfo = async (channelId: string, channelInfoStore: ChannelInfosStore) => {
    try {
        const channelInfoExists = channelInfoStore.getExistingInfo(channelId);
        if (channelInfoExists) {
            return channelInfoExists;
        } else {
            if (channelInfoStore.fetching.includes(channelId)) {
                const waitForFetching = async (): Promise<unknown> => {
                    if (channelInfoStore.fetching.includes(channelId)) {
                        return new Promise(resolve => {
                            setTimeout(async () => {
                                resolve(await waitForFetching());
                            }, 250);
                        });
                    } else {
                        return channelInfoStore.getExistingInfo(channelId);
                    }
                }

                return await waitForFetching();
            };

            channelInfoStore.addfetchingInfo(channelId);
            const response = await axios.get(`/api/v1/channels/${channelId}/info`)
            channelInfoStore.addInfo(response.data.data);
            channelInfoStore.removefetchingInfo(channelId);

            return response.data.data;


        }
    } catch (error) {
        console.error("Error fetching server info:", error);
    } finally {

    }
};

export const isObjectNotNull = (value: unknown) => {
    return (typeof value === 'object') && value !== null
}

export const allEmojiDataList = emojiData.emojis;
export const getNameOfEmoji = (emoji: string) => {
    return allEmojiDataList.find(e => e.emoji === emoji)?.name.replace(' ', '_') ?? emoji;
}
export const getEmojiOfName = (name: string) => {
    return allEmojiDataList.find(e => e.name === name)?.emoji ?? name;
}

export const getIconOfFileExtension = (fileExtension: string): string | undefined => { // Not implemented yet: Missing file icon packs
    return "file2";
}

export const showAutoCompleteMentionRegex = /(?<!\\)\@([^ ]+)( |$)/gmi;
export const showAutoCompleteMentionRegexTrue = /(?<!\\)\@([^ \n]+)( |$)/gi;