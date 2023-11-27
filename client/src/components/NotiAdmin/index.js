import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from '~/components/NotiAdmin/NotiAdmin.module.scss'
import * as notifiServices from '~/services/notifyServices';
import { io } from 'socket.io-client';
import { useSelector } from "react-redux";
import moment from "moment";

const socket = io('http://localhost:5000', {
    reconnection: true,
})

const cx = classNames.bind(styles)

function NotiAdmin(props) {
    const [generalNoti, setGeneralNoti] = useState([]);
    const { current } = useSelector(state => state.user)
    useEffect(() => {
        async function getNotifies() {
            const noti = await notifiServices.apiGetNotify()
            if (noti.success) setGeneralNoti(noti.result)
        }
        getNotifies()
    }, [])

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
                                {generalNoti?.map((gn, index) =>
                                    <div
                                        className={cx('sub-noti',
                                            `${!gn.isRead && 'changeBackground'}`
                                        )}
                                        key={index}
                                        onClick={() => handleNotificationClick(gn)}
                                    >
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

                                                    <span>{moment(gn?.createdAt)?.fromNow()}</span>
                                                </span>
                                            </div>
                                            {gn.type === 'image' && gn.image &&
                                                <div className={cx('follow-or-img')}>
                                                    <a href="/">
                                                        <img src={gn?.image} alt="" />
                                                    </a>
                                                </div>
                                            }
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

export default NotiAdmin;