import styles from "../page.module.css";

const LoadingPage: React.FC<{isDone: boolean}> = ({ isDone }) => {
    return (
        <div className={styles.loading_page}>
            <svg className={`${styles.loading_page_element} ${isDone && styles.loading_page_element_done}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="6em" height="6em" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="8" stroke="#1e2ede" fill="none" cy="50" cx="50">
                <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
            </circle><g></g></g></svg>
        </div>
    )
}

export default LoadingPage;