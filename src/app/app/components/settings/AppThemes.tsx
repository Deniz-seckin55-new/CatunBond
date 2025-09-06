import { useCurrents } from "@/store/currents";
import { SettingsProps } from "../../utils/utils";
import styles from "@/app/app/page.module.css"
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

const currentSetting = "Appearance";

export interface ThemeConfig {
    "--cb-color-black": string;
    "--cb-color-black-transparent": string;
    "--cb-color-black-transparent-soft": string;
    "--cb-color-black-transparent-softer": string;
    "--cb-color-white": string;
    "--cb-color-white-soft": string;
    "--cb-color-white-transparent": string;
    "--cb-color-white-transparent-soft": string;
    "--cb-color-white-transparent-softer": string;
    "--cb-color-gray": string;
    "--cb-color-gray-light": string;
    "--cb-color-gray-lighter": string;
    "--cb-color-gray-dark": string;
    "--cb-color-cyan": string;
    "--cb-color-blue": string;
    "--cb-color-blue-transparent": string;
    "--cb-color-blue-dark": string;
    "--cb-color-mention": string;
    "--cb-color-mention-soft": string;
    "--cb-color-gold": string;
    "--cb-color-red": string;
    "--cb-color-red-dark": string;
    "--cb-color-green": string;
    "--cb-color-green-transparent": string;
    "--cb-color-green-transparent-soft": string;
}
const defaultThemeConfig: ThemeConfig = {
    "--cb-color-black": "#000D1E",
    "--cb-color-black-transparent": "rgba(0, 13, 30, 0.5)",
    "--cb-color-black-transparent-soft": "rgba(0, 13, 30, 0.2)",
    "--cb-color-black-transparent-softer": "rgba(0, 13, 30, 0.1)",
    "--cb-color-white": "#F0F7EE",
    "--cb-color-white-soft": "#adb3ac",
    "--cb-color-white-transparent": "rgba(239, 247, 237, 0.5)",
    "--cb-color-white-transparent-soft": "rgba(239, 247, 237, 0.2)",
    "--cb-color-white-transparent-softer": "rgba(239, 247, 237, 0.1)",
    "--cb-color-gray": "#3B413C",
    "--cb-color-gray-light": "#4d5061",
    "--cb-color-gray-lighter": "#696d7d",
    "--cb-color-gray-dark": "#30323d",
    "--cb-color-cyan": "#65AFFF",
    "--cb-color-blue": "#1E2EDE",
    "--cb-color-blue-transparent": "rgba(30, 46, 222, 0.8)",
    "--cb-color-blue-dark": "rgb(0, 16, 192)",
    "--cb-color-mention": "rgba(255, 204, 0, 0.4)",
    "--cb-color-mention-soft": "rgba(255, 204, 0, 0.2)",
    "--cb-color-gold": "rgb(255, 205, 0)",
    "--cb-color-red": "#FF3A20",
    "--cb-color-red-dark": "#ff3a20dd",
    "--cb-color-green": "#17B890",
    "--cb-color-green-transparent": "rgba(23, 184, 144, 0.5)",
    "--cb-color-green-transparent-soft": "rgba(23, 184, 144, 0.2)",
};
const navyBlueThemeConfig: ThemeConfig = {
    ...defaultThemeConfig,
    "--cb-color-black": "#0A1A2F",
    "--cb-color-gray": "#1B2A41",
    "--cb-color-gray-light": "#324A5F",
    "--cb-color-gray-lighter": "#3E5C76",
    "--cb-color-gray-dark": "#14213D",
    "--cb-color-blue": "#1E2EDE",
    "--cb-color-blue-dark": "#0010C0",
    "--cb-color-white": "#EAF6FF",
    "--cb-color-white-soft": "#B3C7D6",
    "--cb-color-cyan": "#65AFFF",
};

const pinkThemeConfig: ThemeConfig = {
    ...defaultThemeConfig,
    "--cb-color-black": "#2D142C",
    "--cb-color-gray": "#6A0572",
    "--cb-color-gray-light": "#AB83A1",
    "--cb-color-gray-lighter": "#F8E1F4",
    "--cb-color-gray-dark": "#3C003E",
    "--cb-color-blue": "#FF61A6",
    "--cb-color-blue-dark": "#FF1E56",
    "--cb-color-white": "#FFE6F6",
    "--cb-color-white-soft": "#F8BBD0",
    "--cb-color-cyan": "#FF61A6",
    "--cb-color-gold": "#FFD6E0",
};

const spaceThemeConfig: ThemeConfig = {
    ...defaultThemeConfig,
    "--cb-color-black": "#0B0C10",
    "--cb-color-gray": "#1F2833",
    "--cb-color-gray-light": "#45A29E",
    "--cb-color-gray-lighter": "#66FCF1",
    "--cb-color-gray-dark": "#232940",
    "--cb-color-blue": "#1F51FF",
    "--cb-color-blue-dark": "#0B3D91",
    "--cb-color-white": "#C5C6C7",
    "--cb-color-white-soft": "#45A29E",
    "--cb-color-cyan": "#66FCF1",
    "--cb-color-gold": "#FFD700",
};
const forestThemeConfig: ThemeConfig = {
    ...defaultThemeConfig,
    "--cb-color-black": "#1B2E1B",
    "--cb-color-gray": "#2E4D2E",
    "--cb-color-gray-light": "#4F7942",
    "--cb-color-gray-lighter": "#A7C7A7",
    "--cb-color-gray-dark": "#163216",
    "--cb-color-blue": "#3B7A57",
    "--cb-color-blue-dark": "#254D32",
    "--cb-color-white": "#E8F5E9",
    "--cb-color-white-soft": "#B2DFDB",
    "--cb-color-cyan": "#81C784",
    "--cb-color-gold": "#FFD700",
};

const sunsetThemeConfig: ThemeConfig = {
    ...defaultThemeConfig,
    "--cb-color-black": "#2C1B47",
    "--cb-color-gray": "#FF6E40",
    "--cb-color-gray-light": "#FFB74D",
    "--cb-color-gray-lighter": "#FFD180",
    "--cb-color-gray-dark": "#D84315",
    "--cb-color-blue": "#FF8A65",
    "--cb-color-blue-dark": "#FF7043",
    "--cb-color-white": "#FFF3E0",
    "--cb-color-white-soft": "#FFE0B2",
    "--cb-color-cyan": "#FFAB91",
    "--cb-color-gold": "#FFC107",
};

const mintThemeConfig: ThemeConfig = {
    ...defaultThemeConfig,
    "--cb-color-black": "#18332F",
    "--cb-color-gray": "#3EB489",
    "--cb-color-gray-light": "#A0E7E5",
    "--cb-color-gray-lighter": "#B4F8C8",
    "--cb-color-gray-dark": "#155D4A",
    "--cb-color-blue": "#57C5B6",
    "--cb-color-blue-dark": "#159895",
    "--cb-color-white": "#E3FDFD",
    "--cb-color-white-soft": "#CBF1F5",
    "--cb-color-cyan": "#A0E7E5",
    "--cb-color-gold": "#F7F7B6",
};

const lavaThemeConfig: ThemeConfig = {
    ...defaultThemeConfig,
    "--cb-color-black": "#2D090A",
    "--cb-color-gray": "#7B1F1F",
    "--cb-color-gray-light": "#D7263D",
    "--cb-color-gray-lighter": "#FFB447",
    "--cb-color-gray-dark": "#3F0D12",
    "--cb-color-blue": "#F46036",
    "--cb-color-blue-dark": "#A63A50",
    "--cb-color-white": "#FFECD6",
    "--cb-color-white-soft": "#FFD6BA",
    "--cb-color-cyan": "#FFB447",
    "--cb-color-gold": "#FFD700",
};

const oceanThemeConfig: ThemeConfig = {
    ...defaultThemeConfig,
    "--cb-color-black": "#011F4B",
    "--cb-color-gray": "#03396C",
    "--cb-color-gray-light": "#005B96",
    "--cb-color-gray-lighter": "#6497B1",
    "--cb-color-gray-dark": "#021C35",
    "--cb-color-blue": "#B3CDE0",
    "--cb-color-blue-dark": "#005B96",
    "--cb-color-white": "#E1F5FE",
    "--cb-color-white-soft": "#B3CDE0",
    "--cb-color-cyan": "#00B8D4",
    "--cb-color-gold": "#FFD700",
};

export const themeMap: Record<string, ThemeConfig> = {
    "Default": defaultThemeConfig,
    "Navy Blue": navyBlueThemeConfig,
    "Pink": pinkThemeConfig,
    "Space": spaceThemeConfig,
    "Forest": forestThemeConfig,
    "Sunset": sunsetThemeConfig,
    "Mint": mintThemeConfig,
    "Lava": lavaThemeConfig,
    "Ocean": oceanThemeConfig,
};

export const AppThemes: React.FC<SettingsProps> = (({ updateSettings }) => {
    const currents = useCurrents()

    const [customThemeConfig, setcustomThemeConfig] = useState<ThemeConfig>(defaultThemeConfig)

    const [currentTheme, setcurrentTheme] = useState("")

    useEffect(() => {
        const customThemeText = localStorage.getItem("theme-custom")

        if (customThemeText)
            setcustomThemeConfig(JSON.parse(customThemeText))

        setcurrentTheme(localStorage.getItem("theme") ?? "Default")
    }, [])

    return (
        <div className={styles.settings_page}>
            <p className={styles.setting_page_header}>{currents.setting}</p>
            <div className={styles.small_pad} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "2rem",
                    maxWidth: "100%",
                    alignContent: "flex-start",
                }}
            >
                <SingleThemeDisplay ThemeConfig={defaultThemeConfig} ThemeName="Default" onSet={() => setcurrentTheme("Default")}/>
                <SingleThemeDisplay ThemeConfig={navyBlueThemeConfig} ThemeName="Navy Blue" onSet={() => setcurrentTheme("Navy Blue")}/>
                <SingleThemeDisplay ThemeConfig={pinkThemeConfig} ThemeName="Pink" onSet={() => setcurrentTheme("Pink")}/>
                <SingleThemeDisplay ThemeConfig={spaceThemeConfig} ThemeName="Space" onSet={() => setcurrentTheme("Space")}/>
                <SingleThemeDisplay ThemeConfig={forestThemeConfig} ThemeName="Forest" onSet={() => setcurrentTheme("Forest")}/>
                <SingleThemeDisplay ThemeConfig={sunsetThemeConfig} ThemeName="Sunset" onSet={() => setcurrentTheme("Sunset")}/>
                <SingleThemeDisplay ThemeConfig={mintThemeConfig} ThemeName="Mint" onSet={() => setcurrentTheme("Mint")}/>
                <SingleThemeDisplay ThemeConfig={lavaThemeConfig} ThemeName="Lava" onSet={() => setcurrentTheme("Lava")}/>
                <SingleThemeDisplay ThemeConfig={oceanThemeConfig} ThemeName="Ocean" onSet={() => setcurrentTheme("Ocean")} />
                <SingleThemeDisplay ThemeConfig={customThemeConfig} ThemeName="Custom" onSet={() => setcurrentTheme("Custom")} />
                {currentTheme === "Custom" && (
                    <>
                        <div className={styles.custom_theme_editor}>
                            <h3>Edit Custom Theme</h3>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                                {Object.entries(customThemeConfig).map(([key, value]) => (
                                    <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "center", marginBottom: "1rem", minWidth: "8rem" }}>
                                        <HexColorPicker
                                            color={value}
                                            onChange={newValue => {
                                                setcustomThemeConfig(prev => ({
                                                    ...prev,
                                                    [key]: newValue
                                                }));
                                            }}
                                            style={{ border: "none", cursor: "pointer", marginBottom: "0.5rem" }}
                                        />
                                        <input
                                            className={`${styles.setting_field_input_text} ${styles.settings_styles_text_input_one}`}
                                            type="text"
                                            value={value}
                                            onChange={e => {
                                                setcustomThemeConfig(prev => ({
                                                    ...prev,
                                                    [key]: e.target.value
                                                }));
                                            }}
                                            style={{ width: "100%", marginBottom: "0.3rem", fontSize: "0.9rem", textAlign: "center" }}
                                        />
                                        <span style={{fontSize: "0.95rem", textAlign: "center", color: "#888" }}>{key}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                className={styles.theme_apply_button}
                                style={{
                                    marginTop: "1.5rem",
                                    padding: "0.7rem 2rem",
                                    background: "var(--cb-color-blue)",
                                    color: "var(--cb-color-white)",
                                    border: "none",
                                    borderRadius: "0.5rem",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                                }}
                                onClick={() => {
                                    localStorage.setItem("theme-custom", JSON.stringify(customThemeConfig));
                                    themeSelect(customThemeConfig, "Custom");
                                    setcurrentTheme("Custom")
                                }}
                            >
                                Apply Custom Theme
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
})

export const themeSelect = (ThemeConfig: ThemeConfig, ThemeName: string, onSet?: () => void) => {
    localStorage.setItem("theme", ThemeName)

    Object.entries(ThemeConfig).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });

    onSet?.()
}

const SingleThemeDisplay: React.FC<{ ThemeConfig: ThemeConfig, ThemeName: string, onSet?: () => void }> = ({ ThemeConfig: config, ThemeName, onSet }) => {
    return (
        <div className={`${styles.flex_column} ${styles.themeDisplay}`} style={{ width: "fit-content", height: "fit-content", padding: "0.5rem" }} onClick={() => themeSelect(config, ThemeName, onSet)}>
            <SingleTheme ThemeConfig={config} />
            <p>{ThemeName}</p>
        </div>
    )
}

const SingleTheme: React.FC<{ ThemeConfig: ThemeConfig }> = ({ ThemeConfig: config }) => {
    return (
        <div className={styles.theme_holder}>
            <div className={styles.theme_bar_top} style={{ backgroundColor: config["--cb-color-black"] }}></div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div className={styles.theme_bar_left_one} style={{ backgroundColor: config["--cb-color-gray"] }}></div>
                <div className={styles.theme_bar_left_two} style={{ backgroundColor: config["--cb-color-white"] }}></div>
                <div className={styles.theme_bar_left_big} style={{ backgroundColor: config["--cb-color-gray"] }}></div>
            </div>
        </div>
    )
}