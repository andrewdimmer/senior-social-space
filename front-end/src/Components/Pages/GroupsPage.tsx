import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField
} from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";
import { sendNotifications } from "../../Scripts/sendNotifications";

const GroupsPage: React.FunctionComponent<PageProps> = ({
  handleUpdateNotification,
  currentUser,
  classes
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const [emails, setEmails] = React.useState<string>("");
  const [phones, setPhones] = React.useState<string>("");
  const [whatsApps, setWhatsApps] = React.useState<string>("");
  const [sendData, setSendData] = React.useState<{
    group: string;
    link: string;
  } | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSend = () => {
    if (sendData) {
      const name = currentUser?.displayName
        ? currentUser.displayName
        : currentUser?.email
        ? currentUser.email
        : currentUser?.phoneNumber
        ? currentUser.phoneNumber
        : currentUser?.uid
        ? currentUser.uid
        : "";
      sendNotifications(
        phones,
        name,
        sendData.group,
        sendData.link,
        whatsApps,
        emails
      )
        .then(result => {
          if (result) {
            handleUpdateNotification({
              type: "success",
              message: "Invites Sent Successfully",
              open: true
            });
          } else {
            handleUpdateNotification({
              type: "error",
              message: "Something went wrong. Please try again later.",
              open: true
            });
          }
        })
        .catch(err => {
          console.log(err);
          handleUpdateNotification({
            type: "error",
            message: "Something went wrong. Please try again later.",
            open: true
          });
        });
      setEmails("");
      setPhones("");
      setWhatsApps("");
      setSendData(null);
    } else {
      handleUpdateNotification({
        type: "error",
        message: "No data to send",
        open: true
      });
    }
  };

  const handleCancel = () => {
    setEmails("");
    setPhones("");
    setWhatsApps("");
    setSendData(null);
  };

  const handleEmailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmails(event.target.value);
  };
  const handlePhonesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhones(event.target.value);
  };
  const handleWhatsAppsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWhatsApps(event.target.value);
  };
  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h3">Groups</Typography>
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
            onClick={() => {
              window.location.href =
                window.location.href + "?groupId=?FridayNightBridge44563";
            }}
          >
            Enter room
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "2%" }}
            onClick={() => {
              setSendData({
                group: "Friday Night Bridge Group",
                link: window.location.href + "?groupId=?FridayNightBridge44563"
              });
            }}
          >
            Send room link
          </Button>
          <Button variant="contained" color="secondary">
            Leave group
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
            onClick={() => {
              window.location.href =
                window.location.href + "?groupId=?SundayKnittersCircle30912";
            }}
          >
            Enter room
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "2%" }}
            onClick={() => {
              setSendData({
                group: "Sunday Knitters Circle",
                link:
                  window.location.href + "?groupId=?SundayKnittersCircle30912"
              });
            }}
          >
            Send room link
          </Button>
          <Button variant="contained" color="secondary">
            Leave group
          </Button>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      <Container className={classes.centerText}>
        <Button
          variant="contained"
          color="primary"
          className={classes.margined}
        >
          Add
        </Button>
      </Container>
      <Dialog
        open={!!sendData}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Invite Others to the Group!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Just enter everyone's contact information in the boxes below,
            seperated by commas, then hit send!
          </DialogContentText>
          <Container className={classes.padded} />
          <TextField
            fullWidth
            label="Email Addresses (seperated by commas):"
            value={emails}
            onChange={handleEmailsChange}
            variant="outlined"
          />
          <Container className={classes.padded} />
          <TextField
            fullWidth
            label="Phone Numbers (seperated by commas):"
            value={phones}
            onChange={handlePhonesChange}
            variant="outlined"
          />
          <Container className={classes.padded} />
          <TextField
            fullWidth
            label="WhatsApp Accounts (seperated by commas):"
            value={whatsApps}
            onChange={handleWhatsAppsChange}
            variant="outlined"
          />
          <Container className={classes.padded} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default GroupsPage;
