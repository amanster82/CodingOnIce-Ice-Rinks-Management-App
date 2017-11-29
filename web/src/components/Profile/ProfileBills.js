import React from "react";
import { withStyles } from "material-ui/styles";
import { compose, lifecycle, renderComponent, branch } from "recompose";
import store from "lib/store";
import { fetchUnapprovedAccounts } from "lib/accounts";
import { connect } from "react-redux";
import Loading from "components/UI/Loading";
import Button from "material-ui/Button";
import { fetchBills, doPayBill } from "lib/accounts";
import styles from "./ListStyles";
import cx from "classnames";
import { prettyDateInterval } from "lib/calendar";

const mapStateToProps = store => ({
  account: store.accounts.current,
  bills: store.accounts.current.bills || []
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      store.dispatch(fetchBills(this.props.account.id));
    }
  }),
  branch(
    ({ account }) => !account || !account.loaded,
    renderComponent(() => <Loading />)
  ),
  branch(
    ({ bills }) => bills.length === 0,
    renderComponent(({ classes }) => (
      <div className={classes.none}>You have no bills on your account</div>
    ))
  )
);

export default enhance(({ classes: c, bills, account }) => (
  <div className={c.container}>
    {bills.map(bill => (
      <div className={c.row}>
        <div className={c.name}>
          <div className={c.inline}>${bill.balance.toFixed(2)}</div>
          <div className={cx(c.inline, c.small)}>
            issued {prettyDateInterval(bill.issueDate, "", " ago")}
          </div>
          <div
            className={cx(c.inline, {
              [c.paid]: bill.paid,
              [c.unpaid]: !bill.paid
            })}
          >
            {bill.paid ? "Paid" : "Unpaid"}
          </div>
        </div>
        <div className={c.button}>
          <Button
            raised
            color="primary"
            onClick={() => store.dispatch(doPayBill(account.id, bill.id))}
            disabled={bill.paid}
          >
            Pay Now
          </Button>
        </div>
      </div>
    ))}
  </div>
));
