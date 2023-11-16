import classNames from "classnames/bind";
import styles from '~/components/ModalProblem/ModalProblem.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import PreviewImage from "../PreviewImage";
import * as authServices from '~/services/authServices'

const cx = classNames.bind(styles)

function ModalProblem({ onClose }) {
    const formik = useFormik({
        initialValues: {
            image: '',
            content: '',
        },
        validationSchema: Yup.object({
            image: Yup.mixed(),
            content: Yup.string()
                .max(1000, 'The detail is too long. You can summarize no more than 1000 characters.')
                .required('The detail is required')
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('image', values.image);
            formData.append('content', values.content);
            formData.forEach(function (value, key) {
                console.log(key, value);
            });

            const response = await authServices.apiReportProblem(formData)
            if (response.success) {
                Swal.fire('Congratulations', 'You have reported a problem successfully', 'success')
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
                                                                        <div className={cx('title')}>Something went wrong</div>
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
                                                        <div className={cx('notePass')}><p>How can we improve?</p></div>
                                                        <form className={cx('information')} >
                                                            <div className={cx('sub-infor', 'biography')}>
                                                                <aside>
                                                                    <label>Detail</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <textarea
                                                                            name='content'
                                                                            value={formik.values.content}
                                                                            onChange={formik.handleChange}
                                                                            placeholder="Please share as much detail as possible..."></textarea>
                                                                    </div>
                                                                    {
                                                                        formik.errors.content && formik.touched.content && (
                                                                            <small className={cx('validate-login')}>{formik.errors.content}</small>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                            {formik.values.image ?
                                                                <div className={cx('imageWrapper')}
                                                                    onClick={() => formik.setFieldValue('image', '')}
                                                                >
                                                                    <PreviewImage file={formik.values.image} />
                                                                </div>

                                                                :
                                                                <div className={cx('choose-button')}>
                                                                    <div className={cx('choose-button-one')}>

                                                                        <input
                                                                            type="file"
                                                                            name="image"
                                                                            accept="image/jpeg, image/png, image/jpg"
                                                                            onChange={(e) => formik.setFieldValue('image', e.target.files[0])}
                                                                        />
                                                                        <button>Add images (recommended)</button>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {
                                                                formik.errors.image && formik.touched.image && (
                                                                    <small className={cx('validate-login')}>{formik.errors.image}</small>
                                                                )
                                                            }


                                                            {/* Submit button */}
                                                            <div className={cx('sub-infor')}>
                                                                <aside>
                                                                    <label></label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('submit-button')}>
                                                                        <div className={cx('submit-button-one')} onClick={formik.handleSubmit}>
                                                                            <span>Send</span>
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

export default ModalProblem;