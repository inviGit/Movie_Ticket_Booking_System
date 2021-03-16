import React, { Component } from 'react'
import cityService from '../service/cityService';

 class EditCityDetails extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
            id: this.props.match.params.id,
            pincode : "",
            cityName : "",
            stateName : ""
              
         }

         this.changeCityNameHandler = this.changeCityNameHandler.bind(this);
         this.changeStateNameHandler = this.changeStateNameHandler.bind(this);
         this.editCity = this.editCity.bind(this);
     }

     changeCityNameHandler(event) {
         this.setState({cityName : event.target.value});

     }

     changeStateNameHandler(event) {
        this.setState({stateName : event.target.value});

    }

     componentDidMount() {
         cityService.getCity(this.state.id).then((response) => {

            this.setState({
                cityName : response.data.cityName,
                stateName : response.data.stateName,
                pincode : response.data.pincode
            })

         })
     }

     editCity(event) {

        event.preventDefault();

        let city = 
        {
            cityName : this.state.cityName,
            stateName : this.state.stateName,
            pincode : this.state.pincode
        }

        console.log("city => " + JSON.stringify(city));

        cityService.updateCity(this.state.id,city).then((response) => {

            this.props.history.push(`/city/${this.state.id}`);
        })

     }

     cancel () {

        this.props.history.push(`/city/${this.state.id}`);
     }
     
    render() {
        return (
            <div>
               <div className="container">
               <div className="row">
               <div className="card col-md-6 offset-md-3 offset-md-3">
               <h3 className="text-center">Edit City Details</h3>
               <div className="card-body">
                   <form>
                                    <div className="form-group">
                                        <label> City Name:</label>
                                        <input placeholder="City name"
                                        name="cityName" className="form-control"
                                        value={this.state.cityName} 
                                        onChange={this.changeCityNameHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label> State Name:</label>
                                        <input placeholder="State name"
                                        name="stateName" className="form-control"
                                        value={this.state.stateName} 
                                        onChange={this.changeStateNameHandler}></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Pincode:</label>
                                        <input placeholder="pincode"
                                        name="pincode" className="form-control"
                                        value={this.state.pincode} 
                                        readOnly></input>
                                    </div>

                                    <button className="btn btn-success"
                                    onClick={this.editCity}>Edit</button>

                                    <button className="btn btn-danger"
                                    onClick={this.cancel.bind(this)}
                                    style={{marginLeft:"10px"}}>Cancel</button>
                   </form>
               </div>
               </div>
               </div>
               </div>
            </div>
        )
    }
}

export default EditCityDetails
