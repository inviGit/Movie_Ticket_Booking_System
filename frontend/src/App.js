import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import AdminHome from "./components/AdminHome";
import CityDetails from "./components/CityDetails";
import HeaderComponent from "./components/HeaderComponent";
import EditCityDetails from "./components/EditCityDetails";
import TheaterDetails from "./components/TheaterDetails";
import MovieDetails from "./components/MovieDetails";

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
