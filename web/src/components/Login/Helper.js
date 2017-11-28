import { withStateHandlers, compose } from "recompose";
import { withStyles } from "material-ui/styles";
import store from "lib/store";
import { fetchAccount } from "lib/accounts";

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
  },
  success: {
    ...theme.typography.headline,
    marginTop: "1rem"
  }
});

export default compose(
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
      registerDone: () => () => {
        return { success: true };
      },
      loginDone: () => () => {
        store.dispatch(fetchAccount());

        return { success: true };
      },
      requestCreation: ({ name, last, email, password }) => (
        functor,
        reset,
        successAction,
        failMessage
      ) => {
        functor({ firstName: name, lastName: last, email, password })
          .then(({ res, obj }) => successAction())
          .catch(exc => reset(failMessage));

        return { submit: true, first: false, alert: "" };
      }
    }
  )
);
