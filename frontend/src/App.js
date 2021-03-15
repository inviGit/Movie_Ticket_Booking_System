//import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import AdminHome from "./components/AdminHome";
import CityDetails from "./components/CityDetails";
import CityIndividual from "./components/CityIndividual"
import EditCityDetails from "./components/EditCityDetails";
import AddCityInTable from "./components/AddCity";
import VendorDetails from "./components/VendorDetails";
import UserDetails from "./components/UserDetails";
import AddVendorInfo from "./components/AddVendorInfo";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
           <Route path = "/admin"  component={AdminHome}></Route> 
           <Route path ="/vendor" component={VendorDetails}></Route>AddVendorInfo
           <Route path ="/addVendorInformation" component={AddVendorInfo}></Route>
           <Route path ="/customer" component={UserDetails}></Route>
           <Route path = "/city/all"  component={CityDetails}></Route>
          <Route path = "/city/:id"  component={CityIndividual}></Route>
          <Route path = "/editcity/:id"  component={EditCityDetails}></Route>
          <Route path = "/addCityInformation"  component={AddCityInTable}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
