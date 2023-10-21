// import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import * as authServices from '~/services/authServices';
import config from '~/config';


import classNames from "classnames/bind";
import styles from '~/pages/Authen/Register/components/RegisterForm/RegisterForm.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';


const cx = classNames.bind(styles);

// const genders = [
//     {
//         id: 1,
//         name: 'Male',
//     },
//     {
//         id: 2,
//         name: 'Female',
//     },
//     {
//         id: 3,
//         name: 'Other',
//     }
// ]

function RegisterForm() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            username: '',
            // phone: '',
            // dob: '',
            // gender: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email format')
                .matches(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Pass word must be at least 6 characters.')
                .required('Password is required')
        }),
        onSubmit: (async (values) => {
            const response = await authServices.apiRegister(values);
            if (response.success) {
                await Swal.fire('Congratulations', response.message, 'success')
                // .then(() => {
                navigate(`${config.routes.login}`)
                // })
            } else Swal.fire('Oops!', response.message, 'error');
        })
    })
    const navigate = useNavigate();
    // const [checked, setChecked] = useState('')
    // const [payload, setPayload] = useState({
    //     email: '',
    //     password: '',
    //     name: '',
    //     username: '',
    //     phone: '',
    //     dob: '',
    //     gender: ''
    // })



    // const handleSubmit = useCallback(async (e) => {
    //     e.preventDefault();
    //     const response = await authServices.register(payload);
    //     if (response.success) {
    //         await Swal.fire('Congratulations', response.message, 'success')
    //         // .then(() => {
    //         navigate(`${config.routes.login}`)
    //         // })
    //     } else Swal.fire('Oops!', response.message, 'error');
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [payload]);
    return (
        <div className={cx('wrapper')}>
            <form className={cx('register-form')}>
                <div className={cx('input-box')}>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email*"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        // value={payload.email}
                        // onChange={e => setPayload(prev => ({ ...prev, email: e.target.value }))}
                        required />
                </div>
                {
                    formik.errors.email && formik.touched.email && (
                        <small className={cx('validate-login')}>{formik.errors.email}</small>
                    )
                }
                <div className={cx('input-box')}>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password*"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        // value={payload.password}
                        // onChange={e => setPayload(prev => ({ ...prev, password: e.target.value }))}
                        required />
                </div>
                {
                    formik.errors.password && formik.touched.password && (
                        <small className={cx('validate-login')}>{formik.errors.password}</small>
                    )
                }
                <div className={cx('input-box')}>
                    <input
                        type="text"
                        placeholder="Full Name (optional)"
                    // value={payload.name}
                    // onChange={e => setPayload(prev => ({ ...prev, name: e.target.value }))}
                    />
                </div>
                <div className={cx('input-box')}>
                    <input
                        type="text"
                        placeholder="Username (optional)"
                    // value={payload.username}
                    // onChange={e => setPayload(prev => ({ ...prev, username: e.target.value }))}
                    />
                </div>

                {/* <div className={cx('input-box')}>
                    <input
                        type="number"
                        placeholder="Phone (optional)"
                    value={payload.phone}
                    onChange={e => setPayload(prev => ({ ...prev, phone: e.target.value }))}
                    />
                </div> */}
                {/* <div className={cx('input-box')}>
                    <input
                        type="date"
                    value={payload.dob}
                    onChange={e => setPayload(prev => ({ ...prev, dob: e.target.value }))} 
                    />
                </div> */}

                {/* <p className={cx('gender-p')}>Gender</p>
                <div className={cx('gender')}>
                    {genders.map(gender => (
                        <div className={cx('sub-gender')} key={gender.id}>
                            {gender.name}
                            <input type="radio"
                                checked={gender.name === checked}
                                value={payload.gender}
                                onChange={() => {
                                    setChecked(gender.name);
                                    setPayload(prev => ({ ...prev, gender: gender.name }))
                                }} />
                        </div>
                    ))}
                </div> */}
                <button type="submit" className={cx('btn-register')}
                    onClick={formik.handleSubmit}
                // onClick={e => { handleSubmit(e) }}
                >Sign Up</button>
            </form>
        </div>
    );
}

export default RegisterForm;