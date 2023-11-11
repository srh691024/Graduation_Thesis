import classNames from 'classnames/bind';
import styles from "~/layouts/components/Themes/Themes.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as coupleServices from '../../../services/coupleServices'

const cx = classNames.bind(styles)

function Themes() {
    const { usernameCouple } = useParams()
    const [infoCreatedUser, setInfoCreatedUser] = useState({})
    const [infoCouple, setInfoCouple] = useState({});
    const [infoLoverUser, setInfoLoverUser] = useState({})

    useEffect(() => {
        async function fetchCouple() {
            const couple = await coupleServices.apiGetCouple(usernameCouple)
            if (couple.success) {
                setInfoCouple(couple.result)
                const createdUser = await coupleServices.apiGetCreatedUserByCouple(couple.result.createdUser)
                if (createdUser.success) setInfoCreatedUser(createdUser.result)
                if (couple.result.loverUserId) {
                    const loverUser = await coupleServices.apiGetLoverUserByCouple(couple.result.loverUserId)
                    if (loverUser.success) setInfoLoverUser(loverUser.result)
                } else {
                    setInfoLoverUser({})
                }
            }
        }
        fetchCouple()
    }, [usernameCouple])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('themes')}>
                    <div className={cx('themes-image')}>
                        <div className={cx('image')}>
                            <div className={cx('image-first')}>
                                <div className={cx('image-second')}>
                                    <img src={images.login_image} alt="Logo" />
                                </div>
                                <div className={cx('edit-themes')}>
                                    <div className={cx('camera-icon')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faCamera} />
                                    </div>
                                    <div className={cx('title')}>
                                        <span>Edit themes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('avatar-couple')}>
                <div className={cx('partner-name')}>
                    <p>{infoCreatedUser.name}</p>
                </div>
                <div className={cx('avatar-partner')}>
                    <img className={cx('circle-image')} src={infoCreatedUser.avatar} alt='' />
                </div>
                <div className={cx('heart')}>
                    <img src={images.heart1} alt='' />
                    {/* <div className={cx('rate')}>
                        <span>50%</span>
                    </div> */}
                </div>
                <div className={cx('heart')}>
                    <img src={images.heart2} alt='' />
                    {/* <div className={cx('rate')}>
                        <span>50%</span>
                    </div> */}
                </div>
                <div className={cx('avatar-partner')}>
                    {infoLoverUser.avatar ?
                        <img className={cx('circle-image')} src={infoLoverUser.avatar} alt='' />
                        :
                        infoCouple.tempAvatarLover ?
                            <img src={infoCouple.tempAvatarLover} alt='' />
                            : <img src={images.noUser} alt='' />
                    }
                </div>
                <div className={cx('partner-name')}>
                    <p>{infoLoverUser.name ? infoLoverUser.name : infoCouple.tempNameLover}</p>
                </div>
            </div>
        </div>
    )
}

export default Themes;