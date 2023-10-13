import classNames from "classnames/bind"
import images from "~/assets/images";
import styles from "~/pages/PrivateCouple/ImageDiary/ImageDiary.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faFilter, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import config from "~/config";
import { DropDownItem } from "~/components";
import { faCalendar, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const cx = classNames.bind(styles);

function ImageDiary() {
    const [open, setOpen] = useState(false);
    return (
        <div className={cx('container')}>
            <div className={cx('diary-post')}>
                <div className={cx('diary-post-sub')}>
                    <div className={cx('sub')}>
                        <div className={cx('diary-first')}>
                            <div className={cx('actions')}>
                                <div className={cx('icon-filter')} onClick={() => { setOpen(!open) }}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faFilter} />
                                    <div className={cx('name')}>Sort</div>
                                    <FontAwesomeIcon className={cx('icon')} icon={faChevronDown} />
                                </div>

                                {/* Dropdown menu */}
                                <div className={cx('dropdown-menu', `${open ? 'active' : 'inactive'}`)}>
                                    <ul>
                                        <DropDownItem icon={faCalendar} text={"Date"} />
                                        <DropDownItem icon={faHeart} text={"Heart"} />
                                        <DropDownItem icon={faCommentDots} text={"Comment"} />
                                    </ul>
                                </div>

                                {/* Filter by date specific */}
                                <div className={cx('sub-action-date')}>
                                    <div className={cx('from-date')}>
                                        <label htmlFor="startDate">From</label>
                                        <input type="date" id="startDate" />
                                    </div>
                                    <div className={cx('to-date')}>
                                        <label htmlFor="endDate">to</label>
                                        <input type="date" id="startDate" />
                                    </div>
                                    <div className={cx('button-apply')}>
                                        Apply
                                    </div>
                                </div>
                            </div>
                            <div className={cx('grid-image')}>
                                <div className={cx('grid-three-images')}>
                                    <div className={cx('one-image-in-grid')}>
                                        <Link to={config.routes.imagesDiary} >
                                            <div className={cx('image')}>
                                                <div className={cx('image-one')}>
                                                    <img src={images.login_image} alt="" />
                                                </div>
                                                <div className={cx('image-two')}></div>
                                            </div>
                                            <div className={cx('overlay-with-like-comment')}>
                                                <ul>
                                                    <li>
                                                        <span className={cx('count')}>7</span>
                                                        <span className={cx('icon')}>
                                                            <FontAwesomeIcon icon={faHeart} />
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className={cx('count')}>0</span>
                                                        <span className={cx('icon')}>
                                                            <FontAwesomeIcon icon={faComment} />
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={cx('one-image-in-grid')}>
                                        <Link to={config.routes.imagesDiary} >
                                            <div className={cx('image')}>
                                                <div className={cx('image-one')}>
                                                    <img src={images.login_image} alt="" />
                                                </div>
                                                <div className={cx('image-two')}></div>
                                            </div>
                                            <div className={cx('overlay-with-like-comment')}>
                                                <ul>
                                                    <li>
                                                        <span className={cx('count')}>7</span>
                                                        <span className={cx('icon')}>
                                                            <FontAwesomeIcon icon={faHeart} />
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className={cx('count')}>0</span>
                                                        <span className={cx('icon')}>
                                                            <FontAwesomeIcon icon={faComment} />
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={cx('one-image-in-grid')}>
                                        <Link to={config.routes.imagesDiary} >
                                            <div className={cx('image')}>
                                                <div className={cx('image-one')}>
                                                    <img src={images.login_image} alt="" />
                                                </div>
                                                <div className={cx('image-two')}></div>
                                            </div>
                                            <div className={cx('overlay-with-like-comment')}>
                                                <ul>
                                                    <li>
                                                        <span className={cx('count')}>7</span>
                                                        <span className={cx('icon')}>
                                                            <FontAwesomeIcon icon={faHeart} />
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className={cx('count')}>0</span>
                                                        <span className={cx('icon')}>
                                                            <FontAwesomeIcon icon={faComment} />
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Link>
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

export default ImageDiary;