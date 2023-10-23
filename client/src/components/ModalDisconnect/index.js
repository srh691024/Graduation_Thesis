import classNames from "classnames/bind";
import styles from '~/components/ModalDisconnect/ModalDisconnect.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as coupleServices from '~/services/coupleServices';
import Swal from "sweetalert2";

const cx = classNames.bind(styles)

function ModalDisconnect({ onClose }) {
    const formik = useFormik({
        initialValues: {
            agree: '',
        },
        validationSchema: Yup.object({
            agree: Yup.string()
                .required('Acceptance is required')
                .test('match', 'The acceptance does not match.', function (value) {
                    // Giá trị cần so sánh, ví dụ: "compareValue"
                    const compareValue = "I Agree";
                    return value === compareValue;
                }),
        }),
        onSubmit: async (values) => {

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
                                                                        <div className={cx('title')}>Please check before you disconnect!!!</div>
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
                                                            <li>All data will be deleted when you disconnect.</li>
                                                            <li>You can only restore within 30 days.</li>
                                                            <li>To connect with your partner and retrieve data from a previous couple, you need to log in with the same account used at that time.</li>
                                                            <li>If you delete your account, you won't be able to recover the data, even if the time limit hasn't expired.</li>
                                                            <li>If you agree to disconnect, please enter 'I agree' in the box below and click 'Disconnect'.</li>
                                                            <li className={cx('special')}>
                                                                <div className={cx('enter-link')}>
                                                                    <input
                                                                        type="text"
                                                                        name="agree"
                                                                        placeholder="I agree"
                                                                        value={formik.values.agree}
                                                                        onChange={formik.handleChange} />
                                                                </div>
                                                                {
                                                                    formik.errors.agree && formik.touched.agree && (
                                                                        <small className={cx('validate-login')}>{formik.errors.agree}</small>
                                                                    )
                                                                }
                                                            </li>
                                                            <li className={cx('special')}>
                                                                <button type="button" className={cx('buttonSendLink')} onClick={formik.handleSubmit}>
                                                                    Disconnect
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

export default ModalDisconnect;