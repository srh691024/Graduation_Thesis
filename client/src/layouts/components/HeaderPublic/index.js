import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import config from "~/config";
import styles from '~/layouts/components/HeaderPublic/HeaderPublic.module.scss'

const cx = classNames.bind(styles);

function HeaderPublic() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <div className={cx('header-left-container')}>
                    <Link to={config.routes.homepage} className={cx('styleLinkLogo')}>
                        <img src={images.logo} alt="logo" />
                    </Link>
                </div>
                <div className={cx('header-center-container')}>
                    <div className={cx('searchFormContainer')}>
                        <form className={cx('formElement')}>
                            <input className={cx('inputElement')} type="search" placeholder="Search" />
                            <span className={cx('spanSpliter')}></span>
                            <button className={cx('buttonSearch')}>
                                <div className={cx('searchIconContainer')}>
                                    <FontAwesomeIcon className={cx('iconSearch')} icon={faMagnifyingGlass}/>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
                <div className={cx('header-right-container')}>
                    <div className={cx('notification')}>
                        <FontAwesomeIcon className={cx('styleNoti')} icon={faBell}/>
                    </div>
                    <div className={cx('profile')}>
                        <img src={images.login_image} alt=""/>
                    </div>
                    <div className={cx('profile')}>
                        <img src={images.login_image} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderPublic;