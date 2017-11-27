import { getCurrentAccount } from "lib/api/accounts";

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

    default:
      return state;
  }
}

export function setAccount(account) {
  return { type: "SET_CURRENT_ACCOUNT", account };
}

export function fetchAccount() {
  return function(dispatch) {
    return getCurrentAccount().then(({ res, json }) => {
      dispatch(setAccount(json));
    }, reject => {});
  };
}
