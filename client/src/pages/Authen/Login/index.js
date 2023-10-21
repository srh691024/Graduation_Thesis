import classNames from "classnames/bind";
import LoginForm from "~/pages/Authen/Login/components/LoginForm";
import OtherLogin from "~/pages/Authen/Login/components/OtherLogin";
import styles from "~/pages/Authen/Login/Login.module.scss";
import images from "~/assets/images";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";
import * as authServices from '~/services/authServices';
import Swal from "sweetalert2";

const cx = classNames.bind(styles);
Modal.setAppElement('#root');

function Login() {
    const [email, setEmail] = useState('');
    const handleForgotPassword = async () => {
        const response = await authServices.apiForgotPassword({ email });
        if (response.success) {
            Swal.fire('Success', response.message, 'success');
        } else Swal.fire('Oops!', response.message, 'error');
    }
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-decoration')}>
                {/* <img className={cx('login-image')} src={images.register_image} alt="Login"/> */}
            </div>
            <div className={cx('overlay')}></div>


            <div className={cx('login-features')}>
                <div className={cx('logo')}>
                    <img className={cx('logo')} src={images.logo} alt="Logo"></img>
                </div>
                <LoginForm />
                <div className={cx('forgot-pass')}>
                    <button onClick={openModal}><p>Forgot password?</p></button>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                >
                    <h1 className={cx('forgot-pass-modal')}>Forgot password?</h1>
                    <p>We will send you a link to help you retrieve your password via email. Please fill in your email:</p>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
                    <button type="submit" onClick={handleForgotPassword}>Send</button>
                    <button type="submit" onClick={closeModal}>Cancel</button>
                </Modal>
                <div className={cx('or')}>
                    <div className={cx('line')}></div>
                    OR
                    <div className={cx('line')}></div>
                </div>
                <OtherLogin />
                <div className={cx('register-link')}>
                    <p>Don't have an account?</p>
                    <Link to={'/register'}>Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;