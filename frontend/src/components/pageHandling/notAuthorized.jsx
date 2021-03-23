import { Fab } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import NavigationIcon from "@material-ui/icons/Navigation";

const NotAuthorized = () => {
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
      <h3>Not Authorized</h3>
      <Link to="/home">
        <Fab variant="extended" color="primary">
          <NavigationIcon className={classes.extendedIcon} color="inherit" />
          Navigate To Home
        </Fab>
      </Link>
    </div>
  );
};

export default NotAuthorized;
