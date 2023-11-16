import classNames from "classnames/bind";
import styles from "~/pages/Settings/Help/Help.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ModalProblem, ModalResponseProblem } from "~/components";
import images from "~/assets/images";
import * as adminServices from '~/services/adminServices'
import moment from "moment";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

function Help() {
    const [showModalHelp, setShowModalHelp] = useState(false)
    const [report, setReport] = useState([])
    const [showModalResponse, setShowModalResponse] = useState(false)
    const [checkReport, setCheckReport] = useState(false)

    useEffect(() => {
        async function fetchReports() {
            const repsonse = await adminServices.apiGetReportByUser()
            setReport(repsonse.result)
        }
        fetchReports()
    }, [])
    const handleClickDeleteReport = async (reportId) => {
        const response = await adminServices.apiDeleteReport(reportId)
        if (response.success) {
            Swal.fire('Notify', response.result, 'success')
        } else {
            Swal.fire('Oops!', 'Can not delete the report', 'error')
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-one')}>
                <div className={cx('header-edit-profile')}>
                    <div className={cx('header-edit-profile-one')}>
                        <div className={cx('header-edit-profile-two')}>
                            <span>Help</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('list-content')}>
                        <div className={cx('list-content-one')} onClick={() => setShowModalHelp(true)}>
                            <div className={cx('list-content-title')}>Report a problem</div>
                            <div className={cx('list-content-icon')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
                            </div>
                        </div>
                    </div>
                    {showModalHelp && createPortal(
                        <ModalProblem onClose={() => setShowModalHelp(false)} />,
                        document.body
                    )}
                    <div className={cx('list-content')} onClick={() => setCheckReport(!checkReport)}>
                        <div className={cx('list-content-one')}>
                            <div className={cx('list-content-title')}>Reports</div>
                            <div className={cx('list-content-icon')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
                            </div>
                        </div>
                        <div className={cx('list-content-one')}>
                            <div className={cx('sub-descrip')}>These are reports you've submitted.</div>
                        </div>

                    </div>
                    {checkReport &&
                        <div className={cx('list-sub-noti')}>
                            <div className={cx('sub-noti')} >
                                {report.map((r) =>
                                    <div className={cx('sub-noti-one')} key={r._id}>
                                        <div className={cx('name-content')}>
                                            <span>
                                                {r.content}
                                                {/* &nbsp;- your lover liked our diary.&nbsp; */}
                                            </span>
                                            <span className={cx('date')}>
                                                &nbsp;
                                                •
                                                {moment(r.createdAt).format('DD/MM/YYYY')}
                                                {/* {moment(nc?.createdAt)?.fromNow()} */}
                                            </span>
                                        </div>
                                        {r.image &&
                                            <div className={cx('follow-or-img')}>
                                                <a href="/">
                                                    <img src={r.image} alt="" />
                                                </a>
                                            </div>
                                        }
                                        <div className={cx('buttonWrapper')}>
                                            {r.isResponsed &&
                                                <div className={cx('buttonSee')} onClick={() => setShowModalResponse(true)}>
                                                    <button>See detail</button>
                                                </div>
                                            }
                                            {showModalResponse && createPortal(
                                                <ModalResponseProblem report={r} onClose={() => setShowModalResponse(false)} />,
                                                document.body
                                            )}
                                            <div className={cx('buttonSee')} onClick={() => handleClickDeleteReport(r._id)}>
                                                <button className={cx('delete')}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                    <div className={cx('list-content')}>
                        <div className={cx('list-content-one')}>
                            <div className={cx('list-content-title')}>Reported post</div>
                            <div className={cx('list-content-icon')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
                            </div>
                        </div>
                        <div className={cx('list-content-one')}>
                            <div className={cx('sub-descrip')}>These are posts you've shared that go against our guidelines.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help;