import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from '~/components/ModalChangePassword/ModalChangePassword.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { createPortal } from "react-dom";
import ModalForgotPassword from "../ModalForgotPassword";
import * as authServices from '~/services/authServices'
import Swal from "sweetalert2";

const cx = classNames.bind(styles)

function ModalChangePassword({ onClose }) {
    const [showModalForgotPassword, setShowModalForgotPassword] = useState(false)
    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            reNewPassword: '',
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string()
                .required('Current password is required'),
            newPassword: Yup.string()
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/, 'Password must contain at least 1 digit, 1 lowercase letter, 1 uppercase letter, and be at least 6 characters long')
                .required('New password is required'),
            reNewPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'New password does not match. Enter new password again here.')
                .required('Please confirm new password'),
        }),
        onSubmit: async (values) => {
            const response = await authServices.apiChangePassword(values)
            if (response.success) {
                Swal.fire('Notify', 'Change password successfully', 'success')
            } else {
                Swal.fire('Oops!', response.result, 'error')
            }
            onClose()
        }
    })
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
                                                                        <div className={cx('title')}>Change password</div>
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
                                                        <div className={cx('notePass')}><p>Your password must be at least 6 characters and should include a combination of numbers, letters.</p></div>
                                                        <form className={cx('information')} >
                                                            <div className={cx('sub-infor')}>
                                                                <aside>
                                                                    <label>Current password</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <input name="oldPassword" value={formik.values.oldPassword} onChange={formik.handleChange} type="password" />
                                                                        {
                                                                            formik.errors.oldPassword && formik.touched.oldPassword && (
                                                                                <small className={cx('validate-login')}>{formik.errors.oldPassword}</small>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className={cx('sub-infor')}>
                                                                <aside>
                                                                    <label>New password</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <input name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} type="password" />
                                                                        {
                                                                            formik.errors.newPassword && formik.touched.newPassword && (
                                                                                <small className={cx('validate-login')}>{formik.errors.newPassword}</small>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className={cx('sub-infor')}>
                                                                <aside>
                                                                    <label>Re-type new password</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <input name="reNewPassword" value={formik.values.reNewPassword} onChange={formik.handleChange} type="password" />
                                                                        {
                                                                            formik.errors.reNewPassword && formik.touched.reNewPassword && (
                                                                                <small className={cx('validate-login')}>{formik.errors.reNewPassword}</small>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={cx('forgotPass')} onClick={() => setShowModalForgotPassword(true)}>
                                                                Forgot password?
                                                            </div>
                                                            {/* Modal forgot password */}
                                                            {showModalForgotPassword && createPortal(
                                                                <ModalForgotPassword onClose={() => setShowModalForgotPassword(false)} />,
                                                                document.body
                                                            )}

                                                            {/* Submit button */}
                                                            <div className={cx('sub-infor')}>
                                                                <aside>
                                                                    <label></label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('submit-button')}>
                                                                        <div className={cx('submit-button-one')} onClick={formik.handleSubmit}>
                                                                            <span>Change</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
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

export default ModalChangePassword;