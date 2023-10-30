import axios from '../utils/httpRequest'

export const apiCreateAnniversary = (coupleId, data) => axios({
    url: `anniversary/createAnniversary/${coupleId}`,
    method: 'POST',
    data
})

export const apiGetAnniversariesByCouple = (coupleId) => axios({
    url: `anniversary/getAnniversariesByCouple/${coupleId}`,
    method: 'GET'
})

export const apiCurrentMonth = (coupleId,{mm}) => axios({
    url: `anniversary/currentMonth/${coupleId}`,
    method: 'POST',
    data: {mm}
})

export const apiUpdateEvent = (updateAnniId, data) => axios({
    url: `anniversary/updateEvent/${updateAnniId}`,
    method: 'PATCH',
    data
})

export const apiDeleteEvent = (idAnni) => axios({
    url: `anniversary/deleteEvent/${idAnni}`,
    method: 'DELETE'
})