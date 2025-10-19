import { useHoveringElement } from "@/store/hoveringElement";
import styles from '@/app/app/page.module.css';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import interact from "interactjs";
import { getTopDistinctColorsFromUrl } from "../utils/utils";

interface Props {

}

export const HoveringElement: React.FC<Props> = (props) => {
    const hover = useHoveringElement();
    const ref = useRef<HTMLDivElement | null>(null);

    const CheckRect = () => {
        const menu = ref.current;
        if (menu) {
            console.log("Checking rect");
            const menuBoundingClientRect = menu.getBoundingClientRect();
            const windowHeight = window.screen.availHeight;
            const windowWidth = window.screen.availWidth;

            console.log([menuBoundingClientRect, windowHeight, windowWidth])
            const padding = 10; // optional margin from screen edges
            let x = menuBoundingClientRect.x;
            let y = menuBoundingClientRect.y;

            // Adjust X position if overflowing to the right
            if (x + menuBoundingClientRect.width > window.innerWidth - padding) {
                x = window.innerWidth - menuBoundingClientRect.width - padding;
                console.log("Adjusted X to stay within screen");
            }

            // Adjust Y position if overflowing to the bottom
            if (y + menuBoundingClientRect.height > window.innerHeight - padding) {
                y = window.innerHeight - menuBoundingClientRect.height - padding;
                console.log("Adjusted Y to stay within screen");
            }

            // Ensure it doesn’t go to negative values
            x = Math.max(padding, x);
            y = Math.max(padding, y);

            hover.setPosition(x, y);
        }
    }

    const CheckRectWait = () => {
        if (ref.current) {
            CheckRect();
        } else {
            setTimeout(() => {
                CheckRectWait();
            }, 25);
        }
    }

    useEffect(() => {
        if (!hover.shown) return;

        if (ref.current) {
            CheckRect();
        } else {
            CheckRectWait();
        }
    }, [hover.x, hover.y]);

    useLayoutEffect(() => {
        if (ref.current) {
            interact(ref.current)
                .draggable({
                    // enable inertial throwing
                    inertia: false,
                    // keep the element within the area of it's parent
                    modifiers: [
                        
                    ],
                    // enable autoScroll
                    autoScroll: true,

                    listeners: {
                        // call this function on every dragmove event
                        move: dragMoveListener,

                        // call this function on every dragend event
                        end(event) {
                            const textEl = event.target.querySelector('p')

                            textEl && (textEl.textContent =
                                'moved a distance of ' +
                                (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                                    Math.pow(event.pageY - event.y0, 2) | 0))
                                    .toFixed(2) + 'px')
                        }
                    }
                })
            function dragMoveListener(event: any) {
                const target = event.target!
                const targetdiv: HTMLDivElement = target
                // keep the dragged position in the data-x/data-y attributes
                let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

                x = x > (window.innerWidth - targetdiv.getBoundingClientRect().width) ? window.innerWidth - targetdiv.getBoundingClientRect().width : x
                y = y > (window.innerHeight - targetdiv.getBoundingClientRect().height) ? window.innerHeight - targetdiv.getBoundingClientRect().height : y

                x = x < 0 ? 0 : x
                y = y < 0 ? 0 : y

                // translate the element
                target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

                // update the posiion attributes
                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
            }

            interact(ref.current)
                .resizable({
                    // resize from all edges and corners
                    edges: { left: true, right: true, bottom: true, top: true },

                    listeners: {
                        move(event) {
                            const target = event.target
                            let x = (parseFloat(target.getAttribute('data-x')) || 0)
                            let y = (parseFloat(target.getAttribute('data-y')) || 0)

                            // update the element's style
                            target.style.width = event.rect.width + 'px'
                            target.style.height = event.rect.height + 'px'

                            if (ref.current?.firstElementChild) {
                                ((ref.current.firstElementChild as HTMLDivElement).firstElementChild as HTMLIFrameElement).style.width = (event.rect.width / 1.2) + 'px';
                                ((ref.current.firstElementChild as HTMLDivElement).firstElementChild as HTMLIFrameElement).style.height = (event.rect.height / 1.2) + 'px';
                                ((ref.current.firstElementChild as HTMLDivElement).lastElementChild as HTMLIFrameElement).style.height = (event.rect.height / 1.2) + 'px';
                                ((ref.current.firstElementChild as HTMLDivElement).lastElementChild as HTMLIFrameElement).style.width = (event.rect.width / 1.2 + 16) + 'px';
                            }

                            // translate when resizing from top or left edges
                            x += event.deltaRect.left
                            y += event.deltaRect.top

                            target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

                            target.setAttribute('data-x', x)
                            target.setAttribute('data-y', y)
                        }
                    },
                    modifiers: [
                        // keep the edges inside the parent
                        interact.modifiers.restrictEdges({
                            endOnly: false,
                            outer: 'parent'
                        }),

                        // minimum size
                        interact.modifiers.restrictSize({
                            min: { width: 100, height: 50 }
                        })
                    ],

                    inertia: false
                })
        }
    }, [ref.current]);

    const [firstColor, setfirstColor] = useState<string>("red");
    const [secondColor, setsecondColor] = useState<string>("blue");

    const BGColor = useMemo(() => { return `conic-gradient(${firstColor}, ${secondColor}, ${firstColor})`; }, [firstColor, secondColor]);

    useEffect(() => {
        async function run() {
            if (hover.videoId) {
                const dist = await getTopDistinctColorsFromUrl(`http://img.youtube.com/vi/${hover.videoId}/${0}.jpg`, 2, 150);
                console.log(dist);
                setfirstColor(dist[0]);
                setsecondColor(dist[1]);
            }
        }

        run();
    }, [hover.videoId]);

    const closeHoveringElement = useCallback(() => {
        hover.setShown(false);
    }, [hover.setShown]);

    return (
        <>
            {hover.shown && (
                <div ref={ref} id={"youtube-hover"} style={{ left: hover.x, top: hover.y, opacity: hover.shown ? 1 : 0, width: "480px", height: "270px" }} className={styles.hoveringElement}>
                    <div className={styles.posr_h} style={{ overflow: "visible", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <iframe className={`${styles.ytvid_iframe} ${styles.posr_e}`}
                            width={ref.current?.clientWidth ?? "420px"}
                            height={ref.current?.clientHeight ?? "315px"}
                            src={`https://www.youtube.com/embed/${hover.videoId}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen={true}
                        />
                        <div className={`${styles.ytvid_bg} ${styles.posr_e}`} style={{ background: BGColor, transform: "translate(0px, 0px)" }} />
                    </div>
                    <div style={{ width: "32px", flexShrink: "0" }} />
                    <button className={styles.normal_icon_s} onClick={closeHoveringElement}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="clear">
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" fill="#F0F7EE"></path>
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
}