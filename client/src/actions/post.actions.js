import axios from "axios";
import Cookies from "js-cookie"
// posts
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const DELETE_POST_ADMIN = "DELETE_POST_ADMIN";

//comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const EDIT_COMMENT_ADMIN = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const GET_TRENDS = "GET_TRENDS";
export const GET_FAVORITES = "GET_FAVORITES";

export const SEARCH_POSTS = "SEARCH_POSTS"
export const SEARCH_ALL_POSTS = "SEARCH_ALL_POSTS"

export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`, { headers : { Authorization : "Bearer "+Cookies.get('jwt') } })
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
        dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const searchPost = (wordToFind, num) => {
  
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "post",
        headers: { Authorization: "Bearer " + Cookies.get('jwt') },
        url: `${process.env.REACT_APP_API_URL}api/post/contains`,
        data: { wordToFind }
      });
      const array = res.data.slice(0, num);
        dispatch({ type: SEARCH_POSTS, payload: array });
        dispatch({ type: SEARCH_ALL_POSTS, payload: res.data });
      
    } catch (err) {
      return console.log(err);
    }
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data, { headers : { Authorization : "Bearer "+Cookies.get('jwt') } })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      });
  };
};

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      headers : { Authorization : "Bearer "+Cookies.get('jwt') } ,
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};
export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      headers : { Authorization : "Bearer "+Cookies.get('jwt') } ,
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

//comments
export const updatePost = (postId, message, title) => {
  return (dispatch) => {
    return axios({
      method: "put",
      headers : { Authorization : "Bearer "+Cookies.get('jwt') } ,
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { message, title },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, title, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      headers : { Authorization : "Bearer "+Cookies.get('jwt') } ,
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePostAdmin = (postId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      headers : { Authorization : "Bearer "+Cookies.get('jwt') } ,
      url: `${process.env.REACT_APP_API_URL}api/delete-post/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST_ADMIN, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      headers : { Authorization : "Bearer "+Cookies.get('jwt') } ,
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
      data: { commenterId, text, commenterPseudo },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const editComment = (postId, commentId, text, commenterId, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      headers : { Authorization : "Bearer "+Cookies.get('jwt') } ,
      url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
      data: { commentId, text, commenterId, commenterPseudo },
    })
      .then((res) => {
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text, commenterId, commenterPseudo } });
      })
      .catch((err) => console.log(err));
  };
};

export const editCommentAdmin = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      headers : { Authorization : "Bearer "+Cookies.get('jwt') } ,
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
      data: { commentId },
    })
      .then((res) => {
        dispatch({ type: EDIT_COMMENT_ADMIN, payload: { postId, commentId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      headers : { Authorization : "Bearer "+Cookies.get('jwt') } ,
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
      data: { commentId },
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch((err) => console.log(err));
  };
};

export const getTrends = (sortedArray) => {
  return (dispatch) => {
    dispatch({ type: GET_TRENDS, payload: sortedArray });
  };
};


export const getFavorites = (id) => {

  return (dispatch) => {
  return axios({
    method:"get",
    headers : { Authorization : "Bearer "+Cookies.get('jwt') },
    url: `${process.env.REACT_APP_API_URL}api/user/favorites-posts/` + id,
  }).then((res) => {
    const array = res.data //.data.slice(0, 1);
    dispatch({ type: GET_FAVORITES, payload: array });
  }).catch((err) => console.log(err));
  };
};

// export const searchPost = (word) => {
//   return (dispatch) => {
//     return axios({
//       method : "get",
//       url:`${process.env.REACT_APP_API_URL}/contains/`, 
//       data:{search:word},
//     }).then((res) => {
//         dispatch({ type: SEARCH_POSTS, payload: word });
//       })
//       .catch((err) => console.log(err));
//   };
// };

// export const searchPost = (wordToFind) => {
  
//   return async (dispatch) => {
//     try {
//       const res = await axios({
//         method: "post",
//         headers: { Authorization: "Bearer " + Cookies.get('jwt') },
//         url: `${process.env.REACT_APP_API_URL}api/post/contains`,
//         data: { wordToFind }
//       });
//       const array = res.data;
//       dispatch({ type: SEARCH_POSTS, payload: array });
//     } catch (err) {
//       return console.log(err);
//     }
//   };
// };


