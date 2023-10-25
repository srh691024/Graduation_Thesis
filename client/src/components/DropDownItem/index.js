import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";
import styles from "~/components/DropDownItem/DropDownItem.module.scss"
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function DropDownItem(props) {
    return (
        <li className={cx('dropdown-item')}>
            <FontAwesomeIcon className={cx('icon')} icon={props.icon} />
            <Link>{props.text}</Link>
        </li>
    );
}

export default DropDownItem;