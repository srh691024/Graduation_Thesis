import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from '~/components/ModalEditCalendar/ModalEditCalendar.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { addAnni } from "~/store/anniversary/asyncAction";

const cx = classNames.bind(styles)

const department = [
    {
        id: 1, color: '#fe72aa', name: 'Pink',
    },
    {
        id: 2, color: '#9face6', name: 'Purple',
    },
    {
        id: 3, color: '#76d8b9', name: 'Green',
    },
    {
        id: 4, color: '#faa85b', name: 'Orange',
    }
]

function ModalEditCalendar({ data, onClose }) {
    const dispatch = useDispatch()
    const { couple } = useSelector(state => state.couple)
    const coupleId = couple._id
    const formik = useFormik({
        initialValues: {
            title: data?.title || '',
            description: data?.description || '',
            start: data?.start || '',
            end: data?.end || '',
            color: data?.color || '',
        },
        validationSchema: Yup.object({
            title: Yup.string().max(40, 'Your name of anniversary is too long').required('Please enter your anniversary name'),
            description: Yup.string().max(100, 'Your description is too long'),
            start: Yup.date().required('Please enter the start date'),
            end: Yup.date().required('Please enter the end date'),
        }),
        onSubmit: async (values) => {

            console.log(values)
            dispatch(addAnni({coupleId, values}))
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
                                                                        <div className={cx('title')}>Add new anniversary</div>
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
                                                        <form className={cx('information')} >
                                                            <div className={cx('sub-infor', 'startLoveDate')}>
                                                                <aside>
                                                                    <label>Name of anniversary</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <input name="title" type="text" value={formik.values.title} onChange={formik.handleChange} />
                                                                    </div>
                                                                    {
                                                                        formik.errors.title && formik.touched.title && (
                                                                            <small className={cx('validate-login')}>{formik.errors.title}</small>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className={cx('sub-infor')}>
                                                                <aside>
                                                                    <label>Description</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <input name="description" type="text" value={formik.values.description} onChange={formik.handleChange} />

                                                                        {
                                                                            formik.errors.description && formik.touched.description && (
                                                                                <small className={cx('validate-login')}>{formik.errors.description}</small>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={cx('sub-infor')}>
                                                                <aside>
                                                                    <label>Start of anniversary</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <input name="start" type="date" value={formik.values.start} onChange={formik.handleChange} />

                                                                        {
                                                                            formik.errors.start && formik.touched.start && (
                                                                                <small className={cx('validate-login')}>{formik.errors.start}</small>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={cx('sub-infor', 'biography')}>
                                                                <aside>
                                                                    <label>End date of anniversary</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <input name="end" type="date" value={formik.values.end} onChange={formik.handleChange} />
                                                                    </div>
                                                                    {
                                                                        formik.errors.end && formik.touched.end && (
                                                                            <small className={cx('validate-login')}>{formik.errors.end}</small>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className={cx('sub-infor', 'biography')}>
                                                                <aside>
                                                                    <label>Color of anniversary</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <select name="color" value={formik.values.color} onChange={formik.handleChange}>
                                                                            <option value=''>-Select color-</option>
                                                                            {department.map((de, index)=>
                                                                            <option className={cx(`${de.name}`)} key={index} value={de.color}>{de.name}</option>
                                                                            )}
                                                                        </select>
                                                                    </div>
                                                                    {
                                                                        formik.errors.color && formik.touched.color && (
                                                                            <small className={cx('validate-login')}>{formik.errors.color}</small>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                            {/* Submit button */}
                                                            <div className={cx('sub-infor')}>
                                                                <aside>
                                                                    <label></label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('submit-button')}>
                                                                        <div className={cx('submit-button-one')} onClick={formik.handleSubmit} >
                                                                            <span>Submit</span>
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

export default ModalEditCalendar;