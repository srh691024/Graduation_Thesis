import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "~/pages/Authen/Login/components/OtherLogin/OtherLogin.module.scss";

const cx = classNames.bind(styles);

function OtherLogin() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('other-login-link')}>
                <a href="/login">
                    <FontAwesomeIcon className={cx('icon-other-login')} icon={faGoogle} />
                    <p>Log in with Google</p>
                </a>
            </div>
            <div className={cx('other-login-link')}>
                <a href="/login">
                    <FontAwesomeIcon className={cx('icon-other-login')} icon={faFacebookF} />
                    <p>Log in with Facebook</p>
                </a>
            </div>
        </div>
    );
}

export default OtherLogin;