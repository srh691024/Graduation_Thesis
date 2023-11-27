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

function FollowPostCouple() {
    const { current } = useSelector(state => state.user)
    const [loading, setLoading] = useState(false);
    const [followingPosts, setFollowingPosts] = useState([])

    useEffect(() => {
        async function fetchFollowingPosts() {
            setLoading(true);
            const response = await postServices.apiFollowingPost()
            setFollowingPosts(response.result)
            setLoading(false);
        }
        fetchFollowingPosts();
    }, [])
    
    useEffect(() => {
        socket.on('new-comment', (data) => {
            console.log(data)
            setFollowingPosts((prevPosts) => {
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
            setFollowingPosts((prevPosts) => {
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
                        {followingPosts.length > 0 ?
                            followingPosts?.map((post, index) =>
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

export default FollowPostCouple;