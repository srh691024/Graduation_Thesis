import classNames from "classnames/bind";
import Calendar from "~/components/Calendar";
import styles from "~/pages/PrivateCouple/Anniversary/Anniversary.module.scss"
import images from "~/assets/images";

const cx = classNames.bind(styles);

function Anniversary() {
    return (
        <div className={cx('divide-column')}>
            <div className={cx('wrapper-newAnni')}>
                <div className={cx('container-newAnni')}>
                    <div className={cx('intro-newAnni')}>
                        <div className={cx('addNewAnni')}>
                            <div className={cx('new-diary')}>
                                <div className={cx('new-diary-sub')}>
                                    <div className={cx('new-diary-flex')}>
                                        <div className={cx('content')}>
                                            <div className={cx('avatar-new-diary')}>
                                                <img src={images.login_image} alt="" />
                                            </div>
                                            <div className={cx('content-new-diary')}
                                            // onClick={() => setShowModalNewDiary(true)}
                                            >
                                                <div className={cx('title')}>
                                                    <span>Add new anniversary</span>
                                                </div>
                                                <div className={cx('overlay')} ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('listAnni')}>
                            <div className={cx('actions-with-anni')}>
                                <div className={cx('action')}>
                                    <span>All</span>
                                </div>
                                <div className={cx('action')}>
                                    <span>Past</span>
                                </div>
                                <div className={cx('action')}>
                                    <span>Future</span>
                                </div>
                            </div>
                            <div className={cx('list-of-annies')}>
                                <div className={cx('anniItem')}>
                                    <div className={cx('row')}>
                                        <div className={cx('nameAnni')}>
                                            <span>
                                                Start love date  {/* Maximum 44 characters */}
                                            </span>
                                        </div>
                                        <div className={cx('descipAnni')}>
                                            <span>
                                                This is the date we love
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('row')}>
                                        <div className={cx('countDayFuture')}>
                                            <span>
                                                <span className={cx('number')}>8</span>
                                                &nbsp;days left
                                                </span>
                                        </div>
                                    </div>


                                </div>
                                <div className={cx('anniItem')}>
                                    <div className={cx('row')}>
                                        <div className={cx('nameAnni')}>
                                            <span>
                                                Start love date Start love date Start love s
                                            </span>
                                        </div>
                                        <div className={cx('descipAnni')}>
                                            <span>
                                                This is the date we love
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('row')}>
                                        <div className={cx('countDayFuture')}>
                                            <span>
                                                <span className={cx('number')}>8</span>
                                                &nbsp;days left
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('anniItem')}>
                                    <div className={cx('row')}>
                                        <div className={cx('nameAnni')}>
                                            <span>
                                                Start love date
                                            </span>
                                        </div>
                                        <div className={cx('descipAnni')}>
                                            <span>
                                                This is the date we love
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('row')}>
                                        <div className={cx('countDayFuture')}>
                                            <span>
                                                <span className={cx('number')}>8</span>
                                                &nbsp;days left
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('anniItem')}>
                                    <div className={cx('row')}>
                                        <div className={cx('nameAnni')}>
                                            <span>
                                                Start love date
                                            </span>
                                        </div>
                                        <div className={cx('descipAnni')}>
                                            <span>
                                                This is the date we love
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('row')}>
                                        <div className={cx('countDayFuture')}>
                                            <span>
                                                <span className={cx('number')}>8</span>
                                                &nbsp;days left
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('anniItem')}>
                                    <div className={cx('row')}>
                                        <div className={cx('nameAnni')}>
                                            <span>
                                                Start love date
                                            </span>
                                        </div>
                                        <div className={cx('descipAnni')}>
                                            <span>
                                                This is the date we love
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('row')}>
                                        <div className={cx('countDayFuture')}>
                                            <span>
                                                <span className={cx('number')}>8</span>
                                                &nbsp;days left
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('anniItem')}>
                                    <div className={cx('row')}>
                                        <div className={cx('nameAnni')}>
                                            <span>
                                                Start love date
                                            </span>
                                        </div>
                                        <div className={cx('descipAnni')}>
                                            <span>
                                                This is the date we love
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('row')}>
                                        <div className={cx('countDayFuture')}>
                                            <span>
                                                <span className={cx('number')}>8</span>
                                                &nbsp;days left
                                                </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('diary-post')}>
                    <div className={cx('diary-post-sub')}>
                        <div className={cx('sub')}>
                            <div className={cx('diary-first')}>
                                <Calendar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Anniversary;