import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// import { getUsers } from "./actions/users.actions";


//----- Credits -----//
//** Front-end developers **//
// - Guillaume FRANCOIS
// - Francois BRAIBANT
//** Back-end developers **//
// - Florian CAMMARATA
// - Alan LOUIS



// dev tools
import { composeWithDevTools } from "redux-devtools-extension";
// import { getPosts } from "./actions/post.actions";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
//on fait un getUsers dès qu'on ouvre l'application
// store.dispatch(getUsers());
// store.dispatch(getPosts());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
