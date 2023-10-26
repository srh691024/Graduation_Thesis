import classNames from "classnames/bind";
import styles from "~/pages/PrivateCouple/Todolist/Todolist.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellConcierge, faClock, faCommentDots, faGift, faHandHoldingHand, faHouse, faListCheck, faSmileBeam, faStar, faSun } from "@fortawesome/free-solid-svg-icons";
import { SubTodo } from "~/components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Todolist() {
    const { todos } = useSelector(state => state.todo)
    const { current } = useSelector(state => state.user)
    const [todayTodos, setTodayTodos] = useState([])
    const [importantTodos, setImportantTodos] = useState([])
    const [bymeTodos, setBymeTodos] = useState([])
    const [notdoneTodos, setNotDoneTodos] = useState([])
    const [physicalTodos, setPhysicalTodos] = useState([])
    const [actsTodos, setActsTodos] = useState([])
    const [qualityTodos, setQualityTodos] = useState([])
    const [wordTodos, setWordTodos] = useState([])
    const [receivingTodos, setReceivingTodos] = useState([])
    useEffect(() => {
        setTodayTodos(todos.filter(task => task.dueDate === new Date()))
        setImportantTodos(todos.filter(task => task.isImportant === true))
        setBymeTodos(todos.filter(task => task.author === current._id && task.completed === false))
        setNotDoneTodos(todos.filter(task => task.completed === false))
        setPhysicalTodos(todos.filter(task => task.type === 'Physical Touch' && task.completed === false))
        setActsTodos(todos.filter(task => task.type === 'Acts of Service' && task.completed === false))
        setQualityTodos(todos.filter(task => task.type === 'Quality Time' && task.completed === false))
        setWordTodos(todos.filter(task => task.type === 'Words of Affirmation' && task.completed === false))
        setReceivingTodos(todos.filter(task => task.type === 'Receiving Gifts' && task.completed === false))

    }, [todos])
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
                                                        <div className={cx('sub-count')}>{todayTodos.length}</div>
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
                                                        <div className={cx('sub-count')}>{importantTodos.length}</div>
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
                                                        <div className={cx('sub-count')}>{bymeTodos.length}</div>
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
                                                        <div className={cx('sub-count')}>{notdoneTodos.length}</div>
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
                                                        <div className={cx('sub-count')}>{physicalTodos.length}</div>
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
                                                        <div className={cx('sub-count')}>{actsTodos.length}</div>
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
                                                        <div className={cx('sub-count')}>{qualityTodos.length}</div>
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
                                                        <div className={cx('sub-count')}>{wordTodos.length}</div>
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
                                                        <div className={cx('sub-count')}>{receivingTodos.length}</div>
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