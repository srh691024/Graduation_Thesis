import classNames from "classnames/bind";
import styles from '~/pages/Register/Register.module.scss'
import images from '~/assets/images'
import RegisterForm from "~/pages/Register/components/RegisterForm";
import OtherRegister from "~/pages/Register/components/OtherRegister";

const cx = classNames.bind(styles)

function Register() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('register-decoration')}>
                <img className={cx('register-image')} src={images.register_image} alt="Register"></img>
            </div>
            <div className={cx('overlay')}></div>


            <div className={cx('register-features')}>
                <div className={cx('logo')}>
                    <img className={cx('logo')} src={images.logo} alt="Logo"></img>
                </div>
                <RegisterForm />
                <div className={cx('or')}>
                    <div className={cx('line')}></div>
                    OR
                    <div className={cx('line')}></div>
                    </div>
                <OtherRegister />
                <div className={cx('register-link')}>
                    <p>Have an account?</p>
                    <a href="/login">Login</a>
                </div>
            </div>
        </div>
    )
}

export default Register;