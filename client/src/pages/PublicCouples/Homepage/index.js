import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loading, Post } from "~/components";
import styles from '~/pages/PublicCouples/Homepage/Homepage.module.scss'
import * as postServices from '~/services/postServices'
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
    reconnection: true,
})

const cx = classNames.bind(styles);

function Homepage() {
    const { current } = useSelector(state => state.user)
    const [allPostPublic, setAllPostPublic] = useState([])
    const [loading, setLoading] = useState(false);
    const [followingPosts, setFollowingPosts] = useState([])
    const [checkPublic, setCheckPublic] = useState(true)

    useEffect(() => {
        async function fetchFollowingPosts() {
            const response = await postServices.apiFollowingPost()
            setFollowingPosts(response.result)
        }
        fetchFollowingPosts();
    }, [])
    useEffect(() => {
        async function fetchAllPostPublic() {
            setLoading(true);
            const allPost = await postServices.apiGetAllPostsPublic()
            if (allPost.success) setAllPostPublic(allPost.result)
            setLoading(false);
        }
        fetchAllPostPublic()
    }, [])

    useEffect(() => {
        socket.on('new-comment', (data) => {
            console.log(data)
            setAllPostPublic((prevPosts) => {
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
            setAllPostPublic((prevPosts) => {
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


    return (
        <div className={cx('wrapper')}>
            <div className={cx('oneColumnContainer')}>
                {loading ? <Loading /> :
                    <>
                        {allPostPublic.length > 0 ?
                            allPostPublic?.map((post, index) =>
                                <div key={index}>

                                    <Post current={current} post={post} />
                                </div>
                            ) :
                            <div>No post is shared public</div>
                        }
                    </>
                }
                {/* do loadmore function in here */}
            </div>
            <div className={cx('bottomContainer')}></div>
        </div>
    );
}

export default Homepage;