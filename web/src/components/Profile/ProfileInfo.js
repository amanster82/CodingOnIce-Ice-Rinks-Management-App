import React from "react";
import { withStyles } from "material-ui/styles";
import Avatar from "material-ui/Avatar";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Face from "material-ui-icons/Face";
import MailOutline from "material-ui-icons/MailOutline";
import Done from "material-ui-icons/Done";
import { connect } from "react-redux";
import { compose } from "recompose";

const styles = theme => ({
  container: {
    height: '100%'
  },
  row: {
    display: "flex",
    justifyContent: "center"
  }
});

const mapStateToProps = store => ({
  account: store.accounts.current
});

const enhance = compose(withStyles(styles), connect(mapStateToProps));

export default enhance(({ classes: c, account }) => (
  <div className={c.container}>
    <List>
      <ListItem>
        <ListItemIcon>
          <Avatar>
            <Face />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={"Name: " + account.name} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Avatar>
            <MailOutline />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={"Email: " + account.email} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Avatar>
            <Done />
          </Avatar>
        </ListItemIcon>
        <ListItemText
          primary={"Approved: " + (account.approved ? "Yes" : "No")}
        />
      </ListItem>
    </List>
  </div>
));
