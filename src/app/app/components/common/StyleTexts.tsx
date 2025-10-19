import React, { useState, useEffect, useMemo, ReactNode, useRef, useLayoutEffect, useCallback } from 'react';
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
                <span className={styles.markerTextStyle}>{`<<<colorful${time ==  "5s" ? "fast" : ""}>>`}</span>
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
    messageId: string;
}

export const SpoilerText: React.FC<SpoilerTextProps> = ({ children, markersEnabled = false, messageId }) => {
    const [clicked, setClicked] = useState(false);
    const { kbState } = useKBState();
    const pressingAlt = kbState.includes("Alt");
    const msgData = useMessageDataStore();
    const dataLocation = "spoiler:clicked-" + messageId;
    const handleClick = () => {
        if (pressingAlt) {
            setClicked(false);

            msgData.setData(dataLocation, "false");
        } else {
            setClicked(true);
            
            msgData.setData(dataLocation, "true");
        }
    }

    useLayoutEffect(() => {
        setClicked(msgData.getData(dataLocation) === "true");
    }, []);

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

interface GlowingNameTextProps {
    color: string;
    quotes: boolean,
    children?: ReactNode;
    markersEnabled?: boolean;
}

export const GlowingNameText: React.FC<GlowingNameTextProps> = ({ color, children, quotes, markersEnabled = false }) => {
    return (
        <>
            {markersEnabled && (
                <>
                    <span className={styles.markerTextStyle}>{`~~${color}${quotes ? "'" : '"'}`}</span>
                </>
            )}
            <span style={{ textShadow: color+" 1px 0 10px" }}>{children}</span>
            {markersEnabled && (
                <>
                    <span className={styles.markerTextStyle}>{`${quotes ? "'": '"'}~~`}</span>
                </>
            )}
        </>);
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
import { Server, ServerInfo } from '../../utils/socket_utils';
import axios from 'axios';
import { useMessagesStore } from '@/store/messages';
import { useServerInfoStore } from '@/store/serverInfos';
import { toast } from 'react-toastify';
import { useServerStore } from '@/store/servers';
import { useInvisibleDiv } from '@/store/invisibleDiv';
import { useHoveringElement } from '@/store/hoveringElement';
import { getTopDistinctColorsFromUrl } from '../../utils/utils';
import { useMessageDataStore } from '@/store/messageDataStore';

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
                <span><span style={{ color: "var(--cb-color-cyan)" }}>@</span>{text}</span>
            </div>&nbsp;
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

interface ServerInviteTextProps {
    children?: ReactNode;
    markersEnabled?: boolean;
}

export const ServerInviteText: React.FC<ServerInviteTextProps> = ({ children, markersEnabled = false }) => {
    const currents = useCurrents();

    const serverStore = useServerStore();

    const serverID = useMemo(() => getTextContent(children).split(':')[0], [children]);
    const serverInviteID = useMemo(() => getTextContent(children).split(':')[1], [children]);
    const isJoined = useMemo(() => { return currents.user ? currents.user.servers.some(x => x.id === serverID) : null }, [serverID, currents.user?.servers]);
    const [server, setServer] = useState<Server>();
    const [serverInfo, setServerInfo] = useState<ServerInfo>();
    const [serverInviteDepr, setserverInviteDepr] = useState<boolean>(false)
    useEffect(() => {
        async function getServerInfo() {
            const found = useServerInfoStore.getState().getExistingServerInfo(serverID);
            if (!found) {
                const response = await axios.get(`/api/v1/servers/${serverID}/info`, {validateStatus: () => true});

                if(response.status !== 200) {
                    setserverInviteDepr(true)
                    return
                }

                setServerInfo(response.data.data);

                useServerInfoStore.getState().addServerInfo(response.data.data);
            } else {
                setServerInfo(found);
            }
        }

        getServerInfo();
    }, [serverID]);
    useEffect(() => {
        async function getServer() {
            if (server && server.id === serverID) return;

            const found = serverStore.getExistingServer(serverID);
            if (found) {
                console.log("Found server", found.id);
                setServer(found);
                return;
            }

            if (serverStore.fetchingServers.includes(serverID)) return;

            serverStore.addFetchingServer(serverID);

            const resp = await axios.get(`api/v1/servers/${serverID}`, {validateStatus: () => true});

            if (resp.status === 200) {
                setServer(resp.data.data as Server);
                serverStore.addServer(resp.data.data as Server);
            } else if(resp.status === 404) {
                setserverInviteDepr(true)
            }

            serverStore.removeFetchingServer(serverID);
        }
        getServer().then(() => {
            console.log("Done getting server!", server);
        });
    }, [serverID, serverStore]);

    const JoinServer = useCallback(() => {
        if (isJoined) {
            try {
                if (!server) { console.log("No server"); return; }

                currents.setCategories(server.categories);

                currents.setFriendsDivV(false);
                currents.setSideBoxChannelsV(true);

                currents.setChannel(null);
                useMessagesStore.getState().setMessages([]);

                currents.setServer(server);
            } catch (err) {
                console.error(err);
            }
        } else {
            fetch('/api/v1/user/servers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inviteLink: serverInviteID,
                })
            })
                .then((res) => {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            console.log("MSG_SV_JOIN", data);
                            if (data) {
                                toast(data.message);
                                const old_user = currents.user;

                                const gotServer = data.data as Server;

                                if (!old_user) { console.log("no user"); return; }

                                currents.setUser({ ...old_user, servers: [...(old_user.servers), gotServer] });
                                console.log("MSG_SV_SET", currents.user!.servers);

                                setTimeout(() => {
                                    try {
                                        currents.setCategories(gotServer.categories);

                                        currents.setFriendsDivV(false);
                                        currents.setSideBoxChannelsV(true);

                                        currents.setChannel(null);
                                        useMessagesStore.getState().setMessages([]);

                                        currents.setServer(gotServer);
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }, 250);
                            } else {

                            }
                        });
                    } else {
                        res.json().then(data => { toast(data.message) });
                    }
                })
        }
    }, [serverID, server]);

    if (markersEnabled) {
        return (
            <>
                <p style={{ color: "var(--cb-color-cyan)" }}>{`<<<serverinvite>>${serverID}:${serverInviteID}</ >`}</p>
            </>
        )
    }

    return (
        <>
            <div className={styles.server_invite_message_holder}>
                {!serverInviteDepr && (<><img className={styles.server_invite_message_image} src={server?.iconUrl} />
                <div className={styles.lpad1} />
                <div className={styles.flex_column} style={{ alignItems: "baseline" }}>
                    <p style={{ color: serverInfo ? serverInfo.color : "var(--cb-color-white)" }}>{server?.name ?? "Loading..."}</p>
                    <p><span style={{ color: "var(--cb-color-white)" }}>Members</span><span style={{ color: "var(--cb-color-gray)" }}>:</span><span style={{ color: "var(--cb-color-cyan)" }}>{server ? server.members.length + "" : "Loading..."}</span></p>
                </div>
                <div className={styles.lpad1} />
                <div className={styles.server_invite_message_button_holder}>
                    <button className={styles.server_invite_message_button} onClick={() => JoinServer()}>{isJoined === null ? "Loading..." : (isJoined ? "Joined" : "Join")}</button>
                </div></>)}
                {serverInviteDepr && (
                    <>
                        Invalid Invite
                    </>
                )}
            </div>
        </>
    );
};

interface UrlTextStyleProps {
    children?: ReactNode;
    markersEnabled?: boolean;
    isReply?: boolean
}

const KeepScroll = (div: HTMLElement, action: () => void) => {
    const scrollY = div.scrollTop;
    action();
    requestAnimationFrame(() => {
        div.scrollTop = scrollY;
    });
}

const DivGetElement = (div: Element, isElement: (element: Element) => boolean) => {
    for (let index = 0; index < div.children.length; index++) {
        const element = div.children[index];
        const check = isElement(element);

        if (check) return element;
    }

    return false;
}

const DivGetElementCL = (div: Element, isElement: (element: ChildNode) => boolean) => {
    for (let index = 0; index < div.childNodes.length; index++) {
        const element = div.childNodes[index];
        const check = isElement(element);

        if (check) return true;
    }

    return false;
}

function ExtractYoutubeId(url: string) {
    const urlSplit = url.split('//')[1];
    const exec = /(www\.)?((youtube\.com\/watch\?v=(?<id>[A-z0-9]+))|(youtu\.be\/(?<id2>[A-z0-9]+)))/.exec(urlSplit);

    if (exec?.groups) {
        const youtubeId = exec.groups["id"] ?? exec.groups["id2"];

        return youtubeId;
    }

    return null;
}

export const UrlTextStyle: React.FC<UrlTextStyleProps> = ({ children, markersEnabled = false, isReply = false }) => {
    const url = getTextContent(children);

    console.log("I AM ",markersEnabled);

    const hover = useHoveringElement();

    const { element: InvDiv } = useInvisibleDiv();

    const isYoutubeLink = useMemo(() => {
        const urlSplit = url.split('//')[1];
        const urlSplitL = urlSplit.toLowerCase();

        if (
            urlSplitL.startsWith("youtube") ||
            urlSplitL.startsWith("www.youtube") ||
            urlSplitL.startsWith("youtu.be") ||
            urlSplitL.startsWith("www.youtu.be")
        ) return true;
        else return false;
    }, [url]);

    const onClickPopOut = useCallback(() => {
        const videoId = ExtractYoutubeId(url);

        if (!videoId) return;

        hover.setVideoId(videoId);

        hover.setShown(true);
    }, [url, window.innerWidth, window.innerHeight]);

    const videoIdMemo = useMemo(() => { return ExtractYoutubeId(url) }, [url]);

    const [firstColor, setfirstColor] = useState<string>("red");
    const [secondColor, setsecondColor] = useState<string>("blue");

    const BGColor = useMemo(() => { return `conic-gradient(${firstColor}, ${secondColor}, ${firstColor})`; }, [firstColor, secondColor]);

    useEffect(() => {
        async function run() {
            if (isYoutubeLink && videoIdMemo && !markersEnabled) {
                const dist = await getTopDistinctColorsFromUrl(`http://img.youtube.com/vi/${videoIdMemo}/${0}.jpg`, 2, 150);
                console.log(dist);
                setfirstColor(dist[0]);
                setsecondColor(dist[1]);
            }
        }

        run();
    }, [url, isYoutubeLink, videoIdMemo]);

    const showYoutubeEmbed = useMemo(() => !markersEnabled && isYoutubeLink && videoIdMemo && !isReply, [markersEnabled, isYoutubeLink, videoIdMemo, isReply]);

    return (
        <>
            <a href={url} target="_blank" className={styles.urlTextStyle}>{url}</a>
            {(showYoutubeEmbed) && (
                <>
                    <div style={{ height: "16px" }} />
                    <div className={styles.ytvid}>
                        <div className={styles.posr_h} style={{ overflow: "visible", width: "auto" }}>
                            <iframe className={`${styles.ytvid_iframe} ${styles.posr_e}`}
                                width={"480px"}
                                height={"270px"}
                                src={`https://www.youtube.com/embed/${videoIdMemo}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={true}
                            />
                            <div className={`${styles.ytvid_bg} ${styles.posr_e}`} style={{ background: BGColor }} />
                        </div>
                        <div style={{ width: "0px" }} />
                        <button onClick={onClickPopOut} className={`${styles.normal_icon_s} ${styles.popout_button}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="made-call">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M9 6c0 .56.45 1 1 1h5.59L4.7 17.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L17 8.41V14c0 .55.45 1 1 1s1-.45 1-1V6c0-.55-.45-1-1-1h-8c-.55 0-1 .45-1 1z"></path>
                            </svg>
                        </button>
                    </div>
                </>
            )}
        </>
    )
}