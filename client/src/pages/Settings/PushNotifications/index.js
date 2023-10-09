import classNames from "classnames/bind";
import styles from "~/pages/Settings/PushNotifications/PushNotifications.module.scss"

const cx = classNames.bind(styles);

function PushNotifications() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-one')}>
                <div className={cx('header-edit-profile')}>
                    <div className={cx('header-edit-profile-one')}>
                        <div className={cx('header-edit-profile-two')}>
                            <span>Push notifications</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('content-one')}>
                        <div className={cx('content-two')}>
                            <div className={cx('content-three')}>
                                <div className={cx('content-four')}>
                                    <div className={cx('content-five')}>
                                        <div className={cx('push-noti')}>
                                            <span>
                                                Push notifications
                                            </span>
                                        </div>
                                        <div className={cx('push-noti')}>
                                            <div className={cx('push-noti-one')}>
                                                <span>Pause all</span>
                                            </div>
                                            <div className={cx('push-noti-two')}>
                                                <div className={cx('button-pause')}>
                                                    <div className={cx('button-pause-one')}>
                                                        <input type="checkbox" className={cx('pause-input')} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('push-noti')}>
                                            <span>
                                                Optional
                                            </span>
                                        </div>
                                        <div className={cx('list-sub-noti')}>
                                            <div className={cx('list-sub-noti-one')}>
                                                <div className={cx('letter-sub-noti')}>Like</div>
                                                <div className={cx('push-noti-two')}>
                                                    <div className={cx('button-pause')}>
                                                        <div className={cx('button-pause-one')}>
                                                            <input type="checkbox" className={cx('pause-input')} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('list-sub-noti-one')}>
                                                <div className={cx('letter-sub-noti')}>Comment</div>
                                                <div className={cx('push-noti-two')}>
                                                    <div className={cx('button-pause')}>
                                                        <div className={cx('button-pause-one')}>
                                                            <input type="checkbox" className={cx('pause-input')} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('list-sub-noti-one')}>
                                                <div className={cx('letter-sub-noti')}>New followers</div>
                                                <div className={cx('push-noti-two')}>
                                                    <div className={cx('button-pause')}>
                                                        <div className={cx('button-pause-one')}>
                                                            <input type="checkbox" className={cx('pause-input')} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default PushNotifications;