import { createMuiTheme } from "@material-ui/core";
import { blue, indigo, red } from "@material-ui/core/colors";

export const THEME = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
    error: red
  }
});
