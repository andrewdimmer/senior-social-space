import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import React from "react";
import { pageListForMenu, PageListForMenuItem } from "../Pages";

declare interface LeftMenuProps {
  open: boolean;
  toggleMenu: () => void;
  signedIn: boolean;
  handleChangePage: (key: string) => void;
}

const LeftMenu: React.FunctionComponent<LeftMenuProps> = ({
  open,
  toggleMenu,
  signedIn,
  handleChangePage
}) => {
  const pageListForMenuVisible = pageListForMenu.reduce((visible, nextItem) => {
    if (signedIn && nextItem.displaySignedIn === true) {
      visible.push(nextItem);
    } else if (!signedIn && nextItem.displaySignedOut === true) {
      visible.push(nextItem);
    }
    return visible;
  }, [] as PageListForMenuItem[]);

  return (
    <Drawer anchor="left" open={open} onClose={toggleMenu}>
      <List component="nav">
        {pageListForMenuVisible.map(item => {
          const Icon = item.menuIcon;
          return (
            <ListItem
              button
              key={item.key}
              onClick={() => {
                handleChangePage(item.key);
                toggleMenu();
              }}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={item.menuLabel} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default LeftMenu;
