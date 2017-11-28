import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunkMiddleware from 'redux-thunk'
import accounts, { fetchAccount } from "./accounts";
import rinks from "./rinks";

const store = createStore(combineReducers({
  accounts,
  rinks
}), applyMiddleware(
  thunkMiddleware
));

store.dispatch(fetchAccount());

export default store;