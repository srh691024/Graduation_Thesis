import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faSquareCheck, faImages, faBell, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faPeopleLine, faBars, faHouse, faBookBookmark} from '@fortawesome/free-solid-svg-icons';

import images from "~/assets/images";

const cx = classNames.bind(styles)

function Header() {
    return (
        <div className={cx('wrapper-header')}>
            <div className={cx('inner')}>
                <div className={cx('inner-first')}>
                    <div className={cx('inner-second')}>
                        <div className={cx('inner-third')}>
                            <div className={cx('logo')}>
                                <div className={cx('logo-first')}>
                                    <div className={cx('logo-second')}>
                                        <span>
                                            <div className={cx('logo-third')}>
                                                <a href="/">
                                                    <div className={cx('logo-fourth')}>
                                                        <div className={cx('logo-image')}>
                                                            <div className={cx('logo-image-first')}>
                                                                <div className={cx('logo-image-second')}>
                                                                    <img src={images.logo_no_text} alt="Logo" title='LODI - Love Diary' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('actions')}>
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <a href='/' alt="">
                                                    <div className={cx('sub-third')}>
                                                        <div className={cx('icon')}>
                                                            <div className={cx('icon-first')}>
                                                                <div className={cx('icon-second')}>
                                                                    <FontAwesomeIcon className={cx('icon-third')} icon={faHouse} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <a href='/' alt="">
                                                    <div className={cx('sub-third')}>
                                                        <div className={cx('icon')}>
                                                            <div className={cx('icon-first')}>
                                                                <div className={cx('icon-second')}>
                                                                    <FontAwesomeIcon className={cx('icon-third')} icon={faFaceSmile} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <a href='/' alt="">
                                                    <div className={cx('sub-third')}>
                                                        <div className={cx('icon')}>
                                                            <div className={cx('icon-first')}>
                                                                <div className={cx('icon-second')}>
                                                                    <FontAwesomeIcon className={cx('icon-third')} icon={faPeopleLine} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <a href='/' alt="">
                                                    <div className={cx('sub-third')}>
                                                        <div className={cx('icon')}>
                                                            <div className={cx('icon-first')}>
                                                                <div className={cx('icon-second')}>
                                                                    <FontAwesomeIcon className={cx('icon-third')} icon={faBookBookmark} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <a href='/' alt="">
                                                    <div className={cx('sub-third')}>
                                                        <div className={cx('icon')}>
                                                            <div className={cx('icon-first')}>
                                                                <div className={cx('icon-second')}>
                                                                    <FontAwesomeIcon className={cx('icon-third')} icon={faCalendarDays} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <a href='/' alt="">
                                                    <div className={cx('sub-third')}>
                                                        <div className={cx('icon')}>
                                                            <div className={cx('icon-first')}>
                                                                <div className={cx('icon-second')}>
                                                                    <FontAwesomeIcon className={cx('icon-third')} icon={faSquareCheck} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <a href='/' alt="">
                                                    <div className={cx('sub-third')}>
                                                        <div className={cx('icon')}>
                                                            <div className={cx('icon-first')}>
                                                                <div className={cx('icon-second')}>
                                                                    <FontAwesomeIcon className={cx('icon-third')} icon={faImages} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <a href='/' alt="">
                                                    <div className={cx('sub-third')}>
                                                        <div className={cx('icon')}>
                                                            <div className={cx('icon-first')}>
                                                                <div className={cx('icon-second')}>
                                                                    <FontAwesomeIcon className={cx('icon-third')} icon={faBell} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('setting')}>
                                <div className={cx('setting-first')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <a href='/' alt="">
                                                    <div className={cx('sub-third')}>
                                                        <div className={cx('icon')}>
                                                            <div className={cx('icon-first')}>
                                                                <div className={cx('icon-second')}>
                                                                    <FontAwesomeIcon className={cx('icon-third')} icon={faBars} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;