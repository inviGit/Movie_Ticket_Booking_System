import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/view/forms/loginForm";
import Movies from "./components/view/movie";
import MovieForm from "./components/view/forms/movieForm";
import Theaters from "./components/view/theater";
import TheaterForm from "./components/view/forms/theaterForm";
import Shows from "./components/view/show";
import Seatings from "./components/view/seating";
import City from "./components/view/city";
import CityForm from "./components/view/forms/cityForm";
import ShowForm from "./components/view/forms/showForm";
import RegisterUser from "./components/view/forms/registerUserForm";
import Vendor from "./components/view/vendors";
import VendorForm from "./components/view/forms/vendorForm";
import NotFound from "./components/pageHandling/notFound";
import NotAuthorized from "./components/pageHandling/notAuthorized";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NavBar from "./components/view/navbar/navbar";
import { Logout } from "./components/pageHandling/logout";
import NotAuthenticated from "./components/pageHandling/notAuthenticated";
import { Home } from "./components/view/home";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Grid from "@material-ui/core/Grid";
import { BookingConfirmation } from './components/view/page/bookingConfirmation';
import { Profile } from './components/view/profile/profile';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function App() {
  let isAuthenticated = false;
  const classes = useStyles();
  if (localStorage.getItem("authorization") !== null) {
    isAuthenticated = true;
    console.log(isAuthenticated);
  }

  return (
    <React.Fragment>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item sm={12} md={12} with="100%" className={classes.image}>
          <ToastContainer />
          <NavBar />

          <div className="content">
            <Switch>
            <Route
                path="/customer/:userId/profile"
                component={isAuthenticated ? Profile : NotAuthenticated}
              />
            <Route
                path="/show/:showId/booking"
                component={isAuthenticated ? BookingConfirmation : NotAuthenticated}
              />
              <Route
                path="/show/:showId/show-form"
                component={isAuthenticated ? ShowForm : NotAuthenticated}
              />
              <Route
                path="/show/:showId/seatings"
                component={isAuthenticated ? Seatings : NotAuthenticated}
              />
              <Route
                path="/movie/:movieId/show-form"
                component={isAuthenticated ? ShowForm : NotAuthenticated}
              />
              <Route
                path="/movie/:movieId/shows"
                component={isAuthenticated ? Shows : NotAuthenticated}
              />
              <Route
                path="/movie/:movieId/movie-form"
                component={isAuthenticated ? MovieForm : NotAuthenticated}
              />
              <Route
                path="/movie/:movieId"
                component={isAuthenticated ? Movies : NotAuthenticated}
              />
              <Route
                path="/movies"
                exact
                component={isAuthenticated ? Movies : NotAuthenticated}
              />
              <Route
                path="/theater/:theaterId/movie-form"
                component={isAuthenticated ? MovieForm : NotAuthenticated}
              />
              <Route
                path="/theater/:theaterId/movies"
                component={isAuthenticated ? Movies : NotAuthenticated}
              />
              <Route
                path="/theater-form"
                component={isAuthenticated ? TheaterForm : NotAuthenticated}
              />
              <Route
                path="/theater/:theaterId/theater-form"
                component={isAuthenticated ? TheaterForm : NotAuthenticated}
              />
              <Route
                path="/theaters"
                component={isAuthenticated ? Theaters : NotAuthenticated}
              />
              <Route
                path="/city/:cityId/city-form"
                component={isAuthenticated ? CityForm : NotAuthenticated}
              />
              <Route
                path="/city/:cityId/theaters"
                component={isAuthenticated ? Theaters : NotAuthenticated}
              />
              <Route
                path="/city-form"
                component={isAuthenticated ? CityForm : NotAuthenticated}
              />
              <Route
                path="/cities"
                component={isAuthenticated ? City : NotAuthenticated}
              />
              <Route
                path="/vendor-form"
                component={isAuthenticated ? VendorForm : NotAuthenticated}
              />
              <Route
                path="/vendors"
                component={isAuthenticated ? Vendor : NotAuthenticated}
              />
              <Route path="/home" component={Home} />
              <Route path="/logout" component={Logout} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/not-authorized" exact component={NotAuthorized} />
              <Route path="/not-authenticated" component={NotAuthenticated} />
              <Route path="/register/:user" exact component={RegisterUser} />
              <Route path="/" exact component={Login} />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
