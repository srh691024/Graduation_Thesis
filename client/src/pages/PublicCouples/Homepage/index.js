import classNames from "classnames/bind";
import { Post } from "~/components";
import styles from '~/pages/PublicCouples/Homepage/Homepage.module.scss'

const cx = classNames.bind(styles);

function Homepage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('oneColumnContainer')}>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                {/* do loadmore function in here */}
            </div>
            <div className={cx('bottomContainer')}></div>
        </div>
    );
}

export default Homepage;