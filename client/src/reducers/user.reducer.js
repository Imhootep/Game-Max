import { GET_USER, UPLOAD_PICTURE, UPDATE_BIO, FOLLOW_USER, UNFOLLOW_USER } from "../actions/user.actions";

const initialState = [];


export default function userReducer(state=initialState, action){
    switch (action.type) {
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE: 
            return {
                ...state, 
                picture: action.payload 
            };
        case UPDATE_BIO:
            return {
                ...state,
                bio:action.payload.bio,
                adresse:action.payload.adresse,
                membres:action.payload.membres,
                jeux:action.payload.jeux,
                social:{
                    facebook:action.payload.social.facebook,
                    twitter:action.payload.social.twitter,
                    youtube:action.payload.social.youtube,
                    instagram:action.payload.social.instagram,
                    discord:action.payload.social.discord,
                    twitch:action.payload.social.twitch,

                },
            };
            case FOLLOW_USER:
            return {
                ...state,
                following:[action.payload.idToFollow, ...state.following]
            };
            case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter((id)=> id!== action.payload.idToUnfollow)
            };
        default:
            return state;
    }
}