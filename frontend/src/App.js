import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./commonComponents/Login";
import AdminHome from "./commonComponents/AdminHome";
import CityDetails from "./commonComponents/CityDetails";
import HeaderComponent from "./commonComponents/HeaderComponent";
import EditCityDetails from "./commonComponents/EditCityDetails";
import TheaterDetails from "./commonComponents/TheaterDetails";
import MovieDetails from "./commonComponents/MovieDetails";
import SeatDetails from "./commonComponents/SeatDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent/>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path = "/admin"  component={AdminHome}></Route>
          <Route path = "/city/:id"  component={CityDetails}></Route>
          <Route path = "/editcity/:id" component = {EditCityDetails}></Route>
          <Route path = "/theater/:id" component = {TheaterDetails}></Route>
          <Route path = "/movie/:id" component = {MovieDetails}></Route>
          <Route path = "/seat" component = {SeatDetails}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
