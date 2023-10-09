import classNames from "classnames/bind";
import styles from "~/pages/Settings/EditProfile/EditProfile.module.scss"
import images from "~/assets/images";

const cx = classNames.bind(styles)

function EditProfile() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-one')}>
                <div className={cx('header-edit-profile')}>
                    <div className={cx('header-edit-profile-one')}>
                        <div className={cx('header-edit-profile-two')}>
                            <span>Edit profile</span>
                        </div>
                    </div>
                </div>
                <div className={cx('avatar-name')}>
                    <div className={cx('avatar')}>
                        <div className={cx('avatar-one')}>
                            <button>
                                <img src={images.login_image} alt="" />
                            </button>
                            <div className={cx('form-avatar')}>
                                <form encType="multipart/form-data">
                                    <input accept="image/jpeg, image/png, image/jpg" type="file" />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className={cx('name-change-avatar')}>
                        <div className={cx('name-change-avatar-one')}>
                            <span>gnoud.nouz</span>
                        </div>
                        <div className={cx('name-change-avatar-two')}>Change profile photo</div>
                        <div className={cx('form-avatar')}>
                            <form encType="multipart/form-data">
                                <input accept="image/jpeg, image/png, image/jpg" type="file" />
                            </form>
                        </div>
                    </div>
                </div>
                <div className={cx('about-you')}>
                    <div className={cx('about-you-one')}>
                        <div className={cx('about-you-two')}>
                            <span>About you</span>
                        </div>
                    </div>
                </div>
                <form className={cx('information')} >
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>Email</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <input disabled placeholder="hakuhanzi@gmail.com" type="text" />
                                <div className={cx('description')}>
                                    <div className={cx('description-one')}>
                                        <span>Each email uniquely identifies an account.
                                            You cannot change the email if the account has been
                                            registered with this email.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>Username</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <input type="text" />
                                <div className={cx('description')}>
                                    <div className={cx('description-one')}>
                                        <span>Username can contain only letters, numbers, underscores,
                                            and periods. You can change your username once every 30 days.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>Name</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <input type="text" />
                                <div className={cx('description')}>
                                    <div className={cx('description-one')}>
                                        <span>You nickname can only be changed once every 7 days.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>Phone</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                    <div className={cx('gender')}>
                        <div className={cx('gender-one')}>
                            <div className={cx('sub-infor')}>
                                <aside>
                                    <label>Gender</label>
                                </aside>
                                <div className={cx('input-infor')}>
                                    <div className={cx('input-infor-email')}>
                                        <button type="button" className={cx('gender-button')}>
                                            <input type="text" value="Female" />
                                        </button>
                                        <div className={cx('description')}>
                                            <div className={cx('description-one')}>
                                                <span>This won't be part of your public profile.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>Date of birth</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <input type="date" />
                            </div>
                        </div>
                    </div>
                    <div className={cx('about-you')}>
                        <div className={cx('about-you-one')}>
                            <div className={cx('about-you-two')}>
                                <span>Social</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>Facebook</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <input placeholder="Add Facebook" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>Instagram</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <input placeholder="Add Instagram" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>TikTok</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <input placeholder="Add TikTok" type="text" />
                            </div>
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label></label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('submit-button')}>
                                <div className={cx('submit-button-one')}>
                                    <span>Submit</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>



            </div>
        </div>
    );
}

export default EditProfile;