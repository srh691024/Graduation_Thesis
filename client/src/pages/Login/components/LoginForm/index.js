import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "~/pages/Login/components/LoginForm/LoginForm.module.scss";
const cx = classNames.bind(styles);

function LoginForm() {
    return (
        <div className={cx("wrapper")}>
            <form className={cx("login-form")}>
                <div className={cx('input-box')}>
                    <input type="text" placeholder="Email" required />
                    <FontAwesomeIcon className={cx('icon-login')} icon={faUser} />
                </div>
                <div className={cx('input-box')}>
                    <input type="password" placeholder="Password" required />
                    <FontAwesomeIcon className={cx('icon-login')} icon={faKey} />
                </div>
                <button type="submit" className={cx('btn-login')}>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;