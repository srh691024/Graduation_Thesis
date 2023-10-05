import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import classNames from "classnames/bind";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "~/pages/Authen/Login/components/LoginForm/LoginForm.module.scss";

import * as authServices from '~/services/authServices';
import config from "~/config";
import { regiser } from "~/store/user/userSlice"

const cx = classNames.bind(styles);

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const response = await authServices.login(payload);
        if (response.success) {
            dispatch(regiser({ isLoggedIn: true, token: response.accessToken, userData: response.userData }));
            navigate(`${config.routes.diarypost}`)
        } else Swal.fire('Oops!', response.message, 'error');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payload]);
    return (
        <div className={cx("wrapper")}>
            <form className={cx("login-form")}>
                <div className={cx('input-box')}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={payload.email}
                        onChange={e => setPayload(prev => ({ ...prev, email: e.target.value }))}
                        required />
                    <FontAwesomeIcon className={cx('icon-login')} icon={faUser} />
                </div>
                <small className={cx('validate-login')}>Require</small>
                <div className={cx('input-box')}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={payload.password}
                        onChange={e => setPayload(prev => ({ ...prev, password: e.target.value }))}
                        required />
                    <FontAwesomeIcon className={cx('icon-login')} icon={faKey} />
                </div>
                <small className={cx('validate-login')}>Require</small>
                <button type="submit" className={cx('btn-login')} onClick={e => { handleSubmit(e) }}>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;