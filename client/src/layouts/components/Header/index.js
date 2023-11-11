import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faImages, faBell, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faPeopleLine, faBars, faHouse, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Notifications } from '~/components';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { useState, useEffect } from 'react';
import images from "~/assets/images";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '~/store/user/asyncAction';
import { logout, clearMessage } from '~/store/user/userSlice';
import Swal from "sweetalert2";
import { getCurrentCouple } from '~/store/couple/asyncAction';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const cx = classNames.bind(styles)

function Header() {
    const { couple } = useSelector(state => state.couple)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [openNotification, setOpenNotification] = useState(false);
    // const [showModalFeeling, setShowModalFeeling] = useState(false);

    const { isLoggedIn, current, mes } = useSelector(state => state.user);
    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            if (isLoggedIn) dispatch(getCurrentUser());
            dispatch(getCurrentCouple())
        }, 300)
        return () => { clearTimeout(setTimeoutId); }
    }, [dispatch, isLoggedIn]);

    useEffect(() => {
        if (mes) Swal.fire('Oops!', mes, 'info').then(() => {
            dispatch(clearMessage());
            navigate(`${config.routes.login}`);
        })
    }, [dispatch, mes, navigate])
    return (
        <div className={cx('wrapper-header')}>
            <div className={cx('inner')}>
                <div className={cx('inner-first')}>
                    <div className={cx('inner-second')}>
                        <div className={cx('inner-third')}>
                            <div className={cx('logo')}>
                                <div className={cx('logo-first')}>
                                    <div className={cx('logo-second')}>
                                        <span>
                                            <div className={cx('logo-third')}>

                                                <Link to={`/diarypost/${couple.userNameCouple}`}>
                                                    <div className={cx('logo-fourth')}>
                                                        <div className={cx('logo-image')}>
                                                            <div className={cx('logo-image-first')}>
                                                                <div className={cx('logo-image-second')}>
                                                                    <img src={images.logo_no_text} alt="Logo" title='LODI - Love Diary' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>

                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('actions')}>
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <Tippy content='Diary' placement='right'>
                                                    <Link to={`/diarypost/${couple.userNameCouple}`}>
                                                        <div className={cx('sub-third')}>
                                                            <div className={cx('icon')}>
                                                                <div className={cx('icon-first')}>
                                                                    <div className={cx('icon-second')}>
                                                                        <FontAwesomeIcon className={cx('icon-third')} icon={faHouse} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Tippy>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                {/* <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <Link onClick={() => setShowModalFeeling(true)}>
                                                    <div className={cx('sub-third')}>
                                                        <div className={cx('icon')}>
                                                            <div className={cx('icon-first')}>
                                                                <div className={cx('icon-second')}>
                                                                    <FontAwesomeIcon className={cx('icon-third')} icon={faFaceSmile} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                                {showModalFeeling && createPortal(
                                                    <ModalFeeling onClose={() => setShowModalFeeling(false)} />,
                                                    document.body
                                                )}
                                            </div>
                                        </span>
                                    </div>
                                </div> */}
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <Tippy content='Puclic social' placement='right'>
                                                    <Link to={config.routes.homepage}>
                                                        <div className={cx('sub-third')}>
                                                            <div className={cx('icon')}>
                                                                <div className={cx('icon-first')}>
                                                                    <div className={cx('icon-second')}>
                                                                        <FontAwesomeIcon className={cx('icon-third')} icon={faPeopleLine} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Tippy>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>

                                            <div className={cx('sub-second')}>
                                                <Tippy content='Anniversary' placement='right'>

                                                    <Link to={`/anniversary/${couple.userNameCouple}`}>
                                                        <div className={cx('sub-third')}>
                                                            <div className={cx('icon')}>
                                                                <div className={cx('icon-first')}>
                                                                    <div className={cx('icon-second')}>
                                                                        <FontAwesomeIcon className={cx('icon-third')} icon={faCalendarDays} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Tippy>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <Tippy content='Todo' placement='right'>

                                                    <Link to={`/todolist/${couple.userNameCouple}`}>
                                                        <div className={cx('sub-third')}>
                                                            <div className={cx('icon')}>
                                                                <div className={cx('icon-first')}>
                                                                    <div className={cx('icon-second')}>
                                                                        <FontAwesomeIcon className={cx('icon-third')} icon={faSquareCheck} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Tippy>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <Tippy content='Images' placement='right'>

                                                    <Link to={`/imagesdiary/${couple.userNameCouple}`}>
                                                        <div className={cx('sub-third')}>
                                                            <div className={cx('icon')}>
                                                                <div className={cx('icon-first')}>
                                                                    <div className={cx('icon-second')}>
                                                                        <FontAwesomeIcon className={cx('icon-third')} icon={faImages} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Tippy>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('sub-action')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <Tippy content='Notifications' placement='right'>

                                                    <Link onClick={() => { setOpenNotification(!openNotification) }}>
                                                        <div className={cx('sub-third')}>
                                                            <div className={cx('icon')}>
                                                                <div className={cx('icon-first')}>
                                                                    <div className={cx('icon-second')}>
                                                                        <FontAwesomeIcon className={cx('icon-third')} icon={faBell} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Tippy>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                {isLoggedIn && current ?
                                    <>
                                        <div className={cx('sub-action')}>
                                            <div className={cx('sub-first')}>
                                                <span>
                                                    <div className={cx('sub-second')}>
                                                        <Link to={`/diarypost/${couple.userNameCouple}`} >
                                                            <div className={cx('sub-third')}>
                                                                <div className={cx('icon')}>
                                                                    <div className={cx('icon-first')}>
                                                                        <div className={cx('icon-second')}>
                                                                            {/* <FontAwesomeIcon className={cx('icon-third')} icon={faBookBookmark} /> */}
                                                                            <div className={cx('imgAvatar')}>
                                                                                <img className={cx('avatarUser')} src={current.avatar} alt='' />
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx('sub-action')}>
                                            <div className={cx('sub-first')}>
                                                <span>
                                                    <div className={cx('sub-second')}>
                                                        <Tippy content='Logout' placement='right'>

                                                            <Link onClick={() => dispatch(logout())} >
                                                                <div className={cx('sub-third')}>
                                                                    <div className={cx('icon')}>
                                                                        <div className={cx('icon-first')}>
                                                                            <div className={cx('icon-second')}>
                                                                                <FontAwesomeIcon className={cx('icon-third')} icon={faArrowRightFromBracket} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </Tippy>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                    : null
                                }
                            </div>
                            <div className={cx('setting')}>
                                <div className={cx('setting-first')}>
                                    <div className={cx('sub-first')}>
                                        <span>
                                            <div className={cx('sub-second')}>
                                                <Tippy content='Settings' placement='right'>
                                                    <Link to={config.routes.settingEditProfile}>
                                                        <div className={cx('sub-third')}>
                                                            <div className={cx('icon')}>
                                                                <div className={cx('icon-first')}>
                                                                    <div className={cx('icon-second')}>
                                                                        <FontAwesomeIcon className={cx('icon-third')} icon={faBars} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Tippy>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Notifications text={openNotification ? 'active' : 'inactive'} />
                </div>
            </div>
        </div>
    )
}

export default Header;