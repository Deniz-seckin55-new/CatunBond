import styles from '../../page.module.css';

interface Props {
    tooltipText: string;
    tooltipTextColor: string;
    tooltipVisible: boolean;
    tooltipPosition: { top: number, left: number };
    tooltipRef: React.RefObject<HTMLDivElement | null>;
}

const Tooltip: React.FC<Props> = ({tooltipPosition, tooltipText, tooltipTextColor, tooltipVisible, tooltipRef}) => {
    return (
        <div className={styles.hover_tooltip} style={{ opacity: tooltipVisible ? 1 : 0, left: tooltipPosition.left, top: tooltipPosition.top, color: tooltipTextColor }} ref={tooltipRef}>
            <p className={styles.tooltip_text}>{tooltipText}</p>
        </div>
    )
}

export default Tooltip;