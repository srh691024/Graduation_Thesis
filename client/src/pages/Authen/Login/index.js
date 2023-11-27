import classNames from "classnames/bind";
import LoginForm from "~/pages/Authen/Login/components/LoginForm";
import styles from "~/pages/Authen/Login/Login.module.scss";
import images from "~/assets/images";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ModalForgotPassword } from "~/components";
import config from "~/config";

const cx = classNames.bind(styles);
Modal.setAppElement('#root');

function Login() {
    const [showModalForgotPassword, setShowModalForgotPassword] = useState(false)
    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('login-decoration')}>
            </div> */}
            <div className={cx('overlay')}></div>
            <div className={cx('login-features')}>
                <div className={cx('logo')}>
                    <img className={cx('logo')} src={images.logo} alt="Logo"></img>
                </div>
                <LoginForm />
                <div className={cx('forgot-pass')}>
                    <button onClick={() => setShowModalForgotPassword(true)}>
                        <p>Forgot password?</p>
                    </button>
                </div>

                {/* Modal forgot password */}
                {showModalForgotPassword && createPortal(
                    <ModalForgotPassword onClose={() => setShowModalForgotPassword(false)} />,
                    document.body
                )}

                <div className={cx('or')}>
                    <div className={cx('line')}></div>
                    OR
                    <div className={cx('line')}></div>
                </div>
                {/* <OtherLogin /> */}
                <div className={cx('register-link')}>
                    <p>Don't have an account?</p>
                    <Link to={config.routes.register}>Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;