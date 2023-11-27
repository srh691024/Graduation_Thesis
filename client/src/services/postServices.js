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

export const apiReportPost = (postId) => axios({
    url: `post/reportPost/${postId}`,
    method: 'PATCH'
});

export const apiGetAllPosts = () => axios({
    url: 'post/getAllPosts',
    method: 'GET',
})

export const apiSearchPublic = (searchQuery, page) => axios({
    url: `post/searchPublic?keyword=${searchQuery}&page=${page}`,
    method: 'GET',
})

export const apiChangeStatusFilterComment = () => axios({
    url: 'post/changeStatusFilterComment',
    method: 'POST'
})

export const apiChangeContentCustomFilterComment = (data) => axios({
    url: 'post/changeContentCustomFilterComment',
    method: 'POST',
    data
})

export const apiGetCustomForbidden = () => axios({
    url: 'post/getCustomForbidden',
    method: 'GET',
})

export const apiFollowingPost = () => axios({
    url: 'post/followingPost',
    method: 'GET',
})