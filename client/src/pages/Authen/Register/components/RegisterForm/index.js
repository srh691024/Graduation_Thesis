import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import * as authServices from '~/services/authServices';
import config from '~/config';


import classNames from "classnames/bind";
import styles from '~/pages/Authen/Register/components/RegisterForm/RegisterForm.module.scss'


const cx = classNames.bind(styles);

const genders = [
    {
        id: 1,
        name: 'Male',
    },
    {
        id: 2,
        name: 'Female',
    },
    {
        id: 3,
        name: 'Other',
    }
]

function RegisterForm() {
    const navigate = useNavigate();
    const [checked, setChecked] = useState('')
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        name: '',
        username: '',
        phone: '',
        dob: '',
        gender: ''
    })

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const response = await authServices.register(payload);
        if (response.success) {
            Swal.fire('Congratulations', response.message, 'success').then(() => {
                navigate(`${config.routes.login}`)
            })
        } else Swal.fire('Oops!', response.message, 'error');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payload]);
    return (
        <div className={cx('wrapper')}>
            <form className={cx('register-form')}>
                <div className={cx('input-box')}>
                    <input
                        type="text"
                        placeholder="Email*"
                        value={payload.email}
                        onChange={e => setPayload(prev => ({ ...prev, email: e.target.value }))}
                        required />
                </div>
                <div className={cx('input-box')}>
                    <input
                        type="text"
                        placeholder="Full Name (optional)"
                        value={payload.name}
                        onChange={e => setPayload(prev => ({ ...prev, name: e.target.value }))}
                    />
                </div>
                <div className={cx('input-box')}>
                    <input
                        type="text"
                        placeholder="Username (optional)"
                        value={payload.username}
                        onChange={e => setPayload(prev => ({ ...prev, username: e.target.value }))}
                    />
                </div>
                <div className={cx('input-box')}>
                    <input
                        type="password"
                        placeholder="Password*"
                        value={payload.password}
                        onChange={e => setPayload(prev => ({ ...prev, password: e.target.value }))}
                        required />
                </div>
                <div className={cx('input-box')}>
                    <input
                        type="number"
                        placeholder="Phone (optional)"
                        value={payload.phone}
                        onChange={e => setPayload(prev => ({ ...prev, phone: e.target.value }))}
                    />
                </div>
                <div className={cx('input-box')}>
                    <input
                        type="date"
                        value={payload.dob}
                        onChange={e => setPayload(prev => ({ ...prev, dob: e.target.value }))} />
                </div>

                <p className={cx('gender-p')}>Gender</p>
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
                </div>
                <button type="submit" className={cx('btn-register')} onClick={e => { handleSubmit(e) }}>Sign Up</button>
            </form>
        </div>
    );
}

export default RegisterForm;