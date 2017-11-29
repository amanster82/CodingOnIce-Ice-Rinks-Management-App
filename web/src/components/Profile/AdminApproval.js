import React from "react";
import { withStyles } from "material-ui/styles";
import { compose, lifecycle, renderComponent, branch } from "recompose";
import store from "lib/store";
import { fetchUnapprovedAccounts } from "lib/accounts";
import { connect } from "react-redux";
import Loading from "components/UI/Loading";

const styles = theme => ({

});

const mapStateToProps = store => ({
  unapproved: store.accounts.unapproved
})

const enhance = compose(
  withStyles(styles),
  lifecycle({
    componentDidMount() {
      store.dispatch(fetchUnapprovedAccounts())
    }
  }),
  connect(mapStateToProps),
  branch(({unapproved}) => !unapproved,
    renderComponent(Loading)
  )
)

export default enhance(() => (
  <div>admin interface</div>
));