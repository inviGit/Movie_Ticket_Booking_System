import React from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/forms/loginForm";
import Movies from "./components/movie";
import MovieForm from "./components/forms/movieForm";
import Theaters from "./components/theater";
import TheaterForm from "./components/forms/theaterForm";
import Shows from "./components/show";
import Seatings from "./components/seating";
import City from "./components/city";
import CityForm from "./components/forms/cityForm";
import ShowForm from "./components/forms/showForm";
import RegisterUser from "./components/forms/registerUserForm";
import Vendor from "./components/vendorsList";
import VendorForm from "./components/forms/vendorForm";
import { NotFound } from "./components/notFound";
import  NotAuthorized  from "./components/notAuthorized";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="content">
        <Switch>
          <Route path="/show/:showId/seatings" component={Seatings} />
          <Route path="/movie/:movieId/show-form" component={ShowForm} />
          <Route path="/movie/:movieId/shows" component={Shows} />
          <Route path="/theater/:theaterId/movie-form" component={MovieForm} />
          <Route path="/theater/:theaterId/movies" component={Movies} />
          <Route path="/movies" component={Movies} />
          <Route path="/theater-form" component={TheaterForm} />
          <Route path="/city/:cityId/theaters" component={Theaters} />
          <Route path="/theaters" component={Theaters} />
          <Route path="/city-form" component={CityForm} />
          <Route path="/cities" component={City} />
          <Route path="/vendor-form" component={VendorForm} />
          <Route path="/vendors" component={Vendor} />
          <Route path="/not-authorized" component={NotAuthorized} />
          <Route path="/register/:user" exact component={RegisterUser} />

          <Route path="/" exact component={Login} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
