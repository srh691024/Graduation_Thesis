import { faPenToSquare, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { faEnvelopeOpenText, faGear, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import styles from '~/layouts/components/NavAdmin/NavAdmin.module.scss'

const cx = classNames.bind(styles);

function NavAdmin() {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logoContainer')}>
                <div className={cx('logoInner')}>
                    <Link className={cx('logo')}>
                        <img src={images.logo} alt="Logo of LODI-Love Diary" />
                    </Link>
                </div>
            </div>
            <div className={cx('navContainer')}>
                <div className={cx('navInner')}>
                    <ul>
                        <li>
                            <div className={cx('subItem')}>
                                <div className={cx('iconItem')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />
                                </div>
                                <div className={cx('titleItem')}>Dashboard</div>
                            </div>
                        </li>
                        <li>
                            <div className={cx('subItem')}>
                                <div className={cx('iconItem')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faUsersViewfinder} />
                                </div>
                                <div className={cx('titleItem')}>Accounts</div>
                            </div>
                        </li>
                        <li>
                            <div className={cx('subItem')}>
                                <div className={cx('iconItem')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faPenToSquare} />
                                </div>
                                <div className={cx('titleItem')}>Post</div>
                            </div>
                        </li>
                        <li>
                            <div className={cx('subItem')}>
                                <div className={cx('iconItem')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faEnvelopeOpenText} />
                                </div>
                                <div className={cx('titleItem')}>Support</div>
                            </div>
                        </li>
                        <li>
                            <div className={cx('subItem')}>
                                <div className={cx('iconItem')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faGear} />
                                </div>
                                <div className={cx('titleItem')}>Setting</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NavAdmin;