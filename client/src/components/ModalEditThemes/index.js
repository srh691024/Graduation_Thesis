import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from '~/components/ModalEditThemes/ModalEditThemes.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import PreviewImage from "../PreviewImage";
import * as coupleServices from '~/services/coupleServices'

const cx = classNames.bind(styles)
function ModalEditThemes({ infoCouple, onClose }) {
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            image: infoCouple.themes || '',
            imagename: infoCouple.themesName || '',
        },
        validationSchema: Yup.object({
            image: Yup.mixed(),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('image', values.image);
            formData.append('imagename', values.imagename);
            formData.forEach(function (value, key) {
                console.log(key, value);
            });
            setLoading(true)
            await coupleServices.apiEditThemes(infoCouple._id, formData)
            onClose()
            setLoading(false)
        }
    })
    return (
        <div className={cx('wrapperr')}>
            <div className={cx('wrapper-modal')}>
                <div className={cx('wrapper-one')}>
                    <div className={cx('overlay')}></div>
                    <div className={cx('exit')} onClick={onClose}>
                        <div className={cx('exit-button')}>
                            <div className={cx('exit-button-one')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faXmark} />
                            </div>
                        </div>
                    </div>
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
                                                                            <div className={cx('title')}>Choose theme</div>
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
                                                                    <div className={cx('add')}>
                                                                        <div className={cx('add-one')}>
                                                                            <div className={cx('add-two')}>
                                                                                <button type="submit" onClick={formik.handleSubmit} >
                                                                                    {loading ? 'Saving...' : 'Save'}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={cx('content')}>
                                                            <div className={cx('content-one')}>
                                                                <div className={cx('content-two')}>
                                                                    <div className={cx('content-three')}>
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
                                                                                    <button>Select themes</button>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                        {
                                                                            formik.errors.image && formik.touched.image && (
                                                                                <small className={cx('validate-login')}>{formik.errors.image}</small>
                                                                            )
                                                                        }
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

export default ModalEditThemes;