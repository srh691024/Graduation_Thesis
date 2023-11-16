import classNames from "classnames/bind";
import styles from "~/layouts/SettingPrivateLayout/SettingPrivateLayout.module.scss";
import Header from '~/layouts/components/Header';
import SidebarSetting from "../components/SidebarSetting";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import config from "~/config";

const cx = classNames.bind(styles);

function SettingPrivateLayout({ children }) {
    const { current } = useSelector(state => state.user)
    if (current.role === '22') {
        return <Navigate to={config.routes.login} />
    }
    return (
        <div className={cx("wrapper")}>
            <div className={cx('inner')}>
                <div className={cx('inner-first')}>
                    <div className={cx('inner-second')}>
                        <div className={cx('inner-third')}>
                            <div className={cx('inner-fourth')}>
                                <Header />
                                <div className={cx('container')}>
                                    <div className={cx('section')}>
                                        <div className={cx('main')}>
                                            <div className={cx('divide-column')}>
                                                <SidebarSetting />
                                                <div className={cx('border-line')}>
                                                    <div className={cx('border-line-one')}></div>
                                                </div>
                                                {children}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingPrivateLayout;