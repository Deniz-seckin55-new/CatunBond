import { useEffect, useState } from "react";
import styles from "../../page.module.css";
import { Currents, SettingsProps } from "../../utils/utils";
import { HexColorPicker } from "react-colorful";

const Appearance: React.FC<SettingsProps> = ({ Currents, updateSettings }) => {
    const [unsavedChanges, setunsavedChanges] = useState<boolean>(false);
    const [color, setColor] = useState("#000000");
    const [bio, setbio] = useState<string>("");
    const [hexpickerV, sethexpickerV] = useState<boolean>(false);

    const oldBio = "";
    const oldColor = "#000000";

    useEffect(() => {
        if ((oldBio !== bio) || (color !== oldColor))
            setunsavedChanges(true);
        else
            setunsavedChanges(false);
    }, [bio, color]);

    return (
        <div className={styles.settings_page}>
            <p className={styles.setting_page_header}>{Currents.setting}</p>
            <div className={styles.appearance_user_box}>
                <div className={styles.appearance_user}>
                    <div className={styles.useravatar_holder} style={{ width: "24vh", height: "24vh" }}>
                        <img className={styles.appearance_useravatar} src={`${Currents.user?.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                    </div>
                    <div className={styles.appearance_user_avatar}>
                        <p className={styles.appearance_username} style={{ fontSize: "2em", color: color }}>{Currents.user?.username}</p>
                    </div>
                </div>

                <div className={styles.appearance_user_information}>
                    <p className={styles.appearance_user_text}>* These settings can be only changed from Profile Settings</p>
                </div>
            </div>
            <div className={styles.small_pad} />
            <p className={`${styles.setting_field_name}`}>Username <span className={styles.appearance_symbol}>*</span></p>
            <textarea className={`${styles.setting_field_input_text} ${styles.text_small} ${styles.text_readonly}`} readOnly onFocus={(ev) => ev.currentTarget.blur()} onKeyDown={(ev) => { if (ev.key === "Enter") { ev.preventDefault(); } }} defaultValue={Currents.user?.username ?? ''}></textarea>
            <div className={styles.flex_row_normal}>
                <p className={styles.setting_field_name}>Username Color</p>
                <button className={styles.setting_field_input_color_button} onClick={() => sethexpickerV(!hexpickerV)}>
                    <svg className={styles.setting_field_input_color_button_image} xmlns="http://www.w3.org/2000/svg" width="10vh" height="10vh" viewBox="0 0 24 24" id="palette">
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill={`${color}`}></path>
                    </svg>
                </button>
            </div>
            <HexColorPicker className={`${styles.setting_field_input_color} ${hexpickerV == true ? styles.setting_field_input_color_active : ''}`} color={color} onChange={setColor} />
            <p className={styles.setting_field_name}>Biography</p>
            <textarea className={styles.setting_field_input_text} onInput={(ev) => setbio(ev.currentTarget.value)}></textarea>
            <div className={styles.pad} />
                <div className={`${styles.setting_save_div} ${unsavedChanges === true ? (styles.setting_save_div_active) : ''}`}>
                    <p className={styles.setting_save_text}>You have unsaved changes</p>
                    <button className={styles.setting_save_button}>Save</button>
                </div>
        </div>
    )
}

export default Appearance;