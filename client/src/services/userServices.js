
import axios from '../utils/httpRequest'

export const apiGetCurrent = () => axios({
    url: 'auth/current',
    method: 'GET',
});

// export const getCurrent = async () => {
//     try {
//         const res = await httpRequest.get('auth/current');
//         return res;
//     } catch (error) {
//         return error.response.data;
//     }
// };