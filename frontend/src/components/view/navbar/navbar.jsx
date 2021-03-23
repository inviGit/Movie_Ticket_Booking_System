import React, { Component } from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import cityService from "../../../service/cityService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Button, Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";

export class NavBar extends Component {
  state = {
    username: localStorage.getItem("username"),
    cities: [],
  };

  componentDidMount() {
    cityService.getAllCities().then((res) => {
      this.setState({ cities: res.data });
      console.log(this.state.cities);
    });
  }

  classes = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
  }));

  handleLog = () => {
    const { username } = this.state;
    if (username !== null) {
      return (
        <div>
          <ul className="navbar-nav ">
            <li className="nav-item ">
              <NavLink
                className="nav-link"
                to="/"
                onClick={(e) => e.preventDefault()}
              >
                Hello, {localStorage.getItem("username")}
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" to="/logout">
                <Button variant="contained" color="secondary">
                  Logout
                </Button>
              </NavLink>
            </li>
          </ul>
        </div>
      );
    } else if (username === null) {
      return (
        <div>
          <ul className="navbar-nav ">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/"
                onClick={(e) => e.preventDefault()}
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Register
                {/* <div className={this.classes.root}>{"Register"}</div>; */}
              </NavLink>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <NavLink className="dropdown-item" to="/register/customer">
                  Customer Register
                </NavLink>
                <NavLink className="dropdown-item" to="/register/vendor">
                  Vendor Register
                </NavLink>
              </div>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" to="/">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      );
    }
  };

  handelCitySelect=(event, city)=>{
    window.location.href = `http://localhost:3000/city/${city.pincode}/theaters`;
  }
  
  render() {
    const { cities } = this.state;
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
      <div>
        <nav className="navbar navbar-toggleable-xl navbar-expand-lg navbar-light bg-light ">
          <Link className="navbar-brand" to="/">
            MTBS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cities">
                  Cities
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link" to="/movies">
                  Movies
                </NavLink>
              </li>
            </ul>
            <Autocomplete
              id={"cities"}
              options={cities}
              fullWidth
              getOptionLabel={(option) => option.cityName}
              color="danger"
              onChange={this.handelCitySelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="city"
                  variant="outlined"
                  color="secondary"
                />
              )}
            />
            {this.handleLog()}

            <button
              className="nav-item badge badge-dark"
              style={{ marginRight: "10px", marginLeft: "30px" }}
            >
              Profile
            </button>
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
