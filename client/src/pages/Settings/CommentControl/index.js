import classNames from "classnames/bind";
import styles from "~/pages/Settings/CommentControl/CommentControl.module.scss"

const cx = classNames.bind(styles);

function CommentControl() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-one')}>
                <div className={cx('header-edit-profile')}>
                    <div className={cx('header-edit-profile-one')}>
                        <div className={cx('header-edit-profile-two')}>
                            <span>Hidden Words</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('offensive-word')}>
                        <span>Offensive words and phrases</span>
                    </div>
                    <div className={cx('sub-description')}>
                        <span className={cx('sub-des')}>Protect yourself from comments
                            that contain offensive words, phrases.</span>
                    </div>
                    <div className={cx('title')}>
                        <span>Hide comments</span>
                        <div className={cx('push-noti-two')}>
                            <div className={cx('button-pause')}>
                                <div className={cx('button-pause-one')}>
                                    <input type="checkbox" className={cx('pause-input')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-description')}>
                        <span className={cx('sub-des')}>Comments that may be offensive
                            will automatically be hidden in a separate section of your diary posts.</span>
                    </div>
                    <div className={cx('title')}>
                        <span>Advanced comment filtering</span>
                        <div className={cx('push-noti-two')}>
                            <div className={cx('button-pause')}>
                                <div className={cx('button-pause-one')}>
                                    <input type="checkbox" className={cx('pause-input')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-description')}>
                        <span className={cx('sub-des')}>Additional comments that may contain offensive words
                            and phrases will be hidden. You can always review and unhide individual comments.</span>
                    </div>
                </div>
                <div className={cx('header-edit-profile')}>
                    <div className={cx('header-edit-profile-one')}>
                        <div className={cx('header-edit-profile-two')}>
                            <span>Comment filtering</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('offensive-word')}>
                        <span>Keyword filters</span>
                    </div>
                    <div className={cx('title')}>
                        <span>Hide comments that contain any of the words or phrases you type above from your posts.</span>
                    </div>
                    <form>
                        <textarea placeholder="Add keywords, separated by commas"></textarea>
                        <div className={cx('button-submit')}>
                        <div className={cx('button-submit-one')}>Submit</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CommentControl;