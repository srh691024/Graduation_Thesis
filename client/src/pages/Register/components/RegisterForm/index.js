import classNames from "classnames/bind";
import styles from '~/pages/Register/components/RegisterForm/RegisterForm.module.scss'
import { useState} from "react";

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
    const [checked, setChecked] = useState('')

    const handleSubmit = () => {
        
        console.log({nameGender: checked})
    }
    return (
        <div className={cx('wrapper')}>
            <form className={cx('register-form')}>
                <div className={cx('input-box')}>
                    <input type="text" placeholder="Email" required />
                </div>
                <div className={cx('input-box')}>
                    <input type="text" placeholder="Full Name" required />
                </div>
                <div className={cx('input-box')}>
                    <input type="text" placeholder="Username" required />
                </div>
                <div className={cx('input-box')}>
                    <input type="password" placeholder="Password" required />
                </div>
                <div className={cx('input-box')}>
                    <input type="number" placeholder="Phone" required />
                </div>
                <div className={cx('input-box')}>
                    <input type="date" required />
                </div>

                <p className={cx('gender-p')}>Gender</p>
                <div className={cx('gender')}>
                    {genders.map(gender => (
                        <div className={cx('sub-gender')} key={gender.id}>
                            {gender.name}
                            <input type="radio"
                                checked={gender.name === checked}
                                onChange={() => setChecked(gender.name)}
                                required />
                        </div>
                    ))}
                </div>
                <button type="submit" className={cx('btn-register')} onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    );
}

export default RegisterForm;