import classNames from "classnames/bind";
import styles from '~/pages/Authen/Register/Register.module.scss'
import images from '~/assets/images'
import RegisterForm from "~/pages/Authen/Register/components/RegisterForm";
// import OtherRegister from "~/pages/Authen/Register/components/OtherRegister";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function Register() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('register-decoration')}>
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
                {/* <OtherRegister /> */}
                <div className={cx('register-link')}>
                    <p>Have an account?</p>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;