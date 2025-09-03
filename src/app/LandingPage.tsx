"use client";

import styles from "./page.module.css";
import { redirect } from "next/navigation";
import useLandingPage from "@/store/landingPage";
import { useEffect, useId, useLayoutEffect } from "react";

export const LandingPage: React.FC<{}> = ({ }) => {
    const lpStore = useLandingPage();

    const openWebApp = (fnCallback: () => void) => {
        redirect("/app");

        fnCallback();
    }

    const onClickOpenAppOnWeb = (buttonId: string) => {
        if (lpStore.hasLoadingButton(buttonId)) return;

        lpStore.addLoadingButton(buttonId);

        setTimeout(() => {
            lpStore.setWaitingTextV(true);
        }, 12000);

        openWebApp(() => {
            lpStore.removeLoadingButton(buttonId);
            lpStore.setWaitingTextV(false);
        });
    }

    useEffect(() => {
        // Observer for .main_block_left elements
        const observerLeft = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.observing_left);
                } else {
                    entry.target.classList.remove(styles.observing_left);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px",
        });

        // Observer for .main_block_right elements
        const observerRight = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.observing_right);
                } else {
                    entry.target.classList.remove(styles.observing_right);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px",
        });

        // Select elements to observe
        const leftElements = document.querySelectorAll(`.${styles.main_block_left}`);
        const rightElements = document.querySelectorAll(`.${styles.main_block_right}`);

        leftElements.forEach(el => observerLeft.observe(el));
        rightElements.forEach(el => observerRight.observe(el));

        // Cleanup on unmount
        return () => {
            leftElements.forEach(el => observerLeft.unobserve(el));
            rightElements.forEach(el => observerRight.unobserve(el));
            observerLeft.disconnect();
            observerRight.disconnect();
        };
    }, []);


    const buttonid = useId();

    return (
        <div className={styles.main}>
            <div className={styles.main_block_full}>
                <div className={styles.overlap}>
                    <div className={styles.grid_op}>
                        <div className={styles.background_image_holder}>
                            <img className={styles.background_image} src="/niko_pc.png" />
                        </div>
                    </div>
                    <div className={styles.grid_op}>
                        <div className={styles.main_block_left}>
                            <div>
                                <p className={styles.header_text}>Welcome to <i className={styles.highlight_text}>CatunBond</i></p>
                                <p className={styles.subheader_text}>Where we chat, talk play games & have fun.</p>
                            </div>
                            <div className={styles.main_block_buttons}>
                                <button className={styles.main_block_button}>Download for Windows</button>
                                {(() => {
                                    return (<button className={`${styles.main_block_button_secondary} ${lpStore.hasLoadingButton(buttonid) && styles.loading_notallowed_button}`} disabled={lpStore.hasLoadingButton(buttonid)} id={buttonid} onClick={(ev) => onClickOpenAppOnWeb(ev.currentTarget.id)}>Open app on Web</button>)
                                })()}
                                {lpStore.waitingTextV && <p className={styles.waiting_text}>Taking a bit... Servers might be starting for the first time.</p>}
                            </div>
                        </div>
                        <div className={styles.main_block_right}>

                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.main_block} ${styles.gr_left}`}>
                {/* Chat with ease. */}
                <div className={styles.main_block_left}>
                    <p className={styles.block_header_text}>Chat with ease.</p>
                    <p className={styles.block_text}>Chat & talk with your friends in no time. We provide a <i className={styles.text_hl2}>fast and reliable</i> way for you to hang out and have fun. </p>
                </div>
            </div>
            <div className={`${styles.main_block} ${styles.gr_right}`}>
                {/* Your data is secure.  */}
                <div className={styles.main_block_right}>
                    <p className={styles.block_header_text}>Your data is secure.</p>
                    <p className={styles.block_text}>We protect your data by adopting a <i className={styles.text_hl2}>zero-trust</i> method in every part of our systems.</p>
                </div>
            </div>
            <div className={`${styles.main_block} ${styles.gr_left}`}>
                {/* Modern UI. Everywhere. */}
                <div className={styles.main_block_left}>
                    <p className={styles.block_header_text}>Modern UI. Everywhere. </p>
                    <p className={styles.block_text}>One of the most modern UI designs of all time, built for you. A <i className={styles.text_hl2}>smooth and fast</i> solution for all your needs.</p>
                </div>
            </div>
            <div className={`${styles.main_block} ${styles.gr_right}`}>
                {/* Stable & Fast */}
                <div className={styles.main_block_right}>
                    <p className={styles.block_header_text}>Stable & Fast </p>
                    <p className={styles.block_text}>Our product is built to have no errors. Done with <i className={styles.text_hl2}>QOL</i> always in mind</p>
                </div>
            </div>
            <div className={`${styles.main_block} ${styles.gr_left}`}>
                {/* Do it your style. */}
                <div className={styles.main_block_left}>
                    <p className={styles.block_header_text}>Do it your style. </p>
                    <p className={styles.block_text}>We allow you to modify and edit our app with ease. <i className={styles.text_hl2}>Custom Styles & Themes</i> ready for you. Of coruse, with a secure system.</p>
                </div>
            </div>
            <div className={styles.footer}>
                <p>CatunBond</p>
            </div>
        </div>
    );
}