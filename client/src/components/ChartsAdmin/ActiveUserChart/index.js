import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,

} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '~/components/ChartsAdmin/ActiveUserChart/ActiveUserChart.module.scss'
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const cx = classNames.bind(styles);
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



function ActiveUserChart() {

    const [onlineUsers, setOnlineUsers] = useState([]);
    console.log(onlineUsers)

    useEffect(() => {
        // Lắng nghe sự kiện khi danh sách người dùng trực tuyến thay đổi
        socket.on("online-users", (users) => {
            setOnlineUsers(users);
        });
    }, []);

    const [chartData, setChartData] = useState({
        labels: Array.from({ length: 10 }),
        datasets: [
            {
                label: 'Active Users',
                data: Array(10).fill(0),
                backgroundColor: 'rgb(75,192,192)',
            },
        ],
    });
    useEffect(() => {
        const updateChartData = () => {
            setChartData(prevData => {
                const newLabels = [...prevData.labels.slice(1), new Date().toLocaleTimeString()];
                const newData = [...prevData.datasets[0].data.slice(1), onlineUsers.length];
                return {
                    labels: newLabels,
                    datasets: [{ ...prevData.datasets[0], data: newData }],
                };
            });
        };
        const interval = setInterval(updateChartData, 5000); // Update every 5 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [onlineUsers]);

    return (
        <div className={cx('wrapper')}>
            <Bar data={chartData} />
        </div >
    );
}

export default ActiveUserChart;