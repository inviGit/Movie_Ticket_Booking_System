import React, { Component } from 'react'
import CityService from "../service/cityService"

class CityDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             city_id : this.props.match.params.id,
             city:{},
             theaters:[]
             
        }

        this.editCityDetails = this.editCityDetails.bind(this);
        this.theaterDetails = this.theaterDetails.bind(this);

    }

    

    componentDidMount() {
            CityService.getCity(this.state.city_id).then((res)=>{
            this.setState({
                city: res.data,
                theaters: res.data.theaters
            })
            
        });
        
    }

    theaterDetails(id) {

        this.props.history.push(`/theater/${id}`);
   
    }

    editCityDetails(id) {

        this.props.history.push(`/editcity/${id}`);

    }
    
    
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
                       <button className="btn btn-success"
                                    onClick={ () => this.editCityDetails(this.state.city_id)}>Edit</button>


                </div>
                </div>

                <br></br>

                <div>
                <div className ="row">
                <table className="table CityDetails table-bordered">
                    <thead>
                        <tr>
                            <th>Theater Name</th>
                            <th>Theater Address</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            this.state.theaters.map(

                                theaters => 
                                <tr key = {theaters.id}>
                                    <td>{theaters.theaterName}</td>
                                    <td>{theaters.theaterAddress}</td>
                                    <td>
                                    <button className="btn btn-info"
                                    onClick={ () => this.theaterDetails(theaters.id)}>Show</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                    
                </div>

                



            </div>
            </div>
        )
    }
}

export default CityDetails
