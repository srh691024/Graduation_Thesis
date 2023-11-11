import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import styles from '~/pages/Settings/RequestConnection/RequestConnection.module.scss'
import * as coupleServices from '~/services/coupleServices'
import { logout } from "~/store/user/userSlice";

const cx = classNames.bind(styles)

function RequestConnection() {
    const dispatch = useDispatch()
    const [requestConnectionList, setRequestConnectionList] = useState([])
    useEffect(() => {
        async function fetchRequestList() {
            const response = await coupleServices.apiGetListInvitation()
            if (response.success) setRequestConnectionList(response.result)
        }
        fetchRequestList()
    }, [])
    const handleAcceptRestore = async (invitationId) => {
        const response = await coupleServices.apiAcceptRestoreCouple(invitationId)
        if (response.success) {
            Swal.fire('Congratulations', 'You restored couple with your lover successfully.Please login again to go your couple home!', 'success').then(() => {
                dispatch(logout())
            })
        } else {
            Swal.fire('Oops!', response.result, 'error')
        }
    }
    const handleAcceptInvitation = async (invitationId) => {
        const response = await coupleServices.apiAcceptInvitationTwo(invitationId)
        if (response.success) {
            Swal.fire('Congratulations', 'You restored couple with your lover successfully.Please login again to go your couple home!', 'success').then(() => {
                dispatch(logout())
            })
        } else {
            Swal.fire('Oops!', response.result, 'error')
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-one')}>
                <div className={cx('header-edit-profile')}>
                    <div className={cx('header-edit-profile-one')}>
                        <div className={cx('header-edit-profile-two')}>
                            <span>Manage request connection</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('sub-content')}>
                        <div className={cx('header-sub-content')}>
                            <div className={cx('header-sub-content-one')}>
                                <div className={cx('header-sub-content-two')}>
                                    <div className={cx('header-sub-content-three')}>
                                        <span>You have {requestConnectionList.length} connection request</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {requestConnectionList.map(el =>
                            <div className={cx('list-content')} key={el._id}>
                                <div className={cx('list-content-title')}>
                                    <div className={cx('avatarUser')}>
                                        <img src={el.userSend.avatar} alt="" />
                                    </div>
                                    <div className={cx('nameUser')}>
                                        <span>{el.userSend.name}</span>
                                    </div>


                                    <div className={cx('title')}>
                                        {el.type === 'restore' &&
                                            <span>
                                                &nbsp;invites you to become a couple again
                                            </span>
                                        }
                                        {el.type === 'new' &&
                                            <span>
                                                &nbsp;invites you to become a couple
                                            </span>
                                        }
                                    </div>
                                </div>
                                <div className={cx('list-content-icon')}>
                                    {el.type === 'restore' &&
                                        <button onClick={() => handleAcceptRestore(el._id)}>Restore</button>
                                    }
                                    {el.type === 'new' &&
                                        <button onClick={() => handleAcceptInvitation(el._id)}>Accept&nbsp;</button>
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestConnection;