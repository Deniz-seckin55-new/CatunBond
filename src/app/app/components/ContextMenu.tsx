import { useEffect } from 'react';
import styles from '../page.module.css';
import { Currents } from '../utils/utils';

interface Props {
    Currents: Currents;
}

const ContextMenu: React.FC<Props> = ({ Currents }) => {
    useEffect(() => {
        console.log(Currents.contextmenu)
    }, [Currents.contextmenu]);
    

    return (
        <>
            <div className={`${styles.context_menu} ${Currents.contextmenu.shown ? styles.context_menu_shown : ''}`} style={{ left: Currents.contextmenu.x, top: Currents.contextmenu.y }}>
                <>
                    {Currents.contextmenumode == 0 && (
                        <>
                            <button id="contextmenu-test-button" className={styles.context_menu_button}>Test Button Server</button>
                        </>
                    )}
                </>
            </div>
        </>
    );
}

export default ContextMenu;