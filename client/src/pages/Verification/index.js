import classNames from "classnames/bind";
import styles from '~/pages/Verification/Verification.module.scss'
import images from '~/assets/images'

const cx = classNames.bind(styles)

function Verification() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('verification-decoration')}>
                <img className={cx('register-image')} src={images.register_image} alt="Verification"></img>
            </div>
            <div className={cx('overlay')}></div>

            <div className={cx('verification-features')}>
                
            </div>
        </div>
    );
}

export default Verification;