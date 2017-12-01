import React from "react";
import { withStyles } from "material-ui/styles";
import ProfileBox from "./ProfileBox";
import ProfileUpcomingEvents from "./ProfileUpcomingEvents";
import ProfileBills from "./ProfileBills";
import ProfileInfo from "./ProfileInfo";
import AdminApproval from "./AdminApproval";
import { connect } from "react-redux";
import { compose, branch, renderComponent } from "recompose";
import Redirect from "react-router-dom";


const styles = theme => ({
  container: {
    display: "grid",
    gridTemplateRows: "50% 50%",
    gridTemplateColumns: "50%  50%",
    width: "100%",
    height: "100%"
  }
});

const mapStateToProps = store => ({
  account: store.accounts.current
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
);

export default enhance(({ classes: c, account }) => (
  <div className={c.container}>
      <ProfileBox className="animated fadeInLeft" title="My upcoming events" large={!account.admin}>
        <ProfileUpcomingEvents />
      </ProfileBox>
    <ProfileBox title="Profile Info">
      <ProfileInfo />
    </ProfileBox>
    <ProfileBox title="Current bills" padded>
      <ProfileBills />
    </ProfileBox>
    {account.admin && (
      <ProfileBox title="Approve accounts">
        <AdminApproval />
      </ProfileBox>
    )}
  </div>
));
