import {
  getCurrentAccount,
  logout,
  getUnapprovedAccounts,
  approveAccount
} from "lib/api/accounts";

const initialState = {
  current: {
    loggedIn: false,
    loaded: false
  },
  unapproved: null
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
          loggedIn: true,
          loaded: true
        }
      };

    case "SET_LOGOUT":
      return initialState;

    case "SET_LOADED":
      return { ...state, current: { ...state.current, loaded: true } };

    case "SET_UNAPPROVED_ACCOUNTS":
      if (!action.accounts) {
        return state;
      }

      return { ...state, unapproved: action.accounts };

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

export function setUnapprovedAccounts(accounts) {
  return { type: "SET_UNAPPROVED_ACCOUNTS", accounts };
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
    return getUnapprovedAccounts().then(
      ({ res, json }) => {
        dispatch(setUnapprovedAccounts(json));
      },
      reject => dispatch(setUnapprovedAccounts([]))
    );
  };
}

export function doApproveAccount(id) {
  return function(dispatch) {
    return approveAccount(id).then(
      ({ res, json }) => {
        dispatch(fetchUnapprovedAccounts());
      },
      reject => {}
    );
  }; 
}
