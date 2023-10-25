
import axios from '../utils/httpRequest'

export const apiGetCurrent = () => axios({
    url: 'auth/current',
    method: 'GET',
});

export const apiUpdateUser = (formData) => axios({
    url: 'auth/updateUser',
    method: 'PUT',
    data: formData
})