import React from "react";
import { withStyles } from "material-ui/styles";
import ProfilePage from "components/Profile/ProfilePage";

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.grey[300],
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  name: {
    ...theme.typography.headline,
    padding: "0.75rem 0.75rem 0 0.75rem",
    color: theme.palette.primary[700],
    marginLeft: "2rem"
  },
  dashboard: {
    padding: "0 1rem 1rem 1rem",
    flex: 1,
    display: "flex"
  }
});

export default withStyles(styles)(({classes: c}) => (
  <div className={c.container}>
    <div className={c.name}>
    Welcome, Group Name
    </div>
    <div className={c.dashboard}>
        <ProfilePage />
    </div>
  </div>
));