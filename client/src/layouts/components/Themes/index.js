import classNames from 'classnames/bind';
import styles from "~/layouts/components/Themes/Themes.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

function Themes() {
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
                    <p>Name Partner 1</p>
                </div>
                <div className={cx('avatar-partner')}>
                    <img className={cx('circle-image')} src={images.login_image} alt='' />
                </div>
                <div className={cx('heart')}>
                    <img src={images.heart1} alt='' />
                    <div className={cx('rate')}>
                        <span>50%</span>
                    </div>
                </div>
                <div className={cx('heart')}>
                    <img src={images.heart2} alt='' />
                    <div className={cx('rate')}>
                        <span>50%</span>
                    </div>
                </div>
                <div className={cx('avatar-partner')}>
                    <img className={cx('circle-image')} src={images.login_image} alt='' />
                </div>
                <div className={cx('partner-name')}>
                    <p>Name Partner 2</p>
                </div>
            </div>
        </div>
    )
}

export default Themes;