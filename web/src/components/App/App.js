import React from "react";
import RootLayout from "routes/RootLayout";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import RootNav from "components/Navigation/RootNav";
import Logo from "static/logo.png"

const styles = theme => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {},
  layout: {
    flex: 1,
    overflowY: 'auto'
  }
});

export default withStyles(styles)(({ classes: c }) => (
  <div className={c.container}>
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit" className={c.title}>
          <img src={Logo} style={{filter:'brightness(10)', width:'15%'}}></img> 
        </Typography>
        <RootNav />
      </Toolbar>
    </AppBar>
    <div className={c.layout}>
      <RootLayout />
    </div>
  </div>
));
