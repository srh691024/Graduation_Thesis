import classNames from "classnames/bind";
import styles from "~/components/ModalNewDiary/ModalNewDiary.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPhotoFilm, faChevronLeft, faHouseLock, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";


const cx = classNames.bind(styles);

function ModalNewDiary({onClose}) {


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
                                                                            Save
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
                                                                    <FontAwesomeIcon className={cx('icon')} icon={faPhotoFilm} />
                                                                    <div className={cx('letter')}>
                                                                        <span>Drag photos here</span>
                                                                    </div>
                                                                    <div className={cx('choose-button')}>
                                                                        <div className={cx('choose-button-one')}>
                                                                            <button>Select from computer</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <form encType="multipart/form-data">
                                                                <input hidden accept="image/jpeg,image/png,image/heic,image/heif" multiple type="file" />
                                                            </form>
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
                                                                                    <div className={cx('write-here')}></div>
                                                                                    <div className={cx('caption')}>Write your diary</div>
                                                                                </div>
                                                                                <div className={cx('mode-char')}>
                                                                                    <div className={cx('mode')}>
                                                                                        <div className={cx('mode-one')}>
                                                                                            <div className={cx('icon-mode')}>
                                                                                                <FontAwesomeIcon className={cx('icon-mode-one')} icon={faHouseLock} />
                                                                                            </div>
                                                                                            <span>Private</span>
                                                                                            <div className={cx('icon-mode')}>
                                                                                                <FontAwesomeIcon className={cx('icon-mode-one')} icon={faCaretDown} />
                                                                                            </div>
                                                                                        </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalNewDiary;