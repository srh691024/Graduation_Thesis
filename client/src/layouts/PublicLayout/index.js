import classNames from "classnames/bind";
import styles from '~/layouts/PublicLayout/PublicLayout.module.scss'
import { HeaderPublic, SidebarPublic } from "../components";

const cx = classNames.bind(styles);

function PublicLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderPublic />
            <div className={cx('container')}>
                <SidebarPublic />
                {children}
            </div>
        </div>
    );
}

export default PublicLayout;