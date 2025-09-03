import styles from "@/app/app/page.module.css";
import { useCurrents } from "@/store/currents";
import useReactionMenuStore from "@/store/reactionMenu";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useCallback, useEffect, useRef } from "react";

const ReactionMenu: React.FC = () => {
    const reactionMenu = useReactionMenuStore();
    const currents = useCurrents();

    const ReactionMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => { reactionMenu.__setRef(ReactionMenuRef.current) }, [ReactionMenuRef.current]);

    return (
        <>
            <div id="reaction-menu" style={{ left: reactionMenu.position.x, top: reactionMenu.position.y }} className={`${styles.reaction_menu} ${reactionMenu.shown ? styles.reaction_menu_active : ''}`} ref={ReactionMenuRef}>
                <EmojiPicker lazyLoadEmojis theme={Theme.DARK} onEmojiClick={(e) => reactionMenu.onSelect(e)} open={reactionMenu.shown} />
            </div>
        </>
    );
}

export default ReactionMenu;