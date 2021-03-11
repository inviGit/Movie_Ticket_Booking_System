import React, { Component } from 'react'

class AdminHome extends Component {
    constructor(props) {
        super(props)
    
        this.state = {

            city_id : "",
            vendor_id : ""
             
        }

        this.changeCityId = this.changeCityId.bind(this);
        this.searchCity = this.searchCity.bind(this);
        this.changeVendorId = this.changeVendorId.bind(this);
        this.searchVendor = this.searchVendor.bind(this);
    }

    changeCityId = (event) => {
        this.setState({
            city_id: event.target.value,
            
        });
    }

    searchCity = (event) => {

        event.preventDefault();
        
        console.log(this.state.city_id);
        let id = this.state.city_id;

        this.props.history.push(`/city/${id}`)
    }

    changeVendorId = (event) => {
        this.setState({vendor_id : event.target.value});
    }

    searchVendor = (event) => {
        event.preventDefault();

        console.log(this.state.vendor_id);
    }
    
    render() {
        return (
            <div>
                <div className="container">
                <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                <h3 className="text-center">Admin Home Page</h3>
                <div className="card-body">
                <form>
                                    <div className="form-group">
                                        <label>Search city by id :</label>
                                        <input placeholder="city id"
                                        name="city" className="form-control"
                                        value={this.state.city_id} 
                                        onChange={this.changeCityId}></input>
                                    </div>

                                    <button className="btn btn-success"
                                    onClick={this.searchCity}>Search</button>

                                    <div className="form-group">
                                        <label>Search Vendor :</label>
                                        <input placeholder="Vendor Id"
                                        name="vendor" className="form-control"
                                        value={this.state.vendor_id} 
                                        onChange={this.changeVendorId}></input>   
                                    </div>

                                    <button className="btn btn-info"
                                    onClick={this.searchVendor}>Search</button>

                                    </form>
                                    
                </div>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default AdminHome
