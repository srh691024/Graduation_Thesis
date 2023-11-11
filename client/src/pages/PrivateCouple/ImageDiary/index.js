import classNames from "classnames/bind";
import styles from "~/pages/PrivateCouple/ImageDiary/ImageDiary.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faFilter, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faCommentDots } from "@fortawesome/free-regular-svg-icons";

import { Link, Navigate, useParams } from "react-router-dom";
import { DropDownItem, ModalDetailPost } from "~/components";
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
    const [showModalDetailPost, setShowModalDetailPost] = useState(false)
    const { current } = useSelector(state => state.user)
    const { couple } = useSelector(state => state.couple)
    const [selectedPost, setSelectedPost] = useState({});

    useEffect(() => {
        async function fetchPostByCouple() {
            const response = await postServices.apiGetPostsByCouple(usernameCouple)
            if (response.success) setPostsByCouple(response.result)
        }
        fetchPostByCouple()
    }, [usernameCouple])
    const handleClickPost = (post) => {
        setSelectedPost(post);
        setShowModalDetailPost(true)
    }

    if(couple.userNameCouple !== usernameCouple){
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