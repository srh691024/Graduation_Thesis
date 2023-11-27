import classNames from "classnames/bind";
import images from "~/assets/images";
import styles from '~/pages/Admin/Dashboard/Dashboard.module.scss'
import { CombinationChart, TotalAccountvsCouple, DoughnutChart, LineChart, ActiveUserChart } from "~/components";
import { Link } from "react-router-dom";
import * as adminServices from '~/services/adminServices';
import * as postServices from '~/services/postServices';
import * as authServices from '~/services/authServices';
import { useEffect, useState } from "react";
import config from "~/config";

import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const cx = classNames.bind(styles);

function Dashboard() {
    const [totalStatistic, setTotalStatistic] = useState([])
    const [reportPostsCount, setReportPostsCount] = useState(0)
    const [reportAccountsCount, setReportAccountsCount] = useState(0)
    const [problemCount, setProblemCount] = useState(0)
    const [responseCount, setResponseCount] = useState(0)

    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        // Lắng nghe sự kiện khi danh sách người dùng trực tuyến thay đổi
        const interval = setInterval(() => {
            socket.on("online-users", (users) => {
                setOnlineUsers(users);
            });
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    useEffect(() => {
        async function fetchReports() {
            const response = await adminServices.apiGetAllReports()
            setProblemCount((response.result.filter(report => report.isResponsed === false)).length)
            setResponseCount((response.result.filter(report => report.isResponsed)).length)
        }
        fetchReports();
    }, [])

    useEffect(() => {
        async function fetchAccounts() {
            const response = await authServices.apiGetAllUsers()
            setReportAccountsCount((response.result.filter(user => user.reports?.length > 0)).length)
        }
        fetchAccounts()
    }, [])

    useEffect(() => {
        async function fetchPosts() {
            const response = await postServices.apiGetAllPosts()
            setReportPostsCount((response.result.filter(post => post.reports?.length > 0)).length)
        }
        fetchPosts();
    }, [])
    useEffect(() => {
        async function fetchTotalStatistic() {
            const response = await adminServices.apiGetTotalStatistic();
            setTotalStatistic(response.result);
        }
        fetchTotalStatistic()
    }, [])


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
                                <span>
                                    {totalStatistic[0]?.totalAccounts}
                                </span>
                            </div>
                            <div className={cx('rate')}>
                                <span>
                                    <span className={cx('bold')}>{totalStatistic[0]?.rate}%</span> last month</span>
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
                                <span>{totalStatistic[1]?.totalCouples}</span>
                            </div>
                            <div className={cx('rate')}>
                                <span><span className={cx('bold')}>
                                    {/* {totalStatistic[1]?.rate} */}
                                    %</span> last month</span>
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
                                <span>{totalStatistic[2]?.totalInteractions}</span>
                            </div>
                            <div className={cx('rate')}>
                                <span><span className={cx('bold')}>{totalStatistic[2]?.rate}%</span> last month</span>
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
                                <span>{totalStatistic[3]?.totalPosts}</span>
                            </div>
                            <div className={cx('rate')}>
                                <span><span className={cx('bold')}>{totalStatistic[3]?.rate}%</span> last month</span>
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
                                <Link to={config.routes.posts} className={cx('itemContainer', 'reportDiary')}>
                                    <div className={cx('nameItem')}>
                                        <span>Report public post</span>
                                    </div>
                                    <div className={cx('numItem')}>
                                        <span>{reportPostsCount}</span>
                                    </div>
                                </Link>
                                <Link to={config.routes.accounts} className={cx('itemContainer', 'reportAccount')}>
                                    <div className={cx('nameItem')}>
                                        <span>Report account</span>
                                    </div>
                                    <div className={cx('numItem')}>
                                        <span>{reportAccountsCount}</span>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('row')}>
                                <Link to={config.routes.supports} className={cx('itemContainer', 'reportSupport')}>
                                    <div className={cx('nameItem')}>
                                        <span>Support requests</span>
                                    </div>
                                    <div className={cx('numItem')}>
                                        <span>{problemCount}</span>
                                    </div>
                                </Link>
                                <Link to={config.routes.supports} className={cx('itemContainer', 'response')}>
                                    <div className={cx('nameItem')}>
                                        <span>Support responses</span>
                                    </div>
                                    <div className={cx('numItem')}>
                                        <span>{responseCount}</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={cx('realtimeChart')}>
                        <div className={cx('introChart')}>
                            <span className={cx('headerChart')}>Active users right now</span>
                            <span className={cx('numberUser')}>{onlineUsers.length}</span>
                            <span className={cx('descChart')}>Page views 5 seconds</span>
                        </div>
                        <div className={cx('line')}></div>
                        <div className={cx('addChart')}>
                            <ActiveUserChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;