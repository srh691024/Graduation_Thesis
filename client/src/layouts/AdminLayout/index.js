import classNames from "classnames/bind";
import styles from '~/layouts/AdminLayout/AdminLayout.module.scss';
import { HeaderAdmin, NavAdmin } from "../components";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import config from "~/config";
const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    const { isLoggedIn, current } = useSelector(state => state.user)
    if (!isLoggedIn || !current || current.role !== '22') {
        return <Navigate to={config.routes.login} />
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <NavAdmin />
                <div className={cx('content')}>
                    <div className={cx('content-page')}>
                        <HeaderAdmin />
                        {children}
                    </div>
                    <footer>
                        © 2023 LoDi by Hoang Thi Thuy Duong.
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;