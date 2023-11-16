import classNames from "classnames/bind";
import styles from '~/layouts/PublicLayout/PublicLayout.module.scss'
import { HeaderPublic, SidebarPublic } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "~/store/user/asyncAction";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import config from "~/config";

const cx = classNames.bind(styles);

function PublicLayout({ children }) {
    const dispatch = useDispatch()
    const { isLoggedIn, current } = useSelector(state => state.user)
    const { couple } = useSelector(state => state.couple)
    useEffect(() => {
        if (isLoggedIn) dispatch(getCurrentUser())
    }, [dispatch, isLoggedIn])
    if (current.role === '22') {
        return <Navigate to={config.routes.login} />
    }
    if (!couple.isConnected) {
        Swal.fire('Notify', 'You are not connected so cannot go to public social', 'info')
        return <Navigate to={`/diarypost/${couple.userNameCouple}`} />
    }
    return (
        <div className={cx('wrapper')}>
            <HeaderPublic couple={couple} current={current} />
            <div className={cx('container')}>
                <SidebarPublic current={current} />
                {children}
            </div>
        </div>
    );
}

export default PublicLayout;