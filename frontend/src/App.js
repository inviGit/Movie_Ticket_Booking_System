import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import AdminHome from "./components/AdminHome";
import CityDetails from "./components/CityDetails";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent/>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path = "/admin"  component={AdminHome}></Route>
          <Route path = "/city/:id"  component={CityDetails}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
