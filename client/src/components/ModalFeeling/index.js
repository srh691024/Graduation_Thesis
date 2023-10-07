import classNames from "classnames/bind";
import styles from "~/components/ModalFeeling/ModalFeeling.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
import { useState } from "react";

const cx = classNames.bind(styles);

function ModalFeeling() {
    const [selectedEmotion, setSelectedEmotion] = useState('');

    const handleEmotionChange = (event) => {
        setSelectedEmotion(event.target.value);
        console.log(event.target.value);
    };

    return (
        <div className={cx('wrapperr')}>
            <div className={cx('wrapper-modal')}>
                <div className={cx('wrapper-one')}>
                    <div className={cx('overlay')}></div>
                    <div className={cx('exit')}>
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
                                                                        <div className={cx('title')}>How do your feel today?</div>
                                                                    </h1>
                                                                </div>
                                                                <div className={cx('back')}>
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
                                                        <div className={cx('emotion')}>
                                                            <input id="angry"
                                                                type="radio"
                                                                name="radioGroup"
                                                                value="angry"
                                                                checked={selectedEmotion === 'angry'}
                                                                onChange={handleEmotionChange}
                                                            />
                                                            <img src={images.angry} alt="" />
                                                            <label htmlFor="angry">
                                                                Angry
                                                            </label>
                                                        </div>
                                                        <div className={cx('emotion')}>
                                                            <input id="sad"
                                                                type="radio"
                                                                name="radioGroup"
                                                                value="sad"
                                                                checked={selectedEmotion === 'sad'}
                                                                onChange={handleEmotionChange} />
                                                            <img src={images.sad} alt="" />
                                                            <label htmlFor="sad">
                                                                Sad
                                                            </label>
                                                        </div>
                                                        <div className={cx('emotion')}>
                                                            <input id="normal"
                                                                type="radio"
                                                                name="radioGroup"
                                                                value="normal"
                                                                checked={selectedEmotion === 'normal'}
                                                                onChange={handleEmotionChange} />
                                                            <img src={images.normal} alt="" />
                                                            <label htmlFor="normal">
                                                                Normal
                                                            </label>
                                                        </div>
                                                        <div className={cx('emotion')}>
                                                            <input id="happy"
                                                                type="radio"
                                                                name="radioGroup"
                                                                value="happy"
                                                                checked={selectedEmotion === 'happy'}
                                                                onChange={handleEmotionChange} />
                                                            <img src={images.happy} alt="" />
                                                            <label htmlFor="happy">
                                                                Happy
                                                            </label>
                                                        </div>
                                                        <div className={cx('emotion')}>
                                                            <input id="beloved"
                                                                type="radio"
                                                                name="radioGroup"
                                                                value="beloved"
                                                                checked={selectedEmotion === 'beloved'}
                                                                onChange={handleEmotionChange} />
                                                            <img src={images.inlove} alt="" />
                                                            <label htmlFor="beloved">
                                                                Be Loved
                                                            </label>
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

export default ModalFeeling;