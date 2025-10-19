import React from "react";
import { Prisma } from '@prisma/client';
import Appearance from "../components/settings/Appearance";
import { Category, Channel, ChannelInfo, DirectMessage, Message, Server, ServerInfo, ServerInvites as SI, User, UserInfo, VoiceChatInformation } from "./socket_utils";
import { DetailedDBUser } from "./socket_utils";
import emojiNames from "@/data/emojiList.json";
import { genInvite } from "@/app/api/v1/utils/utils";
import { BacktickText, CodeText, CodeTextWithStyle, ColoredText, ColoredTextName, ColoredTextRGB, ColorfulText, DoubleBacktickText, EscapedChar, GlitchText, GlowingNameText, GradientText, LinkText, MentionText, ServerInviteText, SpoilerText, TextShadowText, UnimportantText, UrlTextStyle, WDText } from "../components/common/StyleTexts";
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
    UserSelectionScreen = 10,
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
    liveikitRoom: string;
    livekitShown: boolean;
    liveKitParticipant: {
        isMicrophoneEnabled: boolean;
        isScreenShareEnabled: boolean;
        isCameraEnabled: boolean;
        microphoneTrack: any | undefined;
        cameraTrack: any | undefined;
        lastMicrophoneError: Error | undefined;
        lastCameraError: Error | undefined;
        localParticipant: any;
    } | null;
    setLiveKitParticipant: (participant: {
        isMicrophoneEnabled: boolean;
        isScreenShareEnabled: boolean;
        isCameraEnabled: boolean;
        microphoneTrack: any | undefined;
        cameraTrack: any | undefined;
        lastMicrophoneError: Error | undefined;
        lastCameraError: Error | undefined;
        localParticipant: any;
    } | null) => void;
    fullScreenVideo: HTMLMediaElement | null;
    fsvIsMirrored: boolean;
    isChannelLoading: boolean;
    helpmenuShown: boolean,
    messageboxRef: HTMLTextAreaElement | null;
    messageBoxSavedSelection: { start: number, end: number };
    setTextWritten: (string: string) => void;
    setsetTextWritten: (setTextWritten: (string: string) => void) => void,
    setmessageBoxSavedSelection: (s: { start: number, end: number }) => void,
    setmessageBoxRef: (messageboxRef: HTMLTextAreaElement | null) => void;
    sethelpmenuShown: (helpmenuShown: boolean) => void;
    setisChannelLoading: (isChannelLoading: boolean) => void;
    setFsvIsMirrored: (fsvIsMirrored: boolean) => void;
    fsvReturnFunction: ((vid: HTMLMediaElement) => void) | null;
    setFsvReturnFunction: ((f: ((w: HTMLMediaElement) => void)) => void);
    setFullScreenVideo: (fsv: HTMLMediaElement | null) => void;
    setLivekitShown: (livekitShown: boolean) => void;
    setLiveikitRoom: (room: string) => void;
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
import { toast } from "react-toastify";
import { useCurrents } from "@/store/currents";
import { AppThemes } from "../components/settings/AppThemes";
export function renderMatchContent(
    className: string,
    match: RegExpMatchArray,
    messageId: string,
    children?: React.ReactNode,  // Single ReactNode instead of array
    markersEnabled?: boolean,
    isReply?: boolean,
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
            return <SpoilerText markersEnabled={markersEnabled} messageId={messageId}>{children ?? match[1]}</SpoilerText>;
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
        case "serverInviteTextStyle":
            return <ServerInviteText markersEnabled={markersEnabled}>{match[1]}</ServerInviteText>
        case "urlLinkTextStyle":
            return <UrlTextStyle markersEnabled={markersEnabled} isReply={isReply}>{children ?? match[1]}</UrlTextStyle>
        case "glowingTextNameStyle":
            return <GlowingNameText markersEnabled={markersEnabled} color={match[1]} quotes={false}>{match[2]}</GlowingNameText>
        case "glowingTextNameQuoteStyle":
            return <GlowingNameText markersEnabled={markersEnabled} color={match[1]} quotes={true}>{match[2]}</GlowingNameText>
        default:
            return <span className={ustyles[className]}>{children ?? match[1]}</span>; // Wrap in fragment to ensure ReactElement return
    }
}
// export function OLDSyntaxHighlight(
//     patterns: SyntaxPattern[],
//     incoming: string,
//     styles: Record<string, string>
// ): JSX.Element[] {
//     let elements: (string | JSX.Element)[] = [incoming]; // Start with the full text
//     let lastIndex = 0;

//     for (const pattern of patterns) {
//         const newElements: (string | JSX.Element)[] = [];

//         for (const el of elements) {
//             if (typeof el === "string") {
//                 // If it's plain text, apply syntax highlighting
//                 const matches = [...el.matchAll(pattern.pattern)];
//                 let cursor = 0;

//                 for (const match of matches) {
//                     if (match.index === undefined) continue;

//                     // Add unstyled text before the match
//                     if (cursor < match.index) {
//                         newElements.push(el.slice(cursor, match.index));
//                     }

//                     // Add styled match
//                     newElements.push(
//                         <span key={`match-${lastIndex++}`} className={`${styles[pattern.className]} ${ustyles.hl}`}>
//                             {renderMatchContent(pattern.className, match)}
//                         </span>
//                     );

//                     cursor = match.index + match[0].length;
//                 }

//                 // Add any remaining text after the last match
//                 if (cursor < el.length) {
//                     newElements.push(el.slice(cursor));
//                 }
//             } else {
//                 // If it's already a JSX element, keep it
//                 newElements.push(el);
//             }
//         }

//         elements = newElements;
//     }

//     return elements.map((el, index) =>
//         typeof el === "string" ? <span key={`text-${index}`}>{el}</span> : el
//     );
// }


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
    ["Themes", AppThemes]
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
        className: "glowingTextNameStyle",
        pattern: /(?<!\\)~~([^\"]+)"([^\"]+?)"(?<!\\)~~/gmi
    },{
        className: "glowingTextNameQuoteStyle",
        pattern: /(?<!\\)~~([^\']+)'([^\']+?)'(?<!\\)~~/gmi
    },
    {
        className: "urlLinkTextStyle",
        pattern: /(?<!\\)(https?:\/\/[^ ]+)/gmi
    },
    {
        className: "serverInviteTextStyle",
        pattern: /<<<serverinvite>>(.+?)(?<!\\)<\/İ>/gmi
    },
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

export const SendServerInvites = async (serverId: string, friends: User[], currents: Currents, callbackFn: (() => void) | null) => {
    try {
        const response = await axios.post(`/api/v1/servers/${serverId}/invite`, JSON.stringify({
            users: friends.map(friend => ({ id: friend.id, username: friend.username, avatarUrl: friend.avatarUrl })),
        }));

        if (response.data.success) {
            toast.success("Invites sent successfully!");
        } else {
            toast.error("Failed to send invites: " + response.data.message);
            console.error("Failed to send invites:", response.data.message);
        }

        callbackFn?.();
    } catch (error) {
        console.error("Error sending server invites:", error);
    }
}

export function getFileDataUrl(file: File) {
    return new Promise((resolve, reject) => {
        // Create a FileReader instance
        const reader = new FileReader();

        // Manages file loading
        reader.onload = () => resolve(reader.result);

        // Handle any errors
        reader.onerror = error => reject(error);

        // Read the file as a data URL
        reader.readAsDataURL(file);
    });
}

export function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous"; // avoid tainted canvas
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

export function colorDistance(c1: { r: number; g: number; b: number }, c2: { r: number; g: number; b: number }) {
    return Math.sqrt(
        (c1.r - c2.r) ** 2 +
        (c1.g - c2.g) ** 2 +
        (c1.b - c2.b) ** 2
    );
}

export function isGrayscale(r: number, g: number, b: number, tolerance = 15) {
    return (
        Math.abs(r - g) < tolerance &&
        Math.abs(g - b) < tolerance &&
        Math.abs(r - b) < tolerance
    );
}

export function rgbToHsl(r: number, g: number, b: number) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h, s, l };
}

export function hslToRgb(h: number, s: number, l: number) {
    function hue2rgb(p: number, q: number, t: number) {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    let r, g, b;

    if (s === 0) r = g = b = l; // achromatic
    else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
}

export async function getTopDistinctColorsFromUrl(
    url: string,
    topN = 2,
    minDistance = 100
): Promise<string[]> {
    try {
        const img = await loadImage(url);

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return [];

        ctx.drawImage(img, 0, 0);

        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colorCountMap: Record<string, number> = {};

        for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            if (alpha < 128) continue;

            const r = data[i], g = data[i + 1], b = data[i + 2];

            if (isGrayscale(r, g, b)) continue;

            const key = rgbToKey(r, g, b, 12);
            colorCountMap[key] = (colorCountMap[key] || 0) + 1;
        }

        const sorted = Object.entries(colorCountMap).sort((a, b) => b[1] - a[1]);

        const distinctColors: { r: number; g: number; b: number }[] = [];

        for (const [key] of sorted) {
            const color = keyToRgb(key);

            const isDistinct = distinctColors.every(
                (c) => colorDistance(c, color) >= minDistance
            );

            if (isDistinct) {
                distinctColors.push(color);
                if (distinctColors.length >= topN) break;
            }
        }

        return distinctColors.map((c) => {
            const meow = rgbToHsl(c.r, c.g, c.b);
            meow.s *= 10;

            const meow2 = hslToRgb(meow.h, meow.s, meow.l);

            return `rgb(${meow2.r},${meow2.g},${meow2.b})`;
        });
    } catch (e) {
        console.error("Image loading failed", e);
        return [];
    }
}

export function rgbToKey(r: number, g: number, b: number, bucketSize = 24): string {
    // Round each channel down to nearest multiple of bucketSize
    const rr = Math.floor(r / bucketSize) * bucketSize;
    const gg = Math.floor(g / bucketSize) * bucketSize;
    const bb = Math.floor(b / bucketSize) * bucketSize;
    return `${rr},${gg},${bb}`;
}

export function keyToRgb(key: string): { r: number; g: number; b: number } {
    const [r, g, b] = key.split(",").map(Number);
    return { r, g, b };
}

export const FunctionAny = (mode: 'Select' | 'All', reShaper: (str: string) => string) => {
    const messageBox = useCurrents.getState().messageboxRef;
    if (messageBox) {
        if (mode === "All") {
            messageBox.value = reShaper(messageBox.value);
        } else {
            messageBox.focus();

            requestAnimationFrame(() => {
                console.log("This ", messageBox.selectionStart, messageBox.selectionEnd);

                const start = messageBox.selectionStart;
                const end = messageBox.selectionEnd;

                let text = messageBox.value.slice(start, end);

                text = reShaper(text);

                messageBox.setRangeText(text, start, end, 'select');
                messageBox.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText" }));
            });
        }
    } else {
        console.log("no msgbox");
    }
}

export const StyleAny = (mode: 'Select' | 'All', startPad: string, endPad: string) => {
    const messageBox = useCurrents.getState().messageboxRef;
    if (messageBox) {
        if (mode === "All") {
            messageBox.value = startPad + (messageBox.value) + endPad;
        } else {
            messageBox.focus();

            requestAnimationFrame(() => {
                console.log("This ", messageBox.selectionStart, messageBox.selectionEnd);

                const start = messageBox.selectionStart;
                const end = messageBox.selectionEnd;

                let text = messageBox.value.slice(start, end);

                text = startPad + (text) + endPad;

                messageBox.setRangeText(text, start, end, 'select');
                messageBox.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText" }));
            });
        }
    }
}

export const allFunctions : { label: string, shortcut: string, action: (mode: 'Select' | 'All') => void }[] = [
    { label: "Upper Case", shortcut: "Ctrl+1", action: (mode) => FunctionAny(mode, (x) => x.toLocaleUpperCase()) },
    { label: "Lower Case", shortcut: "Ctrl+2", action: (mode) => FunctionAny(mode, (x) => x.toLocaleLowerCase()) },
    { label: "Well Form", shortcut: "Ctrl+3", action: (mode) => FunctionAny(mode, (x) => x.toWellFormed()) },
    { label: "Normalize", shortcut: "Ctrl+4", action: (mode) => FunctionAny(mode, (x) => x.normalize()) },
    {
        label: "Wave Case", shortcut: "Ctrl+5", action: (mode) => FunctionAny(mode, (x) => {
            let y = "";
            for (let index = 0; index < x.length; index++) {
                const element = x[index];

                if (index % 2 === 0)
                    y += element.toLocaleUpperCase();
                else
                    y += element.toLocaleLowerCase();
            }

            return y;
        })
    },
    {
        label: "Random Case", shortcut: "Ctrl+6", action: (mode) => FunctionAny(mode, (x) => {
            let y = "";
            for (let index = 0; index < x.length; index++) {
                const element = x[index];

                if (Math.random() > 0.5)
                    y += element.toLocaleUpperCase();
                else
                    y += element.toLocaleLowerCase();
            }

            return y;
        })
    },
    {
        label: "Reverse Case", shortcut: "Ctrl+7", action: (mode) => FunctionAny(mode, (x) => {
            let y = "";
            for (let index = 0; index < x.length; index++) {
                const element = x[index];

                if (element === element.toLocaleUpperCase())
                    y += element.toLocaleLowerCase();
                else
                    y += element.toLocaleUpperCase();
            }

            return y;
        })
    },
    { label: "Reverse Text", shortcut: "Ctrl+8", action: (mode) => FunctionAny(mode, (x) => x.split('').reverse().join('')) },
];

export const allStyles: { label: string, shortcut: string, action: (mode: 'Select' | 'All') => void }[] = [
    { label: "Rainbow Effect", shortcut: "Ctrl+Ctrl+1", action: (mode) => StyleAny(mode, "<<<rainbow>>", "</0>") },
    { label: "Glitch Effect", shortcut: "Ctrl+Ctrl+2", action: (mode) => StyleAny(mode, "<<<hack>>", "</0>") },
    { label: "Cool Effect", shortcut: "Ctrl+Ctrl+3", action: (mode) => StyleAny(mode, "<<<cool>>", "</0>") },
    { label: "Colorful Effect", shortcut: "Ctrl+Ctrl+4", action: (mode) => StyleAny(mode, "<<<colorful>>", "</0>") },
    { label: "Spoiler Text", shortcut: "Ctrl+Ctrl+5", action: (mode) => StyleAny(mode, "||", "||") },
    { label: "Link Text", shortcut: "Ctrl+Ctrl+6", action: (mode) => StyleAny(mode, "[Link](", ")") },
    { label: "Colored Text", shortcut: "Ctrl+Ctrl+7", action: (mode) => StyleAny(mode, "%blue\"", "\"") },
    { label: "Backtick Text", shortcut: "Ctrl+Ctrl+8", action: (mode) => StyleAny(mode, "`", "`") },
    { label: "Double Backtick Text", shortcut: "Ctrl+Ctrl+A", action: (mode) => StyleAny(mode, "``", "``") },
    { label: "Code Text", shortcut: "Ctrl+Ctrl+B", action: (mode) => StyleAny(mode, "```:a11y\n", "\n```") },
    { label: "Glowing Effect", shortcut: "Ctrl+Ctrl+C", action: (mode) => StyleAny(mode, "~~", "~~") },
    { label: "Unimportant Text", shortcut: "Ctrl+Ctrl+D", action: (mode) => StyleAny(mode, "//", "//") },
    { label: "Wingdings Text", shortcut: "Ctrl+Ctrl+E", action: (mode) => StyleAny(mode, "<<<wd>>", "</0>") },
    { label: "Colorful Fast Effect", shortcut: "Ctrl+Ctrl+F", action: (mode) => StyleAny(mode, "<<<colorfulfast>>", "</0>") },
];

export function isCharNumber(c: string) {
  return c >= '0' && c[0] <= '9';
}

export const isElectron = () => {
  // Preload only exists in Electron
  return !!(window as any).electronAPI;
};