import classNames from "classnames/bind";
import styles from "~/components/Notifications/Notifications.module.scss"
import images from "~/assets/images";

const cx = classNames.bind(styles);

function Notifications(props) {
    return (
        <div className={cx('wrapper-noti', props.text)}>
            <div className={cx('noti')}>
                <div className={cx('noti-one')}>
                    <div className={cx('noti-two')}>
                        <div className={cx('noti-three')}>
                            <div className={cx('header-noti')}>
                                <div className={cx('header-noti-one')}>
                                    <span>
                                        Notifications
                                    </span>
                                </div>
                            </div>
                            <div className={cx('couple-noti')}>
                                <div className={cx('line')}>
                                    <hr />
                                </div>
                                <div className={cx('header-noti-couple')}>
                                    <span>
                                        Couple
                                    </span>
                                </div>
                                <div className={cx('sub-noti')}>
                                    <div className={cx('sub-noti-one')}>
                                        <div className={cx('avatar')}>
                                            <a href="/">
                                                <img src={images.login_image} alt="" />
                                            </a>
                                        </div>
                                        <div className={cx('name-content')}>
                                            <span>
                                                <a href="/">
                                                    <div className={cx('name')}>
                                                        <div className={cx('name-one')}>
                                                            <span>Thuy Duong</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                &nbsp;- your lover liked our diary.&nbsp;
                                                <span>4d</span>
                                            </span>
                                        </div>
                                        <div className={cx('follow-or-img')}>
                                            <a href="/">
                                                <img src={images.login_image} alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('sub-noti')}>
                                    <div className={cx('sub-noti-one')}>
                                        <div className={cx('avatar')}>
                                            <a href="/">
                                                <img src={images.login_image} alt="" />
                                            </a>
                                        </div>
                                        <div className={cx('name-content')}>
                                            <span>
                                                <a href="/">
                                                    <div className={cx('name')}>
                                                        <div className={cx('name-one')}>
                                                            <span>Thuy Duong</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                &nbsp;- your lover commented on our diary.&nbsp;
                                                <span>15m</span>
                                            </span>
                                        </div>
                                        <div className={cx('follow-or-img')}>
                                            <a href="/">
                                                <img src={images.login_image} alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('couple-noti')}>
                            <div className={cx('line')}>
                                    <hr />
                                </div>
                                <div className={cx('header-noti-couple')}>
                                    <span>
                                        Public social
                                    </span>
                                </div>
                                <div className={cx('sub-noti')}>
                                    <div className={cx('sub-noti-one')}>
                                        <div className={cx('avatar')}>
                                            <a href="/">
                                                <img src={images.login_image} alt="" />
                                            </a>
                                        </div>
                                        <div className={cx('name-content')}>
                                            <span>
                                                <a href="/">
                                                    <div className={cx('name')}>
                                                        <div className={cx('name-one')}>
                                                            <span>Thuy Duong</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                &nbsp;liked your diary.&nbsp;
                                                <span>4d</span>
                                            </span>
                                        </div>
                                        <div className={cx('follow-or-img')}>
                                            <a href="/">
                                                <img src={images.login_image} alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('sub-noti')}>
                                    <div className={cx('sub-noti-one')}>
                                        <div className={cx('avatar')}>
                                            <a href="/">
                                                <img src={images.login_image} alt="" />
                                            </a>
                                        </div>
                                        <div className={cx('name-content')}>
                                            <span>
                                                <a href="/">
                                                    <div className={cx('name')}>
                                                        <div className={cx('name-one')}>
                                                            <span>Thuy Ha</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                &nbsp;from&nbsp;
                                                <a href="/">
                                                    <div className={cx('name')}>
                                                        <div className={cx('name-one')}>
                                                            <span>TD&SN</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                &nbsp;couple has been following your couple.&nbsp;
                                                <span>4d</span>
                                            </span>
                                        </div>
                                        <div className={cx('follow-or-img')}>
                                            <button type="button">
                                                <div className={cx('letter-button')}>
                                                    <div className={cx('letter-button-one')}>Follow</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('sub-noti')}>
                                    <div className={cx('sub-noti-one')}>
                                        <div className={cx('avatar')}>
                                            <a href="/">
                                                <img src={images.login_image} alt="" />
                                            </a>
                                        </div>
                                        <div className={cx('name-content')}>
                                            <span>
                                                <a href="/">
                                                    <div className={cx('name')}>
                                                        <div className={cx('name-one')}>
                                                            <span>Thuy Ha</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                &nbsp;from&nbsp;
                                                <a href="/">
                                                    <div className={cx('name')}>
                                                        <div className={cx('name-one')}>
                                                            <span>TD&SN</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                &nbsp;couple has been following your couple.&nbsp;
                                                <span>4d</span>
                                            </span>
                                        </div>
                                        <div className={cx('follow-or-img')}>
                                            <button type="button">
                                                <div className={cx('letter-button')}>
                                                    <div className={cx('letter-button-one')}>Follow</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('sub-noti')}>
                                    <div className={cx('sub-noti-one')}>
                                        <div className={cx('avatar')}>
                                            <a href="/">
                                                <img src={images.login_image} alt="" />
                                            </a>
                                        </div>
                                        <div className={cx('name-content')}>
                                            <span>
                                                <a href="/">
                                                    <div className={cx('name')}>
                                                        <div className={cx('name-one')}>
                                                            <span>Thuy Ha</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                &nbsp;from&nbsp;
                                                <a href="/">
                                                    <div className={cx('name')}>
                                                        <div className={cx('name-one')}>
                                                            <span>TD&SN</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                &nbsp;couple has been following your couple.&nbsp;
                                                <span>4d</span>
                                            </span>
                                        </div>
                                        <div className={cx('follow-or-img')}>
                                            <button type="button">
                                                <div className={cx('letter-button')}>
                                                    <div className={cx('letter-button-one')}>Follow</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('sub-noti')}>
                                    <div className={cx('sub-noti-one')}>
                                        <div className={cx('avatar')}>
                                            <a href="/">
                                                <img src={images.login_image} alt="" />
                                            </a>
                                        </div>
                                        <div className={cx('name-content')}>
                                            <span>
                                                <a href="/">
                                                    <div className={cx('name')}>
                                                        <div className={cx('name-one')}>
                                                            <span>Thuy Ha</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                &nbsp;from&nbsp;
                                                <a href="/">
                                                    <div className={cx('name')}>
                                                        <div className={cx('name-one')}>
                                                            <span>TD&SN</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                &nbsp;couple has been following your couple.&nbsp;
                                                <span>4d</span>
                                            </span>
                                        </div>
                                        <div className={cx('follow-or-img')}>
                                            <button type="button">
                                                <div className={cx('letter-button')}>
                                                    <div className={cx('letter-button-one')}>Follow</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('sub-noti')}>
                                    <div className={cx('sub-noti-one')}>
                                        <div className={cx('avatar')}>
                                            <a href="/">
                                                <img src={images.login_image} alt="" />
                                            </a>
                                        </div>
                                        <div className={cx('name-content')}>
                                            <span>
                                                <a href="/">
                                                    <div className={cx('name')}>
                                                        <div className={cx('name-one')}>
                                                            <span>Thuy Duong</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                &nbsp;liked your diary.&nbsp;
                                                <span>4d</span>
                                            </span>
                                        </div>
                                        <div className={cx('follow-or-img')}>
                                            <a href="/">
                                                <img src={images.login_image} alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('sub-noti')}>
                                    <div className={cx('sub-noti-one')}>
                                        <div className={cx('avatar')}>
                                            <a href="/">
                                                <img src={images.login_image} alt="" />
                                            </a>
                                        </div>
                                        <div className={cx('name-content')}>
                                            <span>
                                                <a href="/">
                                                    <div className={cx('name')}>
                                                        <div className={cx('name-one')}>
                                                            <span>Thuy Duong</span>
                                                        </div>
                                                    </div>
                                                </a>
                                                &nbsp;liked your diary.&nbsp;
                                                <span>4d</span>
                                            </span>
                                        </div>
                                        <div className={cx('follow-or-img')}>
                                            <a href="/">
                                                <img src={images.login_image} alt=""/>
                                            </a>
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

export default Notifications;