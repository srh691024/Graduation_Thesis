import classNames from "classnames/bind";
import config from "~/config";
import styles from "~/layouts/components/SidebarSetting/SidebarSetting.module.scss"
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function SidebarSetting() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-one')}>
                <div className={cx('wrapper-two')}>
                    <div className={cx('wrapper-three')}>
                        <div className={cx('wrapper-four')}>
                            <div className={cx('header-setting')}>
                                <span>Settings</span>
                            </div>
                            <div className={cx('sub-edit')}>
                                <Link to={config.routes.settingEditProfile} >
                                    <div className={cx('text-sub-edit')}>
                                        <div className={cx('text-sub-edit-one')}>
                                            <div className={cx('text-sub-edit-two')}>
                                                <div className={cx('text-sub-edit-three')}>
                                                    <div className={cx('text-sub-edit-four')}>
                                                        <div className={cx('text-sub-edit-five')}>
                                                            <span>Edit profile</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('hover-sub-edit')}></div>
                                </Link>
                            </div>
                            <div className={cx('sub-edit')}>
                                <Link to={config.routes.settingAccountPassword} >
                                    <div className={cx('text-sub-edit')}>
                                        <div className={cx('text-sub-edit-one')}>
                                            <div className={cx('text-sub-edit-two')}>
                                                <div className={cx('text-sub-edit-three')}>
                                                    <div className={cx('text-sub-edit-four')}>
                                                        <div className={cx('text-sub-edit-five')}>
                                                            <span>Account and password</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('hover-sub-edit')}></div>
                                </Link>
                            </div>
                            <div className={cx('sub-edit')}>
                                <Link to={config.routes.settingPushNotifications} >
                                    <div className={cx('text-sub-edit')}>
                                        <div className={cx('text-sub-edit-one')}>
                                            <div className={cx('text-sub-edit-two')}>
                                                <div className={cx('text-sub-edit-three')}>
                                                    <div className={cx('text-sub-edit-four')}>
                                                        <div className={cx('text-sub-edit-five')}>
                                                            <span>Push notifications</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('hover-sub-edit')}></div>
                                </Link>
                            </div>
                            <div className={cx('sub-edit')}>
                                <Link to={config.routes.settingCommentControl} >
                                    <div className={cx('text-sub-edit')}>
                                        <div className={cx('text-sub-edit-one')}>
                                            <div className={cx('text-sub-edit-two')}>
                                                <div className={cx('text-sub-edit-three')}>
                                                    <div className={cx('text-sub-edit-four')}>
                                                        <div className={cx('text-sub-edit-five')}>
                                                            <span>Comment control</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('hover-sub-edit')}></div>
                                </Link>
                            </div>
                            <div className={cx('sub-edit')}>
                                <Link to={config.routes.settingHelp} >
                                    <div className={cx('text-sub-edit')}>
                                        <div className={cx('text-sub-edit-one')}>
                                            <div className={cx('text-sub-edit-two')}>
                                                <div className={cx('text-sub-edit-three')}>
                                                    <div className={cx('text-sub-edit-four')}>
                                                        <div className={cx('text-sub-edit-five')}>
                                                            <span>Help</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('hover-sub-edit')}></div>
                                </Link>
                            </div>
                            <div className={cx('header-setting')}>
                                <span>Couple</span>
                            </div>
                            <div className={cx('sub-edit')}>
                                <Link to={config.routes.settingEditProfile} >
                                    <div className={cx('text-sub-edit')}>
                                        <div className={cx('text-sub-edit-one')}>
                                            <div className={cx('text-sub-edit-two')}>
                                                <div className={cx('text-sub-edit-three')}>
                                                    <div className={cx('text-sub-edit-four')}>
                                                        <div className={cx('text-sub-edit-five')}>
                                                            <span>Connect with your lover</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('hover-sub-edit')}></div>
                                </Link>
                            </div>
                            <div className={cx('sub-edit')}>
                                <Link to={config.routes.settingEditProfile} >
                                    <div className={cx('text-sub-edit')}>
                                        <div className={cx('text-sub-edit-one')}>
                                            <div className={cx('text-sub-edit-two')}>
                                                <div className={cx('text-sub-edit-three')}>
                                                    <div className={cx('text-sub-edit-four')}>
                                                        <div className={cx('text-sub-edit-five')}>
                                                            <span>View connection history</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('hover-sub-edit')}></div>
                                </Link>
                            </div>
                            <div className={cx('sub-edit')}>
                                <Link to={config.routes.settingEditProfile} >
                                    <div className={cx('text-sub-edit')}>
                                        <div className={cx('text-sub-edit-one')}>
                                            <div className={cx('text-sub-edit-two')}>
                                                <div className={cx('text-sub-edit-three')}>
                                                    <div className={cx('text-sub-edit-four')}>
                                                        <div className={cx('text-sub-edit-five')}>
                                                            <span>Disconnect with lover</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('hover-sub-edit')}></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarSetting;