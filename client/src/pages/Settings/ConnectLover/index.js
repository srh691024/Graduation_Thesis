import classNames from "classnames/bind";
import styles from "~/pages/Settings/ConnectLover/ConnectLover.module.scss"
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ConnectLover() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-one')}>
                <div className={cx('header-edit-profile')}>
                    <div className={cx('header-edit-profile-one')}>
                        <div className={cx('header-edit-profile-two')}>
                            <span>Manage connection</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('button-or-link')}>
                        <div className={cx('button-send-link')}>Send connection invitation</div>
                        <div className={cx('or')}>Or</div>
                        <div className={cx('enter-link')}>
                            <input type="text" placeholder="Enter the connection code" />
                        </div>
                    </div>

                    {/* Have request lover connection */}
                    {/* <div className={cx('after-send-link')}>
                        <div className={cx('after-send-link-one')}>
                            <div className={cx('icon-envelope')}>
                                <img src={images.envelopeHeart} alt="" />
                            </div>
                            <div className={cx('description-icon-first')}>Connection awaiting. . .</div>
                            <div className={cx('description-icon-second')}>Waiting for the other party to accept the connection invitation</div>
                            <div className={cx('time-expired')}>
                                <div className={cx('time-expired-one')}>This invitation will automatically expire after 24 hours from the time you sent it.
                                    You can cancel the invitation and send a new link before the other party accepts.</div>
                                <div className={cx('time-expired-two')}>
                                    <div className={cx('icon-time')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faClockRotateLeft} />
                                    </div>
                                    <div className={cx('letter')}>The invitation will expire at &nbsp;</div>
                                    <div className={cx('date')}>12:00, October 15, 2023</div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('button-cancel-link')}>Cancel the invitation</div>
                    </div> */}

                    {/* Dont have connection */}
                    {/* <div className={cx('after-send-link')}>
                        <div className={cx('after-send-link-one')}>
                            <div className={cx('icon-envelope')}>
                                <img src={images.noConnection} alt="" />
                            </div>
                            <div className={cx('description-icon-first')}>There are no connections</div>
                        </div>
                    </div> */}

                    {/* Have a connection */}
                    <div className={cx('have-connection')}>
                        <div className={cx('have-connection-one')}>
                            <div className={cx('from-date')}>
                                <div className={cx('date')}>From 10, October, 2023</div>
                                <div className={cx('icon-option')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                </div>
                            </div>
                            <div className={cx('connected-with')}>Connected with Choun</div>
                            <div className={cx('avatar-partner')}>
                                <div className={cx('avatar-name')}>
                                    <div className={cx('avatar')}>
                                        <img src={images.login_image} alt=""/>
                                    </div>
                                    <div className={cx('name')}>Thuy Duong</div>
                                </div>
                                <div className={cx('heart')}>
                                    <img src={images.hearts} alt=""/>
                                </div>
                                <div className={cx('avatar-name')}>
                                    <div className={cx('avatar')}>
                                    <img src={images.login_image} alt=""/>
                                    </div>
                                    <div className={cx('name')}>Thuy Duong</div>
                                </div>
                            </div>
                            <div className={cx('image-kiss')}>
                                <img src={images.kiss} alt=""/>
                            </div>
                        </div>
                    </div>

                    {/* Note connections */}
                    <div className={cx('note-when-connect')}>
                        <div className={cx('note-when-connect-one')}>
                            <div className={cx('header')}>Connect and start with Love Diary</div>
                            <div className={cx('note')}>
                                <div className={cx('icon-note')}>
                                    <img src={images.notebook} alt="" />
                                </div>
                                <div className={cx('letter')}>Record and share memories with accompanying photos.</div>
                            </div>
                            <div className={cx('note')}>
                                <div className={cx('icon-note')}>
                                    <img src={images.notification} alt="" />
                                </div>
                                <div className={cx('letter')}>Update on the latest activities (todolist, anniversary)
                                    and comment on each other's latest updates through notifications.</div>
                            </div>
                            <div className={cx('note')}>
                                <div className={cx('icon-note')}>
                                    <img src={images.socialService} alt="" />
                                </div>
                                <div className={cx('letter')}>Share your love story with the community of other loving couples.</div>
                            </div>
                            <div className={cx('note')}>
                                <div className={cx('icon-note')}>
                                    <img src={images.databaseManage} alt="" />
                                </div>
                                <div className={cx('letter')}>All your records are securely saved.
                                    Even if the connection is discontinued,
                                    you can still restore the data within 30 days by logging into your old account.</div>
                            </div>
                        </div>
                        <div className={cx('note-when-connect-two')}>
                            <div className={cx('note-one')}>Note</div>
                            <ul>
                                <li>Connect is a feature that allows couples to share common data while using Love Diary, so both of you can see and comment on each other's activities.</li>
                                <li>If the connection invitation doesn't work, please enter the connection code directly provided in the message containing the link.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConnectLover;