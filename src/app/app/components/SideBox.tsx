import styles from '../page.module.css';

interface Props {
    onClickSearch: () => void;
    onClickFriendsButton: () => void;
}

const SideBox: React.FC<Props> = ({ onClickSearch, onClickFriendsButton }) => {
    return (
        <>
            <div id="side-box" className={styles.side_box}>
                <div id="side-box-search" className={styles.side_box_search}>
                    <div id="side-box-search-input-wraper" className={styles.side_box_search_input_wraper}>
                        <input id="side-box-search-input" className={styles.side_box_search_input} type="text" placeholder="Search anything" readOnly onClick={onClickSearch} />
                    </div>
                </div>
                <div id="side-box-main" className={styles.side_box_main}>
                    <div id="side-box-top" className={styles.side_box_top}>
                        <div id="friends-button-wraper" className={styles.friends_button_wraper}>
                            <img id="friends-button-image" className={styles.friends_button_image} />
                            <button id="friends-button" className={styles.friends_button} onClick={onClickFriendsButton}>Friends</button>
                        </div>
                    </div>
                    <div id="side-box-bottom" className={styles.side_box_bottom}>

                    </div>
                </div>
                <div id="side-box-channels" className={styles.side_box_channels}>

                </div>
            </div>
        </>
    );
}

export default SideBox;