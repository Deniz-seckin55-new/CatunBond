import styles from "@/app/app/page.module.css";
import { useCurrents } from "@/store/currents";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";
import { allFunctions, allStyles } from "../../utils/utils";

interface Props {

}

export const HelpMenu: React.FC<Props> = (props) => {
    const [openMenu, setopenMenu] = useState<'Functions' | 'Styles'>('Functions');

    const [xy, setxy] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const ref = useRef<HTMLDivElement | null>(null);

    const currents = useCurrents();

    const [__width, __setWidth] = useState(0);
    const [__height, __setHeight] = useState(0);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const newWidth = entry.contentRect.width;
                const newHeight = entry.contentRect.height;
                if (newWidth !== __width) {
                    __setWidth(newWidth);
                }

                if (newHeight !== __height) {
                    __setHeight(newHeight);
                }
            }
        });

        resizeObserver.observe(element);

        // Cleanup on unmount
        return () => {
            resizeObserver.disconnect();
        };
    }, [ref.current]);

    const ReAlign = () => {
        if (currents.messageboxRef && ref.current) {

            const messageBox = currents.messageboxRef;

            const rect = messageBox.getBoundingClientRect();
            const ownRect = ref.current.getBoundingClientRect();

            setxy({ x: rect.x, y: (rect.y - ownRect.height - 32 - 16) });
        } else {
        }
    }

    useLayoutEffect(() => {
        ReAlign();
    }, [currents.messageboxRef, ref.current, __width, __height]);

    useInterval(ReAlign, 25);

    return (
        <div className={styles.helpermenu} style={{ left: xy.x, top: xy.y, opacity: currents.helpmenuShown ? 1 : 0, pointerEvents: currents.helpmenuShown ? "auto" : "none" }} id="helpmenu">
            {currents.helpmenuShown && (
                <>
                    <p>Help Menu</p>
                    <div className={styles.helpermenu_inner} ref={ref}>
                        <div className={styles.helpermenu_left}>
                            <button className={styles.helpermenu_button} onClick={() => { setopenMenu('Functions') }}>Functions</button>
                            <button className={styles.helpermenu_button} onClick={() => { setopenMenu('Styles') }}>Styles</button>
                        </div>
                        <div className={styles.helpermenu_right}>
                            {openMenu === 'Functions' && (
                                <div className={styles.helpermenu_functions}>
                                    {allFunctions.map(func => {
                                        return (
                                            <div className={styles.helpermenu_function} key={`func-${func.label}`}>
                                                <div className={styles.helpermenu_shortcut}>
                                                    {func.shortcut}
                                                </div>
                                                <p>
                                                    {func.label}
                                                </p>
                                                <div className={styles.helpermenu_function_buttons}>
                                                    <div className={styles.helpermenu_function_button} onClick={() => { func.action("Select") }}>
                                                        S
                                                    </div>
                                                    <div className={styles.helpermenu_function_button} onClick={() => { func.action("All") }}>
                                                        A
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <hr />
                                    <p>Hold 'shift' to auto-complete the whole text instead of only selection in shortcuts</p>
                                </div>
                            )}
                            {openMenu === 'Styles' && (
                                <div className={styles.helpermenu_functions}>
                                    {openMenu === 'Styles' && (
                                        <div className={styles.helpermenu_functions}>
                                            {allStyles.map(style => {
                                                return (
                                                    <div className={styles.helpermenu_function} key={`func-${style.label}`}>
                                                        <div className={styles.helpermenu_shortcut}>
                                                            {style.shortcut}
                                                        </div>
                                                        <p>
                                                            {style.label}
                                                        </p>
                                                        <div className={styles.helpermenu_function_buttons}>
                                                            <div className={styles.helpermenu_function_button} onClick={() => { style.action("Select") }}>
                                                                S
                                                            </div>
                                                            <div className={styles.helpermenu_function_button} onClick={() => { style.action("All") }}>
                                                                A
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            <hr />
                                            <p>Hold 'shift' to auto-complete the whole text instead of only selection in shortcuts</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}