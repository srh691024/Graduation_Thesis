import classNames from "classnames/bind";
import styles from '~/layouts/PublicLayout/PublicLayout.module.scss'
import { HeaderPublic, SidebarPublic } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "~/store/user/asyncAction";

const cx = classNames.bind(styles);

function PublicLayout({ children }) {
    const dispatch = useDispatch()
    const { isLoggedIn, current } = useSelector(state => state.user)
    const {couple} = useSelector(state=> state.couple)
    useEffect(()=>{
        if(isLoggedIn) dispatch(getCurrentUser())
    }, [dispatch, isLoggedIn])
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