import React from "react";
import { withStyles } from "material-ui/styles";
import ProfileBox from "./ProfileBox";
import ProfileUpcomingEvents from "./ProfileUpcomingEvents";
import ProfileBills from "./ProfileBills";
import ProfileInfo from "./ProfileInfo";

const styles = theme => ({
  container: {
    display: "grid",
    gridTemplateRows: "50% 50%",
    width: "100%",
    height: "100%"
  },

  container2: {
    display: "grid",
    gridTemplateColumns: "100%",
    gridTemplateRows: "100%!important",
    width: "100%",
    height: "100%"
  }
});

export default withStyles(styles)(({ classes: c }) => [
  <div className={c.container2}>
    <ProfileBox title="Upcoming events">
      <ProfileUpcomingEvents />
    </ProfileBox>
  </div>,

  <div className={c.container}>
    <ProfileBox title="Profile Info">
      <ProfileInfo />
    </ProfileBox>
    <ProfileBox title="Current bills">
      <ProfileBills />
    </ProfileBox>
  </div>
]);
