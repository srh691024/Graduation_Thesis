import classNames from "classnames/bind";
import styles from '~/pages/Register/components/OtherRegister/OtherRegister.module.scss'
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles)

function OtherRegister() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('other-register-link')}>
                <a href="/register">
                    <FontAwesomeIcon className={cx('icon-other-register')} icon={faGoogle} />
                    <p>Sign up with Google</p>
                </a>
            </div>
            <div className={cx('other-register-link')}>
                <a href="/register">
                    <FontAwesomeIcon className={cx('icon-other-register')} icon={faFacebookF} />
                    <p>Sign up with Facebook</p>
                </a>
            </div>
        </div>
    );
}

export default OtherRegister;