import { useCurrents } from '@/store/currents';
import styles from '../page.module.css';

import { useEffect, useState } from 'react';

interface Props {
    onClickBgBlur: () => void;
}

const BackgroundBlur: React.FC<Props> = ({ onClickBgBlur }) => {
    const currents = useCurrents();

    const [showElement, setshowElement] = useState(false);

    useEffect(() => {
        if (currents.BgBlurV) {
            setshowElement(true);
        } else {
            setTimeout(() => {
                setshowElement(false);
            }, 200);
        }
    }, [currents.BgBlurV]);

    return (
        <>
            {(<div id="bg-blur" className={`${styles.background_blur} ${currents.BgBlurV ? styles.background_blur_active : ''}`} style={{ visibility: (showElement ? "visible" : "hidden") }} onClick={onClickBgBlur}>

            </div>)}
        </>
    );
}

export default BackgroundBlur;