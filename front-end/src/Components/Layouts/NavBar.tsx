import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { Fragment } from "react";
import LeftMenu from "./LeftMenu";

declare interface NavBarProps {
  currentUser: firebase.User | null;
  pageTitle: string;
  handleChangePage: (key: string) => void;
  classes: any;
}

const NavBar: React.FunctionComponent<NavBarProps> = ({
  currentUser,
  pageTitle,
  handleChangePage,
  classes
}) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Fragment>
      <div className={classes.navBarRoot}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={toggleMenu}
              edge="start"
              className={classes.marginRight}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.navBarTitle}>
              {pageTitle ? pageTitle + " - " : " "} Senior Social Space
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <LeftMenu
        open={menuOpen}
        toggleMenu={toggleMenu}
        signedIn={!!currentUser}
        handleChangePage={handleChangePage}
        classes={classes}
      />
    </Fragment>
  );
};

export default NavBar;
