import { useCurrents } from '@/store/currents';
import styles from '../page.module.css';
import { useEffect, useState } from 'react';

export const ConfirmationMenu: React.FC = () => {
    const currents = useCurrents();
    const [showElement, setshowElement] = useState<boolean>(false);
    const [retypeInputText, setretypeInputText] = useState<string>("");
    const [notmatch, setnotmatch] = useState<boolean>(false);

    useEffect(() => {
        if (currents.confirmationMenu) {
            console.log("Showing Conf.Menu.");
            setnotmatch(false);
            setshowElement(true);
        } else {
            setTimeout(() => {
                setshowElement(false);
            }, 250);
        }
    }, [currents.confirmationMenu]);

    const onAnswer = (answer: boolean) => {
        if (answer) {
            if (currents.confirmationMenuRetypeText) {
                const retypeText = retypeInputText.trim();
                const checkText = currents.confirmationMenuRetypeText.trim();
                const match = retypeText === checkText;

                if (match) {
                    currents.setConfirmationMenu(false);
                    currents.confirmationMenuCallback(answer);
                    setTimeout(() => {
                        currents.setConfirmationMenuText("");
                    }, 250);
                } else {
                    setnotmatch(true);
                }
            } else {
                currents.setConfirmationMenu(false);
                currents.confirmationMenuCallback(answer);
                setTimeout(() => {
                    currents.setConfirmationMenuText("");
                }, 250);
            }
        } else {
            currents.setConfirmationMenu(false);
            currents.confirmationMenuCallback(answer);
            setTimeout(() => {
                currents.setConfirmationMenuText("");
            }, 250);
        }
    }

    const onInputRetype = (text: string) => {
        setretypeInputText(text);
    }

    return (
        <>
            {(<div className={`${styles.confirmation_menu_holder} ${currents.confirmationMenu ? styles.confirmation_menu_holder_active : ''}`} style={{ visibility: (showElement ? "visible" : "hidden") }}>
                <div className={styles.confirmation_menu}>
                    <p className={styles.confirmation_menu_question}>{currents.confirmationMenuText}</p>
                    {currents.confirmationMenuRetypeText && (
                        <div>
                            <p className={styles.confirmation_menu_retype_text}>Please type <span style={{color: "var(--cb-color-gray)"}}>&quot;</span><span className={styles.confirmation_menu_retype_text_hl}>{currents.confirmationMenuRetypeText}</span><span style={{color: "var(--cb-color-gray)"}}>&quot;</span> in the text field below to confirm action.</p>
                            <textarea className={`${styles.setting_field_input_text} ${styles.settings_styles_text_input_one}`} style={{fontSize: "1em", backgroundColor: "var(--cb-color-gray)"}} placeholder={currents.confirmationMenuRetypeText} onInput={(ev) => onInputRetype(ev.currentTarget.value)} />
                            {(notmatch) && (
                                <div>
                                    <p>Confirmation text does not match.</p>
                                </div>
                            )}
                        </div>
                    )}
                    <div className={styles.confirmation_menu_buttons}>
                        <button className={styles.confirmation_menu_button} onClick={() => { onAnswer(false); }}>Cancel</button>
                        <button className={styles.confirmation_menu_button} onClick={() => { onAnswer(true); }}>Confirm</button>
                    </div>
                </div>
            </div>)}
        </>
    );
}