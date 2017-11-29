import { getBookingsByRink } from "lib/api/bookings";
import { getAllRinks } from "lib/api/rinks";

const initialState = {
  bookings: {},
  all: null
};

export default function rinks(state = initialState, action) {
  switch (action.type) {
    case "SET_BOOKINGS_FOR_RINK":
      if (!action.rink || !action.bookings) {
        return state;
      }

      return {
        ...state,
        bookings: {
          [action.rink]: action.bookings
        }
      };

    case "SET_RINKS":
      if (!action.allRinks) {
        return state;
      }

      return {
        ...state,
        all: action.allRinks
      };

    default:
      return state;
  }
}

export function setBookingsForRink(rink, bookings) {
  return { type: "SET_BOOKINGS_FOR_RINK", rink, bookings };
}

export function setAllRinks(allRinks) {
  return { type: "SET_RINKS", allRinks };
}

export function fetchBookings(rink) {
  return function(dispatch) {
    return getBookingsByRink(rink).then(
      ({ res, json }) => {
        dispatch(setBookingsForRink(rink, json));
      },
      reject => dispatch(setBookingsForRink(rink, []))
    );
  };
}

export function fetchAllRinks() {
  return function(dispatch) {
    return getAllRinks().then(
      ({ res, json }) => {
        console.log(json);
        dispatch(setAllRinks(json));
      },
      reject => dispatch(setAllRinks([]))
    );
  };
}
