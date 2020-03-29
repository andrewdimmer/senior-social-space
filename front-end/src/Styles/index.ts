import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { THEME } from "./theme";

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(2)
    },
    margined: {
      margin: theme.spacing(2)
    },
    marginedPadded: {
      margin: theme.spacing(2),
      padding: theme.spacing(2)
    },
    navBarRoot: {
      flexGrow: 1
    },
    navBarTitle: {
      flexGrow: 1
    },
    marginRight: {
      marginRight: theme.spacing(2)
    },
    profileAvatarContainer: {
      width: "100%"
    },
    marginsAuto: {
      margin: "auto"
    },
    profileViewEditGrid: {
      padding: 0,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    profileEditImageButton: {
      marginTop: "-60px"
    },
    centerText: {
      textAlign: "center"
    },
    pageTitle: {
      padding: theme.spacing(2),
      textAlign: "center"
    },
    loadingContainer: {
      width: "100vw",
      height: "100vh",
      textAlign: "center"
    },
    loadingContent: {
      // Add Style Here to Center it Vertically
    },
    loadingCircle: {
      margin: "40px"
    }
  })
);

export const theme = THEME;
