import { useCurrents } from "@/store/currents";
import styles from "@/app/app/page.module.css";
import { useEffect, useRef } from "react";

const FullScreenVideo: React.FC<{}> = (props) => {
    const {fullScreenVideo, fsvReturnFunction, fsvIsMirrored} = useCurrents();
    const Ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(Ref.current && fullScreenVideo) {
            fullScreenVideo.style.width = "auto";
            fullScreenVideo.style.height = "100vh";
            if(fsvIsMirrored)
                fullScreenVideo.className = styles.mirrored;

            Ref.current.appendChild(fullScreenVideo);
            fullScreenVideo.focus();
            Ref.current.requestFullscreen();
        }

        return () => {
            if(Ref.current) {
                Ref.current.childNodes.forEach(x => {
                    Ref.current?.removeChild(x);      
                })
            }
        }
    }, [Ref, fullScreenVideo]);

    if(fullScreenVideo)
        return (
            <div className={styles.fsv} ref={Ref} onClick={(ev) => {if(!(ev.target instanceof HTMLVideoElement)) fsvReturnFunction?.(fullScreenVideo);}} onKeyDown={(ev) => {if(ev.key === "Escape") fsvReturnFunction?.(fullScreenVideo);}}>
                
            </div>
        );
}

export default FullScreenVideo;