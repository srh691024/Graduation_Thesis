import classNames from "classnames/bind";
import styles from "~/components/Notifications/Notifications.module.scss"
import images from "~/assets/images";
import { useEffect, useState } from "react";
import * as notifiServices from '~/services/notifyServices'
import { useSelector } from "react-redux";
import moment from "moment";

const cx = classNames.bind(styles);

function Notifications(props) {
    const { current } = useSelector(state => state.user)
    const { couple } = useSelector(state => state.couple)
    const [notiOfCouple, setNotiOfCouple] = useState([]);
    const [generalNoti, setGeneralNoti] = useState([]);

    useEffect(() => {
        async function getNotifies() {
            const noti = await notifiServices.apiGetNotify()
            if (noti.success) {
                if (couple.isConnected) {
                    setNotiOfCouple(noti?.result?.filter(no => no.user._id.toString() === couple?.createdUser?.toString() || no.user._id.toString() === couple?.loverUserId?.toString()))
                    setGeneralNoti(noti?.result?.filter(no => no.user._id.toString() !== couple?.createdUser?.toString() && no.user._id.toString() !== couple?.loverUserId?.toString()))
                }
            }
        }
        getNotifies()
    }, [])

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
                                {notiOfCouple?.map((nc, index) =>
                                    <div className={cx('sub-noti')} key={index}>
                                        <div className={cx('sub-noti-one')}>
                                            <div className={cx('avatar')}>
                                                <a href="/">
                                                    <img src={nc.user.avatar} alt="" />
                                                </a>
                                            </div>
                                            <div className={cx('name-content')}>
                                                <span>
                                                    <a href="/">
                                                        <div className={cx('name')}>
                                                            <div className={cx('name-one')}>
                                                                <span>{nc.user.name}</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    {nc.text}
                                                    {/* &nbsp;- your lover liked our diary.&nbsp; */}
                                                    <span>{moment(nc?.createdAt)?.fromNow()}</span>
                                                </span>
                                            </div>
                                            <div className={cx('follow-or-img')}>
                                                <a href="/">
                                                    <img src={nc.image} alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}

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
                                {generalNoti?.map((gn, index) =>
                                    <div className={cx('sub-noti')} key={index}>
                                        <div className={cx('sub-noti-one')}>
                                            <div className={cx('avatar')}>
                                                <a href="/">
                                                    <img src={gn?.user?.avatar} alt="" />
                                                </a>
                                            </div>
                                            <div className={cx('name-content')}>
                                                <span>
                                                    <a href="/">
                                                        <div className={cx('name')}>
                                                            <div className={cx('name-one')}>
                                                                <span>{gn?.user?.name}</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    &nbsp;{gn?.text}&nbsp;
                                                    {/* &nbsp;liked your diary.&nbsp; */}
                                                    <span>{moment(gn?.createdAt)?.fromNow()}</span>
                                                </span>
                                            </div>
                                            {gn.type === 'image' &&
                                                <div className={cx('follow-or-img')}>
                                                    <a href="/">
                                                        <img src={gn?.image} alt="" />
                                                    </a>
                                                </div>
                                            }
                                            {/* {gn.type === 'follow' &&
                                                <div className={cx('follow-or-img')}>
                                                    <button type="button">
                                                        <div className={cx('letter-button')}>
                                                            <div className={cx('letter-button-one')}>Follow</div>
                                                        </div>
                                                    </button>
                                                </div>
                                            } */}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notifications;