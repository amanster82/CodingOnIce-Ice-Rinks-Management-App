import React from "react";
import { withStyles } from "material-ui/styles";
import { tagThemes, times } from "lib/calendar";
import cx from "classnames";
import { withStateHandlers, compose } from "recompose";
import Popover from "material-ui/Popover";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import { createBooking } from "lib/api/bookings";
import { Redirect } from "react-router-dom";
import { currentMonth } from "lib/calendar";

// start is the starting hour for an event in 24 hr time
const getOffset = (ref, day, times, start, length, rink) => {
  const comparison = start;
  const end = start + length;
  const first = rink.startHour;
  const last = rink.endHour;

  const pixelDiff = ref.clientHeight - 0;
  const timeDiff = last - first;

  const ratio = timeDiff / pixelDiff;

  const timeOffset = comparison - first;
  const endOffset = end - first;
  const pixelOffset = timeOffset / ratio;
  const heightOffset = endOffset / ratio;

  return { top: pixelOffset, height: heightOffset - pixelOffset };
};

const styles = theme => ({
  bubble: {
    position: "absolute",
    textAlign: "left",
    width: "100%",
    transition: theme.transitions.create(["top", "height"], {
      duration: theme.transitions.duration.complex
    })
  },
  name: {
    ...theme.typography.caption,
    color: theme.palette.common.white,
    textTransform: "uppercase",
    padding: "0.25rem 0 0 0.25rem"
  },
  eventTime: {
    ...theme.typography.body1,
    color: theme.palette.common.white,
    padding: "0 0 0 0.25rem"
  },
  free: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#4caf50 !important"
    }
  },
  selected: {
    backgroundColor: "#80e27e !important",
    "& $eventTime": {
      color: "black"
    },
    "& $name": {
      color: "black"
    }
  },
  popover: {
    position: "relative"
  },
  popoverContent: {
    padding: "1.5rem"
  },
  field: {
    marginTop: "1rem"
  },
  button: {
    marginLeft: "1rem"
  },
  alert: {
    ...theme.typography.body4,
    marginTop: "1rem",
    color: theme.palette.error[700]
  }
});

const enhance = compose(
  withStyles(styles),
  withStateHandlers(
    ({ booking, rink }) => ({
      selected: false,
      formStart: booking.start,
      formLength: Math.min(3, booking.length),
      formName: "New event",
      booking,
      rink,
      success: false,
      alert: "",
      sending: false
    }),
    {
      setSelected: () => select => ({ selected: select }),
      setStart: ({ rink, booking, formStart, formLength }) => start => {
        if (start === "") {
          return { formStart: booking.start };
        }

        let val = Math.min(
          Math.max(rink.startHour, parseInt(start.split(":")[0])),
          rink.endHour
        );

        if (val < booking.start) {
          val = booking.start;
        } else if (val + formLength > booking.start + booking.length) {
          val = booking.start + booking.length - formLength;
        }

        return {
          formStart: val + formLength > rink.endHour ? formStart : val
        };
      },
      setLength: ({ booking, rink, formStart }) => length => ({
        formLength: Math.min(
          Math.max(1, length),
          formStart + length > booking.start + booking.length
            ? rink.endHour - formStart
            : 3
        )
      }),
      setName: () => name => ({ formName: name }),
      setSending: () => sending => ({ sending }),
      queryResult: () => (res, message) => {
        return {
          success: res,
          alert: message,
          sending: false
        };
      }
    }
  )
);

const sendRequest = (params, blocker, resulter) => {
  blocker(true);

  createBooking(params.rink, new Date(2017, currentMonth - 1, params.day, params.start, 0, 0, 0), params.length)
    .then(({ res, json }) => {
      if (res.status === 200) {
        resulter(true, "Booking has been created")
      } else {
        resulter(false, "Wrong parameters")
      }
    })
    .catch(() => {
      resulter(false, "Unable to create booking at this time")
    });
};

export default enhance(
  ({
    classes: c,
    booking,
    container,
    day,
    i,
    rink,
    free,
    selected,
    setSelected,
    formStart,
    formLength,
    formName,
    setStart,
    setLength,
    setName,
    alert,
    success,
    queryResult,
    sending,
    setSending
  }) => (
    <div
      className={cx(c.bubble, { [c.free]: free, [c.selected]: selected })}
      style={{
        top:
          getOffset(
            container,
            day,
            times(day, rink.startHour, rink.endHour),
            selected ? formStart : booking.start,
            selected ? formLength : booking.length,
            rink
          ).top + "px",
        height:
          getOffset(
            container,
            day,
            times(day, rink.startHour, rink.endHour),
            selected ? formStart : booking.start,
            selected ? formLength : booking.length,
            rink
          ).height + "px",
        backgroundColor: free ? "rgba(0,0,0,0)" : tagThemes[i % 3]
      }}
      onClick={() => setSelected(true)}
    >
      <div className={c.name}>{selected ? formName : booking.name}</div>
      <div className={c.eventTime}>
        {selected ? formStart : booking.start}:00 -{" "}
        {(selected ? formStart : booking.start) +
          (selected ? formLength : booking.length)}:00
      </div>
      <div className={c.popover}>
        <Popover
          open={selected}
          onRequestClose={() => setSelected(false)}
          anchorEl={container}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <div className={c.popoverContent}>
            <div>Confirm new booking</div>
            <div className={c.field}>
              <TextField
                value={formName}
                label="Event name"
                onChange={ev => setName(ev.target.value)}
              />
            </div>
            <div className={c.field}>
              <TextField
                label="Start time"
                type="time"
                min="09:00"
                max="18:00"
                onChange={ev => setStart(ev.target.value)}
                value={
                  !selected
                    ? `${
                        booking.start < 10 ? "0" + booking.start : booking.start
                      }:00`
                    : `${formStart < 10 ? "0" + formStart : formStart}:00`
                }
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
                <Select
                  value={formLength}
                  onChange={ev => setLength(ev.target.value)}
                  input={<Input id="length" />}
                >
                  <MenuItem value={1}>1 Hour</MenuItem>
                  <MenuItem value={2}>2 Hours</MenuItem>
                  <MenuItem value={3}>3 Hours</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={c.field}>
              <Button
                onClick={() =>
                  sendRequest(
                    { start: formStart, length: formLength, rink: rink.id, day },
                    setSending,
                    queryResult
                  )
                }
                color="primary"
                raised
                disabled={sending}
              >
                Create
              </Button>
              <Button
                onClick={ev => {
                  ev.stopPropagation();
                  setSelected(false);
                }}
                color="primary"
                raised
                className={c.button}
              >
                Cancel
              </Button>
              {alert !== "" && <div className={c.alert}>{alert}</div>}
              {success && <Redirect to={"/calendar/"+rink.id} />}
            </div>
          </div>
        </Popover>
      </div>
    </div>
  )
);
