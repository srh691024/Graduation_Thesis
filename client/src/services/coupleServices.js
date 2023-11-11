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

export const apiCancelInvitation = (invitationId)=> axios({
    url: `couple/cancelInvitation/${invitationId}`,
    method: 'DELETE',
})

export const apiGetCurrentInvitation = () => axios({
    url: 'couple/getCurrentInvitation',
    method: 'GET',
});

export const apiAcceptInvitation = (token) => axios({
    url: `couple/acceptInvitation/${token}`,
    method: 'PUT',
});

export const apiEditInfoCouple = (coupleId, formData) => axios({
    url: `couple/editInfoCouple/${coupleId}`,
    method: 'PUT',
    data: formData
});

export const apiEditTempLoverUser = (coupleId, formData) => axios({
    url: `couple/editTempLoverUser/${coupleId}`,
    method: 'PATCH',
    data: formData
});

export const apiFollowCouple = (coupleId) => axios({
    url: `couple/followCouple/${coupleId}`,
    method: 'PATCH'
});

export const apiDisconnectConnection = (coupleId, agree)=> axios({
    url: `couple/disconnectConnection/${coupleId}`,
    method: 'POST',
    data: agree
})

export const apigetHistoryCoupleByCurrentUser = ()=> axios({
    url: 'couple/getHistoryCoupleByCurrentUser',
    method: 'GET'
})

export const apiInviteRestoreCouple = (coupleId)=> axios({
    url: `couple/inviteRestoreCouple/${coupleId}`,
    method: 'POST'
})

export const apiAcceptRestoreCouple = (invitationId)=> axios({
    url: `couple/acceptRestoreCouple/${invitationId}`,
    method: 'POST'
})

export const apiGetListInvitation = ()=> axios({
    url: 'couple/getListInvitation',
    method: 'GET'
})

export const apiAcceptInvitationTwo = (invitationId)=> axios({
    url: `couple/acceptInvitationTwo/${invitationId}`,
    method: 'POST'
})






