import { Chart as MixedChart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
import { faker } from '@faker-js/faker';
import classNames from 'classnames/bind';
import styles from '~/components/ChartsAdmin/CombinationChart/CombinationChart.module.scss';

const cx = classNames.bind(styles);
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);




function CombinationChart() {

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                label: 'Interaction',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            },
            {
                type: 'line',
                label: 'Comment',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
            },
            {
                type: 'bar',
                label: 'Post',
                backgroundColor: 'rgb(228,250,79)',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            },
        ],
    };

    return (
        <div className={cx('wrapper')} >
            <div className={cx('titleChart')}>
                <span>Interaction, comment and post overview</span>
            </div>
            <MixedChart className={cx('mixedChart')} type='bar' data={data} />
        </div>
    );
}

export default CombinationChart;