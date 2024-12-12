import { SetStateAction, useEffect, useState } from 'react';
import styles from '../page.module.css';
import Image from 'next/image';

interface Props {
    ExploreBoxV: boolean;
    setExploreBoxV: React.Dispatch<React.SetStateAction<boolean>>;
    closeExploreBox: () => void;
}

const ExploreBox: React.FC<Props> = ({ ExploreBoxV, setExploreBoxV, closeExploreBox }) => {
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
                if(e instanceof SyntaxError) {
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
        if(event.key == "Escape") {
            closeExploreBox();
        }
    }

    return (
        <>
            {(<div id="explore-box" className={`${styles.explore_box} ${ExploreBoxV ? styles.explore_box_active : ''}`} style={{ visibility: (showElement ? "visible" : "hidden") }} onKeyDown={onKeyDownExploreBox} tabIndex={0}>
            {(SRRegexError != "") && (<p id="regex-error-message" className={styles.regex_error_message}>Regex Error: {SRRegexError}</p>)}
                <input type="text" id="explore-input" className={styles.explore_input} placeholder="Search Public Servers" onInput={onInputSearch} />
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
            </div>)}
        </>
    );
}

export default ExploreBox;