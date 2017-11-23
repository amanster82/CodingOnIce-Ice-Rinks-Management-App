import React from "react";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";

const styles = theme => ({
  timeField: {},
  field: {
    marginTop: '1rem'
  }
});

export default withStyles(styles)(
  ({ classes: c, day, showDialog, setShowDialog }) => (
    <Dialog open={showDialog} onRequestClose={() => setShowDialog(false)}>
      <DialogTitle>Create new booking</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a booking for this day, select an available start time and
          booking length. Time must be within business hours (09:00 to 18:00).
        </DialogContentText>
        <div className={c.field}>
          <TextField
            id="time"
            label="Start time"
            type="time"
            min="09:00"
            max="18:00"
            defaultValue="09:00"
            className={c.timeField}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 900 // 15 min
            }}
          />
        </div>
        <div className={c.field}>
          <FormControl>
            <InputLabel htmlFor="length">Length</InputLabel>
            <Select value={1} onChange={() => {}} input={<Input id="length" />}>
              <MenuItem value={1}>1 Hour</MenuItem>
              <MenuItem value={2}>2 Hours</MenuItem>
              <MenuItem value={3}>3 Hours</MenuItem>
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowDialog(false)} color="primary">
          Create
        </Button>
        <Button onClick={() => setShowDialog(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
);
