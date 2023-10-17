import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { faker } from '@faker-js/faker';
import classNames from 'classnames/bind';
import styles from '~/components/ChartsAdmin/TotalAccountvsCouple/TotalAccountvsCouple.module.scss'

const cx = classNames.bind(styles);
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function TotalAccountvsCouple() {
    const options = {
        // plugins: {
        //     title: {
        //         display: true,
        //         text: 'Total users with total couples',

        //     },
        // },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Total users',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Couples',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgb(75, 192, 192)',
            },
        ],
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nameChart')}>Total users with total couples</div>
            <Bar className={cx('barChart')} options={options} data={data} />
        </div>
    );
}

export default TotalAccountvsCouple;