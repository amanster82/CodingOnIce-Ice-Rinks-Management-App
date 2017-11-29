import {
  getCurrentAccount,
  logout,
  getUnapprovedAccounts
} from "lib/api/accounts";

const initialState = {
  current: {
    loggedIn: false,
    loaded: false
  }
};

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_ACCOUNT":
      if (!action.account) {
        return state;
      }

      return {
        ...state,
        current: {
          ...action.account,
          loggedIn: true
        }
      };

    case "SET_LOGOUT":
      return initialState;

    case "SET_LOADED":
      return { ...state, current: { ...state.current, loaded: true } };

    default:
      return state;
  }
}

export function setAccount(account) {
  return { type: "SET_CURRENT_ACCOUNT", account };
}

export function setLogout() {
  return { type: "SET_LOGOUT" };
}

export function setLoaded() {
  return { type: "SET_LOADED" };
}

export function fetchAccount() {
  return function(dispatch) {
    return getCurrentAccount().then(
      ({ res, json }) => {
        dispatch(setAccount(json));
      },
      reject => dispatch(setLoaded())
    );
  };
}

export function doLogout() {
  return function(dispatch) {
    return logout().then(
      ({ res, json }) => {
        dispatch(setLogout());
      },
      reject => dispatch(setLogout())
    );
  };
}

export function fetchUnapprovedAccounts() {
  return function(dispatch) {
    return logout().then(
      ({ res, json }) => {
        dispatch(getUnapprovedAccounts());
      },
      reject => dispatch(getUnapprovedAccounts())
    );
  };
}
