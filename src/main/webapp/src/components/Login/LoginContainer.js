import React from "react";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import MenuItem from "material-ui/Menu/MenuItem";
import TextField from "material-ui/TextField";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import cx from "classnames";
import { withState, compose, withStateHandlers } from "recompose";
import Button from "material-ui/Button";
import Send from "material-ui-icons/Send";
import { createAccount } from "lib/api/accounts";

const styles = theme => ({
  container: {
    background: "rgba(192, 214, 230, 0.9)",
    padding: "40px",
    maxWidth: "447px",
    margin: "40px auto",
    borderRadius: "4px",
    boxShadow: "0 4px 10px 4px rgba(19, 35, 47, 0.3)"
  },

  tabGroup: {
    listStyle: "none",
    padding: "0px",
    margin: "0 0 40px 0",
    display: "flex",
    justifyContent: "center"
  },

  signUp: {
    background: "#466e92",
    color: "#ffffff",

    display: "block",
    textDecoration: "none",
    padding: "15px",
    background: "aliceblue",
    color: "#2f5590",
    fontSize: "21px",
    float: "left",
    width: "100%",
    textAlign: "center",
    cursor: "pointer",
    transition: ".5s ease"
  },
  placeHolder: {
    display: "flex",
    flexDirection: "row"
  },
  firstName: {
    flex: 1
  },

  lastName: {
    flex: 1,
    marginLeft: theme.spacing.unit
  },

  button: {
    margin: theme.spacing.unit
  },

  menu: {
    width: 200
  },

  submit: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

class LoginContainer extends React.Component {
  state = {
    toggle: 0,
    submit: false,
    check: false,
    name: "",
    last: "",
    email: "",
    pass: "",
    logPass: "",
    logEmail: ""
  };

  handleChange = field => event => {
    const value = event.target.value;
    this.setState(() => ({
      [field]: value
    }));
  };

  setToggle = toggle => this.setState(() => ({ toggle }));


  handleSubmit = (name) => {
    this.setState(() => ({submit: true}), () => {
        console.log("wtf name:");
        console.log(name);
        if(name === ""){
          this.setState(() => ({check: true}));
          this.setState(() => ({submit: true}));
        }

      createAccount({
        firstName: this.name,
        lastName: this.last,
        email: this.email,
        password: this.pass

      }).then(({res, account}) => {
  
      });
    });
  };

  render() {
    const { toggle, name, last, email, pass, logPass, logEmail, submit, check } = this.state;
    const { classes: c } = this.props;

    return (
      <form className={cx(c.container, "animated", {shake: check===true})} noValidate autoComplete="off">
        <Tabs
          value={toggle}
          onChange={(ev, value) => this.setToggle(value)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Sign Up" />
          <Tab label="Login" />
        </Tabs>

        {toggle === 0 && (
          <div className={c.placeHolder}>
            <TextField
              id="firstName"
              label="First Name"
              className={c.firstName}
              margin="normal"
              onChange={this.handleChange("name")}
              value={name}
            />

            <TextField
              id="lastName"
              label="Last Name"
              className={c.lastName}
              margin="normal"
              onChange={this.handleChange("last")}
              value={last}
            />
          </div>
        )}

        {toggle === 0 && (
          <TextField
            id="email"
            label="Email"
            fullWidth
            margin="normal"
            onChange={this.handleChange("email")}
          />
        )}

        {toggle === 0 && <div />}

        {toggle === 0 && (
          <TextField
            id="password"
            label="Set a Password"
            fullWidth
            margin="normal"
            type="password"
            onChange={this.handleChange("pass")}            
          />
        )}

        {toggle === 0 && <div style={{ height: "25px" }} />}

        {toggle === 0 && (
          <div className={c.submit}>
            <Button className={c.button} raised color="primary" onClick={() => this.handleSubmit(name)} disabled={submit}>
              Get Started
            </Button>
          </div>
        )}

        {toggle === 1 && (
          <TextField id="email" label="Email" fullWidth margin="normal" onChange={this.handleChange("logEmail")} />
        )}

        {toggle === 1 && <div />}

        {toggle === 1 && (
          <TextField id="password" label="Password" fullWidth margin="normal" type="password" onChange={this.handleChange("logPass")} />
        )}

        {toggle === 1 && <div style={{ height: "25px" }} />}

        {toggle === 1 && (
          <div className={c.submit}>
            <Button className={c.button} raised color="primary">
              Log in
            </Button>
          </div>
        )}
      </form>
    );
  }
}

export default withStyles(styles)(LoginContainer);
