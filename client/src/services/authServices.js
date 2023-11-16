
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

export const apiSearchUser = (searchQuery) => axios({
    url: `auth/searchUser?email=${searchQuery}`,
    method: 'GET',
})

export const apiReportAccount = (userId) => axios({
    url: `auth/reportAccount/${userId}`,
    method: 'PATCH',
})

export const apiGetAllUsers = () => axios({
    url: 'auth/getAllUsers',
    method: 'GET',
})

export const apiChangePassword = (data) => axios({
    url: 'auth/changePassword',
    method: 'POST',
    data
})

export const apiReportProblem = (data) => axios({
    url: 'auth/reportProblem',
    method: 'POST',
    data
})