import React from "react";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import { compose } from "recompose";

const styles = theme => ({

});

const mapStateToProps = store => ({
  ...store.accounts.current
})

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
);

// add menu links for: profile, logout

export default enhance(({classes: c, name}) => (
  <div>{name}</div>
));