import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunkMiddleware from 'redux-thunk'
import accounts, { fetchAccount } from "./accounts";

const store = createStore(combineReducers({
  accounts
}), applyMiddleware(
  thunkMiddleware
));

store.dispatch(fetchAccount());

export default store;