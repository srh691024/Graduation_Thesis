import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});



// Add a request interceptor
httpRequest.interceptors.request.use(function (config) {
    // Do something before request is sent
    let localStorageData = window.localStorage.getItem('persist:web/user')
    if (localStorageData && typeof localStorageData === 'string') {
        localStorageData = JSON.parse(localStorageData)
        const accessToken = JSON.parse(localStorageData?.token)
        config.headers = { authorization: `Bearer ${accessToken}` }
        return config
    } else return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
httpRequest.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data;
});

// export const get = async (path, options = {}) => {
//     const response = await httpRequest.get(path, options, { withCredentials: true });
//     return response.data;
// };

// export const post = async (path, options = {}) => {
//     const response = await httpRequest.post(path, options, { withCredentials: true });
//     return response.data;
// };

// export const put = async (path, options = {}) => {
//     const response = await httpRequest.put(path, options, { withCredentials: true });
//     return response.data;
// };

export default httpRequest;