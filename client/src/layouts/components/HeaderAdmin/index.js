import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import { NotiAdmin } from "~/components";
import styles from '~/layouts/components/HeaderAdmin/HeaderAdmin.module.scss';
import * as notifiServices from '~/services/notifyServices';
import { io } from 'socket.io-client';
import { faBars } from "@fortawesome/free-solid-svg-icons";

const socket = io('http://localhost:5000', {
    reconnection: true,
})

const cx = classNames.bind(styles);

function HeaderAdmin({openNavbarAdmin}) {
    const [openNotification, setOpenNotification] = useState(false);
    const [notiUnRead, setNotiUnRead] = useState(0);
    useEffect(() => {
        async function getNotifies() {
            const noti = await notifiServices.apiGetNotify()
            if (noti.success) {
                setNotiUnRead((noti.result.filter(noti => noti.isRead === false)).length)
            }
        }
        getNotifies()
    }, [])
    useEffect(() => {
        socket.on('notifyPublic', (data) => {
            setNotiUnRead(notiUnRead + 1)
        })
        return () => { socket.off('notifyPublic') }
    }, [notiUnRead])

    const handleMarkAsRead = async () => {
        // Cập nhật số lượng thông báo chưa đọc
        const updatedUnreadCount = notiUnRead > 0 ? notiUnRead - 1 : 0;
        setNotiUnRead(updatedUnreadCount);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <ul className={cx('navContainer')}>
                    <li className={cx('openNavbar')} onClick={openNavbarAdmin}>
                        <FontAwesomeIcon className={cx('iconOpenTaskBar')} icon={faBars}/>
                    </li>
                    <li className={cx('notificationContainer')}
                        onClick={() => { setOpenNotification(!openNotification) }}
                    >
                        <Link className={cx('iconNoti')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faBell} />
                            {notiUnRead > 0 && <span className={cx('num')}>{notiUnRead}</span>}
                        </Link>
                        <div className={cx('titleNoti')}>
                            <span>Notifications</span>
                        </div>
                    </li>
                    <li className={cx('adminContainer')}>
                        <div className={cx('avatarAdminContainer')}>
                            <img src={images.login_image} alt="" />
                        </div>
                    </li>
                </ul>
            </div>
            <NotiAdmin text={openNotification ? 'active' : 'inactive'}
                onMarkAsRead={handleMarkAsRead}
            />
        </div>
    );
}

export default HeaderAdmin;