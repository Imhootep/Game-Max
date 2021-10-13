import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

//-------------------------RECUP DU USER
export const getUser = (uid) => {
  // on met uid en paramètre pour qu'il se retrouve dans la requête plus bas
  return (dispatch) => {
    return (
      axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
        .then((res) => {
          dispatch({ type: GET_USER, payload: res.data });
        })
        // catch de l'erreur si besoin
        .catch((err) => console.log(err))
    );
  };
};

//-------------------------PHOTO DE PROFIL
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return (
      axios
        //envoi à la base de donnée
        .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
          } else {
            dispatch({ type: GET_USER_ERRORS, payload: "" });
            return axios
              .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
              .then((res) => {
                //va changer le chemin de la data dans le store ...
                dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
              });
          }
        })
        // catch de l'erreur si besoin
        .catch((err) => console.log(err))
    );
  };
};

//-------------------------MODIF DE LA BIO
export const updateBio = (
  userId,
  { pseudo, company, bio, adresse, membres, jeux, social }
) => {
  console.log(pseudo, company, bio, adresse, membres, jeux, social);
  return (dispatch) => {
    return (
      axios({
        //modif de la BIO
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
        data: { bio, adresse, membres, jeux, social },
      })
        .then((res) => {
          dispatch({
            type: UPDATE_BIO,
            payload: { pseudo, company, bio, adresse, membres, jeux, social },
          });
        })
        // catch de l'erreur si besoin
        .catch((err) => console.log(err))
    );
  };
};

//-------------------------MODIF DE LA LISTE FOLLOW
export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
      data: { idToFollow },
    })
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
      })
      .catch((err) => console.log(err));
  };
};

//-------------------------MODIF DE LA LISTE UNFOLLOW
export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
      data: { idToUnfollow },
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
      })
      .catch((err) => console.log(err));
  };
};
