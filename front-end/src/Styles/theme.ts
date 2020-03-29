import { createMuiTheme } from "@material-ui/core";
import { blue, indigo, red, teal, deepPurple } from "@material-ui/core/colors";

export const THEME = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepPurple,
    error: red
  }
});
