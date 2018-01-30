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

const searchBox = (store, action) => {
  return store || Immutable.Map({ searchTerm: 'foo' });
}

export default combineReducers({
  checkBox,
  number,
  searchBox
});
