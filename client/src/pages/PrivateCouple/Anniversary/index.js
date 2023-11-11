import classNames from "classnames/bind";
import Calendar from "~/components/Calendar";
import styles from "~/pages/PrivateCouple/Anniversary/Anniversary.module.scss"
import images from "~/assets/images";
import { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

function Anniversary() {
    const { usernameCouple } = useParams()
    const [dataFromCalendar, setDataFromCalendar] = useState([]);
    const {couple} = useSelector(state=> state.couple)
    

    const handleDataFromCalendar = (data) => {
        setDataFromCalendar(data);
    }
    if(couple.userNameCouple !== usernameCouple){
        Swal.fire('Warning!', 'Can not see this page of other couple', 'warning')
        return <Navigate to={`/diarypost/${couple.userNameCouple}`} />
    }
    
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
                                            <div className={cx('content-new-diary')}>
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
                                {dataFromCalendar.map((item, index) =>
                                    <div className={cx('anniItem')} key={index} style={{ backgroundColor: item.color }}>
                                        <div className={cx('row')}>
                                            <div className={cx('nameAnni')}>
                                                <span>
                                                    {item.title}
                                                </span>
                                            </div>
                                            <div className={cx('descipAnni')}>
                                                <span>
                                                    {item.description}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx('row')}>
                                            <div className={cx('countDayFuture')}>
                                                {moment(moment(item.end).format('yyyy-MM-DD')).isSameOrAfter(moment(new Date()).format('yyyy-MM-DD')) ? moment(moment(new Date()).format('yyyy-MM-DD')).to(moment(item.end).format('yyyy-MM-DD')) : moment(moment(item.end).format('yyyy-MM-DD')).fromNow()}
                                                {/* <span>
                                                    <span className={cx('number')}>8</span>
                                                    &nbsp;days left
                                                </span> */}
                                            </div>
                                        </div>
                                    </div>
                                )}
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
                                <Calendar onDataPassed={handleDataFromCalendar} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Anniversary;