import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from '~/components/ModalEditInfoCouple/ModalEditInfoCouple.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PreviewImage from "../PreviewImage";
import moment from "moment";
import * as coupleServices from '~/services/coupleServices'
import { useDispatch } from "react-redux";
import { logout } from "~/store/user/userSlice";
import { useNavigate } from "react-router-dom";
import config from "~/config";
import Swal from "sweetalert2";

const cx = classNames.bind(styles)

function ModalEditInfoCouple({ infoCouple, onClose }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            imageCouple: infoCouple.avatarCouple || '',
            startLoveDate: moment(infoCouple?.startLoveDate).format('yyyy-MM-DD') || '',
            nameCouple: infoCouple.nameCouple || '',
            usernameCouple: infoCouple.userNameCouple || '',
            biography: infoCouple.biography || '',
            imagename: infoCouple.avatarCouplename || '',
        },
        validationSchema: Yup.object({
            imageCouple: Yup.mixed(),
            startLoveDate: Yup.date().required('Please set the start love date').max(new Date(), 'Start love date must not be later than the current date'),
            nameCouple: Yup.string().max(44, 'Your name is too long'),
            usernameCouple: Yup.string().required('Username is required').max(30, 'Username is too long')
                .matches(/^\S*$/, 'Username must not contain spaces'),
            biography: Yup.string().max(200, 'Biography is too long')
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('imageCouple', values.imageCouple);
            formData.append('startLoveDate', values.startLoveDate);
            formData.append('nameCouple', values.nameCouple);
            formData.append('usernameCouple', values.usernameCouple);
            formData.append('biography', values.biography);
            formData.append('imagename', values.imagename);
            formData.forEach(function (value, key) {
                console.log(key, value);
            });
            const response = await coupleServices.apiEditInfoCouple(infoCouple._id, formData);
            if (response.result.userNameCouple !== infoCouple.userNameCouple) {
                Swal.fire('Notification', "You have changed your username of your couple so you need to login again.", 'info').then(() => {
                    dispatch(logout());
                    navigate(`${config.routes.login}`);
                })
            }
            onClose()

        }
    })
    // useEffect(() => dispatch(getCurrentCouple()),[dispatch])
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
                                                                        <div className={cx('title')}>Edit your couple information</div>
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
                                                                        <PreviewImage file={formik.values.imageCouple} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className={cx('name-change-avatar')}>
                                                                <div className={cx('name-change-avatar-one')}>
                                                                    <span>{infoCouple?.nameCouple}</span>
                                                                </div>
                                                                <div className={cx('name-change-avatar-two')}>Change profile photo</div>
                                                                <div className={cx('form-avatar')}>
                                                                    <form encType="multipart/form-data">
                                                                        <input 
                                                                        name="imageCouple" 
                                                                        onChange={(e) => (formik.setFieldValue('imageCouple', e.target.files[0]))} 
                                                                        accept="image/jpeg, image/png, image/jpg" 
                                                                        type="file" />
                                                                    </form>
                                                                </div>
                                                                {
                                                                    formik.errors.imageCouple && formik.touched.imageCouple && (
                                                                        <small className={cx('validate-login')}>{formik.errors.imageCouple}</small>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        <form className={cx('information')} >
                                                            <div className={cx('sub-infor', 'startLoveDate')}>
                                                                <aside>
                                                                    <label>Start Love date</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <input name="startLoveDate" type="date" value={formik.values.startLoveDate} onChange={formik.handleChange} />
                                                                    </div>
                                                                    {
                                                                        formik.errors.startLoveDate && formik.touched.startLoveDate && (
                                                                            <small className={cx('validate-login')}>{formik.errors.startLoveDate}</small>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className={cx('sub-infor')}>
                                                                <aside>
                                                                    <label>Name couple</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <input name="nameCouple" value={formik.values.nameCouple} onChange={formik.handleChange} type="text" />
                                                                        <div className={cx('description')}>
                                                                            <div className={cx('description-one')}>
                                                                                <span>If you don't set a couple's name, your username will be your couple's name.
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            formik.errors.nameCouple && formik.touched.nameCouple && (
                                                                                <small className={cx('validate-login')}>{formik.errors.nameCouple}</small>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={cx('sub-infor')}>
                                                                <aside>
                                                                    <label>Username couple</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <input name="usernameCouple" value={formik.values.usernameCouple} onChange={formik.handleChange} type="text" />
                                                                        <div className={cx('description')}>
                                                                            <div className={cx('description-one')}>
                                                                                <span>Username can contain only letters, numbers, underscores,
                                                                                    and periods. For example: https:lodi-lovediary.com/diarypost/usernamecouple
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            formik.errors.usernameCouple && formik.touched.usernameCouple && (
                                                                                <small className={cx('validate-login')}>{formik.errors.usernameCouple}</small>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={cx('sub-infor', 'biography')}>
                                                                <aside>
                                                                    <label>Biography</label>
                                                                </aside>
                                                                <div className={cx('input-infor')}>
                                                                    <div className={cx('input-infor-email')}>
                                                                        <textarea name='biography' value={formik.values.biography} onChange={formik.handleChange} placeholder="Add biography of your couple"></textarea>
                                                                    </div>
                                                                    {
                                                                        formik.errors.biography && formik.touched.biography && (
                                                                            <small className={cx('validate-login')}>{formik.errors.biography}</small>
                                                                        )
                                                                    }
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

export default ModalEditInfoCouple;