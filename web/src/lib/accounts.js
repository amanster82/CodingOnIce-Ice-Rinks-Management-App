import { getCurrentAccount, logout } from "lib/api/accounts";

const initialState = {
  current: {
    loggedIn: false
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

    default:
      return state;
  }
}

export function setAccount(account) {
  return { type: "SET_CURRENT_ACCOUNT", account };
}

export function setLogout() {
  return { type: "SET_LOGOUT"};
}

export function fetchAccount() {
  return function(dispatch) {
    return getCurrentAccount().then(
      ({ res, json }) => {
        dispatch(setAccount(json));
      },
      reject => {}
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
