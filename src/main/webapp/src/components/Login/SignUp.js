import React from "react";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import { withStateHandlers, compose } from "recompose";
import { withStyles } from "material-ui/styles";
import { createAccount } from "lib/api/accounts";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  inline: {
    display: "flex"
  },
  flexed: {
    flex: 1,
    "&:not(:last-child)": {
      marginRight: "0.5rem"
    }
  },
  button: {
    marginTop: "1rem"
  },
  alert: {
    ...theme.typography.headline,
    marginTop: "1rem",
    color: theme.palette.error[700]
  }
});

const enhance = compose(
  withStyles(styles),
  withStateHandlers(
    ({
      name = "",
      last = "",
      email = "",
      password = "",
      submit = false,
      first = true,
      alert = "",
      success = false
    }) => ({
      name,
      last,
      email,
      password,
      submit,
      first,
      alert,
      success
    }),
    {
      handleChange: () => (key, value) => ({
        [key]: value
      }),
      reset: () => message => ({ submit: false, alert: message }),
      redirect: () => () => ({ success: true }),
      requestCreation: ({ name, last, email, password }) => (
        reset,
        redirect
      ) => {
        createAccount({ firstName: name, lastName: last, email, password })
          .then(({ res, obj }) => redirect())
          .catch(exc => reset("Server is unavailable"));

        return { submit: true, first: false, alert: "" };
      }
    }
  )
);

function validate(name, last, email, password) {
  return name === "" || last === "" || email === "" || password === "";
}

export default enhance(
  ({
    classes: c,
    name,
    last,
    email,
    password,
    submit,
    handleChange,
    requestCreation,
    reset,
    first,
    alert,
    success,
    redirect
  }) => (
    <div>
      <div className={c.inline}>
        <TextField
          id="firstName"
          label="First Name"
          className={c.flexed}
          margin="normal"
          onChange={ev => handleChange("name", ev.target.value)}
          value={name}
          error={!first && name === ""}
          helperText={!first && name === "" ? "First name must be set" : ""}
        />
        <TextField
          id="lastName"
          label="Last Name"
          className={c.flexed}
          margin="normal"
          onChange={ev => handleChange("last", ev.target.value)}
          value={last}
          error={!first && last === ""}
          helperText={!first && last === "" ? "Last name must be set" : ""}
        />
      </div>
      <TextField
        id="email"
        label="Email"
        fullWidth
        margin="normal"
        onChange={ev => handleChange("email", ev.target.value)}
        value={email}
        error={!first && email === ""}
        helperText={!first && email === "" ? "Email must be set" : ""}
      />
      <TextField
        id="password"
        label="Set a Password"
        fullWidth
        margin="normal"
        type="password"
        onChange={ev => handleChange("password", ev.target.value)}
        value={password}
        error={!first && password === ""}
        helperText={!first && password === "" ? "Password must be set" : ""}
      />
      <Button
        className={c.button}
        raised
        color="primary"
        disabled={validate(name, last, email, password) || submit}
        onClick={() => requestCreation(reset, redirect)}
      >
        Get Started
      </Button>
      {alert !== "" && <div className={c.alert}>{alert}</div>}
      {success && <Redirect to="/profile" />}
    </div>
  )
);
