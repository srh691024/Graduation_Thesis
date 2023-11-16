import classNames from "classnames/bind";
import styles from '~/components/ModalNoteSendLink/ModalNoteSendLink.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as coupleServices from '~/services/coupleServices';
import * as authServices from '~/services/authServices'
import * as notifyServices from '~/services/notifyServices'
import Swal from "sweetalert2";
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
    reconnection: true,
})

const cx = classNames.bind(styles);
function ModalNoteSendLink({ onClose }) {
    const [searchUserReceive, setSearchUserReceive] = useState([])
    const [showResult, setShowResult] = useState(false);
    const [idReceiver, setIdReceiver] = useState('')

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email format')
                .matches(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email')
                .required('Email is required'),
        }),
        onSubmit: async (values) => {
            const sendInvitation = await coupleServices.apiSendInvitation(values);
            if (sendInvitation.success) {
                Swal.fire('Congratulations', sendInvitation.result, 'success')
                let notifyLover = {
                    recipients: idReceiver,
                    text: `invites you to become a couple`,
                    image: '',
                    type: 'follow'
                }
                const noti = await notifyServices.apiCreateNotify(notifyLover)
                socket.emit('notifyPublic', { notiId: noti.result._id, notification: noti.result });
            } else {
                Swal.fire('Oops!', sendInvitation.result, 'error');
            }
            onClose()
        }
    })
    useEffect(() => {
        async function searchUser() {
            if (formik.values.email) {
                const response = await authServices.apiSearchUser(formik.values.email)
                if (response.success) setSearchUserReceive(response.result)
            } else {
                setSearchUserReceive([])
            }
        }
        searchUser()
    }, [formik.values.email])

    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleClickUser = (result) => {
        formik.setFieldValue('email', result.email);
        setIdReceiver(result._id)
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-modal')}>
                <div className={cx('wrapper-one')}>
                    <div className={cx('overlay')}></div>
                    <div className={cx('modal')}>
                        <div className={cx('modal-one')}>
                            <div className={cx('modal-two')}>
                                <div className={cx('modal-start')}>
                                    <div className={cx('form')}>
                                        <div className={cx('form-one')}>
                                            <div className={cx('form-two')}>
                                                <div className={cx('form-three')}>
                                                    <div className={cx('create')}>
                                                        <div className={cx('create-one')}>
                                                            <div className={cx('create-two')}>
                                                                <div className={cx('create-three')}>
                                                                    <h1>
                                                                        <div className={cx('title')}>Note when send invitation link</div>
                                                                    </h1>
                                                                </div>
                                                                <div className={cx('back')} onClick={onClose}>
                                                                    <div className={cx('exit-one')}>
                                                                        <div className={cx('exit-two')}>
                                                                            <div className={cx('exit-three')}>
                                                                                <span>
                                                                                    <FontAwesomeIcon className={cx('icon')} icon={faChevronLeft} />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('content')}>
                                                        <ul>
                                                            <li>Connect is a feature that allows couples to share common data while using Love Diary, so both of you can see and comment on each other's activities.</li>
                                                            <li>If the connection invitation doesn't work, please enter the connection code directly provided in the message containing the link.</li>
                                                            <li>After the connection is established, the shared data between the two individuals will be retrieved from the data of the person who sent the connection invitation.</li>
                                                            <li>Note: The data of the invitation recipient will be permanently deleted as soon as they press 'accept invitation' and cannot be recovered.</li>
                                                            <li>We recommend discussing, prior to the connection, whose data will be used as shared data.</li>

                                                            <li className={cx('special')}>
                                                                <div className={cx('enter-link')}>
                                                                    <HeadlessTippy
                                                                        interactive
                                                                        visible={showResult && searchUserReceive.length > 0}
                                                                        render={(attrs) => (
                                                                            <div className={cx('searchResult')} tabIndex='-1' {...attrs}>
                                                                                <div className={cx('searchWrapper')}>
                                                                                    <h4 className={cx('searchTitle')}>Accounts</h4>
                                                                                    {searchUserReceive.map((result) => (
                                                                                        <Link key={result._id} onClick={() => handleClickUser(result)}>
                                                                                            <div className={cx('styleUserAvatar')}>
                                                                                                <span className={cx('styleAvatar')}>
                                                                                                    <img src={result.avatar} alt="" />
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={cx('info')}>
                                                                                                <h4 className={cx('name')}>
                                                                                                    <span>{result.name}</span>
                                                                                                </h4>
                                                                                                <span className={cx('username')}>{result.username}</span>
                                                                                            </div>
                                                                                        </Link>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        onClickOutside={handleHideResult}
                                                                    >

                                                                        <input
                                                                            type="text"
                                                                            name="email"
                                                                            placeholder="Enter your lover email"
                                                                            value={formik.values.email}
                                                                            onChange={formik.handleChange}
                                                                            onFocus={() => setShowResult(true)}
                                                                        />
                                                                    </HeadlessTippy>

                                                                </div>
                                                                {
                                                                    formik.errors.email && formik.touched.email && (
                                                                        <small className={cx('validate-login')}>{formik.errors.email}</small>
                                                                    )
                                                                }
                                                            </li>

                                                            <li className={cx('special')}>
                                                                <button type="button" className={cx('buttonSendLink')} onClick={formik.handleSubmit}>
                                                                    Send connection invitation
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalNoteSendLink;