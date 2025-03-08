import React, { SetStateAction, useEffect, useState } from 'react';
import styles from '../page.module.css';
import Image from 'next/image';
import { Currents, ExploreBoxMode } from '../utils/utils';
import { useDropzone } from 'react-dropzone'
import { Category, Channel, DetailedDBUser, Server } from '../utils/socket_utils';
import { toast } from 'react-toastify';
import { useCurrents } from '@/store/currents';

interface Props {
    ExploreBoxV: boolean;
    createBoxC: Category | null,
    setExploreBoxV: React.Dispatch<React.SetStateAction<boolean>>;
    setBgBlurV: React.Dispatch<React.SetStateAction<boolean>>;
    setcreateBoxV: React.Dispatch<React.SetStateAction<boolean>>;
    closeExploreBox: () => void;
    onClickJoinButton: () => void;
    onClickBackButton: () => void;
    onClickServerJoinButton: (str: string) => void;
    onClickSendFriendRequestButton: (str: string) => void;
    setLoadingText: React.Dispatch<React.SetStateAction<string>>;
    LoadingText: string;
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

const ExploreBox: React.FC<Props> = ({ ExploreBoxV, createBoxC, setExploreBoxV, setBgBlurV, setcreateBoxV, closeExploreBox, onClickJoinButton, onClickBackButton, onClickServerJoinButton, onClickSendFriendRequestButton, setLoadingText, LoadingText }) => {
    const currents = useCurrents();

    useEffect(() => {
        if (currents.exploreboxmode == null) { currents.setExploreBoxMode(0); }
    }, [currents]);

    const [ServerInput, setServerInput] = useState("");
    const [FriendInput, setFriendInput] = useState("");
    const [boxHeight, setBoxHeight] = useState("50%");
    const [imageurl, setimageUrl] = useState<string>("");
    const [serverCreatePageIndex, setserverCreatePageIndex] = useState<number>(1);
    const [serverCreateButton, setserverCreateButton] = useState<{ text: string, disabled: boolean }>({ text: "Continue", disabled: false });
    const [serverCreateInput, setserverCreateInput] = useState<string>("");
    const [channelCreateInput, setchannelCreateInput] = useState<string>("");
    const [categoryCreateInput, setcategoryCreateInput] = useState<string>("");

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

    const onChannelCreateInputInput = (text: string) => {
        setchannelCreateInput(text);
    }

    const onCategoryCreateInputInput = (text: string) => {
        setcategoryCreateInput(text);
    }

    const onClickCreateServer = () => {
        currents.setExploreBoxMode(4);
    }

    const onClickServerCreateContinueButton = () => {
        if (serverCreatePageIndex === totalPages) {
            setLoadingText("Creating Server...");
            currents.setExploreBoxMode(2);

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
                    currents.addUserServer(server);

                    setLoadingText("Successfully created server!");
                    setTimeout(() => {
                        setExploreBoxV(false);
                        setBgBlurV(false);

                        currents.setExploreBoxMode(0);
                        setLoadingText("Loading...");
                    }, 1000);
                } else {
                    setLoadingText("Couldn't create the server: " + data.message);
                    setTimeout(() => {
                        setExploreBoxV(false);
                        setBgBlurV(false);

                        currents.setExploreBoxMode(0);
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

    const onClickChannelCreateButton = () => {
        if (!currents.server) {
            toast("Not in a server.");
            return;
        }

        if (!createBoxC) {
            toast("No category selected.");
            return;
        }

        var currentServer = currents.server;

        setLoadingText("Creating Channel...");

        currents.setExploreBoxMode(2);

        fetch("/api/v1/channels", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: channelCreateInput,
                categoryId: createBoxC.id,
                serverId: currents.server.id,
            })
        }).then(res => res.json().then(data => {
            if (data.data) {
                console.log("Channel Creation", data);

                const gotChannel: Channel = data.data;

                const category = currentServer.categories.find(x => x.id === createBoxC.id);

                if (!category) {
                    toast("Error while creating channel: Category/Channel not found.");
                    console.log(currentServer.categories);
                    return;
                }

                category.channels.push(gotChannel);

                currentServer.categories = currentServer.categories.filter(x => x.id !== createBoxC.id);
                currentServer.categories.push(category);

                currents.setServer({ ...currents.server, categories: currentServer.categories } as Server);

                setLoadingText("Successfully created channel!");
                setTimeout(() => {
                    setExploreBoxV(false);
                    setBgBlurV(false);
                    setcreateBoxV(false);

                    currents.setExploreBoxMode(0);
                    setLoadingText("Loading...");
                }, 1000);
            } else {
                setLoadingText("Couldn't create the channel: " + data.message);
                setTimeout(() => {
                    setExploreBoxV(false);
                    setBgBlurV(false);
                    setcreateBoxV(false);

                    currents.setExploreBoxMode(0);
                    setLoadingText("Loading...");
                }, 1000);
            }
        }))
        return;
    }

    const onClickCategoryCreateButton = () => {
        if (!currents.server) {
            toast("Not in a server.");
            return;
        }

        if (!createBoxC) {
            toast("No category selected.");
            return;
        }

        var currentServer = currents.server;

        setLoadingText("Creating Channel...");

        currents.setExploreBoxMode(2);

        fetch(`/api/v1/servers/${currentServer.id}/categories`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: categoryCreateInput,
            })
        }).then(res => res.json().then(data => {
            if (data.data) {
                const gotCategory: Category = data.data;

                currents.setServer({ ...currentServer, categories: [...currentServer.categories, gotCategory]} as Server)

                setLoadingText("Successfully created category!");
                setTimeout(() => {
                    setExploreBoxV(false);
                    setBgBlurV(false);
                    setcreateBoxV(false);

                    currents.setExploreBoxMode(0);
                    setLoadingText("Loading...");
                }, 1000);
            } else {
                setLoadingText("Couldn't create the category: " + data.message);
                setTimeout(() => {
                    setExploreBoxV(false);
                    setBgBlurV(false);
                    setcreateBoxV(false);

                    currents.setExploreBoxMode(0);
                    setLoadingText("Loading...");
                }, 1000);
            }
        }))
        return;
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
        if (currents.exploreboxmode == 0) {
            setBoxHeight("50%");
        } else if (currents.exploreboxmode === 1) {
            setBoxHeight("30%");
        } else if (currents.exploreboxmode === 2) {
            setBoxHeight("30%");
        } else if (currents.exploreboxmode === 3) {
            setBoxHeight("50%");
        } else if (currents.exploreboxmode === 4) {
            setBoxHeight("75%");
        } else if (currents.exploreboxmode === 5) {
            setBoxHeight("50%");
        } else if (currents.exploreboxmode === 6) {
            setBoxHeight("50%");
        }
    }, [currents.exploreboxmode]);

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
                    console.log("error!", e)
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
                {currents.exploreboxmode == 0 && (
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
                {currents.exploreboxmode == 1 && (
                    <>
                        <div className={styles.explore_box_top}>
                            <button className={styles.explore_box_join_button} onClick={onClickBackButton}>{"<-"}</button>
                            <input type="text" id="explore-input-1" className={styles.explore_input_server} placeholder="Server Invite Code" onInput={onServerInputInput} />
                        </div>
                        <button className={styles.explore_box_server_join_button} onClick={() => onClickServerJoinButton(ServerInput)}>Join Server</button>
                    </>
                )}
                {currents.exploreboxmode == 2 && (
                    <p>{`${LoadingText}`}</p>
                )}
                {currents.exploreboxmode == 3 && (
                    <>
                        <div className={styles.explore_box_top}>
                            <input type="text" id="explore-input-2" className={styles.explore_input_server} placeholder="Friend Name" onInput={onFriendInputInput} />
                        </div>
                        <button className={styles.explore_box_server_join_button} onClick={() => onClickSendFriendRequestButton(FriendInput)}>Send Friend Request</button>
                    </>
                )}
                {currents.exploreboxmode === 4 && (
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
                {currents.exploreboxmode === 5 && (
                    <div className={`${styles.explore_box_full_div} ${styles.ow_hidden_both}`}>
                        <div className={`${styles.center_both} ${styles.wh_full}`}>
                            <div className={styles.pad1} />
                            <p className={styles.fontn}>Create a new channel</p>
                            <div className={styles.pad5} />
                            <p className={styles.fonts3}>Choose your channel name</p>
                            <div className={styles.pad2} />
                            <input type='text' className={styles.setting_field_input_text} style={{ background: 'var(--cb-color-gray)' }} onInput={(ev) => onChannelCreateInputInput(ev.currentTarget.value)} />
                            <div className={styles.pad5} />
                            <p className={styles.image_alt_text}>Channel Name</p>
                            <div className={styles.pad2} />
                            <button className={`${styles.explore_box_join_button} ${styles.explore_box_left_bottom}`} onClick={closeExploreBox}>{"Back"}</button>
                            <button className={`${styles.explore_box_join_button} ${styles.explore_box_right_bottom} ${serverCreateButton.disabled && styles.explore_box_button_disabled}`} onClick={onClickChannelCreateButton} disabled={serverCreateButton.disabled}>{serverCreateButton.text}</button>
                        </div>
                    </div>
                )}
                {currents.exploreboxmode === 6 && (
                    <div className={`${styles.explore_box_full_div} ${styles.ow_hidden_both}`}>
                        <div className={`${styles.center_both} ${styles.wh_full}`}>
                            <div className={styles.pad1} />
                            <p className={styles.fontn}>Create a new category</p>
                            <div className={styles.pad5} />
                            <p className={styles.fonts3}>Choose your category name</p>
                            <div className={styles.pad2} />
                            <input type='text' className={styles.setting_field_input_text} style={{ background: 'var(--cb-color-gray)' }} onInput={(ev) => onCategoryCreateInputInput(ev.currentTarget.value)} />
                            <div className={styles.pad5} />
                            <p className={styles.image_alt_text}>Category Name</p>
                            <div className={styles.pad2} />
                            <button className={`${styles.explore_box_join_button} ${styles.explore_box_left_bottom}`} onClick={closeExploreBox}>{"Back"}</button>
                            <button className={`${styles.explore_box_join_button} ${styles.explore_box_right_bottom} ${serverCreateButton.disabled && styles.explore_box_button_disabled}`} onClick={onClickCategoryCreateButton} disabled={serverCreateButton.disabled}>{serverCreateButton.text}</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ExploreBox;