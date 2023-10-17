import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import classNames from 'classnames/bind';
import styles from '~/components/ChartsAdmin/LineChart/LineChart.module.scss'

const cx = classNames.bind(styles);
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function LineChart() {
    const options = {
        responsive: true,
        // plugins: {
        //     legend: {
        //         position: 'top',
        //     },
        //     title: {
        //         display: true,
        //         text: 'Chart.js Line Chart',
        //     },
        // },
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December'];

    const data = {
        labels,
        datasets: [
            {
                label: 'New account register',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nameChart')}>Total users with total couples</div>
            <Line className={cx('lineChart')} options={options} data={data} />
        </div>
    );
}

export default LineChart;