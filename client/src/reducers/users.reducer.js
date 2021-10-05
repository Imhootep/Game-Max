import { GET_USERS, GET_ROLED_USERS } from "../actions/users.actions";

const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case GET_ROLED_USERS:
      return action.payload;
    default:
      return state;
  }
}
