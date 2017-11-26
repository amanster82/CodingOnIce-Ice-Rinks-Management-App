import { get, post } from "./helper";

export function getBookingsByRink(rinkId) {
  return get(`/bookings/rink/${rinkId}`);
}

export function createBooking(rinkId, startTime, length) {
  return post("/bookings", {
    rinkId,
    length,
    // Start time must be an ISO formatted string, so convert Date object to string
    startTime: typeof startTime === "object" ? startTime.toISOString() : startTime
  });
}
