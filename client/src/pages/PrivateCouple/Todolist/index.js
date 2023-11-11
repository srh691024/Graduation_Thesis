import classNames from "classnames/bind";
import styles from "~/pages/PrivateCouple/Todolist/Todolist.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellConcierge, faClock, faCommentDots, faGift, faHandHoldingHand, faHouse, faListCheck, faSmileBeam, faStar, faSun } from "@fortawesome/free-solid-svg-icons";
import { SubTodo } from "~/components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTodosByCouple } from "~/store/todo/asyncAction";
import moment from "moment";
import Swal from "sweetalert2";
import { Navigate, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function Todolist() {
    const dispatch = useDispatch()
    const { usernameCouple } = useParams()
    const { todos } = useSelector(state => state.todo)
    const { couple } = useSelector(state => state.couple)
    const coupleId = couple._id
    const { current } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getTodosByCouple(coupleId))
    }, [dispatch, coupleId])

    if (!couple.isConnected) {
        Swal.fire('Notify', 'You are not connected so cannot go to public social', 'info')
        return <Navigate to={`/diarypost/${couple.userNameCouple}`} />
    }
    if (couple.userNameCouple !== usernameCouple) {
        Swal.fire('Warning!', 'Can not see this page of other couple', 'warning')
        return <Navigate to={`/diarypost/${couple.userNameCouple}`} />
    }
    return (
        <div className={cx('container')}>
            <div className={cx('diary-post')}>
                <div className={cx('diary-post-sub')}>
                    <div className={cx('sub')}>
                        <div className={cx('diary-first')}>
                            <div className={cx('left-column')}>
                                <div className={cx('sidebar')}>
                                    <div className={cx('sidebar-header')}>
                                        <div className={cx('sidebarNavButton')}>
                                            <button >
                                                <FontAwesomeIcon className={cx('icon')} icon={faListCheck} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={cx('sidebar-content')}>
                                        <div className={cx('sidecar-scroll')}>
                                            <ul>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'sun')} icon={faSun} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Today </span>
                                                        </div>
                                                        <div className={cx('sub-count')}>{(todos.filter(task => moment(task.dueDate).format('dd, MMMM, DD') === moment(new Date()).format('dd, MMMM, DD') && task.completed === false)).length}</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'star')} icon={faStar} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Important</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>{(todos.filter(task => task.isImportant === true)).length}</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'byme')} icon={faSmileBeam} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>By me</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>{(todos.filter(task => task.author._id === current._id && task.completed === false)).length}</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'task')} icon={faHouse} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Tasks</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>{(todos.filter(task => task.completed === false)).length}</div>
                                                    </div>
                                                </li>
                                                <div className={cx('sidebar-lastStaticList')}></div>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'physical')} icon={faHandHoldingHand} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Physical Touch</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>{(todos.filter(task => task.type === 'Physical Touch' && task.completed === false)).length}</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'bell')} icon={faBellConcierge} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Acts of Service</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>{(todos.filter(task => task.type === 'Acts of Service' && task.completed === false)).length}</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'clock')} icon={faClock} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Quality Time</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>{(todos.filter(task => task.type === 'Quality Time' && task.completed === false)).length}</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'talk')} icon={faCommentDots} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Words of Affirmation</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>{(todos.filter(task => task.type === 'Words of Affirmation' && task.completed === false)).length}</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={cx('inner')}>
                                                        <div className={cx('sub-icon')}>
                                                            <FontAwesomeIcon className={cx('icon', 'gift')} icon={faGift} />
                                                        </div>
                                                        <div className={cx('sub-title-item')}>
                                                            <span>Receiving Gifts</span>
                                                        </div>
                                                        <div className={cx('sub-count')}>{(todos.filter(task => task.type === 'Receiving Gifts' && task.completed === false)).length}</div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <SubTodo />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todolist;