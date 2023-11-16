import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from '~/components/ModalResponseProblem/ModalResponseProblem.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from "moment";
import * as adminServices from '~/services/adminServices'
import Swal from "sweetalert2";

const cx = classNames.bind(styles)
function ModalResponseProblem({ report, onClose }) {
    const formik = useFormik({
        initialValues: {
            response: ''
        },
        validationSchema: Yup.object({
            response: Yup.string().max(1000, 'Response is too long.')
        }),
        onSubmit: async (values) => {
            const response = await adminServices.apiResponseProblem(report._id, values)
            if (response.success) {
                Swal.fire('Notify', 'Response this problem successfully', 'success')
            } else {
                Swal.fire('Oops!', response.result, 'error')
            }
            onClose()
        }
    })
    return (
        <div className={cx('wrapperr')}>
            <div className={cx('wrapper-modal')}>
                <div className={cx('wrapper-one')}>
                    <div className={cx('overlay')}></div>
                    <div className={cx('modal')}>
                        <div className={cx('modal-one')}>
                            <div className={cx('modal-two')}>
                                <div className={cx('modal-start')}>
                                    <form >
                                        <div className={cx('form')}>
                                            <div className={cx('form-one')}>
                                                <div className={cx('form-two')}>
                                                    <div className={cx('form-three')}>
                                                        <div className={cx('create')}>
                                                            <div className={cx('create-one')}>
                                                                <div className={cx('create-two')}>
                                                                    <div className={cx('create-three')}>
                                                                        <h1>
                                                                            <div className={cx('title')}></div>
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
                                                                    {report.isResponsed ?
                                                                        null :
                                                                        <div className={cx('add')}>
                                                                            <div className={cx('add-one')}>
                                                                                <div className={cx('add-two')}>
                                                                                    <button type="submit" onClick={formik.handleSubmit} >Save</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={cx('content')}>
                                                            <div className={cx('content-one')}>
                                                                <div className={cx('content-two')}>
                                                                    <div className={cx('content-three')}>
                                                                        <div className={cx('infoUser')}>
                                                                            <div className={cx('avatarUser')}>
                                                                                <img src={report.useSend.avatar} alt="" />
                                                                            </div>
                                                                            <div className={cx('nameUser')}><p>{report.useSend.name}</p></div>
                                                                            <div className={cx('date')}>{moment(report.createdAt).format('MM-DD-YYYY')}</div>
                                                                        </div>
                                                                        <div className={cx('detailReport')}>
                                                                            <p>{report.content}</p>
                                                                        </div>
                                                                        <div className={cx('evidenceImage')}>
                                                                            <img src={report.image} alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={cx('write')}>
                                                                <div className={cx('write-one')}>
                                                                    <div className={cx('write-two')}>
                                                                        <div className={cx('divide')}>
                                                                            <div className={cx('divide-one')}>
                                                                                <div className={cx('headerResponse')}>Response</div>
                                                                                <div className={cx('responseAdmin')}>
                                                                                    {report.isResponsed ?
                                                                                        <textarea
                                                                                            name="response"
                                                                                            value={report.response}
                                                                                            disabled
                                                                                        ></textarea>
                                                                                        :
                                                                                        <>

                                                                                            <textarea
                                                                                                name="response"
                                                                                                value={formik.values.response}
                                                                                                onChange={formik.handleChange}
                                                                                                placeholder="Response problem"></textarea>
                                                                                            {
                                                                                                formik.errors.response && formik.touched.response && (
                                                                                                    <small className={cx('validate-login')}>{formik.errors.response}</small>
                                                                                                )
                                                                                            }
                                                                                        </>
                                                                                    }
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalResponseProblem;