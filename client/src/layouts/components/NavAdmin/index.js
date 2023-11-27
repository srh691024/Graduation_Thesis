import { faPenToSquare, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { faBars, faEnvelopeOpenText, faGear, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import config from "~/config";
import styles from '~/layouts/components/NavAdmin/NavAdmin.module.scss'

const cx = classNames.bind(styles);

function NavAdmin({ openNavbar, openNavbarAdmin }) {

    return (
        <div className={cx('wrapper', `${openNavbar ? 'navResponsive' : ''}`)}>
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
                            <Link className={cx('subItem')}>
                                <div className={cx('iconItem')} onClick={openNavbarAdmin}>
                                    <FontAwesomeIcon className={cx('iconOpenTaskBar')} icon={faBars} />
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={config.routes.dashboard} className={cx('subItem')}>
                                <div className={cx('iconItem')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faRectangleList} />
                                </div>
                                <div className={cx('titleItem')}>Dashboard</div>
                            </Link>
                        </li>
                        <li>
                            <Link to={config.routes.accounts} className={cx('subItem')}>
                                <div className={cx('iconItem')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faUsersViewfinder} />
                                </div>
                                <div className={cx('titleItem')}>Accounts</div>
                            </Link>
                        </li>
                        <li>
                            <Link to={config.routes.posts} className={cx('subItem')}>
                                <div className={cx('iconItem')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faPenToSquare} />
                                </div>
                                <div className={cx('titleItem')}>Post</div>
                            </Link>
                        </li>
                        <li>
                            <Link to={config.routes.supports} className={cx('subItem')}>
                                <div className={cx('iconItem')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faEnvelopeOpenText} />
                                </div>
                                <div className={cx('titleItem')}>Support</div>
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('subItem')}>
                                <div className={cx('iconItem')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faGear} />
                                </div>
                                <div className={cx('titleItem')}>Setting</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NavAdmin;