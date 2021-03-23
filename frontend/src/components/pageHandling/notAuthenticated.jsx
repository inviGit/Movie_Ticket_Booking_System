import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";

const NotAuthenticated = () => {
  const classes = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  return (
    <div className="container">
      <h3>Not Logged In</h3>
      <Link to="/">
        <Fab variant="extended" color="primary">
          <NavigationIcon className={classes.extendedIcon} color="inherit" />
          Navigate To Login Page
        </Fab>
      </Link>
    </div>
  );
};

export default NotAuthenticated;
