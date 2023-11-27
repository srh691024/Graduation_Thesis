import classNames from "classnames/bind";
import styles from "~/pages/PrivateCouple/ImageDiary/ImageDiary.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faFilter, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faCommentDots } from "@fortawesome/free-regular-svg-icons";

import { Link, Navigate, useParams } from "react-router-dom";
import { DropDownItem, Loading, ModalDetailPost } from "~/components";
import { useEffect, useState } from "react";
import * as postServices from '~/services/postServices'
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

function ImageDiary() {
    const { usernameCouple } = useParams()
    const [open, setOpen] = useState(false);
    const [postsByCouple, setPostsByCouple] = useState([])
    const [originalPosts, setOriginalPosts] = useState([]);
    const [showModalDetailPost, setShowModalDetailPost] = useState(false)
    const { current } = useSelector(state => state.user)
    const { couple } = useSelector(state => state.couple)
    const [selectedPost, setSelectedPost] = useState({});
    const [loading, setLoading] = useState(false)

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [sortType, setSortType] = useState('date');

    // useEffect(() => {
    //     async function fetchPostByCouple() {
    //         setLoading(true)
    //         const response = await postServices.apiGetPostsByCouple(usernameCouple)
    //         if (response.success) setPostsByCouple(response.result)
    //         setLoading(false)
    //     }
    //     fetchPostByCouple()
    // }, [usernameCouple])

    useEffect(() => {
        async function fetchPostByCouple() {
            setLoading(true);
            const response = await postServices.apiGetPostsByCouple(usernameCouple);
            if (response.success) {
                setOriginalPosts(response.result);
                applyDateFilter(response.result);
            }
            setLoading(false);
        }
        fetchPostByCouple();
    }, [usernameCouple, fromDate, toDate]);

    const applyDateFilter = (posts) => {
        // Áp dụng bộ lọc ngày
        const filteredPosts = posts.filter(post => {
            const postDate = new Date(post.createdAt).getTime();
            const fromTimestamp = fromDate ? new Date(fromDate).getTime() : 0;
            const toTimestamp = toDate ? new Date(toDate).getTime() : Date.now();

            return postDate >= fromTimestamp && postDate <= toTimestamp;
        });

        setPostsByCouple(filteredPosts);
    }

    const applySortFilter = (posts) => {
        let sortedPosts = [...posts];

        switch (sortType) {
            case 'date':
                sortedPosts = sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'heart':
                sortedPosts = sortedPosts.sort((a, b) => b.likes.length - a.likes.length);
                break;
            case 'comment':
                sortedPosts = sortedPosts.sort((a, b) => b.comments.length - a.comments.length);
                break;
            default:
                break;
        }

        setPostsByCouple(sortedPosts);
    }

    const handleClickPost = (post) => {
        setSelectedPost(post);
        setShowModalDetailPost(true)
    }

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
        applyDateFilter(originalPosts);
    }

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
        applyDateFilter(originalPosts);
    }

    const handleApplyFilter = () => {
        applyDateFilter(originalPosts);
    }

    const handleResetFilter = () => {
        setFromDate('');
        setToDate('');
        setPostsByCouple(originalPosts);
    }

    const handleSortFilterChange = (type) => {
        setSortType(type);
        applySortFilter(originalPosts);
    }
    if (couple.userNameCouple !== usernameCouple) {
        Swal.fire('Warning!', 'Can not see this page of other couple', 'warning')
        return <Navigate to={`/diarypost/${couple.userNameCouple}`} />
    }

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
                                        <div onClick={() => handleSortFilterChange('date')}>
                                            <DropDownItem icon={faCalendar} text={"Date"} />
                                        </div>
                                        <div onClick={() => handleSortFilterChange('heart')} >
                                            <DropDownItem icon={faHeart} text={"Heart"} />
                                        </div>
                                        <div onClick={() => handleSortFilterChange('comment')}>
                                            <DropDownItem icon={faCommentDots} text={"Comment"} />
                                        </div>
                                    </ul>
                                </div>

                                {/* Filter by date specific */}
                                <div className={cx('sub-action-date')}>
                                    <div className={cx('from-date')}>
                                        <label htmlFor="startDate">From</label>
                                        <input type="date" id="startDate"
                                            value={fromDate}
                                            onChange={handleFromDateChange}
                                        />
                                    </div>
                                    <div className={cx('to-date')}>
                                        <label htmlFor="endDate">to</label>
                                        <input type="date" id="startDate"
                                            value={toDate}
                                            onChange={handleToDateChange}
                                        />
                                    </div>
                                    {/* <div className={cx('button-apply')} onClick={handleApplyFilter}>
                                        Apply
                                    </div> */}
                                    <div className={cx('button-apply')} onClick={handleResetFilter}>
                                        <span>Reset</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('grid-image')}>
                                {loading ? <Loading />
                                    :
                                    <>
                                        {postsByCouple.length > 0 ? (
                                            <div>
                                                {
                                                    postsByCouple.map((post, index) => {
                                                        if (index % 3 === 0) {
                                                            return (
                                                                <div className={cx('grid-three-images')} key={post._id}>
                                                                    {postsByCouple.map((p, i) => {
                                                                        if (i >= index && i < index + 3) {
                                                                            return (
                                                                                <div key={p._id}>
                                                                                    <div className={cx('one-image-in-grid')} >
                                                                                        <Link onClick={() => handleClickPost(p)}>
                                                                                            <div className={cx('image')}>
                                                                                                <div className={cx('image-one')}>
                                                                                                    <img src={p.images[0]} alt="" />
                                                                                                </div>
                                                                                                <div className={cx('image-two')}></div>
                                                                                            </div>
                                                                                            <div className={cx('overlay-with-like-comment')}>
                                                                                                <ul>
                                                                                                    <li>
                                                                                                        <span className={cx('count')}>{p?.likes?.length}</span>
                                                                                                        <span className={cx('icon')}>
                                                                                                            <FontAwesomeIcon icon={faHeart} />
                                                                                                        </span>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <span className={cx('count')}>{p?.comments?.length}</span>
                                                                                                        <span className={cx('icon')}>
                                                                                                            <FontAwesomeIcon icon={faComment} />
                                                                                                        </span>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        } else {
                                                                            return null;
                                                                        }
                                                                    })}
                                                                </div>
                                                            );
                                                        } else {
                                                            return null;
                                                        }
                                                    })
                                                }
                                            </div>
                                        )
                                            : (<div>No post found</div>)
                                        }
                                    </>
                                }
                            </div>
                            {/* Modal new diary */}
                            {showModalDetailPost && createPortal(
                                <ModalDetailPost current={current} post={selectedPost} onClose={() => setShowModalDetailPost(false)} />,
                                document.body
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageDiary;