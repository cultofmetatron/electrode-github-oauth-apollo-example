import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { setSearchResults } from '../actions';
const queryString = (query) => `https://api.github.com/search/users?q=${query}` 

const requestUsers = (query) => axios.get(queryString(query));

function* fetchUsers(action) {
  //let users = yield call(requestUsers, action.query);
  let response = yield axios.get(queryString(action.query));
  if (response.data) {
    yield put(setSearchResults({results: response.data.items}));
  }
}


function* rootSaga(action) {
  yield takeLatest("SearchBox:searchTerm:update", fetchUsers);
}

export default rootSaga;