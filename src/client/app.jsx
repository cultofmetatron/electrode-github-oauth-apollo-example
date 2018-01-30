//
// This is the client side entry point for the React app.
//

import React from "react";
import { render } from "react-dom";
import { routes } from "./routes";
import { Router, browserHistory, Route } from "react-router";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import Home from "./components/home";
import SearchView from './components/search-view';
import { userLogin } from './actions'
//

//
// Add the client app start up code to a function as window.webappStart.
// The webapp's full HTML will check and call it once the js-content
// DOM is created.
//

const getLoggedInData = () => {

  let cookies = document.cookie.split(';').map((str) => str.trim()).map((str) => {
    let [key, value] = str.split('=');
    return {key: key, value: value};
  })
  .filter((cookie) => cookie.key === 'auth_token')

  if (cookies.length === 1) {
    return cookies[0].value;
  } else {
    return null;
  }
}

window.webappStart = () => {
  const initialState = window.__PRELOADED_STATE__;
  const store = createStore(rootReducer, initialState);

  const onBootup = (nextState, replace, callback) => {
    debugger
    if (!store.getState().user.isLoggedIn) {
      let accessToken = getLoggedInData();
      if (accessToken) {
        store.dispatch(userLogin({accessToken: accessToken}))
        callback();
      }
    }
  }

  render(
    <Provider store={store}>
      <Router history={browserHistory}>
        {routes}
      </Router>
      
    </Provider>,
    document.querySelector(".js-content")
  );
};
