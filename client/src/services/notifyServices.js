import axios from '../utils/httpRequest'

export const apiCreateNotify = (data) => axios({
    url: `notify/createNotify`,
    method: 'POST',
    data
});

export const apiGetNotify = () => axios({
    url: `notify/getNotify`,
    method: 'GET'
});