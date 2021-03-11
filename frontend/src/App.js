import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
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
