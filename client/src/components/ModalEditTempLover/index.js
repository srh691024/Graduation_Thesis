import classNames from "classnames/bind";
import styles from '~/components/ModalEditTempLover/ModalEditTempLover.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from "moment";
import * as coupleServices from '~/services/coupleServices'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import PreviewImage from "../PreviewImage";

const cx = classNames.bind(styles)
const horoscope = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']

function ModalEditTempLover({ infoCouple, onClose }) {
    const formik = useFormik({
        initialValues: {
            tempAvatarLover: infoCouple.tempAvatarLover || '',
            tempDobLover: moment(infoCouple?.tempDobLover).format('yyyy-MM-DD') || '',
            tempNameLover: infoCouple.tempNameLover || '',
            tempHoroscope: infoCouple.tempHoroscope || '',
            tempAvatarLoverName: infoCouple.tempAvatarLoverName || '',
        },
        validationSchema: Yup.object({
            tempAvatarLover: Yup.mixed(),
            tempDobLover: Yup.date().max(new Date(), 'Date of birth must not be greater than the current date'),
            tempNameLover: Yup.string().max(44, 'Your lover name is too long'),
            tempHoroscope: Yup.string()
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('tempAvatarLover', values.tempAvatarLover);
            formData.append('tempDobLover', values.tempDobLover);
            formData.append('tempNameLover', values.tempNameLover);
            formData.append('tempHoroscope', values.tempHoroscope);
            formData.append('tempAvatarLoverName', values.tempAvatarLoverName);
            formData.forEach(function (value, key) {
                console.log(key, value);
            });

            await coupleServices.apiEditTempLoverUser(infoCouple._id, formData);
            onClose()
        }
    })
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-modal')}>
                <div className={cx('wrapper-one')}>
                    <div className={cx('overlay')}></div>
                    <div className={cx('modal')}>
                        <div className={cx('modal-one')}>
                            <div className={cx('modal-two')}>
                                <div className={cx('modal-start')}>
                                    <div className={cx('form')}>
                                        <div className={cx('form-one')}>
                                            <div className={cx('form-two')}>
                                                <div className={cx('form-three')}>
                                                    <div className={cx('create')}>
                                                        <div className={cx('create-one')}>
                                                            <div className={cx('create-two')}>
                                                                <div className={cx('create-three')}>
                                                                    <h1>
                                                                        <div className={cx('title')}>Edit your lover information</div>
                                                                    </h1>
                                                                </div>
                                                                <div className={cx('back')} onClick={onClose}>
                                                                    <div className={cx('exit-one')}>
                                                                        <div className={cx('exit-two')}>
                                                                            <div className={cx('exit-three')}>
                                                                                <span>
                                                                                    <FontAwesomeIcon className={cx('icon')} icon={faChevronLeft} />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('content')}>
                                                        <div className={cx('avatar-name')}>
                                                            <div className={cx('avatar')}>
                                                                <div className={cx('avatar-one')}>
                                                                    <button>

                                                                        <PreviewImage file={formik.values.tempAvatarLover} />
                                                                    </button>

                                                                </div>
                                                            </div>
                                                            <div className={cx('name-change-avatar')}>
                                                                <div className={cx('name-change-avatar-one')}>
                                                                    <span>{infoCouple?.tempNameLover}</span>
                                                                </div>
                                                                <div className={cx('name-change-avatar-two')}>Change profile photo</div>
                                                                <div className={cx('form-avatar')}>
                                                                    <form encType="multipart/form-data">
                                                                        <input name="tempAvatarLover" onChange={(e) => (formik.setFieldValue('tempAvatarLover', e.target.files[0]))} accept="image/jpeg, image/png, image/jpg" type="file" />
                                                                    </form>
                                                                </div>
                                                                {
                                                                    formik.errors.tempAvatarLover && formik.touched.tempAvatarLover && (
                                                                        <small className={cx('validate-login')}>{formik.errors.tempAvatarLover}</small>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        <form className={cx('information')} >
                                                            <div className={cx('sub-infor', 'startLoveDate')}>
                                                                <aside>
                                                                    <label>Date of birth</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <input name="tempDobLover" type="date" value={formik.values.tempDobLover} onChange={formik.handleChange} />
                                                                    </div>
                                                                    {
                                                                        formik.errors.tempDobLover && formik.touched.tempDobLover && (
                                                                            <small className={cx('validate-login')}>{formik.errors.tempDobLover}</small>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className={cx('sub-infor')}>
                                                                <aside>
                                                                    <label>Lover name</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <input name="tempNameLover" value={formik.values.tempNameLover} onChange={formik.handleChange} type="text" />
                                                                        <div className={cx('description')}>
                                                                            <div className={cx('description-one')}>
                                                                                <span>If you don't set a couple's name, your username will be your couple's name.
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            formik.errors.tempNameLover && formik.touched.tempNameLover && (
                                                                                <small className={cx('validate-login')}>{formik.errors.tempNameLover}</small>
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
                                                                        <select name="tempHoroscope" value={formik.values.tempHoroscope} onChange={formik.handleChange}>
                                                                            {horoscope.map(el => (
                                                                                <option key={el} value={el}>
                                                                                    {el}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                        {
                                                                            formik.errors.tempHoroscope && formik.touched.tempHoroscope && (
                                                                                <small className={cx('validate-login')}>{formik.errors.tempHoroscope}</small>
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
                                                                    <div className={cx('submit-button')}>
                                                                        <div className={cx('submit-button-one')} onClick={formik.handleSubmit}>
                                                                            <span>Submit</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalEditTempLover;