import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import { homeTourSteps } from "../../Tours/homeTourSteps";
import { loginTourSteps } from "../../Tours/loginTourSteps";
import { logoutTourSteps } from "../../Tours/logoutTourSteps";
import { profileTourSteps } from "../../Tours/profileTourSteps";
import { NotificationMessage } from "../Misc/Notifications";
import ErrorPage from "./ErrorPage";
import HomePage from "./Home";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import ProfilePage from "./ProfilePage";

export declare interface PageProps {
  currentUser: firebase.User | null;
  handleUpdateNotification: (notificationMessage: NotificationMessage) => void;
  setPageKey: (pageKey: string) => void;
  forceReloadUserData: () => void;
  classes: any;
}

export declare interface PageListForMenuItem {
  key: string;
  menuLabel: string;
  menuIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  displaySignedIn: boolean;
  displaySignedOut: boolean;
}

declare interface PageListItem extends PageListForMenuItem {
  title: string;
  component: React.FunctionComponent<PageProps>;
  tourSteps: { selector: string; content: string }[];
}

const pageList: PageListItem[] = [
  {
    key: "home",
    title: "",
    menuLabel: "Home",
    menuIcon: HomeIcon,
    displaySignedIn: true,
    displaySignedOut: true,
    component: HomePage,
    tourSteps: homeTourSteps
  },
  {
    key: "login",
    title: "",
    menuLabel: "Login",
    menuIcon: ExitToAppIcon,
    displaySignedIn: false,
    displaySignedOut: true,
    component: LoginPage,
    tourSteps: loginTourSteps
  },
  {
    key: "profile",
    title: "Profile",
    menuLabel: "Profile",
    menuIcon: AccountCircleIcon,
    displaySignedIn: true,
    displaySignedOut: false,
    component: ProfilePage,
    tourSteps: profileTourSteps
  },
  {
    key: "logout",
    title: "",
    menuLabel: "Logout",
    menuIcon: ExitToAppIcon,
    displaySignedIn: true,
    displaySignedOut: false,
    component: LogoutPage,
    tourSteps: logoutTourSteps
  }
];

const pageObject = pageList.reduce((pageObject, pageListItem) => {
  pageObject[pageListItem.key] = pageListItem;
  return pageObject;
}, {} as { [key: string]: PageListItem });

export const getPageComponent = (
  key: string
): React.FunctionComponent<PageProps> => {
  if (pageObject[key]) {
    return pageObject[key].component;
  }
  return ErrorPage;
};

export const getPageTitle = (key: string): string => {
  if (pageObject[key]) {
    return pageObject[key].title;
  }
  return "";
};

export const getPageTourSteps = (
  key: string
): { selector: string; content: string }[] => {
  if (pageObject[key]) {
    return pageObject[key].tourSteps;
  }
  return [];
};

export const pageListForMenu: PageListForMenuItem[] = pageList.map(
  ({ key, menuLabel, menuIcon, displaySignedIn, displaySignedOut }) => {
    return { key, menuLabel, menuIcon, displaySignedIn, displaySignedOut };
  }
);
