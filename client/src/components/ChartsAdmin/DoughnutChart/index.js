import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames/bind';
import styles from '~/components/ChartsAdmin/DoughnutChart/DoughnutChart.module.scss'
import { useEffect, useState } from 'react';
import * as adminServices from '~/services/adminServices'

const cx = classNames.bind(styles);

ChartJS.register(ArcElement, Tooltip, Legend);


function DoughnutChart() {
    const [dataDoughnut, setDataDoughnut] = useState([])

    useEffect(() => {
        async function fetchDoughnut() {
            const response = await adminServices.apiGetDataDoughnut()
            setDataDoughnut(response.result)
        }
        fetchDoughnut()
    }, [])
    const data = {
        labels: ['Connected couple', 'Disconnected couple'],
        datasets: [
            {
                label: 'This month',
                data: [dataDoughnut[0]?.connectThismonth, dataDoughnut[0]?.disconnectThismonth],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
            {
                label: 'Last month',
                data: [dataDoughnut[1]?.connectLastmonth, dataDoughnut[1]?.disconnectLastmonth],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nameChart')}>Connected couples with disconnected couples</div>
            <Doughnut className={cx('doughnutChart')} data={data} />
        </div>
    );
}

export default DoughnutChart;