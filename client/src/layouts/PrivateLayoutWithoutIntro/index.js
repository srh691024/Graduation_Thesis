import classNames from "classnames/bind";
import styles from "~/layouts/PrivateLayoutWithoutIntro/PrivateLayoutWithoutIntro.module.scss"
import {Header, Themes} from "../components";


const cx = classNames.bind(styles);
function PrivateLayoutWithoutIntro({ children }) {
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('inner-first')}>
                        <div className={cx('inner-second')}>
                            <div className={cx('inner-third')}>
                                <div className={cx('inner-fourth')}>
                                    <Header />
                                    <div className={cx('container')}>
                                        <div className={cx('section')}>
                                            <div className={cx('main')}>
                                                <Themes />
                                                <div className={cx('wrapper-diarypost')}>
                                                    <div className={cx('inner-diarypost')}>
                                                        <div className={cx('divide-column')}>
                                                            {children}
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
            </div >
        </>
    );
}

export default PrivateLayoutWithoutIntro;