import { getBookingsByRink, cancelBooking } from "lib/api/bookings";
import { getAllRinks, startMaintenance, endMaintenance } from "lib/api/rinks";

const initialState = {
  bookings: {},
  all: null,
  currentDate: new Date(),
  currentMonth: new Date().getMonth() + 1
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
    
      case "SET_CURRENT_MONTH":
        if (!action.month) {
          return state;
        }

        return {
          ...state,
          currentMonth: Math.max(Math.min(12, action.month), 1)
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

export function setCurrentMonth(month) {
  return { type: "SET_CURRENT_MONTH", month };
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
        dispatch(setAllRinks(json));
      },
      reject => dispatch(setAllRinks([]))
    );
  };
}

export function setMaintenance(rinkId, maintenance) {
  return function(dispatch) {
    return (maintenance
      ? startMaintenance(rinkId)
      : endMaintenance(rinkId)
    ).then(
      ({ res, json }) => {
        dispatch(fetchAllRinks());
      },
      reject => {}
    );
  };
}

export function doCancelBooking(rink, id) {
  return function(dispatch) {
    return cancelBooking(id).then(
      ({ res, json }) => {
        dispatch(fetchAllRinks());
      },
      reject => {}
    );
  };
}