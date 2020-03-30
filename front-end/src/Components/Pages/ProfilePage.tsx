import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import { DropzoneArea } from "material-ui-dropzone";
import React, { Fragment } from "react";
import { PageProps } from ".";
import {
  updateDisplayNameDatabase,
  updateEmailDatabase,
  updatePhoneDatabase,
  updatePhotoUrlDatabase
} from "../../Scripts/firebaseProfileUpdates";
import SquareAvatar from "../Misc/SquareAvatar";
import { profilePicturesRef } from "../../Scripts/firebaseConfig";
import * as firebase from "firebase";

declare interface ProfilePageProps extends PageProps {}

const ProfilePage: React.FunctionComponent<PageProps> = ({
  currentUser,
  handleUpdateNotification,
  forceReloadUserData,
  setBusyMessage,
  classes
}) => {
  const [displayName, setDisplayName] = React.useState<string>(
    currentUser?.displayName ? currentUser.displayName : ""
  );
  const [email, setEmail] = React.useState<string>(
    currentUser?.email ? currentUser.email : ""
  );
  const [phone, setPhone] = React.useState<string>(
    currentUser?.phoneNumber ? currentUser.phoneNumber : ""
  );
  const [password, setPassword] = React.useState<string>("");
  const [password2, setPassword2] = React.useState<string>("");
  const [newProfilePicture, setNewProfilePicture] = React.useState<any>(null);
  const [editing, setEditing] = React.useState({
    displayName: !displayName,
    email: !email,
    phone: !phone,
    password: false,
    image: false
  });

  const startEditing = (
    item: "displayName" | "email" | "phone" | "password" | "image"
  ) => {
    const newEdits = {
      displayName: editing.displayName,
      email: editing.email,
      phone: editing.phone,
      password: editing.password,
      image: editing.image
    };
    newEdits[item] = true;
    setEditing(newEdits);
  };

  const cancelEditing = (
    item: "displayName" | "email" | "phone" | "password" | "image"
  ) => {
    const newEdits = {
      displayName: editing.displayName,
      email: editing.email,
      phone: editing.phone,
      password: editing.password,
      image: editing.image
    };
    newEdits[item] = false;
    setEditing(newEdits);
  };

  const cancelEditingDisplayName = () => {
    cancelEditing("displayName");
    setDisplayName(currentUser?.displayName ? currentUser.displayName : "");
  };
  const cancelEditingEmail = () => {
    cancelEditing("email");
    setEmail(currentUser?.email ? currentUser.email : "");
  };
  const cancelEditingPhone = () => {
    cancelEditing("phone");
    setPhone(currentUser?.phoneNumber ? currentUser.phoneNumber : "");
  };
  const cancelEditingPassword = () => {
    cancelEditing("password");
    setPassword("");
    setPassword2("");
  };
  const cancelEditingImage = () => {
    cancelEditing("image");
    setNewProfilePicture(null);
  };

  const saveDisplayName = () => {
    currentUser
      ?.updateProfile({ displayName })
      .then(() => {
        updateDisplayNameDatabase(
          currentUser.uid,
          currentUser.displayName ? currentUser.displayName : "",
          displayName
        )
          .then(value => {
            if (value) {
              handleUpdateNotification({
                type: "success",
                message: "Display Name Updated Successfully!",
                open: true
              });
              forceReloadUserData();
              cancelEditing("displayName");
            } else {
              handleUpdateNotification({
                type: "warning",
                message:
                  "Something may have gone wrong while updating your display name. It should fix itself, but if your new display name is not visiable after a few minutes, please try updating it again.",
                open: true
              });
              cancelEditing("displayName");
            }
          })
          .catch(err => {
            console.log(err);
            handleUpdateNotification({
              type: "warning",
              message:
                "Something may have gone wrong while updating your display name. It should fix itself, but if your new display name is not visiable after a few minutes, please try updating it again.",
              open: true
            });
            cancelEditing("displayName");
          });
      })
      .catch(err => {
        console.log(err);
        handleUpdateNotification({
          type: "error",
          message: "Unable to update display name. Please try again later.",
          open: true
        });
        cancelEditing("displayName");
      });
  };

  const saveEmail = () => {
    currentUser
      ?.updateEmail(email)
      .then(() => {
        updateEmailDatabase(
          currentUser.uid,
          currentUser.email ? currentUser.email : "",
          email
        )
          .then(value => {
            if (value) {
              handleUpdateNotification({
                type: "success",
                message: "Email Address Updated Successfully!",
                open: true
              });
              forceReloadUserData();
              cancelEditing("email");
            } else {
              handleUpdateNotification({
                type: "warning",
                message:
                  "Something may have gone wrong while updating your email address. It should fix itself, but if your new email address is not visiable after a few minutes, please try updating it again.",
                open: true
              });
              cancelEditing("email");
            }
          })
          .catch(err => {
            console.log(err);
            handleUpdateNotification({
              type: "warning",
              message:
                "Something may have gone wrong while updating your email address. It should fix itself, but if your new email address is not visiable after a few minutes, please try updating it again.",
              open: true
            });
            cancelEditing("email");
          });
      })
      .catch(err => {
        console.log(err);
        handleUpdateNotification({
          type: "error",
          message: `Unable to update email address. ${
            err.message ? err.message : "Please try again later."
          }`,
          open: true
        });
        cancelEditing("email");
      });
  };

  const savePhone = () => {
    if (currentUser) {
      updatePhoneDatabase(
        currentUser.uid,
        currentUser.phoneNumber ? currentUser.phoneNumber : "",
        phone
      )
        .then(value => {
          if (value) {
            handleUpdateNotification({
              type: "info",
              message:
                "Phone Number Updated Successfully! Note that this does not change how you sign in, just how other people can connect with you.",
              open: true
            });
            forceReloadUserData();
            cancelEditing("phone");
          } else {
            handleUpdateNotification({
              type: "warning",
              message:
                "Something may have gone wrong while updating your phone number. It should fix itself, but if your new phone number is not visiable after a few minutes, please try updating it again.",
              open: true
            });
            cancelEditing("phone");
          }
        })
        .catch(err => {
          console.log(err);
          handleUpdateNotification({
            type: "warning",
            message:
              "Something may have gone wrong while updating your phone number. It should fix itself, but if your new phone number is not visiable after a few minutes, please try updating it again.",
            open: true
          });
          cancelEditing("phone");
        });
    } else {
      handleUpdateNotification({
        type: "error",
        message:
          "Unable to update phone number. Try signing off and signing back in.",
        open: true
      });
      cancelEditing("phone");
    }
  };

  const savePassword = () => {
    if (password === password2) {
      currentUser
        ?.updatePassword(password)
        .then(() => {
          handleUpdateNotification({
            type: "success",
            message: "Password Updated Successfully!",
            open: true
          });
          cancelEditingPassword();
        })
        .catch(err => {
          console.log(err);
          handleUpdateNotification({
            type: "error",
            message: `Unable to update password. ${
              err.message ? err.message : "Please try again later."
            }`,
            open: true
          });
        });
    } else {
      handleUpdateNotification({
        type: "error",
        message: "Unable to update password. Passwords do not match.",
        open: true
      });
    }
  };

  const saveImage = () => {
    if (currentUser) {
      if (newProfilePicture) {
        // Start the unload
        const newProfilePictureUploadTask = profilePicturesRef
          .child(currentUser.uid)
          .put(newProfilePicture);

        // Listen for state changes, errors, and completion of the upload.
        newProfilePictureUploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          (snapshot: {
            bytesTransferred: number;
            totalBytes: number;
            state: any;
          }) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                handleUpdateNotification({
                  type: "info",
                  message: `Upload is paused and ${progress}% done`,
                  open: true
                });
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                handleUpdateNotification({
                  type: "info",
                  message: `Upload is running and ${progress}% done`,
                  open: true
                });
                break;
            }
          },
          (error: { message: any }) => {
            handleUpdateNotification({
              type: "error",
              message: error.message,
              open: true
            });
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            newProfilePictureUploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadURL => {
                saveImageHelper(currentUser, downloadURL);
              });
          }
        );
      } else {
        saveImageHelper(currentUser, "");
      }
    } else {
      handleUpdateNotification({
        type: "error",
        message:
          "Unable to update profile picture. Try signing out and signing back in.",
        open: true
      });
    }
  };

  const saveImageHelper = (user: firebase.User, newPhotoUrl: string) => {
    user
      .updateProfile({ photoURL: newPhotoUrl })
      .then(() => {
        updatePhotoUrlDatabase(
          user.uid,
          user.photoURL ? user.photoURL : "",
          newPhotoUrl
        )
          .then(value => {
            if (value) {
              handleUpdateNotification({
                type: "success",
                message: "Profile Picture Updated Successfully!",
                open: true
              });
              forceReloadUserData();
              cancelEditingImage();
            } else {
              handleUpdateNotification({
                type: "warning",
                message:
                  "Something may have gone wrong while updating your profile picture. It should fix itself, but if your new profile picture is not visiable after a few minutes, please try updating it again.",
                open: true
              });
              cancelEditingImage();
            }
          })
          .catch(err => {
            console.log(err);
            handleUpdateNotification({
              type: "warning",
              message:
                "Something may have gone wrong while updating your profile picture. It should fix itself, but if your new profile picture is not visiable after a few minutes, please try updating it again.",
              open: true
            });
            cancelEditingImage();
          });
      })
      .catch(err => {
        console.log(err);
        handleUpdateNotification({
          type: "error",
          message: `Unable to profile picture. ${
            err.message ? err.message : "Please try again later."
          }`,
          open: true
        });
        cancelEditingImage();
      });
  };

  const handleDisplayNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayName(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handlePassword2Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword2(event.target.value);
  };
  const handleImageChange = (file: any) => {
    setNewProfilePicture(file);
  };

  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h3" id="profileTourStep1">
          Profile
        </Typography>
      </Container>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={4} lg={3} id="profileTourStep10">
          <SquareAvatar
            alt={displayName}
            src={currentUser?.photoURL ? currentUser.photoURL : ""}
            centerInContainer={true}
            maxHeightPercentageOfScreen={50}
            maxWidthPercentageOfParent={100}
            maxWidthPercentageOfScreen={50}
          />
          <Fab
            className={classes.profileEditImageButton}
            color="primary"
            size="small"
            onClick={() => {
              startEditing("image");
            }}
            aria-label="edit-image"
            id="profileTourStep11"
          >
            <EditIcon />
          </Fab>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <Paper
            elevation={3}
            className={classes.marginedPadded}
            id="profileTourStep2"
          >
            <Typography variant="h4">Display Name</Typography>
            <Grid
              container
              spacing={2}
              alignItems="center"
              className={classes.profileViewEditGrid}
            >
              {editing.displayName ? (
                <Fragment>
                  <Grid item xs={12} sm={8} md={10}>
                    <TextField
                      fullWidth
                      label="Enter Your Display Name:"
                      value={displayName}
                      onChange={handleDisplayNameChange}
                      helperText="Please enter a display name."
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={2}
                    md={1}
                    className={classes.centerText}
                  >
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => {
                        saveDisplayName();
                      }}
                      aria-label="save-display-name"
                      id="profileTourStep3"
                    >
                      <DoneIcon />
                    </Fab>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={2}
                    md={1}
                    className={classes.centerText}
                  >
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => {
                        cancelEditingDisplayName();
                      }}
                      aria-label="cancel-edit-display-name"
                    >
                      <ClearIcon />
                    </Fab>
                  </Grid>
                </Fragment>
              ) : (
                <Fragment>
                  <Grid item xs={12} sm={10} md={11}>
                    <Typography variant="h5">{displayName}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    md={1}
                    className={classes.centerText}
                  >
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => {
                        startEditing("displayName");
                      }}
                      aria-label="edit-display-name"
                    >
                      <EditIcon />
                    </Fab>
                  </Grid>
                </Fragment>
              )}
            </Grid>
          </Paper>
          <Paper
            elevation={3}
            className={classes.marginedPadded}
            id="profileTourStep4"
          >
            <Typography variant="h4">Email Address</Typography>
            <Grid
              container
              spacing={2}
              alignItems="center"
              className={classes.profileViewEditGrid}
            >
              {editing.email ? (
                <Fragment>
                  <Grid item xs={12} sm={8} md={10}>
                    <TextField
                      fullWidth
                      label="Enter Your Email Address:"
                      value={email}
                      onChange={handleEmailChange}
                      helperText="Please enter a valid email address."
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={2}
                    md={1}
                    className={classes.centerText}
                  >
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => {
                        saveEmail();
                      }}
                      aria-label="save-email"
                      id="profileTourStep5"
                    >
                      <DoneIcon />
                    </Fab>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={2}
                    md={1}
                    className={classes.centerText}
                  >
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => {
                        cancelEditingEmail();
                      }}
                      aria-label="cancel-edit-email"
                      id="profileTourStep5"
                    >
                      <ClearIcon />
                    </Fab>
                  </Grid>
                </Fragment>
              ) : (
                <Fragment>
                  <Grid item xs={12} sm={10} md={11}>
                    <Typography variant="h5">{email}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    md={1}
                    className={classes.centerText}
                  >
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => {
                        startEditing("email");
                      }}
                      aria-label="edit-email"
                    >
                      <EditIcon />
                    </Fab>
                  </Grid>
                </Fragment>
              )}
            </Grid>
          </Paper>
          <Paper
            elevation={3}
            className={classes.marginedPadded}
            id="profileTourStep6"
          >
            <Typography variant="h4">Phone Number</Typography>
            <Grid
              container
              spacing={2}
              alignItems="center"
              className={classes.profileViewEditGrid}
            >
              {editing.phone ? (
                <Fragment>
                  <Grid item xs={12} sm={8} md={10}>
                    <TextField
                      fullWidth
                      label="Enter Your Phone Number:"
                      value={phone}
                      onChange={handlePhoneChange}
                      helperText="Please enter a valid phone number including the country code."
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={2}
                    md={1}
                    className={classes.centerText}
                  >
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => {
                        savePhone();
                      }}
                      aria-label="save-phone"
                    >
                      <DoneIcon />
                    </Fab>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={2}
                    md={1}
                    className={classes.centerText}
                  >
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => {
                        cancelEditingPhone();
                      }}
                      aria-label="cancel-edit-phone"
                    >
                      <ClearIcon />
                    </Fab>
                  </Grid>
                </Fragment>
              ) : (
                <Fragment>
                  <Grid item xs={12} sm={10} md={11}>
                    <Typography variant="h5">{phone}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    md={1}
                    className={classes.centerText}
                  >
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => {
                        startEditing("phone");
                      }}
                      aria-label="edit-phone"
                      id="profileTourStep7"
                    >
                      <EditIcon />
                    </Fab>
                  </Grid>
                </Fragment>
              )}
            </Grid>
          </Paper>
          <Paper
            elevation={3}
            className={classes.marginedPadded}
            id="profileTourStep8"
          >
            <Typography variant="h4">Password</Typography>
            <Grid
              container
              spacing={2}
              alignItems="center"
              className={classes.profileViewEditGrid}
            >
              {editing.password ? (
                <Fragment>
                  <Grid item xs={12} sm={8} md={10}>
                    <TextField
                      fullWidth
                      label="Enter a New Password:"
                      value={password}
                      onChange={handlePasswordChange}
                      helperText="Please enter a new password."
                      variant="outlined"
                      type="password"
                    />
                    <TextField
                      fullWidth
                      label="Confirm Your Password:"
                      value={password2}
                      onChange={handlePassword2Change}
                      helperText="Please confirm your new password."
                      variant="outlined"
                      type="password"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={2}
                    md={1}
                    className={classes.centerText}
                  >
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => {
                        savePassword();
                      }}
                      aria-label="save-password"
                    >
                      <DoneIcon />
                    </Fab>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={2}
                    md={1}
                    className={classes.centerText}
                  >
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => {
                        cancelEditingPassword();
                      }}
                      aria-label="cancel-edit-password"
                    >
                      <ClearIcon />
                    </Fab>
                  </Grid>
                </Fragment>
              ) : (
                <Fragment>
                  <Grid item xs={12} sm={10} md={11}>
                    <Typography variant="h5">************</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    md={1}
                    className={classes.centerText}
                  >
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => {
                        startEditing("password");
                      }}
                      aria-label="edit-password"
                      id="profileTourStep9"
                    >
                      <EditIcon />
                    </Fab>
                  </Grid>
                </Fragment>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={editing.image}
        onClose={() => {
          cancelEditingImage();
        }}
        aria-labelledby="image-upload-title"
      >
        <DialogTitle id="image-upload-title">
          Upload a New Profile Picture
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Upload a new Profile Picture using the button below. Please make
            sure that your image file is less than 2 MB. For best results, a
            square image where your face is in or near the center is
            recommended.
          </DialogContentText>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            filesLimit={1}
            maxFileSize={2000000}
            dropzoneText="Either drag and drop an image file here or click here to upload an image from your device."
            showAlerts={false}
            onDrop={files => {
              handleImageChange(files);
              handleUpdateNotification({
                type: "success",
                message: `File ${files.name} successfully added.`,
                open: true
              });
            }}
            onDropRejected={(files, evt) => {
              handleUpdateNotification({
                type: "error",
                message: `File ${files[0].name} was rejected. The file may not be supported or may be too big.`,
                open: true
              });
            }}
            onDelete={files => {
              handleImageChange(null);
              handleUpdateNotification({
                type: "info",
                message: `File ${files.name} removed.`,
                open: true
              });
            }}
          ></DropzoneArea>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            spacing={2}
            alignItems="center"
            className={classes.profileViewEditGrid}
          >
            <Grid item xs={6} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  saveImage();
                }}
                aria-label="save-image"
              >
                <DoneIcon />
              </Fab>
            </Grid>
            <Grid item xs={6} className={classes.centerText}>
              <Fab
                color="primary"
                size="small"
                onClick={() => {
                  cancelEditingImage();
                }}
                aria-label="cancel-edit-image"
              >
                <ClearIcon />
              </Fab>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ProfilePage;
