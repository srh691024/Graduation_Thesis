
import axios from '../utils/httpRequest'

export const apiRegister = (payload) => axios({
    url: 'auth/register',
    method: 'POST',
    data: payload,
    withCredentials: true
});

export const apiLogin = (payload) => axios({
    url: 'auth/login',
    method: 'POST',
    data: payload,
});

export const apiForgotPassword = (payload) => axios({
    url: 'auth/forgotpassword',
    method: 'POST',
    data: payload
});

export const apiResetPassword = (payload) => axios({
    url: 'auth/resetpassword',
    method: 'PUT',
    data: payload
});