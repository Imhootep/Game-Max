import { GET_SOCIAL } from "../actions/user.actions";

const initialState = {};

export default function trendingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SOCIAL:
      return action.payload;
    default:
      return state;
  }
}