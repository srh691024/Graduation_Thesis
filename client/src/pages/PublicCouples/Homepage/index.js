import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Post } from "~/components";
import styles from '~/pages/PublicCouples/Homepage/Homepage.module.scss'
import * as postServices from '~/services/postServices'

const cx = classNames.bind(styles);

function Homepage() {
    const { current } = useSelector(state => state.user)
    const [allPostPublic, setAllPostPublic] = useState([])
    useEffect(() => {
        async function fetchAllPostPublic() {
            const allPost = await postServices.apiGetAllPostsPublic()
            if (allPost.success) {
                setAllPostPublic(allPost.result)
            }
        }
        fetchAllPostPublic()
    }, [])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('oneColumnContainer')}>
                {allPostPublic.length > 0 ?
                    allPostPublic?.map((post, index) => 
                        <div key={index}>
                        
                        <Post current={current} post={post} />
                        </div>
                    ) :
                    <div>No post is shared public</div>}
                {/* <Post />
                <Post />
                <Post />
                <Post /> */}
                {/* do loadmore function in here */}
            </div>
            <div className={cx('bottomContainer')}></div>
        </div>
    );
}

export default Homepage;