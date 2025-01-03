import styles from '../page.module.css';
import { Currents } from '../utils/utils';

interface Props {
    Currents: Currents;
}

const ContextMenu: React.FC<Props> = ({ Currents }) => {
    return (
        <>
            {Currents.contextmenu.shown && (
                <div className={styles.context_menu}>
                    {Currents.contextmenumode == 0 && (
                        <>
                            <button id="contextmenu-test-button" className={styles.context_menu_button}>Test Button Server</button>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default ContextMenu;