import { GET_USER, UPLOAD_PICTURE, UPDATE_BIO, FOLLOW_USER } from "../actions/user.actions";

const initialState = {};


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
            }
            case FOLLOW_USER:
            return {
                ...state,
                following:[action.payload.idToFollow, ...state.following]
            }
        default:
            return state;
    }
}