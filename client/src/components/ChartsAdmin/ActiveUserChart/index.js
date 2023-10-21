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
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '~/components/ChartsAdmin/ActiveUserChart/ActiveUserChart.module.scss'

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
    const updateChartData = () => {
        setChartData(prevData => {
            const newLabels = [...prevData.labels.slice(1), new Date().toLocaleTimeString()];
            const newData = [...prevData.datasets[0].data.slice(1), faker.datatype.number({ min: 0, max: 1000 })];
            return {
                labels: newLabels,
                datasets: [{ ...prevData.datasets[0], data: newData }],
            };
        });
    };
    useEffect(() => {
        const interval = setInterval(updateChartData, 3000); // Update every 2 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Bar data={chartData} />
        </div >
    );
}

export default ActiveUserChart;