import React, { SetStateAction, useEffect, useState } from 'react';
import styles from '../page.module.css';
import Image from 'next/image';
import { Currents, ExploreBoxMode } from '../utils/utils';
import { useDropzone } from 'react-dropzone'
import { DetailedDBUser, Server } from '../utils/socket_utils';

interface Props {
    ExploreBoxV: boolean;
    setExploreBoxV: React.Dispatch<React.SetStateAction<boolean>>;
    setBgBlurV: React.Dispatch<React.SetStateAction<boolean>>;
    closeExploreBox: () => void;
    onClickJoinButton: () => void;
    onClickBackButton: () => void;
    onClickServerJoinButton: (str: string) => void;
    onClickSendFriendRequestButton: (str: string) => void;
    setLoadingText: React.Dispatch<React.SetStateAction<string>>;
    LoadingText: string;
    setCurrents: React.Dispatch<React.SetStateAction<Currents>>;
    Currents: Currents;
}

function getFileDataUrl(file: File) {
    return new Promise((resolve, reject) => {
        // Create a FileReader instance
        const reader = new FileReader();

        // Manages file loading
        reader.onload = () => resolve(reader.result);

        // Handle any errors
        reader.onerror = error => reject(error);

        // Read the file as a data URL
        reader.readAsDataURL(file);
    });
}

const ExploreBox: React.FC<Props> = ({ ExploreBoxV, setExploreBoxV, setBgBlurV, closeExploreBox, onClickJoinButton, onClickBackButton, onClickServerJoinButton, onClickSendFriendRequestButton, setLoadingText, LoadingText, setCurrents, Currents }) => {

    useEffect(() => {
        if (Currents.exploreboxmode == null) { setCurrents({ ...Currents, exploreboxmode: 0 }) }
    }, [Currents]);

    const [ServerInput, setServerInput] = useState("");
    const [FriendInput, setFriendInput] = useState("");
    const [boxHeight, setBoxHeight] = useState("50%");
    const [imageurl, setimageUrl] = useState<string>("");
    const [serverCreatePageIndex, setserverCreatePageIndex] = useState<number>(1);
    const [serverCreateButton, setserverCreateButton] = useState<{ text: string, disabled: boolean }>({ text: "Continue", disabled: false });
    const [serverCreateInput, setserverCreateInput] = useState<string>("");

    const totalPages = 2;

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: {
            'image/png': ['.png', '.gif', '.jpg', '.jpeg', '.webm']
        },
        maxSize: 2000000, // 2 MB
        multiple: false,
        onDropAccepted: async (acceptFiles: File[]) => {
            const file = acceptFiles[0];
            setimageUrl(await getFileDataUrl(file) as string);
        }
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const onServerInputInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setServerInput(event.target.value);
    }

    const onFriendInputInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFriendInput(event.target.value);
    }

    const onClickCreateServer = () => {
        setCurrents((prev) => ({
            ...prev,
            exploreboxmode: 4,
        }));
    }

    const onClickServerCreateContinueButton = () => {
        if (serverCreatePageIndex === totalPages) {
            setLoadingText("Creating Server...");
            setCurrents((prev) => ({
                ...prev,
                exploreboxmode: 2,
            }));

            fetch("/api/v1/servers", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: serverCreateInput,
                    iconUrl: imageurl,
                })
            }).then(res => res.json().then(data => {
                if (data.data) {
                    const server: Server = data.data;
                    setCurrents((prev) => ({
                        ...prev,
                        user: {
                            ...prev.user!,
                            servers: [...prev.user!.servers, server]
                        }
                    }))

                    setLoadingText("Successfully created server!");
                    setTimeout(() => {
                        setExploreBoxV(false);
                        setBgBlurV(false);

                        setCurrents((prev) => ({
                            ...prev,
                            exploreboxmode: 0,
                        }))
                        setLoadingText("Loading...");
                    }, 1000);
                } else {
                    setLoadingText("Couldn't create the server: " + data.message);
                    setTimeout(() => {
                        setExploreBoxV(false);
                        setBgBlurV(false);

                        setCurrents((prev) => ({
                            ...prev,
                            exploreboxmode: 0,
                        }))
                        setLoadingText("Loading...");
                    }, 1000);
                }
            }))
            return;
        }

        if (serverCreatePageIndex === 1) {
            setserverCreateButton({
                text: "Create Server",
                disabled: true,
            })
        }

        setserverCreatePageIndex(serverCreatePageIndex + 1);
    }

    const onClickServerCreateBackButton = () => {
        if (serverCreatePageIndex === 1) {
            onClickBackButton();
            return;
        }

        if (serverCreatePageIndex === 2) {
            setserverCreateButton({
                text: "Continue",
                disabled: false,
            });
        }

        setserverCreatePageIndex(serverCreatePageIndex - 1);
    }

    const PSList = [
        { name: "Cat Server", id: "abc0" },
        { name: "Kitty Server", id: "abc1" },
        { name: "Example Server", id: "abc2" },
        { name: "The Meows", id: "abc3" },
        { name: "The Cat Cafee", id: "abc4" },
        { name: "The Meow Cafee", id: "abc5" }
    ]

    const escapeRegExp = (string: string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    var [showElement, setshowElement] = useState(false);
    var [FilteredPSList, setFilteredPSList] = useState(PSList);
    var [SRRegexError, setSRRegexError] = useState("");

    useEffect(() => {
        if (ExploreBoxV) {
            setserverCreatePageIndex(1);
            setserverCreateButton({ text: "Continue", disabled: false });
            setimageUrl("");
            setshowElement(true);
        } else {
            setTimeout(() => {
                setshowElement(false);
            }, 200);
        }
    }, [ExploreBoxV]);

    useEffect(() => {
        if (Currents.exploreboxmode == 0) {
            setBoxHeight("50%");
        } else if (Currents.exploreboxmode === 1) {
            setBoxHeight("30%");
        } else if (Currents.exploreboxmode === 2) {
            setBoxHeight("30%");
        } else if (Currents.exploreboxmode === 3) {
            setBoxHeight("50%");
        } else if (Currents.exploreboxmode === 4) {
            setBoxHeight("75%");
        }
    }, [Currents.exploreboxmode]);

    const onInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSRRegexError("")

        let Search = event.target.value;
        var SearchRegex: RegExp = new RegExp("");
        if (!Search.startsWith("/r")) {
            SearchRegex = new RegExp(`(?=${escapeRegExp(event.target.value)})`, "gmi")
        } else {
            try {
                SearchRegex = new RegExp(Search.substring(2), "gmi")
            } catch (e: any) {
                if (e instanceof SyntaxError) {
                    setSRRegexError(e.message)
                    console.log("error!")
                    console.log(e);
                }
            }
        }

        if (SearchRegex != new RegExp("")) {
            let NewPSList: SetStateAction<{ name: string; id: string; }[]> = [];

            PSList.forEach((server) => {
                if (SearchRegex.test(server.name))
                    NewPSList.push(server);
            });

            setFilteredPSList(NewPSList);
        }
    }

    const onKeyDownExploreBox = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Escape") {
            closeExploreBox();
        }
    }

    const onServerCreateInputInput = (text: string) => {
        setserverCreateInput(text);

        setserverCreateButton({
            text: "Create Server",
            disabled: text === "",
        });
    }

    return (
        <>
            <div id="explore-box" className={`${styles.explore_box} ${ExploreBoxV ? styles.explore_box_active : ''}`} style={{ visibility: (showElement ? "visible" : "hidden"), height: boxHeight }} onKeyDown={onKeyDownExploreBox} tabIndex={0}>
                {Currents.exploreboxmode == 0 && (
                    <>
                        {(SRRegexError != "") && (<p id="regex-error-message" className={styles.regex_error_message}>Regex Error: {SRRegexError}</p>)}
                        <div className={styles.explore_box_top}>
                            <input type="text" id="explore-input" className={styles.explore_input} placeholder="Search Public Servers" onInput={onInputSearch} />
                            <button className={styles.explore_box_join_button} onClick={onClickJoinButton}>+</button>
                        </div>
                        <div className={styles.explore_servers} id="explore-servers">
                            <div className={styles.server_list_holder} id="server-list-holder">
                                {FilteredPSList.map((PS) => {
                                    return (
                                        <div className={styles.public_server_list_element} id={PS.id} key={PS.id}>
                                            <img src="https://cat-storage-server.web.app/data/cat1.jpeg" className={styles.public_server_list_element_image} />
                                            <p className={styles.public_server_list_element_text}>{PS.name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.small_pad} />
                        <p className={styles.create_server_text}>Or... <span onClick={onClickCreateServer} className={styles.create_server_link}>create a server</span></p>
                        <div className={styles.pad5} />
                    </>)}
                {Currents.exploreboxmode == 1 && (
                    <>
                        <div className={styles.explore_box_top}>
                            <button className={styles.explore_box_join_button} onClick={onClickBackButton}>{"<-"}</button>
                            <input type="text" id="explore-input-1" className={styles.explore_input_server} placeholder="Server Invite Code" onInput={onServerInputInput} />
                        </div>
                        <button className={styles.explore_box_server_join_button} onClick={() => onClickServerJoinButton(ServerInput)}>Join Server</button>
                    </>
                )}
                {Currents.exploreboxmode == 2 && (
                    <p>{`${LoadingText}`}</p>
                )}
                {Currents.exploreboxmode == 3 && (
                    <>
                        <div className={styles.explore_box_top}>
                            <input type="text" id="explore-input-2" className={styles.explore_input_server} placeholder="Friend Name" onInput={onFriendInputInput} />
                        </div>
                        <button className={styles.explore_box_server_join_button} onClick={() => onClickSendFriendRequestButton(FriendInput)}>Send Friend Request</button>
                    </>
                )}
                {Currents.exploreboxmode === 4 && (
                    <div className={`${styles.explore_box_full_div} ${styles.ow_hidden_both}`}>
                        <div className={`${styles.center_both} ${styles.wh_full} ${styles.transition_transform} ${styles.explore_box_slide}`} style={{ transform: `translateX(-${(serverCreatePageIndex - 1) * 100}%)` }}>
                            <div className={styles.pad1} />
                            <p className={styles.fontn}>Create your server</p>
                            <div className={styles.pad5} />
                            <p className={styles.fonts3}>Choose your server image</p>
                            <div className={styles.pad2} />
                            <div {...getRootProps({ className: styles.dropzone })}>
                                <input {...getInputProps()} />
                            </div>
                            <div className={styles.dropzone_image}>
                                {imageurl !== "" && (<img className={styles.dropzone_image_self} src={imageurl} />)}
                            </div>
                            <div className={styles.pad5} />
                            <p className={styles.image_alt_text}>Server Image</p>
                            <div className={styles.pad2} />
                        </div>
                        <div className={`${styles.center_both} ${styles.wh_full} ${styles.transition_transform} ${styles.explore_box_slide}`} style={{ transform: `translateX(${(totalPages - (serverCreatePageIndex)) * 100}%)` }}>
                            <div className={styles.pad1} />
                            <p className={styles.fontn}>Create your server</p>
                            <div className={styles.pad5} />
                            <p className={styles.fonts3}>Choose your server name</p>
                            <div className={styles.pad2} />
                            <input type='text' className={styles.setting_field_input_text} style={{ background: 'var(--cb-color-gray)' }} onInput={(ev) => onServerCreateInputInput(ev.currentTarget.value)} />
                            <div className={styles.pad5} />
                            <p className={styles.image_alt_text}>Server Name</p>
                            <div className={styles.pad2} />
                        </div>
                        <button className={`${styles.explore_box_join_button} ${styles.explore_box_left_bottom}`} onClick={onClickServerCreateBackButton}>{"Back"}</button>
                        <button className={`${styles.explore_box_join_button} ${styles.explore_box_right_bottom} ${serverCreateButton.disabled && styles.explore_box_button_disabled}`} onClick={onClickServerCreateContinueButton} disabled={serverCreateButton.disabled}>{serverCreateButton.text}</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default ExploreBox;