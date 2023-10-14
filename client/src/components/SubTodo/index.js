import classNames from "classnames/bind";
import styles from "~/components/SubTodo/SubTodo.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faPlus, faSort, faCalendarDays, faTag, faChevronDown, faUserPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircle, faStar } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

function SubTodo() {
    return (
        <div className={cx('center-column')}>
            <div className={cx('main')}>
                <div className={cx('taskToolbar')}>
                    <div className={cx('taskToolbar-top')}>
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
                    </div>
                </div>
                <div className={cx('flex-container')}>
                    <div className={cx('flexBoxFix')}>
                        <div className={cx('main-background')}>
                            <span className={cx('addToTop')}>
                                <div className={cx('addTask', 'focused')}>
                                    <div className={cx('baseTask', 'focused')}>
                                        <div className={cx('button-addTask')}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                        <input type="text" placeholder="Add a task" />
                                    </div>
                                    <div className={cx('baseTask', 'focused')}>
                                        <div className={cx('taskCreation')}>
                                            <div className={cx('dateButton-container')}>
                                                <FontAwesomeIcon className={cx('icon')} icon={faCalendarDays} />
                                            </div>
                                            <div className={cx('dateButton-container')}>
                                                <FontAwesomeIcon className={cx('icon')} icon={faTag} />
                                            </div>
                                        </div>

                                        <button>Add</button>
                                    </div>
                                </div>
                            </span>
                            <div className={cx('tasks')}>
                                <div className={cx('task-one')}>
                                    <div className={cx('task-scroll')}>
                                        <div className={cx('task-scroll-one')}>
                                            <div className={cx('task')}>
                                                <div className={cx('taskItem-body')}>
                                                    <span className={cx('check-done')}>
                                                        <FontAwesomeIcon className={cx('circle')} icon={faCircle} />
                                                        <FontAwesomeIcon className={cx('check')} icon={faCheck} />
                                                    </span>
                                                    <button className={cx('content-body')}>
                                                        <span className={cx('name-task')}>Do laundry</span>
                                                        <div className={cx('other-filter')}>
                                                            <span className={cx('sub-other')}>
                                                                <span>Due Thu, November, 23</span>
                                                            </span>
                                                            <span className={cx('sub-other')}>Physical Touch</span>
                                                            <span className={cx('sub-other')}>
                                                                <FontAwesomeIcon icon={faUserPen} />
                                                                <span>&nbsp;Thuy Duong</span>
                                                            </span>
                                                        </div>
                                                    </button>
                                                    <div className={cx('star-important')}>
                                                        <span>
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('task')}>
                                                <div className={cx('taskItem-body')}>
                                                    <span className={cx('check-done')}>
                                                        <FontAwesomeIcon className={cx('circle')} icon={faCircle} />
                                                        <FontAwesomeIcon className={cx('check')} icon={faCheck} />
                                                    </span>
                                                    <button className={cx('content-body')}>
                                                        <span className={cx('name-task')}>Do laundry</span>
                                                        <div className={cx('other-filter')}>
                                                            <span className={cx('sub-other')}>
                                                                <span>Due Thu, November, 23</span>
                                                            </span>
                                                            <span className={cx('sub-other')}>Physical Touch</span>
                                                            <span className={cx('sub-other')}>
                                                                <FontAwesomeIcon icon={faUserPen} />
                                                                <span>&nbsp;Thuy Duong</span>
                                                            </span>
                                                        </div>
                                                    </button>
                                                    <div className={cx('star-important')}>
                                                        <span>
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('task')}>
                                                <div className={cx('taskItem-body')}>
                                                    <span className={cx('check-done')}>
                                                        <FontAwesomeIcon className={cx('circle')} icon={faCircle} />
                                                        <FontAwesomeIcon className={cx('check')} icon={faCheck} />
                                                    </span>
                                                    <button className={cx('content-body')}>
                                                        <span className={cx('name-task')}>Do laundry</span>
                                                        <div className={cx('other-filter')}>
                                                            <span className={cx('sub-other')}>
                                                                <span>Due Thu, November, 23</span>
                                                            </span>
                                                            <span className={cx('sub-other')}>Physical Touch</span>
                                                            <span className={cx('sub-other')}>
                                                                <FontAwesomeIcon icon={faUserPen} />
                                                                <span>&nbsp;Thuy Duong</span>
                                                            </span>
                                                        </div>
                                                    </button>
                                                    <div className={cx('star-important')}>
                                                        <span>
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('taskCard')}>
                                                <div className={cx('taskCard-header')}>
                                                    <div className={cx('taskCard-headerActions')}>
                                                        <FontAwesomeIcon className={cx('chevDown')} icon={faChevronDown} />
                                                    </div>
                                                    <div className={cx('taskCard-labels')}>
                                                        <div className={cx('taskCard-label')}>
                                                            <span>Completed</span>
                                                        </div>
                                                        <div className={cx('taskCard-subLabel')}>13</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('completedTask')}>
                                                <div className={cx('taskItem-body')}>
                                                    <span className={cx('check-done')}>
                                                        <FontAwesomeIcon className={cx('circle')} icon={faCircle} />
                                                        <FontAwesomeIcon className={cx('check')} icon={faCheck} />
                                                    </span>
                                                    <button className={cx('content-body')}>
                                                        <span className={cx('name-task', 'done')}>Do laundry</span>
                                                        <div className={cx('other-filter')}>
                                                            <span className={cx('sub-other')}>
                                                                <span>Due Thu, November, 23</span>
                                                            </span>
                                                            <span className={cx('sub-other')}>Physical Touch</span>
                                                            <span className={cx('sub-other')}>
                                                                <FontAwesomeIcon icon={faUserPen} />
                                                                <span>&nbsp;Thuy Duong</span>
                                                            </span>
                                                        </div>
                                                    </button>
                                                    <div className={cx('star-important')}>
                                                        <span>
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('completedTask')}>
                                                <div className={cx('taskItem-body')}>
                                                    <span className={cx('check-done')}>
                                                        <FontAwesomeIcon className={cx('circle')} icon={faCircle} />
                                                        <FontAwesomeIcon className={cx('check')} icon={faCheck} />
                                                    </span>
                                                    <button className={cx('content-body')}>
                                                        <span className={cx('name-task', 'done')}>Do laundry</span>
                                                        <div className={cx('other-filter')}>
                                                            <span className={cx('sub-other')}>
                                                                <span>Due Thu, November, 23</span>
                                                            </span>
                                                            <span className={cx('sub-other')}>Physical Touch</span>
                                                            <span className={cx('sub-other')}>
                                                                <FontAwesomeIcon icon={faUserPen} />
                                                                <span>&nbsp;Thuy Duong</span>
                                                            </span>
                                                        </div>
                                                    </button>
                                                    <div className={cx('star-important')}>
                                                        <span>
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </span>
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

export default SubTodo;