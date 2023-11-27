import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import config from "~/config";
import styles from '~/layouts/components/HeaderPublic/HeaderPublic.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState } from "react";
import * as coupleServices from '~/services/coupleServices';
import { io } from 'socket.io-client';
import { NotiPublic } from "~/components";
import * as notifiServices from '~/services/notifyServices';

const socket = io('http://localhost:5000', {
    reconnection: true,
})

const cx = classNames.bind(styles);

function HeaderPublic({ couple, current }) {
    const [showResult, setShowResult] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
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
        socket.on('notifyCouple', (data) => {
            if (data.notification.recipients[0] === current._id) {
                setNotiUnRead(notiUnRead + 1)
            }
        })
        return () => { socket.off('notifyCouple') }
    }, [notiUnRead, current._id])
    useEffect(() => {
        socket.on('notifyPublic', (data) => {
            if (data.notification.user._id.toString() !== couple?.createdUser?.toString() && data.notification.user._id.toString() !== couple?.loverUserId?.toString()) {
                setNotiUnRead(notiUnRead + 1)
            }
        })
        return () => { socket.off('notifyPublic') }
    }, [notiUnRead, couple?.createdUser, couple?.loverUserId])

    const handleMarkAsRead = async () => {
        // Cập nhật số lượng thông báo chưa đọc
        const updatedUnreadCount = notiUnRead > 0 ? notiUnRead - 1 : 0;
        setNotiUnRead(updatedUnreadCount);
    };

    useEffect(() => {
        async function searchCouple() {
            if (searchValue) {
                const response = await coupleServices.apiSearchCouple(searchValue)
                if (response.success) setSearchResult(response.result)
            } else {
                setSearchResult([])
            }
        }
        searchCouple();
    }, [searchValue])

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    const handleClear = () => {
        setSearchValue('')
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <div className={cx('header-left-container')}>
                    <Link to={config.routes.homepage} className={cx('styleLinkLogo')}>
                        <img src={images.logo} alt="logo" />
                    </Link>
                </div>
                <div className={cx('header-center-container')}>
                    <HeadlessTippy
                        interactive
                        visible={showResult && searchResult.length > 0}
                        render={(attrs) => (
                            <div className={cx('searchResult')} tabIndex='-1' {...attrs}>
                                <div className={cx('searchWrapper')}>
                                    <h4 className={cx('searchTitle')}>Couples</h4>
                                    {searchResult.map((result) => (
                                        <Link key={result._id} to={`/diarypost/${result.userNameCouple}`}>
                                            <div className={cx('styleUserAvatar')}>
                                                <span className={cx('styleAvatar')}>
                                                    <img src={result.avatarCouple} alt="" />
                                                </span>
                                            </div>
                                            <div className={cx('info')}>
                                                <h4 className={cx('name')}>
                                                    <span>{result.userNameCouple}</span>
                                                </h4>
                                                <span className={cx('username')}>{result.nameCouple}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        onClickOutside={handleHideResult}
                    >
                        <div className={cx('searchFormContainer')}>
                            <form className={cx('formElement')}>
                                <input
                                    className={cx('inputElement')}
                                    type="search"
                                    placeholder="Search"
                                    value={searchValue}
                                    onChange={handleChange}
                                    onFocus={() => setShowResult(true)} />
                                <span className={cx('spanSpliter')}></span>
                                <Link to={`/search?keyword=${searchValue}`} onClick={() => handleClear()}>
                                    <button className={cx('buttonSearch')}
                                    >
                                        <div className={cx('searchIconContainer')}>
                                            <FontAwesomeIcon className={cx('iconSearch')} icon={faMagnifyingGlass} />
                                        </div>
                                    </button>
                                </Link>
                            </form>
                        </div>
                    </HeadlessTippy>
                </div>
                <div className={cx('header-right-container')}>
                    <div className={cx('notification')} onClick={() => { setOpenNotification(!openNotification) }}>
                        <FontAwesomeIcon className={cx('styleNoti')} icon={faBell} />
                        {notiUnRead > 0 && <span className={cx('num')}>{notiUnRead}</span>}
                    </div>
                    <div className={cx('profile')}>
                        <Link to={`/diarypost/${couple.userNameCouple}`}>
                            <img src={couple?.avatarCouple} alt="" />
                        </Link>
                    </div>
                    <div className={cx('profile')}>
                        <Link to={`/diarypost/${couple.userNameCouple}`}>
                            <img src={current?.avatar} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
            <NotiPublic text={openNotification ? 'active' : 'inactive'} onMarkAsRead={handleMarkAsRead} />
        </div>
    );
}

export default HeaderPublic;