import classNames from "classnames/bind";
import styles from "~/pages/Settings/Help/Help.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Help() {
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
                        <div className={cx('list-content-one')}>
                            <div className={cx('list-content-title')}>Report a problem</div>
                            <div className={cx('list-content-icon')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
                            </div>
                        </div>
                        {/* <div className={cx('list-content-one')}>
                            <div className={cx('sub-descrip')}>These are reports you've submitted.</div>
                        </div> */}
                    </div>
                    <div className={cx('list-content')}>
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
                    <div className={cx('list-content')}>
                        <div className={cx('list-content-one')}>
                            <div className={cx('list-content-title')}>Report a problem</div>
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