import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from '~/components/NotiPublic/NotiPublic.module.scss';
import * as notifiServices from '~/services/notifyServices';
import { io } from 'socket.io-client';
import moment from "moment";
import images from "~/assets/images";

const socket = io('http://localhost:5000', {
    reconnection: true,
})

const cx = classNames.bind(styles)

function NotiPublic(props) {
    const { couple } = useSelector(state => state.couple)
    const { current } = useSelector(state => state.user)
    const [notiOfCouple, setNotiOfCouple] = useState([]);
    const [generalNoti, setGeneralNoti] = useState([]);

    useEffect(() => {
        async function getNotifies() {
            const noti = await notifiServices.apiGetNotify()
            if (noti.success) {
                // if (couple.isConnected) {
                setNotiOfCouple(noti?.result?.filter(no => no.user._id.toString() === couple?.createdUser?.toString() || no.user._id.toString() === couple?.loverUserId?.toString()))
                setGeneralNoti(noti?.result?.filter(no => no.user._id.toString() !== couple?.createdUser?.toString() && no.user._id.toString() !== couple?.loverUserId?.toString()))
                // }
            }
        }
        getNotifies()
    }, [couple?.createdUser, couple.isConnected, couple?.loverUserId])

    useEffect(() => {
        socket.on('notifyCouple', (data) => {
            if (data.notification?.recipients[0] === current._id) {
                setNotiOfCouple([data.notification, ...notiOfCouple])
            }
        })
        return () => { socket.off('notifyCouple') }
    }, [notiOfCouple, current._id])

    useEffect(() => {
        socket.on('notifyPublic', (data) => {
            data.notification.recipients.map((recipient) => {
                if (recipient === current._id) {
                    setGeneralNoti([data.notification, ...generalNoti])
                }
                return recipient;
            }
            )
        })
        return () => { socket.off('notifyPublic') }
    }, [generalNoti, current._id])

    const handleNotificationClick = async (notification) => {
        // Đánh dấu thông báo là đã đọc
        if (!notification.isRead) {
            // Gọi API hoặc sử dụng hàm cập nhật trạng thái đã đọc
            await notifiServices.apiIsReadNotify(notification._id);

            // Cập nhật trạng thái trong state để render lại component
            setNotiOfCouple((prevNoti) =>
                prevNoti.map((nc) =>
                    nc._id === notification._id ? { ...nc, isRead: true } : nc
                )
            );
            setGeneralNoti((prevNoti) =>
                prevNoti.map((gn) =>
                    gn._id === notification._id ? { ...gn, isRead: true } : gn
                )
            );
            props.onMarkAsRead();
        }
    };
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
                                    <div
                                        className={cx('sub-noti', `${!nc.isRead && 'changeBackground'}`)}
                                        key={index}
                                        onClick={() => handleNotificationClick(nc)}
                                    >
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
                                    <div
                                        className={cx('sub-noti', `${!gn.isRead && 'changeBackground'}`)}
                                        key={index}
                                        onClick={() => handleNotificationClick(gn)}
                                    >
                                        <div className={cx('sub-noti-one')}>
                                            <div className={cx('avatar')}>
                                                <a href="/">
                                                    {gn?.user?.role === '22' ?
                                                        <img src={images.noUser} alt="" />
                                                        :
                                                        <img src={gn?.user?.avatar} alt="" />
                                                    }
                                                </a>
                                            </div>
                                            <div className={cx('name-content')}>
                                                <span>
                                                    <a href="/">
                                                        <div className={cx('name')}>
                                                            <div className={cx('name-one')}>
                                                                {gn?.user?.role === '22' ?
                                                                    <span>Administrator</span>
                                                                    :
                                                                    <span>{gn?.user?.name}</span>
                                                                }
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

export default NotiPublic;