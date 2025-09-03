import styles from "@/app/app/page.module.css";
import { useInvisibleDiv } from "@/store/invisibleDiv";
import { useEffect, useRef } from "react";

interface Props {

}

const InvisibleHolder: React.FC<Props> = (props) => {
    const { setElement } = useInvisibleDiv();

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setElement(ref.current);
    }, [ref]);

    return (
        <div className={styles.hidden} ref={ref}>

        </div>
    );
}

export default InvisibleHolder;