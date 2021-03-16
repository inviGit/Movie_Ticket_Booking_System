import React, { Component } from 'react'
import cityService from "../service/cityService"

class CityIndividual extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             city_id : this.props.match.params.id,
             city:{}
        }
        
    }
    cancel () {

        this.props.history.push(`/city/all`);
     }
    

    componentDidMount() {
            console.log(this.state.city_id)
            cityService.getCity(this.state.city_id).then((res)=>{
            this.setState({
                city: res.data
                
            })
            
        });
        
    } 
    
    render() {
        return (
           
            <div>
                 <br/> <br/> <br/> <br/>
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
                       <button className="btn btn-danger"
                                    onClick={this.cancel.bind(this)}
                                    style={{marginLeft:"10px"}}>Cancel</button>


                </div>
                </div>

                <br></br>

                
                



            </div>
        
        )
    }
}

export default CityIndividual
