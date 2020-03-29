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
import React, { Fragment } from "react";

const ContactsPage: React.FunctionComponent = () => {
  return (
    <Fragment>
      <Container>
        <Typography
          variant="h3"
          id="profileTourStep1"
          display="inline"
          style={{ flexGrow: 1 }}
        >
          Contacts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "1%", float: "right" }}
        >
          Add
        </Button>
      </Container>
      <Divider variant="inset" />
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Remy Sharp"
            secondary={
              <Fragment>
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Phone:
                  </Typography>
                  {" +1 (605) 555-1234"}
                </React.Fragment>
                <br />
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    WhatsApp:
                  </Typography>
                  {" +1 (605) 555-1234"}
                </React.Fragment>
                <br />
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Email:
                  </Typography>
                  {" sharp.remy@gmail.com"}
                </React.Fragment>
              </Fragment>
            }
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "2%" }}
          >
            Edit
          </Button>
          <Button variant="contained" color="secondary">
            Delete
          </Button>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Nathan Dimmer" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Nathan Dimmer"
            secondary={
              <Fragment>
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Phone:
                  </Typography>
                  {" +1 (248) 125-6954"}
                </React.Fragment>
                <br />
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    WhatsApp:
                  </Typography>
                  {" +1 (248) 125-6954"}
                </React.Fragment>
                <br />
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Email:
                  </Typography>
                  {" nathandimmer@gmail.com"}
                </React.Fragment>
              </Fragment>
            }
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "2%" }}
          >
            Edit
          </Button>
          <Button variant="contained" color="secondary">
            Delete
          </Button>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Ron McDillan" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Ron McDillan"
            secondary={
              <Fragment>
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Phone:
                  </Typography>
                  {" +1 (313) 217-6863"}
                </React.Fragment>
                <br />
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    WhatsApp:
                  </Typography>
                  {" +1 (313) 217-6863"}
                </React.Fragment>
                <br />
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Email:
                  </Typography>
                  {" ronaldmcd@gmail.com"}
                </React.Fragment>
              </Fragment>
            }
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "2%" }}
          >
            Edit
          </Button>
          <Button variant="contained" color="secondary">
            Delete
          </Button>
        </ListItem>
        <Divider variant="inset" component="li" />

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Tim Bowman" src="/static/images/avatar/4.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Tim Bowman"
            secondary={
              <Fragment>
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Phone:
                  </Typography>
                  {" +1 (6248) 456-7418"}
                </React.Fragment>
                <br />
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    WhatsApp:
                  </Typography>
                  {" +1 (6248) 456-7418"}
                </React.Fragment>
                <br />
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Email:
                  </Typography>
                  {" bowmant@yahoo.com"}
                </React.Fragment>
              </Fragment>
            }
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "2%" }}
          >
            Edit
          </Button>
          <Button variant="contained" color="secondary">
            Delete
          </Button>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </Fragment>
  );
};

export default ContactsPage;
