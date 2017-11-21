import React from "react";
import RootLayout from "routes/RootLayout";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import RootNav from "components/Navigation/RootNav";

const styles = theme => ({
  container: {},
  title: {}
});

export default withStyles(styles)(({ classes: c }) => (
  <div className={c.container}>
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit" className={c.title}>
          Title
        </Typography>
        <RootNav />
      </Toolbar>
    </AppBar>
    <RootLayout />
  </div>
));
