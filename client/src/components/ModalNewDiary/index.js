import classNames from "classnames/bind";
import styles from "~/components/ModalNewDiary/ModalNewDiary.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPhotoFilm, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import PreviewImage from "../PreviewImage";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as postServices from '../../services/postServices'


const cx = classNames.bind(styles);

function ModalNewDiary({ onClose }) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const formik = useFormik({
        initialValues: {
            images: [],
            content: '',
            mode: '',
            dateAnni: '',
        },
        validationSchema: Yup.object({
            images: Yup.array()
                .min(1, "Please select at least one image")
                .max(5, "You can select up to 5 images")
            // images: Yup.mixed().required('Please select images')
            // .test("FILE_SIZE", 'Too large image', (value) => value && value.size < 1024 * 1024)
            // .test("FILE_TYPE", 'Invalid', (value) => value && ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type))
            ,
            dateAnni: Yup.date().max(new Date(), 'Date must not be later than the current date.').nullable(),
        }),
        onSubmit: async (values) => {

            const formData = new FormData();
            formData.append('content', values.content);
            formData.append('dateAnni', values.dateAnni);
            formData.append('mode', values.mode);
            for (let image of values.images) formData.append('images', image);

            const response = await postServices.apiCreatePost(formData);
            console.log(response)
            onClose()
        }
    })

    return (
        <div className={cx('wrapperr')}>
            <div className={cx('wrapper-modal')}>
                <div className={cx('wrapper-one')}>
                    <div className={cx('overlay')}></div>
                    <div className={cx('exit')} onClick={onClose}>
                        <div className={cx('exit-button')}>
                            <div className={cx('exit-button-one')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faXmark} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('modal')}>
                        <div className={cx('modal-one')}>
                            <div className={cx('modal-two')}>
                                <div className={cx('modal-start')}>
                                    <form >
                                        <div className={cx('form')}>
                                            <div className={cx('form-one')}>
                                                <div className={cx('form-two')}>
                                                    <div className={cx('form-three')}>
                                                        <div className={cx('create')}>
                                                            <div className={cx('create-one')}>
                                                                <div className={cx('create-two')}>
                                                                    <div className={cx('create-three')}>
                                                                        <h1>
                                                                            <div className={cx('title')}>Create new diary</div>
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
                                                                    <div className={cx('add')}>
                                                                        <div className={cx('add-one')}>
                                                                            <div className={cx('add-two')}>
                                                                                <button type="submit" onClick={formik.handleSubmit} >Save</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={cx('content')}>
                                                            <div className={cx('content-one')}>
                                                                <div className={cx('content-two')}>
                                                                    <div className={cx('content-three')}>
                                                                        {formik.values.images &&
                                                                            <Slider className={cx('carousel')} {...settings}>
                                                                                {Array.from(formik.values.images).map((file, i) => (
                                                                                    <div onClick={() => {
                                                                                        // Remove the clicked image from the array
                                                                                        const newImages = [...formik.values.images];
                                                                                        newImages.splice(i, 1);
                                                                                        formik.setFieldValue("images", newImages);
                                                                                    }}>
                                                                                        <PreviewImage key={i} file={file} />
                                                                                    </div>

                                                                                ))}
                                                                            </Slider>
                                                                        }
                                                                        <div className={cx('choose-button')}>
                                                                            <div className={cx('choose-button-one')}>

                                                                                <input type="file" multiple name="images" onChange={(e) => {
                                                                                    const newImages = [...formik.values.images, ...e.target.files]
                                                                                    formik.setFieldValue('images', newImages)
                                                                                }} />
                                                                                <button
                                                                                >Select from computer</button>
                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            formik.errors.images && formik.touched.images && (
                                                                                <small className={cx('validate-login')}>{formik.errors.images}</small>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={cx('write')}>
                                                                <div className={cx('write-one')}>
                                                                    <div className={cx('write-two')}>
                                                                        <div className={cx('divide')}>
                                                                            <div className={cx('divide-one')}>
                                                                                <div className={cx('avatar-name')}>
                                                                                    <div className={cx('avatar-name-one')}>
                                                                                        <div className={cx('avatar-name-two')}>
                                                                                            <div className={cx('avatar-name-three')}>
                                                                                                <div className={cx('avatar-name-four')}>
                                                                                                    <div className={cx('avatar-name-five')}>
                                                                                                        <div className={cx('avatar')}>
                                                                                                            <div className={cx('avatar-one')}>
                                                                                                                <span>
                                                                                                                    <img src={images.login_image} alt="" />
                                                                                                                </span>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className={cx('name')}>
                                                                                                            <div className={cx('name-one')}>
                                                                                                                <div className={cx('name-two')}>
                                                                                                                    <span>Thuy Duong</span>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className={cx('information')}>
                                                                                    <div className={cx('content-new')}>
                                                                                        <div className={cx('write-here')}><textarea name='content' value={formik.values.content} onChange={formik.handleChange} placeholder="Add keywords, separated by commas"></textarea>
                                                                                            {
                                                                                                formik.errors.content && formik.touched.content && (
                                                                                                    <small className={cx('validate-login')}>{formik.errors.content}</small>
                                                                                                )
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={cx('mode-char')}>
                                                                                        <div className={cx('mode')}>
                                                                                            <select name="mode" value={formik.values.mode} onChange={formik.handleChange}>
                                                                                                {/* <option value="">
                                                                                                    Select mode
                                                                                                </option> */}
                                                                                                <option value="Private">
                                                                                                    Private
                                                                                                </option>
                                                                                                <option value="Public">
                                                                                                    Public
                                                                                                </option>
                                                                                            </select>
                                                                                            {
                                                                                                formik.errors.mode && formik.touched.mode && (
                                                                                                    <small className={cx('validate-login')}>{formik.errors.mode}</small>
                                                                                                )
                                                                                            }
                                                                                        </div>

                                                                                        <div className={cx('char')}>
                                                                                            <span>
                                                                                                <div className={cx('char-one')}>
                                                                                                    <span>
                                                                                                        <span className={cx('count-char')}>2</span>/<span className={cx('total-char')}>2,200</span>
                                                                                                    </span>
                                                                                                </div>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={cx('pickDate')}>
                                                                                        <small>Date that this diary occurs</small>
                                                                                        <input type="date" name="dateAnni" value={formik.values.dateAnni} onChange={formik.handleChange} />
                                                                                        {
                                                                                            formik.errors.dateAnni && formik.touched.dateAnni && (
                                                                                                <small className={cx('validate-login')}>{formik.errors.dateAnni}</small>
                                                                                            )
                                                                                        }
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalNewDiary;