import { faChevronLeft, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import styles from '~/components/ModalDeletePost/ModalDeletePost.module.scss'
import * as postServices from '~/services/postServices'

const cx = classNames.bind(styles)

function ModalDeletePost({data, onClose }) {
    const handleSubmit = async () =>{
        const deletedPost = await postServices.apiDeletePost(data._id)
        if(deletedPost.success) {
            Swal.fire('Notification', deletedPost.result, 'success')
        }else{
            Swal.fire('Notification', deletedPost.result, 'error')
        }
        onClose()
    }
    return (
        <div className={cx('wrapper')}>
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
                                    <div className={cx('form')}>
                                        <div className={cx('form-one')}>
                                            <div className={cx('form-two')}>
                                                <div className={cx('form-three')}>
                                                    <div className={cx('create')}>
                                                        <div className={cx('create-one')}>
                                                            <div className={cx('create-two')}>
                                                                <div className={cx('create-three')}>
                                                                    <h1>
                                                                        <div className={cx('title')}>WARNING!!!</div>
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
                                                        <div className={cx('iconWrapper')}>
                                                            <FontAwesomeIcon className={cx('icon')} icon={faTrashCan} />
                                                        </div>
                                                        <div className={cx('headerAccept')}>
                                                            Are you sure you want to delete this diary entry?
                                                        </div>
                                                        <div className={cx('noteImportant')}>
                                                            Once you accept deletion, the diary entry's data cannot be restored.
                                                        </div>
                                                        <div className={cx('acceptance')}>
                                                            Are you still sure you want to delete?
                                                        </div>
                                                        <button type="submit" onClick={handleSubmit}>Delete this diary</button>
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
        </div>);
}

export default ModalDeletePost;