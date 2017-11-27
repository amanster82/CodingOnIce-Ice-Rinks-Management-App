import React from "react";
import { withStyles } from "material-ui/styles";
import ProfileBox from "./ProfileBox";
import ProfileUpcomingEvents from "./ProfileUpcomingEvents";
import ProfileBills from "./ProfileBills";
import ProfileInfo from "./ProfileInfo";

const styles = theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    gridTemplateRows: "50% 50%",
    width: "100%",
    height: "100%"
  }
});

export default withStyles(styles)(({ classes: c }) => (
  <div className={c.container}>
    <ProfileBox title="Upcoming events">
      <ProfileUpcomingEvents />
    </ProfileBox>
    <ProfileBox title="Current bills">
      <ProfileBills />
    </ProfileBox>
    <ProfileBox title="Profile Info">
    <ProfileInfo />
  </ProfileBox>
  </div>
));
