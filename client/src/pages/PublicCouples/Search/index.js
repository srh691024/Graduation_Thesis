import { faChevronRight, faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import styles from '~/pages/PublicCouples/Search/Search.module.scss'
import config from "~/config";

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx("searchContainer")}>
                <div className={cx('tabsContainer')}>
                    <div className={cx('tabsList')}>
                        <div className={cx('navContainer')}>
                            <div className={cx('navList')}>
                                <div className={cx('tab')}>
                                    <div>Top</div>
                                </div>
                                <div className={cx('tab')}>
                                    <div>Couple</div>
                                </div>
                                <div className={cx('tab')}>
                                    <div>Diary</div>
                                </div>
                            </div>
                            <div className={cx('tabInk')}></div>
                        </div>
                    </div>
                </div>
                <div className={cx('panelContainer')}>
                    <div className={cx('threeColumnContainer')}>
                        <div className={cx('diaryFeed')}>
                            <div className={cx('blockContainer')}>
                                <div className={cx('titleContainer')}>
                                    <h2>Couple</h2>
                                    <p className={cx('pSeeMore')}>
                                        See more
                                        <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
                                    </p>
                                </div>
                                <div className={cx('link')}>
                                    <Link className={cx('styleAvatarCoupleLink')}>
                                        <div className={cx('divContainer')}>
                                            <span className={cx('avatarContainer')}>
                                                <img src={images.login_image} alt="" />
                                            </span>
                                        </div>
                                    </Link>
                                    <Link className={cx('styleInforWrapper')}>
                                        <p className={cx('pTitle')}>usernameofcouple</p>
                                        <div className={cx('subTitleWrapper')}>
                                            <p className={cx('userSubTitle')}>Name of couple</p>
                                            .
                                            <strong>
                                                12K
                                                <span>Follower</span>
                                            </strong>
                                        </div>
                                        <p className={cx('pDesc')}>
                                            <strong>this is biography</strong>
                                        </p>
                                    </Link>
                                </div>
                                <div className={cx('titleDivide')}></div>
                            </div>
                            <div className={cx('blockContainer')}>
                                <div className={cx('titleContainer')}>
                                    <h2>Diary</h2>
                                </div>
                            </div>
                            <div className={cx('listOfDiary')}>
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
                                            <div className={cx('infoDiary')}>
                                                <div className={cx('cardBottomInfo')}>
                                                    <div className={cx('cardCaption')}>
                                                        <div className={cx('divContainer')}>
                                                            <span>this is caption for diary his is caption for diary</span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('useNameCouple')}>
                                                        <Link >
                                                            <div className={cx('userInfo')}>
                                                                <span className={cx('avatarContainer')}>
                                                                    <img src={images.login_image} alt=""/>
                                                                </span>
                                                                <p>usernameofcouple</p>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('dateCreate')}>8-25</div>
                                                    </div>
                                                </div>
                                            </div>
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
                                            <div className={cx('infoDiary')}>
                                                <div className={cx('cardBottomInfo')}>
                                                    <div className={cx('cardCaption')}>
                                                        <div className={cx('divContainer')}>
                                                            <span>this is caption for diary</span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('useNameCouple')}>
                                                        <Link >
                                                            <div className={cx('userInfo')}>
                                                                <span className={cx('avatarContainer')}>
                                                                    <img src={images.login_image} alt=""/>
                                                                </span>
                                                                <p>usernameofcouple</p>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('dateCreate')}>8-25</div>
                                                    </div>
                                                </div>
                                            </div>
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
                                            <div className={cx('infoDiary')}>
                                                <div className={cx('cardBottomInfo')}>
                                                    <div className={cx('cardCaption')}>
                                                        <div className={cx('divContainer')}>
                                                            <span>this is caption for diary</span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('useNameCouple')}>
                                                        <Link >
                                                            <div className={cx('userInfo')}>
                                                                <span className={cx('avatarContainer')}>
                                                                    <img src={images.login_image} alt=""/>
                                                                </span>
                                                                <p>usernameofcouple</p>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('dateCreate')}>8-25</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                            <div className={cx('infoDiary')}>
                                                <div className={cx('cardBottomInfo')}>
                                                    <div className={cx('cardCaption')}>
                                                        <div className={cx('divContainer')}>
                                                            <span>this is caption for diary</span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('useNameCouple')}>
                                                        <Link >
                                                            <div className={cx('userInfo')}>
                                                                <span className={cx('avatarContainer')}>
                                                                    <img src={images.login_image} alt=""/>
                                                                </span>
                                                                <p>usernameofcouple</p>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('dateCreate')}>8-25</div>
                                                    </div>
                                                </div>
                                            </div>
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
                                            <div className={cx('infoDiary')}>
                                                <div className={cx('cardBottomInfo')}>
                                                    <div className={cx('cardCaption')}>
                                                        <div className={cx('divContainer')}>
                                                            <span>this is caption for diary</span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('useNameCouple')}>
                                                        <Link >
                                                            <div className={cx('userInfo')}>
                                                                <span className={cx('avatarContainer')}>
                                                                    <img src={images.login_image} alt=""/>
                                                                </span>
                                                                <p>usernameofcouple</p>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('dateCreate')}>8-25</div>
                                                    </div>
                                                </div>
                                            </div>
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
                                            <div className={cx('infoDiary')}>
                                                <div className={cx('cardBottomInfo')}>
                                                    <div className={cx('cardCaption')}>
                                                        <div className={cx('divContainer')}>
                                                            <span>this is caption for diary</span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('useNameCouple')}>
                                                        <Link >
                                                            <div className={cx('userInfo')}>
                                                                <span className={cx('avatarContainer')}>
                                                                    <img src={images.login_image} alt=""/>
                                                                </span>
                                                                <p>usernameofcouple</p>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('dateCreate')}>8-25</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                            <div className={cx('infoDiary')}>
                                                <div className={cx('cardBottomInfo')}>
                                                    <div className={cx('cardCaption')}>
                                                        <div className={cx('divContainer')}>
                                                            <span>this is caption for diary</span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('useNameCouple')}>
                                                        <Link >
                                                            <div className={cx('userInfo')}>
                                                                <span className={cx('avatarContainer')}>
                                                                    <img src={images.login_image} alt=""/>
                                                                </span>
                                                                <p>usernameofcouple</p>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('dateCreate')}>8-25</div>
                                                    </div>
                                                </div>
                                            </div>
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
                                            <div className={cx('infoDiary')}>
                                                <div className={cx('cardBottomInfo')}>
                                                    <div className={cx('cardCaption')}>
                                                        <div className={cx('divContainer')}>
                                                            <span>this is caption for diary</span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('useNameCouple')}>
                                                        <Link >
                                                            <div className={cx('userInfo')}>
                                                                <span className={cx('avatarContainer')}>
                                                                    <img src={images.login_image} alt=""/>
                                                                </span>
                                                                <p>usernameofcouple</p>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('dateCreate')}>8-25</div>
                                                    </div>
                                                </div>
                                            </div>
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
                                            <div className={cx('infoDiary')}>
                                                <div className={cx('cardBottomInfo')}>
                                                    <div className={cx('cardCaption')}>
                                                        <div className={cx('divContainer')}>
                                                            <span>this is caption for diary</span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('useNameCouple')}>
                                                        <Link >
                                                            <div className={cx('userInfo')}>
                                                                <span className={cx('avatarContainer')}>
                                                                    <img src={images.login_image} alt=""/>
                                                                </span>
                                                                <p>usernameofcouple</p>
                                                            </div>
                                                        </Link>
                                                        <div className={cx('dateCreate')}>8-25</div>
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

                {/* button to the top */}
                <div className={cx('bottonContainer')}></div>
            </div>
        </div>
    );
}

export default Search;