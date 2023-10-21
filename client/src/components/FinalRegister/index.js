import { useParams, useNavigate } from "react-router-dom";
import config from "~/config";
import Swal from "sweetalert2";
import { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "~/components/FinalRegister/FinalRegister.scss";

const cx = classNames.bind(styles);

function FinalRegister() {
    const { status } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        
        if (status === 'failed') Swal.fire('Oops!', 'Register failed', 'error').then(() => {
            navigate(`${config.routes.register}`);
        });
        if (status === 'success') Swal.fire('Congratulations!', 'Register successfully. Please log in.', 'success').then(() => {
            navigate(`${config.routes.login}`);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={cx('final-register')}></div>
    );
}

export default FinalRegister;