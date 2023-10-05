import classNames from "classnames/bind";
import styles from "~/components/Post/Post.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart as faHearts, faComment as faComments } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment, faShareFromSquare } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

function Post() {
    return (
        <div className={cx('wrapper')}>
            <article>
                <div className={cx('wrapper-post')}>
                    <div className={cx('avatar-name-date')}>
                        <div className={cx('and')}>
                            <div className={cx('avatar-post')}>
                                <img src={images.login_image} alt='' />
                            </div>
                            <div className={cx('name-date')}>
                                <div className={cx('nd')}>
                                    <div className={cx('nd-first')}>
                                        <div className={cx('name')} >
                                            <div className={cx('name-first')}>
                                                <span>
                                                    <a href="/" >Name couple</a>
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx('date')}>
                                            <span>
                                                <span className={cx('span-first')}>•</span>
                                            </span>
                                            <div className={cx('date-first')}>
                                                <a href="/">
                                                    <span>2d</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('nd-second')}>
                                        <span>Written by Thuy Duong</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('action')}>
                                <div className={cx('action-first')}>
                                    <div className={cx('action-second')}>
                                        <div className={cx('action-third')}>
                                            <div className={cx('icon')}>
                                                <FontAwesomeIcon className={cx('icon-dot')} icon={faEllipsis} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('image')}>
                        <div className={cx('image-one')}>
                            <div className={cx('image-two')}>
                                <div className={cx('image-three')}>
                                    <div className={cx('image-four')}>
                                        <div className={cx('img-one')}>
                                            <img src={images.login_image} alt="" />
                                        </div>
                                        <div className={cx('img-two')}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('actions')}>
                        <div className={cx('actions-one')}>
                            <div className={cx('actions-two')}>
                                <div className={cx('sub-actions')}>
                                    <div className={cx('like-comment-share')}>
                                        <span className={cx('like')}>
                                            <div className={cx('like-one')}>
                                                <div className={cx('like-two')}>
                                                    <span>
                                                        <FontAwesomeIcon className={cx('icon')} icon={faHeart} />
                                                    </span>
                                                </div>
                                            </div>
                                        </span>
                                        <span>
                                            <div className={cx('comment')}>
                                                <div className={cx('comment-one')}>
                                                    <FontAwesomeIcon className={cx('icon')} icon={faComment} />
                                                </div>
                                            </div>
                                        </span>
                                        <button >
                                            <div className={cx('share')}>
                                                <FontAwesomeIcon className={cx('icon')} icon={faShareFromSquare} />
                                            </div>
                                        </button>
                                    </div>
                                    <div className={cx('like-comment-count')}>
                                        <span>
                                            <div className={cx('lcc-icon')}>
                                                <div className={cx('lcc-icon-one')}>
                                                    <div className={cx('lcc-count')}>
                                                        <span>12</span>
                                                    </div>
                                                    <div className={cx('icon-count')}>
                                                        <FontAwesomeIcon className={cx('icon')} icon={faHearts} />
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                        <span>
                                            <div className={cx('lcc-icon')}>
                                                <div className={cx('lcc-icon-one')}>
                                                    <div className={cx('lcc-count')}>
                                                        <span>12</span>
                                                    </div>
                                                    <div className={cx('icon-count')}>
                                                        <FontAwesomeIcon className={cx('icon')} icon={faComments} />
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('content-post')}>
                                    <div className={cx('author-content')}>
                                        <div className={cx('author')}>
                                            <div className={cx('author-one')}>
                                                <a href="/" alt="">Thuy Duong</a>
                                            </div>
                                        </div>
                                        <span>
                                            <span className={cx('content')}>Content of diary post</span>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('sub-comment')}>
                                    <div className={cx('view-all-comment')}>
                                        <a href="/" >
                                            <span>View all 123 comments</span>
                                        </a>
                                    </div>
                                    <ul>
                                        <div className={cx('comment')}>
                                            <div className={cx('comment-one')}>
                                                <div className={cx('comment-two')}>
                                                    <div className={cx('comment-three')}>
                                                        <div className={cx('name')}>
                                                            <a href="/">
                                                                <div className={cx('name-one')}>
                                                                    <div className={cx('name-two')}>
                                                                        <span>Sinh Nhat</span>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <span className={cx('space')}> </span>
                                                        <span className={cx('content-comment')}>
                                                            <span>Nice</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                                <div className={cx('add-comment')}>
                                    <div className={cx('section')}>
                                        <div className={cx('section-one')}>
                                            <form>
                                                <div className={cx('section-two')}>
                                                    <textarea placeholder="Add a comment..." autoComplete="off" autoCorrect="off" ></textarea>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </article>

        </div>
    );
}

export default Post;