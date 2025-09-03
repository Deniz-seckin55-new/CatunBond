'use client';

import styles from '@/app/app/page.module.css';

import {
  ControlBar,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  RoomContext,
  VideoTrack,
} from '@livekit/components-react';
import { LocalVideoTrack, RemoteVideoTrack, Room, Track } from 'livekit-client';
import '@livekit/components-styles';
import React, { ReactNode, use, useEffect, useMemo, useRef, useState } from 'react';
import { useCurrents } from '@/store/currents';
import { useGetUserByUsername, useGetUserByUsernameSync, useGetUserInfo } from './common/GetUser';
import uuid4 from 'uuid4';
import { useUserInfoStore } from '@/store/userInfos';
import { hexToRgb } from '../utils/utils';
import { createPortal } from 'react-dom';

interface Props {
  height?: string;
  onClickUserAvatarWithUserId: (userId: string | null, event: React.MouseEvent) => void;
  onVisible: () => void;
}

const LiveKit: React.FC<Props> = (props) => {
  const currents = useCurrents();
  const shown = currents.livekitShown;
  // TODO: get user input for room and name
  const room = currents.liveikitRoom;
  const name = currents.user?.username;

  const [roomInstance] = useState(() => new Room({
    // Optimize video quality for each participant's screen
    adaptiveStream: true,
    // Enable automatic audio/video quality optimization
    dynacast: true,
  }));

  const [token, setToken] = useState('');

  roomInstance.on('disconnected', () => {
    currents.setLiveKitParticipant(null);
    currents.setLivekitShown(false);
    currents.setLiveikitRoom('');
    console.log("Disconnecting from LiveKit room:", roomInstance.name);
  });

  useEffect(() => {
    if (!room || !name || room === "") { console.log("room or name is empty", room, name); return; };
    let mounted = true;
    (async () => {
      try {
        console.log("Fetching LiveKit token for room:", room, "and user:", name);
        const resp = await fetch(`/api/v1/token?room=${room}&username=${name}`);
        const data = await resp.json();
        if (!mounted) return;
        if (data.token) {
          console.log("Received LiveKit token:", data.token);
          setToken(data.token);
          console.log("Connecting to LiveKit room:", process.env.LIVEKIT_URL);
          await roomInstance.connect("wss://cb-rj1rae4i.livekit.cloud", data.token);
          roomInstance.localParticipant.setAttributes({["isMirrored"]: (currents.userVariables?.mirrorCameraWhenShared ?? false) +""});
        }
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      mounted = false;
      roomInstance.disconnect();
    };
  }, [roomInstance, room, name]);

  useEffect(() => {
    if (currents.livekitShown && currents.liveikitRoom)
      props.onVisible();
  }, [currents.livekitShown, currents.livekitShown]);

  if (token === '') {
    return <></>;
  }

  return (
    <>
      {shown && (
        <RoomContext.Provider value={roomInstance}>
          <div data-lk-theme="default" style={{ height: props.height || 'auto' }}>
            {/* Your custom component with basic video conferencing functionality. */}
            <MyVideoConference {...props} />
            {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
            <RoomAudioRenderer />
            {/* Controls for the user to start/stop audio, video, and screen share tracks */}
            <ControlBar />
          </div>
        </RoomContext.Provider>
      )}
    </>
  );
}

const MyVideoConference: React.FC<Props> = (props) => {
  const getUserInfo = useGetUserByUsernameSync();
  const getUserInfoA = useGetUserByUsername();

  const getUserCustoms = useGetUserInfo();

  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );

  const gridRef = useRef<HTMLDivElement | null>(null);

  const [real, setreal] = useState<{ [id: string]: number; }>({});
  // useEffect(() => {
  //   let ref = setInterval(() => {
  //       tracks.forEach((track) => {
  //           let cur = real[track.participant.identity] || 0;

  //           if (cur <= 0.12) cur = 0;

  //           if(track.participant.isSpeaking) {
  //             if(cur == 0) cur = 1;

  //             cur = cur * 1.2;

  //             if (cur > 4) cur = 4;
  //           } else {
  //             cur = cur * 0.8;

  //             if (cur < 0) cur = 0;
  //           }

  //           setreal((prev) => ({ ...prev, [track.participant.identity]: cur }));
  //           console.log("set real", track.participant.identity, cur);
  //       });
  //   }, 3);
  //   return () => {
  //     clearInterval(ref);
  //   }
  // }, [tracks]);
  function setupVidElement(vid: HTMLMediaElement, clearVideo: () => void, isMirrored: boolean) {
    vid.style.height = "300px";
    vid.style.width = "auto";
    vid.oncontextmenu = (ev) => { ev.preventDefault() };

    // vid.setAttribute("key", uuid4());

    vid.id = uuid4();
  }

  function setupMainDivVideo(vid: HTMLMediaElement, clearVideo: () => void, isMirrored: boolean, userImageURL: string) {
    let mainDiv = document.createElement('div');

    mainDiv.style.position = "relative";

    let max_button = document.createElement('button');
    let user_avatar = document.createElement('img');

    max_button.style.position = "absolute";
    const svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElem.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElem.setAttribute("width", "48");
    svgElem.setAttribute("height", "48");
    svgElem.setAttribute("id", "full");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("fill", "none");
    path1.setAttribute("d", "M0 0h48v48H0z");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M10 32h6v6h4V28H10v4zm6-16h-6v4h10V10h-4v6zm12 22h4v-6h6v-4H28v10zm4-22v-6h-4v10h10v-4h-6z");

    svgElem.appendChild(path1);
    svgElem.appendChild(path2);

    max_button.appendChild(svgElem);

    user_avatar.className = `${styles.user_profile_avatar} ${styles.vuo}`;

    user_avatar.style.position = "absolute";

    user_avatar.style.width = "32px";
    user_avatar.style.height = "32px";

    user_avatar.style.top = "8px";
    user_avatar.style.left = "8px";

    user_avatar.src = userImageURL;

    setupVidElement(vid, clearVideo, isMirrored);

    mainDiv.appendChild(vid);
    mainDiv.appendChild(max_button);
    mainDiv.appendChild(user_avatar);

    mainDiv.className = styles.flex_center;

    mainDiv.addEventListener("mouseover", (ev) => {
      max_button.style.opacity = "1";
      user_avatar.style.opacity = "1";
    });

    mainDiv.addEventListener("mouseout", (ev) => {
      max_button.style.opacity = "0";
      user_avatar.style.opacity = "0";
    });

    max_button.addEventListener("click", () => {
      if (vid)
        currents.setFsvIsMirrored(isMirrored);
        currents.setFullScreenVideo(vid);
      if (gridRef.current) {
        clearVideo();
      }
      currents.setFsvReturnFunction((w) => {
        currents.setFullScreenVideo(null);
        if (gridRef.current) {
          let mainDiv = setupMainDivVideo(w, clearVideo, isMirrored, userImageURL);
          gridRef.current.appendChild(mainDiv);
          setholders(x => [...x, (mainDiv)]);
        }
        w.style.height = "300px";
        w.style.width = "auto";
      });
    });

    max_button.className = `${styles.normal_icon} ${styles.max_button}`;

    // mainDiv.setAttribute("key", uuid4());

    mainDiv.id = vid.id;

    mainDiv.setAttribute("idx", holders.length+"");

    return mainDiv;
  }
  const [vids, setvids] = useState<HTMLMediaElement[]>([]);
  const [vidvids, setvidvids] = useState<(LocalVideoTrack | RemoteVideoTrack)[]>([]);
  const [holders, setholders] = useState<HTMLDivElement[]>([]);

  const videoTrackCount = useMemo(() => {
    return tracks.filter(t => !!t.publication?.videoTrack && t.publication.isEnabled).length;
  }, [tracks]);

  const videoMutedCount = useMemo(() => {
    return tracks.filter(t => t.publication?.isMuted).length;
  }, [tracks]);

  const endVid = (vid: HTMLMediaElement) => {
    console.log("Ending video");

    // setholders(x => x.map(holder => {
    //   if (holder.id === vid.id) {
    //     holder.innerHTML = "REMOVED";
    //   }
    //   return holder;
    // }).filter(x => x.childNodes.length !== 0));

    // console.log("Ending video: Removed holder ");
  };

  const [videoAutoUpdate, setvideoAutoUpdate] = useState<boolean>();

  const currents = useCurrents();
  useEffect(() => {
    console.log("tracks", tracks);

    vidvids.forEach(vidvid => {
      vidvid.detach();
    });

    holders.forEach(holder => {
      holder.replaceChildren();
      holder.remove();
    });

    vids.forEach((vid) => {
      if (vid) {
        vid.replaceChildren();
        vid.remove();
      }
    })

    setvids([]);
    setvidvids([]);
    setholders([]);

    tracks.forEach((track) => {
      console.log("TRACKSLOOP: ", track, track.publication?.videoTrack);
      if (!track.publication?.videoTrack || track.publication?.videoTrack.isMuted) return;
      
      
      track.publication?.videoTrack.addListener("videoPlaybackStarted", () => {
        setvideoAutoUpdate(!videoAutoUpdate);
      });

      track.publication?.videoTrack.addListener("videoPlaybackFailed", () => {
        setvideoAutoUpdate(!videoAutoUpdate);
      });

      track.publication?.videoTrack.addListener("restarted", () => {
        setvideoAutoUpdate(!videoAutoUpdate);
      });

      let vid = track.publication?.videoTrack?.attach();

      let isMirrored = track.participant.attributes["isMirrored"] == "true" && track.source === Track.Source.Camera;

      let mainDiv = setupMainDivVideo(vid, () => endVid(vid), isMirrored, (() => {
        getUserInfoA(track.participant.identity);
        const pUser = getUserInfo(track.participant.identity) || null;
        const pUserCustoms = pUser ? useUserInfoStore.getState().getExistingUserInfo(pUser.id) || null : null;
        const avatarUrl = pUser?.avatarUrl || "https://cat-storage-server.web.app/data/cat1.jpeg";

        return avatarUrl;
      })());

      console.log("attr", track.participant.attributes, isMirrored);

      if(isMirrored)
        vid.className = styles.mirrored;

      // vro just work atp 🥀

      // Gaster çok yüksek ihtimaller core a düşmedş
      // düşmedi*

      // yeah that sentence fixed it
      if (vid) {
        setvids(x => [...x, vid]);
        setvidvids(x => [...x, track.publication!.videoTrack!]);
        setholders(x => [...x, mainDiv]);
      }

      if (gridRef.current)
        gridRef.current.appendChild(mainDiv);
    });
  }, [tracks.length, videoTrackCount, videoMutedCount, videoAutoUpdate]);

  useEffect(() => console.log("tracksf", tracks), [tracks]);
  useEffect(() => console.log("holderf", holders), [holders]);
  useEffect(() => console.log("vidsf", vids), [vids]);

  useEffect(() => {
    if (gridRef.current) {
      const sortedNodes = Array.from(gridRef.current.childNodes)
        .filter(node => node.nodeType === Node.ELEMENT_NODE)
        .sort((a, b) => {
          const idxA = parseInt((a as HTMLElement).getAttribute("idx") || "0", 10);
          const idxB = parseInt((b as HTMLElement).getAttribute("idx") || "0", 10);
          return idxA - idxB;
        });

      // Clear & re-append in order
      gridRef.current.replaceChildren(...sortedNodes);
    }
  }, [gridRef, tracks.length, videoTrackCount, videoMutedCount, videoAutoUpdate]);

  return (
    <div className={styles.video_call} ref={gridRef}>
      {tracks.map(track => {
        if (!track.participant) return <></>;

        if (track.source !== Track.Source.Camera) return <></>;

        const p = track.participant;

        getUserInfoA(p.identity);
        const pUser = getUserInfo(p.identity) || null;
        const pUserCustoms = pUser ? useUserInfoStore.getState().getExistingUserInfo(pUser.id) || null : null;
        const avatarUrl = pUser?.avatarUrl || "https://cat-storage-server.web.app/data/cat1.jpeg";

        if (pUser) getUserCustoms(pUser.id);

        console.log("VCR", pUser, pUserCustoms, avatarUrl, pUserCustoms !== null ? pUserCustoms.usernameColor : "var(--cb-color-white)");

        return (
          <div key={p.identity + uuid4()} >
            <img src={avatarUrl} alt={p.identity} className={`${styles.user_profile_avatar} ${styles.borderforparticipant} ${styles.participant_other}`} width={64} height={64} style={{ outlineWidth: 0 }} onMouseDown={(ev) => {
              console.log("RW1", pUser, ev.button);
              if (pUser && ev.button === 0) {
                console.log("PID", pUser.id);
                props.onClickUserAvatarWithUserId(pUser.id, ev);
              }
              else if (pUser && ev.button === 2) {
                ev.preventDefault();

                currents.setContextMenuID(pUser.id);
                currents.setContextMenuIncludes([]);
                currents.setContextMenuMode('User');
                currents.setContextMenuObject(pUser);
                currents.setContextMenuShown(true);
                currents.setContextMenuXY(ev.pageX.clamp(10, window.innerWidth - ev.currentTarget.getBoundingClientRect().width - 150), ev.pageY.clamp(10, window.innerHeight - ev.currentTarget.getBoundingClientRect().height - 150));

              }
            }} onContextMenuCapture={ev => ev.preventDefault()} />
            {currents.userVariables?.showUsernamesUnderAvatarsInVoiceChats && (
              <p style={{ textAlign: "center", color: (pUserCustoms ? pUserCustoms.usernameColor : "var(--cb-color-white)") }} className={styles.selectable_text}>{p.identity}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default LiveKit;