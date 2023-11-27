import classNames from "classnames/bind";
import { Loading, ModalNewDiary, Post } from "~/components";
import styles from "~/pages/PrivateCouple/DiaryPost/DiaryPost.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import * as postServices from '~/services/postServices'
import * as coupleServices from '~/services/coupleServices'
import moment from "moment";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
    reconnection: true,
})

const cx = classNames.bind(styles);

function DiaryPost() {
    const { usernameCouple } = useParams()
    const [postsByCouple, setPostsByCouple] = useState([])
    const [showModalNewDiary, setShowModalNewDiary] = useState(false);
    const { isLoggedIn, current } = useSelector(state => state.user)
    const { couple } = useSelector(state => state.couple)
    const [infoCouple, setInfoCouple] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchCouple() {
            const response = await coupleServices.apiGetCouple(usernameCouple)
            if (response.success) setInfoCouple(response.result)

        }
        fetchCouple()
    }, [usernameCouple])

    useEffect(() => {
        async function fetchPostByCouple() {
            setLoading(true)
            const response = await postServices.apiGetPostsByCouple(usernameCouple)
            if (response.success) setPostsByCouple(response.result)
            setLoading(false)
        }
        fetchPostByCouple()
    }, [usernameCouple])

    useEffect(() => {
        socket.on('new-comment', (data) => {
            setPostsByCouple((prevPosts) => {
                const updatedPosts = prevPosts.map((post) => {
                    if (post._id === data.postId) {
                        post = data.comment
                    }
                    return post
                })
                return updatedPosts
            })
        })
        // return () => { socket.off('new-comment') }
    }, [])

    useEffect(() => {
        socket.on('like', (data) => {
            console.log(data)
            setPostsByCouple((prevPosts) => {
                const updatedPosts = prevPosts.map((post) => {
                    if (post._id === data.postId) {
                        post = data.like
                    }
                    return post
                })
                return updatedPosts
            })
        })
        // return () => { socket.off('like') }
    }, [])

    // useEffect(() => {
    //     if (infoCouple.isHidden) {
    //         Swal.fire('Oops!', 'Something went wrong. Can not access this page');
    //         console.log(3)
    //         navigate(`/diarypost/${couple.userNameCouple}`);
    //     }
    //     if (!isLoggedIn && !infoCouple.isConnected) {
    //         console.log(2)
    //         navigate(config.routes.login);
    //     }
    //     if (!couple.isConnected && couple.userNameCouple !== usernameCouple) {
    //         Swal.fire('Notify', 'You are not connected so can not use this feature', 'info')
    //         navigate(`/diarypost/${couple.userNameCouple}`)
    //     }
    // }, [isLoggedIn, infoCouple, navigate, couple, usernameCouple]);



    return (
        <div className={cx('container')}>
            {isLoggedIn && couple.userNameCouple === infoCouple.userNameCouple ?
                <div className={cx('new-diary')}>
                    <div className={cx('new-diary-sub')}>
                        <div className={cx('new-diary-flex')}>
                            <div className={cx('content')}>
                                <div className={cx('avatar-new-diary')}>
                                    <img src={current.avatar} alt="" />
                                </div>
                                <div className={cx('content-new-diary')} onClick={() => setShowModalNewDiary(true)}>
                                    <div className={cx('title')}>
                                        <span>Are there any memories today?</span>
                                    </div>
                                    <div className={cx('overlay')} ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
            {/* Modal new diary */}
            {showModalNewDiary && createPortal(
                <ModalNewDiary current={current} onClose={() => setShowModalNewDiary(false)} />,
                document.body
            )}

            {/* Show list diary */}
            <div className={cx('diary-post')}>
                <div className={cx('diary-post-sub')}>
                    <div className={cx('sub')}>
                        <div className={cx('diary-first')}>
                            {loading ? <Loading />
                                :
                                <>
                                    {postsByCouple.length > 0 ?
                                        postsByCouple.map((post, index) => (
                                            <div className={cx('diary')} key={index}>
                                                <Post current={current} post={post} />
                                                <div className={cx('date-diary-post')}>
                                                    <div className={cx('date-nd-heart')}>
                                                        <div className={cx('date')}>
                                                            <span>
                                                                {moment(post?.dateAnni)?.format('DD-MM-YYYY')}
                                                                {/* 20/10/2021 */}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('heart-line')}>
                                                        <div className={cx('heart')}>
                                                            <FontAwesomeIcon className={cx('heart-one')} icon={faHeart} />
                                                        </div>
                                                        <div className={cx('line')}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        : <><div>No posts found</div></>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiaryPost;