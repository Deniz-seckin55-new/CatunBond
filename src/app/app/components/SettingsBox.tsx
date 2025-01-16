import { Currents } from "../utils/utils";
import styles from "../page.module.css";
import { useEffect, useState } from "react";

interface Props {
    Currents: Currents,
    setsettingsDivV: React.Dispatch<React.SetStateAction<boolean>>;
    settingsDivV: boolean,
}

const SettingsBox: React.FC<Props> = ({ Currents, setsettingsDivV, settingsDivV }) => {
    const [showElement, setshowElement] = useState<boolean>(false);

    useEffect(() => {
        if (settingsDivV) {
            setshowElement(true);
        } else {
            setTimeout(() => {
                setshowElement(false);
            }, 200);
        }
    }, [settingsDivV]);

    const onClickClose = () => {
        setsettingsDivV(false);
    }

    return (
        <>
            {(<div className={`${styles.settings_box} ${settingsDivV ? styles.settings_box_active : ''}`} style={{ visibility: showElement ? 'visible' : 'hidden'}  }>
                <div className={styles.settings_box_left}>
                    <button className={styles.settings_box_close}>
                        <img src={'/clear.svg'} width={"25vh"} height={"25vh"} alt={'Close'} onClick={onClickClose} className={styles.settings_box_close_icon}></img>
                    </button>
                </div>
                <div className={styles.settings_box_right}>

                </div>
            </div>)}
        </>
    );
}

export default SettingsBox;