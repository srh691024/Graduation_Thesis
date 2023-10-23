// import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import classNames from "classnames/bind";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "~/pages/Authen/Login/components/LoginForm/LoginForm.module.scss";

import * as authServices from '~/services/authServices';
import * as coupleServices from '~/services/coupleServices';
import config from "~/config";
import { login } from "~/store/user/userSlice"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from "react";
import { infoCouple } from "~/store/couple/coupleSlice";

const cx = classNames.bind(styles);

function LoginForm() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email format')
                .matches(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email')
                .required('Email is required'),
            password: Yup.string()
                // .min(6, 'Must contain at least one number and one uppercase and lowercase letter, and at least 6 characters.')
                .required('Password is required')
        }),
        onSubmit: async (values) => {
            // e.preventDefault();
            const response = await authServices.apiLogin(values);
            if (response.success) {
                dispatch(login({
                    isLoggedIn: true, token: response.accessToken, userData: response.userData
                }));
                setTimeout(async () => {
                    const currentUserCouple = await coupleServices.apiGetCoupleByCurrentUser();
                    if (currentUserCouple.success) {
                        const usernameCouple = currentUserCouple.result.userNameCouple
                        dispatch(infoCouple({ couple: currentUserCouple.result }))
                            navigate(`/diarypost/${usernameCouple}`)
                    }
                    else { Swal.fire('Oops!', currentUserCouple.result, 'error') }
                }, 100)

            } else Swal.fire('Oops!', response.message, 'error');
        }
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [payload, setPayload] = useState({
    //     email: '',
    //     password: ''
    // })


    // const handleSubmit = useCallback(async (e) => {
    //     e.preventDefault();
    //     const response = await authServices.login(payload);
    //     if (response.success) {
    //         dispatch(regiser({ isLoggedIn: true, token: response.accessToken, userData: response.userData }));
    //         navigate(`${config.routes.diarypost}`)
    //     } else Swal.fire('Oops!', response.message, 'error');
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [payload]);
    return (
        <div className={cx("wrapper")}>
            <form className={cx("login-form")}>
                <div className={cx('inputWrapper')}>
                    <div className={cx('input-box')}>
                        <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={formik.values.email}
                            // onChange={e => setPayload(prev => ({ ...prev, email: e.target.value }))}
                            onChange={formik.handleChange}
                            required />
                        <FontAwesomeIcon className={cx('icon-login')} icon={faUser} />
                    </div>
                    {
                        formik.errors.email && formik.touched.email && (
                            <small className={cx('validate-login')}>{formik.errors.email}</small>
                        )
                    }
                </div>

                <div className={cx('inputWrapper')}>
                    <div className={cx('input-box')}>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            // onChange={e => setPayload(prev => ({ ...prev, password: e.target.value }))}
                            required />
                        <FontAwesomeIcon className={cx('icon-login')} icon={faKey} />
                    </div>
                    {
                        formik.errors.password && formik.touched.password && (
                            <small className={cx('validate-login')}>{formik.errors.password}</small>
                        )
                    }
                </div>
                <button type="submit" className={cx('btn-login')}
                    // onClick={e => { handleSubmit(e) }}
                    onClick={formik.handleSubmit}
                >Login</button>
            </form>
        </div>
    );
}

export default LoginForm;