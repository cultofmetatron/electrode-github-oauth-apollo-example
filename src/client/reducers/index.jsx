import {combineReducers} from "redux";
import Immutable from 'immutable';

const checkBox = (store, action) => {
  if (action.type === "TOGGLE_CHECK") {
    return {
      checked: !store.checked
    };
  }

  return store || {checked: false};
};

const number = (store, action) => {
  if (action.type === "INC_NUMBER") {
    return {
      value: store.value + 1
    };
  } else if (action.type === "DEC_NUMBER") {
    return {
      value: store.value - 1
    };
  }

  return store || {value: 0};
};

const searchBox = (store = {
  searchQuery: "",
  results: []
}, action) => {
  if (action.type === "SearchBox:searchTerm:update") {
    //return store.set("searchQuery", action.term);
    //store.searchQuery = action.query;
    return {
      ...store,
      searchQuery: action.query
    };
  }

  if (action.type === "SearchBox:results:update") {
    
    return {
      ...store,
      results: action.results
    }
  }


  return store;
}

const user = (store, action) => {

  if (action.type === "User:login") {
    return {
      ...store,
      accessToken: action.accessToken,
      isLoggedIn: true
    };
  }

  return store || Immutable.Map({
    isLoggedIn: false,
    accessToken: null
  });;
}

export default combineReducers({
  checkBox,
  number,
  searchBox,
  user
});
