import React from "react";
import LoginPage from "components/Login/LoginPage";
import { withStyles } from "material-ui/styles";

const styles = theme => ({});

export default withStyles(styles)(() => (
  <div style={{ height: "100%" }}>
    <LoginPage />
  </div>
));
