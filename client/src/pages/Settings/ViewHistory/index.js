import classNames from "classnames/bind";
import styles from "~/pages/Settings/ViewHistory/ViewHistory.module.scss"

const cx = classNames.bind(styles);

function ViewHistory() {
    return (
        <div className={cx('wrapper')}>View History</div>
    );
}

export default ViewHistory;