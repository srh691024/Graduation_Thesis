import classNames from "classnames/bind";
import styles from "~/pages/Settings/ConnectLover/ConnectLover.module.scss"
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { ModalNoteSendLink } from "~/components";
import { createPortal } from "react-dom";
import * as coupleServices from '../../../services/coupleServices'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import ModalDisconnect from "~/components/ModalDisconnect";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { logout } from "~/store/user/userSlice";
import config from "~/config";

const cx = classNames.bind(styles);

function ConnectLover() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [infoInvitation, setInfoInvitation] = useState({})
    const [haveInvitation, setHaveInvitation] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [infoCreatedUser, setInfoCreatedUser] = useState({})
    const [infoLoverUser, setInfoLoverUser] = useState({})
    const [openDisconnect, setOpenDisconnect] = useState(false);
    const [infoCouple, setInfoCouple] = useState();
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

    const getNameOfLover = () => {
        if (current.name === infoCreatedUser.name) return infoLoverUser.name
        return infoCreatedUser.name
    }

    useEffect(() => {
        async function fetchCheckStatusConnectCouple() {
            const statusConnect = await coupleServices.apiGetCoupleByCurrentUser()
            if (statusConnect.success && statusConnect.result.isConnected) {
                // setInfoConnectedCouple(statusConnect.result)
                setInfoCouple(infoCouple)
                setIsConnected(true)

                const createdUser = await coupleServices.apiGetCreatedUserByCouple(statusConnect.result.createdUser)
                if (createdUser.success) setInfoCreatedUser(createdUser.result)
                const loverUser = await coupleServices.apiGetLoverUserByCouple(statusConnect.result.loverUserId)
                if (loverUser.success) setInfoLoverUser(loverUser.result)
            }
        }
        fetchCheckStatusConnectCouple()
    }, [infoCouple])

    const [showModalNoteSendLink, setShowModalNoteSendLink] = useState(false);
    const [showModalDisconnect, setShowModalDisconnect] = useState(false);
    const formik = useFormik({
        initialValues: {
            token: '',
        },
        validationSchema: Yup.object({
            token: Yup.string()
                .required('The connection code is required'),
        }),
        onSubmit: async (values) => {
            const response = await coupleServices.apiAcceptInvitation(values.token);
            if (response.success) {
                Swal.fire('Congratulations', 'Connected successfully. Please go login again and see your partner', 'success').then(() => {
                    dispatch(logout());
                    navigate(`${config.routes.login}`);
                });
            } else {
                Swal.fire('Oops!', response.result, 'error');
            }

        }
    })
    const handleCancelInvitation = async() => { 
        const response = await coupleServices.apiCancelInvitation(infoInvitation._id)
        if(response.success) {
            Swal.fire('Notifications', response.result, 'success');
        }else{
            Swal.fire('Oops!', response.result, 'error');
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-one')}>
                <div className={cx('header-edit-profile')}>
                    <div className={cx('header-edit-profile-one')}>
                        <div className={cx('header-edit-profile-two')}>
                            <span>Manage connection</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('button-or-link')}>
                        <div className={cx('button-send-link')} onClick={() => setShowModalNoteSendLink(true)}>Send connection invitation</div>
                        {showModalNoteSendLink && createPortal(
                            <ModalNoteSendLink onClose={() => setShowModalNoteSendLink(false)} />,
                            document.body
                        )}
                        <div className={cx('or')}>Or</div>
                        <div className={cx('enter-link')}>
                            <input
                                type="text"
                                name="token"
                                value={formik.values.token}
                                onChange={formik.handleChange}
                                placeholder="Enter the connection code" />
                            {
                                formik.errors.token && formik.touched.token && (
                                    <small className={cx('validate-login')}>{formik.errors.token}</small>
                                )
                            }
                        </div>
                        <div className={cx('buttonSubmit')} onClick={formik.handleSubmit}>Submit</div>
                    </div>

                    {/* Have request lover connection */}
                    {haveInvitation ?
                        <div className={cx('after-send-link')}>
                            <div className={cx('after-send-link-one')}>
                                <div className={cx('icon-envelope')}>
                                    <img src={images.envelopeHeart} alt="" />
                                </div>
                                <div className={cx('description-icon-first')}>Connection awaiting. . .</div>
                                <div className={cx('description-icon-second')}>Waiting for the other party to accept the connection invitation</div>
                                <div className={cx('time-expired')}>
                                    <div className={cx('time-expired-one')}>This invitation will automatically expire after 24 hours from the time you sent it.
                                        You can cancel the invitation and send a new link before the other party accepts.</div>
                                    <div className={cx('time-expired-two')}>
                                        <div className={cx('icon-time')}>
                                            <FontAwesomeIcon className={cx('icon')} icon={faClockRotateLeft} />
                                        </div>
                                        <div className={cx('letter')}>The invitation will expire at &nbsp;</div>
                                        <div className={cx('date')}>
                                            {(moment(infoInvitation?.createdTime)?.add(24, 'hours')).format("h:mm:ss a, MMMM Do YYYY")}
                                            {/* 12:00, October 15, 2023 */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('button-cancel-link')} onClick={handleCancelInvitation}>Cancel the invitation</div>
                        </div>
                        : null
                    }


                    {/* Dont have connection */}
                    {!haveInvitation && !isConnected ?
                        <div className={cx('after-send-link')}>
                            <div className={cx('after-send-link-one')}>
                                <div className={cx('icon-envelope')}>
                                    <img src={images.noConnection} alt="" />
                                </div>
                                <div className={cx('description-icon-first')}>There are no connection pending</div>
                            </div>
                        </div>
                        : null}


                    <div className={cx('have-connection')}>
                        {/* Have a connection */}
                        {isConnected ?
                            <div className={cx('have-connection-one')}>
                                <div className={cx('from-date')}>
                                    <div className={cx('date')}>From {moment(infoCouple?.startLoveDate)?.format("dddd, MMMM Do YYYY")} </div>
                                    <div className={cx('icon-option')} onClick={() => { setOpenDisconnect(!openDisconnect) }}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                    </div>
                                    {/* Dropdown menu */}
                                    <div className={cx('dropdown-menu', `${openDisconnect ? 'active' : 'inactive'}`)} onClick={() => setShowModalDisconnect(true)}>
                                        Disconnect
                                    </div>
                                    {showModalDisconnect && createPortal(
                                        <ModalDisconnect onClose={() => setShowModalDisconnect(false)} />,
                                        document.body
                                    )}
                                </div>
                                <div className={cx('connected-with')}>Connected with
                                    {getNameOfLover()}
                                </div>
                                <div className={cx('avatar-partner')}>
                                    <div className={cx('avatar-name')}>
                                        <div className={cx('avatar')}>
                                            <img src={images.login_image} alt="" />
                                        </div>
                                        <div className={cx('name')}>{infoCreatedUser.name}</div>
                                    </div>
                                    <div className={cx('heart')}>
                                        <img src={images.hearts} alt="" />
                                    </div>
                                    <div className={cx('avatar-name')}>
                                        <div className={cx('avatar')}>
                                            <img src={images.login_image} alt="" />
                                        </div>
                                        <div className={cx('name')}>{infoLoverUser.name}</div>
                                    </div>
                                </div>
                                <div className={cx('image-kiss')}>
                                    <img src={images.kiss} alt="" />
                                </div>
                            </div>
                            : null}




                        {/* Note connections */}
                        <div className={cx('note-when-connect')}>
                            <div className={cx('note-when-connect-one')}>
                                <div className={cx('header')}>Connect and start with Love Diary</div>
                                <div className={cx('note')}>
                                    <div className={cx('icon-note')}>
                                        <img src={images.notebook} alt="" />
                                    </div>
                                    <div className={cx('letter')}>Record and share memories with accompanying photos.</div>
                                </div>
                                <div className={cx('note')}>
                                    <div className={cx('icon-note')}>
                                        <img src={images.notification} alt="" />
                                    </div>
                                    <div className={cx('letter')}>Update on the latest activities (todolist, anniversary)
                                        and comment on each other's latest updates through notifications.</div>
                                </div>
                                <div className={cx('note')}>
                                    <div className={cx('icon-note')}>
                                        <img src={images.socialService} alt="" />
                                    </div>
                                    <div className={cx('letter')}>Share your love story with the community of other loving couples.</div>
                                </div>
                                <div className={cx('note')}>
                                    <div className={cx('icon-note')}>
                                        <img src={images.databaseManage} alt="" />
                                    </div>
                                    <div className={cx('letter')}>All your records are securely saved.
                                        Even if the connection is discontinued,
                                        you can still restore the data within 30 days by logging into your old account.</div>
                                </div>
                            </div>
                            <div className={cx('note-when-connect-two')}>
                                <div className={cx('note-one')}>Note</div>
                                <ul>
                                    <li>Connect is a feature that allows couples to share common data while using Love Diary, so both of you can see and comment on each other's activities.</li>
                                    <li>If the connection invitation doesn't work, please enter the connection code directly provided in the message containing the link.</li>
                                    <li>After the connection is established, the shared data between the two individuals will be retrieved from the data of the person who sent the connection invitation.</li>
                                    <li>Note: The data of the invitation recipient will be permanently deleted as soon as they press 'accept invitation' and cannot be recovered.</li>
                                    <li>We recommend discussing, prior to the connection, whose data will be used as shared data.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
}

export default ConnectLover;