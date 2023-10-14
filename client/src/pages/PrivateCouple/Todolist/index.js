import classNames from "classnames/bind";
import styles from "~/pages/PrivateCouple/Todolist/Todolist.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellConcierge, faClock, faCommentDots, faGift, faHandHoldingHand, faHouse, faListCheck, faSmileBeam, faStar, faSun } from "@fortawesome/free-solid-svg-icons";
import { SubTodo } from "~/components";

const cx = classNames.bind(styles);

function Todolist() {
    return (
        <div className={cx('container')}>
            <div className={cx('diary-post')}>
                <div className={cx('diary-post-sub')}>
                    <div className={cx('sub')}>
                        <div className={cx('diary-first')}>
                            <div className={cx('left-column')}>
                                <div className={cx('sidebar')}>
                                    <div className={cx('sidebar-header')}>
                                        <div className={cx('sidebarNavButton')}>
                                            <button >
                                                <FontAwesomeIcon className={cx('icon')} icon={faListCheck} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={cx('sidebar-content')}>
                                        <div className={cx('sidecar-scroll')}>
                                            <ul>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'sun')} icon={faSun} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Today </span>
                                                        </div>
                                                        <div className={cx('sub-count')}>5</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'star')} icon={faStar} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Important</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>5</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'byme')} icon={faSmileBeam} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>By me</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>5</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'task')} icon={faHouse} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Tasks</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>5</div>
                                                    </div>
                                                </li>
                                                <div className={cx('sidebar-lastStaticList')}></div>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'physical')} icon={faHandHoldingHand} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Physical Touch</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>5</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'bell')} icon={faBellConcierge} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Acts of Service</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>5</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'clock')} icon={faClock} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Quality Time</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>5</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'talk')} icon={faCommentDots} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Words of Affirmation</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>5</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'gift')} icon={faGift} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Receiving Gifts</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>5</div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <SubTodo/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todolist;