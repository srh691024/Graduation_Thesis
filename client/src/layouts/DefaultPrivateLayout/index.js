import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import styles from '~/layouts/DefaultPrivateLayout/DefaultPrivateLayout.module.scss';
import Themes from '~/layouts/components/Themes';
import IntroCouple from "~/layouts/components/IntroCouple";
import { ModalFeeling, ModalNewDiary, Notifications } from '~/components';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
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
                                                        <IntroCouple />
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
            {/* <ModalNewDiary /> */}
            {/* <ModalFeeling/> */}
            {/* <Notifications /> */}
        </div >
    );
}

export default DefaultLayout;