import classNames from "classnames/bind";
import styles from "~/layouts/components/IntroCouple/IntroCouple.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCakeCandles, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTiktok, faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import * as coupleServices from '../../../services/coupleServices'
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from '~/store/user/asyncAction';
import moment from "moment";
import { createPortal } from "react-dom";
import { ModalEditInfoCouple } from "~/components";
import config from "~/config";

const cx = classNames.bind(styles);

function IntroCouple() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { usernameCouple } = useParams()
    const { isLoggedIn, current } = useSelector(state => state.user);
    const [infoCreatedUser, setInfoCreatedUser] = useState({})
    const [infoCouple, setInfoCouple] = useState({});
    const [infoLoverUser, setInfoLoverUser] = useState({})
    const [showModalEditInfoCouple, setShowModalEditInfoCouple] = useState(false);

    useEffect(() => {
        const setTimeoutId = setTimeout(() => {
            if (isLoggedIn) dispatch(getCurrentUser());

        }, 300)
        return () => { clearTimeout(setTimeoutId); }
    }, [dispatch, isLoggedIn]);

    useEffect(() => {
        async function fetchCouple() {
            // setTimeout(async () => {
            const couple = await coupleServices.apiGetCouple(usernameCouple)
            if (couple.success) setInfoCouple(couple.result)
            const createdUser = await coupleServices.apiGetCreatedUserByCouple(couple.result.createdUser)
            if (createdUser.success) setInfoCreatedUser(createdUser.result)
            const loverUser = await coupleServices.apiGetLoverUserByCouple(couple.result.loverUserId)
            if (loverUser.success) setInfoLoverUser(loverUser.result)
            // }, 100)
        }
        fetchCouple()
    }, [usernameCouple])

    const handleClickEditLoverUser = () => {
        if (isLoggedIn && current._id === infoLoverUser._id) {
            navigate(config.routes.settingEditProfile)
        } else if (isLoggedIn && infoCouple.isConnected === false) {
            
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('intro')}>
                    <div className={cx('intro-couple')}>
                        <div className={cx('intro-cp')}>
                            <div className={cx('text-intro-couple')}>
                                <h2>Introduction</h2>
                            </div>
                            <div className={cx('info-intro-couple')}>
                                <div className={cx('image-couple')}>
                                    <div className={cx('avatar-couple')}>
                                        <img src={infoCouple.avatarCouple} alt='' />
                                    </div>
                                    <div className={cx('name-couple')}>
                                        <h3>
                                            {infoCouple.nameCouple}
                                        </h3>
                                    </div>
                                </div>
                                <div className={cx('biography-couple')}>
                                    <span>
                                        {/* “Love means you never have to say you’re sorry” */}
                                        {infoCouple.biography}
                                    </span>
                                </div>
                                <div className={cx('love-date-couple')}>
                                    <div className={cx('heart-couple')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faHeart} />
                                        <span className={cx('text-on-icon')}>
                                            {moment(infoCouple?.startLoveDate)?.fromNow(true)}
                                        </span>
                                    </div>
                                    <div className={cx('love-date')}>
                                        <span>from &nbsp;
                                            {moment(infoCouple?.startLoveDate)?.format('DD/MM/YYYY')}
                                        </span>
                                    </div>
                                </div>

                                <div className={cx('follow-couple')}>
                                    <div className={cx('following')}>
                                        <span> 900 followings</span>
                                    </div>
                                    <div className={cx('follower')}>
                                        <span>
                                            {infoCouple.followers}
                                            follwers</span>
                                    </div>
                                    <div className={cx('like')}>
                                        <span>
                                            {infoCouple.totalLikes}
                                            likes</span>
                                    </div>
                                </div>
                            </div>
                            {isLoggedIn ?
                                <><div className={cx('edit-info-couple')}>
                                    <button onClick={() => setShowModalEditInfoCouple(true)}><span>Edit our profile</span></button>
                                </div>
                                    {/* Modal new diary */}
                                    {showModalEditInfoCouple && createPortal(
                                        <ModalEditInfoCouple infoCouple={infoCouple} current={current} onClose={() => setShowModalEditInfoCouple(false)} />,
                                        document.body
                                    )}
                                </>
                                : null
                            }
                        </div>
                    </div>
                    <div className={cx('intro-partner')}>
                        <div className={cx('intro-p')}>
                            <div className={cx('partner')}>
                                <div className={cx('image-partner')}>
                                    <div className={cx('avatar-partner')}>
                                        <img src={infoCreatedUser.avatar} alt="" />
                                    </div>
                                    <div className={cx('name-partner')}>
                                        <h3>{infoCreatedUser.name}</h3>
                                    </div>
                                </div>
                                <div className={cx('dob-partner')}>
                                    <FontAwesomeIcon className={cx('sub-icon')} icon={faCakeCandles} />
                                    <div className={cx('dob')}>
                                        <span>{infoCreatedUser.dob ? moment(infoCreatedUser.dob).format('dddd, MMMM DD yyyy') : 'Null'}</span>
                                    </div>
                                </div>
                                <div className={cx('horoscope-partner')}>
                                    <div className={cx('horoscope-symbol')}>
                                        <img src={images.leo} alt="" />
                                    </div>
                                    <div className={cx('horoscope-name')}>
                                        <span>{infoCreatedUser.horoscope ? infoCreatedUser.horoscope : null}</span>
                                    </div>
                                </div>
                                <div className={cx('address')}>
                                    <FontAwesomeIcon className={cx('sub-icon')} icon={faLocationDot} />
                                    <div className={cx('address-title')}>
                                        <span>{infoCreatedUser.address ? infoCreatedUser.address : null}</span>
                                    </div>
                                </div>
                                <div className={cx('tiktok')}>
                                    <FontAwesomeIcon className={cx('sub-icon')} icon={faTiktok} />
                                    <div className={cx('link-tiktok')}>
                                        <a href="https://www.tiktok.com/@sea2208" target="blank" >{infoCreatedUser.tiktokLink ? infoCreatedUser.tiktokLink : null}</a>
                                    </div>
                                </div>
                                <div className={cx('facebook')}>
                                    <FontAwesomeIcon className={cx('sub-icon')} icon={faFacebookF} />
                                    <div className={cx('link-facebook')}>
                                        <a href="https://www.facebook.com/sea2208/" target="blank" >{infoCreatedUser.facebookLink ? infoCreatedUser.facebookLink : null}</a>
                                    </div>
                                </div>
                                <div className={cx('instagram')}>
                                    <FontAwesomeIcon className={cx('sub-icon')} icon={faInstagram} />
                                    <div className={cx('link-instagram')}>
                                        <a href="https://www.instagram.com/gnoud.nouz/" target="blank" >{infoCreatedUser.instagramLink ? infoCreatedUser.instagramLink : null}</a>
                                    </div>
                                </div>
                                {isLoggedIn
                                    && current._id === infoCreatedUser._id
                                    ?
                                    <div className={cx('edit-info-partner')}>
                                        <button>
                                            <span>Edit your information</span>
                                        </button>
                                    </div> : null
                                }
                            </div>
                            <div className={cx('partner')}>
                                <div className={cx('image-partner')}>
                                    <div className={cx('avatar-partner')}>
                                        <img src={infoLoverUser.avatar ? infoLoverUser.avatar : infoCouple.tempAvatarLover} alt="" />
                                    </div>
                                    <div className={cx('name-partner')}>
                                        <h3>{infoLoverUser.name ? infoLoverUser.name : infoCouple.tempNameLover}</h3>
                                    </div>
                                </div>
                                <div className={cx('dob-partner')}>
                                    <FontAwesomeIcon className={cx('sub-icon')} icon={faCakeCandles} />
                                    <div className={cx('dob')}>
                                        <span>{infoLoverUser.dob ? infoLoverUser.dob : infoCouple.tempDobLover}</span>
                                    </div>
                                </div>
                                <div className={cx('horoscope-partner')}>
                                    <div className={cx('horoscope-symbol')}>
                                        <img src={images.virgo} alt="" />
                                    </div>
                                    <div className={cx('horoscope-name')}>
                                        <span>{infoLoverUser.horoscope ? infoLoverUser.horoscope : infoCouple.tempHoroscope}</span>
                                    </div>
                                </div>
                                {
                                    infoLoverUser ?
                                        <>
                                            <div className={cx('address')}>
                                                <FontAwesomeIcon className={cx('sub-icon')} icon={faLocationDot} />
                                                <div className={cx('address-title')}>
                                                    <span>{infoLoverUser.address}</span>
                                                </div>
                                            </div>
                                            <div className={cx('tiktok')}>
                                                <FontAwesomeIcon className={cx('sub-icon')} icon={faTiktok} />
                                                <div className={cx('link-tiktok')}>
                                                    <a href="https://www.tiktok.com/@sea2208" target="blank">{infoLoverUser.tiktokLink}</a>
                                                </div>
                                            </div>
                                            <div className={cx('facebook')}>
                                                <FontAwesomeIcon className={cx('sub-icon')} icon={faFacebookF} />
                                                <div className={cx('link-facebook')}>
                                                    <a href="https://www.facebook.com/sea2208/" target="blank" >{infoLoverUser.facebookLink}</a>
                                                </div>
                                            </div>
                                            <div className={cx('instagram')}>
                                                <FontAwesomeIcon className={cx('sub-icon')} icon={faInstagram} />
                                                <div className={cx('link-instagram')}>
                                                    <a href="https://www.instagram.com/gnoud.nouz/" target="blank">{infoLoverUser.instagramLink}</a>
                                                </div>
                                            </div>
                                        </>
                                        : null
                                }

                                {/* Button edit information of loverUser when couple connected */}
                                {isLoggedIn
                                    && current._id === infoLoverUser._id
                                    ?
                                    <div className={cx('edit-info-partner')}>
                                        <button onClick={handleClickEditLoverUser}>
                                            <span>Edit your information</span>
                                        </button>
                                    </div> : null
                                }

                                {/* Button edit information of temp lover user when couple not connected */}
                                {isLoggedIn && infoCouple.isConnected === 'false' ?
                                    <div className={cx('edit-info-partner')}>
                                        <button onClick={handleClickEditLoverUser}>
                                            <span>Edit your lover information</span>
                                        </button>
                                    </div> : null
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntroCouple;