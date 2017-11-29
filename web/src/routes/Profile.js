import React from "react";
import { withStyles } from "material-ui/styles";
import ProfilePage from "components/Profile/ProfilePage";
import { connect } from "react-redux";
import { compose, branch, renderComponent } from "recompose";
import { CircularProgress } from "material-ui/Progress";
import { Redirect } from "react-router-dom";

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
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }
});

const mapStateToProps = store => ({
  account: store.accounts.current
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps),
  branch(
    ({ account }) => !account.loaded,
    renderComponent(({ classes: c }) => (
      <div className={c.loading}>
        <CircularProgress />
      </div>
    ))
  )
);

export default enhance(({ classes: c, account }) => (
  <div className={c.container}>
    <div className={c.name}>Welcome, {account.name}</div>
    <div className={c.dashboard}>
      <ProfilePage />
    </div>
    {!account.loggedIn && <Redirect to="/login" />}
  </div>
));
