import classNames from "classnames/bind";
import styles from "~/pages/Settings/EditProfile/EditProfile.module.scss"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { PreviewImage } from "~/components";
import * as userServices from '~/services/userServices';
import { useDispatch } from "react-redux";
import { getCurrentUser } from "~/store/user/asyncAction";

const cx = classNames.bind(styles)
const horoscope = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']

function EditProfile() {
    const { current } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            avatarUser: current.avatar || '',
            username: current.username || '',
            name: current.name || '',
            phone: current.phone || '',
            gender: current.gender || '',
            dob: current.dob || '',
            horoscope: current.horoscope || '',
            address: current.address || '',
            facebookLink: current.facebookLink || '',
            tiktokLink: current.tiktokLink || '',
            instagramLink: current.instagramLink || '',
        },
        validationSchema: Yup.object({
            avatarUser: Yup.mixed(),
            username: Yup.string().max(44, 'Your username is too long'),
            name: Yup.string().max(44, 'Your name is too long'),
            phone: Yup.string()
                .matches(/^[0-9]+$/, 'The phone number must contain only digits')
                .min(10, 'The phone number must have at least 10 digits')
                .max(12, 'The phone number cannot be longer than 12 digits'),
            gender: Yup.string().max(30, 'Your gender is too long'),
            dob: Yup.date().max(new Date(), 'Your date of birth must not be later than today'),
            address: Yup.string().max(200, 'Your address is too long'),
            facebookLink: Yup.string().max(200, 'Your facebook link is too long'),
            tiktokLink: Yup.string().max(200, 'Your tiktok link is too long'),
            instagramLink: Yup.string().max(200, 'Your instagram link is too long'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('avatarUser', values.avatarUser);
            formData.append('username', values.username);
            formData.append('name', values.name);
            formData.append('phone', values.phone);
            formData.append('gender', values.gender);
            formData.append('dob', values.dob);
            formData.append('address', values.address);
            formData.append('facebookLink', values.facebookLink);
            formData.append('tiktokLink', values.tiktokLink);
            formData.append('instagramLink', values.instagramLink);
            formData.append('avatarname', current.avatarname);
            formData.append('horoscope', values.horoscope);
            formData.forEach(function (value, key) {
                console.log(key, value);
            });

            const response = await userServices.apiUpdateUser(formData)
            if (response.success) dispatch(getCurrentUser())
        }
    })

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
                                <PreviewImage file={formik.values.avatarUser} />
                            </button>
                        </div>
                    </div>
                    <div className={cx('name-change-avatar')}>
                        <div className={cx('name-change-avatar-one')}>
                            <span>{current.name}</span>
                        </div>
                        <div className={cx('name-change-avatar-two')}>Change profile photo</div>
                        <div className={cx('form-avatar')}>
                            <form encType="multipart/form-data">
                                <input name="avatarUser" accept="image/jpeg, image/png, image/jpg" onChange={(e) => (formik.setFieldValue('avatarUser', e.target.files[0]))} type="file" />
                            </form>
                        </div>
                        {
                            formik.errors.avatarUser && formik.touched.avatarUser && (
                                <small className={cx('validate-login')}>{formik.errors.avatarUser}</small>
                            )
                        }
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
                                <input disabled value={current.email} type="text" />
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
                                <input name="username" value={formik.values.username} onChange={formik.handleChange} type="text" />
                                <div className={cx('description')}>
                                    <div className={cx('description-one')}>
                                        <span>Username can contain only letters, numbers, underscores,
                                            and periods.
                                        </span>
                                    </div>
                                </div>
                                {
                                    formik.errors.username && formik.touched.username && (
                                        <small className={cx('validate-login')}>{formik.errors.username}</small>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>Name</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <input name="name" value={formik.values.name} onChange={formik.handleChange} type="text" />
                                <div className={cx('description')}>
                                    <div className={cx('description-one')}>
                                        <span>If you don't set a couple's name, your username will be your couple's name.
                                        </span>
                                    </div>
                                </div>
                                {
                                    formik.errors.name && formik.touched.name && (
                                        <small className={cx('validate-login')}>{formik.errors.name}</small>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>Phone</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <input name="phone" value={formik.values.phone} onChange={formik.handleChange} type="text" />
                                {
                                    formik.errors.phone && formik.touched.phone && (
                                        <small className={cx('validate-login')}>{formik.errors.phone}</small>
                                    )
                                }
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
                                            <input name="gender" type="text" value={formik.values.gender} onChange={formik.handleChange} />
                                        </button>
                                        <div className={cx('description')}>
                                            <div className={cx('description-one')}>
                                                <span>This won't be part of your public profile.
                                                </span>
                                            </div>
                                        </div>
                                        {
                                            formik.errors.gender && formik.touched.gender && (
                                                <small className={cx('validate-login')}>{formik.errors.gender}</small>
                                            )
                                        }
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
                                <input name="dob" value={formik.values.dob} onChange={formik.handleChange} type="date" />
                                {
                                    formik.errors.dob && formik.touched.dob && (
                                        <small className={cx('validate-login')}>{formik.errors.dob}</small>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>Horoscope</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <select name="horoscope" value={formik.values.horoscope} onChange={formik.handleChange}>
                                    {horoscope.map(el => (
                                        <option key={el} value={el}>
                                            {el}
                                        </option>
                                    ))}
                                </select>
                                {
                                    formik.errors.horoscope && formik.touched.horoscope && (
                                        <small className={cx('validate-login')}>{formik.errors.horoscope}</small>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>Address</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <textarea name='address' value={formik.values.address} onChange={formik.handleChange} placeholder="Add your address"></textarea>
                            </div>
                            {
                                formik.errors.address && formik.touched.address && (
                                    <small className={cx('validate-login')}>{formik.errors.address}</small>
                                )
                            }
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
                                <input name="facebookLink" value={formik.values.facebookLink} onChange={formik.handleChange} placeholder="Add Facebook" type="text" />
                                {
                                    formik.errors.facebookLink && formik.touched.facebookLink && (
                                        <small className={cx('validate-login')}>{formik.errors.facebookLink}</small>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>Instagram</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <input name="instagramLink" value={formik.values.instagramLink} onChange={formik.handleChange} placeholder="Add Instagram" type="text" />
                                {
                                    formik.errors.instagramLink && formik.touched.instagramLink && (
                                        <small className={cx('validate-login')}>{formik.errors.instagramLink}</small>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label>TikTok</label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('input-infor-email')}>
                                <input name="tiktokLink" value={formik.values.tiktokLink} onChange={formik.handleChange} placeholder="Add TikTok" type="text" />
                                {
                                    formik.errors.tiktokLink && formik.touched.tiktokLink && (
                                        <small className={cx('validate-login')}>{formik.errors.tiktokLink}</small>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className={cx('sub-infor')}>
                        <aside>
                            <label></label>
                        </aside>
                        <div className={cx('input-infor')}>
                            <div className={cx('submit-button')} onClick={formik.handleSubmit}>
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