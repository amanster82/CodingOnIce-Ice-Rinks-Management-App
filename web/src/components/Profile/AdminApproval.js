import React from "react";
import { withStyles } from "material-ui/styles";
import { compose, lifecycle, renderComponent, branch } from "recompose";
import store from "lib/store";
import { fetchUnapprovedAccounts } from "lib/accounts";
import { connect } from "react-redux";
import Loading from "components/UI/Loading";
import Button from "material-ui/Button";

const styles = theme => ({
  container: {
    padding: '1rem'
  },
  row: {
    display: 'flex',
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.grey[500]}`,
      marginBottom: "1rem",
      paddingBottom: "1rem"
    }
  },
  name: {
    ...theme.typography.title,
    flex: 1,
    display: 'flex',
    alignItems: "center"
  },
  button: {
    marginLeft: '1rem'
  }
});

const mapStateToProps = store => ({
  unapproved: store.accounts.unapproved
});

const enhance = compose(
  withStyles(styles),
  lifecycle({
    componentDidMount() {
      store.dispatch(fetchUnapprovedAccounts());
    }
  }),
  connect(mapStateToProps),
  branch(({ unapproved }) => !unapproved, renderComponent(() => <Loading />)),
  branch(
    ({ unapproved }) => unapproved.length === 0,
    renderComponent(() => <div>No unapproved accounts in the queue.</div>)
  )
);

export default enhance(({ classes: c, unapproved }) => (
  <div className={c.container}>
    {unapproved.map(acc => (
      <div className={c.row}>
        <div className={c.name}>{acc.name}</div>
        <div className={c.button}>
          <Button raised color="primary">
            Approve
          </Button>
        </div>
      </div>
    ))}
  </div>
));
