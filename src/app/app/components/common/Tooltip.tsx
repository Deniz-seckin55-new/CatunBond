import styles from '../../page.module.css';
import { Currents } from '../../utils/utils';

interface Props {
    tooltipText: string;
    tooltipVisible: boolean;
    tooltipPosition: { top: number, left: number };
    tooltipRef: React.RefObject<HTMLDivElement | null>;
}

const Tooltip: React.FC<Props> = ({tooltipPosition, tooltipText, tooltipVisible, tooltipRef}) => {
    return (
        <div className={styles.hover_tooltip} style={{ opacity: tooltipVisible ? 1 : 0, left: tooltipPosition.left, top: tooltipPosition.top }} ref={tooltipRef}>
            <p className={styles.tooltip_text}>{tooltipText}</p>
        </div>
    )
}

export default Tooltip;