import { faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import styles from '~/layouts/components/SidebarPublic/SidebarPublic.module.scss'

const cx = classNames.bind(styles);

function SidebarPublic({current}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebarContainer')}>
                <div className={cx('scrollContainer')}>
                    <div className={cx('wrapperDiv')}>
                        <div className={cx('mainNavContainer')}>
                            <ul className={cx('mainNav')}>
                                <li>
                                    <Link className={cx('styleLink')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faHouse} />
                                        <span className={cx('mainNavText')}>For you</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className={cx('styleLink')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faUsers} />
                                        <span className={cx('mainNavText')}>Following</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('userContainer')}>
                            <h2 className={cx('h2Title')}>Accounts following</h2>
                            <ul className={cx('accountList')}> {/*show 10 accounts then -> see more */}
                                {current?.followings?.map((f, index) =>
                                    <li key={index}>
                                        <div className={cx('userLinkContainer')}>
                                            <Link>
                                                <div className={cx('styleUserAvatar')}>
                                                    <span className={cx('styleAvatar')}>
                                                        <img src={f.avatarCouple} alt="" />
                                                    </span>
                                                </div>
                                            </Link>
                                            <Link className={cx('userContentLink')}>
                                                <div className={cx('userTitleWrapper')}>
                                                    <span className={cx('userTitle')}>{f.userNameCouple}</span>
                                                </div>
                                                <p className={cx('userDesc')}>{f.nameCouple}</p>
                                            </Link>
                                        </div>
                                    </li>
                                )}
                            </ul>
                            <button className={cx('showMoreText')}>
                                <p className={cx('pShowMoreText')}>See more</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarPublic;