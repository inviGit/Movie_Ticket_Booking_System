import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login, { login } from "./components/Login";
import Vendor_home from "./components/Vendor_home";


import Add_theater from "./components/Add_theater";
import Update_theater from "./components/Update_theater";
import Add_movies from "./components/Add_movies";
import View_show from "./components/View_show";
import View_movies from "./components/View_movies";
import Update_movie from "./components/Update_movie";
import Add_show from "./components/Add_show";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/login" component={Vendor_home}></Route>
           <Route path="/view_movies/:theaterId"  component={View_movies}></Route>
           <Route path="/add_theater"  component={Add_theater}></Route>
           <Route path="/update_theater/:theaterId"  component={Update_theater }></Route>
           <Route path="/add_movie/:theaterId"  component={Add_movies }></Route>
           <Route path="/view_show/:movieId"  component={View_show }></Route>
           <Route path="/update_movie/:movieId/:theaterId"  component={Update_movie }></Route>
           <Route path="/add_show/:movieId"  component={Add_show }></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
