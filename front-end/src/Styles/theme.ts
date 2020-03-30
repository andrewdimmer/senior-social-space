import { createMuiTheme } from "@material-ui/core";
import { blue, deepPurple, red } from "@material-ui/core/colors";

export const THEME = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepPurple,
    error: red
  }
});
