import classNames from "classnames/bind";
import LoginForm from "~/pages/Login/components/LoginForm";
import OtherLogin from "~/pages/Login/components/OtherLogin";
import styles from "~/pages/Login/Login.module.scss";
import images from "~/assets/images";

const cx = classNames.bind(styles);


function Login() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-decoration')}>
                <img className={cx('login-image')} src={images.login_image} alt="Login"></img>
            </div>
            <div className={cx('overlay')}></div>


            <div className={cx('login-features')}>
                <div className={cx('logo')}>
                    <img className={cx('logo')} src={images.logo} alt="Logo"></img>
                </div>
                <LoginForm />
                <div className={cx('forgot-pass')}>
                    <a href="/login">Forgot password?</a>
                </div>
                <div className={cx('or')}>
                    <div className={cx('line')}></div>
                    OR
                    <div className={cx('line')}></div>
                    </div>
                <OtherLogin />
                <div className={cx('register-link')}>
                    <p>Don't have an account?</p>
                    <a href="/register">Sign up</a>
                </div>
            </div>
        </div>
    );
}

export default Login;