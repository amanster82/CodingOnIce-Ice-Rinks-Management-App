import { getBookingsByRink } from "lib/api/bookings";

const initialState = {
  bookings: {}
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

    default:
      return state;
  }
}

export function setBookingsForRink(rink, bookings) {
  return { type: "SET_BOOKINGS_FOR_RINK", rink, bookings };
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
