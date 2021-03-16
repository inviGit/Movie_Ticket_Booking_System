import React, { Component } from 'react'
import cityService from "../service/cityService"

class CityDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {

            city_id : this.props.match.params.id,
            city:[],
             
        }
        this.addCityInfo=this.addCityInfo.bind(this);
        this.deleteCity = this.deleteCity.bind(this);
      
    }
    deleteCity(id){
        cityService.removCity(id).then( res => {
            this.setState({city: this.state.city.filter(city => city.pincode !== id)});
        });
    }
    cityInfo(cityID){
        console.log(cityID)
        this.props.history.push(`/city/${cityID}`);
    }
    editInfo(cityID){
        console.log(cityID)
        this.props.history.push(`/editcity/${cityID}`);
    }
    addCityInfo(){
        this.props.history.push("/addCityInformation");
    } 
    componentDidMount(){
        cityService.getAllCities().then((res) => {
            this.setState({ city: res.data});
        });
    }
    cancel () {

        this.props.history.push(`/admin`);
     }
    render() {
        return (
            <div>
                <h1 className="text-center">Cities</h1>
                <br></br>
                <div className = "row">
                <span  class="tab"></span>
                <span  class="tab"></span>
                
                <button className="btn btn-primary" onClick={this.addCityInfo}> Add City Details</button>
                </div>
                <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered" margin-left="40px" >

                            <thead>
                                <tr>
                                    
                                    <th> City </th>
                                    <th> State</th>
                                    <th> Pincode</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody  >
                                {
                                    this.state.city.map(
                                        city => 
                                        <tr key = {city.pincode}>
                                             <td> {city.pincode} </td>   
                                             <td> {city.cityName}</td>
                                             <td> {city.stateName}</td>
                                             <td >
                                             <td  >
                                                 <button onClick={ () => this.cityInfo(city.pincode)} className="btn btn-info">View </button>
                                                 <span  class="tab"></span> 
                                                 <button onClick={ () => this.editInfo(city.pincode)} className="btn btn-info">Edit </button>
                                                 <span  class="tab"></span> 
                                                 <button className="btn btn-danger" onClick={ () => this.deleteCity(city.pincode)} >Delete </button>
                                                 </td>  
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                    </table>
                    <span  class="tab"></span>
                <span  class="tab"></span>
                
                <button className="btn btn-primary" onClick={this.cancel.bind(this)}> Cancel</button>
                </div>
            </div>
           
        )
    }
}

export default CityDetails
