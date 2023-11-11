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
import { useEffect, useState } from 'react';
import * as adminServices from '~/services/adminServices'

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
    const [dataDaytime, setDataDaytime] = useState([])
    const [nighttime, setNighttime] = useState([])

    useEffect(() => {
        async function fetchDataBar() {
            const response = await adminServices.apiDataForBarStackChart()
            if (response.result) {
                const daytimeArray = [];
                const nighttimeArray = [];

                for (const day in response.result) {
                    if (response.result.hasOwnProperty(day)) {
                        daytimeArray.push(response.result[day].daytime);
                        nighttimeArray.push(response.result[day].nighttime);
                    }
                }

                setDataDaytime(daytimeArray);
                setNighttime(nighttimeArray);
            }
        }
        fetchDataBar()
    }, [])
    const options = {
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
    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    const data = {
        labels,
        datasets: [
            {
                label: 'Daytime',
                data: dataDaytime,
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Nighttime',
                data: nighttime,
                backgroundColor: 'rgb(75, 192, 192)',
            },
        ],
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nameChart')}>Post frequency in week</div>
            <Bar className={cx('barChart')} options={options} data={data} />
        </div>
    );
}

export default TotalAccountvsCouple;