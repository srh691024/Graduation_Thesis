import classNames from "classnames/bind";
import styles from "~/pages/Settings/AccountPassword/AccountPassword.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ModalChangePassword } from "~/components";

const cx = classNames.bind(styles);

function AccountPassword() {
    const [showModalChangePass, setShowModalChangePass] = useState(false)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-one')}>
                <div className={cx('header-edit-profile')}>
                    <div className={cx('header-edit-profile-one')}>
                        <div className={cx('header-edit-profile-two')}>
                            <span>Manage account</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('sub-content')}>
                        <div className={cx('header-sub-content')}>
                            <div className={cx('header-sub-content-one')}>
                                <div className={cx('header-sub-content-two')}>
                                    <div className={cx('header-sub-content-three')}>
                                        <span>Login & recovery</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('list-content')} onClick={() => setShowModalChangePass(true)}>
                            <div className={cx('list-content-title')}>Change password</div>
                            <div className={cx('list-content-icon')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
                            </div>
                        </div>
                        {showModalChangePass && createPortal(
                            <ModalChangePassword onClose={() => setShowModalChangePass(false)} />,
                            document.body
                        )}
                    </div>
                    <div className={cx('sub-content')}>
                        <div className={cx('header-sub-content')}>
                            <div className={cx('header-sub-content-one')}>
                                <div className={cx('header-sub-content-two')}>
                                    <div className={cx('header-sub-content-three')}>
                                        <span>Account control</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('list-content')}>
                            <div className={cx('list-content-title')}>Delete account</div>
                            <div className={cx('list-content-icon')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountPassword;