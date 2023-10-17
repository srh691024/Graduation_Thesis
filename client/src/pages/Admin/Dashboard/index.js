import classNames from "classnames/bind";
import images from "~/assets/images";
import styles from '~/pages/Admin/Dashboard/Dashboard.module.scss'
import { CombinationChart, TotalAccountvsCouple, DoughnutChart, LineChart, ActiveUserChart } from "~/components";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Dashboard() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('dashboard')}>
                <div className={cx('dashboardTitle')}>
                    <span>Dashboard</span>
                </div>
            </div>
            <div className={cx('chart')}>
                <ul>
                    <li className={cx('account')}>
                        <div className={cx('iconContainer')}>
                            <img src={images.group} alt="" className={cx('icon')} />
                        </div>
                        <div className={cx('infoContainer')}>
                            <div className={cx('bigTitle')}>
                                <span>Accounts</span>
                            </div>
                            <div className={cx('number')}>
                                <span>4.022</span>
                            </div>
                            <div className={cx('rate')}>
                                <span>
                                    <span className={cx('bold')}>+1.2%</span> last month</span>
                            </div>
                        </div>
                    </li>
                    <li className={cx('couple')}>
                        <div className={cx('iconContainer')}>
                            <img src={images.couple} alt="" className={cx('icon')} />
                        </div>
                        <div className={cx('infoContainer')}>
                            <div className={cx('bigTitle')}>
                                <span>Couples</span>
                            </div>
                            <div className={cx('number')}>
                                <span>1.203</span>
                            </div>
                            <div className={cx('rate')}>
                                <span><span className={cx('bold')}>+1.2%</span> last month</span>
                            </div>
                        </div>
                    </li>
                    <li className={cx('interaction')}>
                        <div className={cx('iconContainer')}>
                            <img src={images.interaction} alt="" className={cx('icon')} />
                        </div>
                        <div className={cx('infoContainer')}>
                            <div className={cx('bigTitle')}>
                                <span>Interaction</span>
                            </div>
                            <div className={cx('number')}>
                                <span>10.123</span>
                            </div>
                            <div className={cx('rate')}>
                                <span><span className={cx('bold')}>+1.2%</span> last month</span>
                            </div>
                        </div>
                    </li>
                    <li className={cx('diary')}>
                        <div className={cx('iconContainer')}>
                            <img src={images.post} alt="" className={cx('icon')} />
                        </div>
                        <div className={cx('infoContainer')}>
                            <div className={cx('bigTitle')}>
                                <span>Posts</span>
                            </div>
                            <div className={cx('number')}>
                                <span>14.664</span>
                            </div>
                            <div className={cx('rate')}>
                                <span><span className={cx('bold')}>+1.2%</span> last month</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={cx('chart')}>
                <CombinationChart />
            </div>
            <div className={cx('chart', 'row3')}>
                <div className={cx('leftContainer')}>
                    <div className={cx('chartTotalAccountVsCouple')}>
                        <TotalAccountvsCouple />
                    </div>
                    <div className={cx('chartDoughnut')}>
                        <DoughnutChart />
                    </div>
                    <div className={cx('lineChart')}>
                        <LineChart />
                    </div>
                </div>
                <div className={cx('rightContainer')}>
                    <div className={cx('tracking')}>
                        <div className={cx('nameChart')}>
                            <span>Tracking Report</span>
                            <div className={cx('dateFilter')}>
                                {/* Today, Week, Month */}
                            </div>
                        </div>
                        <div className={cx('listTracking')}>
                            <div className={cx('row')}>
                                <Link className={cx('itemContainer', 'reportDiary')}>
                                    <div className={cx('nameItem')}>
                                        <span>Report public post</span>
                                    </div>
                                    <div className={cx('numItem')}>
                                        <span>130</span>
                                    </div>
                                </Link>
                                <Link className={cx('itemContainer', 'reportAccount')}>
                                    <div className={cx('nameItem')}>
                                        <span>Report account</span>
                                    </div>
                                    <div className={cx('numItem')}>
                                        <span>283</span>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('row')}>
                                <Link className={cx('itemContainer', 'reportSupport')}>
                                    <div className={cx('nameItem')}>
                                        <span>Support requests</span>
                                    </div>
                                    <div className={cx('numItem')}>
                                        <span>21</span>
                                    </div>
                                </Link>
                                <Link className={cx('itemContainer', 'response')}>
                                    <div className={cx('nameItem')}>
                                        <span>Support responses</span>
                                    </div>
                                    <div className={cx('numItem')}>
                                        <span>17</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={cx('realtimeChart')}>
                        <div className={cx('introChart')}>
                            <span className={cx('headerChart')}>Active users right now</span>
                            <span className={cx('numberUser')}>382</span>
                            <span className={cx('descChart')}>Page views 5 seconds</span>
                        </div>
                        <div className={cx('line')}></div>
                        <div className={cx('addChart')}>
                            <ActiveUserChart/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;