import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import styles from '~/components/PreviewImage/PreviewImage.module.scss'

const cx = classNames.bind(styles)

function PreviewImage({ file }) {
    const [image, setImage] = useState(null)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        setImage(reader.result)
    }
    return (
        <div className={cx('previewImage')}>
            <img src={image} alt="preview" />
            <div className={cx('overlay')}>
                <FontAwesomeIcon className={cx('icon')} icon={faTrashCan}/>
            </div>
        </div>
    );
}

export default PreviewImage;