import axios from '../utils/httpRequest'
export const apiCreatePost = (data) => axios({
    url: `post/createPost`,
    method: 'POST',
    data

});

export const apiGetPostsByCouple = (userNameCouple) => axios({
    url: `post/getPostsByCouple/${userNameCouple}`,
    method: 'GET'
});