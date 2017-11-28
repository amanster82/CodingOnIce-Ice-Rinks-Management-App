import React from "react";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import { login } from "lib/api/accounts";
import { Redirect } from "react-router-dom";
import enhance from "./Helper";

function validate(email, password) {
  return email === "" || password === "";
}

export default enhance(
  ({
    classes: c,
    email,
    password,
    submit,
    handleChange,
    requestCreation,
    reset,
    first,
    alert,
    success,
    redirect,
    loginDone
  }) => (
    <div>
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
        disabled={validate(email, password) || submit}
        onClick={() => requestCreation(login, reset, loginDone, "Invalid email or password")}
      >
        Login
      </Button>
      {alert !== "" && <div className={c.alert}>{alert}</div>}
      {success && <Redirect to="/profile" />}
    </div>
  )
);
