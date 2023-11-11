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
    const navigate = useNavigate();
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
                .matches(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email')
                .required('Email is required'),
            password: Yup.string()
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/, 'Password must contain at least 1 digit, 1 lowercase letter, 1 uppercase letter, and be at least 6 characters long')
                .required('Password is required'),
            username: Yup.string()
                .max(24, 'Username must be at most 24 characters'),
            name: Yup.string()
                .max(30, 'Name must be at most 30 characters'),
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
                        required />
                </div>
                <div className={cx('small')}>
                    {
                        formik.errors.password && formik.touched.password && (
                            <small className={cx('validate-login')}>{formik.errors.password}</small>
                        )
                    }
                </div>
                <div className={cx('input-box')}>
                    <input
                        name="name"
                        type="text"
                        placeholder="Full Name (optional)"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                </div>
                {
                    formik.errors.name && formik.touched.name && (
                        <small className={cx('validate-login')}>{formik.errors.name}</small>
                    )
                }
                <div className={cx('input-box')}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username (optional)"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                </div>
                {
                    formik.errors.username && formik.touched.username && (
                        <small className={cx('validate-login')}>{formik.errors.username}</small>
                    )
                }

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