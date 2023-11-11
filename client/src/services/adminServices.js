import axios from '../utils/httpRequest'

export const apiGetTotalStatistic = () => axios({
    url: 'admin/getTotalStatistic',
    method: 'GET',
})

export const apiGetPost12Months = () => axios({
    url: 'admin/getPost12Months',
    method: 'GET',
})

export const apiGetComments12Months = () => axios({
    url: 'admin/getComments12Months',
    method: 'GET',
})

export const apiGetAccounts12Months = () => axios({
    url: 'admin/getAccounts12Months',
    method: 'GET',
})

export const apiGetDataDoughnut = () => axios({
    url: 'admin/getDataDoughnut',
    method: 'GET',
})

export const apiDataForBarStackChart = () => axios({
    url: 'admin/dataForBarStackChart',
    method: 'GET',
})

export const apiBanReport = (postId) => axios({
    url: `admin/banReport/${postId}`,
    method: 'PATCH',
})

export const apiUnBanReport = (postId) => axios({
    url: `admin/unBanReport/${postId}`,
    method: 'PATCH',
})