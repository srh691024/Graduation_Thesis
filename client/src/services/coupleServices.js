import axios from '../utils/httpRequest'

export const apiGetCouple = (userNameCouple) => axios({
    url: `couple/getCouple/${userNameCouple}`,
    method: 'GET',

});

export const apiGetCoupleByCurrentUser = () => axios({
    url: 'couple/getCoupleByCurrentUser',
    method: 'GET',
});

export const apiGetCreatedUserByCouple = (createdUserId) => axios({
    url: `couple/getCreatedUserByCouple/${createdUserId}`,
    method: 'GET',
});
export const apiGetLoverUserByCouple = (loverUserId) => axios({
    url: `couple/getLoverUserByCouple/${loverUserId}`,
    method: 'GET',
});

export const apiSendInvitation = (email) => axios({
    url: `couple/sendInvitation/${email}`,
    method: 'POST',
    data: email,
    withCredentials: true
});

export const apiGetCurrentInvitation = () => axios({
    url: 'couple/getCurrentInvitation',
    method: 'GET',
});

export const apiAcceptInvitation = (token) => axios({
    url: `couple/acceptInvitation/${token}`,
    method: 'PUT',
});