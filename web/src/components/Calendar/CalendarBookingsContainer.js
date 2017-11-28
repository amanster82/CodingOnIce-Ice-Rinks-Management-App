import { branch, renderComponent } from "recompose";
import CalendarBookingsTable from "./CalendarBookingsTable";
import CalendarBookings from "./CalendarBookings";

// Branch between rendering the timetable view or tagged view
export default branch(
  ({ timeTable }) => timeTable,
  renderComponent(CalendarBookingsTable),
  renderComponent(CalendarBookings)
)();
