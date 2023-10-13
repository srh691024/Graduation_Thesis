import classNames from "classnames/bind";
import styles from "~/pages/Settings/ViewHistory/ViewHistory.module.scss"
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ViewHistory() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-one')}>
                <div className={cx('header-edit-profile')}>
                    <div className={cx('header-edit-profile-one')}>
                        <div className={cx('header-edit-profile-two')}>
                            <span>Connection history</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>

                    {/* No connection */}
                    {/* <div className={cx('after-send-link')}>
                        <div className={cx('after-send-link-one')}>
                            <div className={cx('icon-envelope')}>
                                <img src={images.noConnection} alt="" />
                            </div>
                            <div className={cx('description-icon-first')}>There are no connections</div>
                        </div>
                    </div> */}

                    {/* Have connection */}
                    <div className={cx('have-connection')}>
                        <div className={cx('have-connection-one')}>
                            <div className={cx('from-date')}>
                                <div className={cx('date')}>From 10, October, 2023 to 11, October 2023</div>
                                <div className={cx('icon-option')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </div>
                            </div>
                            <div className={cx('connected-with')}>This connection history can be restored</div>
                            <div className={cx('button-restore')}>
                                <div className={cx('image-restore')}>
                                    <img src={images.recoveryConnection} alt="" />
                                    <div className={cx('description-restore')}>
                                        <span>You and &nbsp; 
                                            <span className={cx('specific-name')}>Choun &nbsp;</span>
                                            have disconnected.
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('button')}>
                                    <div className={cx('d-day')}>Expiration in D-29</div>
                                    <div className={cx('click')}>Restore the connection</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('have-connection')}>
                        <div className={cx('have-connection-one')}>
                            <div className={cx('from-date')}>
                                <div className={cx('date')}>From 10, October, 2023 to 11, October 2023</div>
                                <div className={cx('icon-option')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </div>
                            </div>
                            <div className={cx('connected-with')}>This connection history can be restored</div>
                            <div className={cx('button-restore')}>
                                <div className={cx('image-restore')}>
                                    <img src={images.recoveryConnection} alt="" />
                                    <div className={cx('description-restore')}>
                                        <span>You and &nbsp; 
                                            <span className={cx('specific-name')}>Choun &nbsp;</span>
                                            have disconnected.
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('button')}>
                                    <div className={cx('d-day')}>Expiration in D-29</div>
                                    <div className={cx('click')}>Restore the connection</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewHistory;