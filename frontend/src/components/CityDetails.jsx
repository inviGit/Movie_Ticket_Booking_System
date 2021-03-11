import React, { Component } from 'react'
import CityService from "../service/cityService"

class CityDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             city_id : this.props.match.params.id,
             city:{}
        }
    }

    // componentDidMount() {
    //     console.log("mount")
    //     console.log(" get" , localStorage.getItem("authorization"));
    //     CityService.getCity(this.state.city_id).then((res)=>{
    //         console.log(res)
    //     });
        
    // }
    
    
    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">City Details</h3>
                <div className="card-body">
                <div className="row">
                           <label>Pincode :</label>
                           <div style={{ textIndent: "10px"}}>{this.state.city.pincode}</div>
                       </div>
                       <div className="row">
                           <label>city name :</label>
                           <div style={{ textIndent: "10px"}}>{this.state.city.cityName}</div>
                       </div>
                       <div className="row">
                           <label>stateName :</label>
                           <div style={{ textIndent: "10px"}}>{this.state.city.stateName}</div>
                       </div>

                </div>
                </div>

                <br></br>

                



            </div>
        )
    }
}

export default CityDetails
