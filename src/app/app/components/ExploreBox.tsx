import { useEffect, useState } from 'react';
import styles from '../page.module.css';

interface Props {
    ExploreBoxV: boolean;
    setExploreBoxV: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExploreBox: React.FC<Props> = ({ ExploreBoxV, setExploreBoxV }) => {

    var [showElement, setshowElement] = useState(false);

    useEffect(() => {
        if (ExploreBoxV) {
            setshowElement(true);
        } else {
            setTimeout(() => {
                setshowElement(false);
            }, 200);
        }
    }, [ExploreBoxV]);

    return (
        <>
            {(<div id="explore-box" className={`${styles.explore_box} ${ExploreBoxV ? styles.explore_box_active : ''}`} style={{visibility: (showElement ? "visible" : "hidden")}}>
                <input type="text" id="explore-input" className={styles.explore_input} placeholder="Search Public Servers" />
                <div className={styles.explore_servers} id="explore-servers">
                    <div className={styles.flex_adjuster}></div>
                </div>
            </div>)}
        </>
    );
}

export default ExploreBox;