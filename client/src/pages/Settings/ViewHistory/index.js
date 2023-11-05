import classNames from "classnames/bind";
import styles from "~/pages/Settings/ViewHistory/ViewHistory.module.scss"
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import * as coupleServices from '~/services/coupleServices';
import moment from "moment";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

function ViewHistory() {
    const [historyCouple, setHistoryCouple] = useState([]);
    const [infoInvitation, setInfoInvitation] = useState({})
    const [haveInvitation, setHaveInvitation] = useState(false)

    const { current } = useSelector(state => state.user)
    useEffect(() => {
        async function fetchInfoInvitation() {
            setTimeout(async () => {
                const invitation = await coupleServices.apiGetCurrentInvitation()
                if (invitation.success) {
                    setInfoInvitation(invitation.result)
                    setHaveInvitation(invitation.success)
                }
            }, 100)
        }

        fetchInfoInvitation()
    }, [])

    useEffect(() => {
        async function fetchHistoryCouple() {
            const response = await coupleServices.apigetHistoryCoupleByCurrentUser()
            if (response.success) setHistoryCouple(response.result);
        }
        fetchHistoryCouple();
    }, []);

    const getNameOfLover = (el) => {
        if (current.name === el.createdUser.name) return el.loverUserId.name
        return el.createdUser.name
    }
    const getExpiration = (el) => {
        const countExpirationDate = moment(el?.disconnectedDate)?.add(30, 'days')
        const currentDate = moment()
        const daysRemaining = countExpirationDate.diff(currentDate, 'days')
        return daysRemaining
    }

    const handleCancelInvitation = async () => {
        setHaveInvitation(false)
        const response = await coupleServices.apiCancelInvitation(infoInvitation._id)
        if (response.success) {
            Swal.fire('Notifications', response.result, 'success');
        } else {
            Swal.fire('Oops!', response.result, 'error');
        }
    }
    const handleClickRestore = async (coupleId) => {
        setHaveInvitation(true)
        const response = await coupleServices.apiInviteRestoreCouple(coupleId)
        if (response.success) {
            Swal.fire('Notifications', response.result, 'success');
        } else {
            Swal.fire('Oops!', response.result, 'error');
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-one')}>
                <div className={cx('header-edit-profile')}>
                    <div className={cx('header-edit-profile-one')}>
                        <div className={cx('header-edit-profile-two')}>
                            <span>Connection history</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>

                    {/* No connection */}
                    {historyCouple.length <= 0 &&
                        <div className={cx('after-send-link')}>
                            <div className={cx('after-send-link-one')}>
                                <div className={cx('icon-envelope')}>
                                    <img src={images.noConnection} alt="" />
                                </div>
                                <div className={cx('description-icon-first')}>There are no history connections</div>
                            </div>
                        </div>
                    }

                    {/* Have connection */}
                    {historyCouple.length > 0 && historyCouple.map((el, index) =>
                        <div className={cx('have-connection')} key={index}>
                            <div className={cx('have-connection-one')}>
                                <div className={cx('from-date')}>
                                    <div className={cx('date')}>
                                        From
                                        &nbsp;{moment(el.startConnectedDate).format('DD, MMMM, YYYY')}&nbsp;
                                        to
                                        &nbsp;{moment(el.disconnectedDate).format('DD, MMMM, YYYY')}&nbsp;
                                    </div>
                                    <div className={cx('icon-option')}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </div>
                                </div>
                                <div className={cx('connected-with')}>This connection history can be restored</div>
                                <div className={cx('button-restore')}>
                                    <div className={cx('image-restore')}>
                                        <img src={images.recoveryConnection} alt="" />
                                        <div className={cx('description-restore')}>
                                            <span>You and &nbsp;
                                                <span className={cx('specific-name')}>
                                                    {getNameOfLover(el)}
                                                    &nbsp;</span>
                                                have disconnected.
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('button')}>
                                        <div className={cx('d-day')}>Expiration in D-
                                            {getExpiration(el)}
                                        </div>
                                        {haveInvitation ?
                                            <div className={cx('click')} onClick={handleCancelInvitation}>Cancel the invitation</div>
                                            :
                                            <div className={cx('click')}
                                                onClick={() => handleClickRestore(el._id)}
                                            >Restore the connection</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewHistory;