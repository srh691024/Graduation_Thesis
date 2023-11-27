import { faChevronRight, faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import images from "~/assets/images";
import styles from '~/pages/PublicCouples/Search/Search.module.scss'
import { useEffect, useState } from "react";
import * as postServices from '~/services/postServices'
import moment from "moment";

const cx = classNames.bind(styles);

function Search() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword");

    const [coupleResults, setCoupleResults] = useState([]);
    const [postResults, setPostResults] = useState([]);
    const [coupleCurrentPage, setCoupleCurrentPage] = useState(1); // Trang hiện tại cặp đôi
    const [postCurrentPage, setPostCurrentPage] = useState(1); // Trang hiện tại bài post
    // const perPage = 9;
    const [coupleStatus, setCoupleStatus] = useState(true);
    const [postStatus, setPostStatus] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const searchAndDisplayResults = async (type, page) => {
            setLoading(true)
            const response = await postServices.apiSearchPublic(keyword, page)
            const newData = response;

            // Dựa vào loại (account hoặc post) để cập nhật kết quả tương ứng
            if (type === 'couple') {
                setCoupleResults((prevResults) => {
                    // Lọc và loại bỏ các phần tử trùng lặp
                    const newCoupleResults = newData.couples.filter(
                        (newCouple) => !prevResults.some((prevCouple) => prevCouple._id === newCouple._id)
                    );
                    return [...prevResults, ...newCoupleResults];
                });
            } else if (type === 'post') {
                setPostResults((prevResults) => {
                    // Lọc và loại bỏ các phần tử trùng lặp
                    const newPostResults = newData.posts.filter(
                        (newPost) => !prevResults.some((prevPost) => prevPost._id === newPost._id)
                    );
                    return [...prevResults, ...newPostResults];
                });
            }
            setLoading(false)
        };
        searchAndDisplayResults('couple', coupleCurrentPage);
        searchAndDisplayResults('post', postCurrentPage);
    }, [keyword, coupleCurrentPage, postCurrentPage, setLoading]);

    const handleSeeMore = (type) => {
        // Tăng trang lên và gọi lại useEffect để lấy thêm kết quả tương ứng với loại (account hoặc post)
        if (type === 'couple') {
            setCoupleCurrentPage((prevPage) => prevPage + 1);
        } else if (type === 'post') {
            setPostCurrentPage((prevPage) => prevPage + 1);
        }
    };
    const handleClickTop = () => {
        setPostStatus(true)
        setCoupleStatus(true)

    }
    const handleClickCouple = () => {
        setPostStatus(false)
        setCoupleStatus(true)
    }
    const handleClickDiary = () => {
        setPostStatus(true)
        setCoupleStatus(false)
    }


    return (
        <div className={cx('wrapper')}>
            <div className={cx("searchContainer")}>
                <div className={cx('tabsContainer')}>
                    <div className={cx('tabsList')}>
                        <div className={cx('navContainer')}>
                            <div className={cx('navList')}>
                                <div className={cx('tab')} onClick={() => handleClickTop()}>
                                    <div>Top</div>
                                </div>
                                <div className={cx('tab')} onClick={() => handleClickCouple()}>
                                    <div>Couple</div>
                                </div>
                                <div className={cx('tab')} onClick={() => handleClickDiary()}>
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
                                {coupleStatus &&
                                    <>
                                        <div className={cx('titleContainer')}>
                                            <h2>Couple</h2>

                                            <p className={cx('pSeeMore')} onClick={() => handleClickCouple()}>
                                                See more
                                                <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
                                            </p>

                                        </div>
                                        {postStatus && coupleStatus ?
                                            <>
                                                {coupleResults.length > 0 ?
                                                    <div className={cx('link')} key={coupleResults[0]?._id}>
                                                        <Link className={cx('styleAvatarCoupleLink')}>
                                                            <div className={cx('divContainer')}>
                                                                <span className={cx('avatarContainer')}>
                                                                    <img src={coupleResults[0]?.avatarCouple} alt="" />
                                                                </span>
                                                            </div>
                                                        </Link>
                                                        <Link className={cx('styleInforWrapper')}>
                                                            <p className={cx('pTitle')}>
                                                                {coupleResults[0]?.userNameCouple}
                                                                {/* usernameofcouple */}
                                                            </p>
                                                            <div className={cx('subTitleWrapper')}>
                                                                <p className={cx('userSubTitle')}>
                                                                    {coupleResults[0]?.nameCouple}
                                                                    {/* Name of couple */}
                                                                </p>
                                                                &nbsp;
                                                                •
                                                                &nbsp;
                                                                <strong>
                                                                    {coupleResults[0]?.followers.length}&nbsp;
                                                                    <span>Follower</span>
                                                                </strong>
                                                            </div>
                                                            <p className={cx('pDesc')}>
                                                                <strong>
                                                                    {coupleResults[0]?.biography}
                                                                    {/* this is biography */}
                                                                </strong>
                                                            </p>
                                                        </Link>
                                                    </div>
                                                    :
                                                    <div>No couple match</div>
                                                }
                                            </>
                                            :
                                            <>
                                                {coupleResults.map(couple => (
                                                    <div className={cx('link')} key={couple._id}>
                                                        <Link className={cx('styleAvatarCoupleLink')}>
                                                            <div className={cx('divContainer')}>
                                                                <span className={cx('avatarContainer')}>
                                                                    <img src={couple.avatarCouple} alt="" />
                                                                </span>
                                                            </div>
                                                        </Link>
                                                        <Link className={cx('styleInforWrapper')}>
                                                            <p className={cx('pTitle')}>
                                                                {couple.userNameCouple}
                                                                {/* usernameofcouple */}
                                                            </p>
                                                            <div className={cx('subTitleWrapper')}>
                                                                <p className={cx('userSubTitle')}>
                                                                    {couple.nameCouple}
                                                                    {/* Name of couple */}
                                                                </p>
                                                                &nbsp;
                                                                •
                                                                &nbsp;
                                                                <strong>
                                                                    {couple.followers.length}&nbsp;
                                                                    <span>Follower</span>
                                                                </strong>
                                                            </div>
                                                            <p className={cx('pDesc')}>
                                                                <strong>
                                                                    {couple.biography}
                                                                    {/* this is biography */}
                                                                </strong>
                                                            </p>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </>
                                        }

                                        {coupleResults.length > 9 &&
                                            <p className={cx('pSeeMore')} onClick={() => handleSeeMore('couple')}>
                                                See more
                                                <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
                                            </p>
                                        }
                                    </>
                                }
                                <div className={cx('titleDivide')}></div>
                            </div>
                            {postStatus &&
                                <>
                                    <div className={cx('blockContainer')}>
                                        <div className={cx('titleContainer')}>
                                            <h2>Diary</h2>
                                        </div>
                                    </div>
                                    <div className={cx('listOfDiary')}>
                                        <div className={cx('grid-image')}>
                                            {postResults.length > 0 ? (
                                                <div>
                                                    {postResults.map((post, index) => {
                                                        if (index % 3 === 0) {
                                                            return (
                                                                <div className={cx('grid-three-images')} key={post._id}>
                                                                    {postResults.map((p, i) => {
                                                                        if (i >= index && i < index + 3) {
                                                                            return (
                                                                                <div className={cx('one-image-in-grid')}>
                                                                                    <Link >
                                                                                        <div className={cx('image')}>
                                                                                            <div className={cx('image-one')}>
                                                                                                <img src={p.images[0]} alt="" />
                                                                                            </div>
                                                                                            <div className={cx('image-two')}></div>
                                                                                        </div>
                                                                                        <div className={cx('overlay-with-like-comment')}>
                                                                                            <ul>
                                                                                                <li>
                                                                                                    <span className={cx('count')}>{p.likes.length}</span>
                                                                                                    <span className={cx('icon')}>
                                                                                                        <FontAwesomeIcon icon={faHeart} />
                                                                                                    </span>
                                                                                                </li>
                                                                                                <li>
                                                                                                    <span className={cx('count')}>{p.comments.length}</span>
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
                                                                                                    <span>
                                                                                                        {p.content}
                                                                                                        {/* this is caption for diary */}
                                                                                                    </span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className={cx('useNameCouple')}>
                                                                                                <Link >
                                                                                                    <div className={cx('userInfo')}>
                                                                                                        <span className={cx('avatarContainer')}>
                                                                                                            <img src={images.login_image} alt="" />
                                                                                                        </span>
                                                                                                        <p>
                                                                                                            {p.couple.userNameCouple}
                                                                                                            {/* usernameofcouple */}
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </Link>
                                                                                                <div className={cx('dateCreate')}>
                                                                                                    {moment(p.createdAt).format('MM-DD')}
                                                                                                    {/* 8-25 */}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        } else {
                                                                            return null;
                                                                        }
                                                                    })}
                                                                </div>
                                                            )
                                                        } else {
                                                            return null;
                                                        }
                                                    })}
                                                </div>
                                            )
                                                : (<div>No post found</div>)
                                            }
                                        </div>
                                        {postResults.length > 9 &&
                                            <p className={cx('pSeeMore')} onClick={() => handleSeeMore('post')}>
                                                See more
                                                <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
                                            </p>
                                        }
                                    </div>
                                </>
                            }
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