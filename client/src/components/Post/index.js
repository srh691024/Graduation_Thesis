import classNames from "classnames/bind";
import styles from "~/components/Post/Post.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart as faHearts, faComment as faComments, faArrowRightToBracket, faLock, faDeleteLeft, faBan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment, faShareFromSquare, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from "react";
import ModalUpdatePost from "../ModalUpdatePost";
import { createPortal } from "react-dom";
import DropDownItem from "../DropDownItem";
import ModalDeletePost from "../ModalDeletePost";
import * as postServices from '~/services/postServices'
import * as notifyServices from '~/services/notifyServices'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Post({ current, post }) {
    const { couple } = useSelector(state => state.couple)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [isLike, setIsLike] = useState(false)
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



    const [showModalUpdatePost, setShowModalUpdatePost] = useState(false);
    const [openOptionPost, setOpenOptionPost] = useState(false);
    const [showModalDeletePost, setShowModalDeletePost] = useState(false);

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
            if (comment.success) {
                Swal.fire('Congratulations', 'Add comment successfully', 'success')
            } else {
                Swal.fire('Oops!', 'Add comment failed', 'error')
            }

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
    })

    // const handleDeleteComment = async(commentId)=>{
    //     const deleteComment = await postServices.apiDeleteComment(post._id, commentId)
    //     console.log(deleteComment.result)
    // }
    return (
        <div className={cx('wrapper')}>
            <article>
                <div className={cx('wrapper-post')}>
                    <div className={cx('avatar-name-date')}>
                        <div className={cx('and')}>
                            <div className={cx('avatar-post')}>
                                <img src={post.couple.avatarCouple} alt='' />
                            </div>
                            <div className={cx('name-date')}>
                                <div className={cx('nd')}>
                                    <div className={cx('nd-first')}>
                                        <div className={cx('name')} >
                                            <div className={cx('name-first')}>
                                                <span>
                                                    <a href="/" >{post.couple.nameCouple}</a>
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
                                        <span>Written by {post.author.name}</span>
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
                    </div>
                    <Slider className={cx('carousel')} {...settings}>
                        {post.images.map((image, index) => (
                            <div className={cx('image')} key={index}>
                                <div className={cx('image-one')}>
                                    <div className={cx('image-two')}>
                                        <div className={cx('image-three')}>
                                            <div className={cx('image-four')}>
                                                <div className={cx('img-one')}>
                                                    <img src={image} alt="" />
                                                </div>
                                                <div className={cx('img-two')}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </Slider>
                    <div className={cx('actions')}>
                        <div className={cx('actions-one')}>
                            <div className={cx('actions-two')}>
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
                                <div className={cx('content-post')}>
                                    <div className={cx('author-content')}>
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
                                <div className={cx('sub-comment')}>
                                    <div className={cx('view-all-comment')}>
                                        <a href="/" >
                                            <span>View all {post.comments.length} comments</span>
                                        </a>
                                    </div>
                                    <ul>
                                        {post.comments.map((comment, index) => (

                                            <div className={cx('comment')} key={index}>
                                                <div className={cx('comment-one')}>
                                                    <div className={cx('comment-two')}>
                                                        <div className={cx('comment-three')}>
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
                                                            <div><FontAwesomeIcon
                                                                //  onClick={handleDeleteComment(comment._id)} 
                                                                icon={faEllipsis} /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </ul>
                                </div>
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

            </article>

        </div>
    );
}

export default Post;