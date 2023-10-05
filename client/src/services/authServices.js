import * as httpRequest from '~/utils/httpRequest';

export const register = async (payload) => {
    try {
        const res = await httpRequest.post('auth/register',  payload );
        console.log(res);
        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const login = async (payload) => {
    try {
        const res = await httpRequest.post('auth/login', payload);
        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const forgotPassword = async (payload) => {
    try {
        const res = await httpRequest.post('auth/forgotpassword', payload);
        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const resetPassword = async (payload) => {
    try {
        const res = await httpRequest.put('auth/resetpassword', payload);
        return res;
    } catch (error) {
        return error.response.data;
    }
};