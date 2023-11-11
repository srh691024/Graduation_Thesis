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
import { useEffect, useState } from 'react';
import * as adminServices from '~/services/adminServices'

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

    const [dataAccount, setDataAccount] = useState([])

    useEffect(() => {
        async function fetchAccount() {
            const response = await adminServices.apiGetAccounts12Months()
            setDataAccount(response.result)
        }
        fetchAccount()
    }, [])
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
                label: 'Accounts',
                data: dataAccount,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nameChart')}>Total accounts monthly</div>
            <Line className={cx('lineChart')} options={options} data={data} />
        </div>
    );
}

export default LineChart;