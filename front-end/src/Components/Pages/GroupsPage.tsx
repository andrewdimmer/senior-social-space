import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import React, { Fragment } from "react";

const GroupsPage: React.FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  return (
    <Fragment>
      <Container>
        <Typography
          variant="h3"
          id="profileTourStep1"
          display="inline"
          style={{ flexGrow: 1 }}
        >
          Groups
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "1%", float: "right" }}
        >
          New
        </Button>
      </Container>
      <Divider variant="inset" />
      <List>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Friday Night Bridge Group"
            secondary={
              <Fragment>
                <React.Fragment>{" Remy Sharp"}</React.Fragment>
                <br />
                <React.Fragment>{" Ron McDillan"}</React.Fragment>
              </Fragment>
            }
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "2%" }}
          >
            Enter room
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "2%" }}
          >
            Send room link
          </Button>
          <Button variant="contained" color="secondary">
            Leave room
          </Button>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Sunday Knitters Circle"
            secondary={
              <Fragment>
                <React.Fragment>{" Nathan Dimmer"}</React.Fragment>
                <br />
                <React.Fragment>{" Ron McDillan"}</React.Fragment>
              </Fragment>
            }
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "2%" }}
          >
            Enter room
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "2%" }}
          >
            Send room link
          </Button>
          <Button variant="contained" color="secondary">
            Leave room
          </Button>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </Fragment>
  );
};

export default GroupsPage;
