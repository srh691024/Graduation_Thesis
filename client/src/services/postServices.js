import axios from '../utils/httpRequest'
export const apiCreatePost = (data) => axios({
    url: `post/createPost`,
    method: 'POST',
    data
});

export const apiGetAllPostsPublic = () => axios({
    url: `post/getAllPostsPublic`,
    method: 'GET',
});
export const apiUpdatePost = (postId, data) => axios({
    url: `post/updatePost/${postId}`,
    method: 'PUT',
    data
});

export const apiDeletePost = (postId) => axios({
    url: `post/deletePost/${postId}`,
    method: 'DELETE',
});

export const apiGetPostsByCouple = (userNameCouple) => axios({
    url: `post/getPostsByCouple/${userNameCouple}`,
    method: 'GET'
});

export const apiLikePost = (postId) => axios({
    url: `post/likePost/${postId}`,
    method: 'PATCH'
});

export const apiAddComment = (postId, data) => axios({
    url: `post/addComment/${postId}`,
    method: 'PATCH',
    data
});

export const apiDeleteComment = (postId, commentId) => axios({
    url: `post/${postId}/comment/${commentId}`,
    method: 'DELETE'
});