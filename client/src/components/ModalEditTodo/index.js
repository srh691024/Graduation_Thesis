import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from '~/components/ModalEditTodo/ModalEditTodo.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { faCalendarDays, faStar } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateTask } from "~/store/todo/asyncAction";

const cx = classNames.bind(styles)

function ModalEditTodo({ todo, onClose }) {
    const dispatch = useDispatch()
    const todoId = todo._id
    const formik = useFormik({
        initialValues: {
            content: todo.content || '',
            type: todo.type || '',
            isImportant: todo.isImportant || false,
            dueDate: moment(todo.dueDate).format('yyyy-MM-DD'),
        },
        validationSchema: Yup.object({
            content: Yup.string().max(100, 'Your task is too long').required('Please enter content of task'),
            type: Yup.string().oneOf(['Physical Touch', 'Acts of Service', 'Quality Time', 'Words of Affirmation', 'Receiving Gifts']).nullable(),
            dueDate: Yup.date(),
            isImportant: Yup.boolean(),
        }),
        onSubmit: async (values) => {
            dispatch(updateTask({todoId, values}))
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
                                                                        <div className={cx('title')}>Edit information of task</div>
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

                                                        <span className={cx('addToTop')}>
                                                            <div className={cx('addTask', 'focused')}>
                                                                <div className={cx('baseTask', 'focused')}>

                                                                    <input name="content" value={formik.values.content} onChange={formik.handleChange} type="text" placeholder="Add a task" />
                                                                    {
                                                                        formik.errors.content && formik.touched.content && (
                                                                            <small className={cx('validate-login')}>{formik.errors.content}</small>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className={cx('baseTask', 'focused')}>
                                                                    <div className={cx('taskCreation')}>
                                                                        <div className={cx('dateButton-container')}>
                                                                            <FontAwesomeIcon className={cx('icon')} icon={faCalendarDays} />
                                                                            <input name="dueDate" value={formik.values.dueDate} onChange={formik.handleChange} type="date"></input>
                                                                        </div>
                                                                        <select name="type" value={formik.values.type} onChange={formik.handleChange}>
                                                                            <option value="Physical Touch">Physical Touch</option>
                                                                            <option value="Acts of Service">Acts of Service</option>
                                                                            <option value="Quality Time">Quality Time</option>
                                                                            <option value="Words of Affirmation">Words of Affirmation</option>
                                                                            <option value="Receiving Gifts">Receiving Gifts</option>
                                                                        </select>

                                                                        <div name='isImportant' type='hidden' className={cx('star-important', 'checkStar', `${formik.values.isImportant ? 'importantStars' : null}`)} onClick={(e) => formik.setFieldValue('isImportant', !formik.values.isImportant)}>
                                                                            <span>
                                                                                <FontAwesomeIcon icon={faStar} />
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    <button type="submit" onClick={formik.handleSubmit}>Update</button>
                                                                </div>
                                                            </div>
                                                        </span>
                                                        {
                                                            formik.errors.dueDate && formik.touched.dueDate && (
                                                                <small className={cx('validate-login')}>{formik.errors.dueDate}</small>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalEditTodo;