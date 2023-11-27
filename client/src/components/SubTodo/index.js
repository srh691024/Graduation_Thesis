import classNames from "classnames/bind";
import styles from "~/components/SubTodo/SubTodo.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faPlus, faSort, faCalendarDays, faChevronDown, faUserPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircle, faPenToSquare, faStar, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { addTodo, checkDone, checkImportant, deleteTask } from "~/store/todo/asyncAction";
import moment from "moment";
import { createPortal } from "react-dom";
import ModalEditTodo from "../ModalEditTodo";
import Loading from "../Loading";

const cx = classNames.bind(styles);

function SubTodo() {
    const dispatch = useDispatch()
    // const [isImportantStar, setIsImportantStar] = useState(false)
    const { todos, isLoading } = useSelector(state => state.todo)
    const { couple } = useSelector(state => state.couple)
    const coupleId = couple._id
    const [inCompleteTodos, setInCompleteTodos] = useState([])
    const [completedTodos, setCompletedTodos] = useState([])
    const [showModalEditTodo, setShowModalEditTodo] = useState(false);
    useEffect(() => {
        const incompleteTasks = todos.filter(task => task.completed === false)
        setInCompleteTodos(incompleteTasks)
        const completedTasks = todos.filter(task => task.completed === true)
        setCompletedTodos(completedTasks)
    }, [todos])
    const formik = useFormik({
        initialValues: {
            content: '',
            type: '',
            isImportant: false,
            dueDate: '',
        },
        validationSchema: Yup.object({
            content: Yup.string().max(100, 'Your task is too long').required('Please enter content of task'),
            type: Yup.string().oneOf(['Physical Touch', 'Acts of Service', 'Quality Time', 'Words of Affirmation', 'Receiving Gifts']).nullable(),
            dueDate: Yup.date().min(new Date(), "Your due date is too old"),
            isImportant: Yup.boolean(),
        }),
        onSubmit: async (values) => {
            dispatch(addTodo({ coupleId, values }))
        }
    })
    const handleCheckDone = (todoId) => {
        dispatch(checkDone(todoId))
    }

    const handleCheckImportant = (todoId) => {
        dispatch(checkImportant(todoId))
    }
    const handleDeleteTodo = (todoId) => {
        dispatch(deleteTask(todoId));
    };
    return (
        <div className={cx('center-column')}>
            <div className={cx('main')}>
                <div className={cx('taskToolbar')}>
                    <div className={cx('taskToolbar-top')}>
                        {/* Header */}
                        <div className={cx('taskToolbar-headline')}>
                            <div className={cx('taskToolbar-titleContainer')}>
                                <div className={cx('taskToolbar-titleItem')}>
                                    <h2>
                                        <FontAwesomeIcon icon={faClipboardList} />
                                        <span>To do list</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        {/* End header  */}

                        {/* Sort */}
                        <div className={cx('taskToolbar-right')}>
                            <div className={cx('taskToolbar-actions')}>
                                <div className={cx('taskToolbar-actionsItem')}>
                                    <div className={cx('sortingOptions')}>
                                        <button>
                                            <div className={cx('toolbarButton-inner')}>
                                                <div className={cx('toolbarButton-icon')}>
                                                    <FontAwesomeIcon icon={faSort} />
                                                </div>
                                                <span>Sort</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End sort */}
                    </div>
                </div>
                <div className={cx('flex-container')}>
                    <div className={cx('flexBoxFix')}>
                        <div className={cx('main-background')}>
                            {/* Add task  */}
                            <span className={cx('addToTop')}>
                                <div className={cx('addTask', 'focused')}>
                                    <div className={cx('baseTask', 'focused')}>
                                        <div className={cx('button-addTask')}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
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

                                        <button type="submit" onClick={formik.handleSubmit}>Add</button>
                                    </div>
                                </div>
                            </span>
                            {
                                formik.errors.dueDate && formik.touched.dueDate && (
                                    <small className={cx('validate-login')}>{formik.errors.dueDate}</small>
                                )
                            }
                            {/* End add task  */}

                            {isLoading ? <Loading />
                                :
                                <div className={cx('tasks')}>
                                    <div className={cx('task-one')}>
                                        <div className={cx('task-scroll')}>
                                            <div className={cx('task-scroll-one')}>
                                                {/* Each task  */}
                                                {inCompleteTodos.map((td, index) => (
                                                    <div className={cx('task')} key={index}>
                                                        <div className={cx('taskItem-body')}>
                                                            <span className={cx('check-done')} onClick={() => handleCheckDone(td._id)}>
                                                                <FontAwesomeIcon className={cx('circle')} icon={faCircle} />
                                                                <FontAwesomeIcon className={cx('check')} icon={faCheck} />
                                                            </span>
                                                            <button className={cx('content-body')}>
                                                                <span className={cx('name-task')}>{td.content}</span>
                                                                <div className={cx('other-filter')}>
                                                                    <span className={cx('sub-other')}>
                                                                        <span>Due {moment(td.dueDate).format('dd, MMMM, DD')}</span>
                                                                    </span>
                                                                    <span className={cx('sub-other')}>
                                                                        <FontAwesomeIcon icon={faUserPen} />
                                                                        <span>&nbsp;{td.author.name}</span>
                                                                    </span>
                                                                    <span className={cx('sub-other')}>{td.type}</span>
                                                                </div>
                                                            </button>

                                                            {/* Update todo  */}
                                                            <FontAwesomeIcon className={cx('editTodo')} icon={faPenToSquare} onClick={() => setShowModalEditTodo(true)} />
                                                            {/* Modal new diary */}
                                                            {showModalEditTodo && createPortal(
                                                                <ModalEditTodo todo={td} onClose={() => setShowModalEditTodo(false)} />,
                                                                document.body
                                                            )}

                                                            {/* DELETE TODO  */}
                                                            <FontAwesomeIcon className={cx('deleteTodo')} icon={faTrashCan} onClick={() => handleDeleteTodo(td._id)} />
                                                            <div className={cx('star-important', `${td.isImportant ? 'importantStars' : ''}`)}>
                                                                <span>
                                                                    <FontAwesomeIcon icon={faStar} onClick={() => handleCheckImportant(td._id)} />

                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                ))}
                                                {/* End each task  */}

                                                {/* Header completed task  */}
                                                <div className={cx('taskCard')}>
                                                    <div className={cx('taskCard-header')}>
                                                        <div className={cx('taskCard-headerActions')}>
                                                            <FontAwesomeIcon className={cx('chevDown')} icon={faChevronDown} />
                                                        </div>
                                                        <div className={cx('taskCard-labels')}>
                                                            <div className={cx('taskCard-label')}>
                                                                <span>Completed</span>
                                                            </div>
                                                            <div className={cx('taskCard-subLabel')}>{(todos.filter(task => task.completed)).length}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* End header completed task  */}

                                                {/* Completed task  */}
                                                {completedTodos.map((td, index) => (
                                                    <div className={cx('completedTask')} key={index}>
                                                        <div className={cx('taskItem-body')}>
                                                            <span className={cx('check-done')}>
                                                                <FontAwesomeIcon className={cx('circle')} icon={faCircle} />
                                                                <FontAwesomeIcon className={cx('checkDid')} icon={faCheck} />
                                                            </span>
                                                            <button className={cx('content-body')}>
                                                                <span className={cx('name-task', 'done')}>{td.content}</span>
                                                                <div className={cx('other-filter')}>
                                                                    <span className={cx('sub-other')}>
                                                                        <span>Due {moment(td.dueDate).format('dd, MMMM, DD')}</span>
                                                                    </span>
                                                                    <span className={cx('sub-other')}>
                                                                        <FontAwesomeIcon icon={faUserPen} />
                                                                        <span>&nbsp;{td.author.name}</span>
                                                                    </span>
                                                                    <span className={cx('sub-other')}>{td.type}</span>
                                                                </div>
                                                            </button>
                                                            <div className={cx('star-important', `${td.isImportant ? 'importantStars' : null}`)}>
                                                                <span>
                                                                    <FontAwesomeIcon icon={faStar} />
                                                                </span>
                                                            </div>
                                                            <FontAwesomeIcon className={cx('deleteTodo', 'doneTodo')} icon={faTrashCan} onClick={() => handleDeleteTodo(td._id)} />
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* End completed task  */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubTodo;