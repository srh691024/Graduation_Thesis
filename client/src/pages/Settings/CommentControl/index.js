import classNames from "classnames/bind";
import styles from "~/pages/Settings/CommentControl/CommentControl.module.scss"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as postServices from '~/services/postServices'
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function CommentControl() {
    const [status, setStatus] = useState(false)
    const [getInfoStatus, setGetInfoStatus] = useState('')


    useEffect(() => {
        async function fetchStatus() {
            const response = await postServices.apiGetCustomForbidden()
            if (response.success) {
                setGetInfoStatus(response.result.keyword?.join(','))
                setStatus(response.result.isApply)
            }
        }
        fetchStatus()
    }, [])

    const formik = useFormik({
        initialValues: {
            content: getInfoStatus || '',
        },
        validationSchema: Yup.object({
            content: Yup.string().max(1000, 'This current list is too long'),
        }),
        onSubmit: async (values) => {
            await postServices.apiChangeContentCustomFilterComment(values)
        }
    })

    // useEffect để cập nhật giá trị content khi getInfoStatus thay đổi
    useEffect(() => {
        formik.setFieldValue('content', getInfoStatus || '');
    }, [getInfoStatus]);

    const handleValueStatus = async (e) => {
        //click => call API change isApply
        await postServices.apiChangeStatusFilterComment(e.target.checked)
        setStatus(!status)

    }


    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-one')}>
                <div className={cx('header-edit-profile')}>
                    <div className={cx('header-edit-profile-one')}>
                        <div className={cx('header-edit-profile-two')}>
                            <span>Hidden Words</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('offensive-word')}>
                        <span>Offensive words and phrases</span>
                    </div>
                    <div className={cx('sub-description')}>
                        <span className={cx('sub-des')}>Protect yourself from comments
                            that contain offensive words, phrases.</span>
                    </div>
                    {/* <div className={cx('title')}>
                        <span>Hide comments</span>
                        <div className={cx('push-noti-two')}>
                            <div className={cx('button-pause')}>
                                <div className={cx('button-pause-one')}>
                                    <input type="checkbox" className={cx('pause-input')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-description')}>
                        <span className={cx('sub-des')}>Comments that may be offensive
                            will automatically be hidden in a separate section of your diary posts.</span>
                    </div> */}
                    <div className={cx('title')}>
                        <span>Advanced comment filtering</span>
                        <div className={cx('push-noti-two')}>
                            <div className={cx('button-pause')}>
                                <div className={cx('button-pause-one')}>
                                    <input
                                        checked={status}
                                        type="checkbox"
                                        className={cx('pause-input')}
                                        onChange={(e) => handleValueStatus(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('sub-description')}>
                        <span className={cx('sub-des')}>Additional comments that may contain offensive words
                            and phrases will not be send.</span>
                    </div>
                </div>
                <div className={cx('header-edit-profile')}>
                    <div className={cx('header-edit-profile-one')}>
                        <div className={cx('header-edit-profile-two')}>
                            <span>Comment filtering</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('offensive-word')}>
                        <span>Keyword filters</span>
                    </div>
                    <div className={cx('title')}>
                        <span>Hide comments that contain any of the words or phrases you type above from your posts.</span>
                    </div>
                    <form>
                        <textarea
                            name="content"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            placeholder="Add keywords, separated by commas"></textarea>
                        {
                            formik.errors.content && formik.touched.content && (
                                <small className={cx('validate-login')}>{formik.errors.content}</small>
                            )
                        }
                        <div className={cx('button-submit')} onClick={formik.handleSubmit}>
                            <div className={cx('button-submit-one')}>Submit</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CommentControl;