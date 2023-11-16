import { faArrowRightToBracket, faBan, faDeleteLeft, faEllipsis, faLock, faXmark, faHeart as faHearts, faComment as faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useState } from "react";
import styles from '~/components/ModalDetailPost/ModalDetailPost.module.scss'
import DropDownItem from "../DropDownItem";
import { faComment, faHeart, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import ModalUpdatePost from "../ModalUpdatePost";
import { createPortal } from "react-dom";
import ModalDeletePost from "../ModalDeletePost";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import * as postServices from '~/services/postServices'
import * as notifyServices from '~/services/notifyServices'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import { io } from 'socket.io-client';

const cx = classNames.bind(styles)

const socket = io('http://localhost:5000', {
    reconnection: true,
})

function ModalDetailPost({ current, post, onClose }) {
    const [openOptionPost, setOpenOptionPost] = useState(false);
    const [showModalUpdatePost, setShowModalUpdatePost] = useState(false);
    const [showModalDeletePost, setShowModalDeletePost] = useState(false);
    const { couple } = useSelector(state => state.couple)
    const [isLike, setIsLike] = useState(false)
    const [openDeleteComment, setOpenDeleteComment] = useState(null);

    //Add comment
    const formik = useFormik({
        initialValues: {
            text: ''
        },
        validationSchema: Yup.object({
            text: Yup.string().max(1000, 'Maximum text length is 1000 characters')
        }),
        onSubmit: async (values) => {
            const comment = await postServices.apiAddComment(post._id, values)
            if (!comment.success) {
                Swal.fire('Oops!', 'Add comment failed', 'error')
            } else {
                socket.emit('comment', comment.result.comments)

                formik.setFieldValue('text', '')

                if (comment.result.couple._id.toString() === couple._id.toString()) {
                    let notifyLover = {};
                    if (current._id.toString() === couple.loverUserId.toString()) {
                        notifyLover = {
                            recipients: couple.createdUser,
                            text: '- your lover commented on our diary.',
                            image: post.images[0],
                            type: 'image'
                        }
                    } else if (current._id.toString() === couple.createdUser.toString()) {
                        notifyLover = {
                            recipients: couple.loverUserId,
                            text: '- your lover commented on our diary.',
                            image: post.images[0],
                            type: 'image'
                        }
                    }
                    const notiLover = await notifyServices.apiCreateNotify(notifyLover);
                } else {
                    const notify = {
                        recipients: [comment.result.couple.createdUser, comment.result.couple.loverUserId],
                        text: `from ${couple.nameCouple} commented on your diary.`,
                        image: comment.result.images[0],
                        type: 'image'
                    }
                    async function fetchLike() {
                        const noti = await notifyServices.apiCreateNotify(notify)
                    }
                    fetchLike()
                }
            }
        }
    })

    useEffect(() => {
        if (post.likes.find(like => like === current._id)) {
            setIsLike(true)
        }

    }, [post.likes, current._id])

    const handleLike = async () => {
        setIsLike(true)
        const response = await postServices.apiLikePost(post._id)
        if (response.result.couple._id.toString() === couple._id.toString()) {
            let notifyLover = {};
            if (current._id.toString() === couple.loverUserId.toString()) {
                notifyLover = {
                    recipients: couple.createdUser,
                    text: '- your lover liked your diary.',
                    image: post.images[0],
                    type: 'image'
                }
            } else if (current._id.toString() === couple.createdUser.toString()) {
                notifyLover = {
                    recipients: couple.loverUserId,
                    text: '- your lover liked your diary.',
                    image: post.images[0],
                    type: 'image'
                }
            }
            async function fetchLike() {
                const notiLover = await notifyServices.apiCreateNotify(notifyLover);
            }
            fetchLike()
        } else {
            const notify = {
                recipients: [response.result.couple.createdUser, response.result.couple.loverUserId],
                text: `from ${couple.nameCouple} like your diary.`,
                image: response.result.images[0],
                type: 'image'
            }
            async function fetchLike() {
                const noti = await notifyServices.apiCreateNotify(notify)
            }
            fetchLike()
        }
    }
    const handleUnlike = async () => {
        setIsLike(false)
        await postServices.apiLikePost(post._id)
    }

    const handleDeleteComment = async (commentId) => {
        const deleteComment = await postServices.apiDeleteComment(post._id, commentId)
        setOpenDeleteComment(null)
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the comment area
            if (!event.target.closest(`.${cx('iconOptions')}`)) {
                setOpenDeleteComment(null); // Close the dropdown menu
            }
        };

        // Attach the event listener to the document
        document.addEventListener('click', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={cx('wrapperr')}>
            <div className={cx('wrapper-modal')}>
                <div className={cx('wrapper-one')}>
                    <div className={cx('overlay')}></div>
                    <div className={cx('exit')} onClick={onClose}>
                        <div className={cx('exit-button')}>
                            <div className={cx('exit-button-one')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faXmark} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('contentWrapper')}>
                            <div className={cx('contentOne')}>
                                <div className={cx('contentTwo')}>
                                    <div className={cx('contentThree')}>
                                        <article>
                                            <div className={cx('articleWrapper')}>
                                                <div className={cx('imageWrapper')}>
                                                    <Slider className={cx('carousel')} {...settings}>
                                                        {post?.images.map((image, index) => (
                                                            <div className={cx('image')} key={index}>
                                                                <div className={cx('image-one')}>
                                                                    <div className={cx('image-two')}>
                                                                        <div className={cx('image-three')}>
                                                                            <div className={cx('image-four')}>
                                                                                <div className={cx('img-one')}>
                                                                                    <img src={image} alt="" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </Slider>
                                                </div>
                                                <div className={cx('inforWrapper')}>
                                                    <div className={cx('inforOne')}>
                                                        <div className={cx('and')}>
                                                            <div className={cx('avatar-post')}>
                                                                <img src={post?.couple.avatarCouple} alt='' />
                                                            </div>
                                                            <div className={cx('name-date')}>
                                                                <div className={cx('nd')}>
                                                                    <div className={cx('nd-first')}>
                                                                        <div className={cx('name')} >
                                                                            <div className={cx('name-first')}>
                                                                                <span>
                                                                                    <a href="/" >{post?.couple.nameCouple}</a>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className={cx('date')}>
                                                                            <span>
                                                                                <span className={cx('span-first')}>•</span>
                                                                            </span>
                                                                            <div className={cx('date-first')}>
                                                                                <a href="/">
                                                                                    <span>{moment(post?.createdAt)?.fromNow()}</span>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={cx('nd-second')}>
                                                                        <span>Written by {post?.author?.name}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={cx('action')}
                                                                onClick={() => { setOpenOptionPost(!openOptionPost) }}
                                                            >
                                                                <div className={cx('action-first')}>
                                                                    <div className={cx('action-second')}>
                                                                        <div className={cx('action-third')}>
                                                                            <div className={cx('icon')}>
                                                                                <FontAwesomeIcon className={cx('icon-dot')} icon={faEllipsis} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Dropdown menu */}
                                                                <div className={cx('dropdown-menu', `${openOptionPost ? 'active' : 'inactive'}`)}>
                                                                    <ul >
                                                                        <DropDownItem icon={faBan} text={"Report"} />
                                                                        <DropDownItem icon={faHeart} text={"Follow"} />
                                                                        <DropDownItem icon={faArrowRightToBracket} text={"Go to post"} />
                                                                        <DropDownItem icon={faLock} text={"Set mode"} />
                                                                        <div
                                                                            onClick={() => {
                                                                                setShowModalUpdatePost(true)
                                                                                setOpenOptionPost(false)
                                                                            }}
                                                                        >
                                                                            <DropDownItem icon={faPenToSquare} text={"Update"} />
                                                                        </div>
                                                                        <div onClick={() => {
                                                                            setShowModalDeletePost(true)
                                                                            setOpenOptionPost(false)
                                                                        }}>

                                                                            <DropDownItem icon={faDeleteLeft} text={"Delete"} />

                                                                        </div>
                                                                        <DropDownItem icon={faXmark} text={"Cancel"} />
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            {/* Modal update post */}
                                                            {showModalUpdatePost && createPortal(
                                                                <ModalUpdatePost current={current} data={post} onClose={() => setShowModalUpdatePost(false)} />,
                                                                document.body
                                                            )}
                                                            {/* Modal Delete Post */}
                                                            {showModalDeletePost && createPortal(
                                                                <ModalDeletePost data={post} onClose={() => setShowModalDeletePost(false)} />,
                                                                document.body
                                                            )}
                                                        </div>
                                                        <div className={cx('infoContent')}>
                                                            <div className={cx('contentAndComment')}>
                                                                <ul className={cx('ulWrapper')}>
                                                                    <div className={cx('content-post')}>
                                                                        <div className={cx('author-content')}>
                                                                            <div className={cx('avatarWrapper')}>

                                                                                <div className={cx('avatar-post')}>
                                                                                    <img src={post.author.avatar} alt='' />
                                                                                </div>
                                                                            </div>
                                                                            <div className={cx('wrapperAuthor')}>
                                                                                <div className={cx('author')}>
                                                                                    <div className={cx('author-one')}>
                                                                                        <a href="/" alt="">{post.author.name}</a>
                                                                                    </div>
                                                                                </div>
                                                                                <span>
                                                                                    <span className={cx('content')}>{post.content}</span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {post.comments.map((comment, index) => (

                                                                        <div className={cx('comment')} key={index}>
                                                                            <div className={cx('comment-one')}>
                                                                                <div className={cx('comment-two')}>
                                                                                    <div className={cx('comment-three')}>
                                                                                        <div className={cx('avatarWrapper')}>
                                                                                            <div className={cx('avatar-post')}>
                                                                                                <img src={comment.postedBy.avatar} alt='' />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className={cx('wrapperAuthor')}>
                                                                                            <div className={cx('name')}>
                                                                                                <a href="/">
                                                                                                    <div className={cx('name-one')}>
                                                                                                        <div className={cx('name-two')}>
                                                                                                            <span>{comment.postedBy.name}</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </a>
                                                                                            </div>
                                                                                            <span className={cx('space')}> </span>
                                                                                            <span className={cx('content-comment')}>
                                                                                                <span>{comment.textComment}</span>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {current._id === comment.postedBy._id &&
                                                                                <>
                                                                                    <div className={cx('iconOptions')} onClick={() => setOpenDeleteComment(comment._id)}>
                                                                                        <FontAwesomeIcon icon={faEllipsis} />
                                                                                    </div>

                                                                                    {/* Dropdown menu */}
                                                                                    <div className={cx('dropdown-menu', `${openDeleteComment === comment._id ? 'active' : 'inactive'}`)} onClick={() => handleDeleteComment(comment._id)}>
                                                                                        Delete
                                                                                    </div>
                                                                                </>
                                                                            }
                                                                        </div>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div className={cx('heartComment')}>
                                                                <div className={cx('sub-actions')}>
                                                                    <div className={cx('like-comment-share')}>
                                                                        <span className={cx('like')}>
                                                                            <div className={cx('like-one')}>
                                                                                <div className={cx('like-two')}>
                                                                                    <span>
                                                                                        {isLike ?
                                                                                            <FontAwesomeIcon onClick={handleUnlike} className={cx('icon')} icon={faHearts} />
                                                                                            :
                                                                                            <FontAwesomeIcon onClick={handleLike} className={cx('icon')} icon={faHeart} />
                                                                                        }
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
                                                                    </div>
                                                                    <div className={cx('like-comment-count')}>
                                                                        <span>
                                                                            <div className={cx('lcc-icon')}>
                                                                                <div className={cx('lcc-icon-one')}>
                                                                                    <div className={cx('lcc-count')}>
                                                                                        <span>{post.likes.length}</span>
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
                                                                                        <span>{post.comments.length}</span>
                                                                                    </div>
                                                                                    <div className={cx('icon-count')}>
                                                                                        <FontAwesomeIcon className={cx('icon')} icon={faComments} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={cx('addComment')}>
                                                                <div className={cx('add-comment')}>
                                                                    <div className={cx('section')}>
                                                                        <div className={cx('section-one')}>
                                                                            <form >
                                                                                <div className={cx('section-two')}>
                                                                                    <textarea name='text' value={formik.values.text} onChange={formik.handleChange} placeholder="Add a comment..."></textarea>
                                                                                </div>
                                                                                <button type="submit" onClick={formik.handleSubmit}>Add</button>
                                                                                {
                                                                                    formik.errors.text && formik.touched.text && (
                                                                                        <small className={cx('validate-login')}>{formik.errors.text}</small>
                                                                                    )
                                                                                }
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </article>
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

export default ModalDetailPost;