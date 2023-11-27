import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import config from '~/config';
import styles from '~/layouts/DefaultPrivateLayout/DefaultPrivateLayout.module.scss';
import { IntroCouple, Header, Themes } from "~/layouts/components";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { usernameCouple } = useParams()
    const { current } = useSelector(state => state.user)
    if (current.role === '22') {
        return <Navigate to={config.routes.login} />
    }

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
                                                <Themes usernameCouple={usernameCouple}/>
                                                <div className={cx('wrapper-diarypost')}>
                                                    <div className={cx('inner-diarypost')}>
                                                        <div className={cx('divide-column')}>
                                                            {children}
                                                            <IntroCouple usernameCouple={usernameCouple} />
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

export default DefaultLayout;