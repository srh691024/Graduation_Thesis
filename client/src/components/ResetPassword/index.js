import classNames from "classnames/bind";
import styles from '~/components/ResetPassword/ResetPassword.module.scss'
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as authServices from '~/services/authServices';
import Swal from "sweetalert2";
import config from '~/config';


const cx = classNames.bind(styles);

function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const { token } = useParams()
    const handleResetPassword = async () => {
        const response = await authServices.apiResetPassword({ password, token })
        if (response.success) {
            await Swal.fire('Success', response.message, 'success')
            navigate(`${config.routes.login}`)
        } else Swal.fire('Oops!', response.message, 'error');
    }

    return (
        <div>
            <h1 className={cx('reset-password')}>Create new password</h1>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" />
            <button type="submit" onClick={handleResetPassword}>Next</button>
        </div>
    );
}

export default ResetPassword;