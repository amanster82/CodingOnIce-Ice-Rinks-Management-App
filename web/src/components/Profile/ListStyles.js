import green from "material-ui/colors/green";
import red from "material-ui/colors/red";

export default theme => ({
  container: {
    padding: "1rem"
  },
  row: {
    display: "flex",
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.grey[500]}`,
      marginBottom: "1rem",
      paddingBottom: "1rem"
    }
  },
  name: {
    ...theme.typography.title,
    flex: 1,
    display: "flex",
    alignItems: "center"
  },
  button: {
    marginLeft: "1rem"
  },
  none: {
    ...theme.typography.title,
    padding: "1.5rem"
  },
  inline: {
    display: 'inline-block',
    '&:not(:first-child)': {
      marginLeft: '1rem'
    }
  },
  paid: {
    color: green[500]
  },
  unpaid: {
    color: red[500]
  },
  small: {
    fontSize: theme.typography.subheading.fontSize
  }
});
