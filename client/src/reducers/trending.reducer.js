import { GET_TRENDS, GET_FAVORITES} from "../actions/post.actions";

const initialState = {};

export default function trendingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRENDS:
      return action.payload;
      case GET_FAVORITES:
      return action.payload;
    default:
      return state;
  }
}
