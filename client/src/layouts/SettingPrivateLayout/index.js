import classNames from "classnames/bind";
import styles from "~/layouts/SettingPrivateLayout/SettingPrivateLayout.module.scss";
import Header from '~/layouts/components/Header';

const cx = classNames.bind(styles);

function SettingPrivateLayout({children}) {
    return (
        <div className={cx("wrapper")}>

        </div>
    );
}

export default SettingPrivateLayout;