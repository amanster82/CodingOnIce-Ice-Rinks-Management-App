import React from "react";
import { withStyles } from "material-ui/styles";
import { compose, lifecycle } from "recompose";
import store from "lib/store";
import { fetchUnapprovedAccounts } from "lib/accounts";
import { connect } from "react-redux";

const styles = theme => ({

});

const mapStateToProps = store => ({
  all: store.accounts.all
})

const enhance = compose(
  withStyles(styles),
  lifecycle({
    componentDidMount() {
      store.dispatch(fetchUnapprovedAccounts())
    }
  }),
  connect(mapStateToProps)
)

export default () => (
  <div>admin interface</div>
);