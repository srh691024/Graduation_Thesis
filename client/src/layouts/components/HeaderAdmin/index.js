import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import styles from '~/layouts/components/HeaderAdmin/HeaderAdmin.module.scss'

const cx = classNames.bind(styles);

function HeaderAdmin() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <ul className={cx('navContainer')}>
                    <li className={cx('notificationContainer')}>
                        <Link className={cx('iconNoti')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faBell}/>
                            <span className={cx('num')}>2</span>
                        </Link>
                        <div className={cx('titleNoti')}>
                            <span>Notifications</span>
                        </div>
                    </li>
                    <li className={cx('adminContainer')}>
                        <div className={cx('avatarAdminContainer')}>
                            <img src={images.login_image} alt=""/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default HeaderAdmin;