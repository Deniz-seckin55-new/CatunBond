import { SetStateAction, useEffect, useState } from 'react';
import styles from '../page.module.css';
import Image from 'next/image';
import { Currents } from '../utils/utils';

interface Props {
    ExploreBoxV: boolean;
    setExploreBoxV: React.Dispatch<React.SetStateAction<boolean>>;
    closeExploreBox: () => void;
    onClickJoinButton: () => void;
    onClickBackButton: () => void;
    onClickServerJoinButton: (str: string) => void;
    LoadingText: string;
    setCurrents: React.Dispatch<React.SetStateAction<Currents>>;
    Currents: Currents;
}

const ExploreBox: React.FC<Props> = ({ ExploreBoxV, setExploreBoxV, closeExploreBox, onClickJoinButton, onClickBackButton, onClickServerJoinButton, LoadingText, setCurrents, Currents }) => {

    useEffect(() => {
        if (Currents.exploreboxmode == null) { setCurrents({ ...Currents, exploreboxmode: 0 }) }
    }, [Currents]);

    const [ServerInput, setServerInput] = useState("");
    const [boxHeight, setBoxHeight] = useState("50%");

    const onServerInputInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setServerInput(event.target.value);
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
            setshowElement(true);
        } else {
            setTimeout(() => {
                setshowElement(false);
            }, 200);
        }
    }, [ExploreBoxV]);

    useEffect(() => {
        if(Currents.exploreboxmode == 0) {
            setBoxHeight("50%");
        } else if(Currents.exploreboxmode == 1) {
            setBoxHeight("30%");
        } else if(Currents.exploreboxmode == 2) {
            setBoxHeight("30%");
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
            </div>
        </>
    );
}

export default ExploreBox;