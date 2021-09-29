import { GET_USER, UPLOAD_PICTURE, UPDATE_BIO, FOLLOW_USER, UNFOLLOW_USER, UPDATE_ADRESSE, UPDATE_MEMBRE, UPDATE_JEUX } from "../actions/user.actions";

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
                bio:action.payload
            };
            case UPDATE_ADRESSE:
            return {
                ...state,
                adresse:action.payload
            };
            case UPDATE_MEMBRE:
            return {
                ...state,
                membres:action.payload
            };
            case UPDATE_JEUX:
            return {
                ...state,
                jeux:action.payload
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