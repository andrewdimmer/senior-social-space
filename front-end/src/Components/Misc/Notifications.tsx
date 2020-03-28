import {
  IconButton,
  Snackbar,
  SnackbarContent,
  Theme
} from "@material-ui/core";
import { amber, green } from "@material-ui/core/colors";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { SyntheticEvent } from "react";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: "#d32f2f" // From default Material-UI Theme
  },
  info: {
    backgroundColor: "#3f51b5" // From default Material-UI Theme
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

export interface SnackbarProps {
  className?: string;
  message?: string;
  onClose?: () => void;
  variant: keyof typeof variantIcon;
}

const MySnackbarContentWrapper: React.FunctionComponent<SnackbarProps> = (
  props: SnackbarProps
) => {
  const classes = useStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
};

declare enum NotificationTypesEnum {
  success,
  error,
  info,
  warning
}

declare type NotificationTypes = keyof typeof NotificationTypesEnum;

export declare interface NotificationMessage {
  message: string;
  type: NotificationTypes;
  open: boolean;
}

declare interface MessageProps {
  message: string;
  type: keyof typeof variantIcon;
  open: boolean;
  update: (notificationMessage: NotificationMessage) => void;
}

export default function NotificationBar({
  message,
  type,
  open,
  update
}: MessageProps) {
  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    update({ message, type, open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={type}
          message={message}
        />
      </Snackbar>
    </div>
  );
}
