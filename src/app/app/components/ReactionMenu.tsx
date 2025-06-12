import styles from "@/app/app/page.module.css";
import { useCurrents } from "@/store/currents";
import useReactionMenuStore from "@/store/reactionMenu";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useEffect, useRef } from "react";

const ReactionMenu: React.FC = () => {
    const reactionMenu = useReactionMenuStore();
    const currents = useCurrents();

    const ReactionMenuRef = useRef<HTMLDivElement>(null);

    const CheckRect = () => {
        const menu = ReactionMenuRef.current;
        if (menu) {
            console.log("Checking rect");
            const menuBoundingClientRect = menu.getBoundingClientRect();
            const windowHeight = window.screen.availHeight;
            const windowWidth = window.screen.availWidth;

            console.log([menuBoundingClientRect, windowHeight, windowWidth])
            const paddingX = 10; // optional margin from screen edges
            const paddingY = 500; // optional margin from screen edges
            let x = menuBoundingClientRect.x;
            let y = menuBoundingClientRect.y;

            // Adjust X position if overflowing to the right
            if (x + menuBoundingClientRect.width > window.innerWidth - paddingX) {
                x = window.innerWidth - menuBoundingClientRect.width - paddingX;
                console.log("Adjusted X to stay within screen");
            }

            // Adjust Y position if overflowing to the bottom
            if (y + menuBoundingClientRect.height > window.innerHeight - paddingY) {
                y = window.innerHeight - menuBoundingClientRect.height - paddingY;
                console.log("Adjusted Y to stay within screen");
            }

            // Ensure it doesn’t go to negative values
            x = Math.max(paddingX, x);
            y = Math.max(paddingY, y);

            reactionMenu.setPosition(x, y);
        }
    }

    let attempts = 0;

    const CheckRectWait = () => {
        if(attempts > 3) return;
        if (ReactionMenuRef.current) {
            attempts = 0;
            CheckRect();
        } else {
            attempts++;
            setTimeout(() => { CheckRectWait(); }, 50);
        }
    }

    useEffect(() => {
        if (!reactionMenu.shown) return;

        if (ReactionMenuRef.current) {
            CheckRect();
        } else {
            CheckRectWait();
        }
    }, [ReactionMenuRef.current, reactionMenu.shown]);

    return (
        <>
            <div id="reaction-menu" style={{ left: reactionMenu.position.x, top: reactionMenu.position.y }} className={`${styles.reaction_menu} ${reactionMenu.shown ? styles.reaction_menu_active : ''}`} ref={ReactionMenuRef}>
                <EmojiPicker lazyLoadEmojis theme={Theme.DARK} onEmojiClick={(e) => reactionMenu.onSelect(e)} open={reactionMenu.shown}/>
            </div>
        </>
    );
}

export default ReactionMenu;