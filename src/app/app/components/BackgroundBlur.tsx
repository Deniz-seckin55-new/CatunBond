import styles from '../page.module.css';

import { useEffect, useState } from 'react';

interface Props {
    BgBlurV: boolean;
    onClickBgBlur: () => void;
}

const BackgroundBlur: React.FC<Props> = ({ BgBlurV, onClickBgBlur }) => {

    var [showElement, setshowElement] = useState(false);

    useEffect(() => {
        if (BgBlurV) {
            setshowElement(true);
        } else {
            setTimeout(() => {
                setshowElement(false);
            }, 200);
        }
    }, [BgBlurV]);

    return (
        <>
            {(<div id="bg-blur" className={`${styles.background_blur} ${BgBlurV ? styles.background_blur_active : ''}`} style={{ visibility: (showElement ? "visible" : "hidden") }} onClick={onClickBgBlur}>

            </div>)}
        </>
    );
}

export default BackgroundBlur;