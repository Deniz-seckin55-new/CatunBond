import styles from "@/app/app/page.module.css";
import Image from "next/image";

const ScrollToBottomButton: React.FC<{visible: boolean, onClick: React.MouseEventHandler<HTMLButtonElement>}> = ({ visible, onClick }) => {
    return (
        <>
            {visible && (<button className={styles.scroll_button} onClick={onClick}>
                <Image src="/expand-more.svg" style={{
                    filter: "invert(1) brightness(2)",  // turns dark shapes into white
                }} alt="Scroll to bottom" width={48} height={48} />
            </button>)}
        </>
    );
}

export default ScrollToBottomButton;