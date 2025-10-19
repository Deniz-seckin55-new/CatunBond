import React, { JSX } from "react";
import styles from "@/app/app/page.module.css";

interface Props {
    className: string;
    messageBoxDisabled: boolean;
    messageBoxOnChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    messageBoxOnKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement>;
    onMessageScroll: React.UIEventHandler<HTMLTextAreaElement>;
    onContextMenuTextarea: (ev: React.MouseEvent<HTMLTextAreaElement>) => void;
    onSelectTextarea: (ev: React.SyntheticEvent<HTMLTextAreaElement>) => void;
    MessageBoxOnKeyUp: React.KeyboardEventHandler<HTMLTextAreaElement>;
    messageBoxRef: React.RefObject<HTMLTextAreaElement | null>;
    renderTextRef: React.RefObject<HTMLSpanElement | null>;
    renderText: JSX.Element[];
}

const MessageBox: React.FC<Props> = (props) => {
    return (
        <div className={styles.posr_h}>
            <textarea
                className={props.className}
                disabled={props.messageBoxDisabled}
                style={{ opacity: 0.25 }}
                onChange={props.messageBoxOnChange}
                onKeyDown={props.messageBoxOnKeyDown}
                onScroll={props.onMessageScroll}
                onContextMenu={props.onContextMenuTextarea}
                onSelect={props.onSelectTextarea}
                onKeyUp={props.MessageBoxOnKeyUp}
                id="message_box_main"
                ref={props.messageBoxRef}
            />
            <span
                className={`${styles.posr_e} ${styles.msg_overlay} ${styles.no_touch} ${styles.msg_typer}`}
                style={{ overflow: "hidden", whiteSpace: "pre-wrap" }}
                ref={props.renderTextRef}
            >
                {props.renderText}
            </span>
        </div>
    );
};

export default MessageBox;